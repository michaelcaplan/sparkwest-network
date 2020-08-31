<template>
  <div class="container py-3">
    <div class="jumbotron">
      <h1 class="mb-3">Welcome to:</h1>

      <div id="logo-banner" class="gradient-slide card border-0 mb-3">
        <div class="card-body">
          <img
            src="../assets/logo.svg"
            alt="logo"
            class="img-fluid d-inline-block d-md-none animate__animated animate__fadeInRight"
            height="42"
          />

          <img
            src="../assets/logoLG.svg"
            alt="logo"
            class="img-fluid d-none d-md-inline-block animate__animated animate__fadeInRight"
            height="42"
          />
        </div>
      </div>

      <div class="row d-flex d-md-none">
        <div class="col">
          <a
            class="btn btn-primary btn-block"
            target="_blank"
            href="https://www.facebook.com/sparkwestnetwork/"
          >
            <i class="fa fa-facebook-f" aria-hidden="true"></i>
          </a>
        </div>
        <div class="col p-0">
          <a
            class="btn btn-info btn-block"
            target="_blank"
            href="https://twitter.com/SparkWestNet"
          >
            <i class="fa fa-twitter" aria-hidden="true"></i>
          </a>
        </div>
        <div class="col">
          <nuxt-link to="/contact" class="btn btn-secondary btn-block">
            <i class="fas fa-envelope"></i>
          </nuxt-link>
        </div>
      </div>

      <div class="btn-group d-none d-md-inline-block">
        <a
          class="btn btn-primary btn-lg"
          target="_blank"
          href="https://www.facebook.com/sparkwestnetwork/"
        >
          <i class="fa fa-facebook-f" aria-hidden="true"></i>
        </a>

        <a
          class="btn btn-info btn-lg"
          target="_blank"
          href="https://twitter.com/SparkWestNet"
        >
          <i class="fa fa-twitter" aria-hidden="true"></i>
        </a>

        <nuxt-link to="/contact" class="btn btn-secondary btn-lg">
          <i class="fas fa-envelope"></i>
        </nuxt-link>
      </div>
    </div>

    <div class="row">
      <div
        class="col-12 mb-3 mb-lg-0"
        :class="{ 'col-lg-4': showFeatured, 'col-lg-auto': !showFeatured }"
      >
        <div class="card mb-3 d-none">
          <div class="card-body">
            <h3>
              News
              <i
                class="fas fa-rss text-info float-right"
                aria-hidden="true"
              ></i>
            </h3>

            <hr />

            <p class="text-muted mb-0">Nothing new at the moment</p>
          </div>
        </div>

        <!-- Featured events -->
        <featured-events />
      </div>

      <div class="col">
        <div class="card">
          <div class="card-body">
            <h1>
              Events
              <i
                class="fas fa-calendar-week text-primary float-right"
                aria-hidden="true"
              ></i>
            </h1>

            <hr />

            <week-list />
          </div>
        </div>
      </div>
    </div>

    <hr />

    <div class="card">
      <div class="card-body">
        <h3>What is SWN?</h3>

        <hr />

        <div class="row">
          <div class="col-12 col-lg-auto mb-3 mb-lg-0">
            <div class="card h-100 bg-dark border-0">
              <div
                class="card-body d-flex align-items-center justify-content-center"
              >
                <img
                  src="@/assets/logo.svg"
                  alt=""
                  class="img-fluid mr-0 mr-lg-3"
                />
              </div>
            </div>
          </div>
          <div class="col">
            <p>
              Spark West Network is an umbrella marketing platform that draws
              together, assists, and coordinates the various organizations,
              events, and people that define our region’s unique entrepreneurial
              opportunities. The Spark West website aims to act as a platform
              for hosting the unique events and opportunities that make up
              western Nova Scotia’s entrepreneurial ecosystem.
            </p>

            <nuxt-link to="/about" class="btn btn-lg btn-info float-right"
              >Learn More</nuxt-link
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

import WeekList from '@/components/WeekList.vue'
import FeaturedEvents from '@/components/FeaturedEvents.vue'

export default {
  name: 'Home',

  head() {
    return {
      title: 'Spark West Network',
      titleTemplate: false,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content:
            'Spark West Network is an umbrella marketing platform that draws together, assists, and coordinates the various organizations, events, and people that define our region’s unique entrepreneurial opportunities. ',
        },
      ],
    }
  },

  components: {
    WeekList,
    FeaturedEvents,
  },

  // Get month events on initial load
  async asyncData({ store, params }) {
    try {
      if (store.state.events.events.length === 0) {
        const date = new Date()
        await store.dispatch('events/getMonthEvents', {
          date: { month: date.getMonth(), year: date.getFullYear() },
        })

        store.dispatch('events/getTopEvents')
      }
    } catch (e) {
      console.error(e)
    }
  },

  computed: {
    ...mapGetters({
      user: 'user/user',
      showFeatured: 'showFeatured',
    }),
  },
}
</script>

<style scoped>
#logo-banner {
  background: #fe3d61 !important;
  background: linear-gradient(
    135deg,
    var(--brand-primary) 0%,
    var(--brand-primary) 60%,
    var(--brand-secondary) 100%
  ) !important;
  background-size: 200% auto;
  background-position: 0% 0%;
  overflow: hidden;
  animation: 1s 1s forwards ease gradient-slide;
}

@keyframes gradient-slide {
  from {
    background-position: 0% 0%;
  }
  to {
    background-position: 100% 0%;
  }
}
</style>
