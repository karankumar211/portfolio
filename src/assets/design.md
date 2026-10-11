# Portfolio Design System — Karan Kumar

> **Purpose:** A practical visual and interaction specification for redesigning Karan Kumar’s developer portfolio.
>
> **Primary audience:** Recruiters and engineering hiring managers evaluating frontend, React, and entry-level full-stack candidates.
>
> **Design direction:** Dark-first, editorial, modern engineering portfolio. Calm, precise, confident, and product-focused—not a flashy “developer template.”
>
> **Implementation principle:** Build the content and responsive layout first. Add motion and decorative effects only after the core experience is clear, fast, accessible, and polished.

---

## 1. Product and brand goals

The portfolio should communicate three things quickly:

1. **What Karan builds:** responsive web applications and full-stack products.
2. **How Karan works:** reusable components, API integration, state management, testing, performance, and maintainable code.
3. **What makes the profile distinctive:** professional frontend experience, a deployment-platform project, and speech-to-speech translation research.

The first screen should answer, without requiring scrolling:

- Who is this person?
- What kind of role are they targeting?
- What are their strongest projects?
- Where can I inspect their work or download their resume?

### Brand personality

| Attribute | Direction |
|---|---|
| Professional | Clear hierarchy, considered details, no gimmicks |
| Technical | Architecture diagrams, implementation notes, code-adjacent details |
| Human | Direct first-person copy and a visible contact path |
| Confident | Evidence and outcomes instead of exaggerated claims |
| Modern | Restrained color, generous spacing, subtle motion |

### Avoid

- A generic “passionate developer” introduction.
- Skill percentage meters without a defensible measurement method.
- Fake statistics, invented performance improvements, or unverified user counts.
- Excessive neon, glow effects, gradients, glassmorphism, or moving backgrounds.
- A long list of technologies before showing evidence of how they were used.
- Animations that make the site slower or harder to navigate.

---

## 2. Overall visual direction

### Recommended style

Use a **near-black charcoal background**, slightly lighter charcoal surfaces, soft-white headings, muted blue-gray body text, and a restrained blue primary accent. Teal is an occasional detail only—not a second dominant accent. The overall page should feel personal and editorial, not like a neon SaaS dashboard.

The site should feel like a polished engineering product: structured, readable, and composed. It should not look like a SaaS dashboard pasted onto a portfolio.

### Core visual principles

1. **Content first:** project evidence gets more visual weight than decoration.
2. **Strong hierarchy:** one clear page title, distinct section titles, concise supporting copy.
3. **Consistent alignment:** use a shared page container and align section headings, cards, and footer.
4. **Limited palette:** one primary action color, one secondary accent, neutral surfaces.
5. **Real artifacts:** use real screenshots, architecture diagrams, demos, and repository links.
6. **Progressive disclosure:** keep the homepage concise; put deep technical explanations on project detail pages.
7. **Responsive by default:** the design must work on small phones, not just a desktop screenshot.

---

## 3. Color palette

Use semantic tokens rather than scattering raw hex values through components.

### Dark theme tokens

| Token | Hex | Intended use |
|---|---|---|
| `--color-bg` | `#0B0D12` | Main page background |
| `--color-surface` | `#141821` | Primary cards and panels |
| `--color-surface-raised` | `#1A1F2A` | Hovered cards, menus, elevated surfaces |
| `--color-border` | `#2A303C` | Subtle borders and dividers |
| `--color-text` | `#E8EAF0` | Main headings and primary text |
| `--color-text-secondary` | `#C3C9D4` | Body copy |
| `--color-text-muted` | `#8B95A7` | Metadata, captions, secondary labels |
| `--color-primary` | `#4F8CFF` | Links, primary accent, active states |
| `--color-primary-hover` | `#3F79E8` | Hovered primary buttons |
| `--color-primary-strong` | `#356FE0` | Filled primary CTA |
| `--color-secondary` | `#66C9BE` | Rare technical/research accent |
| `--color-focus` | `#93C5FD` | Keyboard focus ring |
| `--color-success` | `#34D399` | Successful status only |
| `--color-warning` | `#FBBF24` | Warning status only |
| `--color-danger` | `#F87171` | Error status only |

### Light theme tokens (optional)

Only implement a light theme if both themes can be maintained and tested.

