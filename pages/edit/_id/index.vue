<template>
  <div id="newEvent">
    <div class="container py-3">
      <h1>Edit Event</h1>

      <hr />

      <form v-if="!loading && event" @submit.prevent="uploadEvent">
        <div
          v-if="error"
          class="alert alert-danger animate__animated animate__shakeX"
          role="alert"
        >
          {{ error }}
        </div>

        <div class="row">
          <div class="col-12 col-lg mb-3 mb-lg-0">
            <div class="card mb-3">
              <div class="card-body">
                <div class="form-group">
                  <label for="title"
                    ><span class="text-danger">*</span> Title:</label
                  >

                  <input
                    type="text"
                    id="title"
                    class="form-control"
                    v-model="title"
                    placeholder="Title..."
                    required
                  />
                </div>

                <div class="form-group mb-0">
                  <label for="description"
                    ><span class="text-danger">*</span> Description:</label
                  >

                  <client-only>
                    <text-editor
                      :maxChars="this.maxChars"
                      :content="event.data.description"
                    />
                    <text-editor-placeholder slot="placeholder" />
                  </client-only>
                </div>
              </div>
            </div>

            <div class="card mb-3">
              <div class="card-body">
                <div class="form-group">
                  <label for="date"
                    ><span class="text-danger">*</span> Event Date:</label
                  >

                  <client-only>
                    <date-picker
                      v-model="date"
                      :input-class="'date-input'"
                      :calendar-class="'calendar-input'"
                      :bootstrap-styling="true"
                      :required="true"
                      :disabled="false"
                    />
                    <div
                      class="loading-lg gradient rounded w-100"
                      slot="placeholder"
                    ></div>
                  </client-only>
                </div>

                <div class="row mb-3">
                  <div class="col">
                    <div class="form-group mb-0">
                      <label for="startTime"
                        ><span class="text-danger">*</span> Start Time:</label
                      >
                      <vue-timepicker
                        id="startTime"
                        class="d-block"
                        input-class="rounded"
                        input-width="100%"
                        :format="timeFormats[timeFormat]"
                        :placeholder="timePlaceholders[timeFormat * 2]"
                        v-model="startTime"
                        required
                      ></vue-timepicker>
                    </div>
                  </div>
                  <div class="col pl-0">
                    <div class="form-group mb-0">
                      <label for="endTime"
                        ><span class="text-danger">*</span> End Time:</label
                      >

                      <vue-timepicker
                        id="startTime"
                        class="d-block"
                        input-class="rounded"
                        input-width="100%"
                        :format="timeFormats[timeFormat]"
                        :placeholder="timePlaceholders[timeFormat * 2 + 1]"
                        v-model="endTime"
                        required
                      ></vue-timepicker>
                    </div>
                  </div>
                </div>

                <div class="custom-control custom-switch float-right">
                  <input
                    type="checkbox"
                    class="custom-control-input"
                    id="formatSwitch"
                    :value="timeFormat == 0"
                    @change.prevent="setFormat"
                  />
                  <label class="custom-control-label" for="formatSwitch"
                    >Use 24 Hour</label
                  >
                </div>
              </div>
            </div>

            <div class="card mb-2">
              <div class="card-body">
                <div class="form-group mb-0">
                  <label for="location"
                    ><span class="text-danger">*</span> Event Location:</label
                  >

                  <input
                    type="text"
                    id="location"
                    class="form-control"
                    placeholder="Place Ave. Townsville"
                    v-model="location"
                    required
                  />
                </div>
              </div>
            </div>

            <i class="mb-0 text-danger d-none d-lg-inline-block"
              >* Required Field</i
            >
          </div>

          <div class="col-12 col-lg-5">
            <div class="card bg-light mb-2">
              <div class="card-body">
                <div class="form-group">
                  <label for="image"
                    ><span class="text-danger">*</span> Event Image:</label
                  >

                  <div class="custom-file">
                    <input
                      type="file"
                      class="custom-file-input"
                      id="customFile"
                      ref="fileInput"
                      accept="image/x-png, image/jpeg"
                      @change="selectFile"
                      :required="newFile"
                    />
                    <label class="custom-file-label" for="customFile"
                      >Choose file</label
                    >
                  </div>
                </div>

                <div v-if="filePreview" id="img-wrapper">
                  <img :src="filePreview" alt="" class="img-fluid rounded" />
                  <button @click.prevent="clearFile" class="btn btn-light">
                    <i class="fa fa-times" aria-hidden="true"></i>
                  </button>
                </div>

                <div
                  v-else
                  id="file-placeholder"
                  class="rounded border text-muted"
                >
                  <div class="content">
                    <div>
                      <div class="d-flex justify-content-center mb-2">
                        <i class="far fa-4x fa-file-image"></i>
                      </div>
                      <div class="d-flex justify-content-center">
                        <i class="text-center">No Image Selected</i>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <i class="mb-0 text-danger d-inline-block d-lg-none"
              >* Required Field</i
            >
          </div>
        </div>

        <hr />

        <div class="row justify-content-end d-none d-md-flex">
          <div class="col-auto">
            <div class="row">
              <div class="col-auto pr-0">
                <nuxt-link
                  :to="'/events/' + event.id"
                  class="btn btn-lg btn-secondary"
                  >Cancle</nuxt-link
                >
              </div>
              <div class="col-auto">
                <button
                  type="submit"
                  class="btn btn-lg btn-primary d-flex align-items-center"
                >
                  Upload
                  <span
                    v-if="uploading"
                    class="spinner-border spinner-border-sm ml-2"
                    role="status"
                    aria-hidden="true"
                  ></span>
                </button>
              </div>
            </div>
          </div>
        </div>

        <div class="row d-flex d-md-none d-lg-none">
          <div class="col pr-0">
            <nuxt-link
              :to="'/events/' + event.id"
              class="btn btn-block btn-secondary mr-2"
              >Cancle</nuxt-link
            >
          </div>
          <div class="col">
            <button
              type="submit"
              class="btn btn-block btn-primary d-flex align-items-center justify-content-center"
            >
              Upload
              <span
                v-if="uploading"
                class="spinner-border spinner-border-sm ml-2"
                role="status"
                aria-hidden="true"
              ></span>
            </button>
          </div>
        </div>
      </form>

      <!-- Placeholder markup -->
      <div v-if="loading" class="row">
        <div class="col-12 col-lg mb-3 mb-lg-0">
          <div class="card card-body mb-3">
            <div class="loading gradient rounded w-25 mb-2"></div>
            <div class="loading-btn gradient rounded w-100 mb-3"></div>

            <div class="loading gradient rounded w-25 mb-2"></div>
            <div class="loading-btn gradient rounded w-100 mb-3"></div>
          </div>

          <div class="card card-body mb-3">
            <div class="loading gradient rounded w-25 mb-2"></div>
            <div class="loading-btn gradient rounded w-100 mb-3"></div>

            <div class="row">
              <div class="col">
                <div class="row">
                  <div class="col">
                    <div class="loading gradient rounded w-25 mb-2"></div>
                    <div class="loading-btn gradient rounded w-100"></div>
                  </div>
                </div>
              </div>
              <div class="col pl-0">
                <div class="row">
                  <div class="col">
                    <div class="loading gradient rounded w-25 mb-2"></div>
                    <div class="loading-btn gradient rounded w-100"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="card card-body">
            <div class="loading gradient rounded w-25 mb-2"></div>
            <div class="loading-btn gradient rounded w-100"></div>
          </div>
        </div>

        <div class="col-12 col-lg-5">
          <div class="card card-body">
            <div class="loading gradient rounded w-25 mb-2"></div>
            <div class="loading-btn gradient rounded w-100 mb-3"></div>

            <div id="file-loading" class="loading gradient rounded"></div>
          </div>
        </div>
      </div>

      <div v-if="!loading && !event" class="row d-flex justify-content-center">
        <div class="col col-lg-6">
          <h1 class="display-1 text-center">404</h1>
          <h3 class="text-center">Event not found</h3>

          <hr />

          <p class="text-cent">
            It seems the event you are looking for does not exist. This could be
            because the event was deleted or there is a typo in your search
          </p>

          <div class="row d-flex justify-content-center">
            <div class="col-auto">
              <nuxt-link to="/" class="btn btn-primary">
                Go Back Home
              </nuxt-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

