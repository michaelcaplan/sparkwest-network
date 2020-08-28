<template>
  <div id="profile">
    <div class="card">
      <div class="card-body">
        <h3>
          Your Events:
        </h3>

        <div v-if="loading" class="row mb-3">
          <div class="col">
            <event-card-placeholder class="mb-2" />
            <event-card-placeholder class="mb-2" />
            <event-card-placeholder class="mb-3" />
          </div>
        </div>

        <div v-if="events.length == 0 && !loading" class="card mb-3">
          <div class="card-body">
            <h5 class="text-muted m-0">
              You haven't created any events yet ...
            </h5>
          </div>
        </div>

        <div v-if="events && !loading">
          <div
            v-for="(event, index) in pages[this.pageNum]"
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

        <div class="row">
          <div class="col">
            <nav aria-label="Page navigation">
              <ul class="pagination float-right">
                <li class="page-item" :class="{ disabled: pageNum <= 0 }">
                  <a
                    class="page-link"
                    @click.prevent="prevPage"
                    href="#"
                    aria-label="Previous"
                  >
                    <i class="fa fa-chevron-left" aria-hidden="true"></i>
                  </a>
                </li>

                <li
                  v-for="(page, index) in pages"
                  :key="index"
                  class="page-item"
                  :class="{ active: index == pageNum }"
                >
                  <a
                    class="page-link"
                    @click.prevent="pageNum = index"
                    href="#"
                    >{{ index + 1 }}</a
                  >
                </li>

                <li
                  class="page-item"
                  :class="{ disabled: pageNum >= pages.length - 1 }"
                >
                  <a
                    class="page-link"
                    @click.prevent="nextPage"
                    href="#"
                    aria-label="Next"
                  >
                    <i class="fa fa-chevron-right" aria-hidden="true"></i>
                  </a>
                </li>
              </ul>
            </nav>
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
import EventCardPlaceholder from '@/components/EventCardPlaceholder.vue'

export default {
  name: 'Events',

  components: {
    EventCard,
    EventCardPlaceholder,
  },

  data() {
    return {
      loading: true,
      pageNum: 0,
    }
  },

  computed: {
    ...mapGetters({
      events: 'events/userEvents',
      user: 'user/user',
    }),

    pages() {
      if (this.events.length > 3) {
        const pages = []
        const pagesNum = Math.ceil(this.events.length / 3)

        for (let i = 0; i < pagesNum; i++) {
          pages.push(this.events.slice(i * 3, (i + 1) * 3))
        }

        return pages
      } else {
        return [this.events]
      }
    },
  },

  methods: {
    async getUserEvents() {
      try {
        this.loading = true
        await this.$store.dispatch(
          'events/getUserEvents',
          this.user.uid || this.user.user_id
        )
        this.loading = false
      } catch (e) {
        this.loading = false
        console.error(e)
      }
    },

    prevPage() {
      if (this.pageNum > 0) this.pageNum -= 1
    },

    nextPage() {
      if (this.pageNum < this.pages.length - 1) this.pageNum += 1
    },
  },

  beforeMount() {
    this.getUserEvents()
  },
}
</script>