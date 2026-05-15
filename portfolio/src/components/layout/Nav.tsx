import { useEffect, useState } from 'react';
import { cn } from '../../lib/cn';
import { Phone, Menu } from 'lucide-react';

export function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-40 transition-all duration-500 py-6',
        scrolled ? 'bg-background/80 backdrop-blur-md border-b border-rule/50' : 'bg-transparent'
      )}
    >
      <nav className="mx-auto flex max-w-[1400px] items-center justify-between px-6 md:px-12 lg:px-20">
        {/* Logo */}
        <a href="#top" className="flex items-center gap-3">
          <div className="relative flex h-8 w-8 items-center justify-center">
            {/* Abstract flower logo simulation */}
            <div className="absolute grid grid-cols-2 gap-0.5 transform rotate-45">
              <div className="w-3 h-3 rounded-tl-full rounded-br-sm bg-accent"></div>
              <div className="w-3 h-3 rounded-tr-full rounded-bl-sm bg-primary"></div>
              <div className="w-3 h-3 rounded-bl-full rounded-tr-sm bg-cyan-500"></div>
              <div className="w-3 h-3 rounded-br-full rounded-tl-sm bg-indigo-500"></div>
            </div>
          </div>
          <span className="font-display font-bold text-xl tracking-tight">SD.</span>
        </a>

        {/* Center Links (Optional/Hidden on very small screens) */}
        <ul className="hidden items-center gap-6 md:flex text-sm font-semibold tracking-wide text-ink/70">
          <li>
            <a href="#projects" className="hover:text-primary transition-colors flex flex-col items-center">
              <span>WORK</span>
            </a>
          </li>
          <li>
            <a href="#about" className="hover:text-primary transition-colors flex flex-col items-center">
              <span>RESUME</span>
            </a>
          </li>
        </ul>

        {/* Right Actions */}
        <div className="flex items-center gap-4">
          <a
            href="#contact"
            className="hidden md:flex items-center gap-2 bg-primary text-white px-5 py-2.5 rounded-full font-medium text-sm hover:bg-primary/90 transition-all shadow-sm"
          >
            <Phone size={16} />
            Contact Us
          </a>
          <button
            aria-label="Toggle menu"
            className="flex items-center justify-center h-10 w-10 rounded-full border border-rule hover:bg-surface transition-colors bg-white/50 backdrop-blur-sm"
          >
            <Menu size={18} />
          </button>
        </div>
      </nav>
    </header>
  );
}
