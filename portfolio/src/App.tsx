import { Toaster } from 'react-hot-toast';
import { useTheme } from './hooks/useTheme';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { GalaxyBackground } from './components/layout/GalaxyBackground';
import { HeroSection } from './features/hero/HeroSection';
import { AboutSection } from './features/about/AboutSection';
import { SkillsSection } from './features/skills/SkillsSection';
import { ProjectsSection } from './features/projects/ProjectsSection';
import { ExperienceSection } from './features/experience/ExperienceSection';
import { ContactSection } from './features/contact/ContactSection';

export default function App() {
  const { isDark, toggle } = useTheme();

  return (
    <div className="relative min-h-screen text-slate-100 transition-colors duration-300">
      <GalaxyBackground />
      <Navbar isDark={isDark} toggleTheme={toggle} />
      <main className="relative">
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
            background: 'rgba(15, 12, 50, 0.85)',
            color: '#e2e8f0',
            border: '1px solid rgba(139, 92, 246, 0.3)',
            backdropFilter: 'blur(12px)',
          },
        }}
      />
    </div>
  );
}
