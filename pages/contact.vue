<template>
  <div class="container py-3">
    <h1 class="text-center">Contact Us</h1>

    <hr />

    <div class="row">
      <div class="col-12 col-lg mb-3 mb-lg-0">
        <div class="card">
          <div class="card-body">
            <div class="card h-100 bg-dark border-0 mb-3">
              <div
                class="card-body d-flex align-items-center justify-content-center"
              >
                <img src="@/assets/logoLG.svg" alt="" class="img-fluid" />
              </div>
            </div>

            <p>
              <b>Lets chat!</b> Have some questions, got some ideas, want to
              give us some feedback? We would love to here from you!
            </p>

            <hr />

            <p>Email: <b>Info@sparkwest.network</b></p>

            <div class="row">
              <div class="col">
                <a
                  target="_blank"
                  href="https://www.facebook.com/sparkwestnetwork/"
                  class="btn btn-block btn-primary"
                >
                  <i class="fa fa-facebook-f"></i>
                </a>
              </div>
              <div class="col pl-0">
                <a
                  target="_blank"
                  href="https://twitter.com/SparkWestNet"
                  class="btn btn-block btn-info"
                >
                  <i class="fa fa-twitter"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="col-12 col-lg">
        <div class="card">
          <div class="card-body">
            <form @submit.prevent="sendMessage">
              <div class="form-group">
                <label for="subject">Subject</label>
                <input
                  id="subject"
                  v-model="subject"
                  type="text"
                  class="form-control"
                  placeholder="Feedback"
                  required
                />
              </div>

              <div class="form-group">
                <label for="messageInput">Message</label>
                <textarea
                  id="messageInput"
                  v-model="message"
                  class="form-control"
                  cols="30"
                  rows="6"
                  placeholder="Your message ..."
                  required
                ></textarea>
              </div>

              <button
                type="submit"
                value="Send Message"
                class="btn btn-success float-right"
              >
                Send Message <i class="fas fa-paper-plane"></i>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>

    <hr />

    <h2 class="text-center mb-3">
      Subscribe to our newsletter <i class="far fa-envelope-open"></i>
    </h2>

    <div class="row d-flex justify-content-center">
      <div class="col col-lg-6">
        <div class="card card-body">
          <p class="mb-0 text-center">
            Get informed about entrepreneurial happenings and receive updates
            about Spark West Network in our monthly newsletter!
          </p>

          <hr />

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
  </div>
</template>

<script>
export default {
  name: 'Contact',

  head() {
    return {
      title: 'Contact',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'Get in touch with Spark West Network',
        },
      ],
    }
  },

  data() {
    return {
      subject: '',
      message: '',

      email: null,
      first: null,
      last: null,

      subscribing: false,
      success: false,
      fail: false,
    }
  },

  methods: {
    sendMessage() {
      const subject = encodeURIComponent(this.subject.trim())
      const body = encodeURIComponent(this.message.trim())
      window.location.href =
        'mailto:info@sparkwest.network?subject=' + subject + '&body=' + body
    },

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
        const response = await this.$axios.$post('/api/subscribe', {
          email: data.email.trim(),
          first: data.first.trim(),
          last: data.last.trim(),
        })
        console.log(response)

        this.subscribing = false
        this.success = true
        this.fail = false
      } catch (e) {
        console.log(e)
        this.subscribing = false
        this.success = false
        this.fail = true
      }
    },
  },
}
</script>

<style scoped>
#messageInput {
  resize: none;
}
</style>
