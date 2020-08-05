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

<style>
html,
body {
  margin: 0;
  padding: 0;
  height: 100%;
  overflow-x: hidden;
}

* {
  font-family: 'Montserrat', sans-serif;
}

h1 *,
h2 *,
h3 *,
h4 *,
h5 *,
h6 * {
  font-family: 'Nunito', sans-serif;
  font-weight: bold;
}

h1,
h2,
h3,
h4,
h5,
h6 {
  font-family: 'Nunito', sans-serif;
  font-weight: bold;
}

#app {
  height: 100vh;
  position: relative;
}

#content-wrapper {
  min-height: 100%;
  overflow-x: hidden;
}

@media only screen and (max-width: 576px) {
  #content-wrapper {
    margin-bottom: -740px;
  }

  #footer-push {
    height: 740px;
  }
}

@media only screen and (min-width: 576px) {
  #content-wrapper {
    margin-bottom: -585px;
  }

  #footer-push {
    height: 585px;
  }
}

@media only screen and (min-width: 768px) {
  #content-wrapper {
    margin-bottom: -500px;
  }

  #footer-push {
    height: 500px;
  }
}

@media only screen and (min-width: 992px) {
  #content-wrapper {
    margin-bottom: -375px;
  }

  #footer-push {
    height: 375px;
  }
}

@media only screen and (min-width: 1200px) {
  #content-wrapper {
    margin-bottom: -351px;
  }

  #footer-push {
    height: 351px;
  }
}

.fr-box {
  font-family: inherit;
}

.fr-box * {
  font-family: inherit;
}

[contenteditable]:focus {
  outline: 0 solid transparent;
}
</style>
