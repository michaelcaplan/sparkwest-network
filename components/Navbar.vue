<template>
  <!-- Navigation -->
  <div id="nav">
    <nav
      class="navbar navbar-expand-lg navbar-dark mt-0 p-0"
      :class="{ shadow: collapseOpen }"
    >
      <div class="container py-2 px-3">
        <div class="w-100">
          <div class="row">
            <div class="col">
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
                  :class="{ open: collapseOpen }"
                  height="42"
                />
              </nuxt-link>
            </div>

            <div class="col-auto d-flex d-lg-none align-items-center pr-0">
              <button
                id="menu-btn"
                class="btn"
                :disabled="loading"
                type="button"
                aria-expanded="false"
                aria-label="Toggle navigation"
                @click="toggleCollapse"
              >
                <hamburger :open="collapseOpen" />
              </button>
            </div>

            <div class="col-auto d-none d-lg-flex pr-0">
              <ul class="navbar-nav d-flex align-items-center">
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
              </ul>
            </div>

            <div class="col-auto d-none d-lg-flex align-items-center pl-0">
              <ul class="navbar-nav" v-show="!user && !loading">
                <li class="nav-item d-flex align-items-center mr-2">
                  <nuxt-link
                    :to="{ name: 'login' }"
                    class="nav-link text-light btn btn-dark rounded-pill py-1 px-3"
                    >Login</nuxt-link
                  >
                </li>

                <li class="nav-item d-flex align-items-center">
                  <nuxt-link
                    :to="{ name: 'signUp' }"
                    class="nav-link text-light btn btn-dark rounded-pill py-1 px-3"
                    >Sign Up</nuxt-link
                  >
                </li>
              </ul>

              <ul class="navbar-nav" v-show="user && !loading">
                <li class="nav-item dropdown d-flex align-items-center">
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
                    <h6
                      v-show="profile.name"
                      class="dropdown-header text-truncate"
                    >
                      Hello, {{ profile.name }}
                    </h6>

                    <div
                      v-show="profile && profile.name"
                      class="dropdown-divider"
                    ></div>

                    <nuxt-link
                      to="/profile"
                      class="dropdown-item"
                      :class="{ active: routeName === 'profile' }"
                      href="#"
                      >Profile
                      <i class="fa fa-sm fa-user" aria-hidden="true"></i
                    ></nuxt-link>

                    <nuxt-link
                      to="/newEvent"
                      class="dropdown-item"
                      :class="{ active: routeName === 'newEvent' }"
                      href="#"
                    >
                      New Event
                      <i class="fa fa-sm fa-plus" aria-hidden="true"></i>
                    </nuxt-link>

                    <div class="dropdown-divider"></div>
                    <a class="dropdown-item" href="#" @click.prevent="signout"
                      >Log Out</a
                    >
                  </div>
                </li>
              </ul>

              <div
                v-show="loading"
                class="spinner-border spinner-border-sm text-light"
                role="status"
              >
                <span class="sr-only">Loading...</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>

    <div
      id="navbarCollapse"
      class="bg-dark d-lg-none"
      :class="{ open: collapseOpen }"
    >
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

        <ul v-show="!user" class="nav">
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

        <div v-show="user" class="row">
          <div class="col-auto d-flex align-items-center pr-0">
            <nuxt-link to="/profile" class="btn btn-light">
              <i class="fa fa-user fa-lg"></i>
            </nuxt-link>
          </div>

          <div class="col-auto pl-0">
            <ul class="nav">
              <li class="nav-item align-items-center d-none d-sm-flex">
                <nuxt-link to="/profile" class="nav-link text-light" href="#"
                  >Profile</nuxt-link
                >
              </li>

              <li class="nav-item d-flex align-items-center">
                <nuxt-link to="/newEvent" class="nav-link text-light" href="#"
                  >New Event</nuxt-link
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

    <div v-show="collapseOpen" id="close-collapse" @click="closeCollapse"></div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

import Hamburger from '@/components/Hamburger.vue'

export default {
  name: 'Navbar',

  components: {
    Hamburger,
  },

  data() {
    return {
      collapseOpen: false,
      loading: true,
    }
  },

  computed: {
    ...mapGetters({
      user: 'user/user',
      profile: 'user/profile',
    }),
    routeName() {
      return this.$route.name
    },
  },

  methods: {
    ...mapActions({
      logout: 'user/logout',
    }),
    toggleCollapse() {
      this.collapseOpen = !this.collapseOpen
    },
    closeCollapse() {
      console.log('scroll')
      this.collapseOpen = false
    },
    handleScroll() {
      console.log('scroll')
    },
    async signout() {
      await this.logout()
      this.$router.push('/')
    },
  },

  mounted() {
    this.loading = false
  },
}
</script>

<style scoped>
#nav {
  position: relative;
}

#close-collapse {
  position: absolute;
  height: 100vh;
  width: 100vw;
  top: 100%;
  left: 0;
  z-index: 100;
}

.navbar {
  position: relative;
  z-index: 100;
  transition: 0.25s all ease-in-out;
}

.navbar-brand img {
  transition: 0.25s all ease-in-out;
}

.navbar-brand img.open {
  transform: rotate(-90deg);
}

#navbarCollapse {
  width: 100%;
  height: 0;
  overflow: hidden;
  transition: 0.25s height ease-in-out;
}

#navbarCollapse.open {
  height: 209px;
}
</style>
