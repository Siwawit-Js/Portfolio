import type { Profile } from '../types';

export const PROFILE: Profile = {
  id: 'static-profile',
  name: 'Siwawit Jitkusolpasuk',
  role: 'Full Stack Developer, Web Developer, Tester',
  bio: 'Passionate developer always eager to learn new technologies and build meaningful web experiences.',
  about: `I am a passionate full-stack developer who loves turning ideas into reality through clean code and thoughtful design.\nMy journey in software engineering is driven by curiosity — exploring the universe of technology one project at a time.\nWhen I'm not coding, you'll find me watching movies, listening to music, or sipping a good cup of tea.`,
  avatar_url: '/Profile.jpg',
  resume_url: null,
  email: 'siwawitwork@gmail.com',
  github: 'https://github.com/Siwawit-Js',
  linkedin: 'https://www.linkedin.com/in/siwawit-jitkusolpasuk-97486a384',
  facebook: null,
  stats: [
    { label: 'Projects', value: '10+' },
    { label: 'Cups of Tea', value: '∞' },
    { label: 'Years Exp', value: '0' },
  ],
  updated_at: new Date().toISOString(),
};
