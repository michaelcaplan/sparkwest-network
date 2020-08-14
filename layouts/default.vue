<template>
  <div id="app">
    <div id="content-wrapper">
      <Navbar />

      <Nuxt />

      <div id="footer-push"></div>
    </div>

    <Footer />
  </div>
</template>

<script>
import Navbar from '@/components/Navbar'
import Footer from '~/components/Footer'

export default {
  components: { Navbar, Footer },
  mounted() {
    this.$store.dispatch('user/onAuthStateChanged')
  },
}
</script>
