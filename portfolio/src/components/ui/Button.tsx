import type { ButtonHTMLAttributes, AnchorHTMLAttributes, ReactNode } from 'react';
import { cn } from '../../lib/cn';

type Variant = 'solid' | 'outline' | 'ghost';

interface BaseProps {
  variant?: Variant;
  children: ReactNode;
  className?: string;
}

const styles: Record<Variant, string> = {
  solid: 'bg-ink text-paper hover:bg-signal',
  outline: 'border border-ink/40 text-ink hover:border-ink hover:bg-ink hover:text-paper',
  ghost: 'text-ink hover:text-signal',
};

const base =
  'group inline-flex items-center justify-center gap-2 px-6 py-3 font-mono text-[0.72rem] uppercase tracking-[0.22em] transition-all duration-300';

export function Button({
  variant = 'solid',
  className,
  children,
  ...props
}: BaseProps & ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button className={cn(base, styles[variant], className)} {...props}>
      {children}
    </button>
  );
}

export function LinkButton({
  variant = 'solid',
  className,
  children,
  ...props
}: BaseProps & AnchorHTMLAttributes<HTMLAnchorElement>) {
  return (
    <a className={cn(base, styles[variant], className)} {...props}>
      {children}
    </a>
  );
}
