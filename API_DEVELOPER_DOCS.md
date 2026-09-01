# API Developer Docs

## Purpose

This document explains the API surface of the project for developers.

Important current state:

- The project has **no backend API routes** yet.
- There are **no server-side request handlers** in `app/api/**`.
- There are **no outbound `fetch`/`axios` calls** in application code.

So this doc has two goals:

1. Document the current behavior accurately.
2. Define a clear API roadmap for future implementation.

---

## 1) Current API Surface (As-Is)

### 1.1 HTTP Endpoints

No custom endpoints exist at the moment.

Only Next.js standard page route:

- `GET /` -> renders portfolio single-page UI (`app/page.tsx`).

### 1.2 Contact Flow

The contact section in `components/Contact.tsx` does not call an API.

Current behavior:

1. Displays a "Let's talk" primary glass CTA button (using `buttonVariants` from `components/ui/glass-button.tsx`) linking to `mailto:`.
2. Shows social media links (GitHub, LinkedIn, Hugging Face, Instagram, Email) from `SOCIAL_LINKS`.
3. Shows location metadata from `SITE.location`.
4. Browser navigates to the mailto URL on click.
5. User's default email client opens.

This means:

- No data is persisted in app/database.
- No server-side validation is performed.
- Success indicates email client was triggered, not that message was delivered.

### 1.3 Structured Data (SEO/AEO)

`app/page.tsx` includes three JSON-LD structured data scripts:

1. **WebSite schema** — describes the portfolio site with name, URL, description, and author.
2. **Person schema** — detailed profile of Kolapalli Aditya Sai including job title, description, address, employer (Kodryx AI), education, skills (`knowsAbout`), and social links (`sameAs`).
3. **FAQPage schema** — five Q&A entries covering who Aditya is, what he does at Kodryx AI, his technical skills, notable projects, and contact information.

These are rendered as inline `<script type="application/ld+json">` tags in `page.tsx` and are consumed by search engines and AI-powered answer engines.

### 1.4 Environment Variables and Secrets

No API keys or third-party API secrets are required by the current implementation.

At present, the UI logic is entirely local/static and does not depend on runtime secret configuration.

---

## 2) Internal "Data Contracts" in UI

Even without backend APIs, there are important in-code data structures.

### 2.1 Contact Payload (Client-Side)

The contact section uses a simple `mailto:` CTA. No form payload exists currently.

Future `POST /api/contact` payload (recommended):

```ts
{
  name: string;
  email: string;
  subject: string;
  message: string;
}
```

### 2.2 Project Card Model (Client-Side)

Used in `components/Projects.tsx`:

```ts
{
  title: string;
  description: string;
  tech: string[];
  icon: LucideIcon;
  gradient: string;
  features: string[];
  link?: string;
}
```

### 2.3 Certification Model (Client-Side)

Used in `components/Certifications.tsx`:

```ts
{
  name: string;
  platform: string;
  date: string;
  category: string;
  description: string;
  link: string;
  preview?: string;  // Local certificate image (public/certificates/*)
}
```

The gallery also uses a `LABELS` record to provide short, scannable labels for the 3D gallery cards:

```ts
const LABELS: Record<string, string> = {
  "Introduction to Agent Skills": "Agent Skills",
  "Claude Code in Action": "Claude Code",
  // ... more mappings
};
```

### 2.4 Community Role Model (Client-Side)

Used in `components/Community.tsx`:

```ts
{
  role: string;
  organization: string;
  description: string;
  logo: string;
  logoAlt: string;
}
```

Note: `logoScaleClass` was removed in the current version.

### 2.5 Testimonial Model (Client-Side)

Used in `app/page.tsx` (TESTIMONIALS array) and rendered by `components/ui/stagger-testimonials.tsx`:

