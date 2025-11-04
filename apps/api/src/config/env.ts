import { config } from 'dotenv-flow';
import Joi from 'joi';

config({ silent: true });

// Strict validation prevents booting with insecure or missing configuration.
const schema = Joi.object({
  NODE_ENV: Joi.string().valid('development', 'production', 'test').default('development'),
  PORT: Joi.number().default(4000),
  DATABASE_URL: Joi.string().uri({ scheme: ['mysql'] }).required(),
  JWT_SECRET: Joi.string().min(32).when('JWT_PRIVATE_KEY', {
    is: Joi.exist(),
    then: Joi.optional(),
    otherwise: Joi.required()
  }),
  JWT_PRIVATE_KEY: Joi.string().base64(),
  JWT_PUBLIC_KEY: Joi.string().base64(),
  CORS_ORIGINS: Joi.string().default('https://app.tournax.local'),
  RATE_LIMIT_MAX: Joi.number().min(10).max(10000).default(100),
  SESSION_COOKIE_NAME: Joi.string().default('tournax.sid')
})
  .with('JWT_PRIVATE_KEY', 'JWT_PUBLIC_KEY')
  .prefs({ abortEarly: false });

const { error, value } = schema.validate(process.env, { convert: true });

if (error) {
  console.error('Invalid API environment variables', error.details);
  throw new Error('Invalid API environment variables');
}

const origins = value.CORS_ORIGINS.split(',').map(origin => origin.trim());

export const env = {
  nodeEnv: value.NODE_ENV as string,
  port: value.PORT as number,
  databaseUrl: value.DATABASE_URL as string,
  jwtSecret: value.JWT_SECRET as string | undefined,
  jwtPrivateKey: value.JWT_PRIVATE_KEY as string | undefined,
  jwtPublicKey: value.JWT_PUBLIC_KEY as string | undefined,
  corsOrigins: origins,
  rateLimitMax: value.RATE_LIMIT_MAX as number,
  sessionCookieName: value.SESSION_COOKIE_NAME as string
};
