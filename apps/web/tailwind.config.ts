import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        canvas: {
          DEFAULT: '#080E1A',
          subtle: '#0F172A',
          card: '#131F37',
          elevated: '#1E293B',
          border: '#27354F',
        },
        brand: {
          amber: {
            DEFAULT: '#F59E0B',
            light: '#FBBF24',
            dark: '#D97706',
          },
          teal: {
            DEFAULT: '#0D9488',
            light: '#14B8A6',
            dark: '#0F766E',
          },
        },
      },
      fontFamily: {
        sans: [
          'Inter',
          '-apple-system',
          'BlinkMacSystemFont',
          '"Segoe UI"',
          'Roboto',
          'sans-serif',
        ],
        serif: ['"Newsreader"', '"Charter"', 'Georgia', 'Cambria', 'serif'],
      },
    },
  },
  plugins: [],
};

export default config;