| Token | Hex | Intended use |
|---|---|---|
| `--color-bg` | `#F8FAFC` | Main page background |
| `--color-surface` | `#FFFFFF` | Cards and panels |
| `--color-surface-raised` | `#F1F5F9` | Hovered/elevated surfaces |
| `--color-border` | `#E2E8F0` | Borders and dividers |
| `--color-text` | `#0F172A` | Main headings and text |
| `--color-text-secondary` | `#334155` | Body copy |
| `--color-text-muted` | `#64748B` | Metadata and captions |
| `--color-primary` | `#2563EB` | Links and primary accent |
| `--color-primary-hover` | `#1D4ED8` | Hovered primary actions |
| `--color-secondary` | `#0F766E` | Secondary accent |
| `--color-focus` | `#1D4ED8` | Keyboard focus ring |

### Color usage rules

- Use the page background for the canvas; use surface colors to group content.
- Prefer a subtle one-pixel border over a heavy shadow on dark cards.
- Use blue for the primary action and link color consistently.
- Use teal only for a few small details, such as one status indicator or one research label. Avoid cyan labels on every section, teal pills throughout the hero, or using blue and teal equally often.
- Do not use color alone to communicate status; include text or an icon.
- Check text contrast before shipping. Muted text still needs to be comfortably readable.
- Avoid placing long paragraphs in low-contrast gray.
- Use gradients only as a barely visible decorative layer, never behind essential text.

### Example CSS variables

```css
:root {
  color-scheme: dark;
  --color-bg: #0b0d12;
  --color-surface: #141821;
  --color-surface-raised: #1a1f2a;
  --color-border: #2a303c;
  --color-text: #e8eaf0;
  --color-text-secondary: #c3c9d4;
  --color-text-muted: #8b95a7;
  --color-primary: #4f8cff;
  --color-primary-hover: #3f79e8;
  --color-primary-strong: #356fe0;
  --color-secondary: #66c9be;
  --color-focus: #93c5fd;
}
```

---

## 4. Typography and fonts

### Recommended font pairing

- **Primary UI and body font:** `Inter`
- **Technical labels and code snippets:** `JetBrains Mono`

This pairing is clean and familiar in developer tools. Use the monospace font only for short technical labels, stack names, code, and small metadata—not for paragraphs.

### Font loading

Prefer a locally bundled font or a carefully subsetted web font. If loading from a font provider, use only the weights needed and set a sensible system fallback.

```css
:root {
  --font-sans: "Inter", ui-sans-serif, system-ui, -apple-system,
    BlinkMacSystemFont, "Segoe UI", sans-serif;
  --font-mono: "JetBrains Mono", "SFMono-Regular", Consolas, monospace;
}
```

### Type scale

Use a fluid scale with `clamp()` so the hero adapts across screen sizes.

| Role | Desktop target | Mobile target | Weight | Line height |
|---|---:|---:|---:|---:|
| Hero heading | 56–72 px | 38–46 px | 650–750 | 1.05–1.12 |
| Page/section heading | 32–40 px | 28–32 px | 600–700 | 1.15–1.25 |
| Project title | 22–28 px | 20–24 px | 600 | 1.2–1.3 |
| Lead paragraph | 18–20 px | 17–18 px | 400 | 1.55–1.7 |
| Body paragraph | 16–18 px | 16 px | 400 | 1.6–1.75 |
| Navigation | 14–16 px | 14–16 px | 500 | 1.4 |
| Metadata/caption | 12–14 px | 12–13 px | 400–500 | 1.45–1.6 |
| Button | 14–16 px | 14–16 px | 550–650 | 1.2 |

Example:

```css
.hero-title {
  font-size: clamp(2.5rem, 5.4vw, 4.5rem);
  line-height: 1.08;
  letter-spacing: -0.045em;
  font-weight: 700;
}

.section-title {
  font-size: clamp(1.75rem, 3vw, 2.5rem);
  line-height: 1.2;
  letter-spacing: -0.03em;
  font-weight: 650;
}

body {
  font-family: var(--font-sans);
  font-size: 1rem;
  line-height: 1.7;
}
```

### Typography rules

- Use sentence case for headings; avoid shouting with all caps.
- Reserve uppercase for small eyebrow labels such as `SELECTED WORK`.
- Keep paragraph line length around 60–75 characters where possible.
- Use slightly negative tracking on large headings, not on body copy.
- Avoid too many font weights. Regular, medium, semibold, and bold are sufficient.
- Do not justify paragraphs; use natural left alignment.
- Use a clear text hierarchy rather than relying on color alone.

---

## 5. Layout, container, spacing, and grid

### Page container

- Maximum content width: **1120–1200 px**.
- Center the page container.
- Desktop horizontal gutters: **32–48 px**.
- Tablet gutters: **24–32 px**.
- Mobile gutters: **20–24 px**.
- Keep long-form project detail content narrower than the full page.

