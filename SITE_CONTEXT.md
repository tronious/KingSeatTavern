# KingSeatTavern — Current Site Context (Baseline)

Date captured: 2026-02-15

This document summarizes what the live site does today (information architecture, content blocks, and interactive capabilities) so we can rebuild incrementally with full control.

## High-level

- **Primary purpose**: marketing/info site for a local tavern + promotion of a **mobile bar rental** offering.
- **Platform signal**: footer shows “Powered by GoDaddy Website Builder”.
- **Primary CTAs**: call the business phone number, contact via form, subscribe via email, get directions.

## Known public URLs (from sitemap)

The sitemap index points to `sitemap.website.xml`, which includes at least:

- `/` (home)
- `/contact`
- `/menu-1`
- `/calendar`

Note: earlier attempts to access `/menu` and `/events` returned “Not Found”; current published pages appear to use the paths above.

## Global header / footer elements

### Header

Observed on home:

- Prominent title/hero text (“WELCOME TO KING SEAT TAVERN!”)
- A **tap-to-call** phone CTA link (labeled “CONTACT” but links to `tel:`)

(If you want, we can capture the exact nav items by inspecting rendered DOM in a browser session, but the sitemap already gives the canonical page list.)

### Footer

- Address block and contact details:
  - Address: 4022 Route 130, Irwin, PA 15642 (also shown as “4022 RT. 130 IRWIN PA 15642”)
  - Phone: 724-392-7560 (tap-to-call)
  - Email displayed: THEKINGSEATLLC@GMAIL.COM
- Facebook link to “The King Seat Tavern” page
- Copyright notice (“Copyright © 2026 …”) and GoDaddy Website Builder attribution
- Cookie banner/consent module ("THIS WEBSITE USES COOKIES" + “ACCEPT”)

## Home page content blocks (observed)

1. **Hero / intro**
   - Tagline: “Your go-to destination for food, fun and entertainment”

2. **Mobile Bar promotional block**
   - Marketing copy describing mobile bar service for events
   - Bulleted service highlights (custom drink service, professional setup, portable bar)
   - CTA: “Call for pricing and availability” (phone number)

3. **Sports / viewing promo**
   - “Come watch all your favorite games on our 120" screen”
   - Mentions backroom available for private parties; CTA to call

4. **Photo gallery**
   - A grid of images and a “Show More” control (implies progressive reveal / gallery expansion)

5. **Contact section (also appears on home)**
   - “DROP US A LINE!” form with Name + Email and ability to attach files
   - reCAPTCHA protection text present

6. **Hours block**
   - Displays hours for each day of week (Mon–Sun)

7. **Subscribe section**
   - Email signup (“Sign up to hear from us about specials, sales, and events.”)

## Contact page capabilities (observed)

- **Contact form**
  - Fields: Name, Email (required)
  - Submit button: SEND
  - Spam protection: reCAPTCHA notice (“This site is protected by reCAPTCHA…”) — likely an embedded GoDaddy form that uses Google reCAPTCHA
- **Map / directions**
  - Embedded Google Maps widget
  - “GET DIRECTIONS” link
  - Link labeled “Open this area in Google Maps”
- **Hours**
  - Mon–Sun hours listed (note: Fri/Sat appear as 02:30 am on contact page; home showed 02:00 am — we should decide which is authoritative during rebuild)
- **Social**
  - Facebook link

## Menu page capabilities (observed at `/menu-1`)

### Structure / information architecture

- Single long-scroll page titled “Menu”.
- Menu is organized into category sections (at least):
   - Appetizers
   - Soup & Salad
   - Traditional Pies
   - Special Pies
   - Sandwiches, Wraps & Hoagies
   - Burgers
   - Jumbo Wings
   - For the Kids

### Item presentation

- Each menu item is presented as:
   - Item name (headline)
   - Price (sometimes a single price; sometimes multiple sizes/prices)
   - Optional short description
- Common patterns:
   - “Served with …” notes (e.g., side included)
   - Upgrade pricing (e.g., swap sides / add-ons)
   - Options/variants (e.g., wrap vs hoagie, grilled vs crispy, sauce choices)
   - “Market price” appears for at least one wing quantity option

### Category notes / disclaimers

- Some categories include a short note block at the top (e.g., what sides come with sandwiches/burgers and the cost to upgrade).
- Wings section includes a larger note about wing-night times and restrictions.

### UX behaviors

- Primarily static text content; no search, filters, nutrition, or item images observed in the extracted content.
- No obvious “Order Online” CTA embedded directly inside the menu page (ordering appears separate or not present on the current site).

### Content quality notes

- There are a couple of “placeholder” style strings (e.g., “Add a description…” / “Add a footnote…”) suggesting the menu content is maintained manually in the website builder and may contain leftover template text.

## What the current site does NOT appear to have (based on public scrape)

- No obvious online ordering / delivery integration
- No user accounts / login
- No public API
- No ecommerce
- No obvious reservations widget

(These could still exist behind external links; we’ll confirm by manually clicking through if needed.)

## External dependencies / integrations (inferred from content)

- **GoDaddy Website Builder**: hosting/page composition and built-in forms
- **Google reCAPTCHA**: form protection (exact version not confirmed)
- **Google Maps**: embedded map and directions link
- **Facebook**: outbound social profile link
- **Images hosted on** `img1.wsimg.com` (GoDaddy/Website Builder asset CDN)

## Rebuild implications (useful constraints)

- **Keep business-critical info consistent**: phone, address, hours, and directions.
- **Replace GoDaddy form behavior**: your ASP.NET backend will need endpoints for:
  - Contact form submission (supporting optional file upload)
  - Mailing list subscription (or integrate with an email provider)
- **Cookie consent**: if you add analytics/tracking, ensure consent management remains.
- **Canonical URLs**: decide whether to keep `/menu-1` and `/calendar` for SEO continuity or introduce cleaner paths with redirects.

## Open questions for you (to guide incremental build)

1. Do you want to preserve the existing IA/URLs (`/menu-1`, `/calendar`) or normalize them (`/menu`, `/events`) with redirects?
2. Should “menu” and “calendar” be **editable by owner** (CMS/admin), or static content in the repo?
3. What’s the desired behavior for contact form emails (who receives them, subject format, attachments)?
4. Do you want newsletter signup stored locally (DB) or forwarded to a provider (Mailchimp/etc.)?
5. Any SEO requirements (page titles, structured data for LocalBusiness, OpenGraph images)?
