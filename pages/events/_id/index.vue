<template>
  <div class="container py-3">
    <div v-if="event && !loading" class="row">
      <div v-if="event" class="col-12 col-lg mb-3 mb-lg-0">
        <img :src="event.image" class="img-fluid rounded mb-3" alt="" />

        <div class="card d-none d-lg-block">
          <div class="card-header">
            <h5 class="mb-0">
              Event Description:
              <i class="fas fa-question-circle text-primary float-right"></i>
            </h5>
          </div>
          <div class="card-body">
            <div class="description" v-html="event.data.description"></div>
          </div>
        </div>
      </div>

      <div v-if="event" class="col-12 col-lg">
        <div v-if="event" class="card mb-3">
          <div class="card-body">
            <h3>{{ event.data.title }}</h3>

            <author-card :uid="event.data.authorID" class="mb-3" />

            <button
              v-if="user"
              class="btn btn-block btn-lg btn-like d-flex align-items-center justify-content-center"
              :class="{
                liked: liked,
                'btn-light': !liked,
                'btn-danger': liked,
              }"
              :disabled="liking || !user"
              @click.prevent="toggleLike"
            >
              <span v-if="!liked && !liking"
                ><i
                  class="far fa-lg fa-heart animate__animated animate__fadeIn"
                ></i
              ></span>
              <span v-if="liked && !liking"
                ><i
                  class="fas fa-lg fa-heart animate__animated animate__bounceIn"
                ></i>
              </span>
              <span
                v-if="liking"
                class="spinner-border spinner-border-sm"
                role="status"
                aria-hidden="true"
              ></span>

              <span
                class="badge badge-pill badge-num"
                :class="{ 'badge-light': liked, 'badge-dark': !liked }"
                >{{ likeNum }}</span
              >
            </button>

            <div class="card" v-else>
              <div class="card-body">
                <p class="text-center">
                  <span
                    class="badge badge-pill badge-like-inline mr-1 animate__animated animate__bounceIn"
                  >
                    <i
                      class="fa-heart mr-2"
                      :class="{ fas: likeNum > 0, far: likeNum <= 0 }"
                    ></i
                    >{{ likeNum }}
                  </span>
                  <span v-if="likeNum == 1">person has</span
                  ><span v-else>people have</span> liked this event
                </p>

                <nuxt-link to="/signUp" class="btn btn-block btn-primary"
                  >Sign Up to like this event</nuxt-link
                >
              </div>
            </div>
          </div>
        </div>

        <div class="card mb-3">
          <div class="card-header">
            <h5 class="mb-0">
              Time:
              <i
                class="fa fa-clock-o text-primary float-right"
                aria-hidden="true"
              ></i>
            </h5>
          </div>

          <div class="card-body">
            <div class="row">
              <div class="col-12 col-md-auto mb-3 mb-md-0">
                <div class="card bg-dark text-light">
                  <div class="card-body py-2">
                    <div class="row">
                      <div class="col">
                        <p class="m-0 text-center">
                          {{ monthName(event.data.month, 1).toUpperCase() }}
                        </p>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col">
                        <h3 class="m-0 text-center">
                          {{ doubleDigit(event.data.day) }}
                        </h3>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="col col-md-auto d-flex justify-content-center">
                <div>
                  <h5>
                    Starts:
                  </h5>
                  <h3>
                    <span class="badge badge-dark">{{
                      event.data.startTimeHour +
                      ':' +
                      doubleDigit(event.data.startTimeMinute)
                    }}</span>
                  </h3>
                </div>
              </div>

              <div class="col col-md-auto d-flex justify-content-center">
                <div>
                  <h5>
                    Ends:
                  </h5>
                  <h3>
                    <span class="badge badge-dark">{{
                      event.data.endTimeHour +
                      ':' +
                      doubleDigit(event.data.endTimeMinute)
                    }}</span>
                  </h3>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="card mb-3 mb-lg-0">
          <div class="card-header">
            <h5 class="mb-0">
              Location:
              <i class="fas fa-map-marker-alt text-primary float-right"></i>
            </h5>
          </div>
          <div class="card-body">
            <p class="mb-0">
              {{ event.data.location }}
            </p>
          </div>
        </div>

        <div class="card d-block d-lg-none">
          <div class="card-header">
            <h5 class="mb-0">
              Event Description:
            </h5>
          </div>
          <div class="card-body">
            <div class="description" v-html="event.data.description"></div>
          </div>
        </div>
      </div>
    </div>

    <div v-if="event && user">
      <div v-if="event.data.authorID === (user.uid || user.user_id)">
        <hr />
        <div class="row d-flex justify-content-end">
          <div class="col-auto">
            <nuxt-link
              :to="'/edit/' + (event.id || id)"
              class="btn btn-lg btn-info"
            >
              Edit
            </nuxt-link>
          </div>
        </div>
      </div>
    </div>

    <!-- Placeholder markup -->
    <div v-if="loading" class="row">
      <div class="col-12 col-lg mb-3 mb-lg-0">
        <div id="image-placeholder" class="gradient rounded mb-3"></div>

        <div class="card d-none d-lg-block">
          <div class="card-header">
            <div class="loading-lg gradient w-50 rounded"></div>
          </div>
          <div class="card-body">
            <div class="loading gradient w-75 rounded mb-2"></div>
            <div class="loading gradient w-75 rounded mb-2"></div>
            <div class="loading gradient w-50 rounded"></div>
          </div>
        </div>
      </div>

      <div class="col-12 col-lg">
        <div class="card mb-3">
          <div class="card-body">
            <div class="loading-lg gradient w-50 rounded mb-2"></div>

            <div class="card bg-dark mb-2">
              <div class="card-body">
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
            </div>

            <div class="loading-btn gradient w-100 rounded"></div>
          </div>
        </div>

        <div class="card mb-3">
          <div class="card-header">
            <div class="loading-lg gradient w-50 rounded"></div>
          </div>

          <div class="card-body">
            <div class="row">
              <div class="col-12 col-md-auto mb-3 mb-md-0">
                <div class="avatar-placeholder gradient rounded"></div>
              </div>

              <div class="col-4">
                <div class="loading-lg gradient w-100 rounded mb-2"></div>

                <div class="loading-lg gradient w-100 rounded"></div>
              </div>

              <div class="col-4">
                <div class="loading-lg gradient w-100 rounded mb-2"></div>

                <div class="loading-lg gradient w-100 rounded"></div>
              </div>
            </div>
          </div>
        </div>

        <div class="card mb-3 mb-lg-0">
          <div class="card-header">
            <div class="loading-lg gradient w-50 rounded"></div>
          </div>

          <div class="card-body">
            <div class="loading gradient rounded w-75"></div>
          </div>
        </div>

        <div class="card d-block d-lg-none">
          <div class="card-header">
            <div class="loading-lg gradient w-50 rounded"></div>
          </div>
          <div class="card-body">
            <div class="loading gradient w-75 rounded mb-2"></div>
            <div class="loading gradient w-75 rounded mb-2"></div>
            <div class="loading gradient w-50 rounded"></div>
          </div>
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
</template>

