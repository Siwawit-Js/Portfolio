import { PROJECTS } from '../data/projects';
import type { Project } from '../types';

export async function getProjects(): Promise<Project[]> {
  return [...PROJECTS].sort((a, b) => a.sort_order - b.sort_order);
}
