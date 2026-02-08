/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          dark: '#0A0E27',
          purple: '#1a0b2e',
        },
        accent: {
          blue: '#0066FF',
          cyan: '#00D9B5',
          purple: '#8B5CF6',
          bright: '#00FFF0',
        },
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(135deg, #0A0E27 0%, #1a0b2e 100%)',
        'gradient-accent': 'linear-gradient(135deg, #0066FF 0%, #00D9B5 100%)',
        'gradient-purple': 'linear-gradient(135deg, #8B5CF6 0%, #0066FF 100%)',
      },
      animation: {
        'float': 'float 20s ease-in-out infinite',
        'float-slow': 'float 30s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px) translateX(0px) rotate(0deg)' },
          '33%': { transform: 'translateY(-30px) translateX(20px) rotate(120deg)' },
          '66%': { transform: 'translateY(30px) translateX(-20px) rotate(240deg)' },
        },
        'pulse-glow': {
          '0%, 100%': { boxShadow: '0 0 20px rgba(0, 217, 181, 0.5)' },
          '50%': { boxShadow: '0 0 40px rgba(0, 217, 181, 0.8)' },
        },
      },
    },
  },
  plugins: [],
};