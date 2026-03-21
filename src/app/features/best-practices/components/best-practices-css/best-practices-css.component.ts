import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import hljs from 'highlight.js';
import { Section } from '../../models/section.model';

@Component({
  selector: 'app-best-practices-css',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './best-practices-css.component.html',
  styleUrl: './best-practices-css.component.css',
})
export class BestPracticesCssComponent {
  sections: Section[] = [
    {
      title: 'Selectors',
      icon: 'pi-hashtag',
      color: 'section-blue',
      expanded: true,
      practices: [
        {
          title: 'Avoid over-qualifying selectors',
          explanation:
            'Over-qualified selectors are slower, harder to override, and tightly couple CSS to HTML structure.',
          detail: `Over-qualification happens when you add unnecessary element types or ancestor selectors to a rule — like div.container p.text instead of just .text.
CSS selectors are evaluated right-to-left by the browser. The more specific and complex the selector, the more work the browser does to match elements.
Over-qualified selectors also make your CSS brittle — if you change the HTML structure (wrap a div in a section, change a p to a span), the styles break. Class-only selectors survive structural refactoring.
The only case where element qualification is appropriate is when you intentionally want to style only that element type — like input[type="text"] to distinguish from other input types.
Keep specificity as low as possible. Low-specificity rules are easier to override when needed, which is the foundation of a maintainable CSS architecture.`,
          code: {
            bad: `/* Bad: over-qualified — brittle and slow */
div.container ul.nav li.nav-item a.nav-link {
  color: white;
}

body div header nav ul li a {
  text-decoration: none;
}`,
            good: `/* Good: class-only — fast and resilient */
.nav-link {
  color: white;
  text-decoration: none;
}`,
          },
        },
        {
          title: 'Avoid using IDs for styling',
          explanation:
            'ID selectors have extremely high specificity, making them nearly impossible to override without !important.',
          detail: `ID selectors (#header, #main-nav) have a specificity of 1-0-0 — 100 times more specific than a single class selector. This creates specificity wars — once you style something with an ID, you need another ID or !important to override it.
IDs should be reserved for JavaScript hooks (getElementById, querySelector) and anchor links (#section-1). They have a legitimate role in HTML — they just should not appear in your CSS.
Using only classes for styling gives you a flat specificity landscape. Any rule can override any other rule by adding one more class, which is predictable and controllable.
If you are working with legacy HTML that uses IDs structurally, use attribute selectors [id="header"] which have the same specificity as a class selector — this lets you style ID-bearing elements without the specificity penalty.`,
          code: {
            bad: `/* Bad: ID selector — creates specificity nightmare */
#header { background: #1e3a5f; }
#main-nav #nav-list #nav-item { color: white; }

/* Now you need !important to override anywhere */
.special-header { background: red !important; }`,
            good: `/* Good: class selectors — flat specificity */
.header { background: #1e3a5f; }
.nav-item { color: white; }

/* Easy to override with another class */
.header.header--dark { background: #0d1f33; }`,
          },
        },
        {
          title: 'Use BEM naming convention',
          explanation:
            'BEM (Block Element Modifier) creates predictable, self-documenting class names that avoid specificity conflicts.',
          detail: `BEM stands for Block, Element, Modifier. It is a naming methodology that makes CSS class names self-documenting and prevents style conflicts.
A Block is a standalone component — .card, .nav, .button. An Element is a part of a block — .card__title, .card__body, .nav__item. A Modifier is a variant — .button--primary, .card--featured, .nav__item--active.
The double underscore (__) separates block from element, and the double hyphen (--) separates a block or element from its modifier.
BEM eliminates the need for deep nesting in CSS because every class is unique and meaningful. .card__title is always the title inside a card, regardless of where the card appears in the DOM.
In Angular, BEM works naturally with component encapsulation — each component is a BEM block, and its internal elements and modifiers are scoped to that component's styles.`,
          code: {
            bad: `/* Bad: unclear, conflicting class names */
.card .title { font-size: 1.2rem; }
.card .body { padding: 1rem; }
.card.active { border: 2px solid blue; }
.card .btn { background: blue; }
.card .btn.danger { background: red; }`,
            good: `/* Good: BEM — self-documenting */
.card { border-radius: 8px; }
.card__title { font-size: 1.2rem; }
.card__body { padding: 1rem; }
.card__button { background: blue; }

/* Modifiers */
.card--featured { border: 2px solid blue; }
.card__button--danger { background: red; }`,
          },
        },
      ],
    },
    {
      title: 'CSS Custom Properties',
      icon: 'pi-sliders-h',
      color: 'section-purple',
      expanded: false,
      practices: [
        {
          title: 'Use CSS variables for design tokens',
          explanation:
            'CSS custom properties create a single source of truth for colors, spacing, and typography across your entire stylesheet.',
          detail: `CSS custom properties (variables) declared with -- prefix are the modern way to manage design tokens — the repeating values that define your visual system.
Without variables, a color like #1e3a5f might appear 50 times in a stylesheet. Changing the brand color means a global find-and-replace. With a variable --color-primary: #1e3a5f, you change one line.
Unlike preprocessor variables (Sass $variables), CSS custom properties are live — they can be changed at runtime with JavaScript, they respect the cascade and inheritance, and they can be scoped to specific elements.
This makes them perfect for theming — override a set of variables on :root for dark mode, or on a specific component for a themed section.
Organize your variables by category: colors, spacing, typography, shadows, border-radius. Use semantic names (--color-brand, --color-surface) rather than descriptive names (--color-blue-900) so the variable name communicates purpose, not just value.`,
          code: {
            bad: `/* Bad: magic values scattered everywhere */
.button { background: #1e3a5f; color: #ffffff; padding: 8px 16px; border-radius: 6px; }
.header { background: #1e3a5f; }
.link:hover { color: #1e3a5f; }
.badge { background: #1e3a5f; border-radius: 6px; padding: 4px 8px; }`,
            good: `/* Good: design tokens as CSS variables */
:root {
  --color-brand: #1e3a5f;
  --color-brand-dark: #132845;
  --color-text-inverse: #ffffff;
  --spacing-sm: 8px;
  --spacing-md: 16px;
  --radius-md: 6px;
}

.button {
  background: var(--color-brand);
  color: var(--color-text-inverse);
  padding: var(--spacing-sm) var(--spacing-md);
  border-radius: var(--radius-md);
}

.header { background: var(--color-brand); }
.link:hover { color: var(--color-brand); }`,
          },
        },
        {
          title: 'Use CSS variables for theming',
          explanation:
            'Override CSS variables at the :root level or on a scoped element to implement dark mode and component themes cleanly.',
          detail: `CSS custom properties cascade and inherit just like other CSS properties. This means you can define a set of variables at :root for the default theme, then override them inside a [data-theme="dark"] selector or a .dark class on the html element for dark mode.
Every element that uses var(--color-background) automatically gets the correct value for the current theme — no JavaScript needed to switch themes, just toggle a class or attribute.
Component-level theming works the same way — define variables on a component's host element and all descendants inherit the themed values. This is exactly how PrimeNG's design token system works.
For dark mode, prefer prefers-color-scheme media query for automatic OS-level switching, with a manual toggle as an optional override stored in localStorage.
Keep your token names semantic — --color-surface, --color-text-primary — so they make sense in both light and dark contexts. A variable named --color-white is meaningless in dark mode.`,
          code: {
            good: `/* Light theme — default */
:root {
  --color-background: #ffffff;
  --color-surface: #f9fafb;
  --color-text-primary: #111827;
  --color-text-secondary: #6b7280;
  --color-border: #e5e7eb;
}

/* Dark theme — override variables */
[data-theme="dark"] {
  --color-background: #0d0f14;
  --color-surface: #13161e;
  --color-text-primary: #f1f5f9;
  --color-text-secondary: #94a3b8;
  --color-border: #252a38;
}

/* All components automatically adapt */
.card {
  background: var(--color-surface);
  color: var(--color-text-primary);
  border: 1px solid var(--color-border);
}`,
          },
        },
      ],
    },
    {
      title: 'Layout',
      icon: 'pi-table',
      color: 'section-green',
      expanded: false,
      practices: [
        {
          title: 'Use Flexbox for one-dimensional layouts',
          explanation:
            'Flexbox excels at distributing space and aligning items along a single axis — rows or columns.',
          detail: `Flexbox is the right tool when you need to arrange items along a single axis — either horizontally (row) or vertically (column). It handles alignment, spacing, and wrapping elegantly.
The most powerful aspect of Flexbox is its alignment model — justify-content controls distribution along the main axis, align-items controls alignment on the cross axis, and gap handles spacing without margin hacks.
Use flex: 1 on a child to make it take up all available space. Use flex-shrink: 0 to prevent an item from shrinking below its natural size (important for icons and fixed-size elements).
Flexbox is the natural choice for: navigation bars, button groups, form rows, cards in a row, centering content both horizontally and vertically.
Do not use Flexbox for two-dimensional layouts (rows AND columns simultaneously) — that is what CSS Grid is for.`,
          code: {
            bad: `/* Bad: float-based layout — outdated and fragile */
.nav { overflow: hidden; }
.nav-item { float: left; margin-right: 16px; }
.nav-item:last-child { float: right; }

/* Bad: absolute positioning for centering */
.centered {
  position: absolute;
  top: 50%; left: 50%;
  transform: translate(-50%, -50%);
}`,
            good: `/* Good: flexbox for one-dimensional layout */
.nav {
  display: flex;
  align-items: center;
  gap: 16px;
}

.nav__spacer { flex: 1; } /* pushes right items to the end */

/* Good: flexbox centering */
.centered {
  display: flex;
  align-items: center;
  justify-content: center;
}`,
          },
        },
        {
          title: 'Use CSS Grid for two-dimensional layouts',
          explanation:
            'CSS Grid is the best tool for page-level and card-grid layouts that involve both rows and columns.',
          detail: `CSS Grid is designed for two-dimensional layouts — where you need to control placement in both rows and columns simultaneously. It is the right tool for page layouts, dashboards, and card grids.
The fr unit (fractional unit) is Grid's superpower — 1fr means "one fraction of the available space". grid-template-columns: 1fr 1fr 1fr creates three equal columns that fill all available space.
auto-fit and auto-fill with minmax() create responsive grids without media queries — the browser automatically determines how many columns fit based on the available width and minimum column size.
Use grid-template-areas for complex page layouts — it makes the layout visual and self-documenting in the CSS itself.
Grid and Flexbox complement each other — use Grid for the overall page structure and major sections, use Flexbox inside each section for arranging its contents.`,
          code: {
            bad: `/* Bad: using floats or inline-block for card grid */
.card-grid::after { content: ''; display: table; clear: both; }
.card { float: left; width: calc(33.33% - 16px); margin: 8px; }

/* Bad: fixed pixel widths — not responsive */
.card { width: 300px; display: inline-block; }`,
            good: `/* Good: CSS Grid — responsive card grid */
.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
}

/* Good: named grid areas for page layout */
.page {
  display: grid;
  grid-template-areas:
    "header header"
    "sidebar main"
    "footer footer";
  grid-template-columns: 240px 1fr;
  grid-template-rows: auto 1fr auto;
  min-height: 100vh;
}

.header  { grid-area: header; }
.sidebar { grid-area: sidebar; }
.main    { grid-area: main; }
.footer  { grid-area: footer; }`,
          },
        },
      ],
    },
    {
      title: 'Responsive Design',
      icon: 'pi-mobile',
      color: 'section-teal',
      expanded: false,
      practices: [
        {
          title: 'Design mobile-first',
          explanation:
            'Write base styles for mobile, then use min-width media queries to add complexity for larger screens.',
          detail: `Mobile-first CSS means writing your default styles for the smallest screen, then using min-width media queries to progressively enhance the layout for larger screens.
This approach is better than desktop-first (writing for large screens and using max-width to strip down) because: the mobile layout is simpler and is a natural base, min-width queries add complexity progressively rather than removing it reactively, and mobile browsers download only the styles that apply to them.
Performance matters on mobile — network connections are slower and CPUs are weaker. Shipping a desktop layout and overriding it with max-width queries means the mobile device downloads and parses all the desktop CSS unnecessarily.
The cascade works in your favor with mobile-first — later rules (larger breakpoints) override earlier ones naturally, which is the direction of increasing specificity.
Define your breakpoints based on your content, not on specific device sizes. Common breakpoints: 640px (sm), 768px (md), 1024px (lg), 1280px (xl).`,
          code: {
            bad: `/* Bad: desktop-first — overrides for mobile */
.card-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr); /* desktop */
  gap: 2rem;
}

@media (max-width: 768px) {
  .card-grid {
    grid-template-columns: 1fr; /* undo desktop layout */
    gap: 1rem;
  }
}`,
            good: `/* Good: mobile-first — enhance for larger screens */
.card-grid {
  display: grid;
  grid-template-columns: 1fr; /* mobile: single column */
  gap: 1rem;
}

@media (min-width: 640px) {
  .card-grid { grid-template-columns: repeat(2, 1fr); }
}

@media (min-width: 1024px) {
  .card-grid {
    grid-template-columns: repeat(3, 1fr);
    gap: 2rem;
  }
}`,
          },
        },
        {
          title: 'Use relative units instead of pixels',
          explanation:
            'rem, em, %, and vw/vh scale with user preferences and viewport size — px does not.',
          detail: `Using px everywhere creates an accessibility problem — users who set a larger base font size in their browser settings (a common accessibility need) get no benefit because px is absolute and does not scale.
rem is relative to the root font size (typically 16px by default). 1rem = 16px, 1.5rem = 24px. Because it is relative to the root, it respects the user's font size preference.
em is relative to the element's own font size, which makes it useful for component-internal spacing that should scale proportionally — padding and margin in em units scale automatically if the font size changes.
% is useful for widths that should be relative to the container — a 50% width column always takes half its parent regardless of screen size.
vw/vh are viewport-relative — 100vw is the full viewport width. Useful for full-screen sections and typography that scales with the viewport (clamp() with vw units creates fluid typography).
Use px only for things that should never scale — borders (1px), box-shadows, and media query breakpoints.`,
          code: {
            bad: `/* Bad: px everywhere — doesn't respect user preferences */
body { font-size: 16px; }
h1 { font-size: 32px; }
p { font-size: 14px; line-height: 22px; }
.card { padding: 24px; margin-bottom: 16px; }
.sidebar { width: 280px; }`,
            good: `/* Good: relative units */
:root { font-size: 16px; } /* base — users can override */

h1 { font-size: 2rem; }      /* 32px — scales with user pref */
p { font-size: 0.875rem; line-height: 1.6; }

.card { padding: 1.5rem; margin-bottom: 1rem; }
.sidebar { width: min(280px, 30%); } /* cap at 280px, fluid below */

/* Fluid typography — scales between viewport sizes */
h1 {
  font-size: clamp(1.5rem, 4vw, 3rem);
}`,
          },
        },
      ],
    },
    {
      title: 'Specificity and the Cascade',
      icon: 'pi-sort-amount-down',
      color: 'section-orange',
      expanded: false,
      practices: [
        {
          title: 'Never use !important',
          explanation:
            '!important bypasses the cascade and creates an arms race of overrides that makes CSS unmaintainable.',
          detail: `The !important declaration overrides any specificity calculation — it makes a declaration win regardless of where it appears in the cascade. It seems like a quick fix but creates long-term maintenance nightmares.
Once you use !important, the only way to override it is with another !important with equal or higher specificity. This starts an arms race — !important overrides !important, and your CSS becomes a tangle of overrides.
The root cause of wanting to use !important is almost always a specificity problem — some rule is more specific than it should be. Fix the root cause instead: lower the specificity of the rule you are trying to override, or increase the specificity of your new rule legitimately.
The only legitimate uses for !important are in utility classes (like Tailwind's utility modifiers) where you intentionally want a utility to always win, and in user stylesheets for accessibility overrides.
If you find yourself reaching for !important, stop and audit your selector specificity instead.`,
          code: {
            bad: `/* Bad: !important arms race */
.button { background: blue !important; }
.card .button { background: red !important; }
.page .card .button { background: green !important; }
/* Now nothing is predictable */`,
            good: `/* Good: fix specificity instead */

/* Lower specificity of the conflicting rule */
.button { background: blue; }

/* Use a modifier class to change the variant */
.button--danger { background: red; }

/* Use a BEM modifier — same specificity, later in file wins */
.button--success { background: green; }`,
          },
        },
        {
          title: 'Keep selector specificity flat',
          explanation:
            'Aim for a specificity graph that is flat and slightly rising — not spiking with deep nesting or ID selectors.',
          detail: `Specificity is CSS\'s way of resolving conflicts between rules. A single class has specificity (0,1,0). Two classes (0,2,0). An ID (1,0,0). Inline styles (1,0,0,0). The higher the number, the harder to override.
The ideal CSS specificity graph is flat and slightly rising — most rules have the same low specificity, with occasional intentional increases for states and modifiers. Spikes (from IDs, deep nesting, or inline styles) indicate problem areas.
Avoid nesting selectors beyond 2–3 levels deep. .card .header .title .text is already too deep — the text can only be styled by something equally or more deeply nested, or with !important.
CSS Modules, CSS-in-JS, and Angular\'s ViewEncapsulation solve specificity automatically by scoping styles to the component. If you use these, specificity concerns are mostly eliminated.
The :where() pseudo-class is a modern CSS tool that wraps a selector with zero specificity — useful for resetting or base styles that should be easy to override.`,
          code: {
            bad: `/* Bad: deeply nested — high specificity, hard to override */
.page-wrapper .main-content .section .card .card-header .title {
  font-size: 1.2rem;
  color: #111;
}`,
            good: `/* Good: flat structure — low specificity */
.card__title {
  font-size: 1.2rem;
  color: #111;
}

/* State modifier — one level higher, intentional */
.card--featured .card__title {
  color: var(--color-brand);
}`,
          },
        },
      ],
    },
    {
      title: 'Performance',
      icon: 'pi-bolt',
      color: 'section-red',
      expanded: false,
      practices: [
        {
          title: 'Avoid expensive CSS properties',
          explanation:
            'Some CSS properties trigger layout, paint, or composite steps — choosing cheaper alternatives improves animation and scroll performance.',
          detail: `Browsers render changes through a pipeline: JavaScript → Style → Layout → Paint → Composite. Properties that trigger Layout (reflow) are the most expensive because the browser must recalculate positions of all affected elements.
Layout-triggering properties: width, height, top, left, margin, padding, border, font-size. Changing these forces the browser to recalculate the geometry of potentially the entire page.
Paint-triggering properties: background, color, box-shadow, border-radius. These are cheaper than layout but still require the browser to redraw pixels.
Composite-only properties: transform and opacity. These are handled entirely by the GPU and do not affect layout or paint — they are essentially free from the browser's perspective.
For animations: always animate transform and opacity instead of left/top/width/height. Use will-change: transform on elements you know will animate to promote them to their own GPU layer in advance.`,
          code: {
            bad: `/* Bad: animating layout properties — causes reflow every frame */
.modal {
  transition: top 0.3s, left 0.3s, width 0.3s, opacity 0.3s;
}

.modal--open {
  top: 50%;
  left: 50%;
  width: 600px;
}`,
            good: `/* Good: animate transform and opacity only — GPU composited */
.modal {
  transform: translate(-50%, -50%) scale(0.9);
  opacity: 0;
  transition: transform 0.3s, opacity 0.3s;
  will-change: transform, opacity;
}

.modal--open {
  transform: translate(-50%, -50%) scale(1);
  opacity: 1;
}`,
          },
        },
        {
          title: 'Use contain and content-visibility for large lists',
          explanation:
            'CSS containment tells the browser that a subtree is independent, enabling optimizations for off-screen content.',
          detail: `CSS containment (contain property) is a powerful optimization hint that tells the browser a subtree is independent from the rest of the document. This allows the browser to skip layout, paint, and style calculations for contained subtrees when they are not affected.
content-visibility: auto is the most impactful — it tells the browser to skip rendering off-screen elements entirely (layout and paint). For a page with thousands of items, this can reduce initial render time by orders of magnitude.
contain: layout tells the browser that layout changes inside this element do not affect elements outside it. contain: paint means the element's children will not be painted outside its bounds. contain: strict combines all containment types.
The contain-intrinsic-size property works alongside content-visibility — it provides a placeholder size for off-screen elements so the scrollbar is accurate even before those elements are rendered.
These optimizations are most valuable for long lists, infinite scroll, and dashboards with many widgets. For typical pages with few elements, the benefit is negligible.`,
          code: {
            bad: `/* Bad: no containment — browser renders everything */
.list-item {
  padding: 1rem;
  border-bottom: 1px solid #e5e7eb;
}`,
            good: `/* Good: content-visibility skips off-screen rendering */
.list-item {
  padding: 1rem;
  border-bottom: 1px solid #e5e7eb;
  content-visibility: auto;
  contain-intrinsic-size: 0 60px; /* estimated height */
}

/* Good: contain layout for independent widgets */
.dashboard-widget {
  contain: layout paint;
}`,
          },
        },
      ],
    },
    {
      title: 'Modern CSS Features',
      icon: 'pi-star',
      color: 'section-indigo',
      expanded: false,
      practices: [
        {
          title: 'Use logical properties for internationalization',
          explanation:
            'Logical properties (margin-inline, padding-block) adapt automatically to text direction — no RTL overrides needed.',
          detail: `Traditional CSS properties like margin-left, padding-top, border-right are physical — they always refer to the same physical edge regardless of writing direction.
Logical properties map to the flow of text — margin-inline-start is the start of the inline axis (left in LTR, right in RTL). padding-block is padding in the block direction (top and bottom for horizontal text, left and right for vertical text).
If your application needs to support right-to-left languages (Arabic, Hebrew) or vertical text (some CJK writing modes), logical properties eliminate the need for separate RTL stylesheets or direction overrides.
Even for LTR-only applications, logical properties are worth adopting because they communicate intent better — padding-block-start says "space before the content starts" which is more meaningful than padding-top.
Browser support is excellent — all modern browsers support logical properties.`,
          code: {
            bad: `/* Bad: physical properties — break in RTL */
.card {
  margin-left: 1rem;
  padding-left: 1.5rem;
  border-left: 3px solid var(--color-brand);
  text-align: left;
}

/* Need separate override for RTL */
[dir="rtl"] .card {
  margin-left: 0;
  margin-right: 1rem;
  padding-left: 0;
  padding-right: 1.5rem;
  border-left: none;
  border-right: 3px solid var(--color-brand);
  text-align: right;
}`,
            good: `/* Good: logical properties — work in any direction */
.card {
  margin-inline-start: 1rem;
  padding-inline-start: 1.5rem;
  border-inline-start: 3px solid var(--color-brand);
  text-align: start;
}
/* No RTL override needed! */`,
          },
        },
        {
          title: 'Use :has() for parent selection',
          explanation:
            'The :has() pseudo-class lets you style a parent based on its children — previously impossible without JavaScript.',
          detail: `The :has() pseudo-class is one of the most powerful additions to CSS in years. It selects an element based on whether it contains a specific descendant — effectively a parent selector.
Before :has(), if you wanted to style a form differently when it contained an invalid input, or style a card differently when it contained an image, you had to use JavaScript to add a class to the parent.
:has() eliminates entire categories of JavaScript DOM manipulation for styling purposes. It evaluates selector context upward in the DOM tree, which was previously not possible in CSS.
It can also be used as a conditional modifier — .card:has(.card__badge) { padding-top: 2rem } adds extra padding only to cards that contain a badge.
Browser support is excellent in modern browsers. Use @supports (selector(:has(*))) to progressively enhance for browsers that support it.`,
          code: {
            bad: `// Bad: JavaScript needed to style parent based on child
ngAfterViewInit() {
  const inputs = document.querySelectorAll('input:invalid');
  inputs.forEach(input => {
    input.closest('form')?.classList.add('form--has-errors');
  });
}

/* Then in CSS */
.form--has-errors { border: 2px solid red; }`,
            good: `/* Good: :has() — pure CSS parent selection */

/* Style form when it has invalid inputs */
form:has(input:invalid) {
  border: 2px solid red;
}

/* Style card when it contains an image */
.card:has(.card__image) {
  padding-top: 0;
}

/* Style nav item when its link is active */
.nav__item:has(.nav__link--active) {
  background: var(--color-brand);
  border-radius: 6px;
}`,
          },
        },
      ],
    },
  ];

