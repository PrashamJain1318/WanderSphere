import { z } from 'zod';

export const DatabaseStatusSchema = z.enum(['healthy', 'unhealthy', 'not_configured']);
export type DatabaseStatus = z.infer<typeof DatabaseStatusSchema>;

export const OverallStatusSchema = z.enum(['ok', 'degraded', 'down']);
export type OverallStatus = z.infer<typeof OverallStatusSchema>;

export const HealthCheckDetailsSchema = z.object({
  status: DatabaseStatusSchema,
  latencyMs: z.number().optional(),
  message: z.string().optional(),
});
export type HealthCheckDetails = z.infer<typeof HealthCheckDetailsSchema>;

export const ProcessHealthSchema = z.object({
  status: z.literal('healthy'),
  memoryUsageMb: z.number(),
  uptimeSeconds: z.number(),
});
export type ProcessHealth = z.infer<typeof ProcessHealthSchema>;

export const HealthResponseSchema = z.object({
  status: OverallStatusSchema,
  service: z.string(),
  version: z.string(),
  environment: z.string(),
  timestamp: z.string(),
  checks: z.object({
    database: HealthCheckDetailsSchema,
    process: ProcessHealthSchema,
  }),
});
export type HealthResponse = z.infer<typeof HealthResponseSchema>;
