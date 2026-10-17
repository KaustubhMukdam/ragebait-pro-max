/**
 * store.js — localStorage/sessionStorage wrappers.
 * Holds: Rage Meter (total + per-feature tally), chaos flags,
 * fake account/profile saves, scroll-normalize preference.
 * Every read is defensive so a blocked storage never breaks a page.
 */

const KEYS = {
  rage: 'rbm.rage.v1',
  moduleChaos: 'rbm.chaos.v1',   // per-module overrides { featureId: boolean }
  calm: 'rbm.calm.v1',           // session-wide calm (?chaos=off), sessionStorage
  account: 'rbm.account.v1',
  profile: 'rbm.profile.v1',
  scrollNormalized: 'rbm.scrollNorm.v1',
};

function read(key, fallback, area = localStorage) {
  try {
    const raw = area.getItem(key);
    return raw == null ? fallback : JSON.parse(raw);
  } catch {
    return fallback;
  }
}

function write(key, value, area = localStorage) {
  try {
    area.setItem(key, JSON.stringify(value));
  } catch {
    /* storage unavailable (private mode/blocked): keep state in memory for this page */
  }
}

/* ---------------- Rage Meter ---------------- */

/**
 * @param {() => void} [onChange] called after every bump so the
 * header chip can re-render instantly.
 */
export function createRage(onChange) {
  let state = read(KEYS.rage, { total: 0, tally: {} });
  if (typeof state.total !== 'number' || typeof state.tally !== 'object' || state.tally === null) {
    state = { total: 0, tally: {} };
  }
  return {
    bump(featureId = 'unknown') {
      state = {
        total: state.total + 1,
        tally: { ...state.tally, [featureId]: (state.tally[featureId] || 0) + 1 },
      };
      write(KEYS.rage, state);
      onChange?.();
    },
    count() { return state.total; },
    tally() { return { ...state.tally }; },
    read() { return { total: state.total, tally: { ...state.tally } }; },
  };
}

/* ---------------- chaos flags ---------------- */

/** Call once per page load, BEFORE isChaosOn(). Reads ?chaos=off|on. */
export function initChaosFromUrl() {
  try {
    const param = new URLSearchParams(location.search).get('chaos');
    if (param === 'off') sessionStorage.setItem(KEYS.calm, '1');
    if (param === 'on') sessionStorage.removeItem(KEYS.calm);
  } catch {
    /* ignore */
  }
}

/** Global switch: chaos ON by default; ?chaos=off persists for the tab session. */
export function isChaosOn() {
  try {
    return sessionStorage.getItem(KEYS.calm) !== '1';
  } catch {
    return true;
  }
}

/** Per-module flag (registry provides the default; overrides persist). */
export function moduleChaos(featureId, registryDefault = true) {
  const overrides = read(KEYS.moduleChaos, {});
  return typeof overrides[featureId] === 'boolean' ? overrides[featureId] : registryDefault;
}

export function setModuleChaos(featureId, on) {
  const overrides = read(KEYS.moduleChaos, {});
  overrides[featureId] = !!on;
  write(KEYS.moduleChaos, overrides);
}

/* ---------------- fake persistence ---------------- */

export function saveAccount(account) { write(KEYS.account, account); }
export function getAccount() { return read(KEYS.account, null); }

export function saveProfile(patch) {
  write(KEYS.profile, { ...read(KEYS.profile, {}), ...patch });
}
export function getProfile() { return read(KEYS.profile, {}); }

/* ---------------- scroll normalize preference ---------------- */

export function scrollNormalized() { return read(KEYS.scrollNormalized, false); }
export function setScrollNormalized(on) { write(KEYS.scrollNormalized, !!on); }
