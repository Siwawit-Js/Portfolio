import type { Skill } from '../types';

export const SKILLS: Skill[] = [
  // Hard Skills — Frontend
  { id: 'hs-1', name: 'React', category: 'Frontend', icon: 'react', proficiency: 90, sort_order: 1 },
  { id: 'hs-2', name: 'TypeScript', category: 'Frontend', icon: 'typescript', proficiency: 85, sort_order: 2 },
  { id: 'hs-3', name: 'Next.js', category: 'Frontend', icon: 'nextjs', proficiency: 80, sort_order: 3 },
  { id: 'hs-4', name: 'Tailwind CSS', category: 'Frontend', icon: 'tailwind', proficiency: 90, sort_order: 4 },

  // Hard Skills — Backend
  { id: 'hs-5', name: 'Node.js', category: 'Backend', icon: 'nodejs', proficiency: 80, sort_order: 5 },
  { id: 'hs-6', name: 'Express', category: 'Backend', icon: 'express', proficiency: 75, sort_order: 6 },
  { id: 'hs-12', name: 'REST API', category: 'Backend', icon: 'api', proficiency: 85, sort_order: 12 },

  // Hard Skills — Database
  { id: 'hs-7', name: 'PostgreSQL', category: 'Database', icon: 'postgresql', proficiency: 75, sort_order: 7 },
  { id: 'hs-8', name: 'MongoDB', category: 'Database', icon: 'mongodb', proficiency: 70, sort_order: 8 },

  // Hard Skills — Tools & DevOps
  { id: 'hs-9', name: 'Git', category: 'Tools', icon: 'git', proficiency: 85, sort_order: 9 },
  { id: 'hs-10', name: 'Docker', category: 'DevOps', icon: 'docker', proficiency: 65, sort_order: 10 },

  // Hard Skills — Design
  { id: 'hs-11', name: 'Figma', category: 'Design', icon: 'figma', proficiency: 75, sort_order: 11 },

  // Soft Skills
  { id: 'ss-1', name: 'Communication', category: 'Soft Skill', icon: 'communication', proficiency: 90, sort_order: 1 },
  { id: 'ss-2', name: 'Teamwork', category: 'Soft Skill', icon: 'teamwork', proficiency: 95, sort_order: 2 },
  { id: 'ss-3', name: 'Problem Solving', category: 'Soft Skill', icon: 'problem-solving', proficiency: 90, sort_order: 3 },
  { id: 'ss-4', name: 'Time Management', category: 'Soft Skill', icon: 'time-management', proficiency: 85, sort_order: 4 },
  { id: 'ss-5', name: 'Adaptability', category: 'Soft Skill', icon: 'adaptability', proficiency: 90, sort_order: 5 },
  { id: 'ss-6', name: 'Creativity', category: 'Soft Skill', icon: 'creativity', proficiency: 85, sort_order: 6 },
  { id: 'ss-7', name: 'Critical Thinking', category: 'Soft Skill', icon: 'critical-thinking', proficiency: 85, sort_order: 7 },
];

export const FRONTEND_CATEGORIES = ['frontend'];
export const SOFT_CATEGORIES = ['soft skill', 'soft skills', 'softskill'];

export const CATEGORY_LABEL: Record<string, string> = {
  Backend: 'Backend',
  Database: 'Database',
  Tools: 'Tools',
  DevOps: 'DevOps',
  Design: 'Design',
};
