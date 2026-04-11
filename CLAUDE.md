# CLAUDE.md

Project-specific instructions for Claude Code.

## Stack

- **Framework**: Next.js 14 App Router, TypeScript
- **Styling**: Tailwind CSS — `darkMode: "selector"` (manual toggle via ThemeSwitcher)
- **Fonts**: DM Serif Display (`--font-dm-serif`, `font-serif`) + DM Sans (`--font-dm-sans`, `font-sans`) + Geist
- **Data**: Notion REST API (no SDK) — `utils/notion.ts`
- **Deployment**: Vercel — Analytics + Speed Insights enabled
- **Package manager**: pnpm

## Commands

```bash
pnpm dev      # local dev server
pnpm build    # production build
pnpm start    # start production server
```

## Key Files

| Path | Purpose |
|------|---------|
| `app/layout.tsx` | Root layout — no body max-width |
| `app/page.tsx` | Homepage — full-width, no max-w constraint |
| `app/components/nav.tsx` | Fixed navbar with backdrop-blur (client component) |
| `app/components/footer.tsx` | Full-width footer, left/right layout |
| `app/components/home/` | Homepage-only components (hero, marquee, project-card, etc.) |
| `components/project-list.tsx` | Projects page list (featured large card + regular grid) |
| `utils/notion.ts` | All Notion fetch logic — `revalidate: 60` |
| `app/global.css` | Global styles: `.card-warm`, `.photo-placeholder`, marquee keyframes |
| `tailwind.config.js` | Cardinal/warm color scales, font vars, marquee animation |

## Environment Variables

```
NOTION_TOKEN
NOTION_MAIN_DB_ID
NOTION_OTHER_DB_ID
```

## Architecture

- **Homepage**: full-width (no `max-w` on `<main>`)
- **All other pages**: wrap content in `max-w-2xl` or `max-w-3xl mx-auto px-4`
- **Nav**: `position: fixed`, `backdrop-blur-xl` — all pages need `pt-[60px]` on main
- **Projects**: `featured` checkbox in Notion → large card with cover image; unchecked → grid card
- **Notion images**: external URLs used directly; file URLs (expire in ~1h) proxied via `/api/notion-image?pageId=`

## Design System

### Colors
- `cardinal-700` = `#990000` (USC Cardinal) — primary brand accent
- `warm-*` — amber/cream scale (warm-50 = `#fdf8f0`)
- Award badges: amber (intentional, do not change to cardinal)
- Text selection: cardinal, not blue

### Tailwind Classes
- `.card-warm`: neutral border default → cardinal border+shadow on hover
- `.photo-placeholder`: gradient bg for image placeholders
- `animate-marquee`: 28s linear infinite scroll

### Animation
- Easing: `cubic-bezier(0.16, 1, 0.3, 1)` (ease-out-expo) throughout
- Respect `prefers-reduced-motion` in all animated components

## Conventions

- No emojis anywhere in the UI
- No `@notionhq/client` SDK — use the REST API directly via `utils/notion.ts`
- Stack tags: `bg-warm-50 text-warm-800 border-warm-200` (warm cream)
- Category/display tags: `bg-cardinal-50 text-cardinal-700 border-cardinal-100`
- Heading style on list pages: `font-serif text-3xl` + brief personal intro line
- Design goal: "사람 냄새 나는 블로그" — warm and human, not AI-template feel