```ts
// Input shape (in page.tsx)
{
  quote: string;        // Full testimonial text
  name: string;         // Person's name
  designation: string;  // Role and company
  src: string;          // Photo URL or local path (e.g. "/JayantVerma.jpeg")
  linkedin?: string;    // Optional LinkedIn profile URL
}

// Rendered shape (StaggerTestimonial)
{
  id: number;           // Array index
  quote: string;
  by: string;           // Formatted as "Name, Designation"
  imgSrc: string;
  linkedin?: string;
}
```

### 2.6 Journey/Experience Model (Client-Side)

Used inline in `app/page.tsx` as features for the `HowItWorks` component:

```ts
{
  title: string;        // e.g. "AI Engineer Intern"
  description: string;  // Multi-line text with company, dates, and responsibilities
  colorTheme: "orange" | "blue" | "purple";
}
```

### 2.7 Navigation Items (Client-Side)

Defined in `constants/theme.ts`:

```ts
const NAV_ITEMS = [
  { id: "work", label: "Work" },
  { id: "about", label: "About" },
  { id: "journey", label: "Journey" },
  { id: "skills", label: "Skills" },
  { id: "community", label: "Community" },
  { id: "testimonials", label: "Testimonials" },
  { id: "contact", label: "Contact" },
] as const;
```

---

## 3) Recommended Future API Design

If you want real backend capabilities (especially for contact), add APIs under `app/api/**`.

### 3.1 Recommended First Endpoint

`POST /api/contact`

Request body:

```json
{
  "name": "Jane Doe",
  "email": "jane@example.com",
  "subject": "Project collaboration",
  "message": "I would like to discuss an AI project..."
}
```

Suggested validation rules:

- `name`: required, 2-100 chars
- `email`: required, valid email format
- `subject`: optional, max 150 chars
- `message`: required, 10-5000 chars

Suggested response (`201 Created`):

```json
{
  "success": true,
  "message": "Contact request received",
  "requestId": "uuid"
}
```

Error response example (`400 Bad Request`):

```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Email is invalid",
    "field": "email"
  }
}
```

### 3.2 Future Content APIs (Optional)

If content should be CMS-driven instead of hardcoded:

- `GET /api/projects`
- `GET /api/skills`
- `GET /api/certifications`

Then replace static arrays in components with fetched data.

---

## 4) Suggested Backend Folder Structure

```txt
app/
+-- api/
    +-- contact/
    |   +-- route.ts          # POST handler
    +-- projects/
    |   +-- route.ts          # GET handler (optional)
    +-- certifications/
        +-- route.ts          # GET handler (optional)
lib/
+-- validation/
|   +-- contact.ts           # Zod schemas
+-- services/
|   +-- mailer.ts            # Mail transport logic
+-- repositories/
    +-- contact.ts           # DB persistence logic (if added)
```

---

## 5) Security and Reliability Checklist (When APIs Are Added)

- Validate all request payloads server-side (recommend `zod`).
- Add rate limiting for public endpoints like contact.
- Sanitize/escape user input before logging or rendering.
- Never expose private keys to client bundles.
- Add request IDs for traceability.
- Return consistent error shapes for frontend handling.

---

## 6) Testing Strategy for Future API Layer

When API routes are introduced, add:

- Unit tests for validators and service functions.
- Integration tests for `app/api/**` routes.
- Negative tests for malformed payloads and rate-limit paths.

Recommended flow:

1. Validate schema.
2. Execute service.
3. Assert status code + JSON contract.

---

## 7) Current Gaps to Be Aware Of

- Contact "success" is client-side only; no guaranteed message delivery.
- No persistence/audit trail for leads/messages.
- No API monitoring/observability because no API exists yet.

---

## 8) Onboarding Tasks for New API Developers

1. Implement `POST /api/contact` with schema validation.
2. Replace `mailto` submission in `Contact.tsx` with `fetch('/api/contact')`.
3. Add user-friendly loading and error states for network responses.
4. Add basic request logging and optional email provider integration.

This sequence gives immediate production value while preserving current UI behavior.
