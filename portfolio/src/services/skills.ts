import { supabase, isSupabaseConfigured } from '../lib/supabase';
import type { Skill } from '../types';

const demoSkills: Skill[] = [
  { id: '1', name: 'React', category: 'Frontend', icon: 'code-2', proficiency: 95, sort_order: 0 },
  { id: '2', name: 'TypeScript', category: 'Frontend', icon: 'file-code', proficiency: 90, sort_order: 1 },
  { id: '3', name: 'Next.js', category: 'Frontend', icon: 'globe', proficiency: 88, sort_order: 2 },
  { id: '4', name: 'Tailwind CSS', category: 'Frontend', icon: 'palette', proficiency: 92, sort_order: 3 },
  { id: '5', name: 'Node.js', category: 'Backend', icon: 'server', proficiency: 88, sort_order: 4 },
  { id: '6', name: 'PostgreSQL', category: 'Backend', icon: 'database', proficiency: 85, sort_order: 5 },
  { id: '7', name: 'Python', category: 'Backend', icon: 'terminal', proficiency: 80, sort_order: 6 },
  { id: '8', name: 'GraphQL', category: 'Backend', icon: 'git-branch', proficiency: 78, sort_order: 7 },
  { id: '9', name: 'Docker', category: 'DevOps', icon: 'box', proficiency: 82, sort_order: 8 },
  { id: '10', name: 'AWS', category: 'DevOps', icon: 'cloud', proficiency: 75, sort_order: 9 },
  { id: '11', name: 'Git', category: 'DevOps', icon: 'git-merge', proficiency: 90, sort_order: 10 },
  { id: '12', name: 'Figma', category: 'Design', icon: 'figma', proficiency: 70, sort_order: 11 },
];

export async function getSkills(): Promise<Skill[]> {
  if (!isSupabaseConfigured) return demoSkills;

  const { data, error } = await supabase
    .from('skills')
    .select('*')
    .order('sort_order', { ascending: true });

  if (error || !data || data.length === 0) return demoSkills;
  return data;
}
