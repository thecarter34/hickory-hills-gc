# Hickory Hills GC — Pitch Preview Site

Static-site redesign preview built by JJC Tech as a redesign proposal
for **Hickory Hills Golf Course** (`golfhickoryhills.com`).

Live at: **https://hickory-hills-gc.pages.dev/**

## Structure

```
index.html                Homepage — all real-data sections stacked single-page
pages/events.html         Events calendar (sample entries, clearly labeled)
pages/leagues.html        8 weekday leagues in day-of-the-week grid
pages/membership.html     All 6 membership tiers + cart plans
pages/rates.html          Rates + tee distances + rules + downloads
pages/outings.html        Group outings + inquiry form (mailto:)
pages/junior.html         Junior programs + league schedule
pages/contact.html        Phone / email / staff / directions / map
downloads/                Scorecard PDFs (front + back)
images/                   Course photos + map
css/style.css             Quiet-luxury design system
js/main.js                Nav, mobile menu, scroll-reveal
```

## Source of Truth

Every page rebuilds content pulled from `golfhickoryhills.com`. Items
the current site doesn't publish (e.g. par/slope, tee distances,
course rules) were pulled from the printed scorecard and league
brochure PDFs.

No content is invented. Where data is unavailable, the site uses
honest placeholders (e.g. sample event cards labeled `Sample`,
conditions section links out to Facebook instead of fabricating
weather).

## Deploy

Static HTML on Cloudflare Pages. Push to `dev` branch to auto-deploy:

```bash
git push origin dev
# Page auto-builds at:  https://<deploy>.hickory-hills-gc.pages.dev
# Latest deploy URL visible in CF dashboard: Hickory Hills GC project
```

## Frontend Notes

- **CSS tokens** at top of `style.css` — `--c-cream`, `--c-green`,
  `--c-brass`, `--c-stone`, etc. Change palette once, propagates.
- **Fonts**: Cormorant Garamond (display) + Inter (body). Loaded
  from Google Fonts.
- **Icons**: Phosphor Icons (CDN). Use `<i class="ph ph-NAME"></i>`.
- **Reveal animations**: IntersectionObserver in `js/main.js`. Adds
  `is-visible` class to `.reveal` elements on enter.
- **Accessibility**:
  - All text/background pairs pass WCAG 2.1 AA (4.5:1 body, 3:1 large).
    Run the `wcag-contrast-gate` skill before deploying changes.
  - Hero overlay alpha-tuned to maintain contrast over photo sky
    pixels (#3D5E5E composited).
  - Form fields use `<label for="...">`, decoratives use ARIA-only
    classes.

## Editorial Decisions

- **No fake hours**: The current site doesn't publish hours, so the
  site says "Hours vary by season · call for today's tee sheet."
- **Sample events**: Events page uses `Sample` placeholder dates
  with explicit "date TBD each season" labels. Production replays
  these with real dates from the Facebook page or clubhouse feed.
- **Form integrations**: All forms currently post via `mailto:` to
  `info@golfhickoryhills.com`. To enable proper integrations:
  - Outings inquiry → add a `hickory-hills` site route to forms-worker
  - E-Club signup → connect to Mailchimp or Squarespace Campaigns
  - ForeUp for tee times (already live) → just link, no integration
    needed
- **E-Club signup copy** is verbatim from the current site form.

## What's NOT Here

Premium features that were intentionally left out because the data
backing them doesn't exist yet:

- Hole-by-hole descriptions (18 of them — would need source material)
- Virtual 360° tour (no source imagery)
- Google Reviews badge (no Google Place ID on file)
- Live course conditions widget (no API integration)
- Real tee times within site (ForeUp handles this externally)

To add any of these, hand the data to whoever's building.

## History

- **Jul 4 2026** — Initial pitch preview built and deployed.
  Designed by quiet-luxury pattern with brass accent, sourced from
  existing Squarespace site + printed scorecard + brochure.

— Built by `JJC Tech` (jjctech.net)
