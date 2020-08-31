<template>
  <div class="container py-3">
    <div v-show="event && !loading">
      <div class="row mb-3">
        <div class="col">
          <div class="card card-body">
            <div class="row">
              <div class="col">
                <h1 class="d-none d-md-block">{{ event.data.title }}</h1>
                <h3 class="d-block d-md-none">{{ event.data.title }}</h3>
              </div>
              <div class="col-auto pl-0">
                <h5>
                  <i
                    class="fa fa-info-circle text-primary"
                    aria-hidden="true"
                  ></i>
                </h5>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div v-if="event" class="col-12 col-lg mb-3 mb-lg-0">
          <img
            v-if="event.image"
            :src="event.image"
            class="img-fluid rounded mb-3"
            alt=""
          />

          <div v-else class="image-placeholder grad-scroll rounded mb-3">
            <div
              class="image-content p-3 d-flex align-items-center justify-content-center"
            >
              <img src="/logoLG.svg" class="img-fluid" alt="" />
            </div>
          </div>

          <div class="card">
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
            <div class="card-header">
              <h5 class="mb-0">
                Likes:
                <i
                  class="fas fa-heart text-primary float-right"
                  aria-hidden="true"
                ></i>
              </h5>
            </div>
            <div class="card-body">
              <div v-show="user">
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

                <button
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
                </button>
              </div>

              <div class="card" v-show="!user">
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

          <div class="card mb-3">
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

          <div class="card">
            <div class="card-header">
              <h5 class="mb-0">
                Author:
                <i class="fas fa-user-circle text-primary float-right"></i>
              </h5>
            </div>
            <div class="card-body">
              <author-card :uid="event.data.authorID" />

              <div v-if="event && user">
                <div v-if="event.data.authorID === (user.uid || user.user_id)">
                  <hr />
                  <div class="row">
                    <div class="col">
                      <nuxt-link
                        :to="'/edit/' + (event.id || id)"
                        class="btn btn-lg btn-block btn-info"
                      >
                        Edit Event
                      </nuxt-link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Placeholder markup -->
    <div v-show="loading" class="row">
      <div class="col-12 mb-3">
        <div class="card card-body">
          <div class="loading-btn gradient w-50 rounded"></div>
        </div>
      </div>

      <div class="col-12 col-lg mb-3 mb-lg-0">
        <div class="image-placeholder gradient rounded mb-3"></div>

        <div class="card">
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
          <div class="card-header">
            <div class="loading-lg gradient w-50 rounded"></div>
          </div>

          <div class="card-body">
            <div class="loading gradient w-100 rounded mb-2"></div>

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

        <div class="card mb-3">
          <div class="card-header">
            <div class="loading-lg gradient w-50 rounded"></div>
          </div>

          <div class="card-body">
            <div class="loading gradient rounded w-75"></div>
          </div>
        </div>

        <div class="card">
          <div class="card-header">
            <div class="loading-lg gradient w-50 rounded"></div>
          </div>
          <div class="card-body">
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

  async asyncData({
    params,
    req,
    res,
    redirect,
    error,
    $fireStore,
    $fireStorage,
  }) {
    try {
      // Get event document
      const docID = params.id
      const docRef = $fireStore.collection('events').doc(docID)
      const doc = await docRef.get()

      let event = null

      if (doc.exists) {
        event = {
          id: docID,
          data: doc.data(),
          image: false,
        }
      } else {
        redirect('/eventNotFound')
      }

      return { event }
    } catch (e) {
      console.error(e)
    }
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
    async getEventImg() {
      try {
        // If document has a refrence to an image, fetch download URL
        if (this.event && this.event.data.imageRef) {
          const imageRef = this.$fireStorage
            .ref()
            .child(this.event.data.imageRef)
          const URL = await imageRef.getDownloadURL()

          this.event.image = URL
        }
      } catch (e) {
        console.error(e)
        this.event.image = false
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

  async mounted() {
    try {
      if (this.event) {
        await this.getEventImg()
      }

      this.checkLike()

      this.loading = false
    } catch (e) {
      console.error(e)
      this.loading = false
    }
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

.badge-like {
  font-size: 1rem;
}

.image-placeholder {
  width: 100%;
  height: 0;
  padding-top: 50%;
  position: relative;
}

.image-content {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  right: 0;
}

.desc-placeholder {
  width: 100%;
  height: 3rem;
}

.avatar-placeholder {
  width: 4rem;
  height: 4rem;
}

.grad-scroll {
  background: var(--brand-primary);
  background: linear-gradient(
    45deg,
    var(--brand-primary),
    var(--brand-secondary)
  );
  background-size: 400% 400%;
  -webkit-animation: gradscroll 30s ease infinite;
  -moz-animation: gradscroll 30s ease infinite;
  animation: gradscroll 30s ease infinite;
}

@-webkit-keyframes gradscroll {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}
@-moz-keyframes gradscroll {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}
@keyframes gradscroll {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}
</style>
