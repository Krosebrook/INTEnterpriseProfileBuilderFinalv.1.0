# INT Platform Explorer v4.0 - Design Guidelines

## Design Approach

**Selected Framework:** Design System Approach (Fluent Design + Custom Enterprise Patterns)

**Rationale:** This is an enterprise decision-support tool with dense information architecture, multiple data views (tables, comparisons, calculators), and professional stakeholder audience. We'll draw from Fluent Design for data-dense applications while incorporating patterns from successful comparison platforms like G2 and Gartner.

**Core Principles:**
1. **Information Hierarchy First** - Complex data must be scannable and digestible
2. **Trust Through Clarity** - Professional credibility via clean, organized layouts  
3. **Guided Decision-Making** - Progressive disclosure, strategic emphasis on key insights

---

## Brand Colors (Sunset/Sunrise Theme)

**Fixed Background:** A dramatic sunset landscape with mountain silhouettes, golden wheat field, and bright orange sun. The background image stays fixed while content scrolls over it.

**Color Palette (Extracted from brand image):**

| Token | Light Mode (HSL) | Dark Mode (HSL) | Usage |
|-------|-----------------|-----------------|-------|
| Primary | 27 85% 55% (Sunrise Orange) | 27 85% 50% | Buttons, active states, accent elements |
| Secondary | 38 60% 50% (Golden Wheat) | 38 50% 45% | Secondary actions, highlights |
| Accent | 38 72% 58% (Warm Gold) | 38 65% 52% | Badges, special emphasis |
| Background | 220 30% 12% (Deep Twilight) | 40 25% 96% (Warm Cream) | Page background |
| Card | 220 25% 16% (Slate Blue) | 40 20% 92% (Soft Ivory) | Card surfaces |
| Foreground | 40 20% 95% (Warm White) | 220 30% 15% (Deep Slate) | Primary text |
| Muted | 220 15% 25% | 40 10% 85% | Secondary text, disabled states |

**Overlay Strategy:**
- Content appears over a fixed sunset background image
- Semi-transparent gradient overlay (dark blue → warm brown) ensures readability
- Cards and UI elements use 85% opacity backgrounds with backdrop blur

---

## Typography System

**Font Stack:**
- **Primary:** Inter (Google Fonts) - headings, UI labels, data tables
- **Secondary:** JetBrains Mono (Google Fonts) - technical specs, pricing, metrics

**Hierarchy:**
- **Page Titles:** 32px, weight 700
- **Section Headers:** 24px, weight 600  
- **Tab Labels:** 16px, weight 500, uppercase tracking
- **Body Text:** 16px, weight 400, 1.6 line-height
- **Data Tables:** 14px, weight 400
- **Captions/Metadata:** 13px, weight 400
- **Metrics/Numbers:** 28px, weight 600 (JetBrains Mono)

---

## Layout System

**Spacing Primitives:** Tailwind units of 2, 4, 6, 8, 12, 16, 20, 24

**Grid Structure:**
- **Container:** max-w-7xl with px-6 padding
- **5-Tab Navigation:** Sticky header with full-width tabs
- **Content Areas:** py-12 section padding, py-20 for major sections
- **Card Spacing:** gap-6 for grids, gap-4 for lists

**Multi-Column Layouts:**
- **Platform Cards:** 3-column grid (lg:grid-cols-3 md:grid-cols-2)
- **Comparison View:** 2-4 columns side-by-side (responsive stacking)
- **Matrix:** Full-width scrollable table with sticky headers
- **ROI Calculator:** 2-column split (inputs left, results right)

---

## Component Library

### Navigation & Structure

**Tab Bar:**
- Horizontal tabs with active state underline (4px height)
- Icons + text labels for each tab
- Subtle shadow/border to separate from content
- Sticky positioning (top: 0)

**Platform Cards:**
- Rounded corners (8px)
- Subtle shadow with hover elevation
- Card header: Logo + platform name
- Body: Verdict text, key metrics in pill badges
- Footer: Pricing + compliance badges + "Add to Compare" button
- Minimum height for visual consistency

