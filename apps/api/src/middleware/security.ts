import cors from 'cors';
import csrf from 'csurf';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import hsts from 'hsts';
import type { Express } from 'express';
import cookieParser from 'cookie-parser';
import { env } from '../config/env';

export const applySecurityMiddleware = (app: Express) => {
  app.set('trust proxy', 1);
  app.use(helmet({
    contentSecurityPolicy: false
  }));
  app.use(
    hsts({
      maxAge: 63072000,
      includeSubDomains: true,
      preload: true
    })
  );
  app.use(
    cors({
      origin: (origin, callback) => {
        if (!origin || env.corsOrigins.includes(origin)) {
          return callback(null, origin ?? env.corsOrigins[0]);
        }
        return callback(new Error('Origin not allowed by CORS'));
      },
      credentials: true
    })
  );
  app.use(cookieParser());
  // Rate limiting mitigates brute force and enumeration attempts.
  app.use(
    rateLimit({
      windowMs: 60 * 1000,
      max: env.rateLimitMax,
      standardHeaders: true,
      legacyHeaders: false
    })
  );
  app.use(
    csrf({
      cookie: {
        key: `${env.sessionCookieName}.csrf`,
        sameSite: 'strict',
        httpOnly: true,
        secure: env.nodeEnv === 'production'
      }
    })
  );
  // Expose CSRF token safely via header for SPA usage.
  app.use((req, res, next) => {
    if (typeof req.csrfToken === 'function') {
      res.setHeader('X-CSRF-Token', req.csrfToken());
    }
    next();
  });
};
