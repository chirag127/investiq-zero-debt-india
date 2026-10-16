import { describe, it, expect } from 'vitest';
import {
  calculateMonthlyEMI,
  simulateMultiLoanPayoff,
  simulateCreditCardPayoff,
  calculateRbiDisputeCompensation,
  type LoanInput
} from './finance-math';

describe('calculateMonthlyEMI', () => {
  it('calculates accurate EMI for standard Indian personal loan (₹5,00,000 at 12% for 3 years)', () => {
    // Standard EMI formula: 500000 * 0.01 * (1.01)^36 / ((1.01)^36 - 1) = 16,607.15
    const emi = calculateMonthlyEMI(500000, 12, 36);
    expect(emi).toBeCloseTo(16607.15, 1);
  });

  it('handles edge case of 0% interest', () => {
    const emi = calculateMonthlyEMI(120000, 0, 12);
    expect(emi).toBe(10000);
  });

  it('handles invalid inputs gracefully', () => {
    expect(calculateMonthlyEMI(0, 10, 12)).toBe(0);
    expect(calculateMonthlyEMI(100000, 10, 0)).toBe(0);
    expect(calculateMonthlyEMI(-50000, 10, 12)).toBe(0);
  });
});

describe('simulateMultiLoanPayoff (Avalanche vs Snowball)', () => {
  const sampleLoans: LoanInput[] = [
    { id: '1', name: 'Credit Card Outstanding', balance: 50000, interestRate: 42, minPayment: 2500 },
    { id: '2', name: 'Instant App Personal Loan', balance: 100000, interestRate: 18, minPayment: 3500 },
    { id: '3', name: 'Car Loan', balance: 300000, interestRate: 9, minPayment: 7500 }
  ];

  it('proves Avalanche saves more total interest than Snowball on high-APR loans', () => {
    const extraBudget = 5000;
    const avalancheResult = simulateMultiLoanPayoff(sampleLoans, extraBudget, 'avalanche');
    const snowballResult = simulateMultiLoanPayoff(sampleLoans, extraBudget, 'snowball');

    expect(avalancheResult.totalMonths).toBeGreaterThan(0);
    expect(snowballResult.totalMonths).toBeGreaterThan(0);
    // Avalanche mathematical optimality: total interest paid in avalanche must be <= snowball
    expect(avalancheResult.totalInterestPaid).toBeLessThanOrEqual(snowballResult.totalInterestPaid);
  });

  it('handles edge case of single loan with zero extra payment', () => {
    const singleLoan: LoanInput[] = [
      { id: '1', name: 'Loan A', balance: 10000, interestRate: 12, minPayment: 1000 }
    ];
    const res = simulateMultiLoanPayoff(singleLoan, 0, 'avalanche');
    expect(res.totalMonths).toBeGreaterThan(0);
    expect(res.totalInterestPaid).toBeGreaterThan(0);
  });

  it('handles empty or zero-balance loan arrays', () => {
    const res = simulateMultiLoanPayoff([], 5000, 'avalanche');
    expect(res.totalMonths).toBe(0);
    expect(res.totalInterestPaid).toBe(0);
  });
});

describe('simulateCreditCardPayoff', () => {
  it('calculates accurate payoff timeline and GST impact for credit card revolving balance', () => {
    const balance = 100000;
    const apr = 42; // 3.5% monthly
    const fixedPayment = 10000;

    const res = simulateCreditCardPayoff(balance, apr, 'fixed_amount', fixedPayment);
    expect(res.isPerpetual).toBe(false);
    expect(res.monthsToPayoff).toBeGreaterThan(10);
    expect(res.monthsToPayoff).toBeLessThan(20);
    expect(res.totalGstPaid).toBeGreaterThan(0);
    expect(res.totalInterestPaid).toBeGreaterThan(0);
  });

  it('detects negative amortization / perpetual debt if payment is too low', () => {
    const balance = 100000;
    const apr = 42; // monthly interest is 3,500 + GST 630 = 4,130
    const fixedPayment = 2000; // less than interest!

    const res = simulateCreditCardPayoff(balance, apr, 'fixed_amount', fixedPayment);
    expect(res.isPerpetual).toBe(true);
  });

  it('handles 0 balance safely', () => {
    const res = simulateCreditCardPayoff(0, 42, 'mad_only');
    expect(res.monthsToPayoff).toBe(0);
    expect(res.totalPaid).toBe(0);
  });
});

describe('calculateRbiDisputeCompensation', () => {
  it('returns 0 compensation within the statutory 30-day window', () => {
    const comp20 = calculateRbiDisputeCompensation(20);
    expect(comp20.isEligible).toBe(false);
    expect(comp20.totalCompensationRupees).toBe(0);

    const comp30 = calculateRbiDisputeCompensation(30);
    expect(comp30.isEligible).toBe(false);
    expect(comp30.totalCompensationRupees).toBe(0);
  });

  it('calculates ₹100 per day compensation on day 31 and beyond under RBI/2023-24/72', () => {
    const comp31 = calculateRbiDisputeCompensation(31);
    expect(comp31.isEligible).toBe(true);
    expect(comp31.delayedDays).toBe(1);
    expect(comp31.totalCompensationRupees).toBe(100);

    const comp45 = calculateRbiDisputeCompensation(45);
    expect(comp45.isEligible).toBe(true);
    expect(comp45.delayedDays).toBe(15);
    expect(comp45.totalCompensationRupees).toBe(1500);
  });
});
