# project_context.md

## Project
Name: Ragebait Pro Max
Status: in-progress (Round 2, "Token Treachery" hackathon — 50 min budget)
Started: 2026-10-17

## One-liner
A two-page static site (sign-up + profile) where every UX interaction is deliberately infuriating but deterministic, solvable, and wrapped in one polished dark-glass design system.

## Stack
- Frontend: vanilla JavaScript ES modules + plain CSS (design tokens), system font stack
- State: localStorage (Rage Meter, chaos flags, scroll toggle, saves)
- Randomness: seeded RNG in `js/rng.js` (reproducible chaos)
- Deployment: GitHub Pages (static, relative paths only)
- Dev server: `python3 -m http.server` (ES modules fail over `file://`)

## Key decisions made
- **Rage Contract** (trigger, twist, solvable, feedback, isolated, on-brand) gates every feature — chaos must read as intentional jokes, not bugs.
- **One file per feature** in `js/modules/`, registered in `js/registry.js` with a chaos flag → features can be dropped or disabled without breaking neighbors.
- **Password rules: all active rules enforced simultaneously**, jointly satisfiable by construction, with a documented witness password verified by `scripts/verify_password_rules.mjs`.
- **No build step / no npm** → instant GitHub Pages deploy, zero dependency risk, judge can read every line.
- **`?chaos=off` kill switch, chaos ON by default** → proves intentionality and gives a calm baseline for comparison.

## Current focus
P0: repo scaffold of docs + AGENTS.md (this phase), then design system and pages with zero chaos.

## Known issues / blockers
- None yet.

## What this project is NOT doing
- No backend, no real auth/validation, no database.
- No frameworks, bundlers, TypeScript, or npm packages.
- No accessibility exemptions: chaos must stay keyboard-operable and respect `prefers-reduced-motion`.
