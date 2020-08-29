<template>
  <div id="week-list">
    <div class="row mb-3 d-flex justify-content-center">
      <div class="col-auto">
        <div class="row">
          <div class="col-auto">
            <h3 class="mb-0">
              <span class="badge badge-dark d-none d-md-inline-block"
                >{{ monthName(this.date.month).toUpperCase() }}
                <span v-show="currentDate.year != date.year">{{
                  date.year
                }}</span></span
              >
              <span class="badge badge-dark d-inline-block d-md-none"
                >{{ monthName(this.date.month, 1).toUpperCase() }}
                <span v-show="currentDate.year != date.year">{{
                  date.year
                }}</span></span
              >
            </h3>
          </div>

          <transition name="fade">
            <div v-show="showReturn && !loading" class="col-auto pl-0">
              <button
                @click.prevent="returnToCurrent"
                class="btn btn-info h-100"
              >
                <i class="fas fa-calendar-day"></i>
              </button>
            </div>
          </transition>
        </div>
      </div>
    </div>

    <div class="row d-flex justify-content-center mb-3">
      <div class="col-auto">
        <div class="row">
          <div class="col-auto">
            <button
              @click.prevent="lastWeek"
              class="btn btn-light"
              :disabled="loading"
            >
              <i class="fa fa-chevron-left" aria-hidden="true"></i>
            </button>
          </div>
          <div class="col">
            <h3 class="mb-0 text-center">
              <span v-show="loading" class="text-muted">00 - 00</span
              ><span v-show="!loading">{{ displayWeek }}</span>
            </h3>
          </div>
          <div class="col-auto">
            <button
              @click.prevent="nextWeek"
              class="btn btn-light"
              :disabled="loading"
            >
              <i class="fa fa-chevron-right" aria-hidden="true"></i>
            </button>
          </div>
        </div>
      </div>
    </div>

    <div v-show="loading" class="row">
      <div class="col">
        <event-card-placeholder class="mb-2" />
        <event-card-placeholder class="mb-2" />
        <event-card-placeholder />
      </div>
    </div>

    <div v-show="events && !loading && month">
      <div
        class="week mb-3"
        v-show="weekIndex === date.week"
        v-for="(week, weekIndex) in month"
        :key="weekIndex"
      >
        <div v-if="week.length > 0">
          <div
            v-for="(event, eventIndex) in week"
            :key="event.id"
            class="row"
            :class="{
              'mb-2': eventIndex < week.length - 1,
              'mb-0': eventIndex === week.length - 1,
            }"
          >
            <div class="col">
              <event-card :event="event" :weekly="true" />
            </div>
          </div>
        </div>

        <div v-else class="row">
          <div class="col">
            <div class="card">
              <div class="card-body">
                <h5 class="text-muted text-center mb-0">
                  <i>There are no events for this week</i>
                </h5>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="row mt-3">
      <div class="col">
        <nuxt-link
          :to="path"
          class="btn btn-success float-right d-none d-md-inline-block"
        >
          New Event <i class="fa fa-plus" aria-hidden="true"></i>
        </nuxt-link>

        <nuxt-link
          :to="path"
          class="btn btn-block btn-success d-block d-md-none d-lg-none"
        >
          New Event <i class="fa fa-plus" aria-hidden="true"></i>
        </nuxt-link>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

import EventCard from '@/components/EventCard.vue'
import EventCardPlaceholder from '@/components/EventCardPlaceholder.vue'

