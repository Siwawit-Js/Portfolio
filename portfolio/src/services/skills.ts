import { supabase, isSupabaseConfigured } from '../lib/supabase';
import type { Skill } from '../types';

export async function getSkills(): Promise<Skill[]> {
  if (!isSupabaseConfigured) return [];

  const { data, error } = await supabase
    .from('skills')
    .select('*')
    .order('sort_order', { ascending: true });

  if (error) { console.error('[skills]', error); return []; }
  return data ?? [];
}
