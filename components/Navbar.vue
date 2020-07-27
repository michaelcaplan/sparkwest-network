<template>
  <!-- Navigation -->
  <nav id="nav" class="navbar navbar-expand-lg navbar-dark mt-0">
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
  </nav>
</template>

<script>
export default {
  name: 'Navbar',
}
</script>

<style scoped>
body {
  padding-top: 54px;
}

.navbar {
  background: #fe3d61;
}

ul {
  transition: 1s;
}

#logo {
  transition: 0.5s all;
}

#logo:hover {
  transform: translateY(-3px);
  filter: drop-shadow(0 4px 4px rgba(0, 0, 0, 0.25));
}
</style>
