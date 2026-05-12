import { useState, useEffect } from 'react';
import { Menu, X, BriefcaseBusiness } from 'lucide-react';
import { NAV_LINKS } from '../../data/navigation';

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleClick = (href: string) => {
    setIsMobileOpen(false);
    const el = document.querySelector(href);
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'bg-white/80 backdrop-blur-xl border-b border-slate-200 shadow-sm'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <a
            href="#"
            className="flex items-center gap-2 group"
          >
            <span className="relative w-8 h-8 rounded-full bg-primary-500 flex items-center justify-center shadow-sm transition-shadow">
              <BriefcaseBusiness className="w-4 h-4 text-white" />
            </span>
            <span className="text-xl font-display font-bold text-slate-900">
              Portfolio
            </span>
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <button
                key={link.href}
                onClick={() => handleClick(link.href)}
                className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-100 transition-all duration-200"
              >
                {link.label}
              </button>
            ))}

          </div>

          {/* Mobile */}
          <div className="flex items-center gap-2 md:hidden">

            <button
              onClick={() => setIsMobileOpen(!isMobileOpen)}
              className="p-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 transition-colors text-slate-900"
            >
              {isMobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ${
          isMobileOpen ? 'max-h-80 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="px-4 pb-4 space-y-1 bg-white/95 backdrop-blur-xl border-b border-slate-200 shadow-sm">
          {NAV_LINKS.map((link) => (
            <button
              key={link.href}
              onClick={() => handleClick(link.href)}
              className="block w-full text-left px-4 py-3 text-sm font-medium text-slate-600 hover:text-slate-900 rounded-xl hover:bg-slate-50 transition-colors"
            >
              {link.label}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}
