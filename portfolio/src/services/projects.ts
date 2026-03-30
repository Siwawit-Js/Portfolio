import { supabase, isSupabaseConfigured } from '../lib/supabase';
import type { Project } from '../types';

const demoProjects: Project[] = [
  {
    id: '1',
    title: 'E-Commerce Platform',
    description: 'A modern e-commerce platform built with React and Node.js. Features include real-time inventory, payment processing, and admin dashboard.',
    image_url: null,
    tech_stack: ['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'Stripe'],
    live_url: 'https://example.com',
    github_url: 'https://github.com',
    featured: true,
    sort_order: 0,
    created_at: new Date().toISOString(),
  },
  {
    id: '2',
    title: 'Task Management App',
    description: 'A collaborative task management application with real-time updates, drag-and-drop boards, and team workspaces.',
    image_url: null,
    tech_stack: ['Next.js', 'Prisma', 'WebSocket', 'Tailwind CSS'],
    live_url: 'https://example.com',
    github_url: 'https://github.com',
    featured: true,
    sort_order: 1,
    created_at: new Date().toISOString(),
  },
  {
    id: '3',
    title: 'AI Content Generator',
    description: 'An AI-powered content generation tool that uses GPT models to create blog posts, social media content, and marketing copy.',
    image_url: null,
    tech_stack: ['Python', 'FastAPI', 'React', 'OpenAI', 'Redis'],
    live_url: 'https://example.com',
    github_url: 'https://github.com',
    featured: false,
    sort_order: 2,
    created_at: new Date().toISOString(),
  },
  {
    id: '4',
    title: 'Real-Time Chat App',
    description: 'A secure messaging platform with end-to-end encryption, file sharing, and group conversations.',
    image_url: null,
    tech_stack: ['React', 'Socket.io', 'Express', 'MongoDB'],
    live_url: null,
    github_url: 'https://github.com',
    featured: false,
    sort_order: 3,
    created_at: new Date().toISOString(),
  },
];

export async function getProjects(): Promise<Project[]> {
  if (!isSupabaseConfigured) return demoProjects;

  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .order('sort_order', { ascending: true });

  if (error || !data || data.length === 0) return demoProjects;
  return data;
}
