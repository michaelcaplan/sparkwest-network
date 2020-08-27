<template>
  <div id="app">
    <div id="top"></div>
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

  watch: {
    $route() {
      this.$nextTick(() => {
        document.getElementById('top').scrollIntoView()
      })
    },
  },
}
</script>
