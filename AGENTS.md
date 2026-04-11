# AGENTS.md

AI agent guidance for this codebase. Read this before making changes.

## Project

Personal developer blog for Jimin Lee — used actively for job/internship applications.
Built on Next.js 14 App Router + Tailwind CSS + Notion as CMS.

## Quick Reference

- **Dev**: `pnpm dev`
- **Build**: `pnpm build`
- **Data layer**: `utils/notion.ts` — all Notion fetches go here, `revalidate: 60`
- **Styles**: Tailwind only — no CSS modules, no styled-components

## What NOT to Do

- Do not install `@notionhq/client` — we use the REST API directly
- Do not add `max-w` to `app/layout.tsx` or `app/page.tsx` — homepage is intentionally full-width
- Do not add emojis to any UI component
- Do not use `#000` / `#fff` for large areas — use neutral scale
- Do not change Award badge color from amber — it's intentional contrast
- Do not use purple-blue gradients — off-brand

## Color Rules

| Use case | Light | Dark |
|----------|-------|------|
| Stack tags | `bg-warm-50 text-warm-800 border-warm-200` | `dark:bg-warm-900/20 dark:text-warm-300 dark:border-warm-700/40` |
| Category tags | `bg-cardinal-50 text-cardinal-700 border-cardinal-100` | `dark:bg-cardinal-900/20 dark:text-cardinal-300 dark:border-cardinal-800/40` |
| Award badge | `bg-amber-50 text-amber-700 border-amber-300` | `dark:bg-amber-900/30 dark:text-amber-400 dark:border-amber-700` |
| Brand accent | `cardinal-700` (#990000) | `cardinal-400` |

## Page Layout Pattern

```tsx
// Non-homepage pages
<main className="pt-[60px]">
  <div className="max-w-2xl mx-auto px-4 py-12">
    ...
  </div>
</main>

// Homepage — full-width, no max-w
<main className="pt-[60px]">
  ...
</main>
```

## Notion Data Flow

1. `utils/notion.ts` — `notionQuery()` fetches from Notion REST API
2. `getMainProjects()` / `getOtherProjects()` / `getAllProjects()` — exported helpers
3. `Project` type exported from `utils/notion.ts`
4. `releasable: true` required to show a project publicly
5. `featured: true` renders as large card with cover image

## Animation Convention

- Easing: `cubic-bezier(0.16, 1, 0.3, 1)` everywhere
- Always check `prefers-reduced-motion` before applying motion
- Entry animations: fade + translateY(14px) → 0, staggered by 30–50ms
