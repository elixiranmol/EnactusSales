# PAHAADI ROOTS
## UI/UX Design Brief
**Version 1.0 | Enactus IIT Roorkee**

---

## 01 — BRAND POSITIONING CONTEXT

**What this platform is:**
A heritage commerce platform connecting Uttarakhand artisans directly with premium urban consumers — eliminating middlemen, preserving endangered craft traditions, and delivering full supply-chain transparency.

**What it is not:**
Not a marketplace. Not an NGO. Not a government portal. Not Etsy. Not Amazon Karigar.

**The core emotional promise:**
> *"You are not buying a product. You are owning a piece of living cultural heritage — and directly sustaining the person who made it."*

**Target Customer (from strategy docs):**
Priya Sharma — 28yo urban marketing professional, high disposable income, digitally native, seeks verifiable authenticity. Values ethical purchasing and sustainable consumption. Would buy from Aesop, Nicobar, or Jaypore — but wants something with deeper story provenance.

**Supply Chain Differentiator (from logistics report):**
9-step verified journey: Artisan → Village Collection Point → Quality Check + Story Documentation → Branding + Eco-Packaging → Transport → Roorkee Hub → Sales Channel → Delhivery → Customer. This transparency is a design asset — not just an ops detail.

---

## 02 — VISUAL DESIGN DIRECTION

### The Aesthetic Statement

**"Himalayan Glass Museum"**

Imagine a high-altitude contemporary art museum built into a mountain — stone walls, morning mist, copper artifacts under soft overhead light, frost on glass. Objects are displayed with reverence. Silence is the texture.

Now make it a website.

The UI achieves this through the **deliberate tension** between:
- Warm earthen materials (copper, stone, wool, bamboo) → color and texture
- Cold transparency (frosted glass panels, crystalline overlays) → glassmorphism
- Empty mountain air → whitespace

This is the core aesthetic paradox that makes the design memorable: **ancient warmth expressed through contemporary cold glass.**

---

### Why Glassmorphism Works Here (When Done Right)

Standard glassmorphism fails because it feels like a tech-product UI (fintech, iOS widgets). It works for Pahaadi Roots **specifically** because:

1. Mountain glass = frost on Himalayan morning windows — culturally resonant
2. It creates the "looking through" metaphor — you see the artisan world through a transparent layer, which reinforces provenance and transparency
3. Layering glass over earthen textures creates depth that static cards cannot
4. Cultural craft patterns (Aipan geometry, bamboo weave) appear *behind* glass — making culture the foundation, modernity the surface

**Rules for glassmorphism execution:**
- Always layer over a rich texture or photography — glass over white = nothing
- `backdrop-filter: blur(12–20px)` with `background: rgba(248, 245, 238, 0.12–0.18)`
- Very fine border: `1px solid rgba(255,255,255,0.15)`
- No drop shadows that feel digital — use diffuse glow instead
- Glass panels should feel like silk or mist, not iOS settings

---

### Color System

| Token Name | Hex | Use |
|---|---|---|
| Parchment Ivory | `#F5F0E8` | Primary background, dominant surface |
| Mountain Dusk | `#1A1612` | Primary text, hero overlays, footer |
| Himalayan Stone | `#C4BAA8` | Secondary text, dividers, captions |
| Hammered Copper | `#A0622A` | Primary accent — CTAs, highlights, selected states |
| Aged Terracotta | `#7D3520` | Secondary accent — hover states, deep emphasis |
| Pale Bamboo | `#D8C59A` | Tertiary warm tone — tags, backgrounds, glass tint |
| Glass White | `rgba(255,255,255,0.12)` | Glassmorphism panel background |
| Mist Border | `rgba(255,255,255,0.15)` | Glassmorphism panel border |

**Rules:**
- Never pure `#FFFFFF` or `#000000` — always within the warm range
- Maximum 2 accent colors visible in any single viewport
- Glass panels inherit a warm ivory tint, never cool blue
- On dark sections (hero, mission), ivory text on mountain dusk backgrounds

---

### Typography System

**Display / Editorial:** `Cormorant Garamond` (Google Fonts)
- Weights: 300 Light, 400 Regular, 500 Medium
- Use: Hero headline, artisan names, collection titles, pull quotes, section headers
- Never bold. The elegance is in restraint.
- Character: Old-world literary authority. Looks like a rare book.

**Body / UI:** `DM Sans` (Google Fonts)
- Weights: 300, 400, 500
- Use: Navigation, product descriptions, labels, prices, buttons, captions, UI elements
- Character: Clean, modern, trustworthy without being cold.

