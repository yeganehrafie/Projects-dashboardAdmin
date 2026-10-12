/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}', // Next.js App Router
    './pages/**/*.{js,ts,jsx,tsx,mdx}', // Next.js Pages Router
    './src/**/*.{js,ts,jsx,tsx}', // Vite
    "./src/context/**/*.{js,ts,jsx,tsx,mdx}",
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  fontFamily: {
    sans: ['var(--font-geist-sans)'],
    mono: ['var(--font-geist-mono)'],
  },
  theme: {
    extend: {}
  },
  plugins: [],
}