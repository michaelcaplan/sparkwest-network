<template>
  <div id="newEvent">
    <div class="container py-3">
      <h1>New Event</h1>

      <hr />

      <form @submit.prevent="uploadEvent">
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
                    <text-editor :maxChars="this.maxChars" />
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
                  <label for="image">Event Image:</label>

                  <div class="custom-file">
                    <input
                      type="file"
                      class="custom-file-input"
                      id="customFile"
                      ref="fileInput"
                      accept="image/x-png, image/jpeg"
                      @change="selectFile"
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
                <nuxt-link to="/profile" class="btn btn-lg btn-secondary"
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
            <nuxt-link to="/profile" class="btn btn-block btn-secondary mr-2"
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
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

import TextEditor from '@/components/TextEditor.vue'
import TextEditorPlaceholder from '@/components/TextEditorPlaceholder.vue'

import VueTimepicker from 'vue2-timepicker/src/vue-timepicker.vue'

export default {
  name: 'NewEvent',

  middleware: 'auth',

  head() {
    return {
      title: 'New Event',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'Create a new event',
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
      title: '',
      description: '',

      chars: 0,
      maxChars: 800,

      date: new Date(),

      timeFormat: 1,
      timeFormats: ['H:mm', 'h:mm a'],
      timePlaceholders: ['9:00', '17:00', '9:00 am', '5:00 pm'],
      startTime: {},
      endTime: {},

      location: null,

      file: null,
      filePreview: null,

      error: '',

      uploading: false,
    }
  },

  computed: {
    ...mapGetters({
      user: 'user/user',
    }),

    formValid() {
      return this.checkForm()
    },
  },

  methods: {
    setFormat() {
      if (this.timeFormat === 1) {
        let newStart
        let newEnd

        if (this.startTime.h && this.startTime.mm && this.startTime.a) {
          newStart = this.convertTime(
            this.startTime.h,
            this.startTime.mm,
            this.startTime.a
          )

          console.log(newStart)
        }

        if (this.endTime.h && this.endTime.mm && this.endTime.a) {
          newEnd = this.convertTime(
            this.endTime.h,
            this.endTime.mm,
            this.endTime.a
          )
        }

        this.timeFormat = 0

        if (newStart) this.startTime = newStart
        if (newEnd) this.endTime = newEnd
      } else {
        let newStart
        let newEnd

        if (this.startTime.H && this.startTime.mm) {
          newStart = this.convertTime(this.startTime.H, this.startTime.mm)
        }

        if (this.endTime.H && this.endTime.mm) {
          newEnd = this.convertTime(this.endTime.H, this.endTime.mm)
        }

        this.timeFormat = 1

        if (newStart) this.startTime = newStart
        if (newEnd) this.endTime = newEnd
      }
    },
    selectFile(event) {
      if (event.target.files) {
        const file = event.target.files[0]

        const urlCreator = window.URL || window.webkitURL
        const imageUrl = urlCreator.createObjectURL(file)

        this.filePreview = imageUrl
        this.file = file
      }
    },

    clearFile() {
      this.$refs.fileInput.value = null
      this.file = null
      this.filePreview = null
    },

    async uploadEvent() {
      if (!this.checkForm()) return
      this.uploading = true

      const N = new Date()

      // Format start end times to 24 hour from 12 or 24 hour
      let startTime
      let endTime

      if (this.timeFormat === 1) {
        startTime = this.convertTime(
          this.startTime.h,
          this.startTime.mm,
          this.startTime.a
        )
        endTime = this.convertTime(
          this.endTime.h,
          this.endTime.mm,
          this.endTime.a
        )
      } else {
        startTime = Object.assign({}, this.startTime)
        endTime = Object.assign({}, this.endTime)
      }

      const data = {
        authorID: this.user.uid || this.user.user_id,
        title: this.title,
        description: this.description,

        date: this.date.toDateString(),
        year: this.date.getFullYear(),
        month: this.date.getMonth(),
        day: this.date.getDate(),

        timestamp: this.date.getTime(),
        uploaded: N.getTime(),

        startTimeHour: parseInt(startTime.H),
        startTimeMinute: parseInt(startTime.mm),

        endTimeHour: parseInt(endTime.H),
        endTimeMinute: parseInt(endTime.mm),

        location: this.location,

        imageRef: null,
        likes: [],
      }

      try {
        const docRef = this.$fireStore.collection('events').doc()

        if (this.file) {
          data.imageRef = 'events/' + docRef.id + '/original.png'
          await docRef.set(data)

          const imageRef = this.$fireStorage.ref().child(data.imageRef)
          await imageRef.put(this.file)
        } else {
          await docRef.set(data)
        }

        this.uploading = false
        this.$router.push('/events/' + docRef.id)
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
          !this.startTime.H ||
          !this.startTime.mm ||
          !this.endTime.H ||
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

      // Format start end times to 24 hour from 12 or 24 hour
      let startTime
      let endTime

      if (this.timeFormat === 1) {
        startTime = this.convertTime(
          this.startTime.h,
          this.startTime.mm,
          this.startTime.a
        )
        endTime = this.convertTime(
          this.endTime.h,
          this.endTime.mm,
          this.endTime.a
        )
      } else {
        startTime = Object.assign({}, this.startTime)
        endTime = Object.assign({}, this.endTime)
      }

      startTime.H = parseInt(startTime.H)
      startTime.mm = parseInt(startTime.mm)
      endTime.H = parseInt(endTime.H)
      endTime.mm = parseInt(endTime.mm)

      console.log(startTime)
      console.log(endTime)

      // Check that start time is before end time
      if (startTime.H > endTime.H) {
        this.error = 'Start time must come before end time'
        return false
      } else if (startTime.mm > endTime.mm && startTime.H === endTime.H) {
        this.error = 'Start time must come before end time'
        return false
      }

      this.error = ''
      return true
    },

    // Converts time between 24h and 12h
    convertTime(h, mm, a = false) {
      if (a) {
        let hour = parseInt(h)
        if (hour === 12) hour = 0
        if (a === 'pm') hour += 12

        return { H: hour.toString(), mm }
      } else {
        const H = parseInt(h) % 12 || 12
        const ampm = parseInt(h) < 12 || parseInt(h) === 24 ? 'am' : 'pm'

        return { h: H.toString(), mm, a: ampm }
      }
    },
  },

  created() {
    this.$nuxt.$on('editor-update', (value) => {
      this.description = value.html
      this.chars = value.chars
    })
  },
}
</script>

<style scoped>
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
