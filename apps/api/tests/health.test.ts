import request from 'supertest';
import { describe, expect, it } from 'vitest';
import { createApp } from '../src/app';

// Minimal env for tests
process.env.DATABASE_URL = process.env.DATABASE_URL ?? 'mysql://user:pass@localhost:3306/tournax_test';
process.env.JWT_SECRET = process.env.JWT_SECRET ?? 'testsecretwithsufficientlength0000';

const app = createApp();

describe('health route', () => {
  it('responds with ok status and csrf token', async () => {
    const response = await request(app).get('/api/health');
    expect(response.status).toBe(200);
    expect(response.body.status).toBe('ok');
    expect(response.headers['x-csrf-token']).toBeDefined();
  });
});