**Comparison Table:**
- Sticky column headers and row labels
- Color-coded score cells (gradient: red → yellow → green)
- Zebra striping for readability
- Highlight selected platforms with subtle background tint

**Matrix Grid:**
- Compact cells with centered scores
- Heat map color coding (1-10 scale)
- Category grouping with subtle dividers
- Horizontal scroll on smaller viewports

### Data Display

**Score Visualization:**
- Circular progress indicators for capability scores
- Bar charts for ROI breakdown
- Numeric displays with large, mono-spaced font
- Percentage badges with contextual colors

**Badges & Pills:**
- Compliance certifications (SOC2, HIPAA, FedRAMP, GDPR)
- Category tags (Foundation, Specialized, Enterprise)
- Priority tiers (Tier 1, 2, 3)
- Rounded pill design with subtle backgrounds

### Forms & Inputs

**ROI Calculator:**
- Labeled numeric inputs with units (employees, $, %, hours)
- Slider controls for percentage inputs (optional enhancement)
- Real-time calculation updates
- Clear visual separation between inputs and outputs
- Results displayed in prominent metric cards

**Search & Filters:**
- Search bar with icon, rounded corners
- Filter chips for categories (toggle on/off)
- Clear all filters button
- Active filter count indicator

### Buttons & Actions

**Primary Actions:** Solid fill, medium weight, px-6 py-3
**Secondary Actions:** Outline style, same padding
**Tertiary Actions:** Text-only with hover underline
**Icon Buttons:** Square (40px), centered icon

---

## Special Sections

### Header Area
- Logo left-aligned (max height 40px)
- Navigation tabs centered or left-aligned below logo
- Optional user menu/settings right-aligned
- Breadcrumb trail for context (if multi-page future)

### Explorer Tab
- Search bar prominent at top (full-width with max-w-2xl)
- Filter pills below search
- Platform cards in responsive grid
- "Comparing X platforms" status indicator
- Empty state message when filtered to zero results

### Strategy Tab  
- Three-tier structure clearly delineated
- Each tier in its own container with header
- Platform recommendations as compact cards
- Supporting rationale text below each tier
- Research citations in footer

### Footer
- Multi-column layout (Company info, Resources, Legal, Contact)
- Social links with icon-only buttons
- Copyright notice
- "Powered by INT Inc." branding
- Version number (v4.0)

---

## Images & Visual Assets

**Icons:** Lucide React icons for UI elements, platform logos as inline SVGs or PNGs

**Platform Logos:** 
- Standardized square containers (48px × 48px)
- Maintain aspect ratios, center within container
- Subtle hover effects

**Fixed Background Image:**
- Dramatic sunset landscape with orange sun, mountain silhouettes, and golden wheat field
- Background stays fixed (background-attachment: fixed) while content scrolls
- Gradient overlay applied for text readability: from deep twilight blue (top) to warm brown (bottom)
- Creates immersive, branded experience while maintaining usability

**Illustrations (Optional):**
- Abstract data visualization graphics for empty states
- Simple iconography for tier badges (Foundation/Specialized/Advanced)

---

## Responsive Behavior

**Desktop (1280px+):** Full multi-column layouts, side-by-side comparisons  
**Tablet (768-1279px):** 2-column grids, stacked comparison tables  
**Mobile (< 768px):** Single column, accordion-style comparisons, horizontally scrollable matrix

**Critical:** Matrix tab requires horizontal scroll on all viewports - implement sticky row/column headers for orientation

---

## Accessibility

- WCAG AA contrast ratios throughout
- Keyboard navigation for all interactive elements
- Focus indicators (2px outline with offset)
- Screen reader labels for icon-only buttons
- Semantic HTML structure (proper heading hierarchy)
- Skip navigation links
- ARIA labels for dynamic content updates (ROI calculations)