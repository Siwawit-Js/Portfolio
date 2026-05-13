import type { Experience } from '../types';

export const EXPERIENCE: Experience[] = [
  {
    id: 'e-1',
    title: 'Web Developer Intern',
    company: 'CodeHard Co., Ltd.',
    location: 'Nonthaburi, Thailand',
    start_date: '2026-01-12',
    end_date: '2026-5-15',
    description: 'Interned as a Web Developer with a primary focus on frontend development — built and refined UI components, debugged issues through root-cause analysis, and performed QA testing to catch regressions before release.',
    is_current: true,
    sort_order: 2,
  },
  {
    id: 'e-2',
    title: 'Computer Science Student',
    company: 'Bangkok University',
    location: 'Pathum Thani, Thailand',
    start_date: '2022-08-01',
    end_date: '2026-05-31',
    description: 'Studied software engineering, data structures, algorithms, and web development. Built several class projects exploring different stacks.',
    is_current: false,
    sort_order: 3,
  },
];
