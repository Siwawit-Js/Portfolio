/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['"Space Grotesk"', 'Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        // Galaxy palette
        space: {
          50: '#eef0ff',
          100: '#d8dcff',
          200: '#b7befe',
          300: '#8d96fb',
          400: '#6a73f4',
          500: '#4f54e8',
          600: '#3a3acb',
          700: '#2e2da3',
          800: '#22206d',
          900: '#13123e',
          950: '#06061d',
        },
        nebula: {
          50: '#fdf2ff',
          100: '#fae3ff',
          200: '#f4c5ff',
          300: '#ec97ff',
          400: '#e35cff',
          500: '#cf2eff',
          600: '#b313e0',
          700: '#920eb6',
          800: '#771195',
          900: '#5e0d77',
          950: '#3b0050',
        },
        cosmos: {
          400: '#22d3ee',
          500: '#06b6d4',
          600: '#0891b2',
        },
        aurora: {
          400: '#34d399',
          500: '#10b981',
          600: '#059669',
        },
        // Backwards-compatible aliases used by existing components
        primary: {
          50: '#eef0ff',
          100: '#d8dcff',
          200: '#b7befe',
          300: '#8d96fb',
          400: '#a78bfa',
          500: '#8b5cf6',
          600: '#7c3aed',
          700: '#6d28d9',
          800: '#5b21b6',
          900: '#4c1d95',
          950: '#2e1065',
        },
        accent: {
          400: '#22d3ee',
          500: '#06b6d4',
          600: '#0891b2',
        },
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'float-delayed': 'float 6s ease-in-out 2s infinite',
        'fade-in-up': 'fadeInUp 0.6s ease-out forwards',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'gradient': 'gradient 8s ease infinite',
        'twinkle': 'twinkle 4s ease-in-out infinite',
        'twinkle-delayed': 'twinkle 4s ease-in-out 2s infinite',
        'orbit': 'orbit 20s linear infinite',
        'meteor': 'meteor 5s linear infinite',
        'nebula-drift': 'nebulaDrift 30s ease-in-out infinite',
        'spin-slow': 'spin 20s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        gradient: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        twinkle: {
          '0%, 100%': { opacity: '0.2', transform: 'scale(0.9)' },
          '50%': { opacity: '1', transform: 'scale(1.1)' },
        },
        orbit: {
          '0%': { transform: 'rotate(0deg) translateX(120px) rotate(0deg)' },
          '100%': { transform: 'rotate(360deg) translateX(120px) rotate(-360deg)' },
        },
        meteor: {
          '0%': { transform: 'translate(0, 0) rotate(215deg)', opacity: '0' },
          '10%': { opacity: '1' },
          '100%': { transform: 'translate(-600px, 600px) rotate(215deg)', opacity: '0' },
        },
        nebulaDrift: {
          '0%, 100%': { transform: 'translate(0, 0) scale(1)' },
          '33%': { transform: 'translate(40px, -30px) scale(1.05)' },
          '66%': { transform: 'translate(-30px, 40px) scale(0.95)' },
        },
      },
      backgroundSize: {
        '300%': '300%',
      },
      boxShadow: {
        'glow-nebula': '0 0 40px rgba(207, 46, 255, 0.35)',
        'glow-cosmos': '0 0 40px rgba(34, 211, 238, 0.30)',
        'glow-space': '0 0 40px rgba(139, 92, 246, 0.30)',
      },
    },
  },
  plugins: [],
};
