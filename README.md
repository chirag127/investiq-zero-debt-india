# ZeroDebt India — Debt Avalanche, Recovery Rights & Credit Repair

> **Site 03 of 60 in the InvestiQ India Network**  
> Public URL: [https://chirag127.github.io/investiq-zero-debt-india/](https://chirag127.github.io/investiq-zero-debt-india/)  
> Canonical Focus: Debt triage, credit-card APR compounding, avalanche vs snowball repayment, settlement & consolidation traps, credit bureau disputes, RBI-regulated recovery conduct, and borrower grievance routes.

---

## 1. Overview & Architecture

ZeroDebt India is a high-performance, accessible, standalone financial portal designed to empower Indian retail borrowers with mathematical rigor and primary legal protections.

### Key Capabilities:
1. **Multi-Loan Avalanche & Snowball Simulator (`/tools/debt-payoff-calculator/`):**
   - Dynamic multi-loan amortization scheduler comparing interest savings between highest APR (Avalanche) and smallest balance (Snowball).
2. **Credit Card Interest Cost & Payoff Calculator (`/tools/credit-card-interest-calculator/`):**
   - Computes 42%–52% APR compounding, loss of interest-free period, 18% GST drag, and negative amortization risks under the Minimum Amount Due (MAD) rule.
3. **RBI Complaint Drafter & Delay Compensation Checker (`/tools/rbi-complaint-checker/`):**
   - Evaluates illegal recovery agent calling hours (outside 8 AM – 7 PM), calculates statutory ₹100/day delay compensation under circular RBI/2023-24/72, and generates formal grievance notices.
4. **Peer-Reviewed Statutory Library (`/articles/`):**
   - 15 comprehensive guides referencing the SARFAESI Act 2002, Negotiable Instruments Act 1881, Payment and Settlement Systems Act 2007, Income Tax Act 1961, and RBI Master Directions.

---

## 2. Zero-Tracker Privacy Architecture

ZeroDebt India operates under a strict client-side data sovereignty model:
- **0 Trackers / Telemetry:** Exactly zero Google Analytics, Meta Pixels, or third-party cookies.
- **100% In-Browser Execution:** Financial math runs exclusively in client TypeScript/JavaScript. No user balances or grievance letters are transmitted to any server.
- **Automated Verification:** Verified by `scripts/privacy-scanner.js` during CI build.

---

## 3. Technology Stack

- **Framework:** Astro 5.x (`output: 'static'`)
- **Language:** TypeScript 5.7 (Strict Mode)
- **Styling:** Custom Vanilla CSS Design System with CSS Tokens, Dark/Light theme toggle, and 3-column / 2-sidebar responsive grid.
- **Testing:** Vitest test suite with 100% passing tests for `src/lib/finance-math.ts`.
- **Deployment:** GitHub Pages via official GitHub Actions workflow (`.github/workflows/deploy.yml`).

---

## 4. Local Development & Testing

```bash
# Install dependencies
npm install

# Run financial math unit tests
npm test

# Run static zero-tracking privacy audit
npm run privacy-scan

# Build static production bundle
npm run build

# Start local dev server
npm run dev
```

---

## 5. Statutory Sources & Regulatory Grounding

All articles and calculations reference primary Indian official documents:
- **RBI/2023-24/72:** ₹100/day credit bureau delay compensation framework.
- **RBI/2022-23/92:** Credit Card and Debit Card Issuance and Conduct Directions 2022.
- **Master Direction – Fair Practices Code for Lenders:** Mandatory 8:00 AM – 7:00 PM recovery calling window.
- **SARFAESI Act, 2002:** Section 13(2) 60-day demand notices and Section 17 DRT appeals.
- **Section 138 NI Act & Section 25 PSS Act:** Legal cheque and eNACH dishonour frameworks.
- **Income Tax Act, 1961:** Sections 269SS and 269T cash loan restrictions (₹20,000 threshold).
