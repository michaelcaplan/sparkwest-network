<template>
  <div class="hamburger" :class="{ open: open }">
    <span></span>
    <span></span>
    <span></span>
  </div>
</template>

<script>
// Tasty Hamburger
export default {
  name: 'Hamburger',

  props: ['open'],
}
</script>

<style scoped>
.hamburger {
  width: calc((5 / 3) * 1rem);
  height: calc((4 / 3) * 1rem);
  position: relative;
}

.hamburger span {
  width: 100%;
  height: calc((4 / 15) * 1rem);
  border-radius: 0.1rem;
  display: block;
  position: absolute;
  background: var(--light);
  transition: 0.25s all ease-in-out;
}

.hamburger span:nth-child(1) {
  top: 0;
}

.hamburger span:nth-child(2) {
  top: calc((4 / 15) * 2rem);
}

.hamburger span:nth-child(3) {
  bottom: 0;
}

.hamburger.open span:nth-child(1) {
  top: calc((4 / 15) * 2rem);
  transform: rotate(45deg);
}

.hamburger.open span:nth-child(2) {
  top: calc((4 / 15) * 2rem);
  opacity: 0;
  transform: translateX(-1rem);
}

.hamburger.open span:nth-child(3) {
  bottom: calc((4 / 15) * 2rem);
  transform: rotate(-45deg);
}
</style>
