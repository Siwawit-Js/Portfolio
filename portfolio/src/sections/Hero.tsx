import { motion } from 'framer-motion';
import { ArrowDownRight } from 'lucide-react';
import { PROFILE } from '../data/profile';
import { LinkButton } from '../components/ui/Button';

export function Hero() {
  return (
    <section id="top" className="relative min-h-screen px-6 pt-32 pb-16 md:px-12 md:pt-40 lg:px-20">
      <div className="mx-auto grid min-h-[calc(100vh-12rem)] max-w-[1400px] grid-cols-12 gap-6">

        {/* Headline block */}
        <div className="col-span-12 flex flex-col justify-center md:col-span-9">
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.1, ease: [0.2, 0.8, 0.2, 1] }}
            className="mb-6 flex flex-wrap items-center gap-x-6 gap-y-2"
          >
            <div className="marker text-ink/60">
              A portfolio by — <span className="text-signal">Siwawit J.</span>
            </div>
            <div className="marker flex items-center gap-2 text-ink/60">
              <span className="inline-block h-1.5 w-1.5 animate-pulse bg-signal" />
              Working from Bangkok, Thailand
            </div>
            <div className="marker text-ink/60">
              Role — <span className="text-ink">Full-Stack Developer</span>
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.2, 0.8, 0.2, 1] }}
            className="display-lead text-[clamp(3rem,12vw,11rem)]"
          >
            Builds<br />
            for the<br />
            <span className="italic display-wonk text-signal">quiet</span> web.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mt-8 max-w-xl font-serif text-lg leading-relaxed text-ink/80 md:text-xl"
          >
            I'm a full-stack developer in Bangkok turning ideas into careful,
            considered web work — one well-typed cup of tea at a time.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <LinkButton href="#projects" variant="solid">
              Read the work
              <ArrowDownRight size={14} strokeWidth={1.5} />
            </LinkButton>
            <LinkButton href={`mailto:${PROFILE.email}`} variant="outline">
              Say hello
            </LinkButton>
          </motion.div>
        </div>

        {/* Side pull-quote */}
        <motion.aside
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="col-span-12 flex flex-col justify-end md:col-span-3"
        >
          <div className="border-l-2 border-signal pl-4 md:pl-6">
            <div className="font-display text-2xl italic display-wonk leading-tight md:text-3xl">
              "Web Application"
            </div>
            <div className="mt-3 marker text-ink/60">
              — Siwawit's process
            </div>
          </div>

          <div className="mt-8 grid grid-cols-3 gap-4 border-t border-ink/15 pt-6 md:grid-cols-1 md:gap-2">
            {PROFILE.stats?.map((s) => (
              <div key={s.label}>
                <div className="font-display text-3xl tracking-editorial">{s.value}</div>
                <div className="marker text-ink/50">{s.label}</div>
              </div>
            ))}
          </div>
        </motion.aside>

        {/* Scroll cue */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="col-span-12 mt-8 flex items-center justify-between border-t border-ink/15 pt-6"
        >
          <div className="marker text-ink/50">Continue reading ↓</div>
          <div className="marker text-ink/50">P.01</div>
        </motion.div>
      </div>
    </section>
  );
}
