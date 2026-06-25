# PAHAADI ROOTS — HOMEPAGE UI GENERATION PROMPT
## Complete Structured Prompt v1.0

---

## PERSONA

You are a senior product designer at a studio whose past clients include Loewe, Aesop, and the Metropolitan Museum of Art Store. You have been asked to design a homepage for Pahaadi Roots — a heritage commerce platform for Uttarakhand artisans — that will be remembered in award archives. You work with the discipline of a Swiss typographer and the narrative instinct of a documentary filmmaker.

---

## WHAT THIS PLATFORM IS

Pahaadi Roots connects master artisans from Uttarakhand's mountain villages directly with premium urban buyers across India. It eliminates middlemen from a 9-step verified supply chain. Every product is traceable to a named artisan, a specific village, and a documented craft tradition.

This is NOT a marketplace. It is a cultural institution that also sells things.

The platform is built by Enactus IIT Roorkee. It operates out of a coordination hub in Roorkee, Uttarakhand.

**Core USP:** "Every Product Has A Story" — artisan identity, craft origin, and supply-chain transparency are built into every product.

**Target customer:** Priya Sharma — urban, 28yo, marketing professional, high disposable income, digitally native, seeks verifiable provenance. Shops at Aesop, Nicobar, Jaypore. Wants something with deeper roots.

---

## STRICT ANTI-PATTERNS — NEVER DO ANY OF THESE

