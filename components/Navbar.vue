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
          <li class="nav-item">
            <nuxt-link
              to="/"
              :class="{
                'nav-link': true,
                'text-light': true,
                'font-weight-bold': routeName == 'index',
              }"
              >Events</nuxt-link
            >
          </li>

          <li class="nav-item">
            <nuxt-link
              :to="{ name: 'about' }"
              :class="{
                'nav-link': true,
                'text-light': true,
                'font-weight-bold': routeName == 'about',
              }"
              >About</nuxt-link
            >
          </li>

          <li class="nav-item mr-2 border-right">
            <nuxt-link
              :to="{ name: 'contact' }"
              :class="{
                'nav-link': true,
                'text-light': true,
                'font-weight-bold': routeName == 'contact',
              }"
              >Contact</nuxt-link
            >
          </li>

          <li v-if="!user" class="nav-item d-flex align-items-center mr-2">
            <nuxt-link
              :to="{ name: 'login' }"
              class="nav-link text-light btn btn-dark rounded-pill py-1 px-3"
              >Login</nuxt-link
            >
          </li>

          <li v-if="!user" class="nav-item d-flex align-items-center">
            <nuxt-link
              :to="{ name: 'signUp' }"
              class="nav-link text-light btn btn-dark rounded-pill py-1 px-3"
              >Sign Up</nuxt-link
            >
          </li>

          <li v-else class="nav-item dropdown d-flex align-items-center">
            <button
              class="btn btn-dark dropdown-toggle rounded-pill py-1 px-3"
              type="button"
              id="profileDropdown"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              <i class="fa fa-user"></i>
            </button>

            <div
              class="dropdown-menu dropdown-menu-right"
              aria-labelledby="profileDropdown"
            >
              <nuxt-link
                :to="{ name: 'profile' }"
                class="dropdown-item"
                href="#"
                >Profile</nuxt-link
              >
              <div class="dropdown-divider"></div>
              <a class="dropdown-item" href="#" @click.prevent="signout"
                >Log Out</a
              >
            </div>
          </li>
        </ul>
      </div>
    </nav>

    <div id="navbarCollapse" class="collapse navbar-collapse bg-dark d-lg-none">
      <div class="container py-3">
        <ul class="navbar-nav border-bottom mb-3">
          <li class="nav-item">
            <nuxt-link
              to="/"
              :class="{
                'nav-link': true,
                'text-light': true,
                'font-weight-bold': routeName == 'index',
              }"
              >Events</nuxt-link
            >
          </li>

          <li class="nav-item">
            <nuxt-link
              :to="{ name: 'about' }"
              :class="{
                'nav-link': true,
                'text-light': true,
                'font-weight-bold': routeName == 'about',
              }"
              >About</nuxt-link
            >
          </li>

          <li class="nav-item">
            <nuxt-link
              :to="{ name: 'contact' }"
              :class="{
                'nav-link': true,
                'text-light': true,
                'font-weight-bold': routeName == 'contact',
              }"
              >Contact</nuxt-link
            >
          </li>
        </ul>

        <ul v-if="!user" class="nav">
          <li class="nav-item d-flex align-items-center mr-2">
            <nuxt-link
              :to="{ name: 'login' }"
              class="nav-link btn btn-light rounded-pill py-1 px-3"
              >Login</nuxt-link
            >
          </li>

          <li class="nav-item d-flex align-items-center">
            <nuxt-link
              :to="{ name: 'signUp' }"
              class="nav-link btn btn-light rounded-pill py-1 px-3"
              >Sign Up</nuxt-link
            >
          </li>
        </ul>

        <div v-else class="row">
          <div class="col-auto d-flex align-items-center">
            <i class="fa fa-user fa-lg text-light"></i>
          </div>

          <div class="col-auto pl-0">
            <ul class="nav">
              <li class="nav-item d-flex align-items-center">
                <nuxt-link
                  :to="{ name: 'profile' }"
                  class="nav-link text-light"
                  href="#"
                  >Profile</nuxt-link
                >
              </li>

              <li class="nav-item d-flex align-items-center">
                <a
                  class="nav-link btn btn-light py-1 px-3 rounded-pill"
                  href="#"
                  @click.prevent="signout"
                  >Log Out</a
                >
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'Navbar',
  data() {
    return {
      collapseOpen: false,
    }
  },

  computed: {
    ...mapGetters({
      user: 'user/user',
    }),
    routeName() {
      return this.$route.name
    },
  },

  methods: {
    ...mapActions({
      logout: 'user/logout',
    }),
    async signout() {
      await this.logout()
      this.$router.push('/')
    },
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
