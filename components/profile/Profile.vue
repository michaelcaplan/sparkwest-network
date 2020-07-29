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

        <button class="btn btn-success float-right">
          Add New Event
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Profile',
}
</script>
