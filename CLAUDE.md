# Cam Anh's portfolio web

A personal portfolio, Astro static site. It began as a copy of the Mùa application web (Nov 5 2026) and no longer mentions Mùa as an application. Repo: https://github.com/camanh88/camanh.git (branch `main` = project, branch `deploy` = built site for Hostinger, see `DEPLOY.md`).

## Rules

- **Do not push, deploy or change the remote without Cam Anh saying so in chat.** Committing locally is fine.
- All visible text comes from `content/*.md`. Do not write or translate copy in components; list suspected typos in the report instead.
- `[square brackets]` in content = unfinished placeholder (listed in `site/PLACEHOLDERS.md`). `BUILD NOTE:` lines are never rendered. `{{Name}}` = sidepath (`content/side-pages.md`).
- Do not mention Marou, Mùa as an employer, chocolate or cacao in the site.

## Pages

| Address | What | Component | Content |
|---|---|---|---|
| `/` | Cover, Get to know me, Core skills, How I work | `Cover`, `Contents`, `CoreSkills`, `HowIWork` | `cover.md`, `contents.md`, `intro-skills.md` |
| `/in-the-making/` | 01 It started with culture · 02 Lam Yên + Different kitchens | `Ch01/02/03` | `ch01…`, `ch02…`, `ch03…` |
| `/in-bloom/` | 03 The florist in me | `InBloom` | `ch04-in-bloom.md` |
| `/contact/` | Closing sentence + contact | `Contact` | `contact.md` |

Header: Home · In the making · In bloom · Contact (`content/nav.md`).

## Theme ("Theme Color", assets/Theme Color.jpg)

Tokens in `site/src/styles/tokens.css`: deep green `#132605` (text, dark blocks, token `--brown`), lime `#BCC76A` (`--sage`), cream `#F7ECCD` (page), burgundy `#922935` (accent, `--orange`), pink `#E2A6A2`, plus a mid green `#3B5319` (`--moss`). The In bloom page opens on burgundy and then uses a white page with `#F7ECCD` bands. Token names come from the first theme.

## Commands (run in `site/`)

- `npm run dev -- --port 4323`: local server (the review sticky note shows in dev only).
- `npm run build`: static `dist/` (also regenerates `PLACEHOLDERS.md`).
- `node scripts/og.mjs`: re-make the share image. `node scripts/avatar.mjs`: re-make the avatar (favicon). `node scripts/coi-images.mjs`: re-cut the straw-mat corner.

## Open items

- Final address (`SITE_URL`, `astro.config.mjs`); the site is `noindex` until `INDEXABLE` is set to true.
- See `site/PLACEHOLDERS.md`.
