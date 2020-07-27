<template>
  <div id="footer" class="px-5 bg-light border text-center">
    <div class="row my-3">
      <div class="col text-center">
        <p class="mb-0 font-weight-bold">Check out our newsletter:</p>
      </div>
    </div>
    <div class="row mt-3 d-flex justify-content-center">
      <div class="col-md-8">
        <form class="mb-3">
          <div class="input-group mb-3">
            <label>
              <input
                type="email"
                class="form-control"
                placeholder="Email"
                required
              />
            </label>
            <label>
              <input
                type="text"
                class="form-control"
                placeholder="Name"
                required
              />
            </label>
          </div>

          <input
            type="submit"
            value="Sign up"
            class="btn btn-block btn-success"
          />
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Footer',
}
</script>

<style scoped>
.col-md-8 {
  max-width: 800px;
}
</style>
