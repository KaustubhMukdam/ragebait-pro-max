# Architecture — Ragebait Pro Max

## System overview
Two static HTML pages share one JS runtime: `js/main.js` reads `<body data-page>`, loads the shared chrome (Rage Meter header), and calls `js/registry.js`, which filters feature modules by page and chaos flags, then runs each module's `init(ctx)`. Modules never import each other — they interact only through `ctx` (`rng`, `rage`, `chaos`, `page`, `root`). All randomness flows from the seeded RNG; all state that must survive navigation flows through `localStorage`. Styling flows exclusively from `css/tokens.css` via `css/style.css`; no module writes inline styles for colors/spacing/motion.

## Component diagram (ASCII)
```
[Browser]
   |
   |-- GET index.html / profile.html  (relative paths only, GitHub Pages safe)
   |        |-- css/tokens.css  --> css/style.css --> components
   |        |-- js/main.js  (reads <body data-page>, ?chaos=off)
   |                 |
   |                 v
   |          js/registry.js  ---- filters modules by page + chaos flag
   |                 |
   |                 v
   |          js/modules/*.js  init({rng, rage, chaos, page, root})
   |                 |            \
   |                 |             \--> rage.bump(id)
   |                 v                    |
   |            js/rng.js (seeded)        v
   |                               js/store.js (localStorage)
   |                                    - rage tally (shared across pages)
   |                                    - scroll normalize flag
   |                                    - fake saved profile
   v
[localStorage]  <-- header Rage Meter re-renders from store
```

## Data flow
1. **Page load** → `main.js` bootstraps `store` (reads `localStorage`) → Rage Meter renders persisted count → `registry.init(page)` starts allowed modules.
2. **User event** (keystroke/click/drag/wheel) → owning module applies its seeded twist → `rage.bump(id)` → store writes `localStorage` → header updates immediately (tooltip shows per-feature tally).
3. **Navigation** (`location.href = "profile.html"` — relative) → step 1 repeats; meter carries over.
4. **`?chaos=off`** → registry skips every module with `chaos: true` → calm baseline page.

## Key interfaces
```js
// Every feature module
export function init(ctx) { /* attach listeners; no side effects outside own DOM */ }
// ctx = {
//   rng:    { next(), int(min,max), shuffle(arr), pick(arr), roll(sides) },
//   rage:   { bump(featureId), count(), tally() },
//   chaos:  boolean,          // false when ?chaos=off
//   page:   'index' | 'profile',
//   root:   document           // query only, never restructure other modules' DOM
// }
// registry.js entry: { id, pages: ['index'|'profile'], chaos: true, load: () => import(...) }
```

## Security & environment considerations
- No network calls, no third-party scripts, no cookies — everything is local; the cookie banner is part of the joke.
- No `alert()`/`confirm()`; confirmation chains are in-page, focus-trapped components.
- Relative URLs everywhere (no leading `/`) so `/repo-name/` sub-path hosting works.
- `prefers-reduced-motion` media query gates all keyframes/transitions; twists remain functional with motion disabled (feedback falls back to text/counters).
