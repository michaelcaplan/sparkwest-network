<template>
  <div class="container py-3">
    <h1 class="text-center">Contact Us</h1>

    <hr />

    <div class="row">
      <div class="col-12 col-md mb-3 mb-md-0">
        <div class="card">
          <div class="card-body">
            <p>
              <b>Lets chat!</b> Have some questions, want to give us some
              feedback? We would love to here from you!
            </p>

            <p>Email: <b>Info@sparkwest.network</b></p>

            <div class="row">
              <div class="col-auto">
                <a
                  target="_blank"
                  href="https://www.facebook.com/sparkwestnetwork/"
                  class="btn btn-lg btn-primary"
                >
                  <i class="fa fa-facebook-f"></i>
                </a>
              </div>
              <div class="col-auto p-0">
                <a
                  target="_blank"
                  href="https://twitter.com/SparkWestNet"
                  class="btn btn-lg btn-info"
                >
                  <i class="fa fa-twitter"></i>
                </a>
              </div>
              <div class="col-auto">
                <a
                  target="_blank"
                  href="https://www.instagram.com/sparkwestnetwork/"
                  class="btn btn-lg btn-danger disabled"
                >
                  <i class="fa fa-instagram"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="col-12 col-md">
        <div class="card">
          <div class="card-body">
            <form @submit.prevent="sendMessage">
              <div class="form-group">
                <label for="emailInput">Email</label>
                <input
                  id="emailInput"
                  v-model="email"
                  type="email"
                  class="form-control"
                  placeholder="john@doe.ca"
                  required
                />
              </div>

              <div class="form-group">
                <label for="emailInput">Message</label>
                <textarea
                  id="messageInput"
                  v-model="message"
                  class="form-control"
                  cols="30"
                  rows="6"
                  required
                ></textarea>
              </div>

              <input
                type="submit"
                value="Send Message"
                class="btn btn-success float-right"
              />
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Contact',
  data() {
    return {
      email: '',
      message: '',
    }
  },
  methods: {
    sendMessage() {
      const messageTrim = this.message.trim()
      window.location.href =
        'mailto:info@sparkwest.network?subject=Contact%Form&body=' + messageTrim
    },
  },
}
</script>

<style scoped>
#messageInput {
  resize: none;
}
</style>
