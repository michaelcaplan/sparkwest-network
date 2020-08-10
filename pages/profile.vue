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
          <div v-else class="avatar rounded bg-secondary text-light">
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
        </div>
      </div>

      <div class="row d-flex justify-content-center">
        <div class="col-auto">
          <h5 class="text-center my-3">{{ profile.name }}</h5>

          <p v-if="profile.about">{{ profile.about }}</p>
        </div>
      </div>

      <div class="row mb-3">
        <div class="col">
          <div class="card">
            <div class="card-body pb-3">
              <ul class="nav nav-pills nav-fill">
                <li class="nav-item mb-2">
                  <a
                    id="profile-nav"
                    :class="{ 'nav-link': true, active: tabNum == 0 }"
                    @click.prevent="tabNum = 0"
                    href="#"
                  >
                    <i class="fa fa-user-circle"></i>
                    Profile
                  </a>
                </li>

                <li class="nav-item mb-2">
                  <a
                    id="likes-nav"
                    :class="{ 'nav-link': true, active: tabNum == 1 }"
                    @click.prevent="tabNum = 1"
                    href="#"
                  >
                    <i class="fa fa-heart"></i>
                    Likes
                  </a>
                </li>

                <li class="nav-item mb-2">
                  <a
                    id="edit-nav"
                    :class="{ 'nav-link': true, active: tabNum == 2 }"
                    @click.prevent="tabNum = 2"
                    href="#"
                  >
                    <i class="fas fa-edit"></i>
                    Edit
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col">
          <div class="tabs">
            <div v-show="tabNum === 0" id="profile">
              <profile />
            </div>

            <div v-show="tabNum === 1" id="likes">
              <likes />
            </div>

            <div v-show="tabNum === 2" id="edit">
              <edit />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

import profile from '@/components/profile/Profile.vue'
import likes from '@/components/profile/Likes.vue'
import edit from '@/components/profile/Edit.vue'

export default {
  name: 'Profile',

  middleware: 'auth',

  data() {
    return {
      tabNum: 0,
    }
  },

  computed: {
    ...mapGetters({
      profile: 'user/profile',
      user: 'user/user',
    }),
  },

  methods: {
    ...mapActions({
      getProfile: 'user/getProfile',
      getUserEvents: 'events/getUserEvents',
    }),
  },

  mounted() {
    this.getProfile(this.user.uid || this.user.user_id)
  },

  components: {
    profile,
    likes,
    edit,
  },
}
</script>

<style scoped>
.avatar {
  width: 10rem;
  height: 10rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
}

#likes-nav {
  color: #fe3d61;
}

#likes-nav.active {
  background: #fe3d61 !important;
  color: #fff !important;
}

#edit-nav {
  color: #17a2b8;
}

#edit-nav.active {
  background: #17a2b8 !important;
  color: #fff !important;
}
</style>
