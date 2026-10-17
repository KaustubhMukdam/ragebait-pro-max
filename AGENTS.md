# AGENTS.md — Ragebait Pro Max (Attack on Token, Round 2: Token Treachery)

## Goal
Build a two-page static "ragebait" site (sign-up + profile) packed with deliberately infuriating UX features that are **deterministic, solvable, visibly funny, and housed in one polished, cohesive UI**. Chaos lives inside good design.

## Stack (fixed)
Static site · vanilla JavaScript ES modules · plain CSS with design tokens · system font stack · localStorage · seeded RNG (`js/rng.js`) · no build step · no npm dependencies · GitHub Pages deployable · dev via `python3 -m http.server`.

## Hard constraints (non-negotiable)
1. Every feature obeys the **Rage Contract** below (all 6 points).
2. Static site, ES modules, no build step, no external dependencies/CDNs.
3. One design system in `css/tokens.css`; **no inline one-off styles**; no `alert()`/`confirm()`; visible focus states; responsive.
4. All randomness through `js/rng.js` (seeded) — behavior reproducible.
5. **No soft-locks.** Every task completable by a human in reasonable time.
6. Global chaos kill-switch `?chaos=off` (URL param), **chaos ON by default**; every module carries a per-module chaos flag in `registry.js`.
7. **All asset/link paths relative** (no leading `/`) so the site works under `/repo-name/` on GitHub Pages.
8. **`prefers-reduced-motion: reduce` respected** for all animations/transitions; **every twist operable by keyboard**; the scroll-normalize toggle must be keyboard reachable (also bound to `Shift+R`).
9. Log every step to `docs/PROMPTS.md` per the logging rules; update `docs/tasks.md` at the end of every phase.

## The Rage Contract — every feature must satisfy ALL six
1. **Trigger:** the interaction the user expects (type, click, drag, scroll).
2. **Twist:** the deliberate betrayal — deterministic, or driven by seeded RNG in `js/rng.js`.
3. **Solvable:** the user can always finish; no dead ends. The agent states *how* it's solved and proves it (script or documented steps).
4. **Feedback:** a visible reaction (microcopy, shake, counter) so the joke reads instantly.
5. **Isolated:** one self-contained file per feature in `js/modules/`, exporting `init(ctx)`, registered in `js/registry.js`, with a chaos flag.
6. **On-brand:** styled from shared tokens, labelled, keyboard-operable, visible focus, no raw browser dialogs.

**Module contract:** `export function init(ctx)` where `ctx = { rng, rage, chaos, page, root }`.
`rage.bump(id)` increments the header Rage Meter (persisted in `localStorage`, shared across pages).

## Spec / twist table

### Page 1 — `index.html` (Sign-up)
| Element | Label says | Actual behavior | Visible feedback | Solvable by |
|---|---|---|---|---|
| Username + on-screen keyboard | "Choose a username" | Key positions permute after **every keystroke** (seeded shuffle) | Keys spring to new slots, "Keys rearranging…" chip, Rage +1 | Typing on shuffled keys or physical keyboard — reshuffle is per keystroke, never blocks input |
| Phone `000-000-0000` | "Enter your phone number" | Typing ignored; only +/− (±1) and **Jump** buttons adding **999 / 99,999 / 999,999** (always one short of round) | Rolling digit animation, "Off by one. Again.", Rage +1 per Jump | Target number printed on the card; Jumps get within range, +/− lands exactly |
| Password + rule engine | "Password (rules below)" | **All active rules enforced simultaneously**, max 8; new absurd rule appears after the previous is met; rules *look* contradictory but are jointly satisfiable at every step | Rule list with strikethrough on pass, shake + new rule slides in, "3 of 8 rules", Rage +1 per new rule | Documented witness password satisfies all 8; live masked hint shows an example valid for the currently active rules |
| Submit button | "Create account" | Flees cursor **exactly 5 times** to seeded positions, then stays and pulses | Spring-scoot, "Dodges left: 5→0", Rage +1 per dodge | Wait out 5 dodges, then click; keyboard focus + Enter works on the 6th state |
| Confirmation chain ×3 | "Are you sure? [Yes] [No]" | Labels **and** positions swap each step (deterministic alternation) | Buttons slide-swap, hint microcopy after step 1, Rage +1 per step | Follow the accent-glow button — it always continues |
| *(stretch)* Username checker | "Check availability" | Always "taken"; suggests `name_taken_again_7`-style names (seeded counter) | Red chip + absurd suggestions, Rage +1 per check | 4th check: "Fine. Nobody wants it. Available." |
| *(stretch)* Progress bar | "Setting up your account…" | Deterministic climb to **99%**, stalls ~4 s, completes itself | "99%… 99%… 99% (classic)", Rage +1 | Wait — auto-completes, zero interaction |

