import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-geist-sans)'],
        mono: ['var(--font-geist-mono)'],
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        'card-background': "var(--card-background)",
        'card-hover': "var(--card-hover)",
        'text-secondary': "var(--text-secondary)",
        'border-color': "var(--border-color)",
        'tag-background': "var(--tag-background)",
        'tag-text': "var(--tag-text)",
        'text-tertiary': "var(--text-tertiary)",
        'input-background': "var(--input-background)",
        'input-border': "var(--input-border)",
        'input-text': "var(--input-text)",
        'input-placeholder': "var(--input-placeholder)",
        'text-primary': 'var(--text-primary)',
        'text-hover': 'var(--text-hover)',
        'link': 'var(--link-color)',
        'link-hover': 'var(--link-hover)',
      },
    },
  },
  plugins: [],
};

export default config;
