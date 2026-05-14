import { useEffect, useState } from 'react';

const KEY = 'portfolio-theme';

export function ThemeToggle() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(KEY);
    const initial = stored ? stored === 'dark' : false;
    setDark(initial);
    document.documentElement.classList.toggle('dark', initial);
  }, []);

  const toggle = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle('dark', next);
    localStorage.setItem(KEY, next ? 'dark' : 'light');
  };

  return (
    <button
      onClick={toggle}
      aria-label="Toggle reading mode"
      className="group flex items-center gap-2 font-mono text-[0.7rem] uppercase tracking-[0.2em] text-ink/70 hover:text-signal transition-colors"
    >
      <span className="inline-block w-2.5 h-2.5 border border-ink/60 group-hover:border-signal group-hover:bg-signal transition-colors" />
      {dark ? 'Day' : 'Night'}
    </button>
  );
}
