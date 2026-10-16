# Project Plan: ZeroDebt India (`investiq-zero-debt-india`)

## 1. Brand & Scope
- **Brand**: InvestiQ India
- **Public Title**: ZeroDebt India — Debt Avalanche, Recovery Rights & Credit Repair
- **Repository**: `investiq-zero-debt-india`
- **Owner**: `chirag127`
- **Base Path**: `/investiq-zero-debt-india/`
- **Canonical Focus**: Debt triage, credit-card APR compounding, avalanche vs snowball repayment, settlement & consolidation traps, credit bureau disputes, RBI-regulated recovery conduct, and borrower grievance routes.

## 2. Interactive Client-Side Tools
1. **Multi-Loan Avalanche / Snowball Simulator** (`/tools/debt-payoff-calculator/`):
   - Multi-loan dynamic list (Loan name, balance, interest rate %, minimum monthly payment)
   - Extra monthly budget input
   - Strategy switcher: Avalanche (highest APR first) vs Snowball (lowest balance first)
   - Month-by-month amortisation simulation, total interest paid comparison, debt-free date comparison, interest saved metric, interactive payment breakdown chart/table.
2. **Credit Card Interest Cost & Payoff Calculator** (`/tools/credit-card-interest-calculator/`):
   - Card balance, APR % (monthly & annual), Minimum Amount Due (MAD) rule (% or fixed min), extra monthly payment.
   - Calculates months to debt freedom if paying only MAD vs paying fixed sum.
   - Visualises total compound interest penalty, GST on financial charges (18%), and unbilled cycle compounding warnings.
3. **RBI Complaint Preparation Checklist & Letter Generator** (`/tools/rbi-complaint-checker/`):
   - Interactive diagnostic checklist for recovery agent violations (timing 8am-7pm, abusive language, third-party disclosure, improper ID) and credit bureau delays (>30 days).
   - Generates formatted legal grievance representation letter ready for Nodal Grievance Officer and RBI CMS Portal (RB-IOS 2021).
   - Computes statutory delay compensation eligibility (₹100/day under RBI/2023-24/72).

## 3. Architecture & Core Stack
- **Framework**: Astro 5.x (static output, TypeScript strict mode)
- **CSS**: Pure Vanilla CSS design system with CSS custom properties (tokens), dark/light mode toggle, high-contrast accessible typography (system font stack with Inter-fallback styling), responsive grid with left and right sidebars on desktop.
- **Search**: Fast client-side static index search / Pagefind-compatible search interface.
- **Content Engine**: Astro Content Collections (`src/content.config.ts` or `src/content/config.ts`) with Zod schemas verifying title, description, category, tags, verifiedOn, legalReferences, estimatedReadTime, etc.
- **Testing**: Vitest for unit tests on `src/lib/finance-math.ts` with hand-calculated normal, edge, and invalid cases.
- **Auditing**: `scripts/privacy-scanner.js` confirming 0 trackers, 0 cookies, 0 external analytics, 0 data exfiltration.
- **Deployment**: GitHub Pages workflow (`.github/workflows/deploy.yml`) using `actions/deploy-pages`.

## 4. Editorial Plan (15+ Deep Technical Articles)
1. `debt-avalanche-vs-snowball-guide.md`: Quantitative mathematical comparison of avalanche (highest APR) vs snowball (behavioral momentum) with Indian loan cases.
2. `credit-card-apr-revolving-debt-trap.md`: How Indian credit card 42-52% annualized APR works, loss of interest-free grace period, and 18% GST compounding.
3. `rbi-fair-practices-code-recovery-agents.md`: Comprehensive breakdown of RBI recovery agent guidelines (calling window 8am-7pm, privacy violations, harassment remedies).
4. `cibil-credit-bureau-dispute-30-day-rule.md`: RBI circular RBI/2023-24/72: 30-day resolution timeline, ₹100/day delay compensation claim process, and 21+9 day split.
5. `loan-settlement-haircut-cibil-score-impact.md`: Compromise settlements, OTS, haircut mechanics, DPD history, and the 7-year "Settled" tag vs "Closed" status.
6. `sarfaesi-act-borrower-rights-timeline.md`: Secured loans under SARFAESI Act 2002: Section 13(2) 60-day notice, Section 13(3A) representation, Section 13(4) possession, and DRT Section 17 appeal.
7. `cheque-bounce-section-138-ni-act-and-enach.md`: Legal consequences of bounced cheques under Sec 138 NI Act vs failed eNACH/ECS mandates under Sec 25 PSS Act 2007.
8. `rbi-integrated-ombudsman-scheme-guide.md`: Complete step-by-step guide to escalating banking grievances to the RBI Ombudsman under RB-IOS 2021 (₹20L direct + ₹1L mental agony compensation).
9. `personal-loan-balance-transfer-prepayment-penalty.md`: RBI rules barring prepayment/foreclosure penalties on floating-rate individual loans vs fixed-rate penalty math.
10. `debt-consolidation-loans-pros-and-pitfalls.md`: When debt consolidation works in India vs when consolidation loans trap borrowers with longer tenures and higher cumulative interest.
11. `minimum-amount-due-calculation-and-negative-amortisation.md`: How Indian banks compute MAD (principal + 100% interest + GST), why MAD keeps borrowers in debt for decades.
12. `hardship-restructuring-moratorium-rights.md`: How to approach banks for loan restructuring, tenure extension, EMI reduction, or interest moratorium in genuine medical/unemployment distress.
13. `cash-loan-regulations-section-269ss-269t.md`: Income Tax Act Sections 269SS, 269T, and 269ST limits (₹20,000 cash loan / repayment ceiling and 100% penalties).
14. `cleaning-credit-report-removing-settled-status.md`: Practical guide to converting a "Settled" status to "Closed" by paying the waived haircut amount and securing a clean NOC.
15. `digital-lending-apps-illegal-harassment-and-rbi-sachet.md`: RBI Digital Lending Directions (DLAs/LSPs), unmasking illegal predatory Chinese lending apps, and reporting to the RBI Sachet portal.

## 5. Site Pages & Architecture
- Home (`/`)
- Guide / Article Library (`/articles/`)
- Individual Articles (`/articles/[slug]/`)
- Interactive Tools Hub (`/tools/`)
  - Debt Payoff Simulator (`/tools/debt-payoff-calculator/`)
  - Credit Card Interest Calculator (`/tools/credit-card-interest-calculator/`)
  - RBI Complaint Checker (`/tools/rbi-complaint-checker/`)
- Glossary (`/glossary/`)
- Source Registry & Bibliography (`/sources/`)
- FAQ (`/faq/`)
- Editorial Policy (`/editorial-policy/`)
- Disclaimer & Educational Notice (`/disclaimer/`)
- Privacy Policy (`/privacy/`)
- Corrections & Report an Error (`/corrections/`)
- 404 Page (`/404/`)
