import { Nav } from './components/layout/Nav';
import { Footer } from './components/layout/Footer';

import { Hero } from './sections/Hero';
import { About } from './sections/About';
import { Skills } from './sections/Skills';
import { Experience } from './sections/Experience';
import { Projects } from './sections/Projects';
import { Contact } from './sections/Contact';

export default function App() {
  return (
    <div className="relative min-h-screen bg-background text-ink bg-grid font-sans selection:bg-primary/20 selection:text-ink">
      
      {/* Background Mesh Gradients */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="mesh-blob mesh-cyan w-[600px] h-[600px] top-[-10%] right-[-10%]"></div>
        <div className="mesh-blob mesh-pink w-[500px] h-[500px] top-[20%] left-[-5%]"></div>
        <div className="mesh-blob mesh-yellow w-[700px] h-[700px] bottom-[-20%] right-[10%]"></div>
      </div>

      <Nav />
      <main className="relative z-10">
        <Hero />
        <About />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
