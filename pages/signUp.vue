<template>
  <div id="login">
    <div class="container my-2">
      <div class="row d-flex justify-content-center">
        <div class="col col-lg-6">
          <div class="card shadow-sm py-3">
            <div class="card-body">
              <h1 class="text-center">Sign Up</h1>

              <div v-if="error" class="alert alert-danger" role="alert">
                {{ error }}
              </div>

              <div class="row">
                <div class="col">
                  <form class="mb-3" @submit.prevent="submit">
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

                    <div class="form-group">
                      <label for="emailInput">Name</label>
                      <input
                        id="textInput"
                        v-model="name"
                        type="text"
                        class="form-control"
                        placeholder="John Doe"
                        autocomplete="name"
                        required
                      />
                    </div>

                    <div class="form-group">
                      <label for="passInput">Password</label>
                      <input
                        id="passInput"
                        v-model="password"
                        type="password"
                        class="form-control"
                        placeholder="super secret ..."
                        autocomplete="new-password"
                        required
                      />
                    </div>

                    <div class="form-group mb-3">
                      <label for="passReInput">Repeat Password</label>
                      <input
                        id="passReInput"
                        v-model="passwordRe"
                        type="password"
                        class="form-control"
                        placeholder="Get it right"
                        autocomplete="off"
                        required
                      />
                    </div>

                    <button
                      class="btn btn-primary float-right"
                      type="submit"
                      value="Sign Up"
                      :disabled="signingUp"
                    >
                      <span
                        v-show="signingUp"
                        class="spinner-border spinner-border-sm"
                        role="status"
                        aria-hidden="true"
                      ></span>
                      Sign Up
                    </button>
                  </form>
                </div>
              </div>

              <hr />

              <p class="text-center">
                Already have an account?
                <nuxt-link :to="{ name: 'login' }">Login</nuxt-link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'SignUp',

  head() {
    return {
      title: 'Sign Up',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'Create an account for Spark West Network',
        },
      ],
    }
  },

  data() {
    return {
      email: '',
      name: '',
      password: '',
      passwordRe: '',

      signingUp: false,
      error: '',
    }
  },

  methods: {
    ...mapActions({
      setUser: 'user/setUser',
      createProfile: 'user/createProfile',
    }),

    async submit() {
      this.signingUp = true

      if (this.password !== this.passwordRe) {
        this.signingUp = false
        this.error = "Passwords don't match"
      } else {
        try {
          const response = await this.$fireAuth.createUserWithEmailAndPassword(
            this.email,
            this.password
          )

          await response.user.updateProfile({
            displayName: this.name,
          })

          await this.setUser(response.user)
          await this.createProfile(this.name)

          this.$router.push('/')
        } catch (e) {
          this.signingUp = false
          this.error = e.message
        }
      }
    },
  },
}
</script>
