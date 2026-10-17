# Folder Structure — Ragebait Pro Max

```
ragebait-pro-max/
├── index.html                 # Sign-up page (page 1)
├── profile.html               # Profile page (page 2)
├── README.md                  # Concept, run instructions, feature table, prompt log, recording
├── AGENTS.md                  # Rage Contract + twist table + prompt skeleton (agent steering)
├── .gitignore
├── css/
│   ├── tokens.css             # THE design system: colors, accent, spacing, radius, motion, z-scale
│   └── style.css              # Layout + shared components (header, cards, buttons, modal, toast)
├── js/
│   ├── main.js                # Entry: reads data-page, ?chaos=off, boots registry + chrome
│   ├── registry.js            # {id, pages, chaos, load} list; filters and init()s modules
│   ├── rng.js                 # Seeded RNG: next/int/shuffle/pick/roll
│   ├── store.js               # localStorage wrapper: rage tally, flags, fake saves
│   └── modules/               # ONE file per rage feature (snake_case)
│       ├── keyboard_reshuffle.js      # [index]
│       ├── phone_incrementer.js       # [index]
│       ├── password_rules.js          # [index] (+ witness password in file header)
│       ├── dodge_submit.js            # [index]
│       ├── confirm_chain.js           # [index + profile]
│       ├── save_label_cycler.js       # [profile]
│       ├── dice_slider.js             # [profile]
│       ├── reverse_scroll.js          # [profile]
│       ├── username_checker.js        # [stretch 1]
│       ├── fake_progress.js           # [stretch 2]
│       ├── toast_three.js             # [stretch 3]
│       ├── cookie_runaway.js          # [stretch 4]
│       ├── bio_eater.js               # [stretch 5]
│       └── dob_picker.js              # [stretch 6]
├── scripts/
│   └── verify_password_rules.mjs      # node: proves witness satisfies all 8 rules
└── docs/
    ├── project_context.md  PRD.md  tech_stack.md  architecture.md
    ├── folder_structure.md  tasks.md  PROMPTS.md
    ├── dev_system_guide.md            # personal guide (git-ignored)
    └── transcripts/                    # full session exports (.gitkeep)
```

## Naming conventions
- Modules: `snake_case.js`, one file = one feature — mirrors the Rage Contract's isolation rule.
- Registry ids: same as filename without extension (`phone_incrementer`).
- CSS: BEM-ish selectors (`.card`, `.card__title`, `.btn--danger`); **all values from tokens** — no raw hex/px one-offs.
- JS: camelCase functions; no globals — everything through `init(ctx)`.

## Why this structure
- `registry.js` + `data-page` lets both pages share modules without coupling: one glance at the registry shows the whole feature inventory (useful for the audit and for judges).
- `js/modules/*` means any feature can be deleted or flag-disabled without touching another feature.
- `scripts/` keeps the one programmatic proof (password rules) out of the shipped site while still versioned.
