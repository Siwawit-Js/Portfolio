import { Toaster } from 'react-hot-toast';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { VortexBackground } from './components/layout/VortexBackground';
import { HeroSection } from './features/hero/HeroSection';
import { AboutSection } from './features/about/AboutSection';
import { SkillsSection } from './features/skills/SkillsSection';
import { ProjectsSection } from './features/projects/ProjectsSection';
import { ExperienceSection } from './features/experience/ExperienceSection';
import { ContactSection } from './features/contact/ContactSection';

export default function App() {
  return (
    <div className="relative min-h-screen text-slate-100">
      <VortexBackground />
      <Navbar />
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
            background: 'rgba(10,10,10,0.90)',
            color: '#e2e8f0',
            border: '1px solid rgba(0,204,130,0.25)',
            backdropFilter: 'blur(12px)',
          },
        }}
      />
    </div>
  );
}
