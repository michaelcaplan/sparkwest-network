<template>
  <div class="card bg-dark text-light event-card">
    <div v-show="!small" class="card-body">
      <div class="row">
        <div
          class="col-auto border-right border-secondary d-flex align-items-center justify-content-center"
        >
          <div class="date-square gradient rounded"></div>
        </div>
        <div class="col">
          <div class="loading gradient w-50 rounded mb-2"></div>
          <div class="loading gradient w-25 rounded"></div>
        </div>
      </div>
      <div class="row mt-3 d-block d-sm-none">
        <div class="col">
          <div class="loading gradient w-100 rounded"></div>
        </div>
      </div>
    </div>

    <div v-show="small" class="card-body p-2">
      <div class="row mb-2">
        <div class="col">
          <div class="loading gradient w-25 rounded"></div>
        </div>
      </div>

      <div class="row">
        <div class="col">
          <div class="loading gradient w-50 rounded"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'EventCardPlaceholder',

  props: ['small'],
}
</script>

<style scoped>
.date-square {
  height: 3rem;
  width: 3rem;
}
</style>
