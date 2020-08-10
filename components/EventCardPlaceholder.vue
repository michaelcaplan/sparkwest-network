<template>
  <div class="card bg-dark text-light event-card">
    <div class="card-body">
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
    </div>
  </div>
</template>

<script>
export default {
  name: 'EventCardPlaceholder',
}
</script>

<style scoped>
.date-square {
  height: 3rem;
  width: 3rem;
}

.loading {
  height: 1rem;
}

.gradient {
  animation-duration: 1.8s;
  animation-fill-mode: forwards;
  animation-iteration-count: infinite;
  animation-name: placeHolderShimmer;
  animation-timing-function: linear;
  background: #6c757d;
  background: linear-gradient(to right, #6c757d 8%, #7e8992 38%, #6c757d 54%);
  background-size: 1000px 640px;
  position: relative;
}

@keyframes placeHolderShimmer {
  0% {
    background-position: -468px 0;
  }
  100% {
    background-position: 468px 0;
  }
}
</style>
