<template>
  <div id="app">
    <Navbar />
    <Nuxt />
    <Footer />
  </div>
</template>

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
  min-height: 100%;
  position: relative;
}

.fr-box {
  font-family: inherit;
}

.fr-box * {
  font-family: inherit;
}
</style>
<script>
import Footer from '~/components/Footer'
import Navbar from '@/components/Navbar'
export default {
  components: { Navbar, Footer },
}
</script>
