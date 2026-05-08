import { EXPERIENCE } from '../data/static';
import type { Experience } from '../types';

export async function getExperience(): Promise<Experience[]> {
  return [...EXPERIENCE].sort((a, b) => a.sort_order - b.sort_order);
}
