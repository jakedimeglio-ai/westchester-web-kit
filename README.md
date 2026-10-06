# Westchester Web Design Kit v2 (Oct 2026)

Website templates, section libraries and helper scripts, all pulled from GitHub/npm. Every file is licensed **MIT or ISC** (except GSAP, whose free Standard License also covers client sites), which means it is free for client work and needs no visible credit. Keep the `LICENSES/` folder in the repo; nothing has to appear on the client's site.

What changed from the originals:

- **Contact forms rewired to Web3Forms (your house standard).** The originals used Start Bootstrap's paid form service and didn't work out of the box. All 7 forms were tested with mocked submissions: empty forms are blocked, and filled forms send every field and show a success message.
- **Every HyperUI section opens standalone.** Each file loads Tailwind from a CDN, so there's no build step.
- **Every CDN link is allowed in claude.ai published previews.**

## 1. Full templates (`templates/`)

Pick by client type. These are starting skeletons only: the design gets customized every time.

| Folder | Best for | Based on |
|---|---|---|
| `bootstrap/cafe-restaurant-shop` | Cafes, bakeries, delis, ice cream, boutiques (pages: home, about, products, store/hours) | Start Bootstrap Business Casual |
| `bootstrap/contractor-trades` | Landscaping, roofing, HVAC, fab shops (services, project grid, timeline, team, contact) | Start Bootstrap Agency |
| `bootstrap/creative-services` | Salons, detailers, photographers, events (big hero, photo gallery with lightbox) | Start Bootstrap Creative |
| `bootstrap/simple-one-pager` | Fastest build: mechanics, cleaners, tutors | Start Bootstrap Small Business |
| `bootstrap/multipage-business` | Bigger clients: home, about, contact, pricing, FAQ, blog, portfolio | Start Bootstrap Modern Business |
| `bootstrap/promo-landing` | Specials, grand openings, the free homepage concept pitch | Start Bootstrap Landing Page |
| `bootstrap/bold-dark-onepage` | Bars, gyms, tattoo, nightlife | Start Bootstrap Grayscale |
| `bootstrap/personal-portfolio` | Realtors, trainers, consultants, artists | Start Bootstrap Freelancer |
| `tailwind/landing-page` | Clean Tailwind landing page | Tailwind Toolbox |
| `tailwind/hyperui-portfolio`, `hyperui-saas-landing`, `hyperui-storefront` | Modern Tailwind layouts (the storefront suits retail) | HyperUI |

## 2. Section library (`sections/`): 241 Tailwind blocks from HyperUI

Copy any block into a page. Most come in a light and a `-dark` version.

**Marketing blocks:**

- content-blocks (hero / feature)
- headers
- ctas
- feature-grids
- pricing
- testimonials
- faqs
- team-sections
- stats
- logo-clouds
- contact-forms
- newsletter-signup
- banners
- announcements
- blog-cards
- cards
- buttons
- footers (12 styles)

**Interactive UI blocks:**

- ui-accordions
- ui-modals
- ui-tabs
- ui-toggles
- ui-steps
- ui-timelines
- ui-stats
- ui-media
- ui-dividers
- ui-badges

To browse them visually, go to hyperui.dev. The same blocks live there under the same names.

## 3. Snippets (`snippets/`)

| File | What it is |
|---|---|
| `house-starter.html` | Blank Tailwind page with the house standards: reveal footer (auto-falls back when taller than the phone screen), Web3Forms form that submits in place, tap-to-call header. Tested at iPhone size. |
| `local-seo-head.html` | Paste into every site's `<head>`: Google title/description, text-message link preview card, icons, and **LocalBusiness schema** (address, hours, phone, towns served) for Maps and local search. |
| `sitemap.xml`, `robots.txt` | Fill in the domain, upload to the site root, submit the sitemap in Google Search Console. |
| `local-extras.html` | Five drop-ins for local businesses: **open-now badge** (always New York time, tested at edge cases), **Call / Text / Directions bar** on phones, **"Leave a Google review"** button, free **map embed**, **before/after photo slider**. |
| `premium-motion.html` | Upsell-tier "wild" site starter: letter-by-letter headline reveal, smooth scrolling, parallax glow, count-up stats, pinned sideways-scrolling services. Calms down automatically for visitors with Reduce Motion on. |

## 4. Helper scripts (`vendor/`, local copies; CDN links work too)

| File | Use |
|---|---|
| `tailwind-browser-4.js` | Tailwind v4 with no build step |
| `alpine-3.min.js` | Menus, toggles, tabs with no custom JS |
| `aos-2.3.4.js` + `.css` | Simple fade/slide-in on scroll (`data-aos="fade-up"`) |
| `gsap-3.15.0.min.js` + `ScrollTrigger` + `SplitText` | Pro-level scroll animation for premium sites (free for client work; see LICENSES note) |
| `lenis-1.3.26.min.js` + `.css` | Buttery smooth scrolling (pairs with GSAP) |
| `img-comparison-slider-8.0.7.js` + `.css` | Drag-to-compare before/after photos |
| `glightbox-3.min.js` + `.css` | Tap-to-enlarge photo galleries |
| `swiper-bundle.min.js` + `.css` | Swipeable sliders (reviews, menus) |
| `lucide.min.js` | 1,500+ icons (`<i data-lucide="phone"></i>`) |

## Before a template goes live

1. **Fill in the SEO head.** Complete `local-seo-head.html` (schema, link-preview image) and upload `sitemap.xml` and `robots.txt`.
2. **Paste the client's Web3Forms access key.** Every form has `YOUR_WEB3FORMS_ACCESS_KEY`; the keys are free at web3forms.com.
3. **Replace all photos with the client's own.** The template photos and placeholder images are demo stock.
4. **Inline images for claude.ai previews.** Published preview pages block remote images, so images must be embedded there. On Cloudflare they work normally.

## Not included, on purpose

- **HTML5 UP templates.** Their license requires a visible credit on the client's site.
- **Preline UI.** It has an extra "fair use" license with restrictions.
- **Any GPL code.** It could force client sites to be open-sourced.
- **Flowbite and DaisyUI.** Skipped to keep one consistent component system (Tailwind + HyperUI).
