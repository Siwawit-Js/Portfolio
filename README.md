<div align="center">

<img src="portfolio/public/favicon-192.png" alt="Siwawit Jitkusolpasuk" width="120" style="border-radius: 50%;" />

# Siwawit Jitkusolpasuk — Portfolio

**Full-Stack Developer · Web Developer · Tester**

A modern, animated personal portfolio built with React, TypeScript & Tailwind CSS.
Designed to showcase work, skills, and experience with a clean, performant, and responsive UI.

<br />

[![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Vite](https://img.shields.io/badge/Vite-5-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev)
[![Tailwind](https://img.shields.io/badge/Tailwind-3-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-10-0055FF?style=for-the-badge&logo=framer&logoColor=white)](https://www.framer.com/motion)
[![Vercel](https://img.shields.io/badge/Deployed_on-Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://vercel.com)

</div>

---

## Overview

A single-page personal portfolio featuring smooth scroll navigation, animated sections, a project showcase with modal details, and a working contact form powered by a serverless email handler.

The site is structured as a hash-anchored SPA with five focused sections — **Home · About · Skills · Work · Contact** — and is built to feel fast, minimal, and intentional on every device.

---

## Features

- **Hero section** — animated intro with concise role, bio, and CTAs
- **About** — narrative bio with personality, stats, and quick highlights
- **Skills** — categorized hard & soft skills (Frontend, Backend, Database, DevOps, Design, AI Tools, Soft Skills)
- **Projects** — filterable showcase with category tabs and an interactive image-gallery modal
- **Experience & Testimonials** — timeline and references
- **Contact** — validated form wired to a Vercel serverless function that sends email via Resend
- **Theme toggle** — light/dark mode with persisted preference
- **Subtle grain & micro-interactions** powered by Framer Motion
- **Responsive** layout from mobile to wide desktop
- **SEO meta tags** and proper favicon set (32 / 180 / 192)

---

## Tech Stack

| Layer        | Technology                                                        |
| ------------ | ----------------------------------------------------------------- |
| **Language** | TypeScript                                                        |
| **UI**       | React 18, Tailwind CSS, Framer Motion, Lucide / React Icons       |
| **Build**    | Vite 5                                                            |
| **API**      | Vercel Serverless Functions (`@vercel/node`)                      |
| **Email**    | Resend                                                            |
| **Hosting**  | Vercel                                                            |
| **Tooling**  | PostCSS, Autoprefixer                                             |

---

## Project Structure

```
Portfolio/
└── portfolio/
    ├── api/
    │   ├── _lib/                  # Shared serverless helpers
    │   └── send-email.ts          # Contact form email handler (Resend)
    ├── public/                    # Static assets, project images, favicons
    ├── src/
    │   ├── components/
    │   │   ├── layout/            # Nav, Footer, Section, Grain
    │   │   └── ui/                # Button, Tag, ThemeToggle, ProjectModal
    │   ├── data/                  # Profile, projects, skills, experience, etc.
    │   ├── sections/              # Hero, About, Skills, Projects, Experience, Contact
    │   ├── lib/                   # Utilities (cn, etc.)
    │   ├── types/                 # Shared TS types
    │   ├── App.tsx
    │   └── main.tsx
    ├── index.html
    ├── tailwind.config.js
    ├── vite.config.ts
    └── vercel.json
```

---

## Getting Started

### Prerequisites

- **Node.js** 18+
- **npm** 9+

### Install & Run

```bash
# 1. Clone the repository
git clone https://github.com/Siwawit-Js/Portfolio.git
cd Portfolio/portfolio

# 2. Install dependencies
npm install

# 3. Start the dev server
npm run dev
```

The site will be available at **http://localhost:5173**.

### Available Scripts

| Command           | Description                                    |
| ----------------- | ---------------------------------------------- |
| `npm run dev`     | Start Vite dev server with HMR                 |
| `npm run build`   | Type-check (`tsc`) and build for production    |
| `npm run preview` | Preview the production build locally           |

---

## Environment Variables

The contact form uses [Resend](https://resend.com) via a Vercel serverless function.
Create a `.env.local` file inside the `portfolio/` directory:

```env
RESEND_API_KEY=re_xxx_your_api_key_here
CONTACT_TO_EMAIL=siwawitwork@gmail.com
CONTACT_FROM_EMAIL=onboarding@resend.dev
```

On Vercel, configure the same variables under **Project Settings → Environment Variables**.

---

## Deployment

This project is configured for one-click deployment on **Vercel**:

1. Push the repository to GitHub
2. Import the project at [vercel.com/new](https://vercel.com/new)
3. Set the **Root Directory** to `portfolio/`
4. Add the environment variables above
5. Deploy — Vercel auto-detects Vite and uses [`vercel.json`](portfolio/vercel.json)

---

## Customization

Almost everything is data-driven from `portfolio/src/data/`:

| File              | What it controls                                |
| ----------------- | ----------------------------------------------- |
| `profile.ts`      | Name, role, bio, avatar, social links, stats    |
| `skills.ts`       | Skill list, categories, proficiency             |
| `projects.ts`     | Project showcase entries and images             |
| `experience.ts`   | Work / education timeline                       |
| `testimonials.ts` | References and quotes                           |
| `navigation.ts`   | Top-nav links                                   |
| `hobbies.ts`      | Personal interests                              |

Update those files and the UI updates automatically — no component edits needed.

---

## Contact

<div align="center">

**Siwawit Jitkusolpasuk**

[![Email](https://img.shields.io/badge/Email-siwawitwork@gmail.com-D14836?style=flat-square&logo=gmail&logoColor=white)](mailto:siwawitwork@gmail.com)
[![GitHub](https://img.shields.io/badge/GitHub-Siwawit--Js-181717?style=flat-square&logo=github&logoColor=white)](https://github.com/Siwawit-Js)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Siwawit_Jitkusolpasuk-0A66C2?style=flat-square&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/siwawit-jitkusolpasuk-97486a384)

</div>

---

<div align="center">

Built with care using React + TypeScript + Tailwind.
© Siwawit Jitkusolpasuk

</div>
