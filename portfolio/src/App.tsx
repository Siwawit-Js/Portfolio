import { Nav } from './components/layout/Nav';
import { Footer } from './components/layout/Footer';

import { Hero } from './sections/Hero';
import { About } from './sections/About';
import { Skills } from './sections/Skills';
import { Projects } from './sections/Projects';
import { Contact } from './sections/Contact';

export default function App() {
  return (
    <div className="relative min-h-screen bg-background text-ink font-sans selection:bg-primary/20 selection:text-ink overflow-hidden">
      {/* Subtle grid */}
      <div className="fixed inset-0 pointer-events-none z-0 bg-grid opacity-40" />

      {/* Neutral grain */}
      <div className="fixed inset-0 pointer-events-none z-0 bg-grain opacity-40 mix-blend-overlay" />

      {/* Soft vignette */}
      <div
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          background:
            'radial-gradient(ellipse at center, transparent 55%, rgb(var(--background) / 0.7) 100%)',
        }}
      />

      <Nav />
      <main className="relative z-10">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