**Type Scale:**
```
Display XL:  clamp(56px, 8vw, 120px) — Hero headline only
Display L:   clamp(40px, 5vw, 72px)  — Section heroes
Display M:   clamp(28px, 3.5vw, 48px)— Collection titles, artisan names
Body L:      18–20px                  — Long-form copy, mission text
Body M:      15–16px                  — Product descriptions, standard UI
Caption:     12–13px                  — Labels, metadata, coordinates
```

**Tracking (letter-spacing):**
- All-caps labels: `0.15–0.2em`
- Display type: `-0.01em` to `-0.02em` (slightly tighter)
- Body: `0` (default)

---

### Texture & Pattern System

Uttarakhand craft traditions are reinterpreted as **abstract UI textures**, never as literal decorative motifs slapped on borders.

| Craft Tradition | UI Application |
|---|---|
| Aipan Art (Kumaoni geometric ritual patterns) | Hero section background pattern — ultra low opacity (4–6%), used as SVG overlay |
| Bamboo Ringaal Weave | Section dividers — fine horizontal hatching lines |
| Tamta Copper Hammering | Texture on accent elements — subtle noise filter on copper-colored surfaces |
| Pashmina Thread Count | Fine vertical line textures on glass panels |
| Likhai Wood Carving | Footer decorative border — single thin SVG line with geometric interrupt |
| Himalayan Stone | Section background texture — grain overlay on parchment surfaces |

All textures: opacity `0.03–0.08`. If you can see it clearly, it's too strong.

---

## 03 — INFORMATION ARCHITECTURE

### Site Pages (MVP)

```
/                    Homepage
/collections         All collections index
/collections/[slug]  Collection page (e.g., /collections/copper-craft)
/products/[slug]     Individual product page
/artisans            Artisan directory
/artisans/[slug]     Individual artisan profile
/journey             Supply chain transparency page
/journal             Editorial blog index
/journal/[slug]      Individual article
/about               Mission & team
/cart                Cart
/checkout            Checkout flow
```

### Navigation Structure

**Primary Nav (minimal — 4 items max):**
`Collections` · `Artisans` · `Our Journey` · `Journal`

**Secondary (right side):**
Search icon · Cart icon · (no account for now)

**Nav behavior:**
- Transparent with ivory text on hero sections
- Transitions to `rgba(245,240,232,0.85)` frosted glass with `backdrop-filter: blur(20px)` on scroll (after 80px)
- Logo: "Pahaadi Roots" in Cormorant Garamond, small caps, copper accent on the dot or separator

---

## 04 — HOMEPAGE SECTION BREAKDOWN

---

### SECTION 1 — HERO

**Purpose:** Establish the emotional world in one breath. The user must feel the altitude.

**Layout:**
- Full viewport (100dvh)
- Full-bleed background: ideally artisan hands close-up with Himalayan landscape visible, or mountain + golden-hour light. Use a dark gradient overlay (bottom 40% fades to mountain dusk).
- Navigation: floating above, transparent

**Content:**
```
[Small all-caps label in DM Sans, copper color]
Uttarakhand · Handcrafted Heritage

[Display XL in Cormorant Garamond, ivory, left-aligned or centered]
Every Product
Has A Story.

[Body M in DM Sans, stone grey, below headline]
Handcrafted by artisan communities across the Himalayas.
Traceable. Authentic. Yours.

[Two CTAs side by side]
[Primary button — copper border, copper text, transparent bg]  Explore Collection
[Ghost button — ivory text, no fill, fine border]              Meet The Artisans
```

**Glass element:** A single frosted glass panel as the text container — very subtle, `rgba(26,22,18,0.3)` with 8px blur. Not a box — more like a soft shadow holding the text.

**Aipan pattern:** SVG geometric overlay at 5% opacity, covering the full hero. Barely visible. Adds richness to the background.

**Mobile:** Headline drops to Display L, single-column, CTAs stack.

---

### SECTION 2 — "WHAT THIS IS" — THE MISSION INTERRUPT

**Purpose:** Immediately differentiate. Before showing any products, explain what kind of place this is.

**Layout:** Full-width centered text section, parchment background, generous vertical padding (160px).

**Content:**
```
[Small all-caps label]
A Different Kind of Store

[Display L, Cormorant Garamond, centered]
We exist because
endangered crafts deserve
a future.

[Body L, DM Sans, max-width 560px, centered, stone grey]
Pahaadi Roots connects master artisans from Uttarakhand's villages 
directly with people who understand the value of what's handmade. 
No middlemen. No compromise. Every rupee earned goes further.
```

