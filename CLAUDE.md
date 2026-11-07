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
| `app/components/home/` | Homepage-only components (hero, project-card, now-section, writing-list, etc.) |
| `components/project-list.tsx` | Projects page list (featured large card + regular grid) |
| `utils/notion.ts` | All Notion fetch logic (projects + posts) — `revalidate: 60` |
| `app/components/notion-blocks.tsx` | Shared Notion block renderer + paginated `fetchBlocks` (projects and posts) |
| `app/components/post-article.tsx` | Post page body shared by `/posts/[slug]` and `/ko/posts/[slug]` |
| `app/admin/page.tsx` | Password (`ADMIN_KEY`) sign-in that sets the `blog_admin` cookie → shows Edit in Notion on posts |
| `app/global.css` | Global styles: `.card-warm`, `.photo-placeholder` |
| `tailwind.config.js` | Cardinal/warm color scales, font vars, hero-in animation |
| `app/data/site.ts` | `SITE_URL`, `CURRENT_STATUS` (hero status pill — swap when job status changes) |

## Environment Variables

```
NOTION_TOKEN
NOTION_MAIN_DB_ID
NOTION_OTHER_DB_ID
NOTION_POSTS_DB_ID
ADMIN_KEY                        # /admin password
NEXT_PUBLIC_GISCUS_REPO          # owner/repo — comments hidden until all GISCUS vars set
NEXT_PUBLIC_GISCUS_REPO_ID
NEXT_PUBLIC_GISCUS_CATEGORY
NEXT_PUBLIC_GISCUS_CATEGORY_ID
```

## Architecture

- **Homepage**: full-width (no `max-w` on `<main>`)
- **All other pages**: wrap content in `max-w-2xl` or `max-w-3xl mx-auto px-4`
- **Nav**: `position: fixed`, `backdrop-blur-xl` — all pages need `pt-[60px]` on main
- **Projects**: `featured` checkbox in Notion → large card with cover image; unchecked → grid card
- **Posts**: Notion Posts DB (Title, Slug, Published, Date, Summary, Lang en/ko, Tags). Only `Published` rows show. en/ko versions share a Slug; empty Slug falls back to the page id. Comments (Giscus) are keyed by slug, so both languages share one thread
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
