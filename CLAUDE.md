# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```
npm run dev       # start Vite dev server (defaults to :5173; if that port is busy Vite silently
                   # picks 5174/5175/... — always check the printed URL, don't assume 5173)
npm run build     # production build to dist/
npm run preview   # serve the production build locally
npm run lint      # oxlint (config: .oxlintrc.json)
```

There is no test suite/test script configured in this repo.

On Windows, a previous `npm run dev` that wasn't cleanly killed will keep holding its port and silently serve stale code to anything hitting `:5173`. If dev-server output looks wrong, check for orphaned `node.exe` processes (`Get-Process node`) before debugging the app itself.

## What this is

A Tik Tak e-commerce **admin panel** UI built from a Figma design (Vite + React 19, no backend). All screens/text are Azerbaijani. There is no real API: every page seeds a local `useState` copy from `src/lib/mockData.js` and mutates that copy directly — data resets on every page reload. There is no real authentication either: the Login page only checks that both fields are non-empty and navigates to `/sifarisler`; there is no route guard, so every admin route is reachable directly.

## Architecture

**Path alias**: `@` → `src/`, configured in **both** `vite.config.js` (`resolve.alias`) and `jsconfig.json` (`paths`) — keep them in sync if changed. All cross-folder imports use `@/...`; only same-folder sibling imports (e.g. a component importing its own `.module.css`) stay relative.

**Routing** (`src/App.jsx`): react-router-dom, Azerbaijani paths — `/login`, `/sifarisler`, `/kampaniyalar`, `/kateqoriyalar`, `/mehsullar`, `/istifadeciler`. All routes except `/login` are nested under `AdminLayout` via a layout route + `<Outlet>`. `/` and unknown paths redirect to `/sifarisler`.

**Folder convention**: every component/page is its own folder containing `Name.jsx` + `Name.module.css` side by side — no bare `.jsx` files outside that pattern, no CSS-in-JS, no Tailwind.

- `src/shared/` — generic reusable UI primitives: `Button`, `Modal`, `ConfirmModal`, `Badge`, `StatCard`, `ActionMenu`, `Table`, plus `src/shared/hooks/` for cross-cutting hooks (`useTitle`, `useDebounce`) — flat `.js` files, no per-hook folder/CSS since hooks have no markup.
- `src/utils/` — `Pagination` lives here by project convention, not in `shared/`.
- `src/components/` — layout-only chrome (`Sidebar`, `Header`), used exclusively by `AdminLayout`.
- `src/layouts/AdminLayout/` — the sidebar+header shell wrapping every non-login page.
- `src/pages/<Name>/` — one folder per route (`Orders`, `Campaigns`, `Categories`, `Products`, `Users`, `Login`).
- `src/lib/mockData.js` — the single source of mock data (orders, campaigns, categories, products, users).
- `src/assets/images/` — SVG illustrations from the Figma design (`login-img.svg`, `delete-img.svg`), imported and rendered directly as `<img src={...}>`.

**Design tokens**: all colors, radii, shadows, and shared layout dimensions are CSS custom properties defined once in `src/index.css` (`:root`), e.g. `--color-green`, `--radius-sm`, `--shell-max-width`, `--table-row-height`, `--page-title-height`. Page modules reference these vars instead of hardcoding values — reuse them rather than introducing new ad-hoc constants. `index.css` also globally resets `margin: 0` on `h1–h6, p, dl, dd`; don't rely on default browser margins on these elements inside flex/grid layouts (a real layout bug here — mismatched heading margins — previously caused table containers to misalign between pages).

**`shared/Table`**: a generic, data-driven table shell. Pages pass a `columns` array of `{ key, label, width }` and render `<tr>` children directly; `Table` renders the `<thead>` from `columns`, wraps everything in a horizontal-scroll container, and uses `table-layout: fixed`. **Every column except exactly one must have an explicit `width`** (px or `%`) — leaving two or more columns unconstrained makes column widths jump around whenever the row content/filter changes (this exact bug happened before and was fixed by auditing every `columns` array).

**Consistent page chrome via CSS vars**: `--shell-content-height` keeps every list page's white container the same height regardless of row count; `--table-row-height` keeps table rows a fixed height; `--page-title-height` keeps a page's title row the same height whether or not it includes a "Yeni X" add button. When adding a new list page, reuse these vars rather than hand-tuning heights, or the pages will visually drift apart again.

**`shared/ActionMenu`**: a 3-dot trigger whose dropdown is rendered via `createPortal(..., document.body)` — required because table cells sit inside an `overflow-x: auto` scroll container that would otherwise clip an absolutely-positioned dropdown. Used only on **Campaigns / Categories / Products**; **Orders** and **Users** intentionally use a plain inline "Göstər" button + detail `Modal` instead (a deliberate product inconsistency, not an oversight — don't "fix" it by unifying them).

**CRUD modal pattern** (Campaigns, Categories, Products all repeat this shape — copy it for any new similar page):
- one `Modal` for create/edit, driven by `formOpen` / `editing` / `form` state,
- one `ConfirmModal` for delete, driven by `deleteTarget`,
- one `wide` `Modal` for a read-only detail view, driven by `viewTarget`, opened from `ActionMenu`'s "Bax".

The "Şəkil ünvanı" field in these forms is a plain text input bound to `form.imageUrl`. If an item has `imageUrl` set, thumbnails render an `<img>`; otherwise they fall back to the item's `image` field, which mock data stores as an emoji character painted over a `color` background (there are no real image files behind most items).

**Search flow**: the raw search string lives in `AdminLayout` (`useState`, passed to `Header`'s controlled input so typing feels instant), but the value handed down to pages via `<Outlet context={{ search }}>` is `useDebounce(search, 500)` — so every page's `useMemo` filter (reading `search` via `useOutletContext()`) only re-runs 500ms after the user stops typing. Don't debounce inside individual pages; the debounce point is centralized in `AdminLayout` so all pages get it for free.

**`useTitle(title)`** (`src/shared/hooks/useTitle.js`): sets `document.title` to `"{title} · Tik Tak Admin"` for the life of the component and restores the previous title on unmount. Every page component calls it once, near the top, with its own Azerbaijani title (e.g. `useTitle('Sifarişlər')`) — do the same for any new page.
