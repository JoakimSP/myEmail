import { type Config } from "tailwindcss";
import theme, { fontFamily } from "tailwindcss/defaultTheme";
import daisyui from "daisyui"


export default {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-geist-sans)", ...fontFamily.sans],
      },
    },
  },
  plugins: [
    daisyui,
  ],
  daisyui: {
    themes: ["nord", "light", "dark"],
  },
} satisfies Config;
