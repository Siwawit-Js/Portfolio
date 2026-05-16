import { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUpRight, Layers } from 'lucide-react';
import { PROJECTS } from '../data/projects';
import { ProjectModal } from '../components/ui/ProjectModal';
import type { Project, ProjectCategory } from '../types';

type Filter = 'all' | ProjectCategory;

const FILTERS: { id: Filter; label: string }[] = [
  { id: 'all', label: 'All Work' },
  { id: 'web', label: 'Web Development' },
  { id: 'uiux', label: 'UI/UX Design' },
  { id: 'mobile', label: 'Mobile App' },
];

const CATEGORY_LABEL: Record<ProjectCategory, string> = {
  web: 'Web Development',
  uiux: 'UI/UX Design',
  mobile: 'Mobile App',
};

export function Projects() {
  const [filter, setFilter] = useState<Filter>('all');
  const [selected, setSelected] = useState<Project | null>(null);

  const items = useMemo(() => {
    const sorted = [...PROJECTS].sort((a, b) => a.sort_order - b.sort_order);
    return filter === 'all' ? sorted : sorted.filter((p) => p.category === filter);
  }, [filter]);

  const counts = useMemo(() => {
    const base: Record<Filter, number> = { all: PROJECTS.length, web: 0, uiux: 0, mobile: 0 };
    for (const p of PROJECTS) base[p.category] += 1;
    return base;
  }, []);

  return (
    <section id="projects" className="relative px-6 py-28 md:px-12 md:py-36 lg:px-20 z-10">
      <div className="mx-auto w-full max-w-[1280px]">
        {/* Header */}
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between mb-14">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 mb-6 px-4 py-1.5 rounded-full glass text-[11px] font-mono uppercase tracking-[0.22em] text-primary"
            >
              <Layers size={12} />
              04 / Selected Work
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="font-display font-bold text-[clamp(2.5rem,6vw,5.5rem)] leading-[0.95] tracking-tight text-ink"
            >
              Things I've <span className="text-primary">built</span>.
            </motion.h2>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15 }}
              className="mt-5 text-muted max-w-xl text-base md:text-lg leading-relaxed"
            >
              Click any card to view full details — case studies, stack, and live links.
            </motion.p>
          </div>

          {/* Filter pills */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-wrap gap-2"
            role="tablist"
            aria-label="Project category filters"
          >
            {FILTERS.map((f) => {
              const active = filter === f.id;
              return (
                <button
                  key={f.id}
                  onClick={() => setFilter(f.id)}
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
                      layoutId="active-filter-pill"
                      transition={{ type: 'spring', bounce: 0.2, duration: 0.55 }}
                      className="absolute inset-0 rounded-full bg-ink"
                    />
                  )}
                  <span className="relative z-10 inline-flex items-center gap-2">
                    {f.label}
                    <span
                      className={[
                        'text-[10px] tabular-nums',
                        active ? 'text-background/70' : 'text-muted',
                      ].join(' ')}
                    >
                      {String(counts[f.id]).padStart(2, '0')}
                    </span>
                  </span>
                </button>
              );
            })}
          </motion.div>
        </div>

        {/* Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-7">
          <AnimatePresence mode="popLayout">
            {items.map((project, i) => (
              <motion.button
                layout
                key={project.id}
                onClick={() => setSelected(project)}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.5, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -6 }}
                className="card-neon group relative overflow-hidden rounded-2xl text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                aria-label={`Open project ${project.title}`}
              >
                {/* Image */}
                <div className="relative aspect-[16/10] overflow-hidden">
                  {project.image_url ? (
                    <img
                      src={project.image_url}
                      alt={project.title}
                      loading="lazy"
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  ) : (
                    <div className="absolute inset-0 bg-surface-2 grid place-items-center text-4xl font-display text-muted">
                      {project.title.charAt(0)}
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
                  <div className="scanlines absolute inset-0 opacity-60" />

                  {/* Category */}
                  <span className="absolute top-4 left-4 glass inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[10px] font-mono uppercase tracking-[0.18em] text-ink/80">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                    {CATEGORY_LABEL[project.category]}
                  </span>

                  {/* Arrow CTA */}
                  <span className="absolute top-4 right-4 grid place-items-center w-10 h-10 rounded-full glass text-ink transition-all duration-300 group-hover:bg-ink group-hover:text-background group-hover:rotate-45">
                    <ArrowUpRight size={16} />
                  </span>
                </div>

                {/* Body */}
                <div className="p-6">
                  <div className="flex items-baseline justify-between gap-4">
                    <h3 className="font-display font-semibold text-2xl tracking-tight text-ink group-hover:text-primary transition-colors duration-300">
                      {project.title}
                    </h3>
                    <span className="font-mono text-[11px] text-muted tabular-nums">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                  </div>

                  {project.description && (
                    <p className="mt-3 text-sm md:text-[15px] leading-relaxed text-ink/65 line-clamp-2">
                      {project.description}
                    </p>
                  )}

                  <div className="mt-5 flex flex-wrap gap-1.5">
                    {project.tech_stack.slice(0, 4).map((tech) => (
                      <span
                        key={tech}
                        className="px-2.5 py-1 rounded-full border border-rule text-[10px] font-mono uppercase tracking-wider text-ink/65"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.tech_stack.length > 4 && (
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-mono uppercase tracking-wider text-muted">
                        +{project.tech_stack.length - 4}
                      </span>
                    )}
                  </div>
                </div>
              </motion.button>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Empty state */}
        {items.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="border border-dashed border-rule rounded-2xl p-12 text-center"
          >
            <p className="font-mono text-sm text-muted">
              // No projects in this category yet — check back soon.
            </p>
          </motion.div>
        )}
      </div>

      <ProjectModal project={selected} onClose={() => setSelected(null)} />
    </section>
  );
}
