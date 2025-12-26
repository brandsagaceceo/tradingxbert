// tailwind.config.ts
import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}'
  ],
  safelist: [
    'bg-[#39FF14]', 'ring-[#39FF14]', 'text-[#39FF14]',
    'bg-[#F87171]/20', 'text-[#F87171]', 'border-[#F87171]',
    'bg-[#FBBF24]/20', 'text-[#FBBF24]', 'border-[#FBBF24]',
    'bg-[#34D399]/20', 'text-[#34D399]', 'border-[#34D399]'
  ],
  theme: {
    container: {
      center: true,
      padding: '1rem',
    },
    extend: {
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      colors: {
        neon: '#39FF14',
        dark: '#0A0A0A',
        accentStart: '#22c55e',
        accentMid: '#60a5fa',
        accentEnd: '#a78bfa',
        glass: 'rgba(255,255,255,0.05)'
      },
      keyframes: {
        fadein: {
          '0%': { opacity: '0', transform: 'scale(0.97)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
      },
      animation: {
        fadein: 'fadein 0.3s cubic-bezier(0.4,0,0.2,1)',
      },
    },
  },
  plugins: [],
};
export default config;
