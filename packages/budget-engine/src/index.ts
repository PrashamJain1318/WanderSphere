import {
  BudgetEstimateInput,
  BudgetEstimateInputSchema,
  BudgetEstimateResult,
  CostCategory,
  TravelStyle,
} from './types';

export * from './types';

const STYLE_MULTIPLIERS: Record<TravelStyle, number> = {
  BUDGET: 1.0,
  STANDARD: 1.6,
  PREMIUM: 2.8,
  LUXURY: 5.0,
};

const CATEGORY_DISTRIBUTION: Record<CostCategory, number> = {
  ACCOMMODATION: 35,
  TRANSPORT: 25,
  FOOD: 20,
  ACTIVITIES: 15,
  MISCELLANEOUS: 5,
};

/**
 * Deterministically calculates estimated travel costs based on trip duration,
 * traveler count, base rates, and travel tier multipliers.
 */
export function calculateEstimatedBudget(rawInput: BudgetEstimateInput): BudgetEstimateResult {
  const input = BudgetEstimateInputSchema.parse(rawInput);

  const styleMultiplier = STYLE_MULTIPLIERS[input.travelStyle];
  const adjustedDailyPerPerson = Math.round(input.baseDailyRatePerPerson * styleMultiplier);
  const baseSubtotal = adjustedDailyPerPerson * input.durationDays * input.numberOfTravelers;

  const contingencyBuffer = Math.round(baseSubtotal * (input.includeBufferPercentage / 100));
  const totalEstimate = baseSubtotal + contingencyBuffer;
  const perPersonEstimate = Math.round(totalEstimate / input.numberOfTravelers);

  const categoryBreakdowns = (Object.keys(CATEGORY_DISTRIBUTION) as CostCategory[]).map(
    (category) => {
      const percentage = CATEGORY_DISTRIBUTION[category];
      const amount = Math.round(baseSubtotal * (percentage / 100));
      return {
        category,
        percentage,
        amount,
      };
    },
  );

  return {
    currency: input.currency,
    totalEstimate,
    perPersonEstimate,
    dailyPerPersonEstimate: adjustedDailyPerPerson,
    contingencyBuffer,
    categoryBreakdowns,
    breakdownFormula: `(baseRate (${input.baseDailyRatePerPerson}) * multiplier (${styleMultiplier}) * ${input.durationDays} days * ${input.numberOfTravelers} travelers) + buffer (${input.includeBufferPercentage}%)`,
  };
}
