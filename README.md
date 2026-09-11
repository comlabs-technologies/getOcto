# Rulebase homepage

A pixel-focused rebuild of the [rulebase.co](https://rulebase.co/) homepage.

- Next.js 16 (App Router) · TypeScript · Tailwind CSS v4 · Motion for React · Lucide icons
- Single route: `/`. No dashboards, auth, APIs, CMS, blog or extra pages.

## Commands

```bash
npm run dev        # development server
npm run build      # production build
npm run start      # serve the production build
npm run lint       # eslint
npm run typecheck  # tsc --noEmit
```

## Media

Every image, video and logo is loaded **directly from `rulebase.co`** — nothing is
downloaded into the repo, copied into `/public`, or inlined as base64. All URLs
live in one place, `src/lib/media.ts`, and `next.config.ts` allow-lists the host
for `next/image`. Remote SVGs use plain `<img>` (they must bypass the image
optimizer), the MP4 preview uses `<video>` with a lazily assigned `src`, and the
YouTube player is an iframe that is only created once the modal opens.

## Structure

- `src/lib/media.ts` — the remote media manifest
- `src/lib/data.ts` — menu items, workspace cards, product modes, integration
  tiles, security features, footer links
- `src/components/primitives/` — `Reveal`, `StaggerText`, `CrossfadePanel`,
  `useStickyProgress`, `Marquee`, `Dialog`, `Pressable`, `Disclosure`
- `src/components/` — one file per page section
