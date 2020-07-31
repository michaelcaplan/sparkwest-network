<template>
  <div id="edit">
    <div v-if="profile && user" class="card">
      <div class="card-body">
        <h3 class="mb-3">
          Edit Profile:
        </h3>

        <hr />

        <h5>Account Details:</h5>

        <div class="row mb-3">
          <div class="col-12 col-md-2">
            <b>Email: </b>
          </div>
          <div class="col-12 col-md-2">
            {{ user.email }}
          </div>
          <div class="col-auto">
            <a class="disabled" href="#">Change Email</a>
          </div>
        </div>

        <div class="row">
          <div class="col-12 col-md-2">
            <b>Password: </b>
          </div>
          <div class="col-12 col-md-2">
            ****************
          </div>
          <div class="col-auto">
            <a class="disabled" href="#">Reset Password</a>
          </div>
        </div>

        <hr />

        <h5>Profile Picture:</h5>

        <div class="row d-flex justify-content-center">
          <div class="col-auto">
            <div
              v-if="profile.avatar"
              class="avatar rounded shadow-sm"
              :style="'background: url(\'' + profile.avatar + '\')'"
            ></div>
            <div
              v-else
              class="avatar rounded bg-secondary text-light shadow-sm"
            >
              <h1 v-if="profile.name" class="m-0">
                {{ profile.name.substring(0, 1) }}
              </h1>
            </div>

            <button class="btn btn-info btn-block mt-2">
              Change
            </button>
          </div>
        </div>

        <hr />

        <h5>Profile Information:</h5>

        <div class="row d-flex justify-content-center">
          <div class="col col-md-6">
            <form>
              <div class="form-group">
                <label for="formName">Name</label>
                <input
                  id="formName"
                  v-model="formName"
                  type="text"
                  class="form-control"
                  placeholder="John Doe"
                  maxlength="80"
                  required
                />
              </div>

              <div class="form-group">
                <label for="formAbout">About</label>
                <textarea
                  id="formAbout"
                  v-model="formAbout"
                  class="form-control"
                  placeholder="A breif description of yourself ..."
                  maxlength="200"
                  rows="3"
                  required
                ></textarea>
              </div>

              <input
                type="submit"
                class="btn btn-success float-right"
                value="Update"
                disabled
              />
            </form>
          </div>
        </div>

        <hr />

        <h5>Danger Zone:</h5>

        <div class="row d-flex justify-content-center">
          <div class="col col-md-4">
            <button class="btn btn-lg btn-block btn-danger" disabled>
              Delete Account
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Edit',
  computed: {
    ...mapGetters({
      profile: 'user/profile',
      user: 'user/user',
    }),
  },

  data() {
    return {
      formName: null,
      formEmail: null,
      formAbout: null,
      formAvatar: null,
    }
  },

  watch: {
    profile() {
      this.formAbout = this.profile.about
      this.formAvatar = this.profile.avatar
      this.formName = this.profile.name
      this.formEmail = this.user.email
    },
  },
}
</script>

<style scoped>
.avatar {
  width: 10rem;
  height: 10rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
}

textarea {
  resize: none;
}
</style>
