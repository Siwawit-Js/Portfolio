import { supabase } from '../lib/supabase';
import type { Profile, ProfileFormData } from '../types';

export async function getProfile(): Promise<Profile | null> {
  const { data, error } = await supabase.from('profile').select('*').limit(1).single();
  if (error) return null;
  return data;
}

export async function updateProfile(id: string, updates: Partial<ProfileFormData>): Promise<Profile> {
  const { data, error } = await supabase
    .from('profile')
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function createProfile(profile: ProfileFormData): Promise<Profile> {
  const { data, error } = await supabase.from('profile').insert(profile).select().single();
  if (error) throw error;
  return data;
}
