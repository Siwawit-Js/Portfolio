import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Briefcase, MapPin, Calendar, Orbit } from 'lucide-react';
import { getExperience } from '../../services/experience';
import { formatDate } from '../../utils/helpers';
import type { Experience } from '../../types';

export function ExperienceSection() {
  const [experience, setExperience] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getExperience().then((data) => {
      setExperience(data);
      setLoading(false);
    });
  }, []);

  return (
    <section id="experience" className="relative py-24 sm:py-32">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary-500/[0.03] to-transparent pointer-events-none" />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-aurora-400/30 bg-aurora-500/10 text-aurora-400 text-xs font-semibold tracking-wider uppercase mb-4">
            <Orbit className="w-3.5 h-3.5" />
            Career Path
          </span>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-white">
            Work{' '}
            <span className="gradient-text-galaxy">Trajectory</span>
          </h2>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line — glowing nebula */}
          <div className="absolute left-4 sm:left-8 top-0 bottom-0 w-px bg-gradient-to-b from-primary-500 via-nebula-500/50 to-transparent" />

          <div className="space-y-8">
            {loading
              ? Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="animate-pulse ml-12 sm:ml-20 rounded-2xl border border-white/10 bg-white/5 p-6 h-40" />
                ))
              : experience.map((exp, i) => (
                  <motion.div
                    key={exp.id}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                    className="relative pl-12 sm:pl-20"
                  >
                    {/* Timeline dot — orbital marker */}
                    <div className="absolute left-0 sm:left-4 top-6 flex items-center justify-center">
                      <div className={`relative w-9 h-9 rounded-full border-2 ${exp.is_current ? 'border-aurora-400 bg-aurora-500/20 shadow-glow-cosmos' : 'border-white/20 bg-space-900'} flex items-center justify-center`}>
                        {exp.is_current && <span className="absolute inset-0 rounded-full border-2 border-aurora-400/40 animate-ping" />}
                        <Briefcase className={`w-4 h-4 ${exp.is_current ? 'text-aurora-400' : 'text-slate-400'}`} />
                      </div>
                    </div>

                    {/* Card */}
                    <div className="rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-md p-6 hover:border-nebula-400/30 hover:bg-white/[0.05] transition-all duration-300">
                      {/* Current badge */}
                      {exp.is_current && (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-aurora-500/15 text-aurora-400 text-xs font-medium mb-3 border border-aurora-500/30">
                          <span className="w-1.5 h-1.5 rounded-full bg-aurora-400 animate-pulse" />
                          Current
                        </span>
                      )}

                      <h3 className="text-lg font-display font-bold text-white">{exp.title}</h3>
                      <p className="text-nebula-300 font-medium mt-1">{exp.company}</p>

                      <div className="flex flex-wrap gap-4 mt-3 text-sm text-slate-400">
                        {exp.location && (
                          <span className="flex items-center gap-1.5">
                            <MapPin className="w-3.5 h-3.5" /> {exp.location}
                          </span>
                        )}
                        <span className="flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5" />
                          {formatDate(exp.start_date)} — {exp.is_current ? 'Present' : exp.end_date ? formatDate(exp.end_date) : 'N/A'}
                        </span>
                      </div>

                      {exp.description && (
                        <p className="mt-4 text-sm text-slate-300 leading-relaxed">{exp.description}</p>
                      )}
                    </div>
                  </motion.div>
                ))}
          </div>
        </div>
      </div>
    </section>
  );
}
