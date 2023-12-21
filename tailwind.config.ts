import type { Config } from 'tailwindcss'
import tailwindScrollbar from 'tailwind-scrollbar';
const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  safelist: [
    {
      pattern: /bg-(red|green|blue|orange)-(100|500|700)/, // You can display all the colors that you need
      variants: ['lg', 'hover', 'focus', 'lg:hover'],      // Optional
    },
  ],
  theme: {

    extend: {
      colors: {
        primary: '#5DD140'
      }
    },
  },
  plugins: [
    tailwindScrollbar({})
  ],
}
export default config
