<template>
  <div id="edit">
    <div v-if="profile && user" class="card mb-3">
      <div class="card-body">
        <h3 class="mb-3">
          Edit Profile:
        </h3>

        <hr />

        <h5>Account Details:</h5>

        <div
          v-if="detailError"
          class="alert alert-danger animate__animated animate__shakeX"
        >
          {{ detailError }}
        </div>

        <div class="row mb-3">
          <div class="col-12 col-md-2">
            <b>Email: </b>
          </div>
          <div class="col-12 col-md-auto">
            {{ user.email }}
          </div>
          <div class="col-auto">
            <a class="disabled" data-toggle="collapse" href="#emailCollapse"
              >Change Email</a
            >
          </div>
        </div>

        <div id="emailCollapse" class="collapse">
          <div class="row w-100 m-0">
            <div class="col p-0">
              <hr />

              <div class="row d-flex justify-content-center">
                <div class="col col-md-6">
                  <form @submit.prevent="changeEmail">
                    <div class="form-group">
                      <label for="pass">New Email</label>
                      <input
                        type="email"
                        name="pass"
                        id="pass"
                        class="form-control"
                        placeholder="JohnDoe@email.com"
                        v-model="formEmail"
                        required
                      />
                    </div>

                    <div class="row justify-content-end">
                      <div class="col-auto">
                        <button
                          class="btn btn-secondary mr-3"
                          data-toggle="collapse"
                          data-target="#emailCollapse"
                          @click.prevent
                        >
                          Cancle
                        </button>

                        <button
                          class="btn btn-primary"
                          type="submit"
                          value="update"
                          :disabled="updating || formEmail === user.email"
                        >
                          <span
                            v-show="updating"
                            class="spinner-border spinner-border-sm"
                            role="status"
                            aria-hidden="true"
                          ></span>
                          Update
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>

              <hr />
            </div>
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
            <a data-toggle="collapse" href="#passwordCollapse"
              >Reset Password</a
            >
          </div>
        </div>

        <div id="passwordCollapse" class="collapse">
          <div class="row w-100 m-0">
            <div class="col p-0">
              <hr />

              <div class="row d-flex justify-content-center">
                <div class="col col-md-6">
                  <form @submit.prevent="changePass">
                    <div class="form-group">
                      <label for="pass">Old Password</label>
                      <input
                        type="password"
                        name="pass"
                        id="pass"
                        class="form-control"
                        placeholder="super secret"
                        v-model="formPasswordOld"
                        required
                      />
                    </div>

                    <div class="form-group">
                      <label for="pass">New Password</label>
                      <input
                        type="password"
                        name="pass"
                        id="pass"
                        class="form-control"
                        placeholder="super secret"
                        v-model="formPassword"
                        required
                      />
                    </div>

                    <div class="form-group">
                      <label for="rePass">Repeat Password</label>
                      <input
                        type="password"
                        name="rePass"
                        id="pass"
                        class="form-control"
                        placeholder="super secret"
                        v-model="formPasswordRe"
                        required
                      />
                    </div>

                    <div class="row justify-content-end">
                      <div class="col-auto">
                        <button
                          class="btn btn-secondary mr-3"
                          data-toggle="collapse"
                          data-target="#passwordCollapse"
                          @click.prevent
                        >
                          Cancle
                        </button>

                        <button
                          class="btn btn-primary"
                          type="submit"
                          value="update"
                          :disabled="
                            updating ||
                            formPassword !== formPasswordRe ||
                            !formPassword ||
                            !formPasswordOld
                          "
                        >
                          <span
                            v-show="updating"
                            class="spinner-border spinner-border-sm"
                            role="status"
                            aria-hidden="true"
                          ></span>
                          Update
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
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
            <div class="card card-body">
              <p>
                If you want to continue, type your password below:
              </p>

              <div class="form-group">
                <label for="email">Password: </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  class="form-control"
                  placeholder="Super secret"
                  v-model="deletePassword"
                  required
                />
              </div>
            </div>
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
              v-if="deletePassword"
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
      formPassword: null,
      formPasswordRe: null,
      formPasswordOld: null,
      formAbout: null,
      formAvatar: null,

      selectedFileUrl: null,
      selectedFile: null,

      updating: false,
      done: false,

      deletePassword: null,
      deleting: false,
      deleted: false,

      detailError: false,
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

    async changeEmail() {
      try {
        this.updating = true

        const user = this.$fireAuth.currentUser
        await user.updateEmail(this.formEmail)

        this.detailError = false
        this.updating = false
      } catch (e) {
        console.error(e)

        this.detailError = e.message
        this.updating = false
      }
    },

    async changePass() {
      try {
        if (this.formPassword === this.formPasswordRe) {
          this.updating = true

          const user = this.$fireAuth.currentUser
          const credentials = this.$fireAuthObj.EmailAuthProvider.credential(
            this.user.email,
            this.formPasswordOld
          )

          await user.reauthenticateWithCredential(credentials)
          await user.updatePassword(this.formPassword)

          this.detailError = false
          this.updating = false
        }
      } catch (e) {
        console.error(e)

        this.detailError = e.message
        this.updating = false
      }
    },

    async deleteProfile() {
      try {
        this.deleting = true

        const user = this.$fireAuth.currentUser
        const credentials = this.$fireAuthObj.EmailAuthProvider.credential(
          this.user.email,
          this.deletePassword
        )

        await user.reauthenticateWithCredential(credentials)
        await user.delete()

        this.deleted = true
        this.deleting = false
        this.$router.push('/')
      } catch (e) {
        console.error(e)
        this.deleted = false
        this.deleting = false
      }
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
