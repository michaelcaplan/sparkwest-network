<template>
  <transition name="fade">
    <div v-if="show" id="popup" class="vue-modal">
      <div class="container mh-100">
        <div class="row mh-100 my-3 d-flex justify-content-center">
          <div class="col col-lg-8">
            <div
              v-if="show"
              class="card modal-card border-0 shadow animate__animated animate__zoomIn animate__faster"
            >
              <div class="content">
                <div class="header d-none d-md-block">
                  <img src="@/assets/welcomeHeader.svg" alt="" />
                </div>

                <div class="header-sm d-block d-md-none">
                  <img src="@/assets/welcomeHeaderMobile.svg" alt="" />

                  <div class="body-sm m-3 p-2 card card-body shadow-sm">
                    <div class="row mb-2">
                      <div class="col">
                        <nuxt-link
                          to="/signUp"
                          class="btn btn-block btn-success"
                        >
                          Sign Up
                        </nuxt-link>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col">
                        <nuxt-link to="/about" class="btn btn-block btn-info">
                          Learn More
                        </nuxt-link>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="footer-sm w-100 px-3 d-block d-md-none">
                  <hr />

                  <p>
                    Discover rural Nova Scotia's entrepreneurial events and
                    opportunities.
                  </p>

                  <button
                    @click="show = false"
                    class="btn btn-block btn-primary mb-3"
                  >
                    Continue
                  </button>
                </div>

                <div class="card-body d-none d-md-block">
                  <div class="card card-body">
                    Discover rural Nova Scotia's entrepreneurial events and
                    opportunities. Or create an account and start sharing your
                    events with the Spark West Network!
                  </div>

                  <hr />

                  <div class="row">
                    <div class="col">
                      <nuxt-link
                        to="/signUp"
                        class="btn btn-block btn-lg btn-success"
                      >
                        Sign Up
                      </nuxt-link>
                    </div>
                    <div class="col">
                      <button
                        @click="show = false"
                        class="btn btn-block btn-lg btn-primary"
                      >
                        Continue
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'WelcomePopup',

  data() {
    return {
      show: false,
    }
  },

  watch: {
    $route(to) {
      this.show = false
      if (to.name === 'index') this.checkPopup()
    },
  },

  methods: {
    checkPopup() {
      if (!this.$fireAuth.currentUser) {
        if (
          this.$cookies.get('first-visit') &&
          !this.$cookies.get('first-visit').value
        ) {
          this.show = false
        } else {
          this.$cookies.set(
            'first-visit',
            { value: false },
            {
              path: '/',
              maxAge: 315400000,
              expires: new Date(new Date().getFullYear() + 10),
            }
          )

          this.show = true
        }
      } else {
        this.$cookies.set(
          'first-visit',
          { value: false },
          {
            path: '/',
            maxAge: 315400000,
            expires: new Date(new Date().getFullYear() + 10),
          }
        )
      }
    },
  },

  mounted() {
    if (this.$route.name === 'index') {
      this.checkPopup()
    }
  },
}
</script>

<style scoped>
.modal-card {
  position: relative;
  overflow: hidden;
  border-radius: 1rem;
}

.card .content {
  max-height: 100%;
  overflow: auto;
}

.header img {
  width: 100%;
}

.header-sm {
  position: relative;
}

.header-sm img {
  width: 100%;
}

.body-sm {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 50%;
}
</style>
