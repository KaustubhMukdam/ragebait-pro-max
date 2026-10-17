/**
 * main.js — page bootstrap for both pages.
 * 1. Reads body[data-page], applies ?chaos=off (session-persistent).
 * 2. Builds the seeded RNG and the Rage Meter (header chip + tooltip).
 * 3. Wires NORMAL, chaos-free form behavior (P1: everything behaves properly).
 * 4. Boots js/registry.js, which loads this page's rage modules (P2+).
 *
 * Rage behavior never lives here — only in js/modules/* (Rage Contract item 5).
 */
import { createRng } from './rng.js';
import * as store from './store.js';
import { initRegistry, featureLabel, registeredFeatures } from './registry.js';

const page = document.body.dataset.page || 'index';

store.initChaosFromUrl();
const chaos = store.isChaosOn();
const rng = createRng();

/* ---------------- Rage Meter (shared header chrome) ---------------- */

const meter = document.getElementById('rage-meter');
const meterState = document.getElementById('rage-state');
const meterCount = document.getElementById('rage-count');
const meterSummary = document.getElementById('rage-summary');
const meterList = document.getElementById('rage-list');

const rage = store.createRage(renderMeter);

function renderMeter() {
  if (!meter) return;
  const { total, tally } = rage.read();
  meterCount.textContent = String(total);
  meter.dataset.chaos = chaos ? 'on' : 'off';
  meterState.textContent = chaos ? '🔥' : '😌';
  meter.setAttribute(
    'aria-label',
    chaos
      ? `Rage meter: ${total} annoyances triggered so far. Chaos is on.`
      : `Rage meter: ${total} annoyances triggered so far. Calm mode is on.`,
  );
  meterSummary.textContent =
    total === 0 ? 'No rage yet. It builds.' : `${total} annoyance${total === 1 ? '' : 's'} triggered`;
  const rows = Object.entries(tally).sort((a, b) => b[1] - a[1]);
  meterList.replaceChildren(
    ...rows.map(([id, n]) => {
      const li = document.createElement('li');
      li.className = 'rage-meter__row';
      const name = document.createElement('span');
      name.textContent = featureLabel(id);
      const num = document.createElement('b');
      num.textContent = `×${n}`;
      li.append(name, num);
      return li;
    }),
  );
}

renderMeter();

/* ---------------- normal (chaos-free) page behavior ---------------- */

function initialsOf(name) {
  const parts = String(name).trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return '??';
  return parts.slice(0, 2).map((part) => part[0].toUpperCase()).join('');
}

function wireSignup() {
  const form = document.getElementById('signup-form');
  if (!form) return;
  // Native validation must pass before 'submit' fires, so fields behave normally in P1.
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    store.saveAccount({
      username: document.getElementById('username')?.value.trim() || '',
      phone: document.getElementById('phone')?.value.trim() || '',
    });
    location.href = 'profile.html';
  });
}

function wireProfile() {
  const nameInput = document.getElementById('display-name');
  const avatarInitials = document.getElementById('avatar-initials');
  const saved = store.getProfile();
  const account = store.getAccount();

  if (nameInput) {
    if (saved.displayName) nameInput.value = saved.displayName;
    else if (account?.username) nameInput.value = account.username;
    const syncAvatar = () => {
      if (avatarInitials) avatarInitials.textContent = initialsOf(nameInput.value);
    };
    syncAvatar();
    nameInput.addEventListener('input', syncAvatar);
  }

  const visibility = document.getElementById('visibility');
  const visibilityOut = document.getElementById('visibility-out');
  visibility?.addEventListener('input', () => {
    visibilityOut.textContent = `${visibility.value}%`;
  });

  const bio = document.getElementById('bio');
  const bioCount = document.getElementById('bio-count');
  bio?.addEventListener('input', () => {
    bioCount.textContent = String(bio.value.length);
  });

  document.getElementById('save-name-btn')?.addEventListener('click', () => {
    const displayName = nameInput?.value.trim() || 'Guest Rage';
    store.saveProfile({ displayName });
    const chip = document.getElementById('save-name-status');
    if (chip) {
      chip.textContent = 'Saved.';
      chip.hidden = false;
    }
  });

  document.getElementById('save-btn')?.addEventListener('click', () => {
    store.saveProfile({
      displayName: nameInput?.value.trim() || 'Guest Rage',
      visibility: Number(visibility?.value ?? 0),
      bio: bio?.value ?? '',
    });
    showToast('Saved! Full transparency: nothing left this browser — there is no server.');
  });
}

/**
 * Toast with a module extension point: before removing the toast we
 * dispatch a cancelable `rbm:toast-dismiss` event (bubbles to document)
 * so a rage module can intercept dismissals (e.g. the 3-click toast).
 */
function showToast(text) {
  const root = document.getElementById('toast-root');
  if (!root) return null;
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.setAttribute('role', 'status');

  const msg = document.createElement('span');
  msg.className = 'toast__text';
  msg.textContent = text;

  const close = document.createElement('button');
  close.type = 'button';
  close.className = 'btn btn--ghost btn--sm toast__close';
  close.setAttribute('aria-label', 'Dismiss notification');
  close.textContent = '✕';

  close.addEventListener('click', () => {
    const event = new CustomEvent('rbm:toast-dismiss', {
      bubbles: true,
      cancelable: true,
      detail: { toast, close },
    });
    if (close.dispatchEvent(event)) toast.remove();
  });

  toast.append(msg, close);
  root.append(toast);
  return toast;
}

/* ---------------- shared niceties ---------------- */

document.querySelectorAll('[data-year]').forEach((el) => {
  el.textContent = String(new Date().getFullYear());
});

/* ---------------- boot ---------------- */

wireSignup();
wireProfile();

const ctx = { rng, rage, chaos, page, root: document };
await initRegistry(ctx);

// Debug/verification handle (used by the agent's VERIFY step; harmless in prod).
window.__rbm = { page, chaos, rng, rage, store, features: registeredFeatures() };
