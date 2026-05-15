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
      <div className="space-y-20 md:space-y-32">
        {items.map((project, i) => (
          <motion.article
            key={project.id}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            className="group grid grid-cols-12 gap-8 border-t border-ink/15 pt-10 md:gap-12"
          >
            {/* LEFT — meta, title, tags, description, links */}
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 24 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.2, 0.8, 0.2, 1] } },
              }}
              className="col-span-12 md:col-span-7"
            >
              <div className="mb-4 flex items-center gap-4">
                <span className="font-display text-5xl tracking-editorial text-ink/40 transition-colors group-hover:text-signal">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div className="flex flex-col gap-1">
                  {project.featured && <span className="marker text-signal">★ Featured</span>}
                  <span className="marker text-ink/50">
                    Project N.{String(i + 1).padStart(3, '0')}
                  </span>
                </div>
              </div>

              <h3 className="font-display text-4xl tracking-editorial md:text-5xl">
                {project.title}
              </h3>

              {/* Tech stack — skills */}
              <div className="mt-6 flex flex-wrap gap-2">
                {project.tech_stack.map((t) => (
                  <Tag key={t}>{t}</Tag>
                ))}
              </div>

              {/* Description — below skills */}
              <p className="mt-6 max-w-2xl font-serif text-lg leading-relaxed text-ink/85 md:text-xl">
                {project.description}
              </p>

              {/* Links */}
              <div className="mt-8 flex gap-6 font-mono text-[0.72rem] uppercase tracking-[0.22em]">
                {project.live_url && (
                  <a
                    href={project.live_url}
                    target="_blank"
                    rel="noreferrer"
                    className="group/link inline-flex items-center gap-1.5 text-ink hover:text-signal"
                  >
                    Visit
                    <ArrowUpRight
                      size={14}
                      strokeWidth={1.5}
                      className="transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5"
                    />
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
            </motion.div>

            {/* RIGHT — image, card-slide animation */}
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 80, rotate: i % 2 === 0 ? -4 : 4, scale: 0.92 },
                visible: {
                  opacity: 1,
                  y: 0,
                  rotate: 0,
                  scale: 1,
                  transition: { duration: 1, delay: 0.15, ease: [0.16, 0.84, 0.24, 1] },
                },
              }}
              className="col-span-12 md:col-span-5"
            >
              <ProjectCard
                title={project.title}
                imageUrl={project.image_url}
                index={i}
              />
            </motion.div>
          </motion.article>
        ))}
      </div>
    </Section>
  );
}

function ProjectCard({
  title,
  imageUrl,
  index,
}: {
  title: string;
  imageUrl: string | null;
  index: number;
}) {
  return (
    <div className="group/card relative aspect-[4/3] w-full overflow-hidden border border-ink/15 bg-ink/[0.03] shadow-[6px_6px_0_0_rgb(var(--ink)/0.08)] transition-shadow duration-500 hover:shadow-[10px_10px_0_0_rgb(var(--signal)/0.25)]">
      {imageUrl ? (
        <img
          src={imageUrl}
          alt={title}
          className="h-full w-full object-cover transition duration-700 group-hover/card:scale-[1.03]"
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).style.display = 'none';
          }}
        />
      ) : (
        <Placeholder title={title} index={index} />
      )}

      {/* Plate label */}
      <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between font-mono text-[0.65rem] uppercase tracking-[0.2em] text-ink/60">
        <span>Plate {String(index + 1).padStart(2, '0')}</span>
        <span>↗</span>
      </div>
    </div>
  );
}

function Placeholder({ title, index }: { title: string; index: number }) {
  const initial = title.charAt(0).toUpperCase();
  return (
    <div className="relative flex h-full w-full items-center justify-center bg-paper">
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage:
            'repeating-linear-gradient(135deg, currentColor 0 1px, transparent 1px 14px)',
          color: 'rgb(var(--ink))',
        }}
      />
      <div className="relative text-center">
        <div className="font-display text-[8rem] leading-none tracking-editorial text-ink/30 md:text-[10rem]">
          {initial}
        </div>
        <div className="marker mt-2 text-ink/40">№ {String(index + 1).padStart(3, '0')}</div>
      </div>
    </div>
  );
}
