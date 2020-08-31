<template>
  <nuxt-link
    :to="'/events/' + event.id"
    class="card text-light event-card"
    :class="{ 'bg-dark': !small, 'bg-like': small }"
  >
    <!-- Regular Event Card -->
    <div v-show="!small" class="card-body">
      <div class="row">
        <div
          class="col-auto border-right d-flex align-items-center justify-content-center"
        >
          <div class="px-0 px-sm-2">
            <div class="row">
              <div class="col">
                <p v-show="weekly" class="m-0 text-center">
                  {{ weekName(dayOfWeek, 1).toUpperCase() }}
                </p>
                <p v-show="!weekly" class="m-0 text-center">
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
        <div class="col">
          <h5 class="text-truncate">{{ event.data.title }}</h5>
          <h5>
            <span class="badge badge-pill badge-light">
              {{
                event.data.startTimeHour +
                ':' +
                doubleDigit(event.data.startTimeMinute)
              }}
              -
              {{
                event.data.endTimeHour +
                ':' +
                doubleDigit(event.data.endTimeMinute)
              }}
            </span>
          </h5>
        </div>
        <div class="col-auto d-none d-sm-block">
          <span
            class="badge badge-pill badge-like badge-danger animate__animated animate__bounceIn"
          >
            <i
              class="fa-heart mr-2"
              :class="{ fas: likeNum > 0, far: likeNum <= 0 }"
            ></i
            >{{ likeNum }}
          </span>
        </div>
      </div>

      <div class="row mt-3 d-block d-sm-none">
        <div class="col">
          <span class="badge w-100 badge-like badge-danger">
            <i
              class="fa-heart mr-2 animate__animated"
              :class="{
                fas: likeNum > 0,
                far: likeNum <= 0,
                animate__bounceIn: likeNum > 0,
              }"
            ></i
            >{{ likeNum }} <span v-show="likeNum === 1">person likes</span
            ><span v-show="likeNum != 1">people like</span> this
          </span>
        </div>
      </div>

      <small id="uploaded" class="m-3 text-muted d-none d-md-flex"
        >Uploaded: {{ uploadDate }}</small
      >
    </div>

    <!-- Small Event Card -->
    <div v-show="small" class="card-body p-2">
      <div class="row">
        <div class="col">
          <h5>
            <span class="badge badge-light"
              >{{ weekName(dayOfWeek, 1).toUpperCase() }}
              {{ doubleDigit(event.data.day) }}</span
            >
          </h5>
        </div>
        <div class="col-auto">
          <p class="text-light mb-0 animate__animated animate__bounceIn">
            <i
              class="fa-heart mr-2"
              :class="{ fas: likeNum > 0, far: likeNum <= 0 }"
            ></i
            >{{ likeNum }}
          </p>
        </div>
      </div>

      <p class="text-truncate text-light mb-0">{{ event.data.title }}</p>
    </div>
  </nuxt-link>
</template>

<script>
export default {
  name: 'EventCard',

  props: ['event', 'weekly', 'small'],

  computed: {
    uploadDate() {
      const D = new Date(this.event.data.uploaded)
      return D.toDateString()
    },
    likeNum() {
      if (this.event) {
        if (this.event.data.likes) return this.event.data.likes.length
        else return 0
      } else {
        return 0
      }
    },
    dayOfWeek() {
      if (this.event) {
        const D = new Date(
          this.event.data.year,
          this.event.data.month,
          this.event.data.day
        )

        return D.getDay()
      } else {
        return 0
      }
    },
  },

  methods: {
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
    weekName(num, len) {
      const wL = [
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
      ]
      const wS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
      if (len === 0) return wL[num]
      else if (len === 1) return wS[num]
      else return wL[num]
    },
  },
}
</script>

<style scoped>
.event-card {
  text-decoration: none;
}

.card-body {
  position: relative;
}

.bg-like {
  background-color: var(--brand-primary) !important;
}

a.bg-like:hover {
  background-color: var(--brand-primary-hover) !important;
}

.badge-like {
  font-size: 1rem;
}

#uploaded {
  position: absolute;
  bottom: 0;
  right: 0;
}
</style>
