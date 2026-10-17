# Ragebait Pro Max: Build Plan

Both files read. Here's the plan: no code, no files written.

## 1. File tree

```text
ragebait-pro-max/
├── index.html                 # Sign-up page
├── profile.html               # Profile page
├── README.md                  # Written last (prompt log + feature table + run instructions)
├── AGENTS.md                  # Rage Contract + spec table (prompt-architecture artifact, 35% criterion)
├── css/
│   ├── tokens.css             # Single design system: dark glassy, 1 accent, spacing, radius, motion
│   └── style.css              # Layout + shared components (header, card, buttons, modal, toast)
├── js/
│   ├── main.js                # Entry: reads <body data-page>, boots registry + shared chrome
│   ├── registry.js            # Feature registry: {id, pages[], chaos:true, init(ctx)}
│   ├── rng.js                 # Seeded RNG (mulberry32) + helpers (shuffle, pick, roll)
│   ├── store.js               # localStorage: rage meter, chaos flags, scroll-toggle, save state
│   └── modules/               # One file per feature, snake_case
│       ├── keyboard_reshuffle.js      # [index]
│       ├── phone_incrementer.js       # [index]
│       ├── password_rules.js          # [index]
│       ├── dodge_submit.js            # [index]
│       ├── confirm_chain.js           # [index + profile] (shared, swapped Yes/No)
│       ├── save_label_cycler.js       # [profile]
│       ├── dice_slider.js             # [profile]
│       ├── reverse_scroll.js          # [profile]
│       ├── username_checker.js        # [stretch → index]
│       ├── dob_picker.js              # [stretch → index]
│       ├── fake_progress.js           # [stretch → index]
│       ├── bio_eater.js               # [stretch → profile]
│       ├── cookie_runaway.js          # [stretch → both]
│       └── toast_three.js             # [stretch → profile]
└── docs/
    ├── project_context.md
    ├── PRD.md
    ├── tech_stack.md
    ├── architecture.md
    ├── folder_structure.md
    ├── tasks.md
    └── PROMPTS.md
```

> **Note:** `AGENTS.md` is the one file beyond your override list I'd keep. It's the skill's core artifact for the 35%-weighted prompt-architecture judging and it costs ~4 minutes to write. Say the word and I'll drop it.

## 2. Twist table (feature → page)

### Page 1: `index.html` (Sign-up)

| Element | Label says | Actual behavior | Visible feedback | Solvable by |
|---|---|---|---|---|
| Username + on-screen keyboard | "Choose a username" | Key positions permute after every keystroke (seeded shuffle, reproducible) | Keys spring to new slots, "Keys rearranging…" chip, Rage +1 | Typing on the shuffled keys (or physical keyboard); reshuffle is per keystroke, not per attempt |
| Phone `000-000-0000` | "Enter your phone number" | Typing ignored; only +/− (±1) and Jump buttons that add 999 / 99,999 / 999,999, always one short of round | Rolling digit animation, "Off by one. Again.", Rage +1 per Jump | Target number is pre-printed on the card; Jumps get within range, +/− lands exactly |
| Password rules | "Password (rules below)" | Satisfying rule N spawns absurd rule N+1, max 8; only the newest rule is enforced, earlier ones grey out as "grandfathered" (guarantees joint satisfiability) | Rule strikethrough + shake when replaced, "3 of 8 rules", Rage +1 | Final rule is easy and jointly satisfiable with the active set; live hint shows a valid example |
| Submit button | "Create account" | Flees cursor 5 times to seeded fixed positions, then stays and pulses | Spring-scoot animation, "Dodges left: 5→0", Rage +1 | Let it exhaust 5 dodges, then click |
| Confirmation chain ×3 | "Are you sure? [Yes] [No]" | Labels and positions swap each step, deterministic alternation | Buttons slide-swap, hint microcopy after step 1, Rage +1 per step | Follow the button with the accent glow; it's always the one that continues |
| *(stretch)* Username checker | "Check availability" | Always "taken", suggests `yourname_taken_again_7` style (seeded counter) | Red chip + absurd suggestion list, Rage +1 | On the 4th check: "Fine. Nobody wants it. Available." |
| *(stretch)* DOB picker | "Date of birth" | Year wheel starts at 1900, crawls one year per wheel tick | Age joke microcopy ("You are 126 years young"), Rage +1 | Type the year directly into the field, or wheel forward |
| *(stretch)* Progress bar | "Setting up your account…" | Deterministic climb to 99%, stalls ~4 s, completes itself | "99%… 99%… 99% (classic)", Rage +1 | Wait; it auto-completes, zero interaction |

### Page 2: `profile.html` (Profile)

| Element | Label says | Actual behavior | Visible feedback | Solvable by |
|---|---|---|---|---|
| Avatar + display name Save | Button label cycles: Save → Cancel → Discard → Save | Label lies, but every click always saves (deterministic, no data loss) | Label swap + "Saved (the label was lying)" chip, Rage +1 | Clicking any label; all of them save |
| Visibility slider | "Drag to set visibility" | Drag always snaps back to 0; value only settable by Roll d20 button or typing Pi digits | Knob springs back, "The dice have spoken: 14", correct/incorrect Pi digit indicator, Rage +1 per failed drag | Roll the dice to any value, or type `3.14159…` exactly |
| Page scroll | "Scroll down to explore" | Wheel down scrolls up; every 4th wheel event accelerates 1.5× | Inverted glide + "↯ drift" indicator, Rage +1 per burst | Hidden-but-findable footer micro-link "normalize scroll" + `Shift+R`, persisted in localStorage |
| Profile save | "Save changes" | Reuses the 3-step swapped Yes/No chain, then a toast needing 3 dismiss clicks *(stretch)* | Same glow affordance, X becomes × → ×× → closes, Rage +1 per click | Glowing button; three clicks |

