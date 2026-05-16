import { useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { X, ArrowUpRight } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';
import type { Project, ProjectCategory } from '../../types';

const CATEGORY_LABEL: Record<ProjectCategory, string> = {
  web: 'Web Development',
  uiux: 'UI/UX Design',
  mobile: 'Mobile App',
};

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  useEffect(() => {
    if (!project) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [project, onClose]);

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          key="modal-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={onClose}
          className="fixed inset-0 z-[100] flex items-start md:items-center justify-center overflow-y-auto bg-background/80 backdrop-blur-md px-4 py-10"
          role="dialog"
          aria-modal="true"
          aria-label={project.title}
        >
          <motion.div
            key="modal-content"
            initial={{ opacity: 0, scale: 0.94, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 12 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="card-neon relative w-full max-w-4xl rounded-3xl overflow-hidden"
          >
            {/* Close */}
            <button
              onClick={onClose}
              aria-label="Close project details"
              className="absolute top-5 right-5 z-20 grid place-items-center w-10 h-10 rounded-full glass text-ink hover:text-primary transition-colors"
            >
              <X size={18} />
            </button>

            {/* Cover image with overlay */}
            <div className="relative aspect-[16/9] w-full overflow-hidden">
              {project.image_url ? (
                <img
                  src={project.image_url}
                  alt={project.title}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              ) : (
                <div className="absolute inset-0 grid place-items-center bg-surface-2 text-muted">
                  <span className="font-display text-6xl">{project.title.charAt(0)}</span>
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
              <div className="scanlines absolute inset-0" />

              {/* Category badge */}
              <div className="absolute top-5 left-5">
                <span className="glass inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[11px] font-mono uppercase tracking-wider text-ink/80">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                  {CATEGORY_LABEL[project.category]}
                </span>
              </div>
            </div>

            {/* Body */}
            <div className="px-6 md:px-10 pt-8 pb-10">
              <h3 className="font-display font-bold text-3xl md:text-5xl leading-[1.05] tracking-tight text-ink">
                {project.title}
              </h3>

              {project.description && (
                <p className="mt-6 text-ink/80 text-base md:text-lg leading-relaxed max-w-3xl">
                  {project.description}
                </p>
              )}

              {/* Tech stack */}
              {project.tech_stack.length > 0 && (
                <div className="mt-8">
                  <div className="text-[11px] font-mono uppercase tracking-[0.18em] text-muted mb-3">
                    // Stack
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {project.tech_stack.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1.5 rounded-full border border-rule bg-surface/60 text-xs font-mono text-ink/80 hover:border-primary/50 hover:text-primary transition-colors"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Actions */}
              <div className="mt-10 flex flex-wrap gap-3">
                {project.live_url && (
                  <a
                    href={project.live_url}
                    target="_blank"
                    rel="noreferrer"
                    className="group inline-flex items-center gap-2 px-5 py-3 rounded-full bg-ink text-background font-semibold text-sm hover:bg-primary transition-colors"
                  >
                    View live
                    <ArrowUpRight size={16} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </a>
                )}
                {project.github_url && (
                  <a
                    href={project.github_url}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-3 rounded-full border border-rule text-ink hover:border-primary/60 hover:text-primary transition-colors text-sm font-semibold"
                  >
                    <FaGithub size={16} />
                    Source code
                  </a>
                )}
                {!project.live_url && !project.github_url && (
                  <span className="text-sm text-muted font-mono">// Private repository</span>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
