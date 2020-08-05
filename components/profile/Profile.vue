<template>
  <div id="profile">
    <div class="card">
      <div class="card-body">
        <h3>
          Your Events:
        </h3>

        <div class="card mb-3">
          <div class="card-body">
            <h5 class="text-muted m-0">
              You haven't created any events yet ...
            </h5>
          </div>
        </div>

        <nuxt-link
          to="/newEvent"
          class="btn btn-success float-right d-none d-md-inline-block"
        >
          New Event <i class="fa fa-plus" aria-hidden="true"></i>
        </nuxt-link>

        <nuxt-link
          to="/newEvent"
          class="btn btn-block btn-success d-block d-md-none d-lg-none"
        >
          New Event <i class="fa fa-plus" aria-hidden="true"></i>
        </nuxt-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Profile',
}
</script>