**Divider below:** Thin SVG line with a single Aipan-geometric interrupt in the center (like a manuscript chapter break).

---

### SECTION 3 — FEATURED COLLECTIONS

**Purpose:** Let the user explore the craft categories without it feeling like product browsing.

**Layout:** Asymmetric editorial. NOT a grid.

**Structure:**
- Large anchoring image (60% viewport width) on left, 2–3 stacked collection tiles on right
- Below: horizontal scroll of remaining collections (3–4 more tiles)

**Each Collection Tile:**
```
[Full-bleed photograph of the craft]

[Glassmorphism overlay at bottom — the "label"]
━━━━━━━━━━━━━━━━━━━━━━━━━
[small all-caps label, copper]    COPPER CRAFT
[Display M, Cormorant]            Tamta — The Beaten Metal
[Body M, stone grey]              Hand-hammered vessels from Almora's coppersmiths.
[Caption, DM Sans]                Est. tradition: 400+ years
[Fine arrow →]                    Explore →
━━━━━━━━━━━━━━━━━━━━━━━━━
```

**Hover state:** Glass panel gently rises (`translateY(-4px)`), border brightens slightly.

**Collections to show:**
1. Copper Craft (Tamta)
2. Himalayan Wool & Pashmina
3. Bamboo Ringaal
4. Likhai Wood Carving
5. Textile Heritage (Kumaoni/Garhwali)

---

### SECTION 4 — ARTISAN SPOTLIGHT

**Purpose:** This is the emotional core of the product. A human face behind every object.

**Layout:** Full-bleed portrait photography (artisan working, hands visible). Text overlaid with glassmorphism panel.

**Content:**
```
[Left: Large portrait photograph — fills 65% of viewport width]

[Right: Frosted glass panel — floats over the image edge]
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
[Small copper all-caps label]
ARTISAN PROFILE

[Display M, Cormorant Garamond, ivory]
Kamla Devi

[Body M, stone grey]
Almora District, Uttarakhand

[Fine separator line]

[Caption, DM Sans, stone grey]
Craft Tradition
[Body M, ivory]
Aipan — Ritual Floor Art

[Fine separator]

[Pull quote in Cormorant Italic, larger, ivory]
"My grandmother painted these patterns 
before every festival. Now I paint them 
on objects that travel to homes I'll 
never see."

[CTA, underline style, copper]
Read Kamla's Story →
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

**Below the portrait:** Small row of 3–4 artisan thumbnails as a preview carousel — clicking changes the main portrait.

---

### SECTION 5 — WHAT ELSE YOU'RE GETTING (THE "NOT JUST A PRODUCT" LAYER)

**Purpose:** Address your specific requirement — "it should have something else too beyond product and price."

This section makes the non-product value visible. Four glass-panel tiles in a 2×2 layout:

```
┌─────────────────────┐  ┌─────────────────────┐
│  [thin copper icon] │  │  [thin copper icon] │
│                     │  │                     │
│  ARTISAN PROFILE    │  │  CRAFT CERTIFICATE  │
│                     │  │                     │
│  Every product is   │  │  GI-tagged and      │
│  linked to a named  │  │  quality-verified   │
│  maker. See their   │  │  at source before   │
│  village, story,    │  │  it ships to you.   │
│  and craft lineage. │  │                     │
└─────────────────────┘  └─────────────────────┘

┌─────────────────────┐  ┌─────────────────────┐
│  [thin copper icon] │  │  [thin copper icon] │
│                     │  │                     │
│  ORIGIN MAP         │  │  IMPACT RECEIPT     │
│                     │  │                     │
│  The exact village  │  │  With every order,  │
│  your product came  │  │  see how much       │
│  from, plotted on   │  │  income reached     │
│  an Uttarakhand map.│  │  the artisan.       │
└─────────────────────┘  └─────────────────────┘
```

These four are **product page features** teased here on the homepage. Each tile is a frosted glass panel over a subtle textured background (parchment with bamboo weave pattern at 4% opacity).

---

### SECTION 6 — FEATURED PRODUCTS (3 PIECES)

**Purpose:** Show, don't sell. Three products, presented the way a gallery presents objects.

**Layout:** Three products in a staggered arrangement (not a grid — varying heights, slight rotation offset on hover).

**Each Product Presentation:**
```
[Large photograph — fills most of the card]

[Bottom label area — no glass here, just clean typography]
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
[Small all-caps copper caption]    COPPER CRAFT · ALMORA
[Display M, Cormorant Garamond]    Hand-Hammered Water Vessel
[Fine separator line]
[Two columns of metadata:]
By            Kamla Devi, Artisan
Material      Pure Copper, Grade A
Made in       Almora Village, 2024
[Price, DM Sans, copper]           ₹ 2,400
[CTA, copper underline]            Add to Collection →
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

