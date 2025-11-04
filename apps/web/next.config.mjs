import { createSecureHeaders } from 'next-secure-headers';

/** @type {import('next').NextConfig} */
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
            connectSrc: ["'self'"],
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
