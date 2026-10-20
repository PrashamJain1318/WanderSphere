import { z } from 'zod';

export const SupportedCurrencySchema = z.enum(['INR', 'USD', 'EUR', 'GBP']);
export type SupportedCurrency = z.infer<typeof SupportedCurrencySchema>;

export const TravelStyleSchema = z.enum(['BUDGET', 'STANDARD', 'PREMIUM', 'LUXURY']);
export type TravelStyle = z.infer<typeof TravelStyleSchema>;

export const CostCategorySchema = z.enum([
  'ACCOMMODATION',
  'TRANSPORT',
  'FOOD',
  'ACTIVITIES',
  'MISCELLANEOUS',
]);
export type CostCategory = z.infer<typeof CostCategorySchema>;

export const BudgetEstimateInputSchema = z.object({
  numberOfTravelers: z.number().int().min(1, 'At least 1 traveler required'),
  durationDays: z.number().int().min(1, 'Trip duration must be at least 1 day'),
  travelStyle: TravelStyleSchema,
  currency: SupportedCurrencySchema.default('INR'),
  baseDailyRatePerPerson: z.number().positive('Daily rate must be positive'),
  includeBufferPercentage: z.number().min(0).max(50).default(10),
});
export type BudgetEstimateInput = z.infer<typeof BudgetEstimateInputSchema>;

export const CategoryBreakdownSchema = z.object({
  category: CostCategorySchema,
  percentage: z.number().min(0).max(100),
  amount: z.number().nonnegative(),
});
export type CategoryBreakdown = z.infer<typeof CategoryBreakdownSchema>;

export const BudgetEstimateResultSchema = z.object({
  currency: SupportedCurrencySchema,
  totalEstimate: z.number().nonnegative(),
  perPersonEstimate: z.number().nonnegative(),
  dailyPerPersonEstimate: z.number().nonnegative(),
  contingencyBuffer: z.number().nonnegative(),
  categoryBreakdowns: z.array(CategoryBreakdownSchema),
  breakdownFormula: z.string(),
});
export type BudgetEstimateResult = z.infer<typeof BudgetEstimateResultSchema>;
