<template>
  <nuxt-link
    to="/profile"
    class="card bg-dark text-light mw-100 d-block d-md-inline-block"
  >
    <div class="card-body">
      <div class="row pr-3">
        <div class="col-auto">
          <div
            v-if="profile.avatarUrl"
            class="avatar rounded"
            :style="'background-image: url(\'' + profile.avatarUrl + '\')'"
          ></div>
          <div v-else class="avatar rounded bg-secondary text-light">
            <h4 v-if="profile.name" class="m-0">
              {{ profile.name.substring(0, 1) }}
            </h4>
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
        <div class="col">
          <h5 v-if="profile.name">{{ profile.name }}</h5>
          <p class="m-0 text-truncate" v-if="profile.about">
            {{ profile.about }}
          </p>
        </div>
      </div>
    </div>
  </nuxt-link>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
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
}
</script>

<style scoped>
.avatar {
  width: 4rem;
  height: 4rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
}

.card {
  text-decoration: none;
}
</style>
