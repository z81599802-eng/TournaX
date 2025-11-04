import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import HomePage from './page';

describe('HomePage', () => {
  it('renders secure messaging', () => {
    render(<HomePage />);
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Secure esports tournaments');
    expect(screen.getByText(/API origin allowlist/i)).toBeInTheDocument();
  });
});
