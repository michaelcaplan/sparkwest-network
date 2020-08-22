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
  asyncData({ $fireAuth, store, res }) {
    if (process.sever && res && res.locals && res.locals.user) {
      const user = res.locals.user
      if (user) {
        store.dispatch('user/setUser', res.locals.user)
      }
    } else {
      const user = $fireAuth.currentUser
      if (user) {
        store.dispatch('user/setUser', user)
      }
    }
  },

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
