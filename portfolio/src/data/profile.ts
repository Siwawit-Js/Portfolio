import type { Profile } from '../types';
import { PROJECTS } from '../data/projects';

export const PROFILE: Profile = {
  id: 'static-profile',
  name: 'Siwawit Jitkusolpasuk',
  role: 'Full Stack Developer, Web Developer, Tester',
  bio: 'Passionate developer always eager to learn new technologies and build meaningful web experiences.',
  about: `I build fast, reliable web applications end-to-end—from solid system structures to seamless user experiences.\nI craft complete web experiences, focusing on clean code, functional design, and delivering highly stable applications.\nDelivering robust web applications end-to-end, bridging the gap between system logic and intuitive user experiences.`,
  avatar_url: '/Profile.jpg',
  resume_url: null,
  email: 'siwawitwork@gmail.com',
  github: 'https://github.com/Siwawit-Js',
  linkedin: 'https://www.linkedin.com/in/siwawit-jitkusolpasuk-97486a384',
  facebook: null,
  stats: [
    { label: 'Projects', value: String(PROJECTS.length) },
    { label: 'Cups of Tea', value: '∞' },
    { label: 'Years Exp', value: '0' },
  ],
  updated_at: new Date().toISOString(),
};