  highlight(code: string): string {
    return hljs.highlight(code, { language: 'css' }).value;
  }

  highlightAuto(code: string): string {
    return hljs.highlightAuto(code).value;
  }

  toggleSection(section: Section): void {
    section.expanded = !section.expanded;
  }

  getSectionGradient(color: string): string {
    const map: Record<string, string> = {
      'section-blue': 'linear-gradient(135deg, #1e3a5f, #0f2040)',
      'section-green': 'linear-gradient(135deg, #064e1e, #032e12)',
      'section-purple': 'linear-gradient(135deg, #3b0764, #1e0336)',
      'section-orange': 'linear-gradient(135deg, #7c2d12, #4a1a08)',
      'section-teal': 'linear-gradient(135deg, #134e4a, #062e2b)',
      'section-red': 'linear-gradient(135deg, #5c0a0a, #380606)',
      'section-yellow': 'linear-gradient(135deg, #713f12, #3d2006)',
      'section-indigo': 'linear-gradient(135deg, #1e1b4b, #0f0d2b)',
    };
    return map[color] ?? '#13161e';
  }

  getAccentColor(color: string): string {
    const map: Record<string, string> = {
      'section-blue': '#60a5fa',
      'section-green': '#4ade80',
      'section-purple': '#c084fc',
      'section-orange': '#fb923c',
      'section-teal': '#2dd4bf',
      'section-red': '#f87171',
      'section-yellow': '#fbbf24',
      'section-indigo': '#818cf8',
    };
    return map[color] ?? '#94a3b8';
  }

  getAccentBg(color: string): string {
    const map: Record<string, string> = {
      'section-blue': 'rgba(96,165,250,0.12)',
      'section-green': 'rgba(74,222,128,0.12)',
      'section-purple': 'rgba(192,132,252,0.12)',
      'section-orange': 'rgba(251,146,60,0.12)',
      'section-teal': 'rgba(45,212,191,0.12)',
      'section-red': 'rgba(248,113,113,0.12)',
      'section-yellow': 'rgba(251,191,36,0.12)',
      'section-indigo': 'rgba(129,140,248,0.12)',
    };
    return map[color] ?? 'rgba(148,163,184,0.12)';
  }
}
