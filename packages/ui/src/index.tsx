import type { ButtonHTMLAttributes, DetailedHTMLProps, ReactNode, CSSProperties } from 'react';
import { forwardRef } from 'react';

export interface SecureButtonProps
  extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
  readonly children: ReactNode;
  readonly variant?: 'primary' | 'secondary';
}

const baseStyle: CSSProperties = {
  border: '1px solid transparent',
  borderRadius: '9999px',
  fontWeight: 600,
  padding: '0.75rem 1.5rem',
  cursor: 'pointer',
  transition: 'transform 120ms ease, box-shadow 120ms ease',
  fontFamily: 'inherit'
};

const variantStyles: Record<NonNullable<SecureButtonProps['variant']>, CSSProperties> = {
  primary: {
    backgroundColor: '#2563eb',
    color: '#f8fafc',
    boxShadow: '0 10px 30px rgba(37, 99, 235, 0.35)'
  },
  secondary: {
    backgroundColor: '#0f172a',
    color: '#f8fafc',
    boxShadow: '0 10px 30px rgba(15, 23, 42, 0.5)'
  }
};

export const SecureButton = forwardRef<HTMLButtonElement, SecureButtonProps>(
  ({ children, className, variant = 'primary', type = 'button', style, disabled, ...rest }, ref) => (
    <button
      ref={ref}
      type={type}
      className={className}
      style={{
        ...baseStyle,
        ...variantStyles[variant],
        ...(style ?? {}),
        filter: disabled ? 'grayscale(0.4)' : undefined,
        cursor: disabled ? 'not-allowed' : baseStyle.cursor,
        opacity: disabled ? 0.7 : 1
      }}
      disabled={disabled}
      {...rest}
    >
      {children}
    </button>
  )
);

SecureButton.displayName = 'SecureButton';

export default SecureButton;
