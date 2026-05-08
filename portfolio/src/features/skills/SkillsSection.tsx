import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
  Sparkles,
  // Soft skill icons
  MessageSquare,
  Users,
  Lightbulb,
  Clock,
  Repeat,
  Palette,
  Brain,
  Crown,
  Heart,
  HeartHandshake,
  Ear,
  Mic,
  Target,
  Compass,
  GraduationCap,
  Scale,
  Shield,
  Smile,
  TrendingUp,
  Eye,
  // Hard skill icons (lucide doesn't ship brand logos, use generic mapping)
  Code2,
  FileCode2,
  Atom,
  Boxes,
  Cloud,
  Database,
  GitBranch,
  Container,
  Figma,
  Server,
  Globe,
  Zap,
  Wind,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { getSkills } from '../../services/skills';
import type { Skill } from '../../types';

const SOFT_SKILL_ICONS: Record<string, LucideIcon> = {
  communication: MessageSquare,
  teamwork: Users,
  collaboration: HeartHandshake,
  leadership: Crown,
  'problem-solving': Lightbulb,
  problemsolving: Lightbulb,
  'critical-thinking': Brain,
  criticalthinking: Brain,
  'time-management': Clock,
  timemanagement: Clock,
  adaptability: Repeat,
  flexibility: Repeat,
  creativity: Palette,
  empathy: Heart,
  'active-listening': Ear,
  activelistening: Ear,
  'public-speaking': Mic,
  publicspeaking: Mic,
  presentation: Mic,
  focus: Target,
  goal: Target,
  mentoring: GraduationCap,
  teaching: GraduationCap,
  'decision-making': Scale,
  decisionmaking: Scale,
  'conflict-resolution': Shield,
  conflictresolution: Shield,
  resilience: Shield,
  positivity: Smile,
  attitude: Smile,
  growth: TrendingUp,
  'continuous-learning': TrendingUp,
  curiosity: Eye,
  initiative: Compass,
  ownership: Compass,
};

const HARD_SKILL_ICONS: Record<string, LucideIcon> = {
  react: Atom,
  'react.js': Atom,
  reactjs: Atom,
  typescript: FileCode2,
  ts: FileCode2,
  javascript: Code2,
  js: Code2,
  nextjs: Boxes,
  'next.js': Boxes,
  next: Boxes,
  tailwind: Wind,
  'tailwindcss': Wind,
  'tailwind-css': Wind,
  nodejs: Server,
  'node.js': Server,
  node: Server,
  express: Server,
  postgresql: Database,
  postgres: Database,
  mongodb: Database,
  mysql: Database,
  database: Database,
  git: GitBranch,
  github: GitBranch,
  docker: Container,
  kubernetes: Container,
  k8s: Container,
  aws: Cloud,
  azure: Cloud,
  gcp: Cloud,
  cloud: Cloud,
  figma: Figma,
  api: Globe,
  rest: Globe,
  'rest-api': Globe,
  graphql: Zap,
};

function normalizeKey(value: string | null | undefined): string {
  if (!value) return '';
  return value.trim().toLowerCase().replace(/\s+/g, '-');
}

function pickIcon(skill: Skill, kind: 'hard' | 'soft'): LucideIcon {
  const map = kind === 'soft' ? SOFT_SKILL_ICONS : HARD_SKILL_ICONS;
  const fromIcon = map[normalizeKey(skill.icon)];
  if (fromIcon) return fromIcon;
  const fromName = map[normalizeKey(skill.name)];
  if (fromName) return fromName;
  return kind === 'soft' ? Sparkles : Code2;
}

const SOFT_SKILL_CATEGORIES = ['softskill', 'soft skill', 'soft skills'];

function classifySkill(skill: Skill): 'hard' | 'soft' {
  return SOFT_SKILL_CATEGORIES.includes(skill.category.toLowerCase()) ? 'soft' : 'hard';
}

export function SkillsSection() {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [activeTab, setActiveTab] = useState<'hard' | 'soft'>('hard');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getSkills().then((data) => {
      setSkills(data);
      setLoading(false);
    });
  }, []);

  const hardSkills = skills.filter((s) => classifySkill(s) === 'hard');
  const softSkills = skills.filter((s) => classifySkill(s) === 'soft');
  const filtered = activeTab === 'hard' ? hardSkills : softSkills;

  return (
    <section id="skills" className="relative py-24 sm:py-32">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-nebula-500/[0.04] to-transparent pointer-events-none" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-nebula-400/30 bg-nebula-500/10 text-nebula-300 text-xs font-semibold tracking-wider uppercase mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            Skills & Expertise
          </span>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-white">
            Constellations of{' '}
            <span className="gradient-text-galaxy">Knowledge</span>
          </h2>
        </motion.div>

        {/* Hard / Soft tabs */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="flex justify-center mb-12"
        >
          <div className="inline-flex rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md p-1 gap-1">
            {(['hard', 'soft'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-8 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 ${
                  activeTab === tab
                    ? 'bg-gradient-to-r from-primary-500 to-nebula-500 text-white shadow-glow-space'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {tab === 'hard' ? 'Hard Skills' : 'Soft Skills'}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Skills grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {loading ? (
            Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="animate-pulse rounded-2xl border border-white/10 bg-white/5 p-6 h-28" />
            ))
          ) : filtered.length === 0 ? (
            <div className="col-span-full text-center py-12 text-slate-400">
              No {activeTab === 'hard' ? 'hard' : 'soft'} skills added yet.
            </div>
          ) : (
            filtered.map((skill, i) => {
              const Icon = pickIcon(skill, activeTab);
              return (
                <motion.div
                  key={skill.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                  className="group relative rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-md p-6 hover:border-nebula-400/40 hover:bg-white/[0.06] hover:shadow-glow-nebula transition-all duration-300 hover:-translate-y-1 overflow-hidden"
                >
                  {/* Twinkle accent */}
                  <span className="absolute top-3 right-3 w-1 h-1 rounded-full bg-white/60 animate-twinkle" />

                  <div className="relative w-12 h-12 rounded-xl bg-gradient-to-br from-primary-500/20 to-nebula-500/20 border border-white/10 flex items-center justify-center mb-4 group-hover:from-primary-500/30 group-hover:to-nebula-500/30 transition-colors duration-300">
                    <Icon className="w-6 h-6 text-nebula-300" />
                  </div>
                  <h3 className="font-semibold text-white mb-1">{skill.name}</h3>
                  <p className="text-xs text-slate-400">{skill.category}</p>

                  {/* Proficiency bar */}
                  {typeof skill.proficiency === 'number' && (
                    <div className="mt-3 h-1 w-full rounded-full bg-white/5 overflow-hidden">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-primary-400 via-nebula-400 to-cosmos-400"
                        style={{ width: `${Math.min(100, Math.max(0, skill.proficiency))}%` }}
                      />
                    </div>
                  )}
                </motion.div>
              );
            })
          )}
        </div>
      </div>
    </section>
  );
}
