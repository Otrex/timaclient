import type { Config } from "tailwindcss";
import tailwindPluginForm from "@tailwindcss/forms";
import flowbitePlugin from "flowbite/plugin";

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
      },
      colors: {
        transparent: 'transparent',
        current: 'currentColor',
        'blue': '#1fb6ff',
        'pink': '#ff49db',
        'orange': '#ff7849',
        // 'gray': {
        //   '500': '#999999'
        // }
      },
    },
  },
  plugins: [
    tailwindPluginForm,
    flowbitePlugin
  ],
}