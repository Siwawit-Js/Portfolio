/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Inter"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['"Syne"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      colors: {
        background: 'rgb(var(--background) / <alpha-value>)',
        surface: 'rgb(var(--surface) / <alpha-value>)',
        'surface-2': 'rgb(var(--surface-2) / <alpha-value>)',
        ink: 'rgb(var(--ink) / <alpha-value>)',
        muted: 'rgb(var(--muted) / <alpha-value>)',
        rule: 'rgb(var(--rule) / <alpha-value>)',
        primary: 'rgb(var(--primary) / <alpha-value>)',
        accent: 'rgb(var(--accent) / <alpha-value>)',
        violet: 'rgb(var(--violet) / <alpha-value>)',
        lime: 'rgb(var(--lime) / <alpha-value>)',
      },
      letterSpacing: {
        tight: '-0.02em',
        tighter: '-0.04em',
        wider: '0.08em',
      },
      animation: {
        'fade-up': 'fadeUp 0.8s cubic-bezier(0.2, 0.8, 0.2, 1) both',
        'mesh': 'mesh 18s ease-in-out infinite alternate',
        'pulse-glow': 'pulseGlow 2.4s ease-in-out infinite',
        'spin-slow': 'spin 16s linear infinite',
        'scan': 'scan 4s linear infinite',
        'flicker': 'flicker 6s linear infinite',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        mesh: {
          '0%': { transform: 'scale(1) translate(0, 0)' },
          '33%': { transform: 'scale(1.15) translate(40px, -60px)' },
          '66%': { transform: 'scale(0.95) translate(-30px, 30px)' },
          '100%': { transform: 'scale(1.08) translate(50px, 50px)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '1', boxShadow: '0 0 0 0 rgb(var(--primary) / 0.6)' },
          '50%': { opacity: '0.85', boxShadow: '0 0 0 12px rgb(var(--primary) / 0)' },
        },
        scan: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100%)' },
        },
        flicker: {
          '0%, 19%, 21%, 23%, 25%, 54%, 56%, 100%': { opacity: '1' },
          '20%, 24%, 55%': { opacity: '0.4' },
        },
      },
    },
  },
  plugins: [],
};
