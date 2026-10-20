import { z } from 'zod';

export const TravelRegionSchema = z.enum([
  'INDIA_NORTH',
  'INDIA_SOUTH',
  'INDIA_EAST',
  'INDIA_WEST',
  'INDIA_NORTHEAST',
  'INTERNATIONAL_ASIA',
  'INTERNATIONAL_EUROPE',
  'INTERNATIONAL_AMERICAS',
  'INTERNATIONAL_OTHER',
]);
export type TravelRegion = z.infer<typeof TravelRegionSchema>;

export const DestinationCategorySchema = z.enum([
  'HERITAGE',
  'ADVENTURE',
  'COASTAL',
  'NATURE',
  'CULINARY',
  'SPIRITUAL',
  'URBAN',
]);
export type DestinationCategory = z.infer<typeof DestinationCategorySchema>;

export const DestinationSchema = z.object({
  id: z.string(),
  name: z.string(),
  country: z.string(),
  stateOrRegion: z.string().optional(),
  category: DestinationCategorySchema,
  region: TravelRegionSchema,
  tagline: z.string(),
  description: z.string(),
  featuredImage: z.string().url().optional(),
  estimatedDailyBudgetInr: z.number().positive(),
  bestTimeToVisit: z.string(),
  isIndiaFeatured: z.boolean().default(false),
});
export type Destination = z.infer<typeof DestinationSchema>;

export const CommunityPostPreviewSchema = z.object({
  id: z.string(),
  title: z.string(),
  authorName: z.string(),
  authorHandle: z.string(),
  destinationName: z.string(),
  travelDurationDays: z.number(),
  snippet: z.string(),
  likesCount: z.number().default(0),
  isVerifiedStory: z.boolean().default(false),
  publishedDate: z.string(),
});
export type CommunityPostPreview = z.infer<typeof CommunityPostPreviewSchema>;

export const TripOverviewSchema = z.object({
  id: z.string(),
  title: z.string(),
  destinationId: z.string(),
  startDate: z.string(),
  endDate: z.string(),
  estimatedBudgetInr: z.number(),
  currency: z.string().default('INR'),
  status: z.enum(['DRAFT', 'PLANNED', 'IN_PROGRESS', 'COMPLETED']),
});
export type TripOverview = z.infer<typeof TripOverviewSchema>;
