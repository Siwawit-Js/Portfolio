export interface StatItem {
  label: string;
  value: string;
}

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
  facebook: string | null;
  stats: StatItem[] | null;
  updated_at: string;
}

export type ProjectCategory = 'web' | 'uiux' | 'mobile';

export interface Project {
  id: string;
  title: string;
  short_description: string | null;
  description: string | null;
  category: ProjectCategory;
  image_url: string | null;
  images: string[];
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
