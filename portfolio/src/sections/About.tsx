import { motion } from 'framer-motion';
import { PROFILE } from '../data/profile';
import { HOBBIES } from '../data/hobbies';
import { Section } from '../components/layout/Section';

export function About() {
  const paragraphs = (PROFILE.about ?? '').split('\n').filter(Boolean);

  return (
    <Section
      id="about"
      index="01"
      eyebrow="About"
      title={
        <>
          Hello,<br />
          <span className="italic display-wonk text-signal">dear reader.</span>
        </>
      }
    >
      <div className="grid grid-cols-12 gap-6 md:gap-10">

        {/* Avatar block */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8 }}
          className="col-span-12 md:col-span-4"
        >
          <div className="relative aspect-[4/5] overflow-hidden bg-ink/5">
            <img
              src={PROFILE.avatar_url ?? ''}
              alt={PROFILE.name}
              className="h-full w-full object-cover"
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).style.display = 'none';
              }}
            />
            <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-ink/10" />
          </div>
          <div className="mt-4 flex items-baseline justify-between border-b border-ink/15 pb-2">
            <div className="marker text-ink/60">Plate I</div>
            <div className="marker text-ink/60">{PROFILE.role.split(',')[0].trim()}</div>
          </div>
        </motion.div>

        {/* Prose */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="col-span-12 md:col-span-7 md:col-start-6"
        >
          <p className="font-serif text-2xl leading-snug text-ink md:text-3xl">
            <span className="font-display text-5xl float-left mr-2 mt-1 leading-none text-signal">
              {paragraphs[0]?.[0]}
            </span>
            {paragraphs[0]?.slice(1)}
          </p>

          {paragraphs.slice(1).map((p, i) => (
            <p key={i} className="mt-6 font-serif text-lg leading-relaxed text-ink/80">
              {p}
            </p>
          ))}

          {/* Hobbies marginalia */}
          <div className="mt-12 border-t border-ink/15 pt-6">
            <div className="marker mb-4 text-ink/50">Marginalia — off the keyboard</div>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
              {HOBBIES.map(({ icon: Icon, label, value }) => (
                <div key={value} className="flex items-start gap-3 border-l border-ink/20 pl-3">
                  <Icon size={18} strokeWidth={1.25} className="mt-1 text-signal" />
                  <div>
                    <div className="font-display text-2xl tracking-editorial leading-none">
                      {label}
                    </div>
                    <div className="marker mt-1 text-ink/60">{value}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </Section>
  );
}
