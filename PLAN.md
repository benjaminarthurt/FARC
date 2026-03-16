# Fulton Amateur Radio Club — Website Implementation Plan

> **Status:** Documentation only. No code has been written yet.
> **Hosting Target:** GitHub Pages (`benjaminarthurt.github.io/FARC` or a custom domain)
> **Stack:** Plain HTML5, CSS3, Vanilla JavaScript — no build tools required for GitHub Pages.

---

## Table of Contents

1. [Goals & Guiding Principles](#1-goals--guiding-principles)
2. [Site Architecture & URL Structure](#2-site-architecture--url-structure)
3. [Page Inventory & Content Mapping](#3-page-inventory--content-mapping)
4. [Design System](#4-design-system)
5. [HTML Structure & Component Library](#5-html-structure--component-library)
6. [CSS Strategy](#6-css-strategy)
7. [JavaScript Functionality Plan](#7-javascript-functionality-plan)
8. [SEO Strategy](#8-seo-strategy)
9. [Media Handling & Optimization](#9-media-handling--optimization)
10. [Redirect Strategy](#10-redirect-strategy)
11. [GitHub Pages Deployment](#11-github-pages-deployment)
12. [Implementation Phases](#12-implementation-phases)
13. [File-System Layout](#13-file-system-layout)

---

## 1. Goals & Guiding Principles

### Primary Goals
- Migrate all content from the legacy Drupal CMS (`fultonamateurradioclub.org`) to a modern static site.
- Preserve every legacy URL via client-side redirects so existing links and search-engine indexes continue to work.
- Deliver a fast, accessible, mobile-first experience that reflects the club's 65+ year community history.

### Design Principles
| Principle | Rationale |
|-----------|-----------|
| **Modern but not trendy** | Avoid heavy gradients, excessive border-radius, and animations that age quickly. |
| **Content-first** | Amateur radio operators are pragmatic; dense but well-organized content is more valuable than decoration. |
| **Accessible** | WCAG 2.1 AA minimum — correct heading hierarchy, sufficient color contrast, keyboard-navigable. |
| **Responsive** | Mobile, tablet, and desktop breakpoints. |
| **Fast** | All assets served as static files from GitHub Pages. No JavaScript framework; no runtime dependencies. |
| **Maintainable** | Any club officer with basic HTML knowledge should be able to add meeting notes without touching CSS. |

---

## 2. Site Architecture & URL Structure

### Domain & Hosting

The site will be published to GitHub Pages. Two options:

| Option | URL | How to Enable |
|--------|-----|---------------|
| **Default GitHub Pages subdomain** | `https://benjaminarthurt.github.io/FARC/` | Set Pages source to `main` branch, `/` (root) or `/docs` folder |
| **Custom domain** | `https://fultonamateurradioclub.org/` | Add a `CNAME` file at the repo root with the domain name and configure four DNS A records: `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153` |

The preferred option is the custom domain so existing backlinks remain intact.

### Proposed URL Tree

```
/                              ← index.html  (Home / Meetings)
/about/                        ← about/index.html
/license-courses/              ← license-courses/index.html
/repeaters/                    ← repeaters/index.html
/races/                        ← races/index.html
/skywarn/                      ← skywarn/index.html
/scholarship/                  ← scholarship/index.html  (W2TQF)
/newsletter/                   ← newsletter/index.html
/web-links/                    ← web-links/index.html

/events/                       ← events/index.html  (photo gallery hub)
/events/field-day/             ← events/field-day/index.html
/events/christmas-party/       ← events/christmas-party/index.html
/events/club-picnic/           ← events/club-picnic/index.html
/events/open-house/            ← events/open-house/index.html

/meetings/                     ← meetings/index.html  (meeting archive list)
/meetings/[node-id]/           ← meetings/[node-id]/index.html  (individual meetings)

/archive/                      ← archive/index.html  (taxonomy / newsletter archive)
```

> **Why `index.html` in every directory?** GitHub Pages serves `index.html` automatically for clean URLs without file extensions, which is essential for SEO and readability.

---

## 3. Page Inventory & Content Mapping

### 3.1 Core Pages

| Page | Source File | Primary Content | Key Calls-to-Action |
|------|------------|-----------------|---------------------|
| **Home** | `docs/index.md` | Meeting schedule, location, past topics, guest speakers | "Join Us", "Upcoming Events" |
| **About** | `docs/content_about-fulton-amateur-radio-club.md` | Club history (founded 1957), mission, leadership roster, charter members | "Contact Us", "Attend a Meeting" |
| **License Courses & Exams** | `docs/content_license-courses.md` | Free Technician / General class instruction, exam session schedule, other CNY locations, study resources | "Register for Exam", links to study resources |
| **Repeaters** | `docs/repeaters.md` | Three repeaters (147.150, 146.850, 442.350), net schedule | — |
| **RACES** | `docs/races.md` | Emergency communications service overview, documents list, contact | "Contact RACES Officer" |
| **SKYWARN** | `docs/skywarn.md` | Weather spotter program overview, NWS partnership | "Learn More (NWS)" |
| **Scholarship** | `docs/W2TQF_Scholarship.md` | W2TQF Memorial $500 scholarship, eligibility, application deadline (May 30, 2025), contact | "Apply Now" (mailto / address) |
| **Newsletter** | `docs/newsletter.md` | ARISS program info, archive link | — |
| **Web Links** | `docs/web-links.md` | 29+ categorized external links | — |

### 3.2 Events Pages

| Page | Source File(s) | Content |
|------|---------------|---------|
| **Events Hub** | `docs/events/photo-gallery.md` | Gallery overview linking all sub-galleries |
| **Field Day** | `docs/events/content_field-day-*.md` | Field Day 2008, 2013, 2016, 2017 — photo galleries |
| **Christmas Party** | `docs/events/content_club-christmas-party*.md` | Party photos 2013, 2016, 2017 |
| **Club Picnic** | `docs/events/content_club-picnic*.md` | Picnic 2013, upcoming 2024 |
| **Open House** | `docs/events/content_open-house.md` | Open house event |
| **Club Gatherings** | `docs/events/event-types_club-gatherings.md` | Annual Picnic Aug 25, 2024 |

### 3.3 Meetings Archive

26 individual meeting-notes pages sourced from `docs/meetings/node_*.md`:

| Node | Content Summary |
|------|----------------|
| `node_2` | Recurring meeting overview (4th Wed, 7PM, County Building) |
| `node_174` | Field Day 2023 (canceled — lightning); Harborfest 5K coverage; new GMRS repeater |
| `node_175–node_185` | Various 2023 announcements: ARISS, construction project, newsletter items |
| `node_203–node_210` | 2023–2024 business meeting minutes |
| `node_215–node_219` | Jan–May 2024 meeting minutes |
| `node_224` | **Jan 2025** (most recent): treasury $906.27, Field Day June 28–29 2025, education calendar, public service events |

A **Meetings Index page** (`/meetings/`) will list all meetings reverse-chronologically with title, date, and a short excerpt.

### 3.4 Archive / Taxonomy Pages

Legacy Drupal taxonomy feeds mapped to static archive pages:

| Legacy URL | New URL | Content |
|-----------|---------|---------|
| `/taxonomy/term/46` | `/archive/newsletter/` | Newsletter category index |
| `/taxonomy/term/46/feed` | `/archive/newsletter/feed.xml` | RSS feed |
| `/taxonomy/term/17/feed` | `/archive/term/17/feed.xml` | Legacy category feed |
| `/taxonomy/term/27–33/feed` | `/archive/term/[id]/feed.xml` | Legacy category feeds |

---

## 4. Design System

### 4.1 Color Palette

The palette is inspired by amateur radio tradition (deep blues, signal green accents) without relying on gradients.

| Token | Hex | Usage |
|-------|-----|-------|
| `--color-primary` | `#1A3A5C` | Navy blue — header bar, primary buttons, headings |
| `--color-primary-light` | `#2A5A8C` | Hover/active states for primary elements |
| `--color-accent` | `#2E7D32` | Signal green — links, call-to-action highlights, badges |
| `--color-accent-light` | `#4CAF50` | Hover state for accent elements |
| `--color-surface` | `#FFFFFF` | Card and panel backgrounds |
| `--color-surface-alt` | `#F4F6F8` | Alternating table rows, sidebar backgrounds |
| `--color-border` | `#D1D9E0` | Dividers, card outlines |
| `--color-text-primary` | `#1A1A1A` | Body text |
| `--color-text-secondary` | `#4A5568` | Captions, meta information |
| `--color-text-inverse` | `#FFFFFF` | Text on dark backgrounds |
| `--color-warning` | `#E65100` | Alerts (e.g., "CANCELED" notices) |

> **Gradient rule:** Solid fills only. A single, subtle `box-shadow` may replace gradients for depth cues on cards.

### 4.2 Typography

| Role | Font | Size | Weight |
|------|------|------|--------|
| **Display / Hero** | `'Roboto Slab'`, serif | `clamp(1.75rem, 4vw, 2.5rem)` | 700 |
| **Section Heading (h2)** | `'Roboto Slab'`, serif | `clamp(1.25rem, 2.5vw, 1.75rem)` | 600 |
| **Sub-heading (h3)** | `'Roboto'`, sans-serif | `1.125rem` | 600 |
| **Body** | `'Roboto'`, sans-serif | `1rem` | 400 |
| **Small / Caption** | `'Roboto'`, sans-serif | `0.875rem` | 400 |
| **Monospace / Callsign** | `'Roboto Mono'`, monospace | `0.95em` | 400 |

Fonts are loaded from Google Fonts with `display=swap`. A system-font fallback stack is defined so the page remains readable before fonts load.

> **Rounded-corner rule:** `border-radius` is limited to `4px` for inputs/buttons and `6px` for cards. No pill-shaped buttons or heavily rounded containers.

### 4.3 Spacing & Layout

- Base unit: `8px` (0.5rem)
- Content max-width: `1100px`, centered
- Gutter: `1.5rem` (24px) on mobile, `2rem` (32px) on tablet+
- Grid: CSS Grid for two/three column layouts; Flexbox for navigation and card rows

### 4.4 Elevation / Depth

Cards use a clean border plus a very light box-shadow:
```css
box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08), 0 1px 2px rgba(0, 0, 0, 0.06);
```
No heavy drop shadows or layered gradients.

### 4.5 Icons

Use inline SVG icons from a small hand-curated set (no external icon library dependency). Needed icons:

- Radio tower / antenna
- Calendar
- Map pin / location
- Email
- Phone
- External link
- Menu (hamburger)
- Close (×)
- Photo
- Chevron / arrow

---

## 5. HTML Structure & Component Library

### 5.1 Document Skeleton

Every page shares a common HTML skeleton:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>[Page Title] — Fulton Amateur Radio Club (W2CXV)</title>

  <!-- SEO Meta Tags (see Section 8) -->
  <meta name="description" content="[page-specific description]">
  <meta name="keywords" content="[page-specific keywords]">
  <link rel="canonical" href="https://fultonamateurradioclub.org/[path]/"> 

  <!-- Open Graph -->
  <meta property="og:title" content="[Page Title] — Fulton Amateur Radio Club">
  <meta property="og:description" content="[description]">
  <meta property="og:url" content="https://fultonamateurradioclub.org/[path]/">
  <meta property="og:image" content="https://fultonamateurradioclub.org/media/og-default.jpg">
  <meta property="og:type" content="website">

  <!-- Schema.org JSON-LD (see Section 8) -->
  <script type="application/ld+json">{ ... }</script>

  <!-- Stylesheets -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;600&family=Roboto+Slab:wght@600;700&family=Roboto+Mono&display=swap">
  <link rel="stylesheet" href="/css/main.css">

  <!-- Favicon -->
  <link rel="icon" href="/media/farc_logo_0.png" type="image/png">
</head>
<body>
  <a class="skip-link" href="#main-content">Skip to main content</a>

  <header class="site-header" role="banner">
    <!-- Logo + primary nav -->
  </header>

  <main id="main-content">
    <!-- Page-specific content -->
  </main>

  <footer class="site-footer" role="contentinfo">
    <!-- Club info, links, social, copyright -->
  </footer>

  <script src="/js/main.js" defer></script>
</body>
</html>
```

### 5.2 Header Component

```
[ FARC Logo ] [ Club Name + Tagline ]       [ Nav links ]  [ ≡ Menu ]
```

- Logo: `<img src="/media/farc_logo_0.png" alt="Fulton Amateur Radio Club">` at 48×48px in the header.
- Navigation links: Home | About | Meetings | Events | Repeaters | Emergency | Courses | Scholarship | Links
- Mobile: Hamburger icon collapses nav into a full-width dropdown.
- Active page highlighted with a bottom border (not a background pill).
- Header is `position: sticky; top: 0` with `z-index: 100` and a solid white background (no translucent blur).

### 5.3 Navigation Structure

| Nav Label | URL | Dropdown? |
|-----------|-----|-----------|
| Home | `/` | No |
| About | `/about/` | No |
| Meetings | `/meetings/` | No |
| Events & Photos | `/events/` | Yes → Field Day, Christmas Party, Club Picnic, Open House |
| Repeaters | `/repeaters/` | No |
| Emergency Comms | `/races/` | Yes → RACES, SKYWARN |
| License & Courses | `/license-courses/` | No |
| Scholarship | `/scholarship/` | No |
| Links | `/web-links/` | No |

### 5.4 Footer Component

**Three-column layout on desktop, stacked on mobile:**

| Column 1 | Column 2 | Column 3 |
|----------|----------|----------|
| Logo + tagline + short mission statement | Quick links (same as nav) | Contact info: general email, RACES officer email, exam registrar email |

Bottom bar: Copyright notice, GitHub link, social media icons (Facebook, Twitter).

### 5.5 Reusable Components

#### Info Card
Used for meeting summaries, event previews, scholarship highlights:
```
┌─────────────────────────────────────┐
│  [Icon or thumbnail]                │
│  Card Title                         │
│  Short description text             │
│  [Date / location meta]             │
│  [ Read More → ]                    │
└─────────────────────────────────────┘
```

#### Repeater Table
A `<table>` with clean horizontal rules showing frequency, offset, PL tone, location, and power. Mobile: condensed card view via CSS.

#### Alert Banner
For time-sensitive notices (e.g., "General Class Course CANCELED", "Exam registration closes Sunday"):
```
⚠  [Alert text here]
```
Uses `--color-warning` and a left border accent instead of a colored background fill.

#### Photo Gallery Grid
CSS Grid with `auto-fill, minmax(220px, 1fr)`. Clicking a thumbnail opens a lightbox (pure CSS `<dialog>` element or minimal JS modal — no jQuery).

#### Meeting Node Page
Consistent template: date heading, body content, navigation arrows (← Previous | Next →).

#### Callsign Badge
Inline `<span class="callsign">N2GFG</span>` styled in monospace with a subtle border. Used throughout contact lists.

---

## 6. CSS Strategy

### 6.1 File Structure

```
/css/
  main.css          ← entry point: imports all partials via @import (or inlined)
  _variables.css    ← custom properties (design tokens)
  _reset.css        ← modern CSS reset (box-sizing, margin, etc.)
  _typography.css   ← heading scale, body, links
  _layout.css       ← grid helpers, container, spacing utilities
  _header.css       ← site header and navigation
  _footer.css       ← site footer
  _components.css   ← cards, tables, alerts, badges, gallery grid
  _forms.css        ← search form, contact inputs
  _pages.css        ← page-specific overrides
  _print.css        ← print styles (repeater frequencies, scholarship info)
```

> GitHub Pages serves static files, so CSS `@import` is fine (no build step needed). For performance, consider manually concatenating into a single `main.css` during a future optimization pass.

### 6.2 Responsive Breakpoints

| Name | Min-width | Usage |
|------|-----------|-------|
| `sm` | `480px` | Larger phones in landscape |
| `md` | `768px` | Tablets |
| `lg` | `1024px` | Small laptops |
| `xl` | `1280px` | Desktop and above |

Mobile-first approach: base styles are for the smallest screen; `@media (min-width: ...)` adds complexity.

### 6.3 Key Layout Patterns

**Homepage hero strip** (no full-bleed photo — uses a solid primary-color strip):
```css
.hero {
  background-color: var(--color-primary);
  color: var(--color-text-inverse);
  padding: 3rem 1.5rem;
}
```

**Two-column layout (content + sidebar):**
```css
.page-with-sidebar {
  display: grid;
  grid-template-columns: 1fr;          /* mobile: single column */
}
@media (min-width: 768px) {
  .page-with-sidebar {
    grid-template-columns: 2fr 1fr;    /* tablet+: 2/3 content, 1/3 sidebar */
    gap: 2rem;
  }
}
```

**Card grid:**
```css
.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 1.5rem;
}
```

### 6.4 Accessibility in CSS

- `focus-visible` outlines: 2px solid `var(--color-accent)` with 2px offset.
- `prefers-reduced-motion` media query wraps all transitions.
- Minimum touch target size: 44×44px for interactive elements.
- Color contrast ratios: all text on background combinations tested to ≥ 4.5:1.

---

## 7. JavaScript Functionality Plan

All JavaScript is vanilla ES6+. No libraries or frameworks. Scripts use `defer` or are placed before `</body>`.

### 7.1 `main.js` — Shared Utilities

| Function | Purpose |
|----------|---------|
| `initMobileNav()` | Toggle hamburger menu open/close; manage `aria-expanded`; trap focus in open menu |
| `initDropdowns()` | Keyboard-navigable dropdown menus for "Events & Photos" and "Emergency Comms" nav items |
| `initSkipLink()` | Ensure skip-to-content link functions correctly in all browsers |
| `initExternalLinks()` | Automatically append `target="_blank" rel="noopener noreferrer"` and a visually-hidden " (opens in new tab)" label to all links pointing to external domains |
| `highlightCurrentNav()` | Compare `window.location.pathname` to nav links and add `aria-current="page"` |

### 7.2 `redirect.js` — Client-Side URL Redirect Handler

This script runs on a single `404.html` page (a standard GitHub Pages technique for SPA-style routing):

```
GitHub Pages 404.html
  → redirect.js reads window.location.pathname / search
  → Looks up path in the redirects map (inlined from redirects.json)
  → window.location.replace(newUrl)  [preserving history is not needed for SEO redirects]
```

**Redirect map** (derived directly from `docs/redirects.json`):

```javascript
const REDIRECTS = {
  "/2024-General-Course":               "/license-courses/",
  "/W2TQF_Scholarship":                 "/scholarship/",
  "/content/about-fulton-amateur-radio-club": "/about/",
  "/content/license-courses":           "/license-courses/",
  "/content/christmas-party-2013":      "/events/christmas-party/",
  "/content/club-christmas-party-1":    "/events/christmas-party/",
  "/content/club-christmas-party-2":    "/events/christmas-party/",
  "/content/club-christmas-party-2016": "/events/christmas-party/",
  "/content/club-christmas-party":      "/events/christmas-party/",
  "/content/club-picnic-1":             "/events/club-picnic/",
  "/content/club-picnic":               "/events/club-picnic/",
  "/content/field-day-2008":            "/events/field-day/",
  "/content/field-day-2013":            "/events/field-day/",
  "/content/field-day-2016-1":          "/events/field-day/",
  "/content/field-day-2017":            "/events/field-day/",
  "/content/open-house":                "/events/open-house/",
  "/event-types/club-gatherings":       "/events/",
  "/newsletter":                        "/newsletter/",
  "/node/2":                            "/meetings/",
  "/node/174":                          "/meetings/174/",
  "/node/175":                          "/meetings/175/",
  "/node/177":                          "/meetings/177/",
  "/node/178":                          "/meetings/178/",
  "/node/179":                          "/meetings/179/",
  "/node/180":                          "/meetings/180/",
  "/node/181":                          "/meetings/181/",
  "/node/182":                          "/meetings/182/",
  "/node/183":                          "/meetings/183/",
  "/node/184":                          "/meetings/184/",
  "/node/185":                          "/meetings/185/",
  "/node/203":                          "/meetings/203/",
  "/node/204":                          "/meetings/204/",
  "/node/205":                          "/meetings/205/",
  "/node/206":                          "/meetings/206/",
  "/node/207":                          "/meetings/207/",
  "/node/208":                          "/meetings/208/",
  "/node/209":                          "/meetings/209/",
  "/node/210":                          "/meetings/210/",
  "/node/215":                          "/meetings/215/",
  "/node/216":                          "/meetings/216/",
  "/node/217":                          "/meetings/217/",
  "/node/218":                          "/meetings/218/",
  "/node/219":                          "/meetings/219/",
  "/node/224":                          "/meetings/224/",
  "/photo-gallery":                     "/events/",
  "/photo-gallery/club-events":         "/events/",
  "/photo-gallery/club-gatherings":     "/events/club-picnic/",
  "/photo-gallery/field-day":           "/events/field-day/",
  "/photo-gallery/open-house":          "/events/open-house/",
  "/photo-gallery/other":               "/events/",
  "/races":                             "/races/",
  "/repeaters":                         "/repeaters/",
  "/skywarn":                           "/skywarn/",
  "/taxonomy/term/46":                  "/archive/newsletter/",
  "/taxonomy/term/46/feed":             "/archive/newsletter/feed.xml",
  "/web-links":                         "/web-links/"
};
```

### 7.3 `gallery.js` — Photo Gallery Lightbox

- On click of any `.gallery-thumb`, opens a `<dialog>` element with the full image, alt text, and a close button.
- Supports keyboard navigation: `Escape` closes, arrow keys move between images.
- `<dialog>` natively traps focus; no custom focus-trap needed.
- Falls back gracefully if JS is disabled (thumbnails remain visible and link directly to the full image).

### 7.4 `callsign.js` — QRZ Callsign Lookup Widget

The `web-links.md` file includes a "Callsign Lookup (courtesy of QRZ.com)" widget. Implementation:
- A `<form>` with a text input and submit button.
- On submit, opens `https://www.qrz.com/lookup/[callsign]` in a new tab.
- This is a pure HTML form; the JS only prevents default form submission and opens a new tab.

### 7.5 `search.js` — Simple Client-Side Search (Optional / Phase 2)

Since GitHub Pages has no server, search will use a pre-built JSON index:
- At "build time" (manual step or GitHub Action), a script generates `search-index.json` with all page titles, URLs, and first 200 characters of content.
- A search box in the header or on a `/search/` page reads this JSON and filters client-side.

---

## 8. SEO Strategy

### 8.1 Per-Page `<title>` and `<meta name="description">`

| Page | Title | Description (≤155 chars) |
|------|-------|--------------------------|
| Home | `Fulton Amateur Radio Club (W2CXV) — Fulton, NY` | `The Fulton Amateur Radio Club meets monthly in Fulton, NY. Join us for ham radio education, emergency communications, and community events.` |
| About | `About FARC — Founded 1957 \| Fulton Amateur Radio Club` | `Learn about the Fulton Amateur Radio Club, founded in 1957. Meet our officers, charter members, and discover our 65-year community mission.` |
| License Courses | `Ham Radio License Courses & Exams — Fulton, NY` | `Free Technician and General class instruction in Oswego County, NY. Exam sessions every 4th Wednesday at 6PM. Pre-registration required.` |
| Repeaters | `FARC Repeaters (W2CXV, K2QQY) — Frequency & Net Schedule` | `Fulton Amateur Radio Club repeaters: 147.150, 146.850, and 442.350 MHz. Nets, frequencies, PL tones, and locations for Oswego County, NY.` |
| RACES | `RACES — Emergency Communications \| Fulton ARC` | `Fulton ARC's Radio Amateur Civil Emergency Service (RACES) provides volunteer communications for Oswego County emergency management.` |
| SKYWARN | `SKYWARN — Volunteer Weather Spotters \| Fulton ARC` | `Fulton ARC supports the NWS SKYWARN® program, training volunteer weather spotters for hazardous weather reporting in Central New York.` |
| Scholarship | `W2TQF Memorial Scholarship — $500 Annual Award` | `The Thomas G. Cantine Jr. W2TQF Memorial Scholarship awards $500 annually to licensed ham radio students in Oswego, Onondaga, Cayuga, or Jefferson County.` |
| Newsletter | `Newsletter — Fulton Amateur Radio Club` | `FARC club newsletter archive, announcements, and articles about amateur radio in Central New York.` |
| Web Links | `Ham Radio Web Links — Resources for Amateur Radio Operators` | `Curated collection of ham radio resources: QRZ, ARRL, FCC license search, contest calendars, digital mode tools, and study guides.` |
| Events Hub | `Events & Photo Galleries — Fulton Amateur Radio Club` | `Browse photo galleries from FARC club events including Field Day, Christmas parties, club picnics, and open houses.` |
| Meetings Archive | `Meeting Archive — Fulton Amateur Radio Club` | `Meeting notes and announcements from Fulton Amateur Radio Club monthly meetings, from 2023 to present.` |

### 8.2 Open Graph (OG) Tags

All pages include:
```html
<meta property="og:type"        content="website">
<meta property="og:site_name"   content="Fulton Amateur Radio Club">
<meta property="og:title"       content="[Page Title]">
<meta property="og:description" content="[Description]">
<meta property="og:url"         content="https://fultonamateurradioclub.org/[path]/">
<meta property="og:image"       content="https://fultonamateurradioclub.org/media/og-default.jpg">
<meta property="og:image:alt"   content="Fulton Amateur Radio Club logo">
<meta property="og:locale"      content="en_US">
```

For event and meeting pages, `og:type` becomes `article` and `article:published_time` is added.

Default OG image: the FARC logo (`farc_logo_0.png`) at 1200×630px (needs a new version created at that resolution).

### 8.3 Twitter / X Card

```html
<meta name="twitter:card"        content="summary">
<meta name="twitter:site"        content="@FultonArc">
<meta name="twitter:title"       content="[Page Title]">
<meta name="twitter:description" content="[Description]">
<meta name="twitter:image"       content="https://fultonamateurradioclub.org/media/og-default.jpg">
```

### 8.4 Canonical URLs

Every page includes:
```html
<link rel="canonical" href="https://fultonamateurradioclub.org/[path]/">
```

This prevents duplicate-content issues if the site is ever accessible via both `www` and non-`www`, or via the `github.io` subdomain.

### 8.5 Schema.org Structured Data (JSON-LD)

#### Organization (sitewide, in `<head>` of every page)

```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Fulton Amateur Radio Club",
  "alternateName": "FARC",
  "url": "https://fultonamateurradioclub.org/",
  "logo": "https://fultonamateurradioclub.org/media/farc_logo_0.png",
  "foundingDate": "1957",
  "description": "Amateur radio club serving Oswego County, NY since 1957.",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Fulton",
    "addressRegion": "NY",
    "addressCountry": "US"
  },
  "contactPoint": [
    {
      "@type": "ContactPoint",
      "email": "info@fultonamateurradioclub.org",
      "contactType": "general inquiry"
    }
  ],
  "sameAs": [
    "https://www.facebook.com/fultonamateurradioclub",
    "https://twitter.com/FultonArc"
  ]
}
```

#### Event pages — `Event` schema

```json
{
  "@context": "https://schema.org",
  "@type": "Event",
  "name": "FARC Field Day 2025",
  "startDate": "2025-06-28",
  "endDate": "2025-06-29",
  "organizer": { "@type": "Organization", "name": "Fulton Amateur Radio Club" },
  "eventStatus": "https://schema.org/EventScheduled",
  "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode"
}
```

#### Meeting notes pages — `SpecialAnnouncement` or `Article` schema

```json
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "January 2025 Meeting Notes",
  "datePublished": "2025-01-22",
  "author": { "@type": "Organization", "name": "Fulton Amateur Radio Club" },
  "publisher": {
    "@type": "Organization",
    "name": "Fulton Amateur Radio Club",
    "logo": { "@type": "ImageObject", "url": "https://fultonamateurradioclub.org/media/farc_logo_0.png" }
  }
}
```

#### Repeaters page — `RadioChannel` / `LocalBusiness` hybrid

Use the `RadioStation` schema to mark up each repeater:
```json
{
  "@context": "https://schema.org",
  "@type": "RadioStation",
  "name": "W2CXV 147.150 MHz Repeater",
  "frequency": "147.150 MHz",
  "broadcastAffiliateOf": { "@type": "Organization", "name": "Fulton Amateur Radio Club" }
}
```

#### Scholarship page — `Scholarship` schema

```json
{
  "@context": "https://schema.org",
  "@type": "EducationalOccupationalProgram",
  "name": "Thomas G. Cantine Jr. W2TQF Memorial Scholarship",
  "offers": {
    "@type": "Offer",
    "price": "500",
    "priceCurrency": "USD"
  },
  "applicationDeadline": "2025-05-30"
}
```

### 8.6 `sitemap.xml`

A hand-crafted `sitemap.xml` is placed at the repo root:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>https://fultonamateurradioclub.org/</loc><changefreq>monthly</changefreq><priority>1.0</priority></url>
  <url><loc>https://fultonamateurradioclub.org/about/</loc><changefreq>yearly</changefreq><priority>0.8</priority></url>
  <url><loc>https://fultonamateurradioclub.org/license-courses/</loc><changefreq>monthly</changefreq><priority>0.9</priority></url>
  <url><loc>https://fultonamateurradioclub.org/repeaters/</loc><changefreq>yearly</changefreq><priority>0.7</priority></url>
  <url><loc>https://fultonamateurradioclub.org/races/</loc><changefreq>yearly</changefreq><priority>0.7</priority></url>
  <url><loc>https://fultonamateurradioclub.org/skywarn/</loc><changefreq>yearly</changefreq><priority>0.7</priority></url>
  <url><loc>https://fultonamateurradioclub.org/scholarship/</loc><changefreq>yearly</changefreq><priority>0.8</priority></url>
  <url><loc>https://fultonamateurradioclub.org/newsletter/</loc><changefreq>monthly</changefreq><priority>0.6</priority></url>
  <url><loc>https://fultonamateurradioclub.org/web-links/</loc><changefreq>monthly</changefreq><priority>0.5</priority></url>
  <url><loc>https://fultonamateurradioclub.org/events/</loc><changefreq>yearly</changefreq><priority>0.7</priority></url>
  <url><loc>https://fultonamateurradioclub.org/events/field-day/</loc><changefreq>yearly</changefreq><priority>0.6</priority></url>
  <url><loc>https://fultonamateurradioclub.org/events/christmas-party/</loc><changefreq>yearly</changefreq><priority>0.5</priority></url>
  <url><loc>https://fultonamateurradioclub.org/events/club-picnic/</loc><changefreq>yearly</changefreq><priority>0.5</priority></url>
  <url><loc>https://fultonamateurradioclub.org/events/open-house/</loc><changefreq>yearly</changefreq><priority>0.5</priority></url>
  <url><loc>https://fultonamateurradioclub.org/meetings/</loc><changefreq>monthly</changefreq><priority>0.7</priority></url>
  <!-- Individual meeting pages (174, 175, 177-185, 203-210, 215-219, 224) -->
  <url><loc>https://fultonamateurradioclub.org/meetings/224/</loc><changefreq>never</changefreq><priority>0.5</priority></url>
  <!-- ... repeat for all 26 meeting nodes ... -->
</urlset>
```

### 8.7 `robots.txt`

```
User-agent: *
Allow: /

Sitemap: https://fultonamateurradioclub.org/sitemap.xml
```

### 8.8 Heading Hierarchy

- Every page has exactly **one `<h1>`** (the page title).
- Major sections use `<h2>`.
- Sub-sections use `<h3>`.
- No skipped heading levels.

---

## 9. Media Handling & Optimization

### 9.1 Source Media

`docs/media-map.json` defines 300+ image mappings from legacy Drupal paths to the local `docs/media/` directory. The repository root also contains `patch1.jpg` and four numbered `.png` files that are screenshots from the original site.

### 9.2 Recommended Optimization Steps (pre-publish)

| Step | Tool | Action |
|------|------|--------|
| **Resize** | ImageMagick / Squoosh | Resize all gallery images to max 1200px wide; thumbnails to 400px wide |
| **Convert to WebP** | `cwebp` / Squoosh | Convert all JPG/PNG gallery images to WebP, keeping originals as fallbacks |
| **Compress** | `jpegoptim` / `optipng` | Lossless or near-lossless compression on originals |
| **Create OG image** | Any graphics tool | Produce `media/og-default.jpg` at 1200×630px using club logo |
| **Create favicon set** | `realfavicongenerator.net` | Generate `favicon.ico`, `apple-touch-icon.png`, `favicon-32x32.png` from club logo |

### 9.3 HTML Implementation of Images

Use modern `<picture>` element with WebP + JPEG fallback and `loading="lazy"`:

```html
<picture>
  <source srcset="/media/field-day-2017-thumb.webp" type="image/webp">
  <img
    src="/media/field-day-2017-thumb.jpg"
    alt="Club members operating during ARRL Field Day 2017 at Scriba Volunteer Fire Department"
    width="400"
    height="300"
    loading="lazy"
    decoding="async"
  >
</picture>
```

**Always include:**
- Descriptive `alt` text (derived from existing captions in the markdown files)
- Explicit `width` and `height` to prevent Cumulative Layout Shift (CLS)
- `loading="lazy"` for images below the fold
- `loading="eager"` for above-fold (hero) images

### 9.4 Media-Map Integration

The `docs/media-map.json` maps 300+ legacy Drupal image paths to local files. During implementation, a helper script (run once, not committed) will:
1. Parse `media-map.json`.
2. For each legacy path found in the markdown content, replace it with the local `/media/[filename]` path.
3. Output updated HTML files.

This ensures no broken image references when the site goes live.

### 9.5 Image Alt Text Reference

Key images and their planned alt text:

| File | Alt Text |
|------|---------|
| `farc_logo_0.png` | `Fulton Amateur Radio Club logo` |
| `patch1.jpg` | `Fulton Amateur Radio Club embroidered patch` |
| `tom.jpg` | `Thomas G. Cantine Jr. W2TQF, namesake of the FARC memorial scholarship` |
| `10years.jpg` | `Charter members of the Fulton Amateur Radio Club at the 10th anniversary party, November 1967` |
| `Header_RACES02.jpg` | `FARC members operating emergency radio communications equipment` |
| `Kenwood-ts-430s-station.jpg` | `Kenwood TS-430S amateur radio transceiver at club station` |
| `wrn_logo191x120.png` | `NOAA Weather-Ready Nation logo` |
| `1200px-Skywarn.svg_.png` | `NWS SKYWARN volunteer weather spotter program logo` |
| `topics2008.jpg` | `Past meeting topics board from 2008` |

---

## 10. Redirect Strategy

### 10.1 Why Client-Side Redirects on GitHub Pages

GitHub Pages does not support server-side HTTP 301/302 redirects (no `.htaccess`, no `_redirects` file). The standard technique is:

1. Add a custom `404.html` page that GitHub Pages serves for any unknown URL.
2. `404.html` contains a `<script>` that reads `window.location.pathname`, looks it up in the redirect table, and calls `window.location.replace(newUrl)`.
3. This is a JavaScript redirect (not HTTP 301), so it has a small SEO cost. However, once the canonical new URLs are indexed by search engines, traffic should migrate naturally.

> **Note:** If a custom domain with Cloudflare is used in the future, proper HTTP 301 redirects can be configured at the CDN level for full SEO benefit.

### 10.2 `404.html` Template

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Redirecting… — Fulton Amateur Radio Club</title>
  <script>
    // Redirect map generated from docs/redirects.json
    (function() {
      var path = window.location.pathname.replace(/\/$/, ''); // strip trailing slash
      var search = window.location.search;
      var REDIRECTS = { /* ... full map from Section 7.2 ... */ };
      
      // Handle paginated URLs (e.g., /photo-gallery?page=3)
      var key = path + search;
      var dest = REDIRECTS[key] || REDIRECTS[path];
      
      if (dest) {
        window.location.replace(dest);
      }
      // If no redirect found, fall through to show 404 content below
    })();
  </script>
</head>
<body>
  <!-- Standard 404 page content shown only if no redirect matches -->
  <h1>Page Not Found</h1>
  <p><a href="/">Return to the Home Page</a></p>
</body>
</html>
```

### 10.3 Complete Redirect Table

Derived from `docs/redirects.json` and `docs/_organization.json`:

| Legacy Path | New Path | Notes |
|-------------|---------|-------|
| `/` | `/` | No change (already root) |
| `/2024-General-Course` | `/license-courses/` | Course page rolled into license courses |
| `/W2TQF_Scholarship` | `/scholarship/` | Shortened URL |
| `/content/about-fulton-amateur-radio-club` | `/about/` | Simplified |
| `/content/license-courses` | `/license-courses/` | Simplified |
| `/content/christmas-party-2013` | `/events/christmas-party/` | Merged into event type |
| `/content/club-christmas-party` | `/events/christmas-party/` | Merged |
| `/content/club-christmas-party-1` | `/events/christmas-party/` | Merged |
| `/content/club-christmas-party-2` | `/events/christmas-party/` | Merged |
| `/content/club-christmas-party-2016` | `/events/christmas-party/` | Merged |
| `/content/club-picnic` | `/events/club-picnic/` | Simplified |
| `/content/club-picnic-1` | `/events/club-picnic/` | Merged |
| `/content/field-day-2008` | `/events/field-day/` | Merged into event type |
| `/content/field-day-2013` | `/events/field-day/` | Merged |
| `/content/field-day-2016-1` | `/events/field-day/` | Merged |
| `/content/field-day-2017` | `/events/field-day/` | Merged |
| `/content/open-house` | `/events/open-house/` | Simplified |
| `/event-types/club-gatherings` | `/events/` | Taxonomy → hub page |
| `/newsletter` | `/newsletter/` | Added trailing slash |
| `/node/2` | `/meetings/` | Overview → index |
| `/node/174` through `/node/224` | `/meetings/[id]/` | All 26 nodes |
| `/photo-gallery` | `/events/` | Gallery → events hub |
| `/photo-gallery/club-events` | `/events/` | Merged |
| `/photo-gallery/club-gatherings` | `/events/club-picnic/` | Mapped to gatherings |
| `/photo-gallery/field-day` | `/events/field-day/` | Specific gallery |
| `/photo-gallery/open-house` | `/events/open-house/` | Specific gallery |
| `/photo-gallery/other` | `/events/` | Generic fallback |
| `/races` | `/races/` | Added trailing slash |
| `/repeaters` | `/repeaters/` | Added trailing slash |
| `/skywarn` | `/skywarn/` | Added trailing slash |
| `/taxonomy/term/46` | `/archive/newsletter/` | Newsletter archive |
| `/taxonomy/term/46/feed` | `/archive/newsletter/feed.xml` | RSS feed |
| `/taxonomy/term/17/feed` | `/archive/term/17/feed.xml` | Legacy feed |
| `/taxonomy/term/27/feed` | `/archive/term/27/feed.xml` | Legacy feed |
| `/taxonomy/term/28/feed` | `/archive/term/28/feed.xml` | Legacy feed |
| `/taxonomy/term/30/feed` | `/archive/term/30/feed.xml` | Legacy feed |
| `/taxonomy/term/31/feed` | `/archive/term/31/feed.xml` | Legacy feed |
| `/taxonomy/term/32/feed` | `/archive/term/32/feed.xml` | Legacy feed |
| `/taxonomy/term/33/feed` | `/archive/term/33/feed.xml` | Legacy feed |
| `/web-links` | `/web-links/` | Added trailing slash |

---

## 11. GitHub Pages Deployment

### 11.1 Repository Configuration

1. All site files live in the **`main` branch root** (not in a `/docs` subdirectory, to avoid path complexity on GitHub Pages).
2. Enable GitHub Pages in **Settings → Pages → Source: Deploy from branch → `main` / `(root)`**.
3. Add a `CNAME` file at the root containing `fultonamateurradioclub.org` for custom domain.
4. GitHub Pages automatically handles HTTPS via Let's Encrypt once DNS is configured.

### 11.2 DNS Configuration (for Custom Domain)

| Record Type | Host | Value |
|-------------|------|-------|
| `A` | `@` | `185.199.108.153` |
| `A` | `@` | `185.199.109.153` |
| `A` | `@` | `185.199.110.153` |
| `A` | `@` | `185.199.111.153` |
| `CNAME` | `www` | `benjaminarthurt.github.io` |

### 11.3 Required Root Files

| File | Purpose |
|------|---------|
| `index.html` | Home page |
| `CNAME` | Custom domain |
| `404.html` | Redirect handler + 404 page |
| `sitemap.xml` | Search engine sitemap |
| `robots.txt` | Crawler instructions |
| `.nojekyll` | Disables Jekyll processing (speeds up builds; prevents `_` prefix issues) |

### 11.4 Deployment Workflow

No build step is required. Changes are deployed by:
1. Committing updated HTML/CSS/JS files to `main`.
2. GitHub Pages automatically rebuilds and deploys within ~1 minute.

**Optional — GitHub Actions CI:**
A simple workflow (`.github/workflows/deploy.yml`) can be added to validate HTML (using `html-validate` or `htmlhint`) and check for broken links on every push, without changing the deployment method.

---

## 12. Implementation Phases

### Phase 1 — Foundation (Estimated: 1–2 days)
- [ ] Set up file structure (all directories, `.nojekyll`, `CNAME`, `404.html`, `robots.txt`)
- [ ] Write `css/_variables.css`, `css/_reset.css`, `css/_typography.css`
- [ ] Build shared header and footer components (HTML + CSS)
- [ ] Write `main.js` (mobile nav, external links, current page highlighting)
- [ ] Write `redirect.js` (full redirect map from `redirects.json`)
- [ ] Create `sitemap.xml`

### Phase 2 — Core Pages (Estimated: 2–3 days)
- [ ] **Home page** (`index.html`) — meeting schedule, past topics, hero strip
- [ ] **About page** (`about/index.html`) — club history, leadership roster, charter members
- [ ] **License Courses page** (`license-courses/index.html`) — exam schedule, study resources, other CNY locations
- [ ] **Repeaters page** (`repeaters/index.html`) — frequency table, net schedule
- [ ] **RACES page** (`races/index.html`) — emergency comms overview, contact
- [ ] **SKYWARN page** (`skywarn/index.html`) — weather spotter program overview
- [ ] **Scholarship page** (`scholarship/index.html`) — W2TQF memorial, eligibility, deadline
- [ ] **Web Links page** (`web-links/index.html`) — categorized links with callsign widget
- [ ] **Newsletter page** (`newsletter/index.html`) — ARISS info, archive link

### Phase 3 — Events & Gallery (Estimated: 1–2 days)
- [ ] **Events hub** (`events/index.html`) — photo gallery grid overview
- [ ] **Field Day gallery** (`events/field-day/index.html`) — 2008, 2013, 2016, 2017 photos
- [ ] **Christmas Party gallery** (`events/christmas-party/index.html`)
- [ ] **Club Picnic gallery** (`events/club-picnic/index.html`)
- [ ] **Open House gallery** (`events/open-house/index.html`)
- [ ] `gallery.js` lightbox implementation

### Phase 4 — Meetings Archive (Estimated: 1–2 days)
- [ ] **Meetings index** (`meetings/index.html`) — reverse-chronological list with excerpts
- [ ] **26 individual meeting pages** (`meetings/[id]/index.html`) — one per node file
- [ ] Navigation arrows between meeting pages

### Phase 5 — SEO & Optimization (Estimated: 1 day)
- [ ] Add all JSON-LD structured data blocks to relevant pages
- [ ] Add all Open Graph and Twitter card tags
- [ ] Optimize and convert images to WebP
- [ ] Create OG default image (1200×630px)
- [ ] Generate favicon set
- [ ] Finalize `sitemap.xml` with all meeting pages
- [ ] Test redirects via `404.html` for all 67 legacy URLs

### Phase 6 — Archive Pages (Estimated: 0.5 day)
- [ ] Newsletter archive page (`archive/newsletter/index.html`)
- [ ] Static RSS feed files for legacy taxonomy feeds

### Phase 7 — QA & Launch (Estimated: 1 day)
- [ ] Run HTML validation (`html-validate`)
- [ ] Run accessibility audit (`axe-core` or Lighthouse)
- [ ] Check all redirects manually
- [ ] Configure custom domain in GitHub Pages settings
- [ ] Configure DNS records
- [ ] Verify HTTPS certificate
- [ ] Submit `sitemap.xml` to Google Search Console

---

## 13. File-System Layout

The final repository structure after full implementation:

```
/                              ← repo root
├── index.html                 ← Home
├── 404.html                   ← Redirect handler
├── sitemap.xml
├── robots.txt
├── CNAME                      ← fultonamateurradioclub.org
├── .nojekyll
├── PLAN.md                    ← This file

├── about/
│   └── index.html

├── license-courses/
│   └── index.html

├── repeaters/
│   └── index.html

├── races/
│   └── index.html

├── skywarn/
│   └── index.html

├── scholarship/
│   └── index.html

├── newsletter/
│   └── index.html

├── web-links/
│   └── index.html

├── events/
│   ├── index.html
│   ├── field-day/
│   │   └── index.html
│   ├── christmas-party/
│   │   └── index.html
│   ├── club-picnic/
│   │   └── index.html
│   └── open-house/
│       └── index.html

├── meetings/
│   ├── index.html
│   ├── 174/index.html
│   ├── 175/index.html
│   ├── 177/index.html
│   ├── 178/index.html
│   ├── 179/index.html
│   ├── 180/index.html
│   ├── 181/index.html
│   ├── 182/index.html
│   ├── 183/index.html
│   ├── 184/index.html
│   ├── 185/index.html
│   ├── 203/index.html
│   ├── 204/index.html
│   ├── 205/index.html
│   ├── 206/index.html
│   ├── 207/index.html
│   ├── 208/index.html
│   ├── 209/index.html
│   ├── 210/index.html
│   ├── 215/index.html
│   ├── 216/index.html
│   ├── 217/index.html
│   ├── 218/index.html
│   ├── 219/index.html
│   └── 224/index.html

├── archive/
│   ├── newsletter/
│   │   ├── index.html
│   │   └── feed.xml
│   └── term/
│       ├── 17/feed.xml
│       ├── 27/feed.xml
│       ├── 28/feed.xml
│       ├── 30/feed.xml
│       ├── 31/feed.xml
│       ├── 32/feed.xml
│       └── 33/feed.xml

├── css/
│   ├── main.css
│   ├── _variables.css
│   ├── _reset.css
│   ├── _typography.css
│   ├── _layout.css
│   ├── _header.css
│   ├── _footer.css
│   ├── _components.css
│   ├── _forms.css
│   ├── _pages.css
│   └── _print.css

├── js/
│   ├── main.js
│   ├── redirect.js
│   ├── gallery.js
│   ├── callsign.js
│   └── search.js               ← Phase 2 optional

├── media/
│   ├── farc_logo_0.png         ← Club logo
│   ├── patch1.jpg              ← Club patch
│   ├── tom.jpg                 ← W2TQF scholarship founder
│   ├── 10years.jpg             ← 10th anniversary photo
│   ├── og-default.jpg          ← OG image (to be created)
│   ├── favicon.ico             ← (to be created)
│   ├── apple-touch-icon.png    ← (to be created)
│   └── [300+ existing images from docs/media/]

└── docs/                       ← Source content (read-only reference)
    ├── [all existing docs files unchanged]
```

---

*Document prepared by GitHub Copilot Coding Agent for the benjaminarthurt/FARC repository. All content sourced from the `docs/` directory. No implementation has been done; this is a planning document only.*