export default {
  name: 'WeekList',

  components: {
    EventCard,
    EventCardPlaceholder,
  },

  data() {
    return {
      date: {
        week: 0,
        month: 7,
        year: 2020,
      },
      loading: true,
    }
  },

  computed: {
    ...mapGetters({
      events: 'events/events',
      user: 'user/user',
    }),

    // Returns current year month and day
    currentDate() {
      const D = new Date()
      const weekIndex = this.weekNums.nums.findIndex((week) => {
        return D.getDate() >= week.start && D.getDate() <= week.end
      })

      return {
        day: D.getDate(),
        week: weekIndex,
        month: D.getMonth(),
        year: D.getFullYear(),
      }
    },

    // Returns wether the return to current week button should be shown
    showReturn() {
      return (
        this.date.week !== this.currentDate.week ||
        this.date.month !== this.currentDate.month ||
        this.date.year !== this.currentDate.year
      )
    },

    // Returns number of weeks in selected month
    weekCount() {
      const firstOfMonth = new Date(this.date.year, this.date.month, 1)
      const lastOfMonth = new Date(this.date.year, this.date.month + 1, 0)

      const used = firstOfMonth.getDay() + lastOfMonth.getDate()

      return Math.ceil(used / 7)
    },

    // Returns array of the starting and ending days of each week
    weekNums() {
      const nums = []
      const lengthOfMonth = new Date(
        this.date.year,
        this.date.month + 1,
        0
      ).getDate()

      const startOfMonth = new Date(this.date.year, this.date.month, 1).getDay()
      const endOfMonth = new Date(
        this.date.year,
        this.date.month,
        lengthOfMonth
      ).getDay()

      for (let i = 0; i < this.weekCount; i++) {
        if (i === 0) {
          // First week of month
          nums.push({
            start: i * 7 + 1,
            end: (i + 1) * 7 - startOfMonth,
          })
        } else if (i === this.weekCount - 1) {
          // Last week of month
          nums.push({
            start: lengthOfMonth - endOfMonth,
            end: lengthOfMonth,
          })
        } else {
          // Intermediate weeks of month
          nums.push({
            start: nums[i - 1].end + 1,
            end: nums[i - 1].end + 7,
          })
        }
      }

      return {
        start: startOfMonth,
        end: endOfMonth,
        length: lengthOfMonth,
        nums,
      }
    },

    // Formats events into array of weeks of events
    month() {
      const month = []
      this.weekNums.nums.forEach((weekNum) => {
        const week = this.events.filter((event) => {
          return (
            event.data.day >= weekNum.start && event.data.day <= weekNum.end
          )
        })

        month.push(week)
      })

      return month
    },

    // Returns string to display current week start and end
    displayWeek() {
      const start = this.doubleDigit(this.weekNums.nums[this.date.week].start)
      const end = this.doubleDigit(this.weekNums.nums[this.date.week].end)

      return start + ' - ' + end
    },

    // Sets new event path
    path() {
      if (this.user) return '/newEvent'
      else return '/signUp'
    },
  },

  methods: {
    ...mapActions({
      getEvents: 'events/getMonthEvents',
    }),

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

    async returnToCurrent() {
      if (
        this.date.year !== this.currentDate.year ||
        this.date.month !== this.currentDate.month
      ) {
        try {
          this.loading = true
          await this.getEvents(this.currentDate)
          this.loading = false
        } catch (e) {
          console.error(e)
          this.loading = false
        }
      }

      this.date.year = this.currentDate.year
      this.date.month = this.currentDate.month
      this.date.week = this.currentDate.week
    },

    nextWeek() {
      if (!this.loading) {
        if (this.date.week < this.weekCount - 1) {
          this.date.week += 1
        } else {
          this.nextMonth()
          this.date.week = 0
        }
      }
    },
    lastWeek() {
      if (!this.loading) {
        if (this.date.week > 0) {
          this.date.week -= 1
        } else {
          const last = this.lastMonth()
          if (last) this.date.week = this.weekCount - 1
        }
      }
    },

    async nextMonth() {
      if (this.date.month < 11) {
        this.date.month += 1
      } else {
        this.nextYear()
        this.date.month = 0
      }

      // Get next months events
      try {
        this.loading = true
        await this.getEvents(this.date)
        this.loading = false
      } catch (e) {
        console.error(e)
        this.loading = false
      }
    },
    async lastMonth() {
      if (this.date.month > 0) {
        this.date.month -= 1

        // Get last months events
        try {
          this.loading = true
          await this.getEvents(this.date)
          this.loading = false
        } catch (e) {
          console.error(e)
          this.loading = false
        }

        return true
      } else {
        const last = this.lastYear()
        if (last) {
          this.date.month = 11

          // Get last months events
          try {
            this.loading = true
            await this.getEvents(this.date)
            this.loading = false
          } catch (e) {
            console.error(e)
            this.loading = false
          }

          return true
        } else {
          return false
        }
      }
    },

    nextYear() {
      this.date.year += 1
    },
    lastYear() {
      if (this.date.year > 2000) {
        this.date.year -= 1
        return true
      }
      return false
    },
  },

  beforeMount() {
    // Set current week number of the month
    const dayOfMonth = new Date().getDate()
    const weekIndex = this.weekNums.nums.findIndex((week) => {
      return dayOfMonth >= week.start && dayOfMonth <= week.end
    })
    this.date.week = weekIndex

    // Get months events
    // await this.getEvents(this.date)
    this.loading = false
  },
}
</script>
