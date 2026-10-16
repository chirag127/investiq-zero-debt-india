/**
 * ZeroDebt India — Financial Math Engine
 * Reusable, rigorously tested mathematical models for debt amortization,
 * multi-loan avalanche/snowball payoff, and credit card interest compounding.
 * All functions operate client-side with zero external dependencies.
 */

export interface LoanInput {
  id: string;
  name: string;
  balance: number;
  interestRate: number; // Annual Percentage Rate (APR) in % (e.g. 14.5)
  minPayment: number;   // Contractual minimum monthly payment / EMI
}

export interface AmortizationMonth {
  month: number;
  balanceStart: number;
  interestCharged: number;
  principalPaid: number;
  totalPayment: number;
  balanceEnd: number;
}

export interface PayoffStrategyResult {
  strategy: 'avalanche' | 'snowball';
  totalMonths: number;
  totalInterestPaid: number;
  totalAmountPaid: number;
  debtFreeDateMonths: number;
  monthlyBreakdown: {
    month: number;
    remainingTotalBalance: number;
    interestPaidTotal: number;
    principalPaidTotal: number;
    loanSnapshots: {
      id: string;
      balance: number;
      paid: number;
    }[];
  }[];
}

export interface CreditCardPayoffScenario {
  monthsToPayoff: number;
  totalInterestPaid: number;
  totalGstPaid: number; // 18% GST on financial charges
  totalPaid: number;
  isPerpetual: boolean; // True if payment is less than monthly interest accrued (negative amortization)
  monthlySchedule: {
    month: number;
    startBalance: number;
    interestAccrued: number;
    gstAccrued: number;
    paymentMade: number;
    endBalance: number;
  }[];
}

/**
 * Standard Monthly EMI Calculation
 * Formula: E = [P * r * (1 + r)^n] / [(1 + r)^n - 1]
 * where r = annualRate / (12 * 100), n = tenure in months
 */
export function calculateMonthlyEMI(principal: number, annualRatePct: number, tenureMonths: number): number {
  if (principal <= 0 || tenureMonths <= 0) return 0;
  if (annualRatePct <= 0) return Math.round((principal / tenureMonths) * 100) / 100;

  const r = annualRatePct / (12 * 100);
  const factor = Math.pow(1 + r, tenureMonths);
  const emi = (principal * r * factor) / (factor - 1);
  return Math.round(emi * 100) / 100;
}

/**
 * Multi-Loan Payoff Simulation (Avalanche vs Snowball)
 * - Avalanche: Extra payment directed to highest APR loan first (mathematically optimal interest saver)
 * - Snowball: Extra payment directed to lowest balance loan first (behavioral momentum / quick wins)
 */
