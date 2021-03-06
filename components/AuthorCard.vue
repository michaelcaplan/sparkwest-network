<template>
  <div id="author-card">
    <nuxt-link
      v-if="!deleted"
      :to="'/profiles/' + uid"
      class="author card bg-dark text-light"
    >
      <div v-if="profile" class="card-body">
        <div class="row">
          <div class="col-auto border-right">
            <div
              v-if="profile.avatar"
              class="avatar-sm rounded"
              :style="'background-image: url(\'' + profile.avatar + '\')'"
            ></div>
            <div v-else class="avatar-sm rounded bg-secondary text-light">
              <h4 v-if="profile.data.name" class="m-0">
                {{ profile.data.name.substring(0, 1) }}
              </h4>
              <div
                v-else
                class="spinner-border"
                style="width: 3rem; height: 3rem;"
                role="status"
              >
                <span class="sr-only">Loading...</span>
              </div>
            </div>
          </div>
          <div class="col">
            <h5 v-if="profile.data.name">{{ profile.data.name }}</h5>
            <p class="m-0 text-truncate" v-if="profile.data.about">
              {{ profile.data.about }}
            </p>
          </div>
        </div>
      </div>

      <div v-else class="card-body">
        <div class="row">
          <div class="col-auto border-secondary border-right">
            <div class="avatar-placeholder gradient rounded"></div>
          </div>
          <div class="col">
            <div class="loading gradient rounded w-50 mb-2"></div>
            <div class="loading gradient rounded w-75"></div>
          </div>
        </div>
      </div>
    </nuxt-link>

    <div v-else class="card bg-dark text-light">
      <div class="card-body">
        <div class="row">
          <div class="col-auto border-secondary border-right">
            <div class="avatar-placeholder bg-secondary rounded"></div>
          </div>
          <div class="col">
            <h5 class="text-muted">[ Deleted ]</h5>
            <p class="m-0 text-truncate text-muted">
              This account has been deleted
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'authorCard',

  props: ['uid'],

  data() {
    return {
      profile: null,
      deleted: false,
    }
  },

  methods: {
    async getProfile() {
      try {
        const docRef = this.$fireStore.collection('profiles').doc(this.uid)
        const doc = await docRef.get()

        if (doc.exists) {
          if (doc.data().avatar) {
            const imageRef = this.$fireStorage.ref().child(doc.data().avatar)
            const URL = await imageRef.getDownloadURL()

            this.profile = {
              data: doc.data(),
              avatar: URL,
            }
          } else {
            this.profile = {
              data: doc.data(),
            }
          }
        } else {
          this.deleted = true
        }
      } catch (e) {
        console.error(e)
      }
    },
  },

  mounted() {
    this.getProfile()
  },
}
</script>

<style scoped>
.card {
  text-decoration: none;
}

.avatar-placeholder {
  width: 4rem;
  height: 4rem;
}
</style>
