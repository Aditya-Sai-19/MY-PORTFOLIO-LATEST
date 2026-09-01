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
- WebGL-powered 3D circular gallery for certifications (via `ogl`)

---

## 2. Runtime Architecture

### 2.1 Render Pipeline

1. `app/layout.tsx` bootstraps global shell (`<html>`, metadata, font, `next-themes` provider).
2. `app/page.tsx` renders the full page composition directly (no loading gate), preceded by structured data scripts.
3. `Atmosphere` renders fixed, slow-moving blurred color orbs behind everything (GSAP, disabled under reduced motion).
4. `AdityaHero` renders a cinematic full-screen video hero with WordsPullUp entrance animation (Framer Motion), noise overlay, gradient overlay, and glass pill CTAs.
5. Each subsequent section mounts as a client component; scroll reveals are handled by the GSAP-based `Reveal` primitive.
6. `Footer` uses a cinematic curtain-reveal technique: a fixed full-screen layer clipped by an in-flow wrapper, revealed as the page scrolls to the bottom.

### 2.2 Component Tree

`app/page.tsx` composes:

- Structured data scripts (JSON-LD: WebSite, Person, FAQPage)
- `Atmosphere`
- `Navbar`
- `AdityaHero` (cinematic video hero)
- `Projects`
- `About`
- `HowItWorks` (journey, wrapped in `Reveal`)
- `Skills`
- `Certifications`
- `Community`
- Testimonials (inline section using `StaggerTestimonials`)
- `Footer` (cinematic curtain-reveal)

This is a vertical single-page flow mapped to section IDs.

---

## 3. Directory-Level Architecture

```txt
app/
  layout.tsx      -> global app shell, metadata, font, theme provider
  page.tsx        -> top-level composition + structured data + testimonials data
  globals.css     -> design tokens (glass palette), base Tailwind layers, reduced motion, noise overlay

components/
  About.tsx       -> statement + portrait profile photo + typographic facts + one floating glass surface
  Atmosphere.tsx  -> fixed blurred color orbs, GSAP slow drift
  Certifications.tsx -> 3D circular gallery (OGL) + static grid fallback + certificate data
  Community.tsx   -> editorial rows with soft logo surfaces
  Contact.tsx     -> dramatic closing over a luminous atmosphere + glass CTA (buttonVariants)
  Experience.tsx  -> education/work timeline (legacy, superseded by HowItWorks in page.tsx)
  Footer.tsx      -> cinematic curtain-reveal footer + marquee + aurora + glass pill CTAs
  Hero.tsx        -> legacy hero component (replaced by prisma-hero)
  Navbar.tsx      -> floating liquid-glass pill navigation
  Projects.tsx    -> asymmetric project showcase with glass metadata panel
  Skills.tsx      -> hairline rows + glass icon chips (skillicons.dev) + translucent pills on atmosphere band
  theme-provider.tsx -> next-themes wrapper
  ui/             -> design-system primitives + third-party UI components:
      glass-surface.tsx     -> reusable glass surface (subtle/standard/elevated variants)
      glass-button.tsx      -> glass button with CVA variants (primary/secondary/ghost)
      how-it-works.tsx      -> pin-card timeline layout (used for Journey section)
      prisma-hero.tsx       -> cinematic video hero with WordsPullUp animation
      circular-gallery.tsx  -> OGL-powered 3D rotating gallery
      arc-gallery-hero-component.tsx -> alternative gallery hero component
      stagger-testimonials.tsx -> stagger-fan card layout for testimonials
      reveal.tsx            -> GSAP scroll-triggered reveal primitive
      section-heading.tsx   -> reusable section heading with label/title/description
      section-word.tsx      -> giant typographic motif (default/gradient variants)
      pill.tsx              -> small translucent pill component
      arrow-link.tsx        -> arrow link component
      magnetic.tsx          -> magnetic hover effect component
      animated-testimonials.tsx -> alternative testimonial animation
      [shadcn components]   -> UI primitives from shadcn/ui (accordion, dialog, tabs, etc.)

constants/
  theme.ts        -> site identity (SITE), social links (SOCIAL_LINKS), navigation items (NAV_ITEMS)

hooks/
  use-toast.ts    -> toast reducer/store hook (present but currently unused by main page)

lib/
  utils.ts        -> className merge helper (`cn`)

public/
  favicon.png, resume.pdf, hero-video.mp4, aditya-profile.jpeg,
  *.jpeg/*.jpg (community logos + testimonial photos),
  certificates/ (certificate preview images for circular gallery),
  logos/ (skill icons)
```

