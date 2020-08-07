<template>
  <div id="profile">
    <div class="card">
      <div class="card-body">
        <h3>
          Your Events:
        </h3>

        <div v-if="!events" class="card mb-3">
          <div class="card-body">
            <h5 class="text-muted m-0">
              You haven't created any events yet ...
            </h5>
          </div>
        </div>

        <div v-else>
          <div
            v-for="(event, index) in events"
            :key="event.id"
            class="row"
            :class="{
              'mb-2': index < events.length - 1,
              'mb-3': index === events.length - 1,
            }"
          >
            <div class="col">
              <event-card :event="event" />
            </div>
          </div>
        </div>

        <nuxt-link
          to="/newEvent"
          class="btn btn-success float-right d-none d-md-inline-block"
        >
          New Event <i class="fa fa-plus" aria-hidden="true"></i>
        </nuxt-link>

        <nuxt-link
          to="/newEvent"
          class="btn btn-block btn-success d-block d-md-none d-lg-none"
        >
          New Event <i class="fa fa-plus" aria-hidden="true"></i>
        </nuxt-link>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

import EventCard from '@/components/EventCard.vue'

export default {
  name: 'Profile',

  components: {
    EventCard,
  },

  computed: {
    ...mapGetters({
      events: 'events/events',
    }),
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
