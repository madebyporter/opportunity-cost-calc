// https://nuxt.com/docs/guide/directory-structure/nuxt.config
export default defineNuxtConfig({
  css: ['~/assets/css/output.css'],
  telemetry: false,
  modules: ['nuxt-gtag'],
  gtag: {
    id: 'G-RDQ1WD4WB5'
  }
})