---

## 4. Frontend Functional Architecture

### 4.1 Navigation Flow

- `Navbar.tsx` renders a fixed, centered glass pill (`.glass` utility).
- Local state: `scrolled` (driven by a GSAP `ScrollTrigger`; pill shrinks/opacifies), `active` (IntersectionObserver), `open` (mobile menu).
- Navigation items sourced from `NAV_ITEMS` in `constants/theme.ts`.
- `scrollTo(id)` uses `document.getElementById(...).scrollIntoView({ behavior: 'smooth' })`.
- Desktop shows inline links with a shared `layoutId` highlight pill; mobile shows a glass dropdown.
- Theme toggle switches `light`/`dark` via `next-themes`.

### 4.2 Hero Flow (AdityaHero)

- Full-screen cinematic hero with a looping background video (`/hero-video.mp4`).
- Noise overlay (`noise-overlay` CSS utility) blended on top for texture.
- Gradient overlay (`from-black/50 via-black/20 to-black/70`) ensures white text readability in both themes.
- WordsPullUp entrance animation: each word animates from y:20/opacity:0 to y:0/opacity:1 with staggered delays.
- Two glass pill CTAs: "View my work" (scrolls to #work) and "Download resume" (downloads `/resume.pdf`).
- Responsive typography scaling from `14vw` on mobile to `7vw` on large screens.
- No GSAP used in this component — pure Framer Motion.

### 4.3 Projects Flow

- Projects defined as an in-component static array.
- Asymmetric editorial layout: an image-led featured project (dominant visual weight) with a **floating glass metadata panel** overlapping the image; a supporting pair, a horizontal banner, and a last project + GitHub tile.
- Each project: an icon visual surface (dot-grid + accent tint), title, description, tech as a quiet dot-separated line, and a "View project" arrow link.
- Featured hover uses a GSAP timeline (image scale 1.02 + panel lift 4px) that reverses on leave; supporting visuals use a gentle CSS scale on hover.

### 4.4 About Flow

- Editorial layout: modest heading, a large dominant statement on the background, concise story with a **portrait profile photo** on the right, then typographic facts with hairline separators.
- The profile photo is displayed in a glass-elevated portrait frame (220x280px), desktop-only.
- One fact ("Currently") renders as an elevated floating glass surface (`GlassSurface` component) for contrast against the flat typography.
- Facts are hardcoded and only reflect existing site content (location, education, current role, focus, interests, learning).

### 4.5 Journey Flow (HowItWorks)

- Journey data (education + work experience) defined inline in `app/page.tsx` as an array of `Step` objects passed to the `HowItWorks` component.
- Rendered as a pin-card timeline: alternating left/right cards with numbered steps (01–06), colored themes (orange/blue/purple), and a vertical dashed center line.
- Each card has a pin icon at the top, a numbered label in a handwriting font, a bold title, and a multi-line description.
- Cards have alternating rotations (`rotate-2` / `-rotate-2`) for visual rhythm.
- The entire section is wrapped in `Reveal` for scroll-triggered entrance animation.
- The `SectionWord` motif ("HUSTLE") is rendered with `variant="gradient"` and `rotate={-6}` for a scroll-mapped parallax effect.

### 4.6 Skills Flow

- Compact typographic rows (hairline dividers) with category labels and small translucent pills, sitting on an `atmosphere-band` (soft radial tint) for rhythm.
- Skills with a genuine skillicons.dev slug render as small glass chips (icon + label, lazy-loaded, theme-matched to light/dark); skills without a real slug stay as text pills.
- Skills with official brand logos (Docker, Vercel, GitHub, etc.) render from local SVG/PNG files in `/public/logos/` with theme-aware inversion.
- Skills with lucide-react fallbacks (Machine Learning, Deep Learning, etc.) render using the corresponding Lucide icon.
- Chips reveal with their own gentle GSAP stagger (distinct from other sections' reveals); disabled under reduced motion.
- Skills are organized into categories: Development, AI & Data Science, AI Agents, Agent Driven Development, Databases, Robotics & Hardware, Cybersecurity.
- A single Tools row wraps the tools list; a Platforms row wraps the platforms list.

### 4.7 Certifications Flow

- Certification catalog is a static typed array with 19 certifications, presented as a 3D rotating circular gallery powered by OGL (WebGL).
- Each certification has a local preview image (`preview` field) stored in `/public/certificates/`.
- The `CircularGallery` component uses OGL to create a 3D scene with plane geometries, custom shaders for rounded corners, and text labels rendered on canvas.
- The gallery supports drag and scroll interaction, with a configurable bend factor and scroll easing.
- When `prefers-reduced-motion` is detected, a static grid fallback (`StaticGrid`) is rendered instead.
- Each gallery item links to the certification verification URL.
- Short labels are defined in a `LABELS` record for compact display on the 3D cards.
- Categories are counted and displayed in the section metadata.

### 4.8 Contact Flow

- Dramatically simple closing: giant display type over an `atmosphere-luminous` background, one primary glass "Let's talk" `mailto:` CTA (using `buttonVariants` from `glass-button.tsx`), and a minimal hairline-separated link row.
- Social links include: Email, GitHub, LinkedIn, Hugging Face, Instagram.
- Location shown as tiny metadata below the links.

### 4.9 Testimonials Flow

- Testimonials defined as a static typed array in `app/page.tsx` with fields: `quote`, `name`, `designation`, `src` (photo), and optional `linkedin` (URL).
- 9 real testimonials from colleagues and clients (Kodryx AI, MFUGH Community, etc.).
- Rendered via the `StaggerTestimonials` component: a stagger-fan card layout where the center card is highlighted and surrounding cards fan out left/right.
- Navigation arrows allow browsing through testimonials; clicking a card moves it to the center.
- Each card shows the photo, quote text (auto-scaled via `clamp()`), attribution, and a LinkedIn icon (bottom-right) when a URL is provided.
- The center card uses inverted colors (primary background); side cards use the default card background.
- Card sizes are responsive: 460px (lg), 380px (sm), 320px (mobile).
- Mobile layout uses a single-card carousel with pagination dots and touch swipe support.
- Testimonial photos are stored in `public/` as local JPEG/JPG files.

### 4.10 Footer Flow (Cinematic Curtain Reveal)

- The footer is a fixed full-screen layer (`position: fixed; bottom: 0`) clipped by an in-flow `h-screen` wrapper with `clipPath`.
- As the user scrolls to the bottom of the page, the section above slides up and the footer is revealed from underneath.
- Ambient aurora glow (animated with `footer-breathe` keyframe), background grid pattern, and giant "CODERS" background text with scroll parallax.
- Diagonal marquee ticker scrolling through AI/tech keywords.
- Center content: "Want to Contact?" headline with glass pill CTAs (Download Resume, View My Work) and social link pills.
- Bottom bar: copyright notice and back-to-top button.
- All animations are CSS keyframe-based (no GSAP dependency in this component).
- `prefers-reduced-motion` disables all footer animations.

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
- `.noise-overlay` — SVG fractal noise texture for hero backgrounds

### 5.4 Reusable UI Components

- `GlassSurface` (`components/ui/glass-surface.tsx`) — reusable glass surface with `variant` (subtle/standard/elevated), `interactive`, `sheen`, and `pill` props.
- `GlassButton` (`components/ui/glass-button.tsx`) — glass button using CVA with `variant` (primary/secondary/ghost) and `size` (sm/md/lg) props. Exports `buttonVariants` for external use.
- `SectionHeading` (`components/ui/section-heading.tsx`) — reusable section heading with optional `label`, `title`, `description`, `align`, and `size` props.
- `SectionWord` (`components/ui/section-word.tsx`) — giant typographic word motif with `align`, `variant` (default/gradient), and `rotate` props. Used on three sections (Work, About, Archive/HUSTLE).
- `Pill` (`components/ui/pill.tsx`) — small translucent pill for skill tags.
- `ArrowLink` (`components/ui/arrow-link.tsx`) — arrow link component for project links.
- `Magnetic` (`components/ui/magnetic.tsx`) — magnetic hover effect component (GSAP-based).
- `Reveal` (`components/ui/reveal.tsx`) — GSAP scroll-triggered reveal primitive with configurable `delay`, `y`, and `duration`.

### 5.5 Signature Motif

- `SectionWord` renders a giant, near-invisible typographic word cropped by the section edge.
- Used on exactly three sections (Work → "WORK", About → "About", Archive/Journey → "HUSTLE") as a recurring structural motif.
- Default variant: GSAP fades it to ~5% opacity and adds a whisper of parallax.
- Gradient variant (HUSTLE): uses `WebkitTextStroke` + gradient fill with scroll-mapped parallax.

### 5.6 Animation Stack

- **GSAP (primary)**: `Reveal` scroll reveals (ScrollTrigger), `Magnetic` quickTo CTA, `SectionWord` motif, Atmosphere orb drift, navbar scroll state, featured-project hover timeline, Skills chip choreography.
- **Framer Motion**: WordsPullUp hero entrance, mobile menu, nav highlight pill, reduced-motion hook, HowItWorks card entrance.
- **OGL (WebGL)**: CircularGallery 3D rotating certification cards with custom shaders.
- **CSS**: hover lifts, arrow slides, glass interactivity, footer marquee/breathe/rise animations, noise overlay.
- **Reduced motion**: GSAP `matchMedia`-style guards (`useReducedMotion` checks) skip scroll/parallax/magnetic/atmospheric animations; a global media query collapses CSS transitions; `CircularGallery` falls back to `StaticGrid`.

---

## 6. State Management Architecture

Current state is lightweight and local:

- `Navbar.tsx`: scroll/active/mobile menu/theme
- `Hero.tsx`: none (static after mount)
- `Certifications.tsx`: none (static gallery)
- `Contact.tsx`: none (static links)

Shared constants:

- `SITE`
- `SOCIAL_LINKS`
- `NAV_ITEMS`

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
- `devIndicators: false` disables dev build indicators
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
5. **Legacy components**: `Hero.tsx` and `Experience.tsx` remain in the codebase but are superseded by `prisma-hero.tsx` and `HowItWorks` respectively.

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
- Remove legacy components (`Hero.tsx`, `Experience.tsx`).

---

## 11. New Developer Quick Map

Start here for fastest understanding:

1. `app/page.tsx` (composition + structured data + testimonials data)
2. `components/ui/prisma-hero.tsx` (cinematic hero)
3. `components/ui/how-it-works.tsx` (journey timeline)
4. `components/ui/circular-gallery.tsx` (OGL 3D gallery)
5. `components/ui/glass-surface.tsx` + `glass-button.tsx` (design system primitives)
6. `constants/theme.ts`, `tailwind.config.ts`, and `app/globals.css` (design system backbone)
7. `ARCHITECTURE_OVERVIEW.md` + `API_DEVELOPER_DOCS.md`

After that, pick one section component and trace its render + data model end-to-end.
