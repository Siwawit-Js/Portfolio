import { supabase, isSupabaseConfigured } from '../lib/supabase';
import type { Experience } from '../types';

const demoExperience: Experience[] = [
  {
    id: '1',
    title: 'Senior Full Stack Developer',
    company: 'TechCorp Inc.',
    location: 'San Francisco, CA',
    start_date: '2022-06-01',
    end_date: null,
    description: 'Leading development of microservices architecture. Built a real-time analytics dashboard serving 100K+ users. Mentoring junior developers and establishing coding best practices.',
    is_current: true,
    sort_order: 0,
  },
  {
    id: '2',
    title: 'Full Stack Developer',
    company: 'StartupXYZ',
    location: 'Remote',
    start_date: '2020-03-01',
    end_date: '2022-05-01',
    description: 'Developed and maintained multiple React applications. Implemented CI/CD pipelines reducing deployment time by 60%. Collaborated with design team to improve UX.',
    is_current: false,
    sort_order: 1,
  },
  {
    id: '3',
    title: 'Frontend Developer',
    company: 'Digital Agency',
    location: 'New York, NY',
    start_date: '2018-09-01',
    end_date: '2020-02-01',
    description: 'Built responsive web applications for various clients. Migrated legacy jQuery codebase to React. Improved page load times by 40% through optimization.',
    is_current: false,
    sort_order: 2,
  },
];

export async function getExperience(): Promise<Experience[]> {
  if (!isSupabaseConfigured) return demoExperience;

  const { data, error } = await supabase
    .from('experience')
    .select('*')
    .order('sort_order', { ascending: true });

  if (error || !data || data.length === 0) return demoExperience;
  return data;
}