```css
.container {
  width: min(100% - 2.5rem, 74rem);
  margin-inline: auto;
}

.section {
  padding-block: clamp(4rem, 8vw, 7rem);
}
```

### Spacing scale

Use a consistent four-pixel base scale. Prefer tokens to arbitrary margin values.

| Token | Value | Common use |
|---|---:|---|
| `space-1` | 4 px | Icon-to-label micro-gap |
| `space-2` | 8 px | Compact inline gap |
| `space-3` | 12 px | Tag and metadata gap |
| `space-4` | 16 px | Standard component gap |
| `space-5` | 20 px | Compact card padding |
| `space-6` | 24 px | Standard card padding |
| `space-8` | 32 px | Group spacing |
| `space-10` | 40 px | Larger component separation |
| `space-12` | 48 px | Small section separation |
| `space-16` | 64 px | Standard section spacing |
| `space-20` | 80 px | Large section spacing |
| `space-24` | 96 px | Hero or major section spacing |

### Grid rules

- Featured projects: two columns on desktop if the cards have substantial content; use three only for concise cards.
- At widths below about 760 px, use one column for project cards.
- Skills can use grouped columns on desktop and a single column on mobile.
- Use CSS Grid for page and card layouts; use Flexbox for one-dimensional alignment.
- Maintain consistent gaps: usually 20–24 px between cards.
- Avoid forcing equal card heights if it creates excessive empty space.

### Border radius and elevation

| Element | Radius |
|---|---:|
| Small tags | 6–8 px |
| Buttons and inputs | 8–12 px |
| Project cards | 14–18 px |
| Large panels | 20–24 px |
| Pills | 999 px |

On the dark theme, borders should define card edges. Use shadows sparingly; large, dark shadows often add little value.

---

## 6. Navigation

### Desktop

Use a simple top navigation:

- Left: wordmark `KARAN.DEV` or `Karan Kumar`.
- Right: `Work`, `Experience`, `About`, `Contact`.
- A compact `Resume ↗` action may sit at the end.
- Keep the navigation height around 68–80 px.
- Use a subtle bottom border or translucent background only if a sticky header is needed.

### Mobile

- Use a compact wordmark and an accessible menu button.
- The menu button must have an accessible label and visible focus state.
- Do not make navigation hover-dependent.
- Keep touch targets approximately 44 × 44 px or larger.
- Close the mobile menu after navigation and allow Escape to close it.

### Sticky header

A sticky header is optional. If used, it must not cover section headings when navigating to anchor links. Use `scroll-margin-top` on target sections.

---

## 7. Homepage: section-by-section specification

### 7.1 Hero / first viewport

**Goal:** communicate identity, role focus, strongest value, and next action in one glance.

Suggested content:

**Eyebrow:** `FRONTEND ENGINEER · FULL-STACK DEVELOPER`

**Headline:** `I build reliable, responsive web applications.`

**Supporting copy:**
`I turn complex requirements into clean user experiences, backed by maintainable React architecture, API integration, automated testing, and performance optimization.`

**Primary CTA:** `View projects`

**Secondary CTA:** `Download resume`

**Social links:** GitHub, LinkedIn, email.

Layout:
- Left-aligned text is the default.
- A two-column hero is optional: text on the left and a real project visual, carefully composed code artifact, or simple architecture illustration on the right.
- Do not use a random stock photo or a generic avatar illustration.
- Keep the hero text width around 620–700 px.
- Add a small availability label only if it is accurate and up to date.
- The first viewport should show at least the start of the next section on common desktop screens if the layout permits.

### 7.2 Selected work

Feature these three first, in this order:

1. **ShopEase — Full-stack e-commerce:** responsive shopping flows, Redux Toolkit state management, REST APIs, authentication, protected routes, and admin workflows.
2. **Mini Vercel — Deployment platform:** project management, asynchronous build workflows, deployment status, Docker, and AWS S3 artifacts.
3. **Telugu speech-to-speech research:** ASR → MT → TTS pipeline, model evaluation, reproducible workflows, and research findings.

The order is deliberate: lead with the target role’s strongest practical product work, follow with systems-oriented full-stack work, then use research to differentiate the profile.

Each card should include:
- Real product screenshot or clear technical visual.
- Project name and one-sentence purpose.
- Three to five relevant technologies.
- Two or three specific features or engineering challenges.
- `Live demo` if genuinely deployed and working.
- `Source code` if the repository is accessible.
- A clear status label if a project is incomplete or research-only.

Do not show made-up metrics. A screenshot must represent the actual application. Use a separate project-detail page for long technical descriptions.

### 7.3 Engineering impact

Create a short, evidence-based section around the internship.

