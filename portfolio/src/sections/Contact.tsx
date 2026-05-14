import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { PROFILE } from '../data/profile';
import { toUrl } from '../lib/cn';

const links = [
  { label: 'Email', href: `mailto:${PROFILE.email}`, value: PROFILE.email },
  { label: 'GitHub', href: PROFILE.github ? toUrl(PROFILE.github) : null, value: '@Siwawit-Js' },
  { label: 'LinkedIn', href: PROFILE.linkedin ? toUrl(PROFILE.linkedin) : null, value: 'in/siwawit' },
].filter((l) => l.href);

export function Contact() {
  return (
    <section id="contact" className="relative scroll-mt-24 px-6 py-32 md:px-12 md:py-40 lg:px-20">
      <div className="mx-auto max-w-[1400px]">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8 }}
          className="mb-12 grid grid-cols-12 items-end gap-6 border-b border-ink/15 pb-6"
        >
          <div className="col-span-12 flex items-center gap-4 md:col-span-3">
            <span className="marker text-signal">05</span>
            <span className="marker text-ink/60">/ Contact</span>
          </div>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.9 }}
          className="display-lead text-[clamp(3rem,11vw,9rem)]"
        >
          Let's make<br />
          <span className="italic display-wonk text-signal">something.</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-8 max-w-2xl font-serif text-xl leading-relaxed text-ink/80 md:text-2xl"
        >
          I'm an intern with the time to listen and the curiosity to learn quickly.
          If you have a problem worth solving, I'd love to hear about it.
        </motion.p>

        <div className="mt-16 grid grid-cols-12 gap-6 border-t border-ink/15 pt-8">
          {links.map((link, i) => (
            <motion.a
              key={link.label}
              href={link.href ?? '#'}
              target={link.label !== 'Email' ? '_blank' : undefined}
              rel="noreferrer"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 + i * 0.1 }}
              className="group col-span-12 grid grid-cols-12 items-baseline gap-4 border-b border-ink/15 py-6 transition-colors hover:bg-ink/[0.02]"
            >
              <span className="col-span-12 marker text-ink/50 md:col-span-2">
                {String(i + 1).padStart(2, '0')} — {link.label}
              </span>
              <span className="col-span-10 font-display text-3xl tracking-editorial transition-colors group-hover:text-signal md:col-span-9 md:text-5xl">
                {link.value}
              </span>
              <span className="col-span-2 flex justify-end md:col-span-1">
                <ArrowUpRight
                  size={28}
                  strokeWidth={1.25}
                  className="text-ink/40 transition-all group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-signal"
                />
              </span>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
