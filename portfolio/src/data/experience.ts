import type { Experience } from '../types';

export const EXPERIENCE: Experience[] = [
  {
    id: 'e-1',
    title: 'Full Stack Developer',
    company: 'Freelance',
    location: 'Thailand',
    start_date: '2024-01-01',
    end_date: null,
    description: 'Building modern web applications for various clients — from landing pages to complex dashboards. Working with React, Next.js, Node.js, and PostgreSQL.',
    is_current: true,
    sort_order: 1,
  },
  {
    id: 'e-2',
    title: 'Frontend Developer Intern',
    company: 'Tech Studio',
    location: 'Bangkok, Thailand',
    start_date: '2023-06-01',
    end_date: '2023-12-31',
    description: 'Developed responsive UI components and integrated REST APIs. Collaborated with designers to deliver pixel-perfect user interfaces.',
    is_current: false,
    sort_order: 2,
  },
  {
    id: 'e-3',
    title: 'Computer Science Student',
    company: 'University',
    location: 'Thailand',
    start_date: '2021-08-01',
    end_date: '2024-05-31',
    description: 'Studied software engineering, data structures, algorithms, and web development. Built several class projects exploring different stacks.',
    is_current: false,
    sort_order: 3,
  },
];