Potential items from the resume:
- `20+` reusable React components developed.
- `15+` backend REST APIs integrated.
- `50+` Jest unit tests written.
- Test coverage improved from `45%` to `80%`.
- `100+` SonarQube issues resolved.

These are resume-reported internship metrics. Keep them attributed to the role and be ready to explain the measurement method and scope in an interview. Avoid implying these are portfolio-wide statistics.

Visual treatment:
- Four or five compact metric blocks on desktop.
- Two columns on mobile, or a clean vertical list.
- Each metric needs a short label and context; never show a number alone.

### 7.4 Experience and research

Use a vertical timeline or two stacked role cards.

**Frontend Developer Intern — Galactix Solutions Pvt. Ltd.**
- Reusable React components and REST API integration.
- Redux Toolkit state management.
- Jest testing and SonarQube code quality.
- Agile collaboration and production issue resolution.

**Research Intern — IIIT Hyderabad**
- Cascaded speech-to-speech pipeline: ASR → MT → TTS.
- Vaani FastConformer, IndicTrans2, and Spring_F5.
- Speech recognition and translation quality evaluation.
- Reproducible evaluation workflows under limited GPU compute.

Use exact model names and spellings from the actual implementation and resume. Explain acronyms on first use if the audience may not know them.

### 7.5 Technical skills

Group skills by practical purpose rather than displaying a cloud of logos.

- **Frontend:** HTML, CSS, JavaScript, TypeScript, React, Next.js, Redux Toolkit, Tailwind CSS.
- **Backend and APIs:** Node.js, Express.js, REST APIs, JWT, WebSockets, Socket.IO.
- **Data:** MongoDB, PostgreSQL, MySQL, Redis.
- **Testing and tooling:** Jest, SonarQube, Git, GitHub, Docker, Linux.
- **Research and programming:** Python, PyTorch, Hugging Face, C++, SQL.

Only show PyTorch and Hugging Face in the research/tooling groups if you are comfortable discussing your work with them. This is a categorized selection, not a claim that every listed technology has equal proficiency.

Avoid percentage-based skill bars. Grouped text and evidence in projects communicate more than arbitrary ratings.

### 7.6 Education

Keep this section compact:

- B.Tech in Computer Science and Engineering.
- Hyderabad Institute of Technology and Management, Hyderabad.
- Expected graduation: June 2027.
- CGPA: 8.5/10, as stated in the resume.

Do not give education more visual space than the experience and project work unless applying to a role that specifically prioritizes academic achievements.

### 7.7 Contact and footer

End with a direct, friendly invitation:

**Heading:** `Have a role or a problem worth solving?`

Supporting line: `I'm interested in frontend and full-stack opportunities where I can build useful products and keep growing as an engineer.`

Include:
- Email link.
- LinkedIn.
- GitHub.
- Resume link.
- A small copyright/footer line.

Only state that you are actively looking for opportunities if that remains true.

---

## 8. Project detail pages

Each featured project should have a dedicated route or a clearly structured modal/page. A dedicated route is better for sharing, bookmarking, and search indexing.

Recommended order:

1. Project title, category, short summary.
2. Live demo and source code links.
3. Large real screenshot or short, compressed product demo.
4. Problem and goals.
5. Features and user flows.
6. Architecture diagram.
7. Important technical decisions and trade-offs.
8. Difficult bug or challenge and how it was resolved.
9. Testing, accessibility, performance, or evaluation evidence.
10. What was learned and what would be improved next.
11. Links to the next project and back to all work.

### Mini Vercel detail page

Explain the actual lifecycle: project submission, build initiation, asynchronous status updates, artifact storage, and delivery—only to the extent implemented. Show where Docker and AWS S3 fit in the system. Be specific about limitations and unfinished pieces.

### Speech research detail page

Show the pipeline as a simple diagram:

`Telugu audio → ASR transcript → Machine translation → Target-language speech`

Document:
- Dataset and evaluation split.
- Models and versions.
- Language direction and domain.
- WER or translation-quality metrics, including what each metric means.
- Hardware/compute constraints.
- Reproducibility, known limitations, and next experiments.

Make clear that the reported cross-domain and in-domain results relate to different evaluation conditions; explain the setup instead of presenting the numbers as a simple competition.

---

## 9. Motion and interaction design

### Motion philosophy

Motion should explain relationships and confirm actions. It should not be the main attraction.

