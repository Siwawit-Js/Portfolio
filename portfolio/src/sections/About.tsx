import { motion } from 'framer-motion';
import { PROFILE } from '../data/profile';

export function About() {
  const bioLines = (PROFILE.about ?? '').split('\n').filter(Boolean);

  return (
    <section
      id="about"
      className="relative px-6 py-28 md:px-12 md:py-36 lg:px-20 z-10"
    >
      <div className="mx-auto w-full max-w-[1280px]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Left: sticky label + portrait */}
          <div className="lg:col-span-5">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 mb-8 px-4 py-1.5 rounded-full glass text-[11px] font-mono uppercase tracking-[0.22em] text-primary"
            >
              02 / About Me
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="relative card-neon rounded-3xl overflow-hidden aspect-[4/5] max-w-sm"
            >
              {PROFILE.avatar_url ? (
                <img
                  src={PROFILE.avatar_url}
                  alt={PROFILE.name}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              ) : (
                <div className="absolute inset-0 grid place-items-center bg-surface-2 text-muted">
                  <span className="font-display text-7xl">
                    {PROFILE.name.charAt(0)}
                  </span>
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
              <div className="scanlines absolute inset-0 opacity-60" />

              {/* Bottom tag */}
              <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between gap-3">
                <div>
                  <div className="font-display font-semibold text-xl text-ink">
                    {PROFILE.name}
                  </div>
                  <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-primary mt-1">
                    Bangkok · Thailand
                  </div>
                </div>
                <div className="glass rounded-full px-3 py-1 flex items-center gap-2">
                  <span className="live-dot" />
                  <span className="font-mono text-[10px] uppercase tracking-wider text-ink/80">
                    Online
                  </span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right: copy + grid of highlights */}
          <div className="lg:col-span-7">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="font-display font-bold text-[clamp(2.25rem,5.5vw,4.75rem)] leading-[0.98] tracking-tight text-ink"
            >
              Web<br />
              <span className="text-primary ml-20">Developer</span>.
            </motion.h2>

            <div className="mt-8 space-y-5 max-w-2xl">
              {bioLines.length > 0 ? (
                bioLines.map((line, i) => (
                  <motion.p
                    key={i}
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08 }}
                    className="text-base md:text-lg text-ink/75 leading-relaxed"
                  >
                    {line}
                  </motion.p>
                ))
              ) : (
                <p className="text-ink/75 leading-relaxed">{PROFILE.bio}</p>
              )}
            </div>

            {/* Stats grid */}
            <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-3">
              {(PROFILE.stats ?? []).map((s, i) => (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 + i * 0.08 }}
                  className="card-neon p-5 rounded-2xl"
                >
                  <div className="font-display font-bold text-4xl md:text-5xl text-ink tracking-tight leading-none">
                    {s.value}
                  </div>
                  <div className="mt-3 font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
                    {s.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
