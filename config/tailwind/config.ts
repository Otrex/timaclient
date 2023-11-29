import type { Config } from "tailwindcss";

export const config: Partial<Config> = {
  darkMode: 'class',
  content: [
    'components/**/*.{vue,js,ts}',
    'layouts/**/*.vue',
    'pages/**/*.vue',
    'composables/**/*.{js,ts}',
    'plugins/**/*.{js,ts}',
    'App.{js,ts,vue}',
    'app.{js,ts,vue}',
    'Error.{js,ts,vue}',
    'error.{js,ts,vue}',
    'content/**/*.md'
  ],
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      'blue': '#1fb6ff',
      'pink': '#ff49db',
      'orange': '#ff7849',
    },
    fontFamily: {
      sans: ['SP-Pro', 'sans-serif'],
      serif: ['Times New Roman', 'serif'],
    },
    extend: {
      spacing: {
        '128': '32rem',
        '144': '36rem',
      },
      borderRadius: {
        '4xl': '2rem',
      }
    },
  },
}