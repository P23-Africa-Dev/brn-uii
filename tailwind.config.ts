// tailwind.config.ts
import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        'divider-right': '20px 0 30px -10px rgba(0, 0, 0, 0.7)',
      },
      backgroundImage: {
        'custom-gradient': 'linear-gradient(90deg, rgba(11, 23, 39, 1) 0%, rgba(42, 191, 187, 1) 100%)',
      },
    },
  },
  plugins: [],
};

export default config;