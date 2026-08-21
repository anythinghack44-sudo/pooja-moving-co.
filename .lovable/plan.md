# Pooja Packers & Movers — Premium Website

A four-page, art-directed relocation site built pixel-close to the supplied reference designs: warm ivory canvas, editorial navy serif headings, restrained orange accents, and cinematic-but-calm scroll motion.

## Brand and design system

- Palette tokens: ivory `#FCFAF5`, white `#FFFFFF`, navy `#102A4C`, orange `#F28C00`, soft orange `#F8E9D2`, border `#E8DFD2`, body text `#5B6573`. No dark mode, no gradients-as-decor, no black.
- Type: editorial serif for headings (with italic orange highlight words, as in the references), clean sans for body. Eyebrow 12–14px / section heads 56–76px / editorial statements up to 90px / body 17–20px.
- Icons: thin-line navy icons in soft-orange circular chips, matching the reference chips.
- Verified business details only: phone **+91 98711 65432** (call/WhatsApp), Delhi Cantt address, 8+ years experience. No invented stats, ratings, or certifications.

## Pages

- `/` Home — 7 sections (below)
- `/services` — expanded Home Shifting, Office Relocation, Vehicle Transport, Commercial Logistics
- `/about` — brand story, care philosophy, team/trust, Delhi roots
- `/contact` — quote form + address, phone/WhatsApp, hours

Nav: Home · Services · About Us · Contact Us, with phone pill and "Get a Quote" button. Gallery and Blog are omitted. Active link gets a thin orange underline; header condenses with a translucent cream background on scroll.

## Homepage flow (no philosophy section, no repeated bottom card strips)

1. **Hero** — ~95vh. Eyebrow `SAFE • RELIABLE • RESPONSIBLE`, headline "Moving, handled with care." (orange italic `care.`), supporting copy, `Plan Your Move →` + `Call / WhatsApp`. Full-bleed right-side relocation photo with soft ivory feather into the text column. Locked four trust cards across the hero base: 8+ Years of Trust, Safe & Secure Transport, Trained Professionals, Delhi Based Service.
2. **Services** — asymmetric editorial composition: tall featured Home Shifting card (large image + 4 checkmark details) beside a stacked trio (Office Relocation wide, Vehicle Transport and Commercial Logistics side by side), each with an image panel and restrained `Learn More →`.
3. **Process** — four-stage horizontal journey with 01–04 numerals, dotted connector line and node dots, small step visual per stage. No card strip below.
4. **Care & Handling** — close-up packing photo header, then a five-panel horizontal handling sequence (image over icon + copy) revealing progressively.
5. **Delhi to Nationwide** — India map as an inline SVG with Delhi origin, animated dashed orange routes drawing outward to 8 cities, a light four-item support row and six small `Delhi → City` route chips. No SEO city directory.
6. **Trust** — photo composition (family + movers) with a floating "Your trust is our greatest reward." card, verified facts only, three human testimonial cards, and the closing line "Careful people. Clear process. Reliable movement."
7. **Get a Quote** — split layout: left reassurance (Free Quote, Quick Response, Clear Planning, Expert Support) + call/WhatsApp block; right white form card with the nine specified fields and `Get My Free Quote →`.

**Footer** — light ivory band with brand lockup, secondary name "Pooja Package Transporter", link column, address and phone, plus a slim navy strip for contact details only.

## Imagery

AI-generated warm-daylight photography in the reference style: hero truck loading, movers wrapping furniture, office relocation, vehicle carrier, warehouse logistics, close-up bubble-wrap packing, four process moments, family arrival. Truck imagery appears only where transportation is the story.

## Motion

- Lenis smooth scrolling synced with GSAP ScrollTrigger.
- SplitText-style line/word reveals for major headings only (y-offset + opacity + subtle blur, staggered).
- Image reveals via clip-path and 1.06 → 1 scale; subtle parallax on background imagery.
- Per-section entrances: hero load timeline (logo → nav → eyebrow → headline lines → copy → CTAs → masked image → trust cards), staggered service reveals, sequential process steps, progressive care panels, self-drawing map routes, staggered trust collage, gently rising form.
- Button/card/nav micro-interactions: 4–6px arrow shift, soft shadow, slight image scale, stronger border.
- `prefers-reduced-motion` collapses everything to simple fades.

## Mobile

Purposely re-composed, not stacked: single-column hero with cropped image and 2×2 trust grid, drawer nav, vertical service stack with full-width imagery, vertical process timeline, swipeable care and testimonial rails, simplified map with route chips, single-column form.

## Technical notes

- TanStack Start routes: rewrite `src/routes/index.tsx`, add `services.tsx`, `about.tsx`, `contact.tsx`; each with its own `head()` metadata (unique title, description, og/twitter tags).
- Tokens defined in `src/styles.css` under `:root` + `@theme inline` in oklch; fonts loaded via `<link>` in `__root.tsx`. No hardcoded color utilities in components.
- Add `gsap` and `lenis`; shared `useSmoothScroll` and reveal hooks, motion disabled under reduced-motion.
- Sections built as components under `src/components/home/`, shared UI (Header, Footer, Button, SectionEyebrow, QuoteForm) under `src/components/`.
- Quote form validated with zod, client-side only for now (no backend); submitting shows a success state and offers the WhatsApp/call fallback. Wiring submissions to email or a database can be added later with Lovable Cloud.
- Images generated into `src/assets/`, lazy-loaded below the fold with sized containers.
