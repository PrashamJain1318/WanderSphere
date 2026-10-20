import dotenv from 'dotenv';
import { z } from 'zod';

// Load .env file from root or local workspace
dotenv.config();

const EnvSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
  PORT: z
    .string()
    .default('4000')
    .transform((val) => {
      const parsed = parseInt(val, 10);
      if (isNaN(parsed) || parsed <= 0) {
        throw new Error('PORT must be a valid positive number');
      }
      return parsed;
    }),
  CORS_ORIGIN: z.string().default('http://localhost:3000'),
  MONGODB_URI: z.string().optional().default(''),
  MONGODB_REQUIRED: z
    .string()
    .default('false')
    .transform((val) => val === 'true' || val === '1'),
  MONGODB_TIMEOUT_MS: z
    .string()
    .default('5000')
    .transform((val) => {
      const parsed = parseInt(val, 10);
      return isNaN(parsed) ? 5000 : parsed;
    }),
  LOG_LEVEL: z.enum(['debug', 'info', 'warn', 'error']).default('info'),
});

function loadConfig() {
  const result = EnvSchema.safeParse(process.env);

  if (!result.success) {
    const errorDetails = result.error.issues
      .map((issue) => `  - ${issue.path.join('.')}: ${issue.message}`)
      .join('\n');

    console.error('CRITICAL: Environment variable validation failed:\n' + errorDetails);
    process.exit(1);
  }

  return result.data;
}

export const env = loadConfig();
export type EnvConfig = z.infer<typeof EnvSchema>;
