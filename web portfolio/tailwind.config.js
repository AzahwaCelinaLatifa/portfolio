export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  // Menggunakan strategi class untuk dark mode (menyesuaikan tag <html>)
  darkMode: 'class', 
  theme: {
    extend: {
      colors: {
        bg: 'var(--bg)',
        bg2: 'var(--bg2)',
        bg3: 'var(--bg3)',
        text: 'var(--text)',
        text2: 'var(--text2)',
        text3: 'var(--text3)',
        border: 'var(--border)',
        border2: 'var(--border2)',
        nav: 'var(--nav)',
        card: 'var(--card)',
        sv1: 'var(--sv1)',
        sv2: 'var(--sv2)',
        sv3: 'var(--sv3)',
      },
      fontFamily: {
        epilogue: ['Epilogue', 'sans-serif'],
        playfair: ['Playfair Display', 'serif'],
        bebas: ['Bebas Neue', 'sans-serif'],
        dm: ['DM Mono', 'monospace'],
        fraunces: ['Fraunces', 'serif'],
      },
      transitionTimingFunction: {
        custom: 'cubic-bezier(.4,0,.2,1)',
      },
      transitionDuration: {
        '350': '350ms',
      },
      backgroundImage: {
        'svg-grad': 'var(--svg)',
        'svg-grad2': 'var(--svg2)',
      }
    },
  },
  plugins: [],
}