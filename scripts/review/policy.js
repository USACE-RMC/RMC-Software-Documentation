'use strict';

const LANES = Object.freeze({
  new: Object.freeze(['peer', 'lead', 'editor']),
  major: Object.freeze(['peer', 'lead', 'editor']),
  minor: Object.freeze(['peer', 'editor']),
  editorial: Object.freeze([]),
  dev: Object.freeze([]),
  code: Object.freeze([]),
  director: Object.freeze(['director']),
  publication: Object.freeze([]),
});

const ADMIN_ACTIONS = new Set(['classify', 'author', 'assign', 'complete', 'waive', 'restart', 'cancel']);

function normalizeLogin(login, field = 'login') {
  if (typeof login !== 'string' || !login.trim()) {
    throw new Error(`invalid ${field}`);
  }
  return login.trim().toLowerCase();
}

function clone(value) {
  return structuredClone(value);
}

function createState(number, author) {
  return {
    number,
    authors: [normalizeLogin(author, 'author')],
    lane: null,
    document: null,
    stages: {},
    history: [],
    kind: 'content',
    cancelled: false,
    notifications: {},
  };
}

function requiredStages(state) {
  return state.lane === null ? [] : LANES[state.lane];
}

function stageSatisfied(stage) {
  return stage?.status === 'approved' || stage?.status === 'waived';
}

function currentStage(state) {
  if (state.cancelled || state.lane === null) return null;
  return requiredStages(state).find((stage) => !stageSatisfied(state.stages[stage])) ?? null;
}

function isComplete(state) {
  return !state.cancelled && state.lane !== null && currentStage(state) === null;
}

function assertAdmin(actor, action) {
  if (ADMIN_ACTIONS.has(action.type) && !actor.isAdmin) {
    throw new Error(`unauthorized ${action.type} action`);
  }
}

function assertRequiredStage(state, stage) {
  if (!requiredStages(state).includes(stage)) {
    throw new Error(`invalid stage ${stage}`);
  }
}

function assertAssignableStage(state, stage) {
  if (requiredStages(state).includes(stage)) return;
  if (state.lane === 'new' && stage === 'director') return;
  throw new Error(`invalid stage ${stage}`);
}

function nonAdminReviewerUses(state, login) {
  const uses = [];
  for (const [stage, value] of Object.entries(state.stages)) {
    if (value?.reviewer === login && !value.reviewerIsAdmin) uses.push(stage);
  }
  for (const entry of state.history) {
    const action = entry?.action;
    if (action?.type === 'assign' && !action.reviewerIsAdmin && typeof action.login === 'string' && action.login.trim().toLowerCase() === login) {
      uses.push(action.stage);
    }
  }
  return uses;
}

function record(state, action, actor) {
  state.history.push({
    actor: {
      login: normalizeLogin(actor.login, 'actor login'),
      isAdmin: Boolean(actor.isAdmin),
      role: actor.isAdmin ? 'admin' : 'user',
    },
    action: clone(action),
  });
}

function transition(input, action, actor) {
  if (!input || !action || !actor || typeof action.type !== 'string') {
    throw new Error('invalid transition');
  }

  const actorLogin = normalizeLogin(actor.login, 'actor login');
  assertAdmin(actor, action);
  if (input.cancelled) {
    throw new Error('review session is cancelled');
  }

  const state = clone(input);

  switch (action.type) {
    case 'classify': {
      if (!Object.hasOwn(LANES, action.lane)) throw new Error(`invalid lane ${action.lane}`);
      const document = action.document === '-' || action.document == null ? null : String(action.document).trim();
      if (action.lane !== 'code' && !document) throw new Error('invalid document');
      if (state.document && document !== state.document) {
        throw new Error('document identity cannot be changed');
      }
      state.lane = action.lane;
      state.document = document;
      break;
    }

    case 'author': {
      const login = normalizeLogin(action.login, 'author');
      if (nonAdminReviewerUses(state, login).length > 0) {
        throw new Error('an author cannot overlap a non-admin reviewer');
      }
      if (!state.authors.includes(login)) state.authors.push(login);
      break;
    }

    case 'assign': {
      assertAssignableStage(state, action.stage);
      const reviewer = normalizeLogin(action.login, 'reviewer');
      const existing = state.stages[action.stage];
      if (existing?.reviewer === reviewer && Boolean(existing.reviewerIsAdmin) === Boolean(action.reviewerIsAdmin)) {
        return state;
      }
      if (stageSatisfied(existing)) return state;

      if (!action.reviewerIsAdmin) {
        if (state.authors.includes(reviewer)) {
          throw new Error('a non-admin reviewer cannot review their own work as an author');
        }
        const usedElsewhere = nonAdminReviewerUses(state, reviewer).some((stage) => stage !== action.stage);
        if (usedElsewhere) {
          throw new Error('a non-admin reviewer cannot serve in multiple stages');
        }
      }

      state.stages[action.stage] = {
        reviewer,
        reviewerIsAdmin: Boolean(action.reviewerIsAdmin),
        round: (existing?.round ?? 0) + 1,
        status: 'pending',
      };
      break;
    }

    case 'approve': {
      assertRequiredStage(state, action.stage);
      if (currentStage(state) !== action.stage) {
        throw new Error('approval is not for the current stage');
      }
      const stage = state.stages[action.stage];
      if (!stage?.reviewer || stage.reviewer !== actorLogin) {
        throw new Error('approval is not from the authoritative reviewer');
      }
      if (action.round !== undefined && action.round !== stage.round) {
        throw new Error('stale approval round');
      }
      state.stages[action.stage] = {
        ...stage,
        status: 'approved',
        approvedBy: actorLogin,
        reviewId: action.reviewId,
      };
      break;
    }

    case 'complete': {
      assertRequiredStage(state, action.stage);
      if (currentStage(state) !== action.stage) {
        throw new Error('completion is not for the current stage');
      }
      const stage = state.stages[action.stage] ?? { round: 1 };
      state.stages[action.stage] = {
        ...stage,
        status: 'approved',
        completedBy: actorLogin,
      };
      break;
    }

    case 'waive': {
      assertRequiredStage(state, action.stage);
      const stage = state.stages[action.stage] ?? { round: 1 };
      if (stageSatisfied(stage)) break;
      state.stages[action.stage] = {
        ...stage,
        status: 'waived',
        waivedBy: actorLogin,
        ...(action.reason ? { reason: action.reason } : {}),
      };
      break;
    }

    case 'restart': {
      assertRequiredStage(state, action.stage);
      const stage = state.stages[action.stage] ?? {};
      const restarted = {
        ...(stage.reviewer
          ? {
              reviewer: stage.reviewer,
              reviewerIsAdmin: Boolean(stage.reviewerIsAdmin),
            }
          : {}),
        round: (stage.round ?? 0) + 1,
        status: 'pending',
      };
      if (action.reason) restarted.restartReason = action.reason;
      state.stages[action.stage] = restarted;
      break;
    }

    case 'cancel':
      state.cancelled = true;
      break;

    default:
      throw new Error(`invalid action ${action.type}`);
  }

  record(state, action, actor);
  return state;
}

module.exports = { LANES, createState, currentStage, isComplete, transition };
