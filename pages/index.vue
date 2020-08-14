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

      <div class="row mb-4" v-if="user">
        <div class="col">
          <profile-card class="animate__animated animate__fadeIn" />
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
          <a
            class="btn btn-danger btn-block disabled"
            target="_blank"
            href="https://www.instagram.com/sparkwestnetwork/"
          >
            <i class="fa fa-instagram" aria-hidden="true"></i>
          </a>
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

        <a
          class="btn btn-danger btn-lg disabled"
          target="_blank"
          href="https://www.instagram.com/sparkwestnetwork/"
        >
          <i class="fa fa-instagram" aria-hidden="true"></i>
        </a>
      </div>
    </div>

    <div class="row">
      <div class="col-12 col-lg-4 mb-3 mb-lg-0 d-none">
        <div class="card mb-3">
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

        <div class="card">
          <div class="card-body">
            <h3>
              Featured Events
              <i
                class="fas fa-bullhorn text-success float-right"
                aria-hidden="true"
              ></i>
            </h3>

            <hr />

            <p class="text-muted mb-0">Nothing new at the moment</p>
          </div>
        </div>
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

import ProfileCard from '@/components/ProfileCard.vue'
import WeekList from '@/components/WeekList.vue'

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

  computed: {
    ...mapGetters({
      user: 'user/user',
    }),
  },

  components: {
    ProfileCard,
    WeekList,
  },
}
</script>

<style scoped>
#logo-banner {
  background: #fe3d61;
  background: linear-gradient(
    135deg,
    rgba(254, 61, 97, 1) 0%,
    rgba(254, 61, 97, 1) 60%,
    rgba(252, 210, 60, 1) 100%
  );
  background-size: 200% auto;
  background-position: 0% 0%;
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
