// https://nuxt.com/docs/api/configuration/nuxt-config
import mockData from 'vite-plugin-mock-data';
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import tailwindPluginConfig from "./config/tailwind/plugin";
import tailwindPluginForm from "@tailwindcss/forms"
import path from 'path'


export default defineNuxtConfig({
  devtools: { enabled: true },
  spaLoadingTemplate: "./app.splash.html",
  app: {
    pageTransition: { name: "page", mode: "out-in" },
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      title: "TIMA",
      // script: [{ src: "/js/support.js", type: "text/javascript" }],
      link: [
        // { rel: "apple-touch-icon", href: "/apple-touch-icon.png" },
        // { rel: "icon", type: "image/png", href: "/favicon-32x32.png" },
        // { rel: "icon", type: "image/png", href: "/favicon-16x16.png" },
        // { rel: "manifest", href: "/site.webmanifest" },
        // { rel: "preconnect", href: "https://rsms.me/" },
        // { rel: "stylesheet", href: "https://rsms.me/inter/inter.css" },
      ],
    },
  },

  css: ['~/assets/css/main.css'],
  components: [
    { path: '~/components/Ui', prefix: 'Ui' },
    { path: '~/components/Data', prefix: 'Dt' },
    { path: '~/components/Utility', prefix: 'Ut' },
  ],

  modules: [
    '@nuxt/image',
    '@pinia/nuxt',
    '@nuxtjs/tailwindcss',
  ],

  image: {},
  build: {
    transpile: ["uuid", "@vuelidate/core"],
  },
  vite: {
    plugins: [
      mockData({
        mockRoutesDir: './mock'
      }),

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
  tailwindcss: {
    cssPath: '~/assets/css/tailwind.css',
    config: {
      plugins: [
        tailwindPluginConfig,
        tailwindPluginForm,
      ]
    }
  },
  runtimeConfig: {
    public: {
      apiBase: '/api'
    }
  }
})
