import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import * as Icons from 'lucide-react';
import { getSkills } from '../../services/skills';
import type { Skill } from '../../types';

function getIcon(iconName: string | null) {
  if (!iconName) return Icons.Sparkles;
  const formatted = iconName
    .split('-')
    .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
    .join('');
  return (Icons as unknown as Record<string, React.ComponentType<{ className?: string }>>)[formatted] || Icons.Sparkles;
}

export function SkillsSection() {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getSkills().then((data) => {
      setSkills(data);
      setLoading(false);
    });
  }, []);

  const categories = ['All', ...Array.from(new Set(skills.map((s) => s.category)))];
  const filtered = activeCategory === 'All' ? skills : skills.filter((s) => s.category === activeCategory);

  return (
    <section id="skills" className="relative py-24 sm:py-32">
      {/* Background accent */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary-500/[0.02] to-transparent pointer-events-none" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <span className="inline-block text-sm font-semibold text-primary-500 tracking-wider uppercase mb-3">Skills & Expertise</span>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white">
            Technologies I{' '}
            <span className="bg-gradient-to-r from-primary-500 to-accent-400 bg-clip-text text-transparent">Work With</span>
          </h2>
        </motion.div>

        {/* Category tabs */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="flex flex-wrap justify-center gap-2 mb-12"
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
                activeCategory === cat
                  ? 'bg-primary-500 text-white shadow-lg shadow-primary-500/25'
                  : 'text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-white/10 hover:border-primary-500/30 hover:text-primary-500 bg-white/50 dark:bg-white/5'
              }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Skills grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {loading
            ? Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="animate-pulse rounded-2xl border border-white/10 bg-white/5 p-6 h-40" />
              ))
            : filtered.map((skill, i) => {
                const Icon = getIcon(skill.icon);
                return (
                  <motion.div
                    key={skill.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.05 }}
                    className="group relative rounded-2xl border border-slate-200 dark:border-white/10 bg-white/80 dark:bg-white/5 backdrop-blur-md p-6 hover:border-primary-500/30 hover:shadow-lg hover:shadow-primary-500/5 transition-all duration-300 hover:-translate-y-1"
                  >
                    {/* Icon */}
                    <div className="w-12 h-12 rounded-xl bg-primary-500/10 flex items-center justify-center mb-4 group-hover:bg-primary-500/20 transition-colors duration-300">
                      <Icon className="w-6 h-6 text-primary-500" />
                    </div>

                    {/* Name */}
                    <h3 className="font-semibold text-slate-900 dark:text-white mb-1">{skill.name}</h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mb-3">{skill.category}</p>

                    {/* Progress bar */}
                    <div className="w-full bg-slate-200 dark:bg-white/10 rounded-full h-1.5">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.proficiency}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.3 + i * 0.05 }}
                        className="h-1.5 rounded-full bg-gradient-to-r from-primary-500 to-accent-400"
                      />
                    </div>
                    <span className="text-xs text-slate-400 mt-1 block text-right">{skill.proficiency}%</span>
                  </motion.div>
                );
              })}
        </div>
      </div>
    </section>
  );
}
