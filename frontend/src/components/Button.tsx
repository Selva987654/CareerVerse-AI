import { ButtonHTMLAttributes, ReactNode } from 'react';
import { Link } from 'react-router-dom';

interface BaseProps {
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  children: ReactNode;
  icon?: ReactNode;
  className?: string;
}

const variantClasses: Record<string, string> = {
  primary:
    'bg-brand-600 text-white hover:bg-brand-700 shadow-brand hover:shadow-lg hover:-translate-y-0.5',
  secondary:
    'bg-white text-slate-800 border border-slate-200 hover:border-brand-400 hover:-translate-y-0.5',
  ghost: 'bg-transparent text-slate-700 hover:bg-slate-100',
  outline: 'bg-transparent border-2 border-brand-600 text-brand-700 hover:bg-brand-50',
};

const sizeClasses: Record<string, string> = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-base',
  lg: 'px-8 py-4 text-lg',
};

const base =
  'inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0';

export function Button({
  variant = 'primary',
  size = 'md',
  children,
  icon,
  className = '',
  ...rest
}: BaseProps & ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={`${base} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
      {...rest}
    >
      {children}
      {icon}
    </button>
  );
}

export function LinkButton({
  to,
  variant = 'primary',
  size = 'md',
  children,
  icon,
  className = '',
}: BaseProps & { to: string }) {
  return (
    <Link
      to={to}
      className={`${base} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
    >
      {children}
      {icon}
    </Link>
  );
}
