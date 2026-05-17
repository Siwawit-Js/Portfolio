import { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import type { ComponentType, CSSProperties } from 'react';
import {
  Wrench,
  Brain,
  Clock,
  Users,
  Lightbulb,
  MessageSquare,
  Shuffle,
  Palette,
  Globe,
  Code2,
  Rocket,
} from 'lucide-react';
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
  SiHtml5,
  SiCss,
  SiJavascript,
  SiSharp,
  SiDotnet,
  SiCanva,
  SiClaude,
  SiDiagramsdotnet,
  SiStrapi,
} from 'react-icons/si';
import { TbBrandVscode } from 'react-icons/tb';
import { SKILLS } from '../data/skills';
import type { Skill } from '../types';

type IconCmp = ComponentType<{ size?: number | string; className?: string; style?: CSSProperties }>;

interface IconMeta {
  Icon: IconCmp;
  color: string;
}

const MONO = '#E8E6E2';
const GOLD = '#C9A66B';

const ICONS: Record<string, IconMeta> = {
  // Frontend
  html:       { Icon: SiHtml5,        color: MONO },
  css:        { Icon: SiCss,          color: MONO },
  javascript: { Icon: SiJavascript,   color: MONO },
  typescript: { Icon: SiTypescript,   color: MONO },
  react:      { Icon: SiReact,        color: MONO },
  nextjs:     { Icon: SiNextdotjs,    color: MONO },
  nuxt:       { Icon: SiNuxt,         color: MONO },
  tailwind:   { Icon: SiTailwindcss,  color: MONO },
  // Backend
  csharp:     { Icon: SiSharp,         color: MONO },
  aspnetcore: { Icon: SiDotnet,        color: MONO },
  nodejs:     { Icon: SiNodedotjs,     color: MONO },
  express:    { Icon: SiExpress,       color: MONO },
  strapi:     { Icon: SiStrapi,        color: MONO },
  api:        { Icon: Globe,           color: MONO },
  // Database
  postgresql: { Icon: SiPostgresql,    color: MONO },
  mongodb:    { Icon: SiMongodb,       color: MONO },
  supabase:   { Icon: SiSupabase,      color: MONO },
  // Tools / DevOps / Design
  git:        { Icon: SiGit,           color: MONO },
  vscode:     { Icon: TbBrandVscode,   color: MONO },
  docker:     { Icon: SiDocker,        color: MONO },
  figma:      { Icon: SiFigma,         color: MONO },
  canva:      { Icon: SiCanva,         color: MONO },
  drawio:     { Icon: SiDiagramsdotnet, color: MONO },
  // AI Tools
  chatgpt:    { Icon: SiOpenai,        color: MONO },
  claude:     { Icon: SiClaude,        color: MONO },
  copilot:    { Icon: SiGithub,        color: MONO },
  gemini:     { Icon: SiGoogle,        color: MONO },
  antigravity:{ Icon: Rocket,          color: MONO },
  // Soft skills
  'communication':     { Icon: MessageSquare, color: GOLD },
  'teamwork':          { Icon: Users,         color: GOLD },
  'problem-solving':   { Icon: Lightbulb,     color: GOLD },
  'time-management':   { Icon: Clock,         color: GOLD },
  'adaptability':      { Icon: Shuffle,       color: GOLD },
  'creativity':        { Icon: Palette,       color: GOLD },
  'critical-thinking': { Icon: Brain,         color: GOLD },
};

const FALLBACK_ICON: IconMeta = { Icon: Code2, color: MONO };

const CATEGORY_ORDER = [
  'Frontend',
  'Backend',
  'Database',
  'Tools',
  'DevOps',
  'Design',
  'AI Tools',
  'Soft Skill',
] as const;

type Category = (typeof CATEGORY_ORDER)[number];
type Filter = 'all' | Category;

const CATEGORY_LABEL: Record<Category, string> = {
  Frontend: 'Frontend',
  Backend: 'Backend',
  Database: 'Database',
  Tools: 'Tools',
  DevOps: 'DevOps',
  Design: 'Design',
  'AI Tools': 'AI Tools',
  'Soft Skill': 'Soft Skills',
};

