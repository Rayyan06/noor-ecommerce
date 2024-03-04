import type { Config } from 'tailwindcss';

export default {
  content: ['./app/**/*.{js,jsx,ts,tsx}', './app/routes/*.{js,jsx,ts,tsx}'],
  theme: {
    fontFamily: { serif: ['georgia', 'ui-serif'] },
    extend: {
      aspectRatio: {
        '9/16': '9 / 16',
      },
    },
  },
  plugins: [],
} satisfies Config;