### Page 2 — `profile.html` (Profile)
| Element | Label says | Actual behavior | Visible feedback | Solvable by |
|---|---|---|---|---|
| Avatar + display name Save | Label cycles Save → Cancel → Discard → Save | Label lies; **every click always saves** (deterministic, no data loss) | Label swap + "Saved (the label was lying)" chip, Rage +1 | Clicking any label — all of them save |
| Visibility slider | "Drag to set visibility" | Drag always snaps back to 0; value set only by **Roll d20** button or typing **Pi digits** | Knob springs back, "The dice have spoken: 14", correct/incorrect Pi digit indicator, Rage +1 per failed drag | Roll dice to any value, or type `3.1415926…` exactly |
| Page scroll | "Scroll down to explore" | Wheel down scrolls **up**; every 4th wheel event accelerates 1.5× | Inverted glide + "↯ drift" indicator, Rage +1 per burst | Footer micro-link **"normalize scroll"** (focusable button) + `Shift+R`, persisted in localStorage |
| Profile save | "Save changes" | Reuses the 3-step swapped Yes/No chain | Same glow affordance, Rage +1 per step | Glowing button |
| Success toast | "Saved! ×" | Needs **3 clicks** to dismiss | × → ×× → closes, Rage +1 per click | Three clicks |

**Both pages:** header **Rage Meter** chip (🔥 count) — every module calls `rage.bump(id)`, persisted via `localStorage`; hover/focus tooltip shows per-feature tally.

### Password rule engine — special constraint
- **ALL active rules are enforced at all times** (not just the newest). Max 8 rules.
- Rules must *appear* contradictory (e.g. "must contain a digit" alongside "must not end with a digit") but be **jointly satisfiable at every step** by construction.
- A **documented witness password satisfying all 8 final rules** is defined in `js/modules/password_rules.js` (file header) and repeated in the README.
- The witness is verified programmatically by `scripts/verify_password_rules.mjs` (node) — the same rule functions are imported by the page and the script; script exits non-zero on failure.
- The live hint shows a **masked** example satisfying the currently active rules (updates as rules appear).

### Stretch order (cheap and visible first; hard stop at minute 46)
1. username availability checker → 2. fake 99% progress bar → 3. three-click toast → 4. runaway cookie banner → 5. bio eater (deletes every 10th char, visible counter + undo) → 6. DOB wheel starting at 1900.

## Done criteria
- [ ] All 8 core features + Rage Meter working, contract PASS each.
- [ ] Stretch features added in the listed order until minute 46.
- [ ] `node scripts/verify_password_rules.mjs` passes.
- [ ] No console errors; both pages load over `python3 -m http.server`.
- [ ] `?chaos=off` renders a fully calm page; `Shift+R` / footer toggle restores normal scroll.
- [ ] `docs/tasks.md` current, `docs/PROMPTS.md` complete, README with prompt inputs/outputs.

## Prompt skeleton (use in every step prompt)
```
ROLE: You are building a ragebait sign-up + profile site. Follow AGENTS.md.
GOAL OF THIS STEP: <one sentence>
CHANGE: <exactly what to add/modify>
DO NOT TOUCH: <files/features to leave alone>
HARD CONSTRAINTS: <numbered list; always includes the Rage Contract>
VERIFY: After the change, list every constraint with PASS/FAIL plus evidence. Fix any FAIL yourself before finishing.
LOG: Append this step's summary to docs/PROMPTS.md.
```
Every `docs/PROMPTS.md` entry begins with the Golden Prompt header (Project / Stack / Goal / Current task / Problem), then this skeleton, then the prompt (input), the complete model output, and a Tools used table.