| Interaction | Recommended behavior | Approximate duration |
|---|---|---:|
| Button hover/press | Color shift and subtle press feedback | 120–180 ms |
| Project card hover | Lift 2–4 px, border/accent change | 160–220 ms |
| Hero entrance | Fade in with 8–16 px upward movement | 400–650 ms |
| Staggered project reveal | Small delay between cards | 50–100 ms stagger |
| Mobile menu | Short opacity/transform transition | 180–240 ms |
| Anchor navigation | Smooth scroll when reduced motion is not requested | Browser-controlled |

### Recommended implementation

- Use CSS transitions for buttons, links, tags, and simple hover feedback.
- Use `motion/react` (Framer Motion) only where coordinated entrance or layout animation provides value.
- Use Intersection Observer for lightweight reveal-on-scroll behavior if a motion library is unnecessary.
- Do not animate every section if it delays content visibility.
- Do not use a custom cursor, persistent typewriter effect, excessive parallax, or a heavy animated background.
- Avoid layout shifts caused by images or fonts loading late.

### Reduced-motion support

```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    scroll-behavior: auto !important;
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

If using an animation library, also disable or simplify its animations when reduced motion is requested.

---

## 10. Buttons, links, cards, and forms

### Buttons

- Primary: filled blue background, high-contrast white text.
- Secondary: transparent surface with a subtle border.
- Text link: blue text, underline on hover or another clear interaction cue.
- Height: 44–48 px for primary actions.
- Horizontal padding: 16–20 px.
- Include visible hover, active, disabled, and keyboard focus states.

### Cards

- Surface background distinct from the page canvas.
- One-pixel border.
- 14–18 px radius.
- 20–28 px padding depending on card size.
- Consistent thumbnail aspect ratio.
- The whole card should not be a click target if it contains multiple independent actions; use distinct links for the demo and repository.

### Forms

If a contact form is included:
- Use explicit labels, not placeholder-only fields.
- Provide success and error messages.
- Validate inputs accessibly.
- Include spam protection appropriate to the backend.
- Do not imply a message was sent unless the submission succeeds.
- Keep a direct email link available as a fallback.

---

## 11. Responsive behavior

Design and test at these approximate viewport widths:

- Small mobile: 320–375 px.
- Large mobile: 390–430 px.
- Tablet: 768 px.
- Laptop: 1024–1280 px.
- Desktop: 1440 px and above.

### Mobile rules

- One-column project cards.
- Hero heading around 38–46 px, adjusted to avoid awkward line breaks.
- 20–24 px side gutters.
- No horizontal overflow.
- Full-width buttons are acceptable when they improve touch usability.
- Navigation links must remain accessible through a usable menu.
- Architecture diagrams should either reflow vertically or support a deliberate, accessible horizontal scroll.
- Avoid hover-only content; touch users must see essential actions.

### Tablet rules

- Use a two-column project layout only when each card remains readable.
- Reduce oversized hero gaps.
- Preserve hierarchy instead of simply shrinking all desktop sizes.

### Desktop rules

- Cap the content width to maintain readable line lengths.
- Use two-column hero or project-detail layouts only when the content benefits from them.
- Leave enough negative space around major headings and featured work.

---

## 12. Accessibility requirements

- Semantic HTML: `header`, `nav`, `main`, `section`, `article`, and `footer` where appropriate.
- One clear `h1`; use logical `h2`/`h3` nesting.
- All interactive elements must work with a keyboard.
- Every focusable control must have a visible focus indicator.
- Use descriptive link labels such as `View ShopEase source code`, not repeated ambiguous `Click here`.
- Add meaningful alt text to project screenshots; use empty alt text for purely decorative imagery.
- Maintain sufficient contrast for normal and large text.
- Do not communicate statuses using color alone.
- Ensure menus and dialogs expose their expanded/open state to assistive technology.
- Respect reduced-motion preferences.
- Avoid rapidly flashing or continuously moving content.
- Keep touch targets comfortable, approximately 44 × 44 px where practical.

---

## 13. Performance and technical quality

A visually polished portfolio should also load quickly and behave predictably.

- Use optimized WebP/AVIF images where supported.
- Specify image dimensions or aspect ratios to prevent layout shifts.
- Lazy-load below-the-fold images; do not unnecessarily lazy-load the primary hero visual.
- Avoid shipping a large animation library just for a few hover effects.
- Split code at route boundaries when the app size warrants it.
- Use semantic links for navigation and buttons for actions.
- Check console errors and failed network requests.
- Test all external links, resume download, demo routes, and contact paths.
- Configure page title, description, canonical URL if appropriate, and Open Graph metadata.
- Add a suitable favicon and social preview image.
- Ensure the site still communicates clearly when JavaScript or animation effects fail.
- Measure performance with Lighthouse or browser performance tools rather than claiming a score without testing.

### Suggested metadata

```html
<title>Karan Kumar — Frontend & Full-Stack Developer</title>
<meta
  name="description"
  content="Portfolio of Karan Kumar: frontend engineering, full-stack projects, and speech-to-speech translation research."
