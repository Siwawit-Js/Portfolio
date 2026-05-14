import { useEffect, useState } from 'react';
import { NAV_LINKS } from '../../data/navigation';
import { ThemeToggle } from '../ui/ThemeToggle';
import { cn } from '../../lib/cn';

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-40 transition-all duration-500',
        scrolled ? 'bg-paper/85 backdrop-blur-md border-b border-ink/10' : 'bg-transparent'
      )}
    >
      <nav className="mx-auto flex max-w-[1400px] items-center justify-between px-6 py-5 md:px-12 lg:px-20">
        <a href="#top" className="flex items-baseline gap-2">
          <span className="font-display text-xl tracking-editorial">S.</span>
          <span className="marker hidden text-ink/60 sm:inline">Jitkusolpasuk</span>
        </a>

        <ul className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link, i) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="group flex items-baseline gap-1.5 font-mono text-[0.7rem] uppercase tracking-[0.2em] text-ink/70 transition-colors hover:text-ink"
              >
                <span className="text-signal/80">{String(i + 1).padStart(2, '0')}</span>
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-6">
          <ThemeToggle />
          <button
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
            className="md:hidden flex flex-col gap-1.5"
          >
            <span className={cn('block h-px w-6 bg-ink transition-transform', open && 'translate-y-2 rotate-45')} />
            <span className={cn('block h-px w-6 bg-ink transition-opacity', open && 'opacity-0')} />
            <span className={cn('block h-px w-6 bg-ink transition-transform', open && '-translate-y-2 -rotate-45')} />
          </button>
        </div>
      </nav>

      {open && (
        <div className="md:hidden border-t border-ink/10 bg-paper">
          <ul className="flex flex-col px-6 py-4">
            {NAV_LINKS.map((link, i) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="flex items-baseline gap-3 py-3 font-mono text-sm uppercase tracking-[0.2em] text-ink/80 hover:text-signal"
                >
                  <span className="text-signal/80">{String(i + 1).padStart(2, '0')}</span>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}
