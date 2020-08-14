<template>
  <div class="container py-3">
    <div class="row d-flex justify-content-center">
      <div class="col col-lg-6">
        <div class="card">
          <div class="card-body">
            <div v-if="tab === 0">
              <h1 class="text-center">Forgot Your Password?</h1>

              <hr />

              <p>
                Don't worry, it happens to the best of us. <br />
                Just enter the email associated with your account below and
                we'll send you a password reset email
              </p>

              <div
                v-if="error"
                class="alert alert-danger animate__animated animate__shakeX"
              >
                {{ error }}
              </div>

              <form @submit.prevent="submit">
                <div class="row">
                  <div class="col">
                    <div class="form-group">
                      <input
                        type="email"
                        name="email"
                        id="email"
                        class="form-control"
                        placeholder="JohnDoe@email.com"
                        v-model="email"
                        required
                      />
                    </div>
                  </div>
                  <div class="col-auto pl-0">
                    <button
                      class="btn btn-primary"
                      type="submit"
                      value="Send"
                      :disabled="sending"
                    >
                      <span
                        v-show="sending"
                        class="spinner-border spinner-border-sm"
                        role="status"
                        aria-hidden="true"
                      ></span>
                      Send
                    </button>
                  </div>
                </div>
              </form>
            </div>

            <div v-else>
              <h1 class="text-center">Email Sent</h1>

              <hr />

              <p>
                A password reset email was sent to: <b>{{ email }}</b>
              </p>

              <p>
                Didn't recive an email?
                <a href="#" @click.prevent="tab = 0">Resend</a>
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
  name: 'forgotPassword',

  data() {
    return {
      email: null,
      sending: false,
      tab: 0,
      error: null,
    }
  },

  methods: {
    async submit() {
      try {
        this.sending = true
        await this.$fireAuth.sendPasswordResetEmail(this.email)
        this.sending = false
        this.tab = 1
      } catch (e) {
        console.error(e)
        this.error = e.message
        this.sending = false
      }
    },
  },
}
</script>
