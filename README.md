# Personal Portfolio (Next.js)

This repository contains a single-page personal portfolio application built with Next.js App Router, React, TypeScript, Tailwind CSS, GSAP, Framer Motion, and OGL (WebGL).

Live Demo: [aditya-sai.vercel.app](https://aditya-sai.vercel.app/)

![Project Screenshot](./project-screenshot.png)

## Who This README Is For

This README is written for new developers joining the project. It covers:

- What the app does
- How the codebase is organized
- How data and UI flow work
- How to run, customize, and deploy safely

For deeper references, also read:

- `API_DEVELOPER_DOCS.md`
- `ARCHITECTURE_OVERVIEW.md`

## Current Product Scope

This is currently a **frontend-only portfolio site** with no backend services.

Implemented functionality:

- Cinematic full-screen hero with background video, noise overlay, gradient overlay, WordsPullUp entrance animation, and glass pill CTAs (View my work, Download resume)
- Floating liquid-glass navigation pill with scroll-aware opacity, active-section tracking, theme toggle, and a clean mobile dropdown
- Asymmetric editorial project showcase with a dominant featured piece and a glass metadata panel floating over the image
- About section with a dominant statement, portrait profile photo, typographic facts, and one floating glass surface
- Journey/experience section rendered as a pin-card timeline with alternating left/right cards and numbered steps (using the `HowItWorks` component)
- Skills organized into categories with glass chips (icons from skillicons.dev) plus translucent pills on an atmospheric band
- Certifications displayed as a 3D rotating circular gallery powered by OGL/WebGL (`CircularGallery`), with a static grid fallback for reduced-motion users
- Community roles as editorial rows with organization logos
- Testimonials section with a stagger-fan card layout featuring real photos, LinkedIn links, and full quotes from colleagues and clients
- Contact section with giant display type, a primary glass CTA, social links, and location metadata
- Cinematic footer with curtain-reveal animation, marquee ticker, aurora background, giant background text, glass pill CTAs (Download Resume, View My Work), social links, and back-to-top button
- Structured data (JSON-LD) for SEO/AEO including WebSite, Person, and FAQPage schemas
- Light/dark theme support (morning-light palette / nighttime glass + muted sage accent)
- `prefers-reduced-motion` support (disables GSAP animations, uses static fallback grids)

Not currently implemented:

- REST/GraphQL API endpoints
- Database persistence
- Server-side form handling
- Authentication/authorization

## Tech Stack

- Framework: `next` `^15.5.9` (App Router)
- UI: `react` `^18.3.1`, `framer-motion`, `lucide-react`, `next-themes`
- Animation: `gsap` + `@gsap/react` (primary), Framer Motion (small state transitions)
- WebGL: `ogl` (3D circular gallery for certifications)
- Styling: `tailwindcss` + custom design tokens (CSS variables, liquid-glass system)
- Font: `Plus Jakarta Sans` (via `next/font`)
- Language: TypeScript (`strict: true`)
- Utilities: `clsx`, `tailwind-merge`, `class-variance-authority`
- Validation: `zod` (for future API use)
- Deployment target: Vercel/static-friendly hosting

## Project Structure (Actual)

```txt
Portfolio/
+-- app/
|   +-- globals.css               # Design tokens (glass palette) + Tailwind layers + reduced motion
|   +-- layout.tsx                # Root HTML shell + metadata + font + theme provider
|   +-- page.tsx                  # Main single-page composition + structured data (JSON-LD) + testimonials data
+-- components/
|   +-- About.tsx                 # Dominant statement + portrait profile photo + typographic facts + glass surface
|   +-- Atmosphere.tsx            # Fixed blurred color orbs (GSAP slow drift)
|   +-- Certifications.tsx        # 3D circular gallery (OGL) + static grid fallback + certificate data
|   +-- Community.tsx             # Editorial community role rows
|   +-- Contact.tsx               # Closing statement + glass CTA + social links + location
|   +-- Experience.tsx            # Education/work timeline (legacy, superseded by HowItWorks in page.tsx)
|   +-- Footer.tsx                # Cinematic curtain-reveal footer + marquee + aurora + glass pill CTAs
|   +-- Hero.tsx                  # Legacy hero component (replaced by prisma-hero)
|   +-- Navbar.tsx                # Floating liquid-glass pill navigation + theme toggle + mobile menu
|   +-- Projects.tsx              # Asymmetric project showcase + glass metadata panel
|   +-- Skills.tsx                # Category rows + glass icon chips (skillicons.dev) + translucent pills
|   +-- theme-provider.tsx        # next-themes wrapper
|   +-- ui/                       # Design-system primitives + third-party UI components
|       +-- glass-surface.tsx     # Reusable glass surface component (subtle/standard/elevated variants)
|       +-- glass-button.tsx      # Glass button with CVA variants (primary/secondary/ghost)
|       +-- how-it-works.tsx      # Pin-card timeline layout (used for Journey section)
|       +-- prisma-hero.tsx       # Cinematic video hero with WordsPullUp animation
|       +-- circular-gallery.tsx  # OGL-powered 3D rotating gallery
|       +-- arc-gallery-hero-component.tsx  # Alternative gallery hero component
|       +-- stagger-testimonials.tsx  # Stagger-fan card layout for testimonials
|       +-- reveal.tsx            # GSAP scroll-triggered reveal primitive
|       +-- section-heading.tsx   # Reusable section heading with label/title/description
|       +-- section-word.tsx      # Giant typographic motif (default/gradient variants)
|       +-- pill.tsx              # Small translucent pill component
|       +-- arrow-link.tsx        # Arrow link component
|       +-- magnetic.tsx          # Magnetic hover effect component
|       +-- animated-testimonials.tsx  # Alternative testimonial animation
|       +-- [shadcn components]   # UI primitives from shadcn/ui (accordion, dialog, tabs, etc.)
+-- constants/
|   +-- theme.ts                  # Site identity (SITE), social links (SOCIAL_LINKS), nav items (NAV_ITEMS)
+-- hooks/
|   +-- use-toast.ts              # Toast state manager (currently not wired to page)
+-- lib/
|   +-- utils.ts                  # `cn()` className merge helper
+-- public/
|   +-- favicon.png
|   +-- resume.pdf
|   +-- hero-video.mp4            # Hero section background video
|   +-- aditya-profile.jpeg       # About section profile photo
|   +-- *.jpeg / *.jpg            # Community organization logos + testimonial photos
|   +-- certificates/             # Certificate preview images (for circular gallery)
|   +-- logos/                    # Skill/tool icons (SVG/PNG)
+-- next.config.js
+-- tailwind.config.ts
+-- tsconfig.json
+-- README.md
```

## End-to-End Runtime Flow

1. `app/layout.tsx` sets up global HTML, font, metadata, and the `next-themes` provider.
2. `app/page.tsx` renders the page tree in this order:
   - Structured data scripts (JSON-LD for WebSite, Person, FAQPage)
   - `Atmosphere`
   - `Navbar`
   - `AdityaHero` (cinematic video hero)
   - `Projects` (work)
   - `About`
   - `HowItWorks` (journey) wrapped in `Reveal`
   - `Skills`
   - `Certifications`
   - `Community`
   - Testimonials section (inline in page.tsx using `StaggerTestimonials`)
   - `Footer` (cinematic curtain-reveal)
3. `Navbar` scrolls to section IDs via `element.scrollIntoView({ behavior: 'smooth' })` and tracks the active section with an `IntersectionObserver`.
4. Scroll reveals use the GSAP-based `Reveal` primitive (ScrollTrigger), which disables itself under `prefers-reduced-motion`.
5. Testimonials render in a stagger-fan card layout (`StaggerTestimonials`) with the center card highlighted and navigation arrows to browse.
6. Certifications render as a 3D rotating circular gallery (`CircularGallery` powered by OGL/WebGL), or a static grid when reduced motion is preferred.
7. The Footer uses a curtain-reveal technique: a fixed full-screen layer clipped by an in-flow wrapper, revealed as the page scrolls to the bottom.

## Configuration Notes

- `constants/theme.ts` centralizes site identity (`SITE`), social links (`SOCIAL_LINKS`), and navigation items (`NAV_ITEMS`).
- `tailwind.config.ts` maps design tokens from CSS variables (glass surfaces, shadows, accent) into Tailwind utilities.
- `app/globals.css` defines the light/dark token sets and the `.glass` / `.glass-subtle` / `.glass-elevated` / `.glass-interactive` / `.glass-sheen` / `.orb` / `.display` / `.eyebrow` / `.dot-grid` / `.noise-overlay` utility classes.
- `next.config.js` currently sets:
  - `eslint.ignoreDuringBuilds: true`
  - `typescript.ignoreBuildErrors: true`
  - `images.unoptimized: true`
  - `devIndicators: false`

These settings are convenient for rapid iteration but reduce production build strictness.

## Setup and Run

1. Install dependencies:

   ```bash
   npm install
   ```

2. Start dev server:

   ```bash
   npm run dev
   ```

3. Open:

   ```txt
   http://localhost:3000
   ```

4. Production build:

   ```bash
   npm run build
   npm run start
   ```

> Note: if your shell exports a non-standard `NODE_ENV` (e.g. `development`), run the build as
> `NODE_ENV=production npm run build` — otherwise Next.js fails while prerendering error pages.

## Developer Scripts

- `npm run dev` — run local development server
- `npm run build` — create production build
- `npm run start` — run production server
- `npm run lint` — run Next.js linting

## Onboarding Guidance for Freshers

Recommended first reading order:

1. `app/page.tsx` (top-level composition)
2. `constants/theme.ts` (global constants)
3. The design-system primitives in `components/ui/`
4. `tailwind.config.ts` + `app/globals.css`
5. `ARCHITECTURE_OVERVIEW.md`
6. `API_DEVELOPER_DOCS.md`

Recommended first tasks:

- Add one new section component and wire it in `app/page.tsx`
- Add one new project entry in `components/Projects.tsx`
- Add one new certification entry in `components/Certifications.tsx`
- Replace the `mailto` CTA flow with a real API endpoint (see API docs)

## Deployment

Typical Vercel flow:

1. Push repository to GitHub.
2. Import repository in Vercel.
3. Build command: `npm run build`
4. Start command: `npm run start` (if needed by host)

Because this app is mostly static-client rendered content, it can also be hosted on other Node-compatible platforms.

## License

This project is licensed under the [MIT License](LICENSE.md).
