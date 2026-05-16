import { motion } from 'framer-motion';
import type { ComponentType, CSSProperties } from 'react';
import { ArrowDown, Globe, Sparkles, Code2 } from 'lucide-react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import {
  SiReact,
  SiTypescript,
  SiNextdotjs,
  SiTailwindcss,
  SiNuxt,
  SiNodedotjs,
  SiExpress,
  SiPostgresql,
  SiMongodb,
  SiSupabase,
  SiGit,
  SiDocker,
  SiFigma,
  SiOpenai,
  SiGoogle,
  SiGithub,
} from 'react-icons/si';
import { PROFILE } from '../data/profile';
import { PROJECTS } from '../data/projects';
import { SKILLS as ALL_SKILLS } from '../data/skills';

type IconCmp = ComponentType<{ size?: number | string; className?: string; style?: CSSProperties }>;

interface IconMeta {
  Icon: IconCmp;
  color: string;
}

const ICONS: Record<string, IconMeta> = {
  react:      { Icon: SiReact,        color: '#61dafb' },
  typescript: { Icon: SiTypescript,   color: '#3178c6' },
  nextjs:     { Icon: SiNextdotjs,    color: '#f5f5f7' },
  tailwind:   { Icon: SiTailwindcss,  color: '#38bdf8' },
  nuxt:       { Icon: SiNuxt,         color: '#00dc82' },
  nodejs:     { Icon: SiNodedotjs,    color: '#5fa04e' },
  express:    { Icon: SiExpress,      color: '#f5f5f7' },
  api:        { Icon: Globe,          color: '#00f5ff' },
  postgresql: { Icon: SiPostgresql,   color: '#4169e1' },
  mongodb:    { Icon: SiMongodb,      color: '#47a248' },
  supabase:   { Icon: SiSupabase,     color: '#3ecf8e' },
  git:        { Icon: SiGit,          color: '#f05033' },
  docker:     { Icon: SiDocker,       color: '#2496ed' },
  figma:      { Icon: SiFigma,        color: '#a259ff' },
  chatgpt:    { Icon: SiOpenai,       color: '#10a37f' },
  claude:     { Icon: Sparkles,       color: '#d97757' },
  copilot:    { Icon: SiGithub,       color: '#f5f5f7' },
  gemini:     { Icon: SiGoogle,       color: '#4285f4' },
};

const FALLBACK_ICON: IconMeta = { Icon: Code2, color: '#f5f5f7' };

const SKILLS = ALL_SKILLS
  .filter((s) => s.category !== 'Soft Skill')
  .map((s) => {
    const meta = ICONS[s.icon ?? ''] ?? FALLBACK_ICON;
    return { name: s.name, Icon: meta.Icon, color: meta.color };
  });

export function Hero() {
  return (
    <section
      id="top"
      className="relative min-h-screen px-6 pt-32 pb-20 md:px-12 md:pt-40 lg:px-20 flex flex-col justify-center overflow-hidden"
    >

      <div className="mx-auto w-full max-w-[1280px] relative z-10">

        {/* Greeting line */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="font-mono text-sm md:text-base text-muted mb-4 flex items-center gap-2">
          <span>Hello, I'm</span>
          <span className="text-ink font-semibold">{PROFILE.name.split(' ')[0]}</span>
        </motion.div>

        <h1 className="font-display font-bold text-[clamp(3rem,11vw,9rem)] leading-[0.92] tracking-tighter text-ink">
          Portfolio
        </h1>

        {/* Bottom row: bio + stats + CTA */}
        <div className="mt-6 md:mt-20 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8">
          {/* Bio */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.7 }}
            className="lg:col-span-6 border-t border-rule/70 pt-6">
            <p className="text-lg md:text-xl text-ink/80 leading-relaxed max-w-xl">
              I craft <span className="text-primary">complete</span> web experiences, focusing on{' '}
              <span className="text-accent">clean code</span>, functional design, and delivering highly stable applications.
            </p>
            <p className="mt-4 text-sm text-muted font-mono">
              // {PROFILE.role}
            </p>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.8 }}
            className="lg:col-span-3 border-t border-rule/70 pt-6"
          >
            <div className="font-display font-bold text-6xl md:text-7xl text-ink leading-none flex items-start">
              {PROJECTS.length}
              <span className="text-2xl mt-2 ml-1 text-primary">+</span>
            </div>
            <div className="mt-3 text-[11px] font-mono uppercase tracking-[0.18em] text-muted">
              Projects shipped<br />across the stack
            </div>
          </motion.div>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.9 }}
            className="lg:col-span-3 border-t border-rule/70 pt-6 flex flex-col gap-3"
          >
            <a
              href="#projects"
              className="group inline-flex items-center justify-between gap-3 px-5 py-3 rounded-full bg-primary text-background font-semibold text-sm hover:shadow-[0_0_30px_rgb(var(--primary)/0.55)] transition-shadow"
            >
              View my work
              <ArrowDown size={16} className="transition-transform group-hover:translate-y-0.5" />
            </a>
            <div className="flex gap-2">
              {PROFILE.github && (
                <a
                  href={PROFILE.github}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="GitHub"
                  className="grid place-items-center w-11 h-11 rounded-full border border-rule text-ink hover:border-primary hover:text-primary transition-colors"
                >
                  <FaGithub size={16} />
                </a>
              )}
              {PROFILE.linkedin && (
                <a
                  href={PROFILE.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="LinkedIn"
                  className="grid place-items-center w-11 h-11 rounded-full border border-rule text-ink hover:border-primary hover:text-primary transition-colors"
                >
                  <FaLinkedin size={16} />
                </a>
              )}
            </div>
          </motion.div>
        </div>

        {/* Scrolling marquee */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="mt-20 md:mt-28 border-y border-rule/70 py-5 overflow-hidden"
          aria-hidden
        >
          <div className="marquee-track gap-10 md:gap-14 text-ink/80">
            {Array.from({ length: 2 }).map((_, dup) => (
              <div key={dup} className="flex items-center gap-10 md:gap-14 pr-10 md:pr-14">
                {SKILLS.map(({ name, Icon, color }) => (
                  <div
                    key={`${dup}-${name}`}
                    className="group flex items-center gap-3 shrink-0"
                    title={name}
                  >
                    <Icon
                      size={28}
                      className="transition-transform duration-300 group-hover:scale-110"
                      style={{ color }}
                    />
                    <span className="font-display font-semibold text-lg md:text-xl tracking-tight text-ink/70 group-hover:text-ink transition-colors">
                      {name}
                    </span>
                    <span className="text-primary text-2xl select-none ml-10 md:ml-14" aria-hidden>
                      /
                    </span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
