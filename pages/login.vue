<template>
  <div id="login">
    <div class="container my-2">
      <div class="row d-flex justify-content-center">
        <div class="col col-lg-6">
          <div class="card shadow-sm py-3">
            <div class="card-body">
              <h1 class="text-center">Login</h1>

              <div v-if="error" class="alert alert-danger">
                {{ error }}
              </div>

              <div class="row">
                <div class="col">
                  <form @submit.prevent="submit" class="mb-3">
                    <div class="form-group">
                      <label for="emailInput">Email</label>
                      <input
                        id="emailInput"
                        v-model="email"
                        type="email"
                        class="form-control"
                        placeholder="severus@snape.com"
                        autocomplete="email"
                        required
                      />
                      <small class="form-text text-muted"
                        >We'll never share your email with anyone else.</small
                      >
                    </div>

                    <div class="input-group mb-1">
                      <input
                        type="password"
                        v-model="password"
                        class="form-control"
                        placeholder="super secret ..."
                        v-if="!showPass"
                        autocomplete="current-password"
                        required
                      />
                      <input
                        v-model="password"
                        type="text"
                        class="form-control"
                        placeholder="super secret ..."
                        v-else
                        autocomplete="current-password"
                        required
                      />
                      <div class="input-group-append">
                        <button
                          @click.prevent="showPass = !showPass"
                          class="btn btn-outline-secondary"
                          type="button"
                        >
                          <i v-if="!showPass" class="fa fa-eye"></i>
                          <i v-else class="fa fa-eye-slash"></i>
                        </button>
                      </div>
                    </div>

                    <div class="row mb-3">
                      <div class="col">
                        <nuxt-link to="/forgotPassword"
                          >Forgot password?</nuxt-link
                        >
                      </div>
                    </div>

                    <button
                      class="btn btn-primary float-right"
                      type="submit"
                      value="Login"
                      :disabled="loggingIn"
                    >
                      <span
                        v-show="loggingIn"
                        class="spinner-border spinner-border-sm"
                        role="status"
                        aria-hidden="true"
                      ></span>
                      Login
                    </button>
                  </form>
                </div>
              </div>

              <hr />

              <p class="text-center">
                Don't have an account?
                <nuxt-link :to="{ name: 'signUp' }">Sign Up</nuxt-link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login',

  head() {
    return {
      title: 'Login',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'Login to you Spark West Network account',
        },
      ],
    }
  },

  data() {
    return {
      email: '',
      password: '',

      showPass: false,

      loggingIn: false,
      error: '',
    }
  },

  methods: {
    async submit() {
      this.loggingIn = true
      try {
        const response = await this.$fireAuth.signInWithEmailAndPassword(
          this.email,
          this.password
        )

        this.$store.dispatch('user/setUser', response.user)
        this.$store.dispatch('user/getProfile', response.user.uid)
        this.loggingIn = false
        this.$router.push('/')
      } catch (e) {
        this.error = e.message
        this.loggingIn = false
      }
    },
  },
}
</script>
