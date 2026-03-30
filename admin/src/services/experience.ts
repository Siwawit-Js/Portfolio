import { supabase } from '../lib/supabase';
import type { Experience, ExperienceFormData } from '../types';

export async function getExperiences(): Promise<Experience[]> {
  const { data, error } = await supabase.from('experience').select('*').order('sort_order');
  if (error) throw error;
  return data || [];
}

export async function createExperience(exp: ExperienceFormData): Promise<Experience> {
  const { data, error } = await supabase.from('experience').insert(exp).select().single();
  if (error) throw error;
  return data;
}

export async function updateExperience(id: string, updates: Partial<ExperienceFormData>): Promise<Experience> {
  const { data, error } = await supabase.from('experience').update(updates).eq('id', id).select().single();
  if (error) throw error;
  return data;
}

export async function deleteExperience(id: string): Promise<void> {
  const { error } = await supabase.from('experience').delete().eq('id', id);
  if (error) throw error;
}
