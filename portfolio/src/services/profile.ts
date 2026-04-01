import { supabase, isSupabaseConfigured } from '../lib/supabase';
import type { Profile } from '../types';

export async function getProfile(): Promise<Profile | null> {
  if (!isSupabaseConfigured) return null;

  const { data, error } = await supabase
    .from('profile')
    .select('*')
    .limit(1)
    .single();

  if (error || !data) { console.error('[profile]', error); return null; }
  return data;
}
