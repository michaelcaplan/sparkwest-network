<template>
  <!-- Navigation -->
  <div>
    <nav id="nav" class="navbar navbar-expand-lg navbar-dark mt-0">
      <div class="container">
        <nuxt-link id="logo" to="/" class="navbar-brand">
          <img
            src="../assets/logoLG.svg"
            alt="logo"
            class="d-none d-md-inline-block m-1"
            height="42"
          />

          <img
            src="../assets/logo.svg"
            alt="logo"
            class="d-none d-sm-inline-block d-md-none d-lg-none m-1"
            height="42"
          />

          <img
            src="../assets/logoSM.svg"
            alt="logo"
            class="d-inline-block d-sm-none d-md-none d-lg-none m-1"
            height="42"
          />
        </nuxt-link>

        <button
          id="menu-btn"
          :class="{
            btn: true,
            'text-light': true,
            'd-flex': true,
            'd-lg-none': true,
            'btn-open': collapseOpen,
          }"
          type="button"
          data-toggle="collapse"
          data-target="#navbarCollapse"
          aria-controls="navbarCollapse"
          aria-expanded="false"
          aria-label="Toggle navigation"
          @click="collapseOpen = !collapseOpen"
        >
          <i class="fa fa-bars fa-lg"></i>
        </button>

        <ul class="navbar-nav ml-auto d-none d-lg-flex">
          <li class="nav-item font-weight-bold">
            <nuxt-link to="/" class="nav-link text-light">Events</nuxt-link>
          </li>

          <li class="nav-item font-weight-bold">
            <nuxt-link :to="{ name: 'about' }" class="nav-link text-light"
              >About</nuxt-link
            >
          </li>

          <li class="nav-item font-weight-bold">
            <nuxt-link :to="{ name: 'contact' }" class="nav-link text-light"
              >Contact</nuxt-link
            >
          </li>
        </ul>
      </div>
    </nav>

    <div id="navbarCollapse" class="collapse navbar-collapse bg-dark d-lg-none">
      <div class="container py-3">
        <ul class="navbar-nav">
          <li class="nav-item font-weight-bold">
            <nuxt-link to="/" class="nav-link text-light">Events</nuxt-link>
          </li>

          <li class="nav-item font-weight-bold">
            <nuxt-link :to="{ name: 'about' }" class="nav-link text-light"
              >About</nuxt-link
            >
          </li>

          <li class="nav-item font-weight-bold">
            <nuxt-link :to="{ name: 'contact' }" class="nav-link text-light"
              >Contact</nuxt-link
            >
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Navbar',
  data() {
    return {
      collapseOpen: false,
    }
  },
}
</script>

<style scoped>
.navbar {
  background: #fe3d61;
}

.btn-open i {
  transform: rotate(90deg);
}

#menu-btn i {
  transition: transform 0.5s;
}

.collpase .nav-item {
  opacity: 0;
  transition-property: opacity;
  transition-duration: 0.5s;
}

.show .nav-item {
  opacity: 1;
}
</style>
