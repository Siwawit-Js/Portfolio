import { motion } from 'framer-motion';
import { SKILLS } from '../data/skills';
import { Section } from '../components/layout/Section';

const ORDER = ['Frontend', 'Backend', 'Database', 'Tools', 'DevOps', 'Design', 'AI Tools', 'Soft Skill'];

export function Skills() {
  const grouped = ORDER.map((cat) => ({
    category: cat,
    items: SKILLS.filter((s) => s.category === cat).sort((a, b) => a.sort_order - b.sort_order),
  })).filter((g) => g.items.length > 0);

  return (
    <Section
      id="skills"
      index="02"
      eyebrow="Skills"
      title={
        <>
          The toolbox,<br />
          <span className="italic display-wonk text-signal">typeset.</span>
        </>
      }
    >
      <div className="grid grid-cols-12 gap-6">
        {grouped.map((group, i) => (
          <motion.div
            key={group.category}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, delay: i * 0.05 }}
            className="col-span-12 border-t border-ink/15 pt-6 md:col-span-6"
          >
            <div className="mb-6 flex items-baseline justify-between">
              <h3 className="font-display text-2xl tracking-editorial">
                {group.category === 'Soft Skill' ? 'Soft skills' : group.category}
              </h3>
              <span className="marker text-ink/50">
                {String(i + 1).padStart(2, '0')} / {String(grouped.length).padStart(2, '0')}
              </span>
            </div>

            <ul className="flex flex-wrap items-baseline gap-x-3 gap-y-2 font-display text-2xl tracking-editorial md:text-3xl">
              {group.items.map((skill, idx) => (
                <li key={skill.id} className="flex items-baseline gap-3">
                  <span className="text-ink transition-colors hover:text-signal cursor-default">
                    {skill.name}
                  </span>
                  {idx < group.items.length - 1 && (
                    <span className="text-signal/60 text-xl">·</span>
                  )}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
