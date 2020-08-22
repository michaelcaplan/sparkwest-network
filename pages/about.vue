<template>
  <div class="container py-3">
    <h1>About</h1>

    <hr />

    <div class="card">
      <div class="card-body">
        <div class="row">
          <div class="col-12 col-lg mb-3 mb-lg-0">
            <div class="card h-100 bg-dark border-0">
              <div
                class="card-body d-flex align-items-center justify-content-center"
              >
                <img src="@/assets/logoLG.svg" alt="" class="img-fluid" />
              </div>
            </div>
          </div>
          <div class="col-12 col-lg">
            <h2>What is Spark West Network?</h2>

            <p>
              Spark West Network is an umbrella marketing platform that draws
              together, assists, and coordinates the various organizations,
              events, and people that define our region’s unique entrepreneurial
              opportunities. The Spark West website aims to act as a platform
              for hosting the unique events and opportunities that make up
              western Nova Scotia’s entrepreneurial ecosystem.
            </p>
          </div>
        </div>
      </div>
    </div>

    <hr />

    <div class="row d-flex justify-content-center">
      <div class="col col-md-6">
        <div class="card">
          <div class="card-body">
            <h2>
              Our Vision
              <i class="fas fa-project-diagram text-primary float-right"></i>
            </h2>

            <p>
              Our vision is to create a unified voice for entrepreneurship in
              the rural areas of western Nova Scotia. We want to make our region
              a friendlier place for entrepreneurs to connect with each other,
              get advice, become noticed, and build up their businesses and
              skill sets.
            </p>
          </div>
        </div>
      </div>
    </div>

    <hr />

    <h1>
      FAQ
    </h1>

    <a
      data-toggle="collapse"
      data-target="#faqCollapse1"
      href="#"
      class="card faq-card mb-3"
      @click="toggleCaret('caret1')"
    >
      <div class="card-body">
        <div class="row">
          <div class="col">
            <b>
              Why should this initiative be focused on a small rural area like
              the Annapolis Valley?
            </b>
          </div>
          <div class="col-auto">
            <i id="caret1" class="fas fa-caret-down float-right up"></i>
          </div>
        </div>

        <div id="faqCollapse1" class="collapse show">
          <hr />
          This initiative wants to make western rural Nova Scotia innovate,
          create businesses, and urbanize. We believe there is greater value in
          engaging the geographic region targeted by the Innovacorp Spark West
          Innovation Challenge. This includes Lunenburg, Queens, Shelburne,
          Yarmouth, Digby, Annapolis, Kings, and Hants counties. We all share
          alike this rural region of Nova Scotia and collaborate across this
          region regularly, and our collective footprint provides a more
          meaningful picture.
        </div>
      </div>
    </a>

    <a
      data-toggle="collapse"
      data-target="#faqCollapse2"
      href="#"
      class="card faq-card mb-3"
      @click="toggleCaret('caret2')"
    >
      <div class="card-body">
        <div class="row">
          <div class="col">
            <b>
              Should we not just promote our region’s activities under the
              Halifax Startup Digest?
            </b>
          </div>
          <div class="col-auto">
            <i id="caret2" class="fas fa-caret-down float-right"></i>
          </div>
        </div>

        <div id="faqCollapse2" class="collapse">
          <hr />
          We should absolutely promote our region’s activities to the wider Nova
          Scotia startup community. HSD is an excellent way to do this. However,
          HSD has its own mandate which does not include our rural Nova Scotia
          ecosystem. It is a rare experience to find content in HSD that pulls
          from our region. Furthermore, HSD does not have a good vantage point
          to attempt to adequately represent Western Nova, because it is the big
          urban centres like Halifax that engage and are rich in innovation,
          business, entrepreneurship, and such.
        </div>
      </div>
    </a>

    <a
      data-toggle="collapse"
      data-target="#faqCollapse3"
      href="#"
      class="card faq-card"
      @click="toggleCaret('caret3')"
    >
      <div class="card-body">
        <div class="row">
          <div class="col">
            <b>
              Where do you draw your inspiration from?
            </b>
          </div>
          <div class="col-auto">
            <i id="caret3" class="fas fa-caret-down float-right"></i>
          </div>
        </div>

        <div id="faqCollapse3" class="collapse">
          <hr />
          Halifax has done a remarkable job drawing people in and sustaining a
          culture that appeals to entrepreneurs and creative professionals. One
          initiative we want to draw attention to is the Halifax Startup Digest
          (HSD), run by John Hamblin.
          <br />
          <br />
          HSD is a twice-monthly email newsletter and web calendar that
          aggregates events of interest to this Halifax community. As a
          cross-organization voice, HSD pulls together a compelling picture of
          the wide range of activities and organizations that make Halifax the
          dynamic startup ecosystem that it is. Furthermore, HSD draws from
          relevant programs being delivered in other urban centres in the
          Atlantic region, and beyond, to help situate Halifax within a larger
          context. As a volunteer program run by one individual, it is quite an
          effective community building initiative.
        </div>
      </div>
    </a>

    <hr />

    <h1 class="text-center">Have More Questions?</h1>
    <div class="w-100 d-flex justify-content-center mb-3">
      <nuxt-link :to="{ name: 'contact' }" class="btn btn-lg btn-primary">
        Contact Us
      </nuxt-link>
    </div>

    <hr />

    <div class="card card-body">
      <div class="row">
        <div class="col-12 col-md-3 col-lg-2 pr-mb-0 mb-3 mb-md-0">
          <a
            class="card card-github card-body w-100 h-100 bg-dark d-flex align-items-center justify-content-center"
            target="_blank"
            href="https://github.com/michaelcaplan/sparkwest-network"
          >
            <img
              src="../assets/GitHubLG.svg"
              alt="GitHub"
              class="img-fluid d-none d-md-block"
            />
            <img
              src="../assets/GitHubSM.svg"
              alt="GitHub"
              class="img-fluid d-block d-md-none"
            />
          </a>
        </div>
        <div class="col">
          <h5>SWN, For the communtiy</h5>

          <hr />

          Spark West Network is built with Nuxt.js
          <i class="fab fa-vuejs text-success"></i> and Firebase
          <i class="fas fa-fire text-danger"></i> and is proud to be an open
          source project. Learn more or become a contributer at
          <a
            href="https://github.com/michaelcaplan/sparkwest-network"
            target="_blank"
            >github.com/michaelcaplan/sparkwest-network</a
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'About',

  head() {
    return {
      title: 'About',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'About Spark West Network',
        },
      ],
    }
  },

  methods: {
    toggleCaret(id) {
      document.getElementById(id).classList.toggle('up')
    },
  },
}
</script>

<style scoped>
.faq-card {
  text-decoration: none;
}

.faq-card i {
  transition: 0.5s transform;
}

.up {
  transform: rotate(180deg);
}

.card-github {
  transition: all 0.25s ease;
}

.card-github img {
  -webkit-filter: drop-shadow(0 0.5rem 1rem rgba(0, 0, 0, 0.15));
  filter: drop-shadow(0 0.5rem 1rem rgba(0, 0, 0, 0.15));
  transition: all 0.25s ease;
}

.card-github:hover img {
  -webkit-filter: drop-shadow(0 1rem 1rem rgba(0, 0, 0, 0.25));
  filter: drop-shadow(0 1rem 1rem rgba(0, 0, 0, 0.25));
  transform: translateY(-0.5rem);
}
</style>