export function Skills() {
  const [filter, setFilter] = useState<Filter>('Frontend');

  const counts = useMemo(() => {
    const base: Record<string, number> = { all: SKILLS.length };
    for (const s of SKILLS) base[s.category] = (base[s.category] ?? 0) + 1;
    return base;
  }, []);

  const activeCategories = useMemo(
    () =>
      CATEGORY_ORDER.filter((c) =>
        filter === 'all' ? counts[c] : c === filter,
      ),
    [filter, counts],
  );

  const grouped = useMemo(
    () =>
      activeCategories.map((cat) => ({
        category: cat,
        items: SKILLS.filter((s) => s.category === cat).sort(
          (a, b) => a.sort_order - b.sort_order,
        ),
      })),
    [activeCategories],
  );

  const visibleCategories: Filter[] = [
    'all',
    ...CATEGORY_ORDER.filter((c) => counts[c]),
  ];

  return (
    <section id="skills" className="relative px-6 py-28 md:px-12 md:py-36 lg:px-20 z-10">
      <div className="mx-auto w-full max-w-[1280px]">
        {/* Header */}
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between mb-12">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 mb-6 px-4 py-1.5 rounded-full glass text-[11px] font-mono uppercase tracking-[0.22em] text-primary"
            >
              <Wrench size={12} />
              03 / Skills
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="font-display font-bold text-[clamp(2.5rem,6vw,5.5rem)] leading-[0.95] tracking-tight text-ink"
            >
              Skills, tools,<br />
              and <span className="text-primary">frameworks</span>.
            </motion.h2>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15 }}
              className="mt-5 text-muted max-w-xl text-base md:text-lg leading-relaxed"
            >
              The languages, frameworks, and apps I reach.
            </motion.p>
          </div>
        </div>

        {/* Category tabs */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-wrap gap-2 mb-10"
          role="tablist"
          aria-label="Skill category filters"
        >
          {visibleCategories.map((cat) => {
            const label = cat === 'all' ? 'All' : CATEGORY_LABEL[cat];
            const active = filter === cat;
            const count = cat === 'all' ? counts.all : counts[cat];
            return (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                role="tab"
                aria-selected={active}
                className={[
                  'relative px-4 py-2 rounded-full text-xs font-mono uppercase tracking-[0.16em] transition-all',
                  active
                    ? 'text-background'
                    : 'text-ink/70 hover:text-ink border border-rule hover:border-ink/40',
                ].join(' ')}
              >
                {active && (
                  <motion.span
                    layoutId="active-skill-pill"
                    transition={{ type: 'spring', bounce: 0.2, duration: 0.55 }}
                    className="absolute inset-0 rounded-full bg-ink"
                  />
                )}
                <span className="relative z-10 inline-flex items-center gap-2">
                  {label}
                  <span
                    className={[
                      'text-[10px] tabular-nums',
                      active ? 'text-background/70' : 'text-muted',
                    ].join(' ')}
                  >
                    {String(count ?? 0).padStart(2, '0')}
                  </span>
                </span>
              </button>
            );
          })}
        </motion.div>

        {/* Grouped skills */}
        <div className="space-y-12">
          <AnimatePresence mode="wait">
            <motion.div
              key={filter}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35 }}
              className="space-y-12"
            >
              {grouped.map((group) => (
                <div key={group.category}>
                  {/* Group title — only show if multiple groups visible */}
                  {grouped.length > 1 && (
                    <div className="mb-5 flex items-center gap-3">
                      <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-primary">
                        // {CATEGORY_LABEL[group.category]}
                      </span>
                      <span className="flex-1 h-px bg-rule" />
                      <span className="font-mono text-[10px] tabular-nums text-muted">
                        {String(group.items.length).padStart(2, '0')}
                      </span>
                    </div>
                  )}

                  {group.category === 'Soft Skill' ? (
                    <SoftSkillGrid items={group.items} />
                  ) : (
                    <HardSkillGrid items={group.items} />
                  )}
                </div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

function HardSkillGrid({ items }: { items: Skill[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
      {items.map((skill, i) => {
        const meta = ICONS[skill.icon ?? ''] ?? FALLBACK_ICON;
        const { Icon, color } = meta;
        return (
          <motion.div
            key={skill.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: i * 0.04, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ y: -3 }}
            className="card-neon rounded-2xl p-5"
          >
            <div className="flex items-center gap-3">
              <span
                className="grid place-items-center w-10 h-10 rounded-xl bg-surface-2 border border-rule"
              >
                <Icon size={22} style={{ color }} />
              </span>
              <div className="flex-1">
                <div className="font-display font-semibold text-ink leading-tight">
                  {skill.name}
                </div>
                <div className="font-mono text-[10px] uppercase tracking-wider text-muted">
                  {skill.category}
                </div>
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}

function SoftSkillGrid({ items }: { items: Skill[] }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
      {items.map((skill, i) => {
        const meta = ICONS[skill.icon ?? ''] ?? FALLBACK_ICON;
        const { Icon, color } = meta;
        return (
          <motion.div
            key={skill.id}
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: i * 0.05 }}
            whileHover={{ y: -3 }}
            className="card-neon rounded-2xl p-5 flex flex-col items-center text-center"
          >
            <span
              className="grid place-items-center w-12 h-12 rounded-2xl bg-surface-2 mb-3 border border-rule"
            >
              <Icon size={22} style={{ color }} />
            </span>
            <div className="font-display font-semibold text-ink text-sm md:text-base">
              {skill.name}
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
