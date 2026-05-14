import { motion } from 'framer-motion';
import type { ReactNode } from 'react';
import { cn } from '../../lib/cn';

interface SectionProps {
  id: string;
  index: string;
  eyebrow: string;
  title: ReactNode;
  children: ReactNode;
  className?: string;
}

export function Section({ id, index, eyebrow, title, children, className }: SectionProps) {
  return (
    <section
      id={id}
      className={cn(
        'relative scroll-mt-24 px-6 py-24 md:px-12 md:py-32 lg:px-20 lg:py-40',
        className
      )}
    >
      <div className="mx-auto max-w-[1400px]">
        <motion.header
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: [0.2, 0.8, 0.2, 1] }}
          className="mb-12 grid grid-cols-12 items-end gap-6 border-b border-ink/15 pb-6 md:mb-16 md:pb-8"
        >
          <div className="col-span-12 flex items-center gap-4 md:col-span-3">
            <span className="marker text-signal">{index}</span>
            <span className="marker text-ink/60">/ {eyebrow}</span>
          </div>
          <h2 className="display-lead col-span-12 text-[clamp(2.5rem,7vw,5.5rem)] md:col-span-9">
            {title}
          </h2>
        </motion.header>

        {children}
      </div>
    </section>
  );
}
