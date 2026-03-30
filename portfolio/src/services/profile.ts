import { supabase, isSupabaseConfigured } from '../lib/supabase';
import type { Profile } from '../types';

const demoProfile: Profile = {
  id: 'demo',
  name: 'Alex Johnson',
  role: 'Full Stack Developer',
  bio: 'Crafting digital experiences with clean code and thoughtful design. Passionate about building products that make a difference.',
  about: 'I\'m a passionate full-stack developer with 5+ years of experience building modern web applications. I specialize in React, TypeScript, and Node.js, and I love turning complex problems into simple, elegant solutions.\n\nWhen I\'m not coding, you\'ll find me exploring new technologies, contributing to open source, or sharing knowledge through blog posts and talks.',
  avatar_url: null,
  resume_url: null,
  email: 'alex@example.com',
  github: 'https://github.com',
  linkedin: 'https://linkedin.com',
  updated_at: new Date().toISOString(),
};

export async function getProfile(): Promise<Profile> {
  if (!isSupabaseConfigured) return demoProfile;

  const { data, error } = await supabase
    .from('profile')
    .select('*')
    .limit(1)
    .single();

  if (error || !data) return demoProfile;
  return data;
}
