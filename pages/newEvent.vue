<template>
  <div id="newEvent">
    <div class="container py-3">
      <h1>New Event</h1>

      <hr />

      <form>
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
                    <text-editor />
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

                  <input
                    type="date"
                    id="date"
                    class="form-control"
                    v-model="date"
                    required
                  />
                </div>

                <div class="row">
                  <div class="col">
                    <div class="form-group mb-0">
                      <label for="startTime"
                        ><span class="text-danger">*</span> Start Time:</label
                      >

                      <input
                        type="time"
                        id="startTime"
                        class="form-control"
                        v-model="startTime"
                        required
                      />
                    </div>
                  </div>
                  <div class="col">
                    <div class="form-group mb-0">
                      <label for="endTime"
                        ><span class="text-danger">*</span> End Time:</label
                      >

                      <input
                        type="time"
                        id="endTime"
                        class="form-control"
                        v-model="endTime"
                        required
                      />
                    </div>
                  </div>
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
                      required
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
                  class="rounded bg-white border text-muted"
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
            <nuxt-link to="/profile" class="btn btn-lg btn-secondary mr-2"
              >Cancle</nuxt-link
            >

            <input type="submit" class="btn btn-lg btn-primary" />
          </div>
        </div>

        <div class="row d-flex d-md-none d-lg-none">
          <div class="col pr-0">
            <nuxt-link to="/profile" class="btn btn-block btn-secondary mr-2"
              >Cancle</nuxt-link
            >
          </div>
          <div class="col">
            <input type="submit" class="btn btn-block btn-primary" />
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import TextEditor from '@/components/TextEditor.vue'
import TextEditorPlaceholder from '@/components/TextEditorPlaceholder.vue'

export default {
  name: 'NewEvent',

  components: {
    TextEditor,
    TextEditorPlaceholder,
  },

  data() {
    return {
      title: '',
      description: '',
      date: null,
      startTime: null,
      endTime: null,
      location: null,

      file: null,
      filePreview: null,
    }
  },

  methods: {
    selectFile(event) {
      const file = event.target.files[0]

      const urlCreator = window.URL || window.webkitURL
      const imageUrl = urlCreator.createObjectURL(file)

      this.filePreview = imageUrl
      this.file = file
    },

    clearFile() {
      this.$refs.fileInput.value = null
      this.file = null
      this.filePreview = null
    },
  },

  created() {
    this.$nuxt.$on('editor-update', (html) => {
      this.description = html
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
