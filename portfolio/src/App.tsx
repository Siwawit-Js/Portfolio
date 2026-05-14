import { Nav } from './components/layout/Nav';
import { Footer } from './components/layout/Footer';
import { Grain } from './components/layout/Grain';

import { Hero } from './sections/Hero';
import { About } from './sections/About';
import { Skills } from './sections/Skills';
import { Experience } from './sections/Experience';
import { Projects } from './sections/Projects';
import { Contact } from './sections/Contact';

export default function App() {
  return (
    <div className="relative min-h-screen bg-paper text-ink">
      <Grain />
      <Nav />
      <main className="relative">
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
