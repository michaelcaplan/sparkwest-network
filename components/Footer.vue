<template>
  <div id="footer" class="bg-dark py-5 text-light">
    <div class="container">
      <div class="row">
        <div class="col-12 col-lg mb-3">
          <h3>Spark West Network</h3>

          <p>
            an umbrella marketing platform that draws together, assists, and
            coordinates the various organizations, events, and people that
            define our region’s unique entrepreneurial opportunities.
          </p>

          <div class="row">
            <div class="col-auto">
              <button class="btn btn-light">
                <i class="fa fa-facebook-f" aria-hidden="true"></i>
              </button>
            </div>
            <div class="col-auto p-0">
              <button class="btn btn-light">
                <i class="fa fa-twitter" aria-hidden="true"></i>
              </button>
            </div>
            <div class="col-auto">
              <button class="btn btn-light">
                <i class="fa fa-instagram" aria-hidden="true"></i>
              </button>
            </div>
          </div>
        </div>

        <div class="col-12 col-md mb-3">
          <h5>Navigation</h5>

          <ul class="nav d-flex d-md-none d-lg-none">
            <li class="nav-item">
              <nuxt-link to="/" class="nav-link text-light">Events</nuxt-link>
            </li>
            <li class="nav-item">
              <nuxt-link :to="{ name: 'about' }" class="nav-link text-light"
                >About</nuxt-link
              >
            </li>
            <li class="nav-item">
              <nuxt-link :to="{ name: 'contact' }" class="nav-link text-light"
                >Contact</nuxt-link
              >
            </li>
          </ul>

          <ul class="nav flex-column d-none d-md-flex">
            <li class="nav-item">
              <nuxt-link to="/" class="nav-link text-light" href="#"
                >Events</nuxt-link
              >
            </li>
            <li class="nav-item">
              <nuxt-link :to="{ name: 'about' }" class="nav-link text-light"
                >About</nuxt-link
              >
            </li>
            <li class="nav-item">
              <nuxt-link :to="{ name: 'contact' }" class="nav-link text-light"
                >Contact</nuxt-link
              >
            </li>
          </ul>
        </div>

        <div class="col-12 col-md mb-3">
          <h5>Check out our newsletter</h5>

          <form>
            <div class="form-group">
              <input
                id="inputEmail"
                type="email"
                class="form-control"
                placeholder="Email"
                aria-describedby="emailHelp"
              />
            </div>

            <div class="form-group">
              <input
                id="inputName"
                type="text"
                class="form-control"
                placeholder="Name"
              />
            </div>

            <div class="form-group">
              <input
                type="submit"
                value="Sign Up"
                class="btn btn-success float-right"
              />
            </div>
          </form>
        </div>
      </div>

      <p id="copyright" class="text-center m-0">
        &copy; 2020 Spark West Network. All rights reserved
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Footer',
}
</script>

<style scoped>
#footer {
  height: auto;
}

@media only screen and (max-width: 576px) {
  #footer {
    height: 740px;
  }
}

@media only screen and (min-width: 576px) {
  #footer {
    height: 585px;
  }
}

@media only screen and (min-width: 768px) {
  #footer {
    height: 500px;
  }
}

@media only screen and (min-width: 992px) {
  #footer {
    height: 375px;
  }
}

@media only screen and (min-width: 1200px) {
  #footer {
    height: 351px;
  }
}
</style>
