// https://nuxt.com/docs/api/configuration/nuxt-config
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import path from 'path'

export default defineNuxtConfig({
  devtools: { enabled: true },
  spaLoadingTemplate: "./app.splash.html",
  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      title: "TIMA",
      script: [],
      link: [],
    },
  },

  css: ['~/assets/css/main.css'],
  components: [
    { path: '~/components/Ui', prefix: 'Ui' },
    { path: '~/components/Utility', prefix: 'Ut' },
    '~/components'
  ],

  modules: [
    '@nuxt/image',
    '@pinia/nuxt',
    '@nuxtjs/tailwindcss',
    '@nuxtjs/color-mode',
  ],

  image: {},
  build: {
    transpile: ["uuid", "@vuelidate/core"],
  },
  vite: {
    plugins: [
      // Config Link: https://github.com/vbenjs/vite-plugin-svg-icons
      createSvgIconsPlugin({
        iconDirs: [path.resolve(process.cwd(), 'assets/svg')],
        symbolId: '[name]',
      }),
    ],
  },
  ...({
    pinia: {
      storesDirs: ['./stores/**'],
    },
  }),
  colorMode: {
    classSuffix: ''
  },
  tailwindcss: {
    cssPath: '~/assets/css/tailwind.css',
    configPath: '~/tailwind.config.ts'
  },
  runtimeConfig: {
    public: {
      baseUrl: process.env.API_BASE_URL
    }
  }
})
