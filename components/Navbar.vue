<template>
  <!-- Navigation -->
  <!-- <nav id="nav" class="navbar navbar-expand-lg navbar-dark mt-0">
    <div class="container">
      <router-link id="logo" to="/" tag="a" active-class="navbar-brand">
        <img src="../assets/logoLG.svg" class="m-1" height="42" alt="logo" />
      </router-link>
      <button
        class="navbar-toggler navbar-toggler-right"
        type="button"
        data-toggle="collapse"
        data-target="#navbarResponsive"
        aria-controls="navbarResponsive"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon" />
      </button>
      <ul
        class="navbar-nav ml-auto bg-dark p-2 d-flex align-items-center rounded-pill"
      >
        <nuxt-link to="/" tag="li" active-class="nav-item">
          <a id="home" class="nav-link">Events</a>
        </nuxt-link>
        <nuxt-link :to="{ name: 'about' }" tag="li" active-class="nav-item">
          <a id="about" class="nav-link">About</a>
        </nuxt-link>
        <nuxt-link :to="{ name: 'contact' }" tag="li" active-class="nav-item">
          <a id="contact" class="nav-link">Contact</a>
        </nuxt-link>
      </ul>
    </div>
  </nav> -->

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
          class="btn text-light d-flex d-lg-none"
          type="button"
          data-toggle="collapse"
          data-target="#navbarCollapse"
          aria-controls="navbarCollapse"
          aria-expanded="false"
          aria-label="Toggle navigation"
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
}
</script>

<style scoped>
.navbar {
  background: #fe3d61;
}
</style>
