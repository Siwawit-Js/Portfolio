import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';
import { PROJECTS } from '../data/projects';
import { Section } from '../components/layout/Section';
import { Tag } from '../components/ui/Tag';

export function Projects() {
  const items = [...PROJECTS].sort((a, b) => a.sort_order - b.sort_order);

  return (
    <Section
      id="projects"
      index="04"
      eyebrow="Selected Work"
      title={
        <>
          Things built,<br />
          <span className="italic display-wonk text-signal">on purpose.</span>
        </>
      }
    >
      <div className="space-y-16 md:space-y-24">
        {items.map((project, i) => (
          <motion.article
            key={project.id}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.8 }}
            className="group grid grid-cols-12 gap-6 border-t border-ink/15 pt-8 md:gap-10"
          >
            {/* Project numeral */}
            <div className="col-span-12 md:col-span-1">
              <div className="font-display text-6xl tracking-editorial text-ink/40 transition-colors group-hover:text-signal md:text-7xl">
                {String(i + 1).padStart(2, '0')}
              </div>
            </div>

            {/* Title & meta */}
            <div className="col-span-12 md:col-span-5">
              <div className="mb-3 flex items-center gap-3">
                {project.featured && (
                  <span className="marker text-signal">★ Featured</span>
                )}
                <span className="marker text-ink/50">
                  Project N.{String(i + 1).padStart(3, '0')}
                </span>
              </div>

              <h3 className="font-display text-4xl tracking-editorial md:text-5xl">
                {project.title}
              </h3>

              <div className="mt-6 flex flex-wrap gap-2">
                {project.tech_stack.map((t) => (
                  <Tag key={t}>{t}</Tag>
                ))}
              </div>

              <div className="mt-6 flex gap-5 font-mono text-[0.72rem] uppercase tracking-[0.22em]">
                {project.live_url && (
                  <a
                    href={project.live_url}
                    target="_blank"
                    rel="noreferrer"
                    className="group/link inline-flex items-center gap-1.5 text-ink hover:text-signal"
                  >
                    Visit
                    <ArrowUpRight size={14} strokeWidth={1.5} className="transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
                  </a>
                )}
                {project.github_url && (
                  <a
                    href={project.github_url}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 text-ink/70 hover:text-signal"
                  >
                    <FaGithub size={14} />
                    Source
                  </a>
                )}
              </div>
            </div>

            {/* Description */}
            <div className="col-span-12 md:col-span-6">
              <p className="font-serif text-xl leading-relaxed text-ink/85 md:text-2xl">
                {project.description}
              </p>
            </div>
          </motion.article>
        ))}
      </div>
    </Section>
  );
}
