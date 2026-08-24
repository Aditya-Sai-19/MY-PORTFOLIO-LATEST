# Architecture Overview

## 1. High-Level Summary

This project is a **single-page personal portfolio** built with Next.js App Router and client-rendered React components.

Architecture style:

- Monolithic frontend application
- Static/hardcoded content model inside React components
- No backend service layer yet
- Minimal state management with local component state and hooks
- Design system driven by CSS variables (light/dark) with reusable UI primitives
- Visual language: **liquid glass + soothing editorial design** over a soft atmospheric canvas (no claymorphism)

---

## 2. Runtime Architecture

### 2.1 Render Pipeline

1. `app/layout.tsx` bootstraps global shell (`<html>`, metadata, font, `next-themes` provider).
2. `app/page.tsx` renders the full page composition directly (no loading gate).
3. `Atmosphere` renders fixed, slow-moving blurred color orbs behind everything (GSAP, disabled under reduced motion).
4. Each section mounts as a client component; scroll reveals are handled by the GSAP-based `Reveal` primitive.

### 2.2 Component Tree

`app/page.tsx` composes:

- `Atmosphere`
- `Navbar`
- `Hero`
- `Projects`
- `About`
- `Experience`
- `Skills`
- `Certifications`
- `Community`
- `Contact`
- `Footer`

This is a vertical single-page flow mapped to section IDs.

---

## 3. Directory-Level Architecture

```txt
app/
  layout.tsx      -> global app shell, metadata, font, theme provider
  page.tsx        -> top-level composition
  globals.css     -> design tokens (glass palette) and base Tailwind layers

components/
  Atmosphere.tsx  -> fixed blurred color orbs, GSAP slow drift
  Navbar.tsx      -> floating liquid-glass pill navigation
  Hero.tsx        -> editorial hero + floating glass identity panel
  Projects.tsx    -> asymmetric project showcase with glass metadata panel
  About.tsx       -> statement + portrait profile photo + typographic facts + one floating glass surface
  Experience.tsx  -> editorial timeline with glass markers
  Skills.tsx      -> hairline rows + glass icon chips (skillicons.dev) + translucent pills on an atmosphere band
  Certifications.tsx -> scannable archive rows + glass filter pills
  Community.tsx   -> editorial rows with soft logo surfaces
  Testimonials    -> stagger-fan card layout with photos, LinkedIn links, and quotes (rendered inline in page.tsx)
  Contact.tsx     -> dramatic closing over a luminous atmosphere
  Footer.tsx      -> minimal footer + tiny glass back-to-top
  theme-provider.tsx -> next-themes wrapper
  ui/             -> design-system primitives (glass-surface, glass-button, reveal,
                     magnetic, section-heading, section-word, pill, arrow-link)
                     plus unused shadcn components

constants/
  theme.ts        -> site identity (SITE) and social links (SOCIAL_LINKS)

hooks/
  use-toast.ts    -> toast reducer/store hook (present but currently unused by main page)

lib/
  utils.ts        -> className merge helper (`cn`)

public/
  favicon.png, resume.pdf, hero-video.mp4, aditya-profile.jpeg,
  *.jpeg/*.jpg (community logos + testimonial photos), logos/ (skill icons)
```

---

## 4. Frontend Functional Architecture

### 4.1 Navigation Flow

- `Navbar.tsx` renders a fixed, centered glass pill (`.glass` utility).
- Local state: `scrolled` (driven by a GSAP `ScrollTrigger`; pill shrinks/opacifies), `active` (IntersectionObserver), `open` (mobile menu).
- `scrollTo(id)` uses `document.getElementById(...).scrollIntoView({ behavior: 'smooth' })`.
- Desktop shows inline links with a shared `layoutId` highlight pill; mobile shows a glass dropdown.
- Theme toggle switches `light`/`dark` via `next-themes`.

### 4.2 Hero Flow

- GSAP entrance timeline: eyebrow -> name -> description -> CTA -> socials -> glass identity panel (opacity/y choreography, ~0.15s offsets).
- The glass identity panel has an idle float (7s sine yoyo) plus a subtle scroll parallax via ScrollTrigger.
- Social links sourced from `SOCIAL_LINKS` in `constants/theme.ts`.
- Resume CTA downloads `public/resume.pdf`.
- The identity panel is desktop-only (`hidden lg:block`); mobile keeps the typographic hero.
- Magnetic CTA via GSAP `quickTo`, disabled for touch and reduced-motion users.

