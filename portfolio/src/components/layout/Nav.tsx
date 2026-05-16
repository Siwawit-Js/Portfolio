import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { cn } from '../../lib/cn';
import { NAV_LINKS } from '../../data/navigation';

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-all duration-500',
        scrolled ? 'py-3' : 'py-5'
      )}
    >
      <nav
        className={cn(
          'mx-auto flex max-w-[1400px] items-center justify-between px-6 md:px-12 lg:px-20 transition-all duration-500'
        )}
      >
        {/* Logo */}
        <a href="#top" className="flex items-center gap-3 group">
          <div className="relative grid place-items-center w-9 h-9 rounded-lg neon-ring bg-surface">
            <span className="font-display font-bold text-lg text-gradient">S</span>
            <span className="absolute -bottom-1 -right-1 w-2 h-2 rounded-full bg-primary animate-pulse-glow" />
          </div>
          <span className="font-display font-bold text-lg tracking-tight text-ink">
            siwawit<span className="text-primary">.dev</span>
          </span>
        </a>

        {/* Center nav (desktop) */}
        <ul className="hidden md:flex items-center gap-1 glass rounded-full px-2 py-1.5">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="px-4 py-2 rounded-full text-[11px] font-mono uppercase tracking-[0.18em] text-ink/70 hover:text-primary hover:bg-surface-2/60 transition-colors"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Right CTA */}
        <div className="flex items-center gap-3">
          <a
            href="#contact"
            className="hidden md:inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary text-background font-semibold text-xs uppercase tracking-wider hover:shadow-[0_0_24px_rgb(var(--primary)/0.55)] transition-shadow"
          >
            Hire Me
          </a>
          <button
            aria-label="Toggle menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="md:hidden grid place-items-center w-10 h-10 rounded-full glass text-ink hover:text-primary transition-colors"
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="md:hidden mx-6 mt-3 rounded-3xl glass overflow-hidden"
          >
            <ul className="flex flex-col p-4">
              {NAV_LINKS.map((link, i) => (
                <motion.li
                  key={link.href}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <a
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="block py-3 px-4 rounded-xl font-mono text-xs uppercase tracking-[0.2em] text-ink/80 hover:text-primary hover:bg-surface-2/70 transition-colors"
                  >
                    {link.label}
                  </a>
                </motion.li>
              ))}
              <li className="mt-2">
                <a
                  href="#contact"
                  onClick={() => setOpen(false)}
                  className="block text-center py-3 rounded-xl bg-primary text-background font-semibold text-xs uppercase tracking-wider"
                >
                  Hire Me
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
