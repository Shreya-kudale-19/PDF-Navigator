# Design Guidelines: PDF Highlighting Application

## Design Approach

**Selected System:** Fluent Design (Microsoft Design System)  
**Rationale:** This is a utility-focused, information-dense productivity tool requiring clear hierarchy, professional presentation, and optimal reading/analysis experience. Fluent Design excels at document-centric applications with emphasis on functionality over visual flair.

**Core Principles:**
- Clarity over creativity - information accessibility is paramount
- Minimal visual noise - let the PDF and text content be the focus
- Precision in interaction - highlighting and navigation must feel responsive
- Professional restraint - this is a technical assessment tool, not a marketing page

---

## Layout System

### Grid Structure
- **Split-screen layout**: 50/50 grid on desktop (`grid-cols-2`)
- **Spacing primitives**: Use Tailwind units of **2, 4, 8, 16** (e.g., `p-4`, `gap-8`, `mb-16`)
- **Container padding**: `p-8` on desktop, `p-4` on mobile
- **Panel gap**: `gap-6` between PDF and analysis panels
- **Responsive breakpoint**: Stack to single column (`grid-cols-1`) below `md` (768px)
  - On mobile: PDF viewer on top, analysis panel below
  - Maintain full viewport height for PDF viewer even when stacked

### Panel Architecture
**Left Panel (PDF Viewer):**
- Fixed width container with scroll
- Sticky header with page navigation controls
- Centered PDF pages with breathing room
- Subtle border separation from analysis panel

**Right Panel (Analysis Text):**
- Maximum reading width: `max-w-3xl` centered within panel
- Generous line height for readability (`leading-relaxed`)
- Hierarchical section spacing: `mb-8` between major sections, `mb-4` between paragraphs

---

## Typography

### Font Families
- **Primary (Body & UI)**: Inter or Segoe UI via Google Fonts CDN
- **Monospace (Citations/Technical)**: JetBrains Mono for citation numbers and technical references

### Type Scale
- **Page Title**: `text-2xl font-semibold` (PDF Document Title)
- **Section Headers**: `text-xl font-semibold mb-4` (Analysis, Findings, Supporting Evidence)
- **Subsection Headers**: `text-lg font-medium mb-3` (Page 3 — Highlights Q2 2025)
- **Body Text**: `text-base leading-relaxed` (Analysis paragraphs)
- **Citation Numbers**: `text-sm font-mono font-semibold` (Monospace for [1], [2], [3])
- **Supporting Evidence**: `text-sm leading-loose` (Quoted text from PDF)

### Typography Hierarchy Rules
- Use font weight (not size) to differentiate nested headers
- Maintain consistent line height across body text for scanning
- Add subtle spacing (`mb-2`) before citation references within paragraphs

---

## Component Library

### 1. PDF Viewer Container
- Clean border with subtle elevation
- Rounded corners: `rounded-lg`
- Internal padding: `p-6`
- Overflow behavior: `overflow-y-auto` with custom scrollbar styling
- Page counter UI: Sticky top position, `text-sm font-medium`

### 2. PDF Page Rendering
- Pages displayed sequentially with vertical spacing (`mb-8` between pages)
- Centered alignment within viewer panel
- Smooth scaling for different viewport sizes
- Page number indicator overlaid in top-left of each page (`absolute top-2 left-2`)

### 3. Citation Link Component
**Default State:**
- Inline square brackets with number: `[1]`, `[2]`, `[3]`
- Monospace font, medium weight
- Underline decoration
- Cursor pointer

**Interactive States:**
- Subtle background fill on hover
- No scale transform (maintain text flow)
- Clear focus ring for keyboard navigation (`ring-2 ring-offset-1` on focus)

### 4. Analysis Text Panel
- Semantic HTML structure: `<article>` wrapper
- Section divisions with clear spacing
- Blockquote styling for "Supporting Evidence" quotes:
  - Left border accent (`border-l-4`)
  - Indentation (`pl-4`)
  - Italic font style for quoted content

