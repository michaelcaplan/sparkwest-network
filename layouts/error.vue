<template>
  <div class="container">
    <div
      v-if="error.statusCode === 404"
      class="row d-flex justify-content-center"
    >
      <div class="col col-lg-6">
        <h1 class="display-1 text-center">404</h1>
        <h3 class="text-center">Page not found</h3>

        <hr />

        <p class="text-cent">
          It seems the page you are looking for does not exist. This could be
          because the page was deleted or there is a typo in your search
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

    <div v-else class="row d-flex justify-content-center">
      <div class="col col-lg-6">
        <h1 class="display-1 text-center">Uh Oh,</h1>
        <h3 class="text-center">An error occurred</h3>

        <hr />

        <p class="text-center">
          It seems there has been an error processing your request. You can try
          refreshing the page or return to home
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
  </div>
</template>

<script>
export default {
  props: ['error'],
}
</script>
