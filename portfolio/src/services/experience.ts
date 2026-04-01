import { supabase, isSupabaseConfigured } from '../lib/supabase';
import type { Experience } from '../types';

export async function getExperience(): Promise<Experience[]> {
  if (!isSupabaseConfigured) return [];

  const { data, error } = await supabase
    .from('experience')
    .select('*')
    .order('sort_order', { ascending: true });

  if (error) { console.error('[experience]', error); return []; }
  return data ?? [];
}
