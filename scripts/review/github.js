'use strict';
class GitHub {
  constructor({ token, repository, fetcher = fetch }) {
    this.token = token;
    this.repository = repository;
    this.fetcher = fetcher;
    this.root = `/repos/${repository}`;
    this.botLogin = process.env.REVIEW_BOT_LOGIN || 'github-actions[bot]';
  }
  async request(method, path, body) {
    const response = await this.fetcher(`https://api.github.com${path}`, {
      method,
      headers: {
        authorization: `Bearer ${this.token}`,
        accept: 'application/vnd.github+json',
        'X-GitHub-Api-Version': '2022-11-28',
        'content-type': 'application/json',
      },
      ...(body === undefined ? {} : { body: JSON.stringify(body) }),
    });
    if (!response.ok) {
      const e = Error(`GitHub ${method} ${path}: ${response.status} ${await response.text()}`);
      e.status = response.status;
      throw e;
    }
    return response.status === 204 ? null : response.json();
  }
  async list(path) {
    const result = [];
    for (let page = 1; ; page++) {
      const rows = await this.request('GET', `${path}${path.includes('?') ? '&' : '?'}per_page=100&page=${page}`);
      if (!Array.isArray(rows)) throw Error(`Expected paginated array: ${path}`);
      result.push(...rows);
      if (rows.length < 100) return result;
    }
  }
  async file(path, ref) {
    try {
      const r = await this.request('GET', `${this.root}/contents/${path}?ref=${encodeURIComponent(ref)}`);
      if (r.type !== 'file' || r.encoding !== 'base64') throw Error(`Not an inline file: ${path}`);
      return Buffer.from(r.content, 'base64').toString('utf8');
    } catch (e) {
      if (e.status === 404) return null;
      throw e;
    }
  }
  async tree(ref) {
    const commit = await this.request('GET', `${this.root}/commits/${encodeURIComponent(ref)}`);
    const tree = await this.request('GET', `${this.root}/git/trees/${commit.commit.tree.sha}?recursive=1`);
    if (tree.truncated) throw Error('Repository tree is truncated; administrator must reconcile scope');
    return {
      sha: commit.sha,
      tree: commit.commit.tree.sha,
      files: Object.fromEntries(tree.tree.filter((f) => f.type === 'blob').map((f) => [f.path, { sha: f.sha, mode: f.mode }])),
    };
  }
  async commit(parent, changes, message) {
    const base = await this.request('GET', `${this.root}/git/commits/${parent}`);
    const tree = await this.request('POST', `${this.root}/git/trees`, { base_tree: base.tree.sha, tree: changes });
    return (await this.request('POST', `${this.root}/git/commits`, { message, tree: tree.sha, parents: [parent] })).sha;
  }
  async ensureBranch(branch, sha) {
    try {
      await this.request('POST', `${this.root}/git/refs`, { ref: `refs/heads/${branch}`, sha });
    } catch (e) {
      if (e.status !== 422) throw e;
      const existing = await this.request('GET', `${this.root}/git/ref/heads/${branch}`);
      if (existing.object.sha !== sha) throw Error(`Existing branch ${branch} has unexpected content; reconcile instead of overwriting`);
    }
  }
  async admin(login) {
    const p = await this.request('GET', `${this.root}/collaborators/${encodeURIComponent(login)}/permission`);
    if (p.permission === 'admin') return true;
    try {
      const m = await this.request('GET', `/orgs/${this.repository.split('/')[0]}/teams/docs-admin/memberships/${encodeURIComponent(login)}`);
      return m.state === 'active';
    } catch (e) {
      if ([403, 404].includes(e.status)) return false;
      throw e;
    }
  }
}
class Store {
  constructor(api) {
    this.api = api;
    this.sha = null;
    this.lastContent = null;
    this.data = { version: 1, prs: {}, sessions: {} };
  }
  async read() {
    try {
      const r = await this.api.request('GET', `${this.api.root}/contents/state.json?ref=review-state`);
      this.sha = r.sha;
      this.data = JSON.parse(Buffer.from(r.content, 'base64').toString('utf8'));
      if (this.data.version !== 1 || !this.data.prs || !this.data.sessions) throw Error('Invalid review-state schema');
      this.lastContent = JSON.stringify(this.data, null, 2) + '\n';
    } catch (e) {
      if (e.status !== 404) throw e;
    }
    return this.data;
  }
  async save() {
    const content = JSON.stringify(this.data, null, 2) + '\n';
    if (this.sha && content === this.lastContent) return;
    if (!this.sha) {
      // An orphan branch keeps state out of main and out of deployed site sources.
      const tree = await this.api.request('POST', `${this.api.root}/git/trees`, {
        tree: [
          {
            path: 'README.md',
            mode: '100644',
            type: 'blob',
            content: 'Durable review state. Only the review controller and administrators may write here.\n',
          },
        ],
      });
      const commit = await this.api.request('POST', `${this.api.root}/git/commits`, {
        message: 'Initialize review state',
        tree: tree.sha,
        parents: [],
      });
      try {
        await this.api.request('POST', `${this.api.root}/git/refs`, { ref: 'refs/heads/review-state', sha: commit.sha });
      } catch (e) {
        if (e.status !== 422) throw e;
        // Never replace state initialized by another writer with a stale snapshot.
        const current = await this.api.file('state.json', 'review-state');
        if (current) throw Error('Review state was initialized concurrently; rerun Review Control');
      }
    }
    const result = await this.api.request('PUT', `${this.api.root}/contents/state.json`, {
      branch: 'review-state',
      message: 'Record review workflow transition',
      content: Buffer.from(content).toString('base64'),
      ...(this.sha ? { sha: this.sha } : {}),
    });
    this.sha = result.content.sha;
    this.lastContent = content;
  }
}
module.exports = { GitHub, Store };
