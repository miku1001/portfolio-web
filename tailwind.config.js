/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        bg:      '#000000',
        card:    '#0a0a0a',
        border:  'rgba(255,255,255,0.08)',
        muted:   '#8892a4',
      },
      fontFamily: {
        title: ['Syne', 'sans-serif'],
        body:  ['Manrope', 'sans-serif'],
        mono:  ['"JetBrains Mono"', 'monospace'],
      },
    },
  },
  plugins: [],
}
