import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        brand: {
          50: '#f0f4ff',
          100: '#e0e9ff',
          500: '#6366f1',
          600: '#4f46e5',
          700: '#4338ca',
          900: '#1e1b4b',
        },
        festive: {
          gold: '#f59e0b',
          crimson: '#dc2626',
          emerald: '#059669',
          midnight: '#0f172a',
        },
        romantic: {
          rose: '#f43f5e',
          blush: '#fecdd3',
          plum: '#881337',
        },
        party: {
          purple: '#a855f7',
          neonPink: '#ec4899',
          amber: '#f59e0b',
        },
        kids: {
          yellow: '#fbbf24',
          cyan: '#06b6d4',
          lime: '#84cc16',
          pink: '#f472b6',
          purple: '#c084fc',
          sky: '#38bdf8',
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        heading: ['Outfit', 'sans-serif'],
        serif: ['Playfair Display', 'serif'],
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'shimmer': 'shimmer 2.5s infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        shimmer: {
          '100%': { transform: 'translateX(100%)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 15px rgba(99, 102, 241, 0.4)' },
          '100%': { boxShadow: '0 0 30px rgba(99, 102, 241, 0.8), 0 0 50px rgba(168, 85, 247, 0.6)' },
        }
      }
    },
  },
  plugins: [],
};
export default config;
