import { useEffect, useCallback, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Github, Star, FolderOpen, ChevronLeft, ChevronRight, X, ZoomIn, Rocket } from 'lucide-react';
import { getProjects } from '../../services/projects';
import type { Project } from '../../types';
import { CardSkeleton } from '../../components/ui/Skeleton';

function LightboxModal({ images, initialIndex, onClose }: { images: string[]; initialIndex: number; onClose: () => void }) {
  const [current, setCurrent] = useState(initialIndex);

  const prev = useCallback(() => setCurrent(c => (c - 1 + images.length) % images.length), [images.length]);
  const next = useCallback(() => setCurrent(c => (c + 1) % images.length), [images.length]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose, prev, next]);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 z-50 bg-space-950/95 backdrop-blur-md flex items-center justify-center p-4"
      >
        {/* Close */}
        <button onClick={onClose} className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-white/20 transition-colors">
          <X className="w-5 h-5" />
        </button>

        {/* Counter */}
        {images.length > 1 && (
          <div className="absolute top-4 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-white/10 text-white text-sm">
            {current + 1} / {images.length}
          </div>
        )}

        {/* Image */}
        <motion.img
          key={current}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.2 }}
          src={images[current]}
          alt=""
          onClick={e => e.stopPropagation()}
          className="max-w-full max-h-[85vh] object-contain rounded-xl shadow-2xl"
        />

        {/* Prev / Next */}
        {images.length > 1 && (
          <>
            <button
              onClick={e => { e.stopPropagation(); prev(); }}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-white/20 transition-colors"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={e => { e.stopPropagation(); next(); }}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-white/20 transition-colors"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Dots */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
              {images.map((_, i) => (
                <button
                  key={i}
                  onClick={e => { e.stopPropagation(); setCurrent(i); }}
                  className={`h-1.5 rounded-full transition-all ${i === current ? 'bg-white w-6' : 'bg-white/40 w-1.5'}`}
                />
              ))}
            </div>
          </>
        )}
      </motion.div>
    </AnimatePresence>
  );
}

function ImageCarousel({ images, title, onClickImage }: { images: string[]; title: string; onClickImage: (index: number) => void }) {
  const [current, setCurrent] = useState(0);

  if (images.length === 0) return (
    <div className="w-full h-full flex items-center justify-center stars-bg-color">
      <FolderOpen className="w-16 h-16 text-nebula-400/40" />
    </div>
  );

  return (
    <div className="relative w-full h-full">
      <img
        src={images[current]}
        alt={title}
        onClick={() => onClickImage(current)}
        className="w-full h-full object-cover cursor-zoom-in transition-transform duration-500 group-hover:scale-105"
      />

      {/* Zoom hint */}
      <div className="absolute top-2 left-2 z-20 w-7 h-7 rounded-full bg-black/40 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
        <ZoomIn className="w-3.5 h-3.5" />
      </div>

      {images.length > 1 && (
        <>
          <button
            onClick={e => { e.stopPropagation(); setCurrent(c => (c - 1 + images.length) % images.length); }}
            className="absolute left-2 top-1/2 -translate-y-1/2 z-20 w-7 h-7 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/70 transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={e => { e.stopPropagation(); setCurrent(c => (c + 1) % images.length); }}
            className="absolute right-2 top-1/2 -translate-y-1/2 z-20 w-7 h-7 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/70 transition-colors"
          >
            <ChevronRight className="w-4 h-4" />
          </button>

          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 z-20 flex gap-1.5">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={e => { e.stopPropagation(); setCurrent(i); }}
                className={`w-1.5 h-1.5 rounded-full transition-all ${i === current ? 'bg-white w-3' : 'bg-white/50'}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export function ProjectsSection() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [lightbox, setLightbox] = useState<{ images: string[]; index: number } | null>(null);

  useEffect(() => {
    getProjects().then((data) => {
      setProjects(data);
      setLoading(false);
    });
  }, []);

  return (
    <section id="projects" className="relative py-24 sm:py-32">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-14"
        >
          <p className="text-xs font-semibold tracking-widest uppercase text-primary-400 mb-3 flex items-center gap-2">
            <Rocket className="w-3.5 h-3.5" />
            My Work
          </p>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-slate-900">
            Featured Projects
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          {loading
            ? Array.from({ length: 4 }).map((_, i) => <CardSkeleton key={i} />)
            : projects.map((project, i) => {
                const images = project.images?.length ? project.images : project.image_url ? [project.image_url] : [];
                return (
                  <motion.div
                    key={project.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                    className="group relative rounded-2xl border border-slate-200 bg-white overflow-hidden hover:border-slate-300 transition-all duration-500 hover:-translate-y-1.5 shadow-sm hover:shadow-md"
                  >
                    <div className="relative h-52 overflow-hidden bg-gradient-to-br from-primary-500/15 via-nebula-500/10 to-cosmos-500/15">
                      <ImageCarousel
                        images={images}
                        title={project.title}
                        onClickImage={index => images.length > 0 && setLightbox({ images, index })}
                      />

                      <div className="absolute inset-0 z-10 bg-gradient-to-t from-space-950/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4 pointer-events-none">
                        <div className="flex gap-3 pointer-events-auto">
                          {project.live_url && (
                            <a href={project.live_url} target="_blank" rel="noopener noreferrer" className="px-4 py-2 rounded-lg bg-white/15 backdrop-blur-md text-white text-sm font-medium hover:bg-white/25 transition-colors flex items-center gap-1.5">
                              <ExternalLink className="w-4 h-4" /> Live Demo
                            </a>
                          )}
                          {project.github_url && (
                            <a href={project.github_url} target="_blank" rel="noopener noreferrer" className="px-4 py-2 rounded-lg bg-white/15 backdrop-blur-md text-white text-sm font-medium hover:bg-white/25 transition-colors flex items-center gap-1.5">
                              <Github className="w-4 h-4" /> Code
                            </a>
                          )}
                        </div>
                      </div>

                      {project.featured && (
                        <div className="absolute top-3 right-3 z-20 flex items-center gap-1 px-2.5 py-1 rounded-full bg-gradient-to-r from-amber-400 to-amber-500 text-amber-950 text-xs font-bold backdrop-blur-sm shadow-lg">
                          <Star className="w-3 h-3 fill-current" /> Featured
                        </div>
                      )}
                    </div>

                    {/* Top shimmer line */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-px bg-gradient-to-r from-transparent via-primary-300/50 to-transparent z-10" />

                    <div className="p-6">
                      <h3 className="text-xl font-display font-bold text-slate-900 mb-2 group-hover:text-primary-600 transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-sm text-slate-600 mb-4 line-clamp-2 leading-relaxed">
                        {project.description}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {project.tech_stack.map((tech) => (
                          <span key={tech} className="px-3 py-1 text-xs font-medium rounded-full border border-primary-200 text-primary-600 bg-primary-50">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
        </div>
      </div>

      {lightbox && (
        <LightboxModal
          images={lightbox.images}
          initialIndex={lightbox.index}
          onClose={() => setLightbox(null)}
        />
      )}
    </section>
  );
}
