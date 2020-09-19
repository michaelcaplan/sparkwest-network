<template>
  <div class="row">
    <div class="col-12 col-sm">
      <p class="text-center">Light</p>

      <a
        :class="{ current: $colorMode.preference === 'light' }"
        class="theme-btn theme-light"
        href="#"
        @click="setColor('light')"
      >
        <img src="../assets/lightButton.svg" alt="Light" />
      </a>
    </div>

    <div class="col-12 col-sm my-3 my-sm-0">
      <p class="text-center">Dark</p>

      <a
        :class="{ current: $colorMode.preference === 'dark' }"
        class="theme-btn theme-dark"
        href="#"
        @click="setColor('dark')"
      >
        <img src="../assets/darkButton.svg" alt="Dark" />
      </a>
    </div>

    <div class="col-12 col-sm">
      <p class="text-center">System</p>

      <a
        :class="{ current: $colorMode.preference === 'system' }"
        class="theme-btn theme-system"
        href="#"
        @click="setColor('system')"
      >
        <img src="../assets/systemButton.svg" alt="System" />
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ThemePicker',

  methods: {
    setColor(color) {
      this.$colorMode.preference = color
    },
  },
}
</script>

<style scoped>
.theme-btn {
  width: 100%;
}

.theme-btn:hover {
  cursor: pointer;
}

.theme-btn img {
  width: 100%;
  border-radius: 0.75rem;
  border-color: rgba(255, 255, 255, 0.1);
  border-width: 3px;
  border-style: solid;
}

.theme-btn:hover img {
  border-color: rgba(255, 255, 255, 0.2);
}

.theme-btn.current img {
  border-color: rgba(90, 156, 254, 0.4);
}

.theme-btn.current:hover img {
  border-color: rgba(90, 156, 254, 0.6);
}
</style>
