import Link from 'next/link';
import { SecureButton } from '@tournax/ui';
import { env } from '../lib/env';

export default function HomePage() {
  return (
    <main className="main">
      <section>
        <h1 className="hero-title">Secure esports tournaments</h1>
        <p className="hero-text">
          TournaX helps hosts and players run fair, compliant competitions with privacy-first
          infrastructure.
        </p>
        <p className="hero-text" aria-live="polite">
          API origin allowlist: <strong>{env.NEXT_PUBLIC_API_BASE_URL}</strong>
        </p>
        <div className="actions">
          <Link href="https://docs.tournax.example.com" prefetch={false}>
            <SecureButton variant="primary">View Platform Docs</SecureButton>
          </Link>
          <Link href="/auth/register" prefetch={false}>
            <SecureButton variant="secondary">Create secure account</SecureButton>
          </Link>
        </div>
      </section>
      <section className="security-card" aria-labelledby="security-title">
        <h2 id="security-title">Security defaults</h2>
        <ul>
          <li>OWASP aligned session handling &amp; CSRF defenses</li>
          <li>Role-based access control with audit-ready logging</li>
          <li>Encrypted secrets and SameSite strict cookies</li>
        </ul>
      </section>
    </main>
  );
}
