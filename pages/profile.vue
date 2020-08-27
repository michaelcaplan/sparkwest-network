<template>
  <div id="profile">
    <div v-if="!profile">
      <div
        class="container py-3 d-flex justify-content-center align-items-center"
      >
        <div
          class="spinner-border text-primary"
          style="width: 4rem; height: 4rem;"
          role="status"
        >
          <span class="sr-only">Loading...</span>
        </div>
      </div>
    </div>
    <div v-if="profile" class="container py-3">
      <h1>Your Profile</h1>

      <hr />

      <div class="row d-flex justify-content-center">
        <div class="col-auto">
          <div
            v-if="profile.avatarUrl"
            class="avatar rounded border"
            :style="'background-image: url(\'' + profile.avatarUrl + '\')'"
          ></div>
          <div
            v-if="!profile.avatarUrl && !gettingAvatar"
            class="avatar rounded bg-secondary text-light"
          >
            <h1 v-if="profile.name" class="m-0">
              {{ profile.name.substring(0, 1) }}
            </h1>
            <div
              v-else
              class="spinner-border"
              style="width: 3rem; height: 3rem;"
              role="status"
            >
              <span class="sr-only">Loading...</span>
            </div>
          </div>

          <div
            v-if="gettingAvatar"
            class="avatar rounded border d-flex align-items-center justify-content-center"
          >
            <div class="spinner-border text-primary" role="status">
              <span class="sr-only">Loading...</span>
            </div>
          </div>
        </div>
      </div>

      <div class="row d-flex justify-content-center">
        <div class="col-auto">
          <h5 class="text-center my-3">{{ profile.name }}</h5>

          <p v-if="profile.about">{{ profile.about }}</p>
        </div>
      </div>

      <div
        v-if="
          profile.facebook ||
          profile.twitter ||
          profile.instagram ||
          profile.linkedin ||
          profile.otherWebsite
        "
        class="row d-flex justify-content-center mb-3"
      >
        <div class="col col-md-auto">
          <social-btns
            :links="{
              facebook: profile.facebook,
              twitter: profile.twitter,
              instagram: profile.instagram,
              linkedin: profile.linkedin,
              otherWebsite: profile.otherWebsite,
            }"
          />
        </div>
      </div>

      <div class="row mb-3">
        <div class="col">
          <div class="card">
            <div class="card-body pb-3">
              <ul class="nav nav-pills nav-fill">
                <li class="nav-item mb-2">
                  <nuxt-link
                    id="profile-nav"
                    to="/profile/events"
                    class="nav-link"
                    :class="{
                      active:
                        routeName === 'profile' ||
                        routeName === 'profile-Events',
                    }"
                  >
                    <i class="fa fa-user-circle"></i>
                    Profile
                  </nuxt-link>
                </li>

                <li class="nav-item mb-2">
                  <nuxt-link
                    id="likes-nav"
                    to="/profile/likes"
                    class="nav-link"
                    :class="{ active: routeName === 'profile-Likes' }"
                  >
                    <i class="fa fa-heart"></i>
                    Likes
                  </nuxt-link>
                </li>

                <li class="nav-item mb-2">
                  <nuxt-link
                    id="edit-nav"
                    to="/profile/edit"
                    class="nav-link"
                    :class="{ active: routeName === 'profile-Edit' }"
                  >
                    <i class="fas fa-edit"></i>
                    Edit
                  </nuxt-link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col">
          <div class="tabs">
            <nuxt-child />

            <events
              v-if="
                $route.fullPath === '/profile' ||
                $route.fullPath === '/profile/'
              "
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

import SocialBtns from '@/components/SocialBtns.vue'

import Events from '@/pages/profile/Events.vue'

export default {
  name: 'Profile',

  middleware: 'auth',

  head() {
    return {
      title: this.profile.name || 'Profile',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'Your Spark West Network account',
        },
      ],
    }
  },

  components: {
    SocialBtns,
    Events,
  },

  data() {
    return {
      gettingAvatar: true,
    }
  },

  computed: {
    ...mapGetters({
      profile: 'user/profile',
      user: 'user/user',
    }),

    routeName() {
      return this.$route.name
    },
  },

  methods: {
    ...mapActions({
      getAvatarUrl: 'user/getAvatarUrl',
    }),
  },

  async mounted() {
    try {
      if (this.profile.avatar && !this.profile.avatarUrl) {
        this.gettingAvatar = true
        await this.getAvatarUrl()
        this.gettingAvatar = false
      } else {
        this.gettingAvatar = false
      }
    } catch (e) {
      console.error(e)
      this.gettingAvatar = false
    }
  },
}
</script>
