import { useState, useEffect } from 'react';

export function useTheme() {
  const [isDark] = useState(true);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.add('dark');
    localStorage.setItem('theme', 'dark');
  }, []);

  const toggle = () => {};

  return { isDark, toggle };
}