### 4.3 Projects Flow

- Projects defined as an in-component static array.
- Asymmetric editorial layout: an image-led featured project (dominant visual weight) with a **floating glass metadata panel** overlapping the image; a supporting pair, a horizontal banner, and a last project + GitHub tile.
- Each project: an icon visual surface (dot-grid + accent tint), title, description, tech as a quiet dot-separated line, and a "View project" arrow link.
- Featured hover uses a GSAP timeline (image scale 1.02 + panel lift 4px) that reverses on leave; supporting visuals use a gentle CSS scale on hover.

### 4.4 About Flow

- Editorial layout: modest heading, a large dominant statement on the background, concise story with a **portrait profile photo** on the right, then typographic facts with hairline separators.
- The profile photo is displayed in a glass-elevated portrait frame (220x280px), desktop-only.
- One fact ("Currently") renders as an elevated floating glass surface for contrast against the flat typography.
- Facts are hardcoded and only reflect existing site content (location, education, current role, focus, interests, learning).

### 4.5 Experience Flow

- Timeline data (education + work) in a typed array.
- Vertical hairline rule with small glass markers; the current role gets an accent-filled elevated marker; markers scale on row hover.

### 4.6 Skills Flow

- Compact typographic rows (hairline dividers) with category labels and small translucent pills, sitting on an `atmosphere-band` (soft radial tint) for rhythm.
- Skills with a genuine skillicons.dev slug render as small glass chips (icon + label, lazy-loaded, theme-matched to light/dark); skills without a real slug stay as text pills.
- Chips reveal with their own gentle GSAP stagger (distinct from other sections' reveals); disabled under reduced motion.
- A single Tools row wraps the platforms list.

### 4.7 Certifications Flow

- Certification catalog is a static typed array, presented as a compact archive of rows with hairline separators.
- Glass filter pills filter the list client-side with a short Framer Motion crossfade.
- Rows are outbound links to evidence/cert pages; hovering a row gives a faint translucent highlight; dates are parsed for descending sort.

### 4.8 Contact Flow

- Dramatically simple closing: giant display type over an `atmosphere-luminous` background, one primary glass "Let's talk" `mailto:` CTA, and a minimal hairline-separated link row.
- Location shown as tiny metadata below the links.

### 4.9 Testimonials Flow

- Testimonials defined as a static typed array in `app/page.tsx` with fields: `quote`, `name`, `designation`, `src` (photo), and optional `linkedin` (URL).
- Rendered via the `StaggerTestimonials` component: a stagger-fan card layout where the center card is highlighted and surrounding cards fan out left/right.
- Navigation arrows allow browsing through testimonials; clicking a card moves it to the center.
- Each card shows the photo, quote text (auto-scaled via `clamp()`), attribution, and a LinkedIn icon (bottom-right) when a URL is provided.
- The center card uses inverted colors (primary background); side cards use the default card background.
- Card sizes are responsive: 460px (lg), 380px (sm), 320px (mobile).
- Testimonial photos are stored in `public/` as local JPEG/JPG files.

No server/network request is made in current flow.

---

## 5. Styling and Design System Architecture

### 5.1 Design Tokens

`app/globals.css` defines light and dark token sets (morning-light palette / nighttime glass):

- Backgrounds: `--background`, `--card`, `--popover` (warm off-white / deep charcoal)
- Text: `--foreground`, `--muted-foreground` (AA-compliant in both themes)
- Accent: single muted sage / blue-green (`--accent`)
- Glass material: `--glass-shadow`, `--glass-highlight`

### 5.2 Tailwind Theme Extension

`tailwind.config.ts` maps tokens to utilities:

- `borderRadius.surface*` (1rem / 1.5rem / 2rem)
- `boxShadow.glass*` (soft ambient shadow + inset top highlight)
- `fontFamily.sans` (Plus Jakarta Sans via `--font-sans`)
- `transitionTimingFunction.out-expo` = `cubic-bezier(0.22, 1, 0.36, 1)`

### 5.3 Global CSS Utilities

- `.glass` / `.glass-subtle` / `.glass-elevated` — liquid-glass surface variants (backdrop blur + saturate, translucent gradient, thin border, inner highlight)
- `.glass-interactive` — brightens on hover; `.glass-sheen` — light travels across on hover
- `.orb` + `.orb-sage` / `.orb-mist` / `.orb-lavender` / `.orb-ivory` — huge blurred atmospheric shapes
- `.atmosphere-band` / `.atmosphere-luminous` — soft radial section tints
- `.display` — display heading treatment (tight line-height, tight tracking)
- `.eyebrow` — small uppercase metadata label
- `.dot-grid` — subtle dotted texture for project visuals

### 5.3a Signature Motif

- `SectionWord` renders a giant, near-invisible typographic word cropped by the section edge.
- Used on exactly three sections (Work, About, Archive) as a recurring structural motif; GSAP fades it to ~5% opacity and adds a whisper of parallax.

### 5.4 Animation Stack

- **GSAP (primary)**: hero entrance timeline, `Reveal` scroll reveals (ScrollTrigger), `Magnetic` quickTo CTA, `SectionWord` motif, Atmosphere orb drift, navbar scroll state, featured-project hover timeline.
- **Framer Motion**: small state transitions only (certification filter crossfade, mobile menu, nav highlight pill, reduced-motion hook).
- **CSS**: hover lifts, arrow slides, glass interactivity.
- **Reduced motion**: GSAP `matchMedia`-style guards (`useReducedMotion` checks) skip scroll/parallax/magnetic/atmospheric animations; a global media query collapses CSS transitions.

---

## 6. State Management Architecture

Current state is lightweight and local:

- `Navbar.tsx`: scroll/active/mobile menu/theme
- `Hero.tsx`: none (static after mount)
- `Certifications.tsx`: active category filter
- `Contact.tsx`: none (static links)

Shared constants:

- `SITE`
- `SOCIAL_LINKS`

Additional reusable state utility:

- `hooks/use-toast.ts` (global in-memory reducer pattern), currently not mounted in main layout.

---

## 7. API and Backend Architecture (Current)

Current backend architecture is intentionally absent:

- No `app/api` routes
- No persistence layer
- No service/repository pattern in use
- No auth/session mechanism

This is a static/content-first frontend architecture.

---

## 8. Build and Deployment Architecture

### 8.1 Build System

- Next.js build (`next build`)
- TypeScript config enabled with strict mode, but build errors are currently ignored via `next.config.js`
- ESLint build blocking disabled in `next.config.js`
- **Note**: a non-standard `NODE_ENV` in the shell (e.g. `development`) breaks `next build` error-page prerendering; build with `NODE_ENV=production`.

### 8.2 Deployment Characteristics

- Vercel-friendly setup
- `images.unoptimized: true` means Next image optimization pipeline is bypassed
- Good fit for static-like deployments with minimal server dependencies

---

## 9. Risks and Technical Debt

1. **No backend contact API**: contact relies on `mailto:` links.
2. **Build safety disabled**: type/lint issues may reach production unnoticed.
3. **Hardcoded domain content**: updates require code changes.
4. **Unused UI primitives**: many pre-existing `components/ui/*` shadcn files increase maintenance overhead if unused.

---

## 10. Suggested Evolution Path

### Phase 1 (Backend Enablement)

- Add `POST /api/contact` route.
- Add Zod request validation.
- Replace `mailto` flow with API call.

### Phase 2 (Content Decoupling)

- Move projects/certifications/skills data to JSON/CMS/source module.
- Optionally expose read APIs for dynamic content consumption.

### Phase 3 (Quality Hardening)

- Re-enable build-time type and lint safety.
- Add API and component-level tests.
- Add observability/logging for contact submissions.

---

## 11. New Developer Quick Map

Start here for fastest understanding:

1. `app/page.tsx` (composition)
2. `components/Navbar.tsx` and `components/Certifications.tsx` (interaction-heavy logic)
3. `constants/theme.ts`, `tailwind.config.ts`, and `app/globals.css` (design system backbone)
4. `ARCHITECTURE_OVERVIEW.md` + `API_DEVELOPER_DOCS.md`

After that, pick one section component and trace its render + data model end-to-end.