<script>
import { mapGetters } from 'vuex'

import AuthorCard from '@/components/AuthorCard.vue'

export default {
  name: 'event',

  head() {
    let title = 'Event'
    if (this.event) title = this.event.data.title

    return {
      title,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: title + ' on Spark West Network',
        },
      ],
    }
  },

  components: {
    AuthorCard,
  },

  computed: {
    ...mapGetters({
      user: 'user/user',
    }),
    id() {
      return this.$route.params.id
    },
    likeNum() {
      if (this.event) {
        if (this.event.data.likes) return this.event.data.likes.length
        else return 0
      } else {
        return 0
      }
    },
  },

  data() {
    return {
      event: null,
      loading: true,
      liked: false,
      liking: false,
    }
  },

  watch: {
    user() {
      this.checkLike()
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

          this.checkLike()
        }

        this.loading = false
      } catch (e) {
        console.error(e)
        this.loading = false
      }
    },

    checkLike() {
      if (this.user && this.event) {
        this.liked = this.event.data.likes.includes(
          this.user.uid || this.user.user_id
        )
      } else {
        this.liked = false
      }
    },

    doubleDigit(num) {
      if (num < 10) return '0' + num
      else return num
    },
    monthName(num, len) {
      const mL = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
      ]
      const mS = [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'June',
        'July',
        'Aug',
        'Sept',
        'Oct',
        'Nov',
        'Dec',
      ]
      if (len === 0) return mL[num]
      else if (len === 1) return mS[num]
      else return mL[num]
    },

    async toggleLike() {
      if (!this.liking && this.user) {
        if (!this.liked) {
          try {
            this.liking = true
            const likeEvent = this.$fireFunc.httpsCallable('likeEvent')
            const res = await likeEvent({
              uid: this.user.uid || this.user.user_id,
              docID: this.event.id,
            })
            if (res.data.success) {
              this.liked = true
              this.event.data.likes.push(this.user.uid || this.user.user_id)
            }
            this.liking = false
          } catch (e) {
            console.error(e)
            this.liking = false
          }
        } else {
          try {
            this.liking = true
            const unlikeEvent = this.$fireFunc.httpsCallable('unlikeEvent')
            const res = await unlikeEvent({
              uid: this.user.uid || this.user.user_id,
              docID: this.event.id,
            })
            if (res.data.success) {
              this.liked = false
              const index = this.event.data.likes.indexOf(
                this.user.uid || this.user.user_id
              )
              this.event.data.likes.splice(index, 1)
            }
            this.liking = false
          } catch (e) {
            console.error(e)
            this.liking = false
          }
        }
      }
    },
  },

  mounted() {
    this.$nextTick(async () => {
      this.$nuxt.$loading.start()
      await this.getEvent()
      this.$nuxt.$loading.finish()
    })
  },
}
</script>

<style scoped>
.badge-num {
  font-size: 0.8rem;
  margin: 0.5rem;
  position: absolute;
  top: 0;
  right: 0;
}

#image-placeholder {
  width: 100%;
  height: 0;
  padding-top: 50%;
}

.desc-placeholder {
  width: 100%;
  height: 3rem;
}

.avatar-placeholder {
  width: 4rem;
  height: 4rem;
}
</style>
