# Tech Stack — Ragebait Pro Max

## Frontend
| Technology | Choice | Why chosen |
|---|---|---|
| Markup | Plain HTML (2 pages: `index.html`, `profile.html`) | Brief caps it at 2 pages; zero routing needed |
| JavaScript | Vanilla ES modules (`<script type="module">`) | Isolated per-feature files without a bundler; native imports map 1:1 to the Rage Contract's isolation rule |
| CSS | Plain CSS + design tokens (`css/tokens.css`) | One cohesive theme enforced structurally; no utility-class drift |
| Fonts | System font stack | Zero network requests, no FOUT, instant load for the recording |
| State | `localStorage` | Rage Meter persistence across pages, chaos/scroll-toggle preferences, fake "saves" — no backend |

## Randomness & verification
| Technology | Choice | Why chosen |
|---|---|---|
| Seeded RNG | `js/rng.js` (mulberry32 + seeded shuffle/pick/roll) | Contract requires reproducible chaos; same seed → same reshuffle/dodge positions |
| Rule verification | `node scripts/verify_password_rules.mjs` | Node v24 available in env; page and script import the *same* rule functions → the witness password proof is real, not aspirational |

## Tooling & deployment
| Technology | Choice | Why chosen |
|---|---|---|
| Dev server | `python3 -m http.server` | ES modules are blocked over `file://`; one command, no install |
| Hosting | GitHub Pages | Deliverable requirement; static files deploy on push |
| VCS | git (single repo, phase commits) | Commit-per-phase shows prompt architecture in history |
| Agent steering | `AGENTS.md` + `docs/PROMPTS.md` | 35% of judging is prompt architecture — contract lives in-repo where every session loads it |

## Alternatives considered
- **React/Vue + Vite:** component model unnecessary for 2 pages; build step violates the fixed stack; hurts "readable by judges" score.
- **Tailwind CDN:** external dependency + no true token file; risk of one-off styles sneaking in.
- **`<script>` globals instead of ES modules:** no natural one-file-per-feature isolation, no registry imports.
- **Jest/Vitest:** overkill and adds npm; a single node script covers the one thing that must be proven.

## Known tradeoffs
- No type safety → mitigated by tiny, single-purpose module files and the `ctx` contract.
- No automated browser tests → mitigated by per-phase VERIFY checklists and the P6 contract audit.
- localStorage can be cleared by the user → Rage Meter resets; acceptable (cosmetic state only).