✗ Government handicraft website aesthetic  
✗ Bright saffron, tricolor, or patriotic Indian color palette  
✗ Overcrowded homepage with many competing elements  
✗ Traditional ecommerce product grid (Flipkart / Amazon / Etsy style)  
✗ Decorative ethnic borders used as primary design element  
✗ Generic Indian cultural website feel  
✗ NGO or donation website tone  
✗ Glassmorphism panels placed over white or plain backgrounds — glass needs rich texture beneath it  
✗ Drop shadows that feel digital and harsh  
✗ More than 2 accent colors visible in any single viewport  
✗ Template-style section layouts  
✗ Helvetica Neue or Montserrat as display typeface  
✗ Pure black (#000000) or pure white (#FFFFFF) anywhere  

---

## COLOR SYSTEM

| Token | Value | Usage |
|---|---|---|
| Parchment Ivory | `#F5F0E8` | Primary background — all sections default to this |
| Mountain Dusk | `#1A1612` | Hero overlays, footer, dark section backgrounds |
| Himalayan Stone | `#C4BAA8` | Secondary text, dividers, captions, metadata |
| Hammered Copper | `#A0622A` | Primary accent — CTAs, highlights, labels, active states |
| Aged Terracotta | `#7D3520` | Secondary accent — hover states, deep emphasis only |
| Pale Bamboo | `#D8C59A` | Tertiary warm tone — tags, pill backgrounds |
| Glass Panel | `rgba(245,240,232,0.12)` | Glassmorphism panel background |
| Glass Border | `rgba(255,255,255,0.13)` | Glassmorphism panel border |
| Glass Glow | `rgba(160,98,42,0.08)` | Glassmorphism diffuse glow (not box-shadow) |

---

## TYPOGRAPHY

**Display / Editorial: Cormorant Garamond** (import from Google Fonts)  
Weights to use: 300 (Light), 400 (Regular), 500 (Medium)  
Never use Bold weight. Restraint is the elegance.  
Character: Old-world literary authority. Rare book. Himalayan manuscript.  

**Body / UI: DM Sans** (import from Google Fonts)  
Weights to use: 300, 400, 500  
Character: Clean, modern, trustworthy, not cold.  

**Type Scale:**
```
--fs-hero:       clamp(56px, 8vw, 116px)   → Hero headline only
--fs-display:    clamp(36px, 5vw, 68px)    → Section headings
--fs-title:      clamp(24px, 3vw, 42px)    → Collection titles, artisan names
--fs-body-lg:    18px                       → Long-form copy
--fs-body:       15px                       → Standard UI text
--fs-caption:    12px                       → Labels, metadata, coordinates
--fs-label:      11px                       → All-caps utility labels (0.15em tracking)
```

**All-caps labels:** DM Sans 400, `letter-spacing: 0.15em`, `font-size: var(--fs-label)`, copper color.

---

## GLASSMORPHISM SPECIFICATION

This is required throughout the design. Execute it to luxury standard, not tech-product standard.

**Rules:**
- Glass panels ALWAYS sit over rich photographic or heavily textured backgrounds — never over flat colors
- The warm ivory tint in glass is essential: `rgba(245, 240, 232, 0.12–0.18)` 
- Blur: `backdrop-filter: blur(14px)` to `blur(20px)` — never higher
- Border: `1px solid rgba(255,255,255,0.13)` — ultra-fine
- Glow: `box-shadow: 0 8px 40px rgba(160, 98, 42, 0.10)` — warm, diffuse
- Border radius: minimum `16px`, prefer `20–24px`
- Glass represents: mountain frost, Himalayan morning windows, looking through to the artisan world beyond

**Where to use glass:**
1. Navigation bar on scroll (transparent → glass with warm tint)
2. Collection tile label overlays (bottom 35% of each tile)
3. Artisan story panel (floats over portrait photography)
4. "Beyond the product" feature tiles
5. Journey step hover expansions
6. Hero text container (very subtle — `rgba(26,22,18,0.25)` — darker glass for readability)

---

## TEXTURE & PATTERN SYSTEM

Uttarakhand craft traditions are reinterpreted as abstract UI textures only — not literal decorative motifs.

```
Aipan Art (Kumaoni ritual geometry) → SVG background pattern, hero section, 4% opacity
Bamboo Ringaal Weave → Section dividers, horizontal hatching line
Tamta Copper Hammering → Noise filter on copper accent surfaces
Himalayan Stone → Grain texture overlay on parchment backgrounds
Likhai Wood Carving → Footer decorative SVG border interrupt
```

All textures: `opacity: 0.03–0.07`. Felt, not seen.

**Aipan SVG pattern (hero):** Geometric interlocking squares and triangular forms in a grid — referenced from Kumaoni ritual floor art. Render as white-on-transparent SVG, used as `background-image`.

---

## HOMEPAGE — COMPLETE SECTION SPECIFICATIONS

---

### SECTION 1 — HERO

**Height:** `100dvh`  
**Background:** Full-bleed photograph. Placeholder: deep Himalayan mountain landscape with warm golden light. OR artisan hands close-up with mountains soft-focused behind.  
**Overlay:** `linear-gradient(to bottom, rgba(26,22,18,0.15) 0%, rgba(26,22,18,0.55) 100%)`  
**Aipan pattern SVG:** absolute positioned, covers full hero, `opacity: 0.05`, `z-index: 1`  

**Navigation (absolute top):**
```
[Logo: "Pahaadi Roots" — Cormorant Garamond 400, ivory, 18px, tracking 0.05em]
[Nav items: Collections · Artisans · Our Journey · Journal — DM Sans 400, ivory, 14px]
[Right: Search icon · Cart icon — thin line icons, ivory]
Background: transparent
```

**Main content (centered, z-index 3):**
```
[Small all-caps label — DM Sans, copper, 11px, 0.15em tracking]
Uttarakhand · Handcrafted Heritage

[Hero headline — Cormorant Garamond 300, ivory]
var(--fs-hero)
Two lines:
"Every Product
Has A Story."

[Subheadline — DM Sans 300, rgba(255,255,255,0.70), 16px, max-width 440px]
"Handcrafted by artisan communities across the Himalayas.
Traceable. Authentic. Yours."

[Two CTA buttons, horizontal, gap 16px]
Primary: border 1.5px copper, text copper, background transparent, padding 14px 32px
Ghost: border 1px rgba(255,255,255,0.4), text ivory, background transparent
Button font: DM Sans 400, 14px, 0.05em tracking
```

**Hero text container:** Glassmorphism panel, `rgba(26,22,18,0.28)`, `blur(10px)`, `border-radius: 20px`, padding 48px — holds the label + headline + sub + CTAs.

**Scroll indicator:** Thin line + small downward chevron in ivory, bottom center, gentle pulse animation.

---

### SECTION 2 — MISSION INTERRUPT

**Background:** Parchment Ivory `#F5F0E8`  
**Padding:** `160px 0`  
**Max-width:** `720px`, centered  

```
[All-caps label, copper]
A Different Kind of Store

[Display heading — Cormorant Garamond 300, Mountain Dusk, centered]
"We exist because
endangered crafts deserve
a future."

[Body copy — DM Sans 300, Himalayan Stone, 17px, line-height 1.8, centered]
Pahaadi Roots connects master artisans from Uttarakhand's villages 
directly with people who understand the value of what's made by hand. 
No middlemen. No shortcuts. Every rupee earned travels to the source.

[Section divider below: SVG line — 1px Mountain Dusk, 30% opacity, full width — with 
single small Aipan geometric motif centered on the line as an interrupt]
```

---

### SECTION 3 — COLLECTIONS

**Background:** Parchment Ivory  
**Layout:** Asymmetric editorial — large anchor image left, stacked tiles right, then horizontal scroll below  

**Heading (above the layout):**
```
[Two-column heading layout:]
Left: [Display — Cormorant 300, Mountain Dusk]
      "Crafted by
       tradition."

Right: [Body — DM Sans 300, Himalayan Stone, 15px, aligned bottom]
       "Five heritage craft traditions.
        Each with centuries of story."
```

**Large anchor image (left, ~58% width, full height of right column):**
- Full-bleed photograph of copper craft or wool weaving
- Bottom overlay: glassmorphism panel

**Right column (stacked 2 tiles, each ~50% of left image height):**
- Same structure as main tile below

**Each Collection Tile:**
```
[Photograph fills tile]

[Glassmorphism label panel — bottom 38% of tile]
[opacity: rgba(245,240,232,0.14), blur(16px), border-top: 1px solid rgba(255,255,255,0.13)]

  [All-caps copper label, 10px]       COPPER CRAFT · ALMORA
  [Title — Cormorant 300, ivory, 22px] Tamta — The Beaten Metal  
  [Caption — DM Sans 300, stone, 13px] Hand-hammered vessels from Almora's coppersmiths.
  [Metadata — DM Sans 300, stone, 11px] Est. tradition: 400+ years
  [Copper link — DM Sans 400, copper, underline]  Explore →
```

**Hover:** `translateY(-5px)`, glass border brightens to `rgba(255,255,255,0.22)`, `transition: 300ms ease`

**Five collections:**
1. Copper Craft (Tamta) — Almora
2. Himalayan Wool & Pashmina — Chamoli
3. Bamboo Ringaal — Pauri Garhwal
4. Likhai Wood Carving — Tehri
5. Textile Heritage — Pithoragarh

---

### SECTION 4 — ARTISAN STORY (HERO FEATURE)

**Background:** Mountain Dusk `#1A1612` (dark section)  
**Padding:** `0` (full-bleed)  
**Height:** `90vh`  

```
[Full-bleed portrait photograph — artisan at work — covers 65% of viewport width from left edge]

[Right side: glassmorphism panel floats, 38% viewport width, vertically centered]
[rgba(245,240,232,0.10), blur(18px), border: 1px solid rgba(255,255,255,0.12), border-radius: 24px]
[padding: 48px 40px]

Content inside panel:
  [All-caps copper label]
  ARTISAN PROFILE

  [Display — Cormorant 400, ivory, 36px]
  Kamla Devi

  [Body — DM Sans 300, stone grey, 13px, 0.1em tracking]
  Almora District · Uttarakhand

  [1px ivory divider, 20% opacity, margin: 24px 0]

  [Caption label copper]  Craft Tradition
  [Body ivory]            Aipan — Kumaoni Ritual Floor Art

  [1px divider]

  [Pull quote — Cormorant Italic 300, ivory, 18px, line-height 1.7]
  "My grandmother painted these patterns
  before every festival. Now I paint them
  on objects that travel to homes I'll
  never see."

  [1px divider]

  [Two metadata pairs:]
  [Caption stone]  Village          [Caption stone]  Active since
  [Body ivory]     Syalde, Almora   [Body ivory]     1987

  [CTA — copper underline, DM Sans 400, 13px, 0.1em tracking]
  Read Kamla's Story →

[Bottom of section: horizontal strip of 4 artisan thumbnail circles]
[Clicking a thumbnail crossfades the main portrait — 400ms ease]
```

---

### SECTION 5 — "BEYOND THE PRODUCT" TILES

**Purpose:** Show the 4 non-product values the buyer gets. This makes Pahaadi Roots unique.  
**Background:** Subtle texture — parchment with Himalayan stone grain at 4% opacity  
**Padding:** `120px 80px`  

**Section heading:**
```
[Display — Cormorant 300, Mountain Dusk]
"You're not just
 buying an object."

[Body — DM Sans 300, Himalayan Stone]
"Every Pahaadi Roots product comes with four things
no other store offers."
```

**Four glass tiles in 2×2 grid:**
```
┌──────────────────────────────────┐  ┌──────────────────────────────────┐
│ [Glass panel: rgba(245,240,232,  │  │ [Glass panel]                    │
│  0.15), blur(14px), radius 20px] │  │                                  │
│                                  │  │                                  │
│ [Thin copper icon — person/face] │  │ [Thin copper icon — certificate] │
│                                  │  │                                  │
│ [Title: Cormorant 400, 20px]     │  │ [Title: Cormorant 400, 20px]     │
│ Artisan Identity                 │  │ Craft Certificate                │
│                                  │  │                                  │
│ [Body: DM Sans 300, 14px, stone] │  │ [Body: DM Sans 300, 14px, stone] │
│ Every product links to a named   │  │ Quality-verified at source.      │
│ artisan, their village, craft    │  │ Each piece earns a documentation │
│ lineage, and their own story.    │  │ stamp before it leaves the hills.│
└──────────────────────────────────┘  └──────────────────────────────────┘

┌──────────────────────────────────┐  ┌──────────────────────────────────┐
│ [Glass panel]                    │  │ [Glass panel]                    │
│                                  │  │                                  │
│ [Thin copper icon — map pin]     │  │ [Thin copper icon — coin/rupee]  │
│                                  │  │                                  │
│ Origin Map                       │  │ Impact Receipt                   │
│                                  │  │                                  │
│ The exact Uttarakhand village    │  │ See how much of your payment     │
│ your product came from,          │  │ reached the artisan directly.    │
│ mapped and named.                │  │ Transparency, down to the rupee. │
└──────────────────────────────────┘  └──────────────────────────────────┘
```

**Tile hover:** `translateY(-4px)`, glass border brightens, `300ms ease`  
**Background of tiles:** Each sits over a subtle craft texture (bamboo weave pattern) at 5% opacity

---

### SECTION 6 — THREE FEATURED PRODUCTS

**Background:** Parchment Ivory  
**Layout:** Three products staggered — not a grid. Left product slightly higher, right product slightly lower, center at mid-height.  

**Section heading:**
```
[Left-aligned]
[All-caps copper label]  From the Collection
[Display — Cormorant 300, Mountain Dusk]
"Three objects.
 Three stories."
```

**Each product:**
```
[Photograph — fills card, aspect ratio 3:4 portrait, no border]
[On hover: scale 1.025, 400ms ease]

[Below photograph:]
[All-caps copper caption — 10px, 0.15em tracking]
COPPER CRAFT · ALMORA

[Title — Cormorant 300, Mountain Dusk, 22px]
Hand-Hammered Water Vessel

[Fine 1px line — Himalayan Stone, 15% opacity]

[Two-column metadata — DM Sans 300, 12px]
By          Kamla Devi, Artisan
Material    Pure Copper, Grade A
Made in     Almora, Uttarakhand
Year        2024

[Fine line]

[Price — DM Sans 500, copper, 18px]  ₹ 2,400

[CTA — underline draw on hover, copper, DM Sans 400, 13px]
Add to Collection →
```

**Three placeholder products:**
1. Hand-Hammered Copper Water Vessel — ₹ 2,400 — Copper Craft · Almora
2. Pashmina Handwoven Wrap — ₹ 4,800 — Himalayan Wool · Chamoli  
3. Ringaal Bamboo Storage Basket — ₹ 1,200 — Bamboo Craft · Pauri

---

### SECTION 7 — THE JOURNEY (SUPPLY CHAIN)

**Background:** Mountain Dusk `#1A1612` (dark section for contrast and gravity)  
**Padding:** `140px 80px`  

**Heading:**
```
[Display — Cormorant 300, ivory, centered]
"From their hands
 to your home."

[Body — DM Sans 300, stone grey, centered, max-width 480px]
Every product travels a 9-step verified journey.
Nothing hidden. Nothing shortcut.
```

**Journey timeline — horizontal on desktop, vertical on mobile:**

Central axis: `1px solid rgba(160,98,42,0.35)` horizontal line  

**Nine nodes:**
```
Each node:
  [Thin circle — 40px diameter, 1px copper border, mountain dusk fill]
  [Inside: thin-line craft icon — 20px, copper]
  [Below circle: Step number in copper, DM Sans 300, 10px]
  [Title: DM Sans 500, ivory, 13px, centered]
  [Caption: DM Sans 300, stone, 12px, centered, max-width 80px]

Steps:
① Artisan Community          Uttarakhand villages
② Village Collection         Products gathered locally  
③ Quality Check              Inspection + story recorded
④ Branding & Eco-Pack        'Every Product Has a Story' tag
⑤ Transportation             Villages → Roorkee
⑥ Roorkee Hub                Central fulfillment
⑦ Sales Channels             Website · Instagram · Exhibitions
⑧ Courier Partner            Shipped via Delhivery
⑨ You                        Delivered across India
```

**Node hover:** Glassmorphism micro-panel expands below the node, `rgba(245,240,232,0.10)`, `blur(12px)`, shows one additional line of detail. `300ms ease height animation`.

**Final node (You):** Slightly larger circle, copper fill, ivory icon — visually anchors the chain.

---

### SECTION 8 — IMPACT METRICS

**Background:** `#EDE8DE` (slightly deeper parchment — visual rest)  
**Padding:** `100px 80px`  
**Layout:** Four metrics in horizontal row with thin 1px stone-grey separators  

```
[Heading above — left aligned]
[All-caps copper label]  The Impact

[Four metrics:]
┌────────────────┬────────────────┬────────────────┬────────────────┐
│  240+          │  12            │  6             │  100%          │
│  [Cormorant    │  [same]        │  [same]        │  [same]        │
│   300, copper, │                │                │                │
│   72px]        │                │                │                │
│                │                │                │                │
│  Artisans      │  Craft         │  Districts     │  Direct-to-    │
│  across        │  traditions    │  of            │  artisan       │
│  Uttarakhand   │  preserved     │  Uttarakhand   │  income        │
│  [DM Sans 300, │  [same]        │  [same]        │  [same]        │
│   stone, 13px] │                │                │                │
└────────────────┴────────────────┴────────────────┴────────────────┘
```

**Numbers:** Cormorant Garamond 300, `#A0622A` copper, 68–72px  
**Labels:** DM Sans 300, Himalayan Stone, 12px, 2-line max

---

### SECTION 9 — JOURNAL PREVIEW

**Background:** Parchment Ivory  
**Padding:** `120px 80px`  

**Heading (two-column balance):**
```
[Left — Display, Cormorant 300, Mountain Dusk]
"From the
 Journal"

[Right — Body, DM Sans 300, stone grey, bottom-aligned, italic]
"Stories from the mountains."
```

**Three editorial story previews — staggered heights:**
```
Each story:
[Large photograph — full bleed, aspect ratio ~16:9 or 3:2]
No border. No card.

[Below photo:]
[All-caps copper label — 10px]  CRAFT STORY · JUNE 2025
[Title — Cormorant 300, Mountain Dusk, 22px, max-width 340px]
"The Last Copper Hammerers of Almora"
[Fine 1px separator]
[Body — DM Sans 300, stone grey, 14px, 2 lines max]
"A 400-year tradition survives in one family's courtyard in the high Kumaon hills."
[CTA copper underline]  Read the Story →
```

**Three placeholder articles:**
1. "The Last Copper Hammerers of Almora" — Craft Story
2. "Weaving the Himalayas: Pashmina's Quiet Survival" — Artisan Interview
3. "Why We Built Pahaadi Roots" — Founder's Note

---

### SECTION 10 — FOOTER

**Background:** Mountain Dusk `#1A1612`  
**Padding:** `80px 80px 48px`  

**Top decorative element:** Single SVG line — `1px, rgba(255,255,255,0.12)`, full width, with small Likhai wood-carving motif interrupt at center.

**Row 1:**
```
[Left: Logo — "Pahaadi Roots" Cormorant 400, ivory, 20px]
[Center: Tagline — "Rooted in Uttarakhand. Made for the World." DM Sans 300, stone, 13px]
[Right: Social icons — Instagram · LinkedIn — thin line icons, stone]
```

**Row 2 (three-column links):**
```
Collections               Discover                  Contact
──────────                ──────────                ──────────
Copper Craft              Our Artisans              hello@pahaadiRoots.in
Himalayan Wool            The Journey               Roorkee, Uttarakhand
Bamboo Ringaal            Journal                   
Wood Carving              About Us                  An Enactus IIT Roorkee
Textile Heritage          FAQ                       Initiative

[All: DM Sans 300, stone grey, 13px, line-height 2.2]
[Hover: ivory, transition 200ms]
```

**Bottom bar:**
```
[Left: © 2025 Pahaadi Roots — DM Sans 300, stone, 11px]
[Right: "Handcrafted Heritage. Verified Origins." — DM Sans 300, stone, 11px]
```

---

## NAVIGATION SCROLL BEHAVIOR

```css
/* Default: transparent */
.nav {
  background: transparent;
  transition: background 200ms ease, backdrop-filter 200ms ease;
}

/* After 80px scroll: glassmorphism */
.nav.scrolled {
  background: rgba(245, 240, 232, 0.82);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-bottom: 1px solid rgba(255,255,255,0.12);
}

/* On dark sections (hero, journey, footer): ivory text */
/* On light sections: mountain dusk text */
```

---

## ANIMATION SPECIFICATION

```
Page load: No flash. Fade in entire page: opacity 0→1, 400ms.

Scroll-triggered reveals (all sections):
  opacity: 0 → 1
  transform: translateY(20px) → translateY(0)
  duration: 600ms
  easing: cubic-bezier(0.25, 0.46, 0.45, 0.94)
  stagger between sibling elements: 80ms

Hero photograph:
  transform: scale(1.0) → scale(1.04)
  duration: 8000ms
  easing: linear
  iteration: infinite, alternate

CTA button hover:
  Underline draws left to right
  CSS: ::after pseudo with width 0→100%, 300ms ease
  Color: copper

Collection tile hover:
  transform: translateY(-5px)
  Glass border: opacity increases
  Duration: 300ms ease

Product card hover:
  transform: scale(1.025)
  duration: 400ms ease

Journey node hover:
  Panel expands below
  height: 0 → auto (with max-height animation)
  opacity: 0 → 1
  duration: 300ms ease

Artisan portrait switch:
  opacity: 0 → 1
  duration: 400ms ease
  (crossfade — old portrait fades out simultaneously)

prefers-reduced-motion: all animations disabled. Static states only.
```

---

## HTML / CSS ARCHITECTURE NOTES

```
Fonts: Import Cormorant Garamond (weights 300, 400, 500) 
       and DM Sans (weights 300, 400, 500) from Google Fonts.

Root CSS variables:
  --color-ivory: #F5F0E8
  --color-dusk: #1A1612
  --color-stone: #C4BAA8
  --color-copper: #A0622A
  --color-terracotta: #7D3520
  --color-bamboo: #D8C59A
  --glass-bg: rgba(245,240,232,0.12)
  --glass-border: rgba(255,255,255,0.13)
  --glass-glow: 0 8px 40px rgba(160,98,42,0.10)
  --glass-blur: blur(16px)
  --radius-glass: 20px

Max content width: 1440px
Side margins: clamp(40px, 6vw, 120px)
Section padding vertical: clamp(80px, 10vw, 160px)

Grid: CSS Grid 12-column
  grid-template-columns: repeat(12, 1fr)
  gap: clamp(16px, 2vw, 32px)
```

---

## IMPLEMENTATION STACK

- **HTML5 + CSS3** (vanilla, or with Tailwind utility classes)
- **Google Fonts** via `@import` — Cormorant Garamond + DM Sans
- **Vanilla JavaScript** for: scroll detection (nav glass), scroll-triggered reveals (IntersectionObserver), artisan portrait carousel
- **No framework required** for this homepage UI
- **SVG assets** for: Aipan background pattern, section dividers, craft icons, Likhai footer motif

---

## FINAL STANDARD

Every design decision must be justifiable with one sentence.  
If a decoration cannot be justified, remove it.  
If a section feels like shopping, reframe it as storytelling.  
If the page feels busy, add whitespace until it breathes.  

The user should land on this page and feel:  
> *"This is different. I am somewhere meaningful."*  

Not:  
> *"This is a nice-looking store."*

That is the difference between heritage commerce and ecommerce.  
Build for the former.

---

*Pahaadi Roots — Enactus IIT Roorkee*  
*Homepage Generation Prompt v1.0*
