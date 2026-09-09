'use strict';
function identity(run) {
  const named = run.display_title?.match(/^Validate PR #(\d+) at ([a-f0-9]{40})$/);
  if (run.event === 'workflow_dispatch') return run.head_branch === 'main' && named ? { number: Number(named[1]), sha: named[2] } : null;
  if (run.event !== 'pull_request') return null;
  const number = named ? Number(named[1]) : run.pull_requests?.[0]?.number;
  if (!number || (named && named[2] !== run.head_sha)) return null;
  return { number, sha: run.head_sha };
}
async function latestBuilds(api) {
  const result = await api.request('GET', `${api.root}/actions/workflows/ci-build.yml/runs?per_page=100`);
  const seen = new Set(),
    builds = [];
  const runs = result.workflow_runs.sort(
    (a, b) => String(b.run_started_at || b.created_at || '').localeCompare(String(a.run_started_at || a.created_at || '')) || b.id - a.id,
  );
  for (const run of runs) {
    const target = identity(run);
    if (!target) continue;
    const key = `${target.number}:${target.sha}`;
    if (seen.has(key)) continue;
    seen.add(key);
    builds.push({ ...target, run });
  }
  return builds;
}
async function artifactFor(api, build) {
  if (build.run.conclusion !== 'success') return null;
  const result = await api.request('GET', `${api.root}/actions/runs/${build.run.id}/artifacts?per_page=100`);
  return result.artifacts.find((a) => !a.expired && a.name === `preview-${build.number}-${build.sha}`) || null;
}
async function synchronizeBuilds(api, store) {
  for (const build of await latestBuilds(api)) {
    const state = store.data.prs[build.number];
    if (!state || state.cancelled) continue;
    const pr = await api.request('GET', `${api.root}/pulls/${build.number}`);
    if (pr.state !== 'open' || pr.head.sha !== build.sha) continue;
    const signature = `${build.run.id}:${build.run.run_attempt || 1}:${build.run.status}:${build.run.conclusion}`;
    if (state.ciResult === signature) continue;
    const pending = build.run.status !== 'completed' && !build.run.conclusion;
    const artifact = await artifactFor(api, build);
    const outcome = pending ? 'pending' : artifact ? 'success' : 'failure';
    await api.request('POST', `${api.root}/statuses/${build.sha}`, {
      context: 'CI Build',
      state: outcome,
      description:
        outcome === 'success'
          ? 'Current PR revision built successfully'
          : pending
            ? 'Current revision is building'
            : 'Latest build failed or has no preview artifact',
    });
    state.ciResult = signature;
    state.ciSha = build.sha;
    if (state.preview && (outcome !== 'success' || state.preview.sha !== build.sha)) state.preview.stale = true;
  }
  await store.save();
}
module.exports = { identity, latestBuilds, artifactFor, synchronizeBuilds };
