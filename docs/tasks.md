# Tasks — Ragebait Pro Max

Timebox: 50 minutes. Stretch hard stop at minute 46.

## In progress
- [ ] P0 (0–8 min): AGENTS.md + 7 docs + git first commit

## Up next
- [ ] P1 (8–16): scaffold both pages with ZERO chaos; tokens.css, style.css, rng.js, store.js, registry.js, Rage Meter header, `?chaos=off`. Verify: clean load, no console errors
- [ ] P2 (16–26): index core modules — keyboard_reshuffle, phone_incrementer, password_rules (+ scripts/verify_password_rules.mjs, node PASS)
- [ ] P3 (26–33): dodge_submit + confirm_chain; end-to-end sign-up → profile.html walk
- [ ] P4 (33–41): profile core — save_label_cycler, dice_slider, reverse_scroll (+ footer toggle / Shift+R)
- [ ] P5 (41–46): stretch in fixed order: username_checker → fake_progress → toast_three → cookie_runaway → bio_eater → dob_picker (HARD STOP at 46)
- [ ] P6 (46–50): contract audit table, polish/microcopy/responsive, finalize tasks.md + PROMPTS.md, README, commit

## Done
- [x] Read `skills/Token-Treachery.md` + `docs/dev_system_guide.md`; plan approved with 5 amendments (all-active password rules + witness proof, stretch order, relative paths, reduced-motion/keyboard, AGENTS.md + `?chaos=off` kept)

## Blocked
- (none)

## Contract checklist (verify in P6)
- [ ] All 8 core features + Rage Meter: Trigger / Twist / Solvable / Feedback / Isolated / On-brand = PASS
- [ ] `node scripts/verify_password_rules.mjs` exits 0
- [ ] No console errors; `python3 -m http.server` loads both pages
- [ ] `?chaos=off` calm page; `Shift+R` + focusable footer toggle; `prefers-reduced-motion` honored
- [ ] All paths relative; no `alert()`/`confirm()`; no inline one-off styles

## Ideas / backlog
- Captcha "select all squares containing regret"
- Font-size control that goes backward