### 5. Highlighted Text Overlay (in PDF)
- Semi-transparent yellow overlay positioned absolutely over PDF text
- Smooth fade-in animation: `transition-opacity duration-300`
- Persists until new citation clicked
- Precise boundary matching to text coordinates

### 6. Page Navigation Controls (Optional)
- Minimal button group: Previous Page | Current Page / Total | Next Page
- Icon-only buttons with tooltips
- Positioned sticky at top of PDF viewer
- Small size: `text-sm px-3 py-1.5`

---

## Responsive Behavior

### Desktop (≥768px)
- Side-by-side panels with equal width
- PDF viewer scrolls independently from analysis panel
- Both panels fill viewport height: `h-screen`

### Tablet/Mobile (<768px)
- Vertical stack: PDF viewer above, analysis below
- PDF viewer: `h-[60vh]` to prevent excessive scrolling
- Analysis panel: Natural height, scrollable
- Maintain all spacing proportions with mobile-adjusted values (`p-4` instead of `p-8`)

---

## Interaction Patterns

### Citation Click Flow
1. User clicks citation link (e.g., `[3]`)
2. PDF panel scrolls to target page with smooth animation
3. Yellow highlight overlay fades in over exact text match
4. Previous highlight clears automatically
5. Subtle visual feedback on citation link (active state)

### Scroll Behavior
- Smooth scrolling enabled: `scroll-smooth`
- PDF pages snap to viewport top when navigating via citation
- Analysis panel retains scroll position when citations clicked

### Focus Management
- Clicking citation maintains focus on citation link (for keyboard users)
- Tab order: PDF controls → Analysis text → Citation links (sequential)

---

## Visual Hierarchy

### Information Density Strategy
- **High density in analysis panel**: Compact text with clear sectioning
- **Low density in PDF viewer**: Generous whitespace around PDF pages
- **Balance**: Neither panel should feel cramped or overly sparse

### Emphasis Patterns
- Bold weight for section headers
- Medium weight for subsection identifiers (Page numbers)
- Regular weight for body content
- Monospace + semibold for citation references

---

## Animation Guidelines

**Minimal Motion Philosophy:**
- Smooth scroll animations: `scroll-behavior: smooth` (300ms)
- Highlight fade-in: 300ms opacity transition
- No entrance animations, slide effects, or decorative motion
- Focus on functional transitions only

---

## Icons

**Library:** Heroicons (outline variant) via CDN  
**Usage:**
- Navigation arrows in PDF controls (ChevronLeft, ChevronRight)
- Document icon in header (optional)
- External link icon for citation sources (optional)
- Size: `h-5 w-5` for UI controls

---

## Professional Touches

### Error States
- If PDF fails to load: Centered message with reload button
- If citation mapping fails: Graceful fallback (scroll to page only, no highlight)

### Loading States
- PDF loading: Skeleton placeholder with "Loading document..." text
- Page rendering: Progressive loading with subtle opacity fade-in

### Accessibility
- All citation links have `aria-label`: "Jump to page [X] reference"
- PDF viewer has `role="region"` and `aria-label="Document viewer"`
- Analysis panel has semantic HTML with proper heading hierarchy
- Keyboard navigation fully supported with visible focus indicators

---

## Production Quality Standards

This is a technical assessment - every detail counts:
- Pixel-perfect alignment of text and PDF pages
- Consistent spacing throughout (no arbitrary margins)
- Professional font rendering (antialiasing enabled)
- Clean separation between functional areas
- No visual clutter or unnecessary embellishments
- Fast, responsive interactions (< 100ms for citation clicks)

**Avoid:**
- Decorative gradients or background patterns
- Excessive shadows or depth effects
- Animated page transitions
- Busy headers/footers with branding
- Modal overlays or popups

**Embrace:**
- Clean, functional aesthetics
- Information clarity
- Efficient space utilization
- Precise interaction feedback
- Professional document viewer conventions