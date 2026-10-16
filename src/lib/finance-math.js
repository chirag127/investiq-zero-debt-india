/**
 * ZeroDebt India — Compiled Financial Math Engine (ES Module)
 */

export function calculateMonthlyEMI(principal, annualRatePct, tenureMonths) {
  if (principal <= 0 || tenureMonths <= 0) return 0;
  if (annualRatePct <= 0) return Math.round((principal / tenureMonths) * 100) / 100;

  const r = annualRatePct / (12 * 100);
  const factor = Math.pow(1 + r, tenureMonths);
  const emi = (principal * r * factor) / (factor - 1);
  return Math.round(emi * 100) / 100;
}

export function simulateMultiLoanPayoff(loans, extraMonthlyBudget, strategy, maxMonths = 360) {
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

  const activeLoans = loans
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
  const breakdown = [];

  while (activeLoans.some(l => l.balance > 0.01) && month < maxMonths) {
    month++;
    let monthInterest = 0;
    let monthPrincipal = 0;

    for (const loan of activeLoans) {
      if (loan.balance > 0) {
        const monthlyRate = (loan.interestRate / 100) / 12;
        const interest = Math.round(loan.balance * monthlyRate * 100) / 100;
        loan.balance += interest;
        monthInterest += interest;
      }
    }
    totalInterest += monthInterest;

    let liberatedCash = 0;
    for (const loan of activeLoans) {
      if (loan.balance > 0) {
        const payAmount = Math.min(loan.minPayment, loan.balance);
        loan.balance -= payAmount;
        monthPrincipal += payAmount;
        totalPaid += payAmount;

        if (loan.minPayment > payAmount) {
          liberatedCash += (loan.minPayment - payAmount);
        }
      } else {
        liberatedCash += loan.minPayment;
      }
    }

    let availableExtra = extraMonthlyBudget + liberatedCash;

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

export function simulateCreditCardPayoff(
  balance,
  annualAprPct,
  paymentMode,
  fixedPaymentAmount = 0,
  madPercentage = 5,
  minMadFloor = 500,
  maxMonths = 360
) {
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
  const schedule = [];

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
    const gst = interest * 0.18;
    const charges = interest + gst;

    totalInterest += interest;
    totalGst += gst;

    let payment = 0;
    if (paymentMode === 'mad_only') {
      const standardPct = (startBal + charges) * (madPercentage / 100);
      const feePlusPrincipal = charges + (startBal * 0.01);
      payment = Math.max(standardPct, feePlusPrincipal, minMadFloor);
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

export function calculateRbiDisputeCompensation(daysElapsed) {
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
