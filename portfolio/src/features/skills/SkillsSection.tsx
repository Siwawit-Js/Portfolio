import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { getSkills } from '../../services/skills';
import { FRONTEND_CATEGORIES, SOFT_CATEGORIES, CATEGORY_LABEL } from '../../data/skills';
import type { Skill } from '../../types';

type SkillGroup = 'frontend' | 'soft' | 'other';
type ChipSize = 'sm' | 'md';

function classify(skill: Skill): SkillGroup {
  const cat = skill.category.toLowerCase();
  if (SOFT_CATEGORIES.includes(cat)) return 'soft';
  if (FRONTEND_CATEGORIES.includes(cat)) return 'frontend';
  return 'other';
}

function groupByCategory(skills: Skill[]): Record<string, Skill[]> {
  return skills.reduce<Record<string, Skill[]>>((acc, skill) => {
    (acc[skill.category] ??= []).push(skill);
    return acc;
  }, {});
}

const CHIP_BASE =
  'inline-flex items-center border border-primary-200 bg-primary-50 text-primary-600 font-semibold hover:border-primary-300 hover:bg-primary-100 transition-all duration-200 cursor-default';

const CHIP_SIZE: Record<ChipSize, string> = {
  sm: 'px-4 py-2 rounded-lg text-sm',
  md: 'px-5 py-2.5 rounded-xl text-sm',
};

function SkillChip({ name, index, size = 'md' }: { name: string; index: number; size?: ChipSize }) {
  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      className={`${CHIP_BASE} ${CHIP_SIZE[size]}`}
    >
      {name}
    </motion.span>
  );
}

function CategoryLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-xs font-semibold tracking-widest uppercase text-slate-500 mb-4">
      {children}
    </p>
  );
}

function ChipSkeleton({ count, width = 'w-28' }: { count: number; width?: string }) {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className={`animate-pulse h-10 ${width} rounded-xl bg-slate-100`} />
      ))}
    </>
  );
}

export function SkillsSection() {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [activeTab, setActiveTab] = useState<'technical' | 'soft'>('technical');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getSkills().then((data) => {
      setSkills(data);
      setLoading(false);
    });
  }, []);

  const frontendSkills = skills.filter((s) => classify(s) === 'frontend');
  const otherSkills = skills.filter((s) => classify(s) === 'other');
  const softSkills = skills.filter((s) => classify(s) === 'soft');
  const otherByCategory = groupByCategory(otherSkills);

  return (
    <section id="skills" className="relative py-24 sm:py-32">
      <div className="max-w-6xl mx-auto px-6 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-14"
        >
          <p className="text-xs font-semibold tracking-widest uppercase text-primary-400 mb-3">
            Skills & Expertise
          </p>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-slate-900">
            What I work with
          </h2>
        </motion.div>

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

        {activeTab === 'technical' && (
          <div className="space-y-10">
            {(loading || frontendSkills.length > 0) && (
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45 }}
              >
                <CategoryLabel>Front-end — Core Stack</CategoryLabel>
                <div className="flex flex-wrap gap-3">
                  {loading ? (
                    <ChipSkeleton count={4} />
                  ) : (
                    frontendSkills.map((skill, i) => (
                      <SkillChip key={skill.id} name={skill.name} index={i} />
                    ))
                  )}
                </div>
              </motion.div>
            )}

            <div className="grid sm:grid-cols-2 gap-x-10 gap-y-8">
              {Object.entries(otherByCategory).map(([category, catSkills], gi) => (
                <motion.div
                  key={category}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: gi * 0.05 }}
                >
                  <CategoryLabel>{CATEGORY_LABEL[category] ?? category}</CategoryLabel>
                  <div className="flex flex-wrap gap-2.5">
                    {catSkills.map((skill, i) => (
                      <SkillChip key={skill.id} name={skill.name} index={i} size="sm" />
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'soft' && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="flex flex-wrap gap-3"
          >
            {loading ? (
              <ChipSkeleton count={8} width="w-32" />
            ) : (
              softSkills.map((skill, i) => (
                <SkillChip key={skill.id} name={skill.name} index={i} />
              ))
            )}
          </motion.div>
        )}
      </div>
    </section>
  );
}
