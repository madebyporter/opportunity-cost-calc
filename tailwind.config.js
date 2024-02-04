/** @type {import('tailwindcss').Config} */
export default {
  // The 'content' option specifies the files to scan for classes
  content: [
    "./app.vue",                       // App.vue in the root directory
    "./components/**/*.{vue,js,ts}",   // Vue components
    "./layouts/**/*.{vue,js,ts}",      // Layouts
    "./pages/**/*.{vue,js,ts}",        // Nuxt pages/views
    "./plugins/**/*.{js,ts}",          // JS/TS plugins
    "./static/**/*.html",              // Static HTML files
    "./**/*.html",                     // Any other HTML files at the root or nested
  ],
  theme: {
    fontFamily: {
      'sans': ['Helvetica Neue', 'Helvetica', 'ui-sans-serif', 'system-ui']
    }
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}