<template>
  <div id="profile">
    <div class="container py-3">
      <div v-if="profile && !loading" class="row">
        <div class="col-12 col-lg-auto mb-3 mb-lg-0">
          <div class="card">
            <div class="card-body">
              <div class="row d-flex justify-content-center">
                <div class="col-auto">
                  <div
                    v-if="profile.avatar"
                    class="avatar rounded border"
                    :style="'background-image: url(\'' + profile.avatar + '\')'"
                  ></div>
                  <div v-else class="avatar rounded bg-secondary text-light">
                    <h1 v-if="profile.data.name" class="m-0">
                      {{ profile.data.name.substring(0, 1) }}
                    </h1>
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
              </div>
              <div class="row d-flex justify-content-center">
                <div class="col-auto">
                  <h5 class="text-center mt-3 mb-0">{{ profile.data.name }}</h5>

                  <p v-if="profile.data.about" class="mt-3 mb-0 text-wrap">
                    {{ profile.data.about }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="col-12 col-lg">
          <div class="card">
            <div class="card-body">
              <h3 class="mb-0">{{ profile.data.name }}</h3>

              <hr />

              <div class="row">
                <div class="col border-right d-none d-sm-block">
                  <h5>About:</h5>
                  <p v-if="profile.data.about">{{ profile.data.about }}</p>
                </div>
                <div class="col-12 d-block d-sm-none">
                  <h5>About:</h5>
                  <p v-if="profile.data.about" class="mb-0">
                    {{ profile.data.about }}
                  </p>

                  <hr />
                </div>

                <div class="col-12 col-sm">
                  <h5>
                    Activity:
                  </h5>

                  <h5>
                    <span class="badge badge-primary mb-2"
                      ><i class="fas fa-calendar"></i> Events:
                      {{ eventsNum }}</span
                    >
                    <span class="badge badge-info mb-2">
                      <i class="fas fa-calendar-plus"></i>
                      Event Likes: {{ eventLikesNum }}</span
                    >
                    <span class="badge badge-like mb-2"
                      ><i class="fas fa-heart" aria-hidden="true"></i> Likes:
                      {{ likesNum }}</span
                    >
                  </h5>
                </div>
              </div>

              <hr />

              <div class="row mb-3">
                <div class="col">
                  <ul class="nav nav-pills nav-fill">
                    <li class="nav-item mb-2">
                      <a
                        id="profile-nav"
                        :class="{ 'nav-link': true, active: tabNum == 0 }"
                        @click.prevent="tabNum = 0"
                        href="#"
                      >
                        <i class="fa fa-user-circle"></i>
                        Profile
                      </a>
                    </li>

                    <li class="nav-item mb-2">
                      <a
                        id="likes-nav"
                        :class="{ 'nav-link': true, active: tabNum == 1 }"
                        @click.prevent="tabNum = 1"
                        href="#"
                      >
                        <i class="fa fa-heart"></i>
                        Likes
                      </a>
                    </li>
                  </ul>
                </div>
              </div>

              <div class="row">
                <div class="col">
                  <div class="tabs">
                    <div v-show="tabNum === 0" id="profile">
                      <profile-event-list
                        :UID="UID"
                        :name="profile.data.name"
                      />
                    </div>

                    <div v-show="tabNum === 1" id="likes">
                      <profile-likes-list
                        :UID="UID"
                        :name="profile.data.name"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div v-if="loading">
        <div class="row">
          <div class="col-12 col-lg-auto mb-3 mb-lg-0">
            <div class="card">
              <div class="card-body">
                <div class="row d-flex justify-content-center mb-3">
                  <div class="col-auto">
                    <div class="avatar-placeholder rounded gradient"></div>
                  </div>
                </div>

                <div class="row mb-2 d-flex justify-content-center">
                  <div class="col-6">
                    <div class="loading gradient rounded w-100"></div>
                  </div>
                </div>

                <div class="row">
                  <div class="col">
                    <div class="loading gradient rounded w-100"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="col-12 col-lg">
            <div class="card">
              <div class="card-body">
                <div class="loading-lg gradient rounded w-25"></div>

                <hr />

                <div class="row mb-3">
                  <div class="col border-right d-none d-sm-block">
                    <div class="loading gradient rounded w-50 mb-2"></div>

                    <div class="loading gradient rounded w-75"></div>
                  </div>
                  <div class="col-12 d-block d-sm-none">
                    <div class="loading gradient rounded w-50 mb-2"></div>

                    <div class="loading gradient rounded w-75"></div>
                    <hr />
                  </div>

                  <div class="col-12 col-sm">
                    <div class="loading gradient rounded w-50 mb-2"></div>

                    <div class="loading gradient rounded w-100"></div>
                  </div>
                </div>

                <div class="row mb-3">
                  <div class="col">
                    <div class="loading-btn gradient rounded w-100"></div>
                  </div>
                  <div class="col pl-0">
                    <div class="loading-btn gradient rounded w-100"></div>
                  </div>
                </div>

                <div class="row">
                  <div class="col">
                    <event-card-placeholder class="mb-2" />
                    <event-card-placeholder class="mb-2" />
                    <event-card-placeholder class="mb-2" />
                  </div>
                </div>

                <div class="row d-flex justify-content-end">
                  <div class="col-3">
                    <div class="loading-btn gradient rounded w-100"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        v-if="!loading && !profile"
        class="row d-flex justify-content-center"
      >
        <div class="col col-lg-6">
          <h1 class="display-1 text-center">404</h1>
          <h3 class="text-center">Profile not found</h3>

          <hr />

          <p class="text-cent">
            It seems the profile you are looking for does not exist. This could
            be because the profile was deleted or there is a typo in your search
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

import ProfileEventList from '@/components/ProfileEventList.vue'
import ProfileLikesList from '@/components/ProfileLikesList.vue'

import EventCardPlaceholder from '@/components/EventCardPlaceholder'

export default {
  name: 'profile',

  middleware: 'profile',

  head() {
    let name = 'Profile'
    if (this.profile) name = this.profile.data.name

    return {
      title: name,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: name + ' on Spark West Network',
        },
      ],
    }
  },

  components: {
    ProfileEventList,
    ProfileLikesList,
    EventCardPlaceholder,
  },

  computed: {
    ...mapGetters({
      userEvents: 'events/userEvents',
      likedEvents: 'events/likedEvents',
    }),

    UID() {
      return this.$route.params.uid
    },

    eventsNum() {
      if (this.userEvents) {
        return this.userEvents.length
      } else {
        return 0
      }
    },

    eventLikesNum() {
      if (this.userEvents) {
        let sum = 0
        for (let i = 0; i < this.userEvents.length; i++) {
          if (this.userEvents[i].data.likes)
            sum += this.userEvents[i].data.likes.length
        }
        return sum
      } else {
        return 0
      }
    },

    likesNum() {
      if (this.likedEvents) {
        return this.likedEvents.length
      } else {
        return 0
      }
    },
  },

  data() {
    return {
      profile: null,
      loading: true,
      tabNum: 0,
    }
  },

  methods: {
    async getProfile() {
      try {
        this.loading = true
        const docRef = this.$fireStore.collection('profiles').doc(this.UID)
        const doc = await docRef.get()

        if (doc.exists) {
          if (doc.data().avatar) {
            const imageRef = this.$fireStorage.ref().child(doc.data().avatar)
            const URL = await imageRef.getDownloadURL()

            this.profile = {
              uid: this.UID,
              data: doc.data(),
              avatar: URL,
            }
          } else {
            this.profile = {
              uid: this.UID,
              data: doc.data(),
              avatar: false,
            }
          }
        } else {
          this.loading = false
        }

        this.loading = false
      } catch (e) {
        console.error(e)
        this.loading = false
      }
    },
  },

  mounted() {
    this.getProfile()
  },
}
</script>

<style scoped>
.avatar-placeholder {
  width: 10rem;
  height: 10rem;
}
</style>