**Hover:** Photograph very gently scales up (1.03), shadow deepens. No jarring transitions.

---

### SECTION 7 — THE JOURNEY (SUPPLY CHAIN TRANSPARENCY)

**Purpose:** This is the platform's most powerful trust-builder. Based on the actual 9-step flowchart from your logistics report.

**Layout:** Horizontal timeline on desktop, vertical on mobile. Clean and museum-like.

**Visual style:** Thin vertical line (1px copper) connecting nodes. Each node is a small circle with a thin-line craft-inspired icon inside.

**9 Steps:**
```
①  Artisan Community          Uttarakhand villages
②  Village Collection Point   Products gathered at local centers
③  Quality Check              Inspection + artisan story documented
④  Branding & Eco-Packaging   'Every Product Has a Story' tag applied
⑤  Transportation             Villages → Roorkee
⑥  Roorkee Coordination Hub   Central fulfillment & inventory
⑦  Sales Channels             Website · Instagram · Exhibitions
⑧  Courier Partner            Shipped via Delhivery
⑨  You                        Delivered anywhere in India
```

Each step has: icon, title, one-line description. On hover, the node expands into a micro-panel (glassmorphism) with slightly more detail.

**Heading for this section:**
```
[Display L, Cormorant, centered]
From their hands
to your home.

[Body M, DM Sans, centered, stone grey]
Every product takes a 9-step verified journey.
Nothing hidden. Nothing shortcut.
```

---

### SECTION 8 — IMPACT NUMBERS

**Purpose:** Credibility and social proof through numbers. Must feel editorial, not dashboard.

**Layout:** Four metrics in a horizontal row, generous spacing, thin separators between.

```
[Very large Display L, Cormorant, copper]   [Body M, DM Sans, stone grey below]
240+                                         Artisans across Uttarakhand
12                                           Craft traditions preserved  
6                                            Districts covered
100%                                         Direct-to-artisan earnings
```

**Section background:** Slightly darker parchment (`#EDE8DE`) to create visual pause.

---

### SECTION 9 — JOURNAL PREVIEW

**Purpose:** Build editorial authority. The journal makes this a cultural destination, not just a store.

**Layout:** Three editorial feature stories in a Kinfolk-style staggered layout. NOT card grids.

**Each Story:**
```
[Large editorial photograph — full bleed, no border]

[Below the image:]
[Small all-caps copper label]    CRAFT STORY · June 2025
[Display M, Cormorant]           The Last Copper Hammerers of Almora
[Fine separator]
[Body M, stone grey, 2 lines]    A 400-year tradition survives in one family's courtyard.
[Copper underline link]          Read the Story →
```

**Section heading:**
```
[Display L, Cormorant, left-aligned]
From the Journal

[Body M, DM Sans, right-aligned, acts as counterpoint]
Stories from the mountains.
```

---

### SECTION 10 — FOOTER

**Layout:** Minimal. Museum-style. Two rows.

**Row 1:** Logo left | "Rooted in Uttarakhand, Made for the World." center | Social icons right

**Row 2 (3 columns):**
- Column A: Collections (links)
- Column B: Discover (Artisans, Journal, Our Journey, About)
- Column C: Contact + "Enactus IIT Roorkee" affiliation note

**Bottom bar:** `© 2025 Pahaadi Roots` | `Handcrafted Heritage. Verified Origins.`

**Footer background:** Mountain Dusk (`#1A1612`) — creates a strong visual full-stop.

**Decorative element:** Single thin SVG Likhai-inspired carving line across the top of the footer — 1px, ivory, 15% opacity.

---

## 05 — PRODUCT PAGE UX

The product page is where the "not just a product" experience must be fully delivered.

### Structure:

**Above the fold:**
- 60% left: Large product photography (multiple angles, can scroll horizontally)
- 40% right: All key info in a clean vertical stack

**Right column content (in order):**
```
[Small copper all-caps label]     COPPER CRAFT · ALMORA
[Display M, Cormorant]            Hand-Hammered Water Vessel
[Fine separator]
[Body M]                          By Kamla Devi · Almora Village
[Copper link]                     View Artisan Profile →
[Price — DM Sans, copper, 24px]   ₹ 2,400
[Body M, stone grey]              Free shipping · Delivered in 5–7 days

[Primary CTA — full width, copper fill, ivory text]
Add to Collection

[Secondary CTA — outline]
View Origin Story
```

