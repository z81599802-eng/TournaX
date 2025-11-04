import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { SecureButton } from './index';

describe('SecureButton', () => {
  it('renders text content safely', () => {
    render(<SecureButton>Join</SecureButton>);
    expect(screen.getByRole('button', { name: 'Join' })).toBeInTheDocument();
  });
});