### Global elements (both pages)

- **Rage Meter:** a header chip (🔥 count). Every module calls `rage.bump(id)`, persisted via localStorage so the count carries across pages; the tooltip shows the per-feature tally.
- **Kill-switch:** a global `?chaos=off` flag satisfies the contract's chaos flag and proves intentionality.

## 3. Doc outlines (2–3 lines each, ~8 min total)

- **`project_context.md`**: Name, status, one-liner, stack; 5 key decisions (seeded RNG only, one-file-per-feature registry, newest-rule-only password engine, no build step, Rage Contract enforced per module); non-goals: no backend, no auth, no npm.
- **`PRD.md`**: Problem (hackathon brief) and target users (judges); core MVP checklist (8 core features + meter) with acceptance criteria, ordered stretch list; success metrics (≥12 working twists, zero soft-locks, ≤3-min demo); constraints: 50 min, static site.
- **`tech_stack.md`**: Table of vanilla ES modules / plain CSS tokens / system fonts / localStorage / seeded RNG / `python3 -m http.server`, each with "why"; rejected alternatives (React, Tailwind CDN, bundler) and tradeoffs (no type safety, mitigated by tiny isolated modules).
- **`architecture.md`**: One-paragraph load flow (page → `main.js` → registry filters by `data-page` → module `init(ctx)`); ASCII diagram; data flow (user event → twist → `rage.bump` → store → header DOM); key interface: `init({rng, rage, chaos, qs})`.
- **`folder_structure.md`**: The tree above with per-directory purpose comments; naming conventions (snake_case modules, one file = one feature) and why `registry.js` + `data-page` splits work.
- **`tasks.md`**: P0–P6 checklist in Done / In progress / Up next / Blocked / Backlog; updated at the end of every phase (the "document as you go" gate).
- **`PROMPTS.md`**: Append-only. Each entry is a Golden Prompt header (Project / Stack / Goal / Current task / Problem) plus the skill's skeleton (ROLE / GOAL / CHANGE / DO NOT TOUCH / HARD CONSTRAINTS / VERIFY / LOG), followed by the actual output summary. README lifts this verbatim.
- **`README.md`** *(last)*: Concept + `python3 -m http.server 8000` run instructions; feature/twist/solve table; full prompt-input→output log from `PROMPTS.md`; Rage Contract + architecture rationale; recording link.

## 4. Build phases (50 min)

| Phase | Min | Budget | Content |
|---|---|---|---|
| **P0** Plan + docs | 0–8 | 8 | `AGENTS.md` (contract + spec table) + all 7 `docs/*.md` in one pass; `PROMPTS.md` opened |
| **P1** Scaffold | 8–16 | 8 | Both HTML pages laid out with zero chaos, `tokens.css` + `style.css`, `rng.js`, `store.js`, `registry.js`, Rage Meter header, `?chaos=off`. Verify: clean load, no console errors |
| **P2** Index core | 16–26 | 10 | `keyboard_reshuffle`, `phone_incrementer`, `password_rules`: build, register, VERIFY each against contract |
| **P3** Index flow | 26–33 | 7 | `dodge_submit` + `confirm_chain`; end-to-end sign-up → `profile.html` walk confirmed |
| **P4** Profile core | 33–41 | 8 | `save_label_cycler`, `dice_slider`, `reverse_scroll` (+ hidden toggle), save → confirm chain |
| **P5** Stretch + polish | 41–46 | 5 | In strict order: username checker → DOB 1900 → bio eater → toast-3× → cookie runaway → 99% bar (stop wherever timer hits); microcopy, focus states, responsive pass |
| **P6** Audit + ship | 46–50 | 4 | Contract audit table (every feature PASS/FAIL, fix FAILs), finalize `tasks.md` + `PROMPTS.md`, write README, `git init` + push |

Each phase ends with `tasks.md` checked off and a `PROMPTS.md` entry appended (the log is written during the build, so README is assembly, not composition).

## 5. Top 3 risks

1. **Soft-lock (kills the 30% "functional chaos" score).**
   **Avoid:** The password engine enforces only the newest rule (mathematically can't contradict); Submit guarantees clickability after exactly 5 dodges; phone has Jump buttons + printed target; every phase's VERIFY step walks the full user path; `?chaos=off` is a global escape hatch; the P6 audit is a literal contract checklist walk-through.

2. **Time collapse / half-built features.**
   **Avoid:** Core-before-stretch ordering is locked, and the stretch list has a fixed priority order and a hard stop at minute 46; docs are written once in P0 (8 min cap); `PROMPTS.md` is appended per phase so README can't become a big-bang writing task; every module is small and self-contained so a failure can be dropped without breaking neighbors.

3. **Chaos reads as bugs, not jokes (loses both 30% and 15%).**
   **Avoid:** Contract item 4 makes visible feedback mandatory, so no twist ships without microcopy/shake/counter; one token file governs every animation, spacing, and the single accent color; `alert()`/`confirm()` are banned, and focus states and responsive breakpoints are required; the persistent Rage Meter reframes every annoyance as a counted, intentional feature.

---