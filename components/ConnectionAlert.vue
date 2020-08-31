<template>
  <div
    v-if="show"
    class="toast show m-2 m-md-3 animate__animated animate__fadeInRight"
    role="alert"
    aria-live="assertive"
    aria-atomic="true"
  >
    <div
      class="toast-header text-light"
      :class="{ 'bg-danger': error, 'bg-success': !error }"
    >
      <div class="row">
        <div class="col d-flex align-items-center">
          <p class="mb-0">
            <i class="fas fa-exclamation-circle"></i>
            <strong class="mr-auto">Connecion Alert</strong>
          </p>
        </div>
        <div class="col-auto d-flex align-items-center">
          <button type="button" class="btn btn-sm" @click="show = false">
            <i class="fa fa-times text-light" aria-hidden="true"></i>
          </button>
        </div>
      </div>
    </div>
    <div class="toast-body">
      {{ message }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'ConnectionAlert',

  data() {
    return {
      show: false,
      error: false,
      message: '',
    }
  },

  computed: {
    isOnline() {
      return this.$nuxt.isOnline
    },
  },

  watch: {
    isOnline() {
      if (this.isOnline === false && this.show === false) {
        this.show = true
        this.error = true
        this.message = 'You are currently offline'
      }

      if (this.isOnline === false && this.show === true) {
        this.error = true
        this.message = 'You are currently offline'
      }

      if (this.isOnline === true && this.show === true) {
        this.error = false
        this.message = 'You are back online'
      }
    },
  },
}
</script>

<style scoped>
.toast {
  position: fixed;
  bottom: 0;
  right: 0;
  z-index: 9999;
}
</style>
