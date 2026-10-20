import request from 'supertest';
import { describe, expect, it } from 'vitest';
import { HealthResponseSchema, ApiErrorResponseSchema } from '@wandersphere/contracts';
import { createApp } from '../src/app';

describe('API Integration Tests', () => {
  const app = createApp();

  describe('GET /api/v1/health', () => {
    it('should return 200 and a valid health check payload', async () => {
      const response = await request(app).get('/api/v1/health');

      expect(response.status).toBe(200);
      expect(response.headers['x-request-id']).toBeDefined();

      const parseResult = HealthResponseSchema.safeParse(response.body);
      expect(parseResult.success).toBe(true);

      if (parseResult.success) {
        expect(parseResult.data.service).toBe('wandersphere-api');
        expect(parseResult.data.checks.process.status).toBe('healthy');
        // When MongoDB is not configured, it returns 'not_configured'
        expect(['healthy', 'not_configured', 'unhealthy']).toContain(
          parseResult.data.checks.database.status,
        );
      }
    });

    it('should preserve and reflect custom X-Request-Id header', async () => {
      const customId = 'test-request-id-12345';
      const response = await request(app).get('/api/v1/health').set('X-Request-Id', customId);

      expect(response.status).toBe(200);
      expect(response.headers['x-request-id']).toBe(customId);
    });
  });

  describe('404 Not Found Handling', () => {
    it('should return 404 with structured JSON error payload', async () => {
      const response = await request(app).get('/api/v1/unknown-endpoint');

      expect(response.status).toBe(404);
      const parseResult = ApiErrorResponseSchema.safeParse(response.body);
      expect(parseResult.success).toBe(true);

      if (parseResult.success) {
        expect(parseResult.data.success).toBe(false);
        expect(parseResult.data.error.code).toBe('NOT_FOUND');
      }
    });
  });
});
