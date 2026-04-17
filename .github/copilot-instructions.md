# Copilot Instructions

## Project overview

Static marketing/landing page for **S.O.N.G. Preschool & Daycare, Hennur, Bangalore** — no build tools, no frameworks, no package manager. Edit files directly and open `index.html` in a browser to preview.

## Architecture

Single-page site with three files:

- **`index.html`** — All markup. Sections in order: Hero → About → Programmes → Admission Form → FAQ → Gallery → Footer.
- **`styles.css`** — All styles. Design tokens are defined as CSS custom properties in `:root` at the top of the file. Responsive breakpoints: `980px` (tablet) and `760px` (mobile).
- **`script.js`** — Three self-contained features: tab switching (About section), gallery carousel, and admission form submission.

Assets are numbered sequentially in `assets/` (e.g. `1-CenterCS.png`, `2-WhyUs.png`) to reflect their order of appearance in the page.

## Key conventions

**Design tokens** — Always use CSS custom properties (e.g. `var(--blue)`, `var(--pink)`, `var(--radius-xl)`) from `:root` rather than hardcoding colour or spacing values.

**Typography** — `'Baloo 2'` (cursive) is used for headings, buttons, tab buttons, and phone links. `'Roboto'` is the body font. Applied via the selector `h1, h2, h3, .btn, .tab-button, .footer-phone, .phone-link`.

**Responsive header** — Header actions use `.desktop-only` (hidden on mobile) and `.mobile-only` (hidden on desktop), toggled purely with `display` in the `760px` media query.

**Tab system** — Tab buttons carry a `data-tab` attribute; the corresponding panel has `id="tab-{key}"`. Active state is managed by toggling the `active` class in `script.js`.

**Admission form** — Submits via `fetch` as `application/x-www-form-urlencoded` to a Google Apps Script endpoint (`SCRIPT_URL` at the top of `script.js`). UTM params (`utm_source`, `utm_medium`, `utm_campaign`) are automatically appended from the page query string. The response body is intentionally ignored — only HTTP success/failure matters.

**Phone number** — `+91 81056 57664` / `+918105657664`. Used consistently across the header, footer, WhatsApp float button, and form default message.

**Indian mobile validation** — The phone input uses `pattern="[6-9][0-9]{9}"` (10-digit numbers starting with 6–9).
