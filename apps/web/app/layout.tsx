import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import './globals.css';

export const metadata: Metadata = {
  title: 'TournaX — Secure Tournament Platform',
  description: 'Organize and join esports tournaments with strong security defaults.'
};

export default function RootLayout({
  children
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <head />
      <body className="bg-slate-950 text-white antialiased">{children}</body>
    </html>
  );
}
