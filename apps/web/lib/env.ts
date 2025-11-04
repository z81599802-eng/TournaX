import { config } from 'dotenv-flow';
import { z } from 'zod';

config({ silent: true });

const schema = z.object({
  NEXT_PUBLIC_API_BASE_URL: z.string().url().default('https://api.tournax.example.com'),
  NEXT_PUBLIC_WEB_BASE_URL: z.string().url().default('https://app.tournax.example.com')
});

const parsed = schema.safeParse(process.env);

if (!parsed.success) {
  // Fail fast for security-critical misconfigurations.
  console.error(parsed.error.flatten().fieldErrors);
  throw new Error('Invalid web environment variables');
}

export const env = parsed.data;
