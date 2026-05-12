import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { getSkills } from '../../services/skills';
import type { Skill } from '../../types';

const FRONTEND_CATEGORIES = ['frontend'];
const SOFT_CATEGORIES = ['soft skill', 'soft skills', 'softskill'];

function classify(skill: Skill): 'frontend' | 'soft' | 'other' {
  const cat = skill.category.toLowerCase();
  if (SOFT_CATEGORIES.includes(cat)) return 'soft';
  if (FRONTEND_CATEGORIES.includes(cat)) return 'frontend';
  return 'other';
}

const CATEGORY_LABEL: Record<string, string> = {
  Backend: 'Backend',
  Database: 'Database',
  Tools: 'Tools',
  DevOps: 'DevOps',
  Design: 'Design',
};

export function SkillsSection() {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [activeTab, setActiveTab] = useState<'technical' | 'soft'>('technical');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getSkills().then((data) => { setSkills(data); setLoading(false); });
  }, []);

  const frontendSkills = skills.filter((s) => classify(s) === 'frontend');
  const otherSkills = skills.filter((s) => classify(s) === 'other');
  const softSkills = skills.filter((s) => classify(s) === 'soft');

  // Group other hard skills by category
  const otherByCategory = otherSkills.reduce<Record<string, Skill[]>>((acc, skill) => {
    const cat = skill.category;
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(skill);
    return acc;
  }, {});

  return (
    <section id="skills" className="relative py-24 sm:py-32">
      <div className="max-w-6xl mx-auto px-6 sm:px-8">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-14"
        >
          <p className="text-xs font-semibold tracking-widest uppercase text-primary-400 mb-3">Skills & Expertise</p>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-slate-900">
            What I work with
          </h2>
        </motion.div>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="flex gap-1 mb-12 border-b border-slate-200 w-fit"
        >
          {(['technical', 'soft'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-2.5 text-sm font-medium transition-all duration-200 border-b-2 -mb-px ${
                activeTab === tab
                  ? 'border-primary-400 text-slate-900'
                  : 'border-transparent text-slate-500 hover:text-slate-700'
              }`}
            >
              {tab === 'technical' ? 'Technical' : 'Soft Skills'}
            </button>
          ))}
        </motion.div>

        {/* Technical Skills */}
        {activeTab === 'technical' && (
          <div className="space-y-10">
            {/* Frontend — featured */}
            {(loading || frontendSkills.length > 0) && (
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45 }}
              >
                <p className="text-xs font-semibold tracking-widest uppercase text-slate-500 mb-4">
                  Front-end — Core Stack
                </p>
                <div className="flex flex-wrap gap-3">
                  {loading
                    ? Array.from({ length: 4 }).map((_, i) => (
                        <div key={i} className="animate-pulse h-10 w-28 rounded-xl bg-slate-100" />
                      ))
                    : frontendSkills.map((skill, i) => (
                        <motion.span
                          key={skill.id}
                          initial={{ opacity: 0, scale: 0.9 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.3, delay: i * 0.06 }}
                          className="inline-flex items-center px-5 py-2.5 rounded-xl border border-primary-200 bg-primary-50 text-primary-600 text-sm font-semibold hover:border-primary-300 hover:bg-primary-100 transition-all duration-200 cursor-default"
                        >
                          {skill.name}
                        </motion.span>
                      ))}
                </div>
              </motion.div>
            )}

            {/* Other categories */}
            {Object.entries(otherByCategory).map(([category, catSkills], gi) => (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: gi * 0.05 }}
              >
                <p className="text-xs font-semibold tracking-widest uppercase text-slate-500 mb-4">
                  {CATEGORY_LABEL[category] ?? category}
                </p>
                <div className="flex flex-wrap gap-2.5">
                  {catSkills.map((skill, i) => (
                    <motion.span
                      key={skill.id}
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.25, delay: i * 0.04 }}
                      className="inline-flex items-center px-5 py-2.5 rounded-xl border border-primary-200 bg-primary-50 text-primary-600 text-sm font-semibold hover:border-primary-300 hover:bg-primary-100 transition-all duration-200 cursor-default"
                    >
                      {skill.name}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Soft Skills */}
        {activeTab === 'soft' && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="flex flex-wrap gap-3"
          >
            {loading
              ? Array.from({ length: 8 }).map((_, i) => (
                  <div key={i} className="animate-pulse h-10 w-32 rounded-xl bg-slate-100" />
                ))
              : softSkills.map((skill, i) => (
                  <motion.span
                    key={skill.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: i * 0.05 }}
                    className="inline-flex items-center px-5 py-2.5 rounded-xl border border-primary-200 bg-primary-50 text-primary-600 text-sm font-semibold hover:border-primary-300 hover:bg-primary-100 transition-all duration-200 cursor-default"
                  >
                    {skill.name}
                  </motion.span>
                ))}
          </motion.div>
        )}
      </div>
    </section>
  );
}
