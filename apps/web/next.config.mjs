import { createSecureHeaders } from 'next-secure-headers';

/** @type {import('next').NextConfig} */
const DEFAULT_API_BASE_URL = 'https://api.tournax.example.com';

const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL ?? DEFAULT_API_BASE_URL;

const connectSrc = new Set(["'self'"]);

try {
  const apiUrl = new URL(apiBaseUrl);
  connectSrc.add(apiUrl.origin);

  const normalizedHref = apiUrl.href.replace(/\/$/, '');
  if (normalizedHref !== apiUrl.origin) {
    connectSrc.add(normalizedHref);
  }
} catch (error) {
  const reason = error instanceof Error ? error.message : String(error);
  throw new Error(`Invalid NEXT_PUBLIC_API_BASE_URL for CSP: ${reason}`);
}

const nextConfig = {
  reactStrictMode: true,
  experimental: {
    typedRoutes: true
  },
  output: 'standalone',
  headers: async () => [
    {
      source: '/(.*)',
      headers: createSecureHeaders({
        contentSecurityPolicy: {
          directives: {
            defaultSrc: "'self'",
            scriptSrc: ["'self'"],
            styleSrc: ["'self'", "'unsafe-inline'"],
            imgSrc: ["'self'", 'data:'],
            connectSrc: Array.from(connectSrc),
            fontSrc: ["'self'"],
            frameSrc: ["'none'"],
            baseUri: ["'self'"],
            formAction: ["'self'"]
          }
        },
        referrerPolicy: 'no-referrer',
        strictTransportSecurity: 'max-age=63072000; includeSubDomains; preload',
        permissionsPolicy: {
          camera: [],
          microphone: [],
          geolocation: []
        }
      })
    }
  ]
};

export default nextConfig;
