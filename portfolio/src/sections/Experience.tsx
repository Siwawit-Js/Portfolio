import { motion } from 'framer-motion';
import { EXPERIENCE } from '../data/experience';
import { Section } from '../components/layout/Section';
import { formatMonthYear } from '../lib/cn';

export function Experience() {
  const items = [...EXPERIENCE].sort((a, b) => (a.start_date > b.start_date ? -1 : 1));

  return (
    <Section
      id="experience"
      index="03"
      eyebrow="Experience"
      title={
        <>
          A short<br />
          <span className="italic display-wonk text-signal">résumé.</span>
        </>
      }
    >
      <div className="grid grid-cols-12 gap-6">
        {items.map((item, i) => (
          <motion.article
            key={item.id}
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, delay: i * 0.1 }}
            className="col-span-12 grid grid-cols-12 gap-6 border-t border-ink/15 pt-8 first:border-t-0 first:pt-0"
          >
            <div className="col-span-12 md:col-span-3">
              <div className="font-mono text-xs uppercase tracking-[0.18em] text-ink/60">
                {formatMonthYear(item.start_date)} —{' '}
                {item.is_current ? (
                  <span className="text-signal">Present</span>
                ) : item.end_date ? (
                  formatMonthYear(item.end_date)
                ) : (
                  '—'
                )}
              </div>
              {item.location && (
                <div className="mt-2 font-mono text-xs uppercase tracking-[0.18em] text-ink/50">
                  {item.location}
                </div>
              )}
              <div className="mt-4 marker text-ink/50">
                Entry №{String(i + 1).padStart(2, '0')}
              </div>
            </div>

            <div className="col-span-12 md:col-span-9">
              <h3 className="font-display text-3xl tracking-editorial md:text-4xl">
                {item.title}
              </h3>
              <div className="mt-1 font-serif text-lg italic text-ink/70">
                at {item.company}
              </div>
              {item.description && (
                <p className="mt-4 max-w-3xl font-serif text-base leading-relaxed text-ink/80 md:text-lg">
                  {item.description}
                </p>
              )}
            </div>
          </motion.article>
        ))}
      </div>
    </Section>
  );
}