export function simulateMultiLoanPayoff(
  loans: LoanInput[],
  extraMonthlyBudget: number,
  strategy: 'avalanche' | 'snowball',
  maxMonths: number = 360 // 30-year safety cap
): PayoffStrategyResult {
  if (!loans || loans.length === 0) {
    return {
      strategy,
      totalMonths: 0,
      totalInterestPaid: 0,
      totalAmountPaid: 0,
      debtFreeDateMonths: 0,
      monthlyBreakdown: []
    };
  }

  // Clone active loans
  interface ActiveLoan {
    id: string;
    name: string;
    balance: number;
    interestRate: number;
    minPayment: number;
  }

  const activeLoans: ActiveLoan[] = loans
    .filter(l => l.balance > 0)
    .map(l => ({ ...l, balance: Math.round(l.balance * 100) / 100 }));

  if (activeLoans.length === 0) {
    return {
      strategy,
      totalMonths: 0,
      totalInterestPaid: 0,
      totalAmountPaid: 0,
      debtFreeDateMonths: 0,
      monthlyBreakdown: []
    };
  }

  let totalInterest = 0;
  let totalPaid = 0;
  let month = 0;
  const breakdown: PayoffStrategyResult['monthlyBreakdown'] = [];

  while (activeLoans.some(l => l.balance > 0.01) && month < maxMonths) {
    month++;
    let monthInterest = 0;
    let monthPrincipal = 0;

    // 1. Accrue monthly interest on each loan
    for (const loan of activeLoans) {
      if (loan.balance > 0) {
        const monthlyRate = (loan.interestRate / 100) / 12;
        const interest = Math.round(loan.balance * monthlyRate * 100) / 100;
        loan.balance += interest;
        monthInterest += interest;
      }
    }
    totalInterest += monthInterest;

    // 2. Pay minimums across all loans with remaining balance
    let liberatedCash = 0;
    for (const loan of activeLoans) {
      if (loan.balance > 0) {
        const payAmount = Math.min(loan.minPayment, loan.balance);
        loan.balance -= payAmount;
        monthPrincipal += payAmount;
        totalPaid += payAmount;

        // If min payment was more than remaining balance, carry excess over
        if (loan.minPayment > payAmount) {
          liberatedCash += (loan.minPayment - payAmount);
        }
      } else {
        // Loan is already paid off, its min payment is freed up for accelerated payoff
        liberatedCash += loan.minPayment;
      }
    }

    // 3. Apply Extra Monthly Budget + liberated cash towards target loan
    let availableExtra = extraMonthlyBudget + liberatedCash;

    // Sort loans according to strategy:
    // Avalanche: highest APR first, then lowest balance
    // Snowball: lowest balance first, then highest APR
    const openLoans = activeLoans.filter(l => l.balance > 0.01);
    if (strategy === 'avalanche') {
      openLoans.sort((a, b) => b.interestRate - a.interestRate || a.balance - b.balance);
    } else {
      openLoans.sort((a, b) => a.balance - b.balance || b.interestRate - a.interestRate);
    }

    for (const target of openLoans) {
      if (availableExtra <= 0) break;
      const extraPay = Math.min(availableExtra, target.balance);
      target.balance -= extraPay;
      monthPrincipal += extraPay;
      totalPaid += extraPay;
      availableExtra -= extraPay;
    }

    // Snapshot
    const remainingTotal = activeLoans.reduce((acc, cur) => acc + (cur.balance > 0 ? cur.balance : 0), 0);
    breakdown.push({
      month,
      remainingTotalBalance: Math.round(remainingTotal * 100) / 100,
      interestPaidTotal: Math.round(monthInterest * 100) / 100,
      principalPaidTotal: Math.round(monthPrincipal * 100) / 100,
      loanSnapshots: activeLoans.map(l => ({
        id: l.id,
        balance: Math.max(0, Math.round(l.balance * 100) / 100),
        paid: 0
      }))
    });

    if (remainingTotal <= 0.01) {
      break;
    }
  }

  return {
    strategy,
    totalMonths: month,
    totalInterestPaid: Math.round(totalInterest * 100) / 100,
    totalAmountPaid: Math.round(totalPaid * 100) / 100,
    debtFreeDateMonths: month,
    monthlyBreakdown: breakdown
  };
}

/**
 * Credit Card Interest & Payoff Simulator
 * Handles Indian credit card mechanics:
 * - Typical APR 36% - 52.86% (3% - 3.75% per month)
 * - 18% GST on all finance charges and processing fees
 * - Minimum Amount Due (MAD) rule: Typically 5% of balance or (finance charges + GST + 1% principal), min ₹200-500.
 * - Detects negative amortization (if payments fail to cover interest + GST).
 */