/>
<meta name="theme-color" content="#090D18" />
```

Update the title and description if the target role or portfolio positioning changes.

---

## 14. Suggested design tokens

```css
:root {
  /* Typography */
  --font-sans: "Inter", ui-sans-serif, system-ui, sans-serif;
  --font-mono: "JetBrains Mono", ui-monospace, monospace;

  /* Color */
  --color-bg: #0b0d12;
  --color-surface: #141821;
  --color-surface-raised: #1a1f2a;
  --color-border: #2a303c;
  --color-text: #e8eaf0;
  --color-text-secondary: #c3c9d4;
  --color-text-muted: #8b95a7;
  --color-primary: #4f8cff;
  --color-primary-hover: #3f79e8;
  --color-primary-strong: #356fe0;
  --color-secondary: #66c9be;
  --color-focus: #93c5fd;

  /* Layout */
  --container-max: 74rem;
  --gutter: clamp(1.25rem, 4vw, 3rem);

  /* Spacing */
  --space-1: 0.25rem;
  --space-2: 0.5rem;
  --space-3: 0.75rem;
  --space-4: 1rem;
  --space-5: 1.25rem;
  --space-6: 1.5rem;
  --space-8: 2rem;
  --space-10: 2.5rem;
  --space-12: 3rem;
  --space-16: 4rem;
  --space-20: 5rem;
  --space-24: 6rem;

  /* Shape and motion */
  --radius-sm: 0.5rem;
  --radius-md: 0.75rem;
  --radius-card: 1rem;
  --radius-panel: 1.25rem;
  --duration-fast: 150ms;
  --duration-normal: 200ms;
  --ease-standard: cubic-bezier(0.2, 0, 0, 1);
}
```

---

## 15. Definition of done

Before calling the redesign complete, verify:

### Content
- [ ] The hero clearly communicates role focus.
- [ ] Featured projects are real and accurately described.
- [ ] Resume and contact links work.
- [ ] Internship metrics have correct attribution and context.
- [ ] Research metrics have clearly explained evaluation conditions.
- [ ] Incomplete work is labelled honestly.

### Visual design
- [ ] Colors use shared tokens.
- [ ] Typography and spacing are consistent.
- [ ] Cards and buttons share a coherent visual language.
- [ ] The page looks balanced on desktop and mobile.
- [ ] Real screenshots are used wherever possible.

### Engineering
- [ ] No broken links or visible runtime errors.
- [ ] Keyboard navigation and focus states work.
- [ ] Reduced-motion preferences are respected.
- [ ] Images are optimized and layout shifts are controlled.
- [ ] Metadata and social preview are configured.
- [ ] Mobile layout has no unintended horizontal overflow.

---

## Final design principle

**The portfolio should look like the work of an engineer who cares about both product quality and implementation quality.** Use a restrained visual system, make real projects the centerpiece, explain meaningful technical decisions, and use animation as a finishing touch—not a substitute for substance.


---

## 16. Mouse-driven interactions and cursor motion

**Goal:** make the portfolio feel responsive and carefully crafted while keeping the content readable and the experience professional.

Mouse interactions are progressive enhancements, not requirements for understanding or navigating the page. Every link, button, project detail, and important interaction must still work without a mouse.

### 16.1 Custom cursor (optional, desktop only)

**Visual concept**
- A small filled blue dot follows the pointer.
- A thin, low-opacity outer ring follows with a slight delay for a soft, polished feel.
- When the pointer enters a link, button, or interactive project card, the ring grows slightly and changes opacity.
- On text selection or over non-interactive text, keep the effect minimal.
- Keep the native cursor on touch devices, pen input, and where custom cursor behavior is unsupported.

**Rules**
- Only enable when `(hover: hover)` and `(pointer: fine)` match.
- Do not hide the native cursor until the custom cursor is mounted and working.
- Never cover important text or make the cursor hard to locate.
- Do not use a large cursor label for every link; reserve optional labels such as “View project” for selected project visuals only.
- Keep the custom cursor decorative: it must not intercept pointer events (`pointer-events: none`).
- Disable it when reduced motion is requested.
- Ensure it does not interfere with text selection, browser controls, or keyboard navigation.

**Motion**
- Dot: follow pointer position with minimal lag.
- Ring: use a spring-like or short eased follow, without overshooting dramatically.
- Interactive hover: transition size and opacity in roughly 140–200 ms.

### 16.2 Project-card tilt and pointer spotlight

Use a restrained 3D tilt on featured project cards:
- Maximum tilt: approximately 3–5 degrees.
- Slight lift: 2–4 px.
- Optional soft blue radial highlight follows the pointer within the card.
- Return smoothly to the resting position on pointer leave.
- Keep card content stable and readable; do not tilt nested buttons independently.
- Do not apply tilt to every small tag or section.
- Disable tilt on touch devices, coarse pointers, and reduced-motion settings.
- If tilt causes text blur or visual discomfort, remove the 3D rotation and retain only a subtle border/highlight change.

The highlight should be a low-opacity decorative layer, not a bright spotlight that competes with the screenshot.

### 16.3 Hero mouse-following spotlight

Add an optional radial gradient behind—not on top of—the hero text:
- A soft blue glow follows the pointer within the hero region.
- Keep opacity low enough that body text maintains contrast.
- Use a large, blurred gradient with no hard edge.
- Restrict movement to the hero container; do not create a full-page tracking glow.
- Disable on touch devices and when reduced motion is enabled.
- If the effect is expensive or distracting, use a static subtle gradient instead.

### 16.4 Magnetic primary CTA

The main CTA may move a few pixels toward the pointer:
- Maximum movement: about 3–5 px on either axis.
- Movement should be subtle and never shift nearby layout.
- On pointer leave, return smoothly to the original position.
- Do not apply magnetic movement to small icon-only controls, navigation menus, or every button.
- Keep the button's hit target and focus outline reliable.
- Disable on touch/coarse pointers and reduced-motion settings.

### 16.5 Standard hover feedback

These effects should be used consistently even if the custom cursor, tilt, spotlight, or magnetic button effects are omitted:

| Element | Hover behavior |
|---|---|
| Text link | Accent color shift and clear underline or equivalent cue |
| Primary button | Slight color shift and subtle press feedback |
| Project card | Border/accent highlight and 2–4 px lift |
| Technology tag | Small background/border change; no dramatic movement |
| Social icon | Color transition and a small movement at most |
| Navigation item | Accent color and understated underline |
| Image thumbnail | Optional slight zoom within a clipped image container |

Use `:focus-visible` styles equivalent in clarity to hover styles. Hover must never be the only way to discover an action.

### 16.6 Implementation and performance rules

- Use `requestAnimationFrame` for high-frequency pointer updates if implementing a custom animation loop.
- Prefer CSS transforms and opacity for animation; avoid continuously animating layout properties such as `top`, `left`, `width`, or `height`.
- Avoid React state updates on every pointer event when a CSS custom property or a ref-driven animation can do the job.
- Scope pointer listeners to the component or page region that needs them.
- Clean up event listeners on unmount.
- Avoid stacking several motion libraries for small effects.
- Test performance on an ordinary laptop, not just a high-end development machine.
- Ensure the page remains usable if JavaScript is disabled or animation code fails.

### 16.7 Suggested CSS foundations

```css
/* Only enable pointer-driven polish on devices with a precise pointer. */
@media (hover: hover) and (pointer: fine) {
  .project-card {
    transition:
      transform 200ms cubic-bezier(0.2, 0, 0, 1),
      border-color 200ms ease,
      box-shadow 200ms ease;
    transform: perspective(900px) rotateX(var(--tilt-x, 0deg))
      rotateY(var(--tilt-y, 0deg));
  }

  .project-card:hover {
    border-color: rgba(96, 165, 250, 0.55);
  }

  .interactive-link,
  .button {
    transition:
      color 150ms ease,
      background-color 150ms ease,
      border-color 150ms ease,
      transform 180ms cubic-bezier(0.2, 0, 0, 1);
  }
}

