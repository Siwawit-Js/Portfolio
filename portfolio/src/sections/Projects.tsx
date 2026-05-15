import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { PROJECTS } from '../data/projects';

export function Projects() {
  const items = [...PROJECTS].sort((a, b) => a.sort_order - b.sort_order);

  return (
    <section id="projects" className="relative px-6 py-24 md:px-12 md:py-32 lg:px-20 bg-background z-10">
      <div className="mx-auto w-full max-w-[1000px]">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-start justify-between mb-16 gap-6">
          <div className="flex items-start gap-12 lg:gap-24">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-block border border-primary/40 rounded-full px-5 py-2 text-sm font-medium text-ink bg-white/50 backdrop-blur-sm whitespace-nowrap"
            >
              My Work
            </motion.div>
            
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="font-display font-medium text-[clamp(2.5rem,6vw,5.5rem)] leading-[1.05] tracking-tight text-ink"
            >
              Selected<br />Work 20 -24"
            </motion.h2>
          </div>

          <motion.a 
            href="#projects"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="hidden md:flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-full font-medium text-sm hover:bg-primary/90 transition-all shadow-sm self-start mt-2"
          >
            See All <ArrowRight size={16} />
          </motion.a>
        </div>

        {/* Project List */}
        <div className="flex flex-col mt-10">
          {items.map((project, i) => {
            const year = project.created_at ? new Date(project.created_at).getFullYear() : '2024';
            
            return (
              <motion.div 
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group flex flex-col md:flex-row md:items-center justify-between py-10 border-t border-rule/50 hover:bg-surface/30 transition-colors px-4 -mx-4 rounded-xl"
              >
                <div className="flex flex-col md:flex-row md:items-start gap-4 md:gap-24 w-full md:w-auto mb-6 md:mb-0">
                  <span className="font-medium text-lg text-ink/70 min-w-[60px]">
                    {year}
                  </span>
                  <div>
                    <h3 className="font-semibold text-2xl text-ink group-hover:text-primary transition-colors">
                      {project.title}
                    </h3>
                    <span className="text-muted text-base mt-1 block max-w-sm">
                      {project.description?.slice(0, 50)}...
                    </span>
                  </div>
                </div>
                
                <div className="flex items-center justify-start md:justify-end w-full md:w-auto mt-4 md:mt-0">
                  <div className="w-[280px] h-[160px] bg-rule rounded-xl overflow-hidden shadow-sm transition-transform duration-500 group-hover:scale-105 group-hover:shadow-lg">
                    {project.image_url ? (
                      <img 
                        src={project.image_url} 
                        className="w-full h-full object-cover" 
                        alt={project.title} 
                      />
                    ) : (
                      <div className="w-full h-full bg-surface flex items-center justify-center">
                        <span className="text-muted font-display text-2xl">{project.title.charAt(0)}</span>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Mobile See All Button */}
        <div className="mt-8 flex justify-center md:hidden">
          <motion.a 
            href="#projects"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-full font-medium text-sm hover:bg-primary/90 transition-all shadow-sm"
          >
            See All <ArrowRight size={16} />
          </motion.a>
        </div>

      </div>
    </section>
  );
}
