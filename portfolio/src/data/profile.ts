import type { Profile } from '../types';

export const PROFILE: Profile = {
  id: 'static-profile',
  name: 'Siwawit Jitkusolpasuk',
  role: 'Full Stack Developer, Web Developer',
  bio: 'Passionate developer crafting cosmic digital experiences with modern web technologies.',
  about: `I am a passionate full-stack developer who loves turning ideas into reality through clean code and thoughtful design.\nMy journey in software engineering is driven by curiosity — exploring the universe of technology one project at a time.\nWhen I'm not coding, you'll find me watching movies, listening to music, or sipping a good cup of tea.`,
  avatar_url: null,
  resume_url: null,
  email: 'siwawitwork@gmail.com',
  github: 'https://github.com/Siwawit-Js',
  linkedin: 'https://linkedin.com/in/siwawit',
  facebook: null,
  stats: [
    { label: 'Projects', value: '10+' },
    { label: 'Cups of Tea', value: '∞' },
    { label: 'Years Exp', value: '0' },
    { label: 'Happy Clients', value: '5+' },
  ],
  updated_at: new Date().toISOString(),
};