@media (prefers-reduced-motion: reduce) {
  .project-card,
  .interactive-link,
  .button {
    transition: none !important;
    transform: none !important;
  }
}
```

This CSS is a foundation, not a complete pointer-tracking implementation. The pointer coordinates and custom cursor behavior require JavaScript or an animation library.

### 16.8 Interaction priority

Implement these in order:

1. **Essential:** clear hover, active, and focus-visible states for links and buttons.
2. **Recommended:** subtle project-card lift and border highlight.
3. **Optional polish:** a very faint hero spotlight OR limited project-card tilt; do not make every section react to the pointer.
4. **Last priority:** custom cursor and magnetic CTA. Add these only if they feel smooth and restrained during real use.

A standard system cursor is completely acceptable and often more professional. Do not add a custom cursor simply because the portfolio is a developer portfolio.

Do not ship all effects just to maximize animation. Keep the effects that improve perceived quality without hurting usability, accessibility, or performance.


---

## 17. Refinement pass: make the portfolio feel less template-driven

This section takes priority over decorative choices elsewhere in the document if they conflict. The existing visual direction should be refined—not replaced with a completely different site.

### 17.1 The target feeling

Aim for **quiet confidence**: a portfolio made by a real engineer who cares about usability and implementation. It should not resemble an admin dashboard, a product landing-page template, or a collection of AI-generated UI cards.

- Keep the dark theme, large headline, clear project screenshots, and strong spacing.
- Reduce the number of simultaneous visual accents and decorative containers.
- Let project evidence, writing, and real technical decisions create personality.
- Prefer a few intentional details over an effect on every element.

### 17.2 Palette discipline

Use the updated palette in Section 3. Apply these limits:

- Neutral colors should occupy approximately 85–90% of the page.
- Blue is the main accent for primary actions, links, and selected active states.
- Teal is reserved for occasional small details; do not use it for every eyebrow heading, badge, and status label.
- Use gradients only if they are almost imperceptible. Avoid neon glows and large blue/cyan radial gradients.
- Keep card surfaces close to the page background. Borders should separate content gently, not outline every nested element.
- Use one filled primary button per important decision area. Secondary actions should be outlined or plain text.

These percentages are a visual guideline, not a requirement to calculate colors programmatically.

### 17.3 Reduce the dashboard effect

**Hero**
- Keep the headline and short supporting paragraph as the primary focus.
- Simplify the terminal-style profile panel. If retained, treat it as one restrained supporting visual—not a fake command-line interface filled with numerous capability rows, chips, and status badges.
- Consider a compact profile panel with a real portrait, role, location, and a few genuinely important technical strengths.
- Remove repeated “available,” “ready for interview,” or version-status decorations unless they communicate real, useful information.

**Projects**
- Keep large, real screenshots; they are more convincing than decorative UI chrome.
- Reduce overlapping floating labels on screenshots. One small project category label is enough.
- Use a consistent card structure, but do not put every paragraph, technology list, challenge, and action inside a separate bordered box.
- Prioritize the project problem, the user's contribution, important engineering decisions, and a working demo or source repository.
- Make research work visually distinct through its actual pipeline diagram, methodology, dataset scale, and evaluation—not just a “research” badge.

**Impact metrics**
- Keep only metrics that are accurate and explainable in an interview.
- Use restrained blue for the numbers, not glowing text or multiple accent colors.
- Reduce internal decoration such as numbered corner labels if it adds no meaning.
- Give each metric enough breathing room, but avoid making the section look like an analytics dashboard.

**Skills and metadata**
- Avoid wrapping every technology in a prominent pill. Use compact text groups or a short list when that is easier to scan.
- Use monospace for code-like labels, small metadata, and technical snippets—not for every badge or section heading.
- Do not add a badge, icon, or status dot unless it adds information.

### 17.4 Typography and copy should feel human

- Keep headings direct and specific. Avoid stacking generic phrases such as “Selected Work,” “Engineering Impact,” “Measurable Outcomes,” and “Ready for Technical Assessment” when simpler labels work.
- Prefer clear labels such as “Projects,” “Internship impact,” “Experience,” and “Research.”
- Write the introduction in first person and use concrete details about the work.
- Avoid claims like “production-grade,” “high-performance,” or “scalable” unless the project details explain what supports the claim.
- Do not use copy that sounds like the website is grading or advertising the candidate to recruiters; let evidence do that work.

### 17.5 Mouse motion should be subtle

The pointer effects in Section 16 are optional enhancements. Recommended default:

1. Implement polished hover, active, and keyboard-focus states.
2. Add a small card lift or border-color transition.
3. Add either a faint hero spotlight or slight project-card tilt only if it improves the experience.
4. Leave custom cursor and magnetic buttons disabled by default until tested and clearly justified.

Do not combine a custom cursor, large spotlight, strong 3D tilt, magnetic buttons, glowing borders, and scroll animations all at once. That combination is likely to feel overdesigned and can make the site look template-generated.

### 17.6 Final review checklist

Before shipping, view the site at normal brightness and at desktop and mobile sizes, then ask:

- Does the content still look good if all animations are disabled?
- Is the first screen clearly about the person and their work rather than a visual effect?
- Are blue and teal accents used selectively?
- Are there sections with too many cards, chips, badges, borders, or icons?
- Can a recruiter understand the strongest projects within 20–30 seconds?
- Does every number, technology, claim, and link reflect something real?
- Does the site still feel distinctive without a custom cursor?

If a decorative effect competes with project evidence, remove the effect.
