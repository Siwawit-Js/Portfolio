import React from 'react';
import { cn } from '../../utils/helpers';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

export function Card({ children, className, hover = true }: CardProps) {
  return (
    <div
      className={cn(
        'relative rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md',
        'dark:bg-white/5 dark:border-white/10',
        'bg-white/80 border-slate-200/50',
        'dark:bg-white/5 dark:border-white/10',
        hover && 'transition-all duration-300 hover:border-primary-500/30 hover:shadow-lg hover:shadow-primary-500/5 hover:-translate-y-1',
        className
      )}
    >
      {children}
    </div>
  );
}
