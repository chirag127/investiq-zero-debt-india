# Architecture and Engineering Decisions: ZeroDebt India

## 1. Static Framework & Tooling Selection
- **Decision**: Astro 5.x with static site generation (`output: 'static'`).
- **Rationale**: ZeroDebt India is an informational and computational portal that prioritizes extreme load speed, SEO crawlability, 100% privacy, and static hosting without server execution.
- **Base Path**: `/investiq-zero-debt-india/` for GitHub Pages repository subpath compatibility.

## 2. Privacy & Client-Side Execution Guarantee
- **Decision**: All financial calculators and grievance tools run 100% client-side in vanilla TypeScript/JavaScript. No user input or scenario data is sent over the network or saved to any server.
- **Data Persistence**: Any saved preferences or calculation history exist solely in browser `localStorage`, with an immediate "Clear Local Data" button on all interactive tools.
- **Analytics & Trackers**: Exactly 0 third-party trackers, zero advertising pixels, zero fonts loaded from third-party CDNs. All design tokens, SVG icons, and typography use self-contained CSS and system fallbacks.

## 3. Styling & Layout Architecture
- **Decision**: Vanilla CSS with comprehensive CSS custom properties (tokens), avoiding heavy utility dependencies like Tailwind.
- **Layout**: 3-column / 2-sidebar responsive architecture:
  - Header with branding, navigation, search modal trigger, and theme toggle (Dark / Light).
  - Left Sidebar: Topic navigation, quick tool shortcuts, and regulatory frameworks quick index.
  - Center Content: High-readability technical copy, worked calculations, interactive tools, tables, callouts.
  - Right Sidebar: On this page (Table of Contents), statutory references, verifiedOn badge, and related articles.
  - Footer: Statutory disclaimers, editorial policy, privacy statement, GitHub repository link, network links.

## 4. Source & Citation Rigor
- **Decision**: Every regulatory claim (RBI circulars, Acts of Parliament, court judgments, tax sections) is anchored to official legal publications with exact circular numbers, dates, and official URLs.
- **Unverified Backlog**: Any speculative, disputed, or non-statutory claim is placed in `content/data/UNVERIFIED.md` and prohibited from being presented as verified fact.
