<template>
  <div class="container py-3">
    <div v-if="event" class="row">
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
              class="btn btn-block btn-lg btn-like d-flex align-items-center justify-content-center"
              :class="{
                liked: liked,
                'btn-light': !liked,
                'btn-danger': liked,
              }"
              @click.prevent="liked = !liked"
            >
              <span v-if="!liked"
                ><i
                  class="far fa-lg fa-heart animate__animated animate__fadeIn"
                ></i
              ></span>
              <span v-else
                ><i
                  class="fas fa-lg fa-heart animate__animated animate__bounceIn"
                ></i>
              </span>

              <span
                class="badge badge-pill badge-like"
                :class="{ 'badge-light': liked, 'badge-dark': !liked }"
                >{{ Math.round(Math.random() * 10) }}</span
              >
            </button>
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

    <!-- Placeholder markup -->
    <div v-else class="row">
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
  </div>
</template>

<script>
import AuthorCard from '@/components/AuthorCard.vue'

export default {
  name: 'event',

  components: {
    AuthorCard,
  },

  computed: {
    id() {
      return this.$route.params.id
    },
  },

  data() {
    return {
      event: null,
      liked: false,
    }
  },

  methods: {
    async getEvent() {
      try {
        const docRef = this.$fireStore.collection('events').doc(this.id)
        const doc = await docRef.get()

        const imageRef = this.$fireStorage.ref().child(doc.data().imageRef)
        const URL = await imageRef.getDownloadURL()

        this.event = {
          id: doc.id,
          data: doc.data(),
          image: URL,
        }
      } catch (e) {
        console.error(e)
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
  },

  mounted() {
    this.getEvent()
  },
}
</script>

<style scoped>
.btn-like {
  background: #f8f9fa;
  border-color: #f8f9fa;
  color: #212529;
  position: relative;
}

.btn-like.liked {
  background: #fe3d61;
  border-color: #fe3d61;
  color: #f8f9fa;
}

.btn-like:hover {
  background: #e2e6ea;
  border-color: #e2e6ea;
  box-shadow: 0 0 0 0.2rem rgba(216, 217, 219, 0.5);
}

.btn-like.liked:hover {
  background: rgb(212, 50, 104);
  border-color: rgb(212, 50, 104);
  box-shadow: 0 0 0 0.2rem rgba(225, 83, 97, 0.5);
}

.badge-like {
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

.loading {
  height: 1rem;
}

.loading-lg {
  height: 1.75rem;
}

.loading-btn {
  height: 2rem;
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
