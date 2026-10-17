# RageBait Pro Max 🔥

A deliberately infuriating, surprisingly polished two-page UX experiment for Attack on Token — Round 2: **Token Treachery**. The chaos is deterministic, modular, keyboard-operable, and always escapable.

## Run locally

Requires Python 3. Start a server from the repository root (ES modules do not work from `file://`):

```bash
python3 -m http.server 8000
```

Open `http://localhost:8000/`. Sign-up is `index.html`; profile is `profile.html`. For a calm baseline, add `?chaos=off` to either URL. No build step, npm, external assets, or dependencies. All internal paths are relative for GitHub Pages project subpaths.

## What to demo

- Shuffling username keyboard, always-taken checker, phone number incrementer with jumps, eight cumulative password rules, dodging submit, swapped confirmation chain.
- Profile save-label cycling, dice/π visibility controls, reverse scroll with a reachable normalization toggle, swapped save confirmation, and the stretch features (99% progress, three-click toast, runaway cookie reject, bio eater, DOB picker).
- Persistent Rage Meter with per-feature tally, and `?chaos=off` as a control condition.

## Password witness

`Rage!2026` is the documented witness. Run `node tests/password-witness.mjs` to verify all eight predicates programmatically. The live UI also shows the witness hint.

## Design and architecture

Vanilla JavaScript ES modules, one module per feature in `js/modules/`, central registry, seeded Mulberry32 RNG, localStorage state, CSS tokens, responsive dark-glass cards, visible focus, and `prefers-reduced-motion` support. See `AGENTS.md` and `docs/` for the Rage Contract, prompt architecture, requirements, and execution log.

## Screen recording

Follow `docs/SCREEN_RECORDING.md` for a concise demo order. Keep the recording under two minutes: establish the visual baseline, show a few high-signal twists, finish the flow, and show the Rage Meter and calm-mode switch.

## Scope note

This is a front-end-only demo. Account details are stored locally in the browser; no authentication or server-side persistence exists.