export function simulateCreditCardPayoff(
  balance: number,
  annualAprPct: number,
  paymentMode: 'mad_only' | 'fixed_amount',
  fixedPaymentAmount: number = 0,
  madPercentage: number = 5,
  minMadFloor: number = 500,
  maxMonths: number = 360
): CreditCardPayoffScenario {
  if (balance <= 0) {
    return {
      monthsToPayoff: 0,
      totalInterestPaid: 0,
      totalGstPaid: 0,
      totalPaid: 0,
      isPerpetual: false,
      monthlySchedule: []
    };
  }

  const monthlyRate = (annualAprPct / 100) / 12;
  let currentBalance = balance;
  let totalInterest = 0;
  let totalGst = 0;
  let totalPaid = 0;
  let month = 0;
  const schedule: CreditCardPayoffScenario['monthlySchedule'] = [];

  // Initial check for perpetual negative amortization
  const firstMonthInterest = balance * monthlyRate;
  const firstMonthGst = firstMonthInterest * 0.18;
  const firstMonthMinCharge = firstMonthInterest + firstMonthGst;

  if (paymentMode === 'fixed_amount' && fixedPaymentAmount <= firstMonthMinCharge) {
    return {
      monthsToPayoff: maxMonths,
      totalInterestPaid: 0,
      totalGstPaid: 0,
      totalPaid: 0,
      isPerpetual: true,
      monthlySchedule: []
    };
  }

  while (currentBalance > 1 && month < maxMonths) {
    month++;
    const startBal = currentBalance;
    const interest = startBal * monthlyRate;
    const gst = interest * 0.18; // 18% GST under Indian Goods & Services Tax on financial charges
    const charges = interest + gst;

    totalInterest += interest;
    totalGst += gst;

    // Calculate Payment for this month
    let payment = 0;
    if (paymentMode === 'mad_only') {
      // Standard Indian MAD: max of (5% of balance, or charges + 1% balance, subject to floor)
      const standardPct = (startBal + charges) * (madPercentage / 100);
      const feePlusPrincipal = charges + (startBal * 0.01);
      payment = Math.max(standardPct, feePlusPrincipal, minMadFloor);
      // Cannot pay more than balance + charges
      payment = Math.min(payment, startBal + charges);
    } else {
      payment = Math.min(fixedPaymentAmount, startBal + charges);
    }

    if (payment <= charges && paymentMode === 'fixed_amount') {
      return {
        monthsToPayoff: maxMonths,
        totalInterestPaid: Math.round(totalInterest),
        totalGstPaid: Math.round(totalGst),
        totalPaid: Math.round(totalPaid),
        isPerpetual: true,
        monthlySchedule: schedule
      };
    }

    currentBalance = (startBal + charges) - payment;
    totalPaid += payment;

    schedule.push({
      month,
      startBalance: Math.round(startBal * 100) / 100,
      interestAccrued: Math.round(interest * 100) / 100,
      gstAccrued: Math.round(gst * 100) / 100,
      paymentMade: Math.round(payment * 100) / 100,
      endBalance: Math.max(0, Math.round(currentBalance * 100) / 100)
    });

    if (currentBalance <= 1) {
      break;
    }
  }

  return {
    monthsToPayoff: month,
    totalInterestPaid: Math.round(totalInterest * 100) / 100,
    totalGstPaid: Math.round(totalGst * 100) / 100,
    totalPaid: Math.round(totalPaid * 100) / 100,
    isPerpetual: month >= maxMonths,
    monthlySchedule: schedule
  };
}

/**
 * RBI Statutory Compensation Calculator (Circular RBI/2023-24/72)
 * ₹100 per calendar day beyond the 30-day resolution timeline.
 */
export function calculateRbiDisputeCompensation(daysElapsed: number): {
  statutoryLimitDays: number;
  delayedDays: number;
  dailyRate: number;
  totalCompensationRupees: number;
  isEligible: boolean;
} {
  const statutoryLimitDays = 30;
  const delayedDays = Math.max(0, Math.floor(daysElapsed) - statutoryLimitDays);
  const dailyRate = 100;
  const totalCompensationRupees = delayedDays * dailyRate;

  return {
    statutoryLimitDays,
    delayedDays,
    dailyRate,
    totalCompensationRupees,
    isEligible: delayedDays > 0
  };
}
