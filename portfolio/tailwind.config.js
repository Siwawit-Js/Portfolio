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
        // Neutral dark base
        space: {
          50:  '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#22c55e',
          600: '#16a34a',
          700: '#15803d',
          800: '#166534',
          900: '#14532d',
          950: '#052e16',
        },
        // Brand green — main accent (close to #00D084 from reference)
        primary: {
          50:  '#edfff6',
          100: '#c6ffea',
          200: '#8dffd5',
          300: '#45f9b7',
          400: '#12e99c',   // light brand green
          500: '#00cc82',   // main brand green
          600: '#00a268',
          700: '#00804f',
          800: '#006640',
          900: '#004d30',
          950: '#002a1c',
        },
        // Secondary accent — keep for variety
        nebula: {
          300: '#86efac',
          400: '#4ade80',
          500: '#22c55e',
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
        accent: {
          400: '#22d3ee',
          500: '#06b6d4',
          600: '#0891b2',
        },
      },
      animation: {
        'float':                   'float 6s ease-in-out infinite',
        'float-delayed':           'float 6s ease-in-out 2s infinite',
        'fade-in-up':              'fadeInUp 0.6s ease-out forwards',
        'pulse-slow':              'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'gradient':                'gradient 8s ease infinite',
        'twinkle':                 'twinkle 4s ease-in-out infinite',
        'twinkle-delayed':         'twinkle 4s ease-in-out 2s infinite',
        'orbit':                   'orbit 20s linear infinite',
        'meteor':                  'meteor 5s linear infinite',
        'nebula-drift':            'nebulaDrift 30s ease-in-out infinite',
        'spin-slow':               'spin 20s linear infinite',
        'vortex-spin':             'vortexSpin 12s linear infinite',
        'vortex-spin-fast':        'vortexSpin 5s linear infinite',
        'vortex-spin-reverse':     'vortexSpinReverse 18s linear infinite',
        'vortex-spin-reverse-fast':'vortexSpinReverse 7s linear infinite',
        'portal-pulse':            'portalPulse 4s ease-in-out infinite',
        'portal-pulse-slow':       'portalPulse 7s ease-in-out infinite',
        'ring-ripple':             'ringRipple 3s ease-out infinite',
        'ring-ripple-delayed':     'ringRipple 3s ease-out 1.5s infinite',
      },
      keyframes: {
        float:       { '0%,100%': { transform: 'translateY(0px)' }, '50%': { transform: 'translateY(-20px)' } },
        fadeInUp:    { '0%': { opacity: '0', transform: 'translateY(30px)' }, '100%': { opacity: '1', transform: 'translateY(0)' } },
        gradient:    { '0%,100%': { backgroundPosition: '0% 50%' }, '50%': { backgroundPosition: '100% 50%' } },
        twinkle:     { '0%,100%': { opacity: '0.2', transform: 'scale(0.9)' }, '50%': { opacity: '1', transform: 'scale(1.1)' } },
        orbit:       { '0%': { transform: 'rotate(0deg) translateX(120px) rotate(0deg)' }, '100%': { transform: 'rotate(360deg) translateX(120px) rotate(-360deg)' } },
        meteor:      { '0%': { transform: 'translate(0,0) rotate(215deg)', opacity: '0' }, '10%': { opacity: '1' }, '100%': { transform: 'translate(-600px,600px) rotate(215deg)', opacity: '0' } },
        nebulaDrift: { '0%,100%': { transform: 'translate(0,0) scale(1)' }, '33%': { transform: 'translate(40px,-30px) scale(1.05)' }, '66%': { transform: 'translate(-30px,40px) scale(0.95)' } },
        vortexSpin:        { '0%': { transform: 'rotate(0deg)' }, '100%': { transform: 'rotate(360deg)' } },
        vortexSpinReverse: { '0%': { transform: 'rotate(0deg)' }, '100%': { transform: 'rotate(-360deg)' } },
        portalPulse: { '0%,100%': { opacity: '0.5', transform: 'scale(1)' }, '50%': { opacity: '0.95', transform: 'scale(1.08)' } },
        ringRipple:  { '0%': { transform: 'scale(0.8)', opacity: '0.6' }, '100%': { transform: 'scale(1.5)', opacity: '0' } },
      },
      backgroundSize: { '300%': '300%' },
      boxShadow: {
        // Green glow system
        'glow-brand':        '0 0 40px rgba(0, 204, 130, 0.40)',
        'glow-brand-lg':     '0 0 70px rgba(0, 204, 130, 0.50), 0 0 120px rgba(0, 204, 130, 0.20)',
        'glow-nebula':       '0 0 40px rgba(0, 204, 130, 0.30)',
        'glow-cosmos':       '0 0 40px rgba(34, 211, 238, 0.25)',
        'glow-space':        '0 0 40px rgba(0, 204, 130, 0.25)',
        'glow-vortex':       '0 0 80px rgba(0, 204, 130, 0.60), 0 0 160px rgba(0, 204, 130, 0.25)',
        'glow-nebula-lg':    '0 0 60px rgba(0, 204, 130, 0.45), 0 0 100px rgba(0, 204, 130, 0.18)',
        'glass-panel':       'inset 0 1px 0 rgba(255,255,255,0.10), 0 24px 60px rgba(0,0,0,0.40)',
        'skill-card':        '0 0 24px rgba(0, 204, 130, 0.12), inset 0 1px 0 rgba(255,255,255,0.06)',
        'skill-card-hover':  '0 0 50px rgba(0, 204, 130, 0.35), 0 0 90px rgba(0, 204, 130, 0.12), inset 0 1px 0 rgba(255,255,255,0.12)',
      },
    },
  },
  plugins: [],
};
