import { supabase, isSupabaseConfigured } from '../lib/supabase';
import type { Project } from '../types';

export async function getProjects(): Promise<Project[]> {
  if (!isSupabaseConfigured) return [];

  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .order('sort_order', { ascending: true });

  if (error) { console.error('[projects]', error); return []; }
  return data ?? [];
}