**Below the fold — four tabbed sections (horizontal tab bar):**

| Tab | Content |
|---|---|
| The Story | Long-form artisan narrative + craft tradition history |
| The Making | Step-by-step craft process, raw materials, techniques |
| Origin | Interactive map showing village location in Uttarakhand |
| Authenticity | Verification certificate, quality check stamp, eco-packaging detail |

---

## 06 — GLASSMORPHISM IMPLEMENTATION RULES

Since you are insisting on glassmorphism, here are the exact rules to make it feel luxury — not tech:

**DO:**
- Always place glass panels over rich photographic or textured backgrounds
- Use warm ivory tint in glass: `rgba(245, 240, 232, 0.12)`
- Keep blur between `blur(14px)` and `blur(22px)`
- Use ultra-fine borders: `1px solid rgba(255,255,255,0.12)`
- Use diffuse glow instead of box-shadow: `0 8px 32px rgba(160, 98, 42, 0.08)`
- Allow background elements to remain visible but softened — that's the entire point
- Apply to: nav on scroll, artisan profile panel, "what you're getting" tiles, collection tile overlays, journey step hover-panels

**DON'T:**
- Never glass over white or parchment backgrounds (invisible + pointless)
- Never `blur(40px+)` — too heavy, feels iOS
- Never use glass as a card replacement in ecommerce grids
- Never make glass panels rectangular with sharp corners — use `border-radius: 16px` minimum
- Never add multiple overlapping glass panels (stacking creates visual mud)

---

## 07 — MOTION & INTERACTION SYSTEM

**Philosophy:** Motion should feel like breath, not performance.

| Element | Animation |
|---|---|
| Page sections | Fade + rise on scroll: `opacity 0→1`, `translateY 20px→0`, `600ms ease-out` |
| Hero photography | Very slow zoom: `scale 1.0→1.04` over `8 seconds`, infinite loop |
| Navigation | Background fade-in on scroll: `200ms ease` |
| Product photo hover | Gentle scale: `1.0→1.025`, `400ms ease` |
| CTA buttons | Underline draw on hover: CSS `width 0→100%`, `300ms ease` |
| Artisan carousel | Crossfade between portraits: `400ms ease` |
| Journey nodes | Expand on hover: height animation with glassmorphism reveal |
| Collection tiles | `translateY -6px` on hover, glow deepens: `300ms ease` |

**Respect `prefers-reduced-motion`** — all animations disabled if set.

---

## 08 — MOBILE DESIGN PRINCIPLES

- Single column always
- Navigation: hamburger → full-screen overlay in mountain dusk with ivory links
- Hero: Display L headline (not XL), image crops to portrait orientation
- Glass panels: same rules, reduced blur to `blur(10px)` for performance
- Journey: vertical timeline (already designed for this)
- Tap targets: minimum 48px height
- Bottom spacing: 120px before footer (thumbable space)

---

## 09 — ACCESSIBILITY BASELINE

- All text on glass panels must meet AA contrast (minimum 4.5:1 — test against the blurred background, not the glass color)
- Copper accent `#A0622A` on parchment `#F5F0E8` is AA compliant ✓
- Ivory text on mountain dusk `#1A1612` is AAA compliant ✓
- Focus states: 2px copper outline, `outline-offset: 3px`
- All images: meaningful alt text
- Interactive elements: visible keyboard focus

---

## 10 — WHAT "BEYOND PRODUCT AND PRICE" LOOKS LIKE IN THE UI

Per your specific instruction, here is every element on the site that goes beyond product + price:

| Element | Where it appears |
|---|---|
| Artisan identity card (name, village, portrait, craft tradition) | Product page, product tile, artisan section |
| Craft tradition origin story | Product page Story tab, Journal, Collection page |
| Origin map (village location pinned on Uttarakhand) | Product page Origin tab |
| 9-step verified supply chain | Homepage journey section + dedicated /journey page |
| Impact receipt ("₹X of your ₹Y reached the artisan") | Post-purchase confirmation + product page |
| Authenticity certificate (quality check stamp, date, inspector) | Product page Authenticity tab |
| Eco-packaging detail (materials, recyclability) | Product page + checkout |
| Craft heritage age ("400-year tradition") | Collection tiles, product labels |
| Cultural significance note | Product page Making tab |
| Journal article tied to the craft | Product page — related reading link |

This is the 10-layer "story" experience that makes Pahaadi Roots unlike anything else in the market.

---

*Brief prepared for Enactus IIT Roorkee — Pahaadi Roots*
*Version 1.0 | UI/UX Design Phase*
