<template>
  <nuxt-link :to="'/user/' + uid" class="author card bg-dark text-light">
    <div v-if="profile" class="card-body">
      <div class="row">
        <div class="col-auto border-right">
          <div
            v-if="profile.avatar"
            class="avatar rounded"
            :style="'background-image: url(\'' + profile.avatar + '\')'"
          ></div>
          <div v-else class="avatar rounded bg-secondary text-light">
            <h4 v-if="profile.data.name" class="m-0">
              {{ profile.name.substring(0, 1) }}
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
</template>

<script>
export default {
  name: 'authorCard',

  props: ['uid'],

  data() {
    return {
      profile: null,
    }
  },

  methods: {
    async getProfile() {
      try {
        const docRef = this.$fireStore.collection('profiles').doc(this.uid)
        const doc = await docRef.get()

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

.avatar {
  width: 4rem;
  height: 4rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
}

.avatar-placeholder {
  width: 4rem;
  height: 4rem;
}

.loading {
  height: 1rem;
}

.gradient {
  animation-duration: 1.8s;
  animation-fill-mode: forwards;
  animation-iteration-count: infinite;
  animation-name: placeHolderShimmer;
  animation-timing-function: linear;
  background: #6c757d;
  background: linear-gradient(to right, #6c757d 8%, #7e8992 38%, #6c757d 54%);
  background-size: 1000px 640px;
  position: relative;
}

@keyframes placeHolderShimmer {
  0% {
    background-position: -468px 0;
  }
  100% {
    background-position: 468px 0;
  }
}
</style>
