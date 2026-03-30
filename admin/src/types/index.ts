export interface Profile {
  id: string;
  name: string;
  role: string;
  bio: string | null;
  about: string | null;
  avatar_url: string | null;
  resume_url: string | null;
  email: string | null;
  github: string | null;
  linkedin: string | null;
  updated_at: string;
}

export interface Project {
  id: string;
  title: string;
  description: string | null;
  image_url: string | null;
  tech_stack: string[];
  live_url: string | null;
  github_url: string | null;
  featured: boolean;
  sort_order: number;
  created_at: string;
}

export interface Skill {
  id: string;
  name: string;
  category: string;
  icon: string | null;
  proficiency: number;
  sort_order: number;
}

export interface Experience {
  id: string;
  title: string;
  company: string;
  location: string | null;
  start_date: string;
  end_date: string | null;
  description: string | null;
  is_current: boolean;
  sort_order: number;
}

export type ProjectFormData = Omit<Project, 'id' | 'created_at'>;
export type SkillFormData = Omit<Skill, 'id'>;
export type ExperienceFormData = Omit<Experience, 'id'>;
export type ProfileFormData = Omit<Profile, 'id' | 'updated_at'>;
