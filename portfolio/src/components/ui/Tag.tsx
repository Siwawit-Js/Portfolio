import type { ReactNode } from 'react';
import { cn } from '../../lib/cn';

export function Tag({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        'inline-flex items-center px-2.5 py-1 font-mono text-[0.65rem] uppercase tracking-[0.18em] border border-ink/30 text-ink/80',
        className
      )}
    >
      {children}
    </span>
  );
}
