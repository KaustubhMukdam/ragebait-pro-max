# PRD — Ragebait Pro Max (Token Treachery, Round 2)

## Problem statement
Hackathon brief: build a sign-up + profile experience packed with deliberately infuriating UX features while keeping a genuinely good, cohesive UI. Judging: prompt architecture/constraint design 35%, functional chaos/execution 30%, agent autonomy 20%, UI cohesion 15%. Deliverables: GitHub repo, README with prompt inputs/outputs, screen recording. Max 2 pages.

## Target users
- **Primary:** hackathon judges (must operate the whole flow in ~3 minutes without soft-locks or confusion about what's intentional).
- **Secondary:** the agent itself — docs/AGENTS.md are the steering interface for every subsequent prompt.

## Core features (MVP) — acceptance criteria
- [ ] **Reshuffling keyboard** — username keys permute after every keystroke; typing still works; seeded; Rage +1 per reshuffle.
- [ ] **Infinite phone incrementer** — 000-000-0000, ±1 buttons, Jump buttons off-by-one (999/99,999/999,999); target printed; exactly reachable.
- [ ] **Contradictory password rule engine** — 8 rules, ALL active rules enforced at once, look contradictory but jointly satisfiable; masked live hint; witness password documented + verified by `scripts/verify_password_rules.mjs`.
- [ ] **Dodging Submit** — flees cursor exactly 5 times, then clickable; keyboard path exists.
- [ ] **Swapped Yes/No confirmation chain** — 3 steps on sign-up and on profile save; accent glow marks the continuing button.
- [ ] **Save label cycler** — misleading deterministic labels; every click saves.
- [ ] **Dice / Pi visibility slider** — drag snaps back; settable by d20 roll or exact Pi digits.
- [ ] **Reverse + accelerating scroll** — with keyboard-reachable normalize toggle (footer button + `Shift+R`), persisted.
- [ ] **Rage Meter** — header counter, per-feature tally tooltip, persisted across pages via localStorage.

## Nice-to-have (stretch, fixed order, hard stop minute 46)
1. Username availability checker — always "taken", absurd suggestions, available on 4th check.
2. Fake progress bar stuck at 99% (deterministic stall, auto-completes).
3. Success toast needing 3 dismiss clicks.
4. Cookie banner where "Reject" runs away (stops after 3 dodges; keyboard always works).
5. Bio textarea that deletes every 10th character (visible warning counter + undo).
6. Date-of-birth wheel starting at year 1900 (type-in escape hatch).

## Non-goals
- No real authentication, validation backend, or persistence beyond localStorage.
- No frameworks/build tooling/dependencies of any kind.
- No broken features: anything that reads as a bug instead of a joke is a defect.

## Success metrics
- 12+ contract-passing rage features; 100% PASS in final contract audit; zero soft-locks.
- Full sign-up → profile → save flow completable by keyboard alone.
- Calm baseline under `?chaos=off`; no console errors; screen recording < 3 min.

## Constraints
- **Time:** 50 minutes total; docs ≤ 8 min; stretch hard stop at minute 46.
- **Tech:** static site, vanilla JS ES modules, plain CSS tokens, system fonts, no build, no npm.
- **Environment:** GitHub Pages project site → all paths relative (no leading `/`); dev via `python3 -m http.server`.
- **A11y:** `prefers-reduced-motion` respected; every twist keyboard-operable; visible focus; no `alert()`/`confirm()`.
