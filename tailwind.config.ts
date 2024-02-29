import type { Config } from 'tailwindcss';

export default {
  content: ['./app/**/*.{js,jsx,ts,tsx}', './app/routes/*.{js,jsx,ts,tsx}'],
  theme: {
    fontFamily: { serif: ['georgia', 'ui-serif'] },
    extend: {},
  },
  plugins: [],
} satisfies Config;
