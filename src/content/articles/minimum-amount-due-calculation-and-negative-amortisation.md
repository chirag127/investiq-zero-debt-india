---
title: "Minimum Amount Due (MAD) Calculation Mechanics & Preventing Negative Amortisation"
description: "How Indian commercial banks compute Minimum Amount Due across principal, finance charges, and 18% GST, and why paying MAD triggers multi-decade repayment traps."
category: "credit-cards"
tags: ["minimum-amount-due", "mad-calculation", "negative-amortisation", "credit-card-math"]
verifiedOn: "2026-10-17"
lastUpdated: "2026-10-17"
statutoryReferences: [
  "RBI Master Direction – Credit Card and Debit Card Issuance (2022)",
  "Central Goods and Services Tax Act 2017"
]
readingTime: "11 min read"
primaryTakeaway: "Indian bank MAD formulas are calibrated specifically to recover 100% of accrued monthly finance charges and 18% GST before allocating a tiny fraction (1% to 5%) toward principal reduction."
riskWarning: "Paying even ₹1 less than the statutory Minimum Amount Due triggers late payment charges and immediate DPD 30 delinquency reporting to TransUnion CIBIL."
---

## Executive Overview {#overview}

On every monthly credit card statement generated in India, two figures dominate the billing header: the **Total Amount Due (TAD)** and the **Minimum Amount Due (MAD)**.

To a stressed consumer facing tight monthly cash flows, paying the MAD (often just ₹2,500 on a ₹50,000 statement) seems like a manageable compromise.

However, the mathematical formula underpinning the Minimum Amount Due is engineered to maximize bank interest revenue while keeping the account technically performing. Understanding how MAD is computed—and how it borders on **negative amortisation**—is essential for any borrower seeking debt freedom.

---

## Statutory Framework & Regulatory Formulas {#statutory-framework}

Prior to regulatory intervention, several credit card issuers formulated MAD such that minimum payments failed even to cover accrued interest, causing balances to grow despite on-time payments.

To eliminate this predatory dynamic, the **Reserve Bank of India (RBI)** revised the Master Directions on Credit Cards, mandating that **Minimum Amount Due must never result in negative amortisation**:

### The Standard Indian Bank MAD Formula

Across major Indian card issuers (HDFC Bank, SBI Cards, ICICI Bank, Axis Bank), MAD is computed as:

```
MAD = Maximum of:
  A) 5% of Total Statement Balance (inclusive of all charges)
  OR
  B) [100% of Total EMI Installments billed in month]
     + [100% of all Finance Charges / Interest accrued]
     + [100% of all Fees, Penalties & 18% GST]
     + [100% of any Overlimit Amount]
     + [1% of the Remaining Net Principal Outstanding]
  Subject to an absolute statutory floor of ₹200 – ₹500.
```

By ensuring that Formula (B) recovers 100% of interest, fees, and GST plus at least 1% of principal, the RBI ensures that the principal balance declines each cycle. However, a 1% monthly principal reduction means that debt elimination takes decades.

---

## Worked Numerical Decomposition {#worked-analysis}

Consider a cardholder with an unpaid balance of **₹1,20,000** at a monthly finance rate of **3.60% (43.2% APR)**:

```
Opening Principal: ₹1,20,000
Monthly Interest: ₹1,20,000 × 3.60% = ₹4,320
18% GST on Interest: ₹4,320 × 0.18 = ₹777.60
Total Monthly Charges: ₹4,320 + ₹777.60 = ₹5,097.60

Formula A (5% Rule): 5% of (₹1,20,000 + ₹5,097.60) = ₹6,254.88
Formula B (Charges + 1% Principal):
  ₹5,097.60 (Charges) + ₹1,200 (1% of ₹1.2L) = ₹6,297.60
```

The bank bills the higher of the two formulas: **₹6,298**.

### Decomposition of the ₹6,298 Payment:

```
1. Goes to Finance Charges (Interest): ₹4,320.00 (68.6%)
2. Goes to Government (18% GST):      ₹777.60 (12.3%)
3. Goes to Actual Principal Reduction: ₹1,200.40 (19.1%)
```

Over **80.9% of the borrower's payment** is consumed by interest and taxes. Only ₹1,200 actually reduces the ₹1.2 lakh liability.

In the subsequent month, interest will accrue on the remaining ₹1,18,800. If the borrower continues paying only the MAD:
- It will take **158 Months (over 13 years)** to clear the debt.
- The borrower will pay over **₹1,78,000 in pure interest and GST** on a ₹1,20,000 purchase.

---

## Actionable Borrower Checklist {#actionable-checklist}

- [ ] **Locate Formula B Breakdown:** Inspect your card statement to see the split between finance charges, taxes, and principal reduction.
- [ ] **Pay MAD Plus a Fixed Rupee Adder:** If unable to clear the full bill, pay MAD plus an extra fixed ₹3,000 to ₹5,000; this surplus flows 100% directly to principal reduction.
- [ ] **Never Use Card for New Purchases:** Every new transaction immediately attracts daily interest without an interest-free window when a balance is revolving.
- [ ] **Set Auto-Debit for Total Amount Due:** If financially viable, configure bank standing instructions for "Total Amount Due" rather than "Minimum Amount Due."
- [ ] **Explore In-App EMI Conversion:** Check if the transaction can be converted to a 6-month or 12-month merchant EMI at 14% interest to stop the 43.2% compounding.

---

## Common Pitfalls & Non-Compliances {#common-pitfalls}

1. **Believing MAD Extinguishes Debt in Reasonable Time:** MAD is mathematically structured to stretch debt across 10–15 years.
2. **Missing MAD by Minor Sums:** Paying ₹4,900 when MAD is ₹5,000 still results in the bank treating the account as past due, levying late payment charges, and damaging CIBIL scores.
3. **Overlimit Penalties Adding to MAD:** Exceeding your credit limit causes the entire overlimit excess to be added to that month’s MAD immediately.
