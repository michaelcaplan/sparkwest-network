<template>
  <div class="row">
    <div
      v-for="(color, index) in colors"
      :key="index"
      class="col-12 col-md"
      :class="{
        'px-3 px-md-0': index > 0 && index < colors.length - 1,
        'pb-3': index < colors.length - 1,
      }"
    >
      <a
        class="btn btn-secondary btn-block py-3"
        :class="{ active: $colorMode.preference === color }"
        href="#"
        @click.prevent="setColor(color)"
      >
        <i class="fa-lg mb-2" :class="icons[index]"></i>
        <p class="text-center mb-0">
          <b>
            {{ color }}
          </b>
        </p>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ThemePicker',

  data() {
    return {
      colors: ['light', 'dark', 'system'],
      icons: ['fas fa-sun', 'fas fa-moon', 'fas fa-desktop'],
    }
  },

  methods: {
    setColor(color) {
      console.log('Setting color to: ' + color)
      this.$colorMode.preference = color
    },
  },
}
</script>
