import type { Project } from '../types';

export const PROJECTS: Project[] = [
  {
    id: 'p-5',
    title: 'Travel Buddy',
    short_description:
      'A travel companion app where users discover places, collect points, join campaigns, and redeem rewards.',
    description:
      'Contributed to Travel Buddy — a tourism platform offering place recommendations, point collection, campaigns, and reward redemption.\nShipped new features and resolved production bugs to keep the user experience smooth.\nPerformed root cause analysis on reported issues and delivered timely fixes alongside the team.',
    category: 'web',
    image_url: '/TAT/IMG_7906.PNG',
    images: [
      '/TAT/IMG_7906.PNG',
      '/TAT/IMG_7907.PNG',
      '/TAT/IMG_7908.PNG',
      '/TAT/IMG_7909.PNG',
      '/TAT/IMG_7910.PNG',
    ],
    tech_stack: ["private project."],
    live_url: null,
    github_url: null,
    featured: true,
    sort_order: 1,
    created_at: new Date().toISOString(),
  },
  {
    id: 'p-1',
    title: 'ZapClinic',
    short_description:
      'The mobile clinic app where patients register, book appointments, and review their visit history.',
    description:
      'Evaluated user and system requirements to design and deliver features that address specific pain points.\nPerformed root cause analysis and swiftly resolved technical issues to ensure seamless and stable system performance.\nDeveloped and optimized the front-end of mobile applications to deliver high-performance user experiences.',
    category: 'mobile',
    image_url: '/ZapClinic/Login.png',
    images: [
      '/ZapClinic/Login.png',
      '/ZapClinic/register.png',
      '/ZapClinic/Home.png',
      '/ZapClinic/Appointment.png',
      '/ZapClinic/history.png',
    ],
    tech_stack: ['C#', 'Figma', 'Android Studio'],
    live_url: null,
    github_url: null,
    featured: true,
    sort_order: 2,
    created_at: new Date().toISOString(),
  },
  {
    id: 'p-2',
    title: 'Web Carrier',
    short_description:
      'A job-application platform where users browse openings, pick optional courses to upskill, and apply through a built-in form.',
    description:
      'Built the front-end of Web Carrier — a job-application platform focused on a clean, end-to-end candidate experience.\nImplemented a job-listing page, optional training courses users can choose freely, and a full application form flow.',
    category: 'web',
    image_url: '/Web_Carrier/All.jpeg',
    images: [
      '/Web_Carrier/All.jpeg',
      '/Web_Carrier/capture01.png',
      '/Web_Carrier/capture02.png',
      '/Web_Carrier/capture03.png',
      '/Web_Carrier/capture04.png',
      '/Web_Carrier/capture05.png',
    ],
    tech_stack: ['HTML', 'CSS', 'JavaScript'],
    live_url: null,
    github_url: 'https://github.com/Siwawit-Js/Web_Carrier.git',
    featured: true,
    sort_order: 3,
    created_at: new Date().toISOString(),
  },
  {
    id: 'p-3',
    title: 'Web_Recipe',
    short_description:
      'A recipe discovery web where users browse menus, view detailed instructions, and fetch live data from a recipe API.',
    description:
      'Built the front-end of Web Recipe — a smooth browse-and-cook experience with a home feed and detailed menu pages.\nIntegrated a public recipe REST API to power real-time menu data and ingredient lookups.\nBuilt with React and TypeScript, styled with Tailwind for a fast.',
    category: 'web',
    image_url: '/Web_Recipe/homepage.jpeg',
    images: [
      '/Web_Recipe/homepage.jpeg',
      '/Web_Recipe/detailpage.jpeg',
      '/Web_Recipe/searching.jpeg',
      '/Web_Recipe/favoritespage.jpeg',
      '/Web_Recipe/cookingchannalpage.jpeg',
      '/Web_Recipe/aboutpage.jpeg',
    ],
    tech_stack: ['HTML', 'CSS', 'TypeScript', 'Tailwind','React','REST API'],
    live_url: null,
    github_url: 'https://github.com/Siwawit-Js/Web_Recipe.git',
    featured: true,
    sort_order: 4,
    created_at: new Date().toISOString(),
  },
  {
    id: 'p-4',
    title: 'Web Fruit Freshness',
    short_description:
      'A website that can detect whether bananas, oranges, or apples are fresh or spoiled in real time.',
    description:
      'Trained a custom image-classification model to detect freshness across 3 fruits: banana, orange, and apple.\nCombined the custom model with a pre-trained model to compare results and improve prediction accuracy.\nBuilt a lightweight web front-end for uploading images and viewing fresh / spoiled results in real time.',
    category: 'web',
    image_url: '/Web_Fruitfreshness/review_model.mp4',
    images: [
      '/Web_Fruitfreshness/review_model.mp4',
    ],
    tech_stack: ['Python', 'HTML', 'JavaScript'],
    live_url: null,
    github_url: "https://github.com/Siwawit-Js/Web_Fruitfreshness.git",
    featured: true,
    sort_order: 5,
    created_at: new Date().toISOString(),
  },

  
];