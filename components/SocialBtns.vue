<template>
  <div
    v-if="
      links &&
      (links.facebook ||
        links.twitter ||
        links.instagram ||
        links.linkedin ||
        links.otherWebsite)
    "
    class="social-btns"
  >
    <div class="btn-group d-none d-md-inline-block">
      <a
        v-if="links.facebook"
        :href="links.facebook || '#'"
        target="_blank"
        class="btn btn-primary"
      >
        <i class="fa fa-facebook" aria-hidden="true"></i>
      </a>
      <a
        v-if="links.twitter"
        :href="links.twitter || '#'"
        target="_blank"
        class="btn btn-info"
      >
        <i class="fa fa-twitter" aria-hidden="true"></i>
      </a>
      <a
        v-if="links.instagram"
        :href="links.instagram || '#'"
        target="_blank"
        class="btn btn-danger"
      >
        <i class="fa fa-instagram" aria-hidden="true"></i>
      </a>
      <a
        v-if="links.linkedin"
        :href="links.linkedin || '#'"
        target="_blank"
        class="btn btn-info"
      >
        <i class="fa fa-linkedin" aria-hidden="true"></i>
      </a>
      <a
        v-if="links.otherWebsite"
        :href="links.otherWebsite || '#'"
        target="_blank"
        class="btn btn-secondary"
      >
        <i class="fas fa-globe" aria-hidden="true"></i>
      </a>
    </div>

    <div class="row d-flex d-md-none px-3">
      <div v-if="links.facebook" class="col col-md-auto px-1">
        <a
          :href="links.facebook || '#'"
          target="_blank"
          class="btn btn-block btn-primary"
        >
          <i class="fa fa-facebook" aria-hidden="true"></i>
        </a>
      </div>
      <div v-if="links.twitter" class="col col-md-auto px-1">
        <a
          :href="links.twitter || '#'"
          target="_blank"
          class="btn btn-block btn-info"
        >
          <i class="fa fa-twitter" aria-hidden="true"></i>
        </a>
      </div>
      <div v-if="links.instagram" class="col col-md-auto px-1">
        <a
          :href="links.instagram || '#'"
          target="_blank"
          class="btn btn-block btn-danger"
        >
          <i class="fa fa-instagram" aria-hidden="true"></i>
        </a>
      </div>
      <div v-if="links.linkedin" class="col col-md-auto px-1">
        <a
          :href="links.linkedin || '#'"
          target="_blank"
          class="btn btn-block btn-info"
        >
          <i class="fa fa-linkedin" aria-hidden="true"></i>
        </a>
      </div>
      <div v-if="links.otherWebsite" class="col col-md-auto px-1">
        <a
          :href="links.otherWebsite || '#'"
          target="_blank"
          class="btn btn-block btn-secondary"
        >
          <i class="fas fa-globe" aria-hidden="true"></i>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SocialBtns',

  props: ['links'],
}
</script>
