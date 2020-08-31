<template>
  <div>
    <div v-show="showFeatured" class="card">
      <div class="card-body">
        <h3>
          Featured Events
          <i
            class="fas fa-bell text-success float-right"
            aria-hidden="true"
          ></i>
        </h3>

        <hr />

        <p>Top events for {{ currentMonth }}</p>

        <div v-show="loading">
          <event-card-placeholder :small="true" class="mb-2" />
          <event-card-placeholder :small="true" class="mb-2" />
          <event-card-placeholder :small="true" class="mb-2" />
        </div>

        <div v-show="!loading && events">
          <div v-for="event in events" :key="event.id" class="row mb-2">
            <div class="col">
              <event-card :event="event" :small="true" />
            </div>
          </div>
        </div>

        <p v-show="!loading && !events" class="text-muted">
          Nothing new at the moment
        </p>

        <button
          class="btn btn-sm btn-hide float-right"
          @click="$store.commit('SET_SHOW_FEATURED', false)"
        >
          <i class="fas fa-eye-slash"></i>
        </button>
      </div>
    </div>

    <button
      v-if="!showFeatured"
      class="featured-btn btn btn-success btn-lg btn-block p-3 d-flex align-items-center justify-content-center"
      @click="$store.commit('SET_SHOW_FEATURED', true)"
    >
      <i class="fas h3 mb-0 fa-bell" aria-hidden="true"></i>
      <span
        v-show="events && events.length"
        class="badge badge-like badge-pill animate__animated animate__bounceIn m-2 shadow-sm"
        >{{ events.length }}</span
      >
    </button>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

import EventCard from '@/components/EventCard.vue'
import EventCardPlaceholder from '@/components/EventCardPlaceholder.vue'

export default {
  name: 'FeaturedEvents',

  components: {
    EventCard,
    EventCardPlaceholder,
  },

  data() {
    return {
      loading: true,
    }
  },

  computed: {
    ...mapGetters({
      showFeatured: 'showFeatured',
      events: 'events/topEvents',
    }),
    currentMonth() {
      const now = new Date()
      const months = [
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
      return months[now.getMonth()] + ' ' + now.getFullYear()
    },
  },

  mounted() {
    this.loading = false
  },
}
</script>

<style scoped>
.btn-hide {
  color: var(--text) !important;
}

.featured-btn {
  position: relative;
}

.badge-like {
  position: absolute;
  top: 0;
  right: 0;
  font-size: 0.8rem;
}
</style>
