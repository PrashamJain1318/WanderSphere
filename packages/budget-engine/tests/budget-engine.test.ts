import { describe, expect, it } from 'vitest';
import { calculateEstimatedBudget } from '../src';

describe('BudgetEngine', () => {
  it('should deterministically calculate a budget for 1 traveler on a 5-day standard trip in INR', () => {
    const result = calculateEstimatedBudget({
      numberOfTravelers: 1,
      durationDays: 5,
      travelStyle: 'STANDARD',
      currency: 'INR',
      baseDailyRatePerPerson: 2000,
      includeBufferPercentage: 10,
    });

    // base rate = 2000 * 1.6 = 3200 per day
    // 5 days * 1 traveler = 16000 base
    // buffer 10% = 1600
    // total = 17600
    expect(result.currency).toBe('INR');
    expect(result.dailyPerPersonEstimate).toBe(3200);
    expect(result.contingencyBuffer).toBe(1600);
    expect(result.totalEstimate).toBe(17600);
    expect(result.perPersonEstimate).toBe(17600);
    expect(result.categoryBreakdowns).toHaveLength(5);

    const accommodation = result.categoryBreakdowns.find((c) => c.category === 'ACCOMMODATION');
    expect(accommodation).toBeDefined();
    expect(accommodation?.percentage).toBe(35);
    expect(accommodation?.amount).toBe(5600); // 35% of 16000
  });

  it('should reject invalid input where travelers count is 0', () => {
    expect(() =>
      calculateEstimatedBudget({
        numberOfTravelers: 0,
        durationDays: 5,
        travelStyle: 'BUDGET',
        currency: 'INR',
        baseDailyRatePerPerson: 1000,
        includeBufferPercentage: 10,
      }),
    ).toThrow();
  });
});
