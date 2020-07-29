<template>
  <div id="profile">
    <div class="container py-3">
      <h1>Your Profile</h1>

      <hr />

      <div class="row d-flex justify-content-center">
        <div class="col-auto">
          <div
            v-if="profile.avatar"
            class="avatar rounded shadow-sm"
            :style="'background: url(\'' + profile.avatar + '\')'"
          ></div>
          <div v-else class="avatar rounded bg-secondary text-light shadow-sm">
            <h1 v-if="profile.name" class="m-0">
              {{ profile.name.substring(0, 1) }}
            </h1>
          </div>

          <h5 class="text-center my-3">{{ profile.name }}</h5>

          <p v-if="profile.about">{{ profile.about }}</p>
        </div>
      </div>

      <div class="row mb-3">
        <div class="col">
          <div class="card">
            <div class="card-body">
              <ul class="nav nav-pills nav-fill">
                <li class="nav-item">
                  <a
                    :class="{ 'nav-link': true, active: tabNum == 0 }"
                    @click.prevent="tabNum = 0"
                    href="#"
                  >
                    <i class="fa fa-user-circle"></i>
                    Profile
                  </a>
                </li>

                <li class="nav-item">
                  <a
                    :class="{ 'nav-link': true, active: tabNum == 1 }"
                    @click.prevent="tabNum = 1"
                    href="#"
                  >
                    <i class="fa fa-heart"></i>
                    Likes
                  </a>
                </li>

                <li class="nav-item">
                  <a
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
  components: {
    profile,
    likes,
    edit,
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
    }),
  },
  mounted() {
    this.getProfile()
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
</style>