import TextEditor from '@/components/TextEditor.vue'
import TextEditorPlaceholder from '@/components/TextEditorPlaceholder.vue'

import VueTimepicker from 'vue2-timepicker/src/vue-timepicker.vue'

export default {
  name: 'EditEvent',

  middleware: 'edit',

  head() {
    return {
      title: 'Edit Event',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'Edit an existing event',
        },
      ],
    }
  },

  components: {
    TextEditor,
    TextEditorPlaceholder,
    VueTimepicker,
  },

  data() {
    return {
      event: null,
      loading: true,

      title: '',
      description: '',

      chars: 0,
      maxChars: 800,

      date: new Date(),

      timeFormat: 1,
      timeFormats: ['k:mm', 'h:mm a'],
      timePlaceholders: ['9:00', '17:00', '9:00 am', '5:00 pm'],
      startTime: {},
      endTime: {},

      location: null,

      file: null,
      filePreview: null,
      newFile: false,

      error: '',

      uploading: false,
    }
  },

  computed: {
    ...mapGetters({
      user: 'user/user',
    }),
    id() {
      return this.$route.params.id
    },
  },

  methods: {
    async getEvent() {
      try {
        this.loading = true
        const docRef = this.$fireStore.collection('events').doc(this.id)
        const doc = await docRef.get()

        if (doc.exists) {
          const imageRef = this.$fireStorage.ref().child(doc.data().imageRef)
          const URL = await imageRef.getDownloadURL()

          this.event = {
            id: doc.id,
            data: doc.data(),
            image: URL,
          }

          if (
            this.event.data.authorID !== (this.user.uid || this.user.user_id)
          ) {
            this.$router.push('/events/' + this.id)
          }
        }

        this.loading = false
      } catch (e) {
        console.error(e)
        this.loading = false
      }
    },

    setFormat() {
      if (this.timeFormat === 1) this.timeFormat = 0
      else this.timeFormat = 1
    },
    selectFile(event) {
      if (event.target.files) {
        const file = event.target.files[0]

        const urlCreator = window.URL || window.webkitURL
        const imageUrl = urlCreator.createObjectURL(file)

        this.filePreview = imageUrl
        this.file = file
        this.newFile = true
      }
    },

    clearFile() {
      this.$refs.fileInput.value = null
      this.file = null
      this.filePreview = null
      this.newFile = true
    },

    async uploadEvent() {
      if (!this.checkForm()) return
      this.uploading = true

      const startTime = {
        h: null,
        m: null,
      }
      const endTime = {
        h: null,
        m: null,
      }

      //   Format start end times to 24 hour from 12 or 24 hour
      if (this.timeFormat === 1) {
        startTime.h = parseInt(this.startTime.h)
        startTime.m = parseInt(this.startTime.mm)
        if (this.startTime.a === 'pm') startTime.h += 12

        endTime.h = parseInt(this.endTime.h)
        endTime.m = parseInt(this.endTime.mm)
        if (this.endTime.a === 'pm') endTime.h += 12
      } else {
        startTime.h = parseInt(this.startTime.k)
        startTime.m = parseInt(this.startTime.mm)

        endTime.h = parseInt(this.endTime.k)
        endTime.m = parseInt(this.endTime.mm)
      }

      const data = {
        title: this.title,
        description: this.description,

        date: this.date.toDateString(),
        year: this.date.getFullYear(),
        month: this.date.getMonth(),
        day: this.date.getDate(),

        timestamp: this.date.getTime(),

        startTimeHour: startTime.h,
        startTimeMinute: startTime.m,

        endTimeHour: endTime.h,
        endTimeMinute: endTime.m,

        location: this.location,
      }

      try {
        const docRef = this.$fireStore.collection('events').doc(this.id)

        if (this.newFile) {
          data.imageRef = 'events/' + this.id + '/original.png'

          await docRef.update(data)

          const imageRef = this.$fireStorage.ref().child(data.imageRef)
          await imageRef.put(this.file)

          this.uploading = false
          this.$router.push('/events/' + this.id)
        } else {
          await docRef.update(data)
          this.uploading = false
          this.$router.push('/events/' + this.id)
        }
      } catch (e) {
        console.error(e)
      }
    },

    checkForm() {
      // Check that description was inputed
      if (this.chars <= 0) {
        this.error = 'Valid description required'
        return false
      }

      // Check description length
      if (this.chars > this.maxChars) {
        this.error = 'Description exceeds max character count'
        return false
      }

      // Check that time was inputed
      if (this.timeFormat === 0) {
        if (
          !this.startTime.k ||
          !this.startTime.mm ||
          !this.endTime.k ||
          !this.endTime.mm
        ) {
          this.error = 'Valid start and end time required'
          return false
        }
      }
      if (this.timeFormat === 1) {
        if (
          !this.startTime.h ||
          !this.startTime.mm ||
          !this.startTime.a ||
          !this.endTime.h ||
          !this.endTime.mm ||
          !this.endTime.a
        ) {
          this.error = 'Valid start and end time required'
          return false
        }
      }

      // Check that start time is before end time
      const startTime = {
        h: null,
        m: null,
      }
      const endTime = {
        h: null,
        m: null,
      }

      // Format start end times to 24 hour from 12 or 24 hour
      if (this.timeFormat === 1) {
        startTime.h = parseInt(this.startTime.h)
        startTime.m = parseInt(this.startTime.mm)
        if (this.startTime.a === 'pm') startTime.h += 12

        endTime.h = parseInt(this.endTime.h)
        endTime.m = parseInt(this.endTime.mm)
        if (this.endTime.a === 'pm') endTime.h += 12
      } else {
        startTime.h = parseInt(this.startTime.k)
        startTime.m = parseInt(this.startTime.mm)

        endTime.h = parseInt(this.endTime.k)
        endTime.m = parseInt(this.endTime.mm)
      }

      if (startTime.h > endTime.h) {
        this.error = 'Start time must come before end time'
        return false
      } else if (startTime.m > endTime.m && startTime.h === endTime.h) {
        this.error = 'Start time must come before end time'
        return false
      }

      this.error = ''
      return true
    },
  },

  created() {
    this.$nuxt.$on('editor-update', (value) => {
      this.description = value.html
      this.chars = value.chars
    })
  },

  async mounted() {
    await this.getEvent()

    this.title = this.event.data.title
    this.description = this.event.data.description

    this.date = new Date(
      this.event.data.year,
      this.event.data.month,
      this.event.data.day
    )

    let sH = this.event.data.startTimeHour
    let sA = 'am'
    if (sH > 12) {
      sH -= 12
      sA = 'pm'
    }
    sH = sH.toString()

    let sM = this.event.data.startTimeMinute
    if (sM < 10) {
      sM = '0' + sM
    } else {
      sM = sM.toString()
    }

    let eH = this.event.data.endTimeHour
    let eA = 'am'
    if (eH > 12) {
      eH -= 12
      eA = 'pm'
    }
    eH = eH.toString()

    let eM = this.event.data.endTimeMinute
    if (eM < 10) {
      eM = '0' + eM
    } else {
      eM = eM.toString()
    }

    this.startTime = {
      h: sH,
      mm: sM,
      a: sA,
    }
    this.endTime = {
      h: eH,
      mm: eM,
      a: eA,
    }

    this.location = this.event.data.location

    this.filePreview = this.event.image
  },
}
</script>

<style scoped>
#file-loading {
  height: 0;
  width: 100%;
  overflow: hidden;
  padding-top: calc(2 / 3 * 100%);
}

#file-placeholder {
  height: 0;
  overflow: hidden;
  padding-top: calc(2 / 3 * 100%);
  position: relative;
  background: var(--bg-card);
  border-color: var(--secondary) !important;
}

#file-placeholder .content {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}

#img-wrapper {
  position: relative;
}

#img-wrapper button {
  position: absolute;
  top: 0;
  right: 0;
  margin: 0.5rem;
}
</style>

<style>
.calendar-input {
  background: var(--card-bg) !important;
}

.calendar-input header * {
  color: var(--text);
}

.calendar-input header *:hover {
  color: var(--text-on);
}
</style>
