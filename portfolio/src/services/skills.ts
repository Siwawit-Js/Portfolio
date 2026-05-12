import { SKILLS } from '../data/skills';
import type { Skill } from '../types';

export async function getSkills(): Promise<Skill[]> {
  return [...SKILLS].sort((a, b) => a.sort_order - b.sort_order);
}
