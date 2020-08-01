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
          <div class="col-12 col-md-auto">
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
          <div class="col-12 col-md-auto">
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
              v-if="profile.avatarUrl"
              class="avatar rounded border"
              :style="'background-image: url(\'' + profile.avatarUrl + '\')'"
            ></div>
            <div v-else class="avatar rounded bg-secondary text-light">
              <h1 v-if="profile.name" class="m-0">
                {{ profile.name.substring(0, 1) }}
              </h1>
            </div>

            <button
              class="btn btn-info btn-block mt-2"
              data-toggle="modal"
              data-target="#cropModal"
              :disabled="updating"
            >
              Change
            </button>
          </div>
        </div>

        <hr />

        <h5>Profile Information:</h5>

        <div class="row d-flex justify-content-center">
          <div class="col col-md-6">
            <form @submit.prevent="updateInfo">
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
                ></textarea>
              </div>

              <input
                type="submit"
                class="btn btn-success float-right"
                value="Update"
                :disabled="updating"
              />
            </form>
          </div>
        </div>

        <hr />

        <h5>Danger Zone:</h5>

        <div class="row d-flex justify-content-center">
          <div class="col col-md-4">
            <button
              class="btn btn-lg btn-block btn-danger"
              :disabled="updating"
            >
              Delete Account
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal -->
    <div
      class="modal fade"
      id="cropModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="cropModal"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">
              Upload Profile Picture
            </h5>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
              :disabled="updating"
            >
              <i class="fa fa-times" aria-hidden="true"></i>
            </button>
          </div>

          <div class="modal-body">
            <div class="custom-file">
              <input
                type="file"
                class="custom-file-input"
                accept="image/x-png,image/jpeg"
                @change="fileSelect"
              />
              <label class="custom-file-label" for="customFile"
                >Choose file</label
              >
            </div>

            <vue-cropper
              v-if="selectedFileUrl"
              ref="cropper"
              class="mt-3 rounded"
              :src="selectedFileUrl"
              alt="Source Image"
              :aspectRatio="1"
              :rotatable="false"
            >
            </vue-cropper>
          </div>

          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-dismiss="modal"
              :disabled="updating"
            >
              Close
            </button>
            <button
              v-if="selectedFile"
              @click="uploadImg"
              type="button"
              class="btn btn-primary"
              :disabled="updating"
            >
              Save changes
              <span
                v-if="updating"
                class="spinner-border spinner-border-sm"
                role="status"
                aria-hidden="true"
              ></span>
              <i v-if="done" class="fa fa-check-circle" aria-hidden="true"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

import VueCropper from 'vue-cropperjs'
import 'cropperjs/dist/cropper.css'

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

      selectedFileUrl: null,
      selectedFile: null,

      updating: false,
      done: false,
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

  components: {
    VueCropper,
  },

  methods: {
    ...mapActions({
      updateProfile: 'user/updateProfile',
      uploadImage: 'user/uploadImage',
    }),

    async updateInfo() {
      this.updating = true
      await this.updateProfile({
        name: this.formName,
        about: this.formAbout || '',
      })
      this.updating = false
    },

    fileSelect(event) {
      const file = event.target.files[0]

      const urlCreator = window.URL || window.webkitURL
      const imageUrl = urlCreator.createObjectURL(file)

      if (this.$refs.cropper) {
        this.$refs.cropper.replace(imageUrl)
      }

      this.selectedFile = file
      this.selectedFileUrl = imageUrl
    },

    uploadImg() {
      this.updating = true
      this.done = false

      this.$refs.cropper.getCroppedCanvas().toBlob(async (blob) => {
        await this.uploadImage(blob)

        this.updating = false
        this.done = true
      })
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
