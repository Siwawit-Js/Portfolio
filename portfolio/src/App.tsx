import { Nav } from './components/layout/Nav';
import { Footer } from './components/layout/Footer';

import { Hero } from './sections/Hero';
import { About } from './sections/About';
import { Skills } from './sections/Skills';
import { Projects } from './sections/Projects';
import { Contact } from './sections/Contact';

export default function App() {
  return (
    <div className="relative min-h-screen bg-background text-ink font-sans selection:bg-primary/30 selection:text-ink overflow-hidden">
      {/* Layered background: grid + mesh blobs + grain */}
      <div className="fixed inset-0 pointer-events-none z-0 bg-grid opacity-60" />

      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="mesh-blob mesh-cyan w-[700px] h-[700px] -top-[20%] -right-[10%]" />
        <div className="mesh-blob mesh-magenta w-[600px] h-[600px] top-[40%] -left-[10%]" />
        <div className="mesh-blob mesh-violet w-[800px] h-[800px] -bottom-[20%] right-[10%]" />
      </div>

      <div className="fixed inset-0 pointer-events-none z-0 bg-grain opacity-50 mix-blend-overlay" />

      {/* Vignette */}
      <div
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          background:
            'radial-gradient(ellipse at center, transparent 40%, rgb(var(--background) / 0.85) 100%)',
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
