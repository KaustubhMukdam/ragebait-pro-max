---
name: token-treachery
description: Guides an AI coding agent (OpenCode) through Round 2 (Token Treachery) of the Attack on Token hackathon, a one-hour constraint-based agentic build of a deliberately infuriating "ragebait" profile webpage that still has a cohesive, good-looking UI. Use whenever the user pastes a Token Treachery brief, mentions ragebait UX, counter-intuitive or twisted UI behavior, agent prompting under constraints, or needs an AGENTS.md, phased prompts, README prompt log, or submission checklist for this round, even if they don't name the round.
---

# Token Treachery (Round 2): Ragebait Profile Page, Built by an Agent in ~1 Hour

## The task (as briefed)
Build a **profile webpage** packed with as many ragebait UX features as possible, while keeping a **good, cohesive UI**. Examples from the brief: the Pi/dice volume slider, the infinite-incrementer phone input, the dodging Submit button, the contradictory password rule engine, the re-shuffling on-screen keyboard, reverse/accelerating scroll.
If the live brief differs from this file, the live brief wins. Re-read it line by line first.

## Judging and what it means for us
| Criterion | Weight | What to do |
|---|---|---|
| Prompt architecture and constraint design | 35% | Biggest lever. Write a real constraint contract + AGENTS.md before coding. Phased prompts, each with scope, constraints, and verification. |
| Functional chaos and execution | 30% | Many features, each actually working as designed (deterministic, solvable, annoying on purpose). Broken is not chaos. |
| Agent autonomy | 20% | The agent writes all code. We steer with prompts, never hand-edit. Let it plan, build, test, and fix itself in loops. |
| UI cohesion | 15% | One design system (tokens, fonts, spacing). The chaos lives inside a polished shell. |

Required submission: **GitHub repo**, **README containing our prompt inputs and the model's outputs**, **screen recording**.

## Core idea: the Rage Contract
Every ragebait feature must satisfy ALL of these. Put this in AGENTS.md:
1. **Trigger:** the normal interaction the user expects (type, slide, click, scroll).
2. **Twist:** the deliberate betrayal, defined in the spec table, deterministic or driven by a seeded RNG.
3. **Solvable:** a user CAN finish the task eventually (no soft-locks, no dead ends). The agent writes a check that proves it.
4. **Feedback:** a small visible reaction (microcopy, shake, counter) so judges instantly see the joke.
5. **Isolated:** one self-contained module with `init()`, registered in one registry file, with a chaos on/off flag for debugging.
6. **On-brand:** styled with the shared design tokens, accessible enough (labels, focus states), and no raw alerts.

## Feature menu (for a profile page, aim for 12-18; build core first)
**Core (must ship, about 8):**
1. Avatar and display name block: "Save" button label cycles through confusing words, each click does something different but deterministic.
2. Phone number: infinite incrementer (+/-) with a "Jump 1000" button that adds 999 or similar, so it is solvable but tedious.
3. Password with contradictory rule engine: a new absurd rule appears after each rule is satisfied (cap at about 8 rules; final rule is solvable).
4. Submit/Save button that dodges the cursor (with a limited number of dodges, then lets you click).
5. Volume or "profile visibility" slider controlled by dice roll or Pi digits.
6. Inverted or reshuffling on-screen keyboard for the username field.
7. Reverse scroll with occasional acceleration (can be switched off via a hidden but findable toggle).
8. Fake confirmation chains: "Are you sure?" x3 with Yes/No labels swapped each time.

**Stretch (add if time remains):**
Date of birth picker that starts at year 1900 (wheel with slow scroll); age slider that moves opposite to the drag; username availability checker that always says "taken" and suggests `username_taken_again_7`; cookie banner where "Reject" runs away and "Accept" is huge; captcha with absurd prompts ("select all squares containing regret"); fake progress bar stuck at 99% for a deterministic 10 s; autosave that reverts the last field once; bio textarea that deletes every 10th character (visible counter warns you); light/dark toggle that does the opposite once; font-size control that goes backward; tab order reversed; tooltip text that misleads; success toast that needs three dismiss clicks.
Keep a **Rage Meter** (header counter) that increments per annoyance triggered. It is cohesive, funny, and shows off functional chaos.

## Architecture (default stack, zero build step)
- Static site: `index.html`, `css/tokens.css`, `css/style.css`, `js/main.js`, `js/modules/*.js` (one file per rage feature), `js/registry.js`.
- Vanilla JS ES modules, no dependencies, deployable on GitHub Pages.
- Design tokens first (colors, radius, spacing, 1-2 fonts), then components, then modules. Pick one cohesive theme (e.g. clean glassy dark card layout with one accent color).
- Seeded RNG util (`js/rng.js`) so chaos is reproducible.
- `docs/PROMPTS.md` is the append-only prompt log; the README embeds or links it.

