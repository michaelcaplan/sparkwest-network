<template>
  <div id="footer" class="bg-dark py-3 py-sm-5 text-light">
    <div class="container">
      <div class="row">
        <div class="col-12 col-lg mb-3">
          <h3 class="mb-3 mb-sm-2">Spark West Network</h3>

          <p class="d-none d-sm-block">
            An umbrella marketing platform that draws together, assists, and
            coordinates the various organizations, events, and people that
            define our region’s unique entrepreneurial opportunities.
          </p>

          <div class="row">
            <div class="col-auto">
              <a
                class="btn btn-light"
                target="_blank"
                href="https://www.facebook.com/sparkwestnetwork/"
              >
                <i class="fa fa-facebook-f" aria-hidden="true"></i>
              </a>
            </div>
            <div class="col-auto p-0">
              <a
                class="btn btn-light"
                target="_blank"
                href="https://twitter.com/SparkWestNet"
              >
                <i class="fa fa-twitter" aria-hidden="true"></i>
              </a>
            </div>
            <div class="col-auto">
              <nuxt-link to="/contact" class="btn btn-light">
                <i class="fas fa-envelope"></i>
              </nuxt-link>
            </div>
          </div>

          <hr class="mt-4 d-block d-lg-none" />
        </div>

        <div class="col-12 col-md mb-3">
          <h5>Navigation <i class="fas fa-search float-right"></i></h5>

          <ul class="nav d-flex d-md-none d-lg-none">
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

          <ul class="nav flex-column d-none d-md-flex">
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
        </div>

        <div class="col-12 col-md mb-3">
          <h5>
            Check out our newsletter
            <i class="far fa-envelope-open float-right"></i>
          </h5>

          <form @submit.prevent="subscribe">
            <div class="form-group">
              <label for="inputEmail">* Email:</label>
              <input
                id="inputEmail"
                v-model="email"
                type="email"
                class="form-control"
                placeholder="Email"
                aria-describedby="emailHelp"
                required
              />
            </div>

            <div class="row">
              <div class="col pr-0">
                <div class="form-group">
                  <label for="inputFirst">* First Name:</label>
                  <input
                    id="inputFirst"
                    v-model="first"
                    type="text"
                    class="form-control"
                    placeholder="John"
                    required
                  />
                </div>
              </div>
              <div class="col">
                <div class="form-group">
                  <label for="inputLast">Last Name</label>
                  <input
                    id="inputLast"
                    v-model="last"
                    type="text"
                    class="form-control"
                    placeholder="Smith"
                  />
                </div>
              </div>
            </div>

            <div class="form-group">
              <button
                type="submit"
                value="Sign Up"
                class="btn btn-success float-right"
              >
                Sign Up
                <span
                  v-if="subscribing"
                  class="spinner-border spinner-border-sm"
                  role="status"
                  aria-hidden="true"
                ></span>
                <i
                  v-if="!subscribing && success"
                  class="fas fa-lg fa-check-circle animate__animated animate__bounceIn"
                ></i>

                <i
                  v-if="!subscribing && fail"
                  class="fas fa-lg fa-times-circle animate__animated animate__bounceIn"
                ></i>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>

    <div id="bottom">
      <div class="container py-2">
        <div class="row">
          <div class="col d-flex align-items-center">
            <p id="copyright" class="m-0 text-muted">
              &copy; 2020
              <span class="d-none d-sm-inline">Spark West Network.</span
              ><span class="d-inline d-sm-none">SWN</span>
            </p>
          </div>
          <div class="col-auto d-flex align-items-center">
            <button class="btn btn-dark rounded-pill px-3" @click="nextTheme">
              <span v-if="$colorMode.preference === 'light'">
                <i class="fas fa-sun"></i> Light</span
              >
              <span v-else-if="$colorMode.preference === 'dark'">
                <i class="fas fa-moon"></i> Dark</span
              >
              <span v-else> <i class="fas fa-desktop"></i> System</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Footer',

  computed: {
    routeName() {
      return this.$route.name
    },
  },

  data() {
    return {
      email: null,
      first: null,
      last: null,

      subscribing: false,
      success: false,
      fail: false,
    }
  },

  methods: {
    async subscribe() {
      try {
        this.subscribing = true
        this.success = false
        this.fail = false

        const data = {
          email: this.email,
          first: this.first,
          last: this.last || '',
        }
        await this.$axios.$post('/api/subscribe', {
          email: data.email.trim(),
          first: data.first.trim(),
          last: data.last.trim(),
        })

        this.subscribing = false
        this.success = true
        this.fail = false
      } catch (e) {
        console.error(e)
        this.subscribing = false
        this.success = false
        this.fail = true
      }
    },

    nextTheme() {
      if (this.$colorMode.preference === 'light')
        this.$colorMode.preference = 'dark'
      else if (this.$colorMode.preference === 'dark')
        this.$colorMode.preference = 'system'
      else if (this.$colorMode.preference === 'system')
        this.$colorMode.preference = 'light'
      else this.$colorMode.preference = 'system'
    },
  },
}
</script>
