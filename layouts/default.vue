<template>
  <div id="app">
    <div id="top"></div>
    <div id="content-wrapper">
      <Navbar />

      <Nuxt />

      <div id="footer-push"></div>
    </div>

    <Footer />

    <welcome-popup />
  </div>
</template>

<script>
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

import WelcomePopup from '@/components/WelcomePopup.vue'

export default {
  components: { Navbar, Footer, WelcomePopup },

  watch: {
    $route() {
      this.$nextTick(() => {
        document.getElementById('top').scrollIntoView()
      })
    },
  },
}
</script>
