import express from 'express';
import type { ErrorRequestHandler } from 'express';
import { env } from './config/env';
import { applySecurityMiddleware } from './middleware/security';
import { logger } from './lib/logger';
import { registerHealthRoutes } from './routes/health';

export const createApp = () => {
  const app = express();

  app.use(express.json({ limit: '1mb' }));
  app.use(express.urlencoded({ extended: true, limit: '1mb' }));

  applySecurityMiddleware(app);

  const router = express.Router();
  registerHealthRoutes(router);
  app.use('/api', router);

  const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
    if ((err as { code?: string }).code === 'EBADCSRFTOKEN') {
      logger.warn({ err }, 'CSRF token validation failed');
      return res.status(403).json({ message: 'Invalid CSRF token' });
    }

    logger.error({ err }, 'Unhandled error');
    if (env.nodeEnv === 'development') {
      return res.status(500).json({ message: 'Internal Server Error', details: (err as Error).message });
    }

    return res.status(500).json({ message: 'Internal Server Error' });
  };

  app.use(errorHandler);

  return app;
};
