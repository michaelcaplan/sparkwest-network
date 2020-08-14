<template>
  <div id="edit">
    <div v-if="profile && user" class="card mb-3">
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
              data-toggle="modal"
              data-target="#deleteModal"
              :disabled="updating"
            >
              Delete Profile
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="card bg-dark">
      <div class="card-body">
        <h3>Experimental:</h3>
        <p class="font-italic">
          Features for Spark West Network that aren't yet complete
        </p>
        <hr />

        <h5>Theme:</h5>

        <div class="row d-flex justify-content-center">
          <div class="col-12 col-md-8">
            <theme-picker />
          </div>
        </div>
      </div>
    </div>

    <!-- Modals -->
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

    <div
      class="modal fade"
      id="deleteModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="deleteModal"
      aria-hidden="true"
      v-if="!deleted"
    >
      <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
        <div class="modal-content">
          <div class="modal-header d-inline-block bg-danger text-light">
            <div class="row">
              <div class="col">
                <h3 class="modal-title" id="exampleModalLabel">
                  Delete Profile
                </h3>
              </div>

              <div class="col-auto">
                <button
                  type="button"
                  class="btn"
                  data-dismiss="modal"
                  aria-label="Close"
                  :disabled="updating"
                >
                  <i class="fa fa-times text-light" aria-hidden="true"></i>
                </button>
              </div>
            </div>

            <hr />

            <div class="row">
              <div class="col">
                <p>
                  All information connected to this account will be permanently
                  delted. This cannot be undone
                </p>
              </div>
            </div>
          </div>

          <div class="modal-body">
            <p>If you want to continue, type the name of the profile below:</p>

            <input
              v-model="deleteName"
              :placeholder="profile.name"
              type="text"
              class="form-control"
            />
          </div>

          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-dismiss="modal"
              :disabled="updating"
            >
              Cancle
            </button>

            <button
              class="btn btn-danger"
              v-if="profile.name == deleteName && deleteName"
              :disabled="updating || deleting"
              @click="deleteProfile"
            >
              Delete Profile
              <span
                v-if="deleting"
                class="spinner-border spinner-border-sm"
                role="status"
                aria-hidden="true"
              ></span>
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

import ThemePicker from '@/components/ThemePicker.vue'

export default {
  name: 'Edit',

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

      deleteName: null,
      deleting: false,
      deleted: false,
    }
  },

  computed: {
    ...mapGetters({
      profile: 'user/profile',
      user: 'user/user',
    }),

    name() {
      return this.profile.name
    },
  },

  watch: {
    name() {
      console.log('Set form')

      this.formAbout = this.profile.about
      this.formAvatar = this.profile.avatar
      this.formName = this.profile.name
      this.formEmail = this.user.email
    },
  },

  components: {
    VueCropper,
    ThemePicker,
  },

  methods: {
    ...mapActions({
      updateProfile: 'user/updateProfile',
      uploadImage: 'user/uploadImage',
      getProfile: 'user/getProfile',
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

    deleteProfile() {
      this.deleting = true
      const user = this.$fireAuth.currentUser

      console.log(user)

      user.delete().then(() => {
        this.deleted = true
        this.$router.push('/')
      })
    },
  },

  async mounted() {
    if (!this.profile.name) {
      await this.getProfile(this.user.uid || this.user.user_id)
    }

    console.log('mounted')

    this.formAbout = this.profile.about
    this.formAvatar = this.profile.avatar
    this.formName = this.profile.name
    this.formEmail = this.user.email
  },
}
</script>

<style scoped>
textarea {
  resize: none;
}
</style>
