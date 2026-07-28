/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        cyber: {
          bg: '#050816',
          card: '#0a0f29',
          glass: 'rgba(13, 19, 36, 0.65)',
          blue: '#00f0ff',
          blueDark: '#0088cc',
          purple: '#8b5cf6',
          purpleDark: '#6d28d9',
          green: '#00ff9d',
          greenDark: '#059669',
          border: 'rgba(0, 240, 255, 0.15)',
        }
      },
      fontFamily: {
        sans: ['Inter', 'Outfit', 'sans-serif'],
        mono: ['Fira Code', 'JetBrains Mono', 'monospace'],
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'glow-spin': 'spin 12s linear infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        }
      },
      backgroundImage: {
        'cyber-gradient': 'linear-gradient(135deg, #00f0ff 0%, #8b5cf6 50%, #00ff9d 100%)',
        'glass-gradient': 'linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.01) 100%)',
        'hero-radial': 'radial-gradient(circle at 50% 30%, rgba(0, 240, 255, 0.12) 0%, rgba(139, 92, 246, 0.05) 50%, transparent 80%)',
      }
    },
  },
  plugins: [],
}
