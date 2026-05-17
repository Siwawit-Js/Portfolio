import { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { X, ArrowUpRight, ChevronLeft, ChevronRight } from 'lucide-react';
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
  const gallery = useMemo(() => {
    if (!project) return [];
    if (project.images && project.images.length > 0) return project.images;
    if (project.image_url) return [project.image_url];
    return [];
  }, [project]);

  const [index, setIndex] = useState(0);
  const [fullscreen, setFullscreen] = useState(false);

  useEffect(() => {
    setIndex(0);
    setFullscreen(false);
  }, [project?.id]);

  useEffect(() => {
    if (!project) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (fullscreen) setFullscreen(false);
        else onClose();
      }
      if (e.key === 'ArrowRight') setIndex((i) => (gallery.length ? (i + 1) % gallery.length : 0));
      if (e.key === 'ArrowLeft')
        setIndex((i) => (gallery.length ? (i - 1 + gallery.length) % gallery.length : 0));
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [project, onClose, gallery.length, fullscreen]);

  if (!project) return <AnimatePresence />;

  const currentSrc = gallery[index];
  const hasMany = gallery.length > 1;
  const isPortrait = project.category === 'mobile' || project.id === 'p-5';
  const isVideo = (src?: string) => !!src && /\.(mp4|webm|ogg)$/i.test(src);

  const next = () => setIndex((i) => (i + 1) % gallery.length);
  const prev = () => setIndex((i) => (i - 1 + gallery.length) % gallery.length);

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
            className="card-neon relative w-full max-w-lg md:max-w-2xl lg:max-w-3xl rounded-2xl md:rounded-3xl overflow-hidden"
          >
            {/* Close */}
            <button
              onClick={onClose}
              aria-label="Close project details"
              className="absolute top-5 right-5 z-20 grid place-items-center w-10 h-10 rounded-full glass text-ink hover:text-primary transition-colors"
            >
              <X size={18} />
            </button>

            {/* Cover image */}
            <div
              className={[
                'relative w-full overflow-hidden bg-surface-2',
                isPortrait
                  ? 'h-[45vh] sm:h-[50vh] md:h-[55vh]'
                  : 'aspect-[16/9]',
              ].join(' ')}
            >
              {currentSrc ? (
                <AnimatePresence mode="wait">
                  {isVideo(currentSrc) ? (
                    <motion.video
                      key={currentSrc}
                      src={currentSrc}
                      controls
                      autoPlay
                      loop
                      muted
                      playsInline
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className={[
                        'absolute inset-0 w-full h-full bg-black',
                        isPortrait ? 'object-contain p-4 md:p-6' : 'object-contain',
                      ].join(' ')}
                    />
                  ) : (
                    <motion.img
                      key={currentSrc}
                      src={currentSrc}
                      alt={`${project.title} — ${index + 1}/${gallery.length}`}
                      onClick={() => setFullscreen(true)}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className={[
                        'absolute inset-0 w-full h-full cursor-zoom-in',
                        isPortrait ? 'object-contain p-4 md:p-6' : 'object-cover',
                      ].join(' ')}
                    />
                  )}
                </AnimatePresence>
              ) : (
                <div className="absolute inset-0 grid place-items-center text-muted">
                  <span className="font-display text-6xl">{project.title.charAt(0)}</span>
                </div>
              )}

              {!isPortrait && (
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent pointer-events-none" />
              )}
              <div className="scanlines absolute inset-0 pointer-events-none" />

              {/* Category badge */}
              <div className="absolute top-5 left-5">
                <span className="glass inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[11px] font-mono uppercase tracking-wider text-ink/80">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                  {CATEGORY_LABEL[project.category]}
                </span>
              </div>

              {/* Image counter */}
              {hasMany && (
                <div className="absolute bottom-5 right-5">
                  <span className="glass px-3 py-1.5 rounded-full text-[11px] font-mono tabular-nums tracking-wider text-ink/80">
                    {String(index + 1).padStart(2, '0')} / {String(gallery.length).padStart(2, '0')}
                  </span>
                </div>
              )}

              {/* Prev / Next */}
              {hasMany && (
                <>
                  <button
                    onClick={prev}
                    aria-label="Previous image"
                    className="absolute top-1/2 left-3 md:left-5 -translate-y-1/2 grid place-items-center w-10 h-10 rounded-full glass text-ink hover:text-primary transition-colors"
                  >
                    <ChevronLeft size={18} />
                  </button>
                  <button
                    onClick={next}
                    aria-label="Next image"
                    className="absolute top-1/2 right-3 md:right-5 -translate-y-1/2 grid place-items-center w-10 h-10 rounded-full glass text-ink hover:text-primary transition-colors"
                  >
                    <ChevronRight size={18} />
                  </button>
                </>
              )}
            </div>

            {/* Thumbnail strip */}
            {hasMany && (
              <div className="px-5 md:px-8 pt-4 pb-4 border-b border-rule/60">
                <div className="flex gap-2 overflow-x-auto scroll-smooth">
                  {gallery.map((src, i) => {
                    const active = i === index;
                    return (
                      <button
                        key={src}
                        onClick={() => setIndex(i)}
                        aria-label={`View image ${i + 1}`}
                        aria-current={active}
                        className={[
                          'relative shrink-0 w-16 h-12 md:w-20 md:h-14 rounded-md overflow-hidden border transition-all bg-surface-2',
                          active
                            ? 'border-primary ring-1 ring-primary/40'
                            : 'border-rule hover:border-ink/40 opacity-70 hover:opacity-100',
                        ].join(' ')}
                      >
                        {isVideo(src) ? (
                          <video
                            src={src}
                            muted
                            playsInline
                            preload="metadata"
                            className="absolute inset-0 w-full h-full object-cover bg-black"
                          />
                        ) : (
                          <img
                            src={src}
                            alt=""
                            loading="lazy"
                            className={isPortrait ? 'absolute inset-0 w-full h-full object-contain p-0.5' : 'absolute inset-0 w-full h-full object-cover'}
                          />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Body */}
            <div className="px-5 md:px-8 pt-6 pb-8">
              <h3 className="font-display font-bold text-2xl md:text-4xl leading-[1.05] tracking-tight text-ink">
                {project.title}
              </h3>

              {project.description && (() => {
                const lines = project.description.split('\n').map((l) => l.trim()).filter(Boolean);
                if (lines.length <= 1) {
                  return (
                    <p className="mt-4 text-ink/80 text-sm md:text-base leading-relaxed max-w-3xl">
                      {project.description}
                    </p>
                  );
                }
                return (
                  <ul className="mt-4 space-y-2.5 max-w-3xl">
                    {lines.map((line, i) => (
                      <li
                        key={i}
                        className="flex gap-3 text-ink/80 text-sm md:text-base leading-relaxed"
                      >
                        <span
                          aria-hidden
                          className="mt-2 w-1.5 h-1.5 rounded-full bg-primary shrink-0"
                        />
                        <span>{line}</span>
                      </li>
                    ))}
                  </ul>
                );
              })()}

              {/* Tech stack */}
              {project.tech_stack.length > 0 && (
                <div className="mt-6">
                  <div className="text-[10px] font-mono uppercase tracking-[0.18em] text-muted mb-2.5">
                    // Stack
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {project.tech_stack.map((tech) => (
                      <span
                        key={tech}
                        className="px-2.5 py-1 rounded-full border border-rule bg-surface/60 text-[11px] font-mono text-ink/80 hover:border-primary/50 hover:text-primary transition-colors"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Actions */}
              <div className="mt-7 flex flex-wrap gap-2.5">
                {project.live_url && (
                  <a
                    href={project.live_url}
                    target="_blank"
                    rel="noreferrer"
                    className="group inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-ink text-background font-semibold text-xs md:text-sm hover:bg-primary transition-colors"
                  >
                    View live
                    <ArrowUpRight size={14} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </a>
                )}
                {project.github_url && (
                  <a
                    href={project.github_url}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full border border-rule text-ink hover:border-primary/60 hover:text-primary transition-colors text-xs md:text-sm font-semibold"
                  >
                    <FaGithub size={14} />
                    Source code
                  </a>
                )}
                {!project.live_url && !project.github_url && (
                  <span className="text-sm text-muted font-mono">// Private repository</span>
                )}
              </div>
            </div>
          </motion.div>

          {/* Fullscreen lightbox */}
          <AnimatePresence>
            {fullscreen && currentSrc && !isVideo(currentSrc) && (
              <motion.div
                key="lightbox"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                onClick={(e) => {
                  e.stopPropagation();
                  setFullscreen(false);
                }}
                className="fixed inset-0 z-[110] flex items-center justify-center bg-black/95 backdrop-blur-md p-4 md:p-8 cursor-zoom-out"
                role="dialog"
                aria-modal="true"
                aria-label={`${project.title} — full view`}
              >
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setFullscreen(false);
                  }}
                  aria-label="Close full view"
                  className="absolute top-5 right-5 z-10 grid place-items-center w-11 h-11 rounded-full glass text-ink hover:text-primary transition-colors"
                >
                  <X size={20} />
                </button>

                <AnimatePresence mode="wait">
                  <motion.img
                    key={currentSrc}
                    src={currentSrc}
                    alt={`${project.title} — ${index + 1}/${gallery.length}`}
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                    onClick={(e) => e.stopPropagation()}
                    className="max-w-full max-h-full object-contain select-none"
                  />
                </AnimatePresence>

                {hasMany && (
                  <>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        prev();
                      }}
                      aria-label="Previous image"
                      className="absolute top-1/2 left-3 md:left-6 -translate-y-1/2 grid place-items-center w-11 h-11 rounded-full glass text-ink hover:text-primary transition-colors"
                    >
                      <ChevronLeft size={20} />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        next();
                      }}
                      aria-label="Next image"
                      className="absolute top-1/2 right-3 md:right-6 -translate-y-1/2 grid place-items-center w-11 h-11 rounded-full glass text-ink hover:text-primary transition-colors"
                    >
                      <ChevronRight size={20} />
                    </button>

                    <div className="absolute bottom-5 left-1/2 -translate-x-1/2">
                      <span className="glass px-3 py-1.5 rounded-full text-[11px] font-mono tabular-nums tracking-wider text-ink/80">
                        {String(index + 1).padStart(2, '0')} / {String(gallery.length).padStart(2, '0')}
                      </span>
                    </div>
                  </>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
