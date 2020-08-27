<template>
  <div class="row d-flex justify-content-center">
    <div class="col col-lg-6">
      <h1 class="display-1 text-center">404</h1>
      <h3 class="text-center">Profile not found</h3>

      <hr />

      <p class="text-cent">
        It seems the profile you are looking for does not exist. This could be
        because the profile was deleted or there is a typo in your search
      </p>

      <div class="row d-flex justify-content-center">
        <div class="col-auto">
          <nuxt-link to="/" class="btn btn-primary">
            Go Back Home
          </nuxt-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProfileNotFound',
}
</script>