## Workflow (60 minutes)
| Min | Step |
|---|---|
| 0-5 | Read the live brief, fill the constraint checklist and feature spec table (below), paste into AGENTS.md |
| 5-12 | P1: scaffold + design system + profile page layout (no chaos yet) |
| 12-40 | P2 to P5: add rage modules in batches of 2-3, verifying each batch |
| 40-48 | P6: polish (UI cohesion, microcopy, Rage Meter, responsive) |
| 48-53 | P7: self-audit against the contract and fix |
| 53-60 | README, repo push, screen recording |

OpenCode tips: run `/init` or create `AGENTS.md` manually at the repo root so every session loads it; use plan mode first for P0, then switch to build mode; keep one session per phase if context gets long; commit after each phase so the repo history shows the prompt architecture.

## Prompt architecture (use this skeleton in every prompt)
```
ROLE: You are building a ragebait profile page. Follow AGENTS.md.
GOAL OF THIS STEP: <one sentence>
CHANGE: <exactly what to add/modify>
DO NOT TOUCH: <files/features to leave alone>
HARD CONSTRAINTS: <numbered list; includes Rage Contract>
VERIFY: After the change, list every constraint with PASS/FAIL plus evidence (what you ran or how it behaves). Fix any FAIL yourself before finishing.
LOG: Append this step's summary to docs/PROMPTS.md.
```

### Ready-to-paste prompts
**P0 (plan mode):** "Read AGENTS.md. Produce a plan: file tree, design tokens, module interface, and an ordered build list of the Core features with the twist table filled in. Do not write code yet."

**P1 (scaffold):** "Create the static scaffold and design system from AGENTS.md. Build a polished profile page layout (avatar, name, phone, password, bio, preferences, save area) with NO ragebait behavior yet; all fields behave normally. Add `registry.js` and an empty module interface. Verify the page loads with no console errors."

**P2 to P5 (modules in batches):** "Implement these rage modules, each following the Rage Contract: <list 2-3>. Register them in `registry.js`. Add a per-module chaos flag. Write a short solvability check for each (a function or documented steps). Do not alter other modules."

**P6 (polish):** "Without changing any behavior, improve visual cohesion: consistent spacing/typography, hover and focus states, microcopy, responsive layout, and the Rage Meter. List what changed."

**P7 (audit):** "Audit the whole project against the constraint checklist and Rage Contract. For each feature: triggers correctly, twist works, solvable, feedback visible, styled. Fix every FAIL. Report the final table."

## AGENTS.md template (paste and fill)
```
# Project: Ragebait Profile Page (Token Treachery, Round 2)
## Goal
A profile webpage with as many deliberately infuriating but well-designed UX features as possible. Chaos must be functional and the UI cohesive.
## Hard constraints
1. Every feature obeys the Rage Contract (trigger, twist, solvable, feedback, isolated, on-brand).
2. Static site, vanilla JS ES modules, no build step, no external dependencies.
3. One design system in css/tokens.css; no inline one-off styling.
4. Randomness only via js/rng.js (seeded); behavior must be reproducible.
5. No feature may soft-lock the page. Every task is completable.
6. No browser alert()/confirm(); use styled in-page components.
7. Log every step to docs/PROMPTS.md.
## Spec table
| Element | Label says | Actual behavior | Visible feedback | Solvable by |
## Done criteria
All Core features working, 100% PASS in audit, no console errors, README complete.
```

## README structure (submission)
1. Title, one-paragraph concept, live link or run instructions.
2. Feature table (feature, twist, how to solve).
3. **Prompt log:** each step as `Prompt (input)` then `Model output (summary or key excerpt)`; keep it faithful, not rewritten.
4. Architecture and constraint design explanation (why the Rage Contract, how AGENTS.md steers the agent).
5. Screen recording link and credits.

## Screen recording checklist
Start from a clean load; narrate or caption the Rage Meter climbing; show 6-8 features in under 3 minutes (fast: phone incrementer, password rules, dodging button, reverse scroll, keyboard); end on the successful save and the final Rage Meter number; show the repo and README briefly.

## Output format when invoked
(1) constraint checklist from the live brief, (2) filled spec table, (3) AGENTS.md ready to paste, (4) the ordered prompts P0-P7 adapted to the live brief, (5) README + recording checklist.

## Pitfalls
- Features that are just broken, not intentionally twisted: always define the twist first.
- Soft-locks (an infinite loop with no exit) and unreadable UI: the judges must still be able to operate it.
- Hand-editing code: hurts agent autonomy; instead, correct the agent with a precise follow-up prompt.
- Starting with all features at once: build the shell and design system first.
- Forgetting to log prompts: the README transcript is a graded deliverable.
