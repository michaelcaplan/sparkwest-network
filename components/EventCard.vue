<template>
  <nuxt-link
    :to="'/events/' + event.id"
    class="card bg-dark text-light event-card"
  >
    <div class="card-body">
      <div class="row">
        <div
          class="col-auto border-right d-flex align-items-center justify-content-center"
        >
          <div class="px-2">
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
        <div class="col-auto">
          <h5>{{ event.data.title }}</h5>
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
      </div>

      <small id="uploaded" class="m-3 text-muted"
        >Uploaded: {{ uploadDate }}</small
      >
    </div>
  </nuxt-link>
</template>

<script>
export default {
  name: 'EventCard',

  props: ['event'],

  computed: {
    uploadDate() {
      const D = new Date(this.event.data.uploaded)
      return D.toDateString()
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

#uploaded {
  position: absolute;
  bottom: 0;
  right: 0;
}
</style>
