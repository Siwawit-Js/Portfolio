import { Toaster } from 'react-hot-toast';
import { useTheme } from './hooks/useTheme';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { HeroSection } from './features/hero/HeroSection';
import { AboutSection } from './features/about/AboutSection';
import { SkillsSection } from './features/skills/SkillsSection';
import { ProjectsSection } from './features/projects/ProjectsSection';
import { ExperienceSection } from './features/experience/ExperienceSection';
import { ContactSection } from './features/contact/ContactSection';

export default function App() {
  const { isDark, toggle } = useTheme();

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 transition-colors duration-300">
      <Navbar isDark={isDark} toggleTheme={toggle} />
      <main>
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
        <ExperienceSection />
        <ContactSection />
      </main>
      <Footer />
      <Toaster
        position="bottom-right"
        toastOptions={{
          className: 'text-sm font-medium',
          style: {
            background: isDark ? '#1e293b' : '#fff',
            color: isDark ? '#e2e8f0' : '#0f172a',
            border: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}`,
          },
        }}
      />
    </div>
  );
}
