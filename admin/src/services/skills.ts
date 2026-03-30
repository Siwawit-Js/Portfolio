import { supabase } from '../lib/supabase';
import type { Skill, SkillFormData } from '../types';

export async function getSkills(): Promise<Skill[]> {
  const { data, error } = await supabase.from('skills').select('*').order('sort_order');
  if (error) throw error;
  return data || [];
}

export async function createSkill(skill: SkillFormData): Promise<Skill> {
  const { data, error } = await supabase.from('skills').insert(skill).select().single();
  if (error) throw error;
  return data;
}

export async function updateSkill(id: string, updates: Partial<SkillFormData>): Promise<Skill> {
  const { data, error } = await supabase.from('skills').update(updates).eq('id', id).select().single();
  if (error) throw error;
  return data;
}

export async function deleteSkill(id: string): Promise<void> {
  const { error } = await supabase.from('skills').delete().eq('id', id);
  if (error) throw error;
}
