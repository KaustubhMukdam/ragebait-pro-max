/**
 * registry.js — the feature inventory (AGENTS.md Rage Contract, item 5).
 *
 * One entry per rage module, in the shape:
 *   {
 *     id:    'phone_incrementer',            // stable id used in the Rage Meter tally
 *     label: 'Phone incrementer',            // human label shown in the meter tooltip
 *     pages: ['index'],                      // where it runs
 *     chaos: true,                           // skipped entirely when ?chaos=off
 *     load:  () => import('./modules/phone_incrementer.js'),
 *   }
 *
 * P1 ships the plumbing only — entries are appended as modules land.
 * Modules export `init(ctx)` with ctx = { rng, rage, chaos, page, root }.
 */

const FEATURES = [
  { id: 'username_keyboard', label: 'Shuffle keyboard', pages: ['index'], chaos: true, load: () => import('./modules/username_keyboard.js') },
  { id: 'phone_incrementer', label: 'Infinite phone incrementer', pages: ['index'], chaos: true, load: () => import('./modules/phone_incrementer.js') },
  { id: 'password_rules', label: 'Contradictory password rules', pages: ['index'], chaos: true, load: () => import('./modules/password_rules.js') },
  { id: 'submit_dodge', label: 'Submit dodger', pages: ['index'], chaos: true, load: () => import('./modules/submit_dodge.js') },
  { id: 'confirm_chain', label: 'Swapped confirmation chain', pages: ['index'], chaos: true, load: () => import('./modules/confirm_chain.js') },
  { id: 'name_save_label', label: 'Misleading save labels', pages: ['profile'], chaos: true, load: () => import('./modules/name_save_label.js') },
  { id: 'visibility_dice', label: 'Dice / π visibility', pages: ['profile'], chaos: true, load: () => import('./modules/visibility_dice.js') },
  { id: 'reverse_scroll', label: 'Reverse scroll', pages: ['profile'], chaos: true, load: () => import('./modules/reverse_scroll.js') },
  { id: 'profile_confirm', label: 'Swapped save confirmation', pages: ['profile'], chaos: true, load: () => import('./modules/profile_confirm.js') },
  { id: 'username_checker', label: 'Always-taken username checker', pages: ['index'], chaos: true, load: () => import('./modules/username_checker.js') },
  { id: 'fake_progress', label: '99% progress bar', pages: ['index'], chaos: true, load: () => import('./modules/fake_progress.js') },
  { id: 'three_click_toast', label: 'Three-click toast', pages: ['profile'], chaos: true, load: () => import('./modules/three_click_toast.js') },
  { id: 'cookie_banner', label: 'Runaway cookie banner', pages: ['profile'], chaos: true, load: () => import('./modules/cookie_banner.js') },
  { id: 'bio_eater', label: 'Bio character eater', pages: ['profile'], chaos: true, load: () => import('./modules/bio_eater.js') },
  { id: 'dob_wheel', label: '1900 date picker', pages: ['index'], chaos: true, load: () => import('./modules/dob_wheel.js') },
];

const LABELS = new Map(FEATURES.map((f) => [f.id, f.label]));

/** Human label for a feature id (falls back to the raw id). */
export function featureLabel(id) {
  return LABELS.get(id) || id;
}

/** Snapshot of the inventory — exposed for debugging and the audit. */
export function registeredFeatures() {
  return FEATURES.map(({ id, label, pages, chaos }) => ({ id, label, pages, chaos }));
}

/**
 * Init every feature registered for `ctx.page`, honouring the global
 * chaos flag. Each module is isolated: one failing module never
 * prevents the page or the other modules from working (no soft-locks).
 * @returns {Promise<string[]>} ids of the modules that were started
 */
export async function initRegistry(ctx) {
  const runnable = FEATURES.filter(
    (f) => f.pages.includes(ctx.page) && (!f.chaos || ctx.chaos),
  );
  const skipped = FEATURES.length - runnable.length;
  if (skipped > 0) {
    console.info(`[rbm] chaos off: skipped ${skipped} module(s)`);
  }
  const started = [];
  for (const feature of runnable) {
    try {
      const mod = await feature.load();
      mod.init(ctx);
      started.push(feature.id);
    } catch (err) {
      console.error(`[rbm] failed to init "${feature.id}" — continuing without it`, err);
    }
  }
  if (started.length > 0) {
    console.info(`[rbm] active on "${ctx.page}": ${started.join(', ')}`);
  }
  return started;
}
