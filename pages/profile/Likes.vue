<template>
  <div id="likes">
    <div class="card">
      <div class="card-body">
        <h3>
          Your Liked Events:
        </h3>

        <div v-show="loading" class="row mb-3">
          <div class="col">
            <event-card-placeholder class="mb-2" />
            <event-card-placeholder class="mb-2" />
            <event-card-placeholder class="mb-3" />
          </div>
        </div>

        <div v-show="events.length == 0 && !loading" class="card mb-3">
          <div class="card-body">
            <h5 class="text-muted m-0">
              You haven't liked any events yet ...
            </h5>
          </div>
        </div>

        <div v-show="events && !loading">
          <div v-for="(page, pageIndex) in pages" :key="pageIndex" class="page">
            <div
              v-for="(event, index) in page"
              v-show="pageIndex === pageNum"
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
        </div>

        <div class="row">
          <div class="col">
            <nav aria-label="Page navigation">
              <ul class="pagination mb-0 float-right">
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
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

import EventCard from '@/components/EventCard.vue'
import EventCardPlaceholder from '@/components/EventCardPlaceholder.vue'

export default {
  name: 'Likes',

  components: {
    EventCard,
    EventCardPlaceholder,
  },

  async asyncData({ store, res, $fireAuth }) {
    try {
      // Get user
      let user
      if (process.server) {
        if (res && res.locals && res.locals.user) user = res.locals.user
      } else user = $fireAuth.currentUser

      if (!user) user = store.state.user.user

      if (store.state.events.likedEvents.length === 0 && user) {
        await store.dispatch('events/getLikedEvents', { uid: user.uid })
      }
    } catch (e) {
      console.error(e)
    }
  },

  data() {
    return {
      loading: true,
      pageNum: 0,
    }
  },

  computed: {
    ...mapGetters({
      events: 'events/likedEvents',
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
    prevPage() {
      if (this.pageNum > 0) this.pageNum -= 1
    },

    nextPage() {
      if (this.pageNum < this.pages.length - 1) this.pageNum += 1
    },
  },

  mounted() {
    this.loading = false
  },
}
</script>
