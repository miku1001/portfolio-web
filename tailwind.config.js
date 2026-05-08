/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        bg:      '#0a0f1e',
        card:    '#0f1630',
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
