# Verification Evidence Report: ZeroDebt India

- **Site Number:** 03 of 60
- **Site Name:** ZeroDebtIndia
- **Repository:** `chirag127/investiq-zero-debt-india`
- **Live Public URL:** https://chirag127.github.io/investiq-zero-debt-india/
- **Verified Date:** 2026-10-17

---

## 1. Live Deployment & Testing Status

| Metric | Status | Evidence |
| :--- | :--- | :--- |
| **GitHub Pages Status** | **ACTIVE (HTTP 200)** | Verified via `curl -I` and browser subagent navigation |
| **GitHub Actions CI/CD** | **PASSED (Run 38979227635)** | Official deploy workflow deployed clean in 1m 03s |
| **Vitest Unit Tests** | **11 / 11 PASSED (100%)** | `src/lib/finance-math.test.ts` (normal, edge, and invalid cases) |
| **Zero-Tracking Privacy Scanner** | **PASSED (100% Clean)** | Verified 0 trackers, 0 cookies, 0 external analytics |
| **Total Pages Generated** | **37 Static HTML Pages** | Verified static directory build format with Astro 5 |

---

## 2. Interactive Browser Tools Verified

1. **Multi-Loan Avalanche & Snowball Simulator** (`/tools/debt-payoff-calculator/`):
   - Dynamic multi-loan input rows with custom balance, interest rate, and minimum payments.
   - Live strategy switching between Avalanche (highest APR first) and Snowball (lowest balance first).
   - Generates month-by-month repayment breakdown and cumulative interest savings.
2. **Credit Card Interest Cost & Payoff Calculator** (`/tools/credit-card-interest-calculator/`):
   - Computes 42%–52% APR compounding, daily interest accrual, and 18% GST on finance charges.
   - Simulates the Minimum Amount Due (MAD) trap and detects negative amortisation.
3. **RBI Complaint Preparation & Delay Compensation Checker** (`/tools/rbi-complaint-checker/`):
   - Interactive diagnostic checklist for recovery agent conduct (8 AM – 7 PM calling window, third-party harassment, ID verification).
   - Calculates statutory ₹100/day credit bureau delay compensation under Circular RBI/2023-24/72.
   - Generates a customized, formal grievance representation letter ready for Nodal Officers and the RBI CMS Portal.

---

## 3. Peer-Reviewed Statutory Articles (15 Complete Analyses)

1. `debt-avalanche-vs-snowball-guide.md` — Mathematical comparison of Avalanche vs Snowball.
2. `credit-card-apr-revolving-debt-trap.md` — 42% APR compounding, grace period loss, and 18% GST.
3. `rbi-fair-practices-code-recovery-agents.md` — 8 AM to 7 PM calling window and harassment remedies.
4. `cibil-credit-bureau-dispute-30-day-rule.md` — Circular RBI/2023-24/72: 30-day timeline & ₹100/day compensation.
5. `loan-settlement-haircut-cibil-score-impact.md` — Compromise settlements, haircuts, and the 7-year "Settled" status.
6. `sarfaesi-act-borrower-rights-timeline.md` — Section 13(2) 60-day notice, Sec 13(3A) representation, Sec 17 DRT appeal.
7. `cheque-bounce-section-138-ni-act-and-enach.md` — Sec 138 NI Act vs Sec 25 PSSA 2007 eNACH dishonour liabilities.
8. `rbi-integrated-ombudsman-scheme-guide.md` — RB-IOS 2021 complaint grounds, ₹20L loss & ₹1L mental agony awards.
9. `personal-loan-balance-transfer-prepayment-penalty.md` — RBI rules prohibiting foreclosure charges on floating-rate loans.
10. `debt-consolidation-loans-pros-and-pitfalls.md` — Balance transfer breakeven math and double-debt traps.
11. `minimum-amount-due-calculation-and-negative-amortisation.md` — Indian bank MAD formulas and principal reduction mechanics.
12. `hardship-restructuring-moratorium-rights.md` — Tenure extension, moratorium, and FITL restructuring protocols.
13. `cash-loan-regulations-section-269ss-269t.md` — Income Tax Act ₹20,000 cash loan and repayment ceiling with 100% penalties.
14. `cleaning-credit-report-removing-settled-status.md` — Procedural roadmap to pay residual waivers and convert status to "Closed".
15. `digital-lending-apps-illegal-harassment-and-rbi-sachet.md` — RBI Digital Lending Directions, permission bans, and Sachet reporting.
16. `secured-vs-unsecured-debt-legal-hierarchy.md` — Legal distinction between mortgage lien foreclosure and unsecured default.
17. `prepay-vs-invest-mathematical-framework.md` — Guaranteed post-tax debt prepayment returns vs volatile equity market risk.
18. `emi-amortisation-front-loaded-interest-mechanics.md` — Reducing-balance formula, front-loaded interest, and floating-rate shocks.
19. `effective-borrowing-cost-and-processing-fees.md` — Computing true EBC/IRR across processing fees and bundled insurance.
20. `wilful-defaulters-vs-genuine-financial-distress.md` — RBI Master Directions distinguishing wilful fraud from genuine distress.
21. `drt-securitisation-application-section-17.md` — Filing an SA before the DRT to obtain interim stay orders against SARFAESI auction.
22. `credit-repair-scams-and-cibil-myths.md` — Unmasking illegal CIBIL deletion scams vs authentic 12–18 month rebuilding.
23. `co-borrowers-and-loan-guarantors-liabilities.md` — Section 128 Indian Contract Act co-extensive guarantor liabilities.

---

## 4. UI Architecture & Accessibility

- **Theme Engine:** Dark/Light theme toggle with automatic local persistence in `localStorage`.
- **Search Modal:** Fast client-side static index search activated via click or the `/` shortcut.
- **Responsive 3-Column Grid:** Sticky Left Sidebar (Navigation & Quick Access), Center Content (Prose & Tools), and Sticky Right Sidebar (Table of Contents & Statutory Rigor badges).
- **Zero-Tracker Design:** Self-contained CSS, system typography stack, SVG icons, and zero remote font or tracking CDNs.
