import plugin from "tailwindcss/plugin";
import { config } from "./config";

export default plugin(function ({ addComponents, theme }) {
  addComponents({
    '.card': {
      backgroundColor: theme('colors.white'),
      borderRadius: theme('borderRadius.lg'),
      padding: theme('spacing.6'),
      boxShadow: theme('boxShadow.xl'),
    },
  })
}, config)