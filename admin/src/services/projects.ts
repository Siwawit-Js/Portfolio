import { supabase } from '../lib/supabase';
import type { Project, ProjectFormData } from '../types';

export async function getProjects(): Promise<Project[]> {
  const { data, error } = await supabase.from('projects').select('*').order('sort_order');
  if (error) throw error;
  return data || [];
}

export async function createProject(project: ProjectFormData): Promise<Project> {
  const { data, error } = await supabase.from('projects').insert(project).select().single();
  if (error) throw error;
  return data;
}

export async function updateProject(id: string, updates: Partial<ProjectFormData>): Promise<Project> {
  const { data, error } = await supabase.from('projects').update(updates).eq('id', id).select().single();
  if (error) throw error;
  return data;
}

export async function deleteProject(id: string): Promise<void> {
  const { error } = await supabase.from('projects').delete().eq('id', id);
  if (error) throw error;
}
