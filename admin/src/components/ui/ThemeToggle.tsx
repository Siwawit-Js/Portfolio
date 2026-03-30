import { Moon, Sun } from 'lucide-react';

interface ThemeToggleProps { isDark: boolean; toggle: () => void; }

export function ThemeToggle({ isDark, toggle }: ThemeToggleProps) {
  return (
    <button onClick={toggle} className="p-2 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-white/5 hover:bg-slate-50 dark:hover:bg-white/10 transition-colors" aria-label="Toggle theme">
      {isDark ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5 text-slate-500" />}
    </button>
  );
}
