require('dotenv').config()

export default {
  /*
   ** Nuxt rendering mode
   ** See https://nuxtjs.org/api/configuration-mode
   */
  mode: 'universal',
  /*
   ** Nuxt target
   ** See https://nuxtjs.org/api/configuration-target
   */
  target: 'server',
  /*
   ** Headers of the page
   ** See https://nuxtjs.org/api/configuration-head
   */
  head: {
    titleTemplate: '%s | Spark West Network',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content:
          'Spark West Network is an umbrella marketing platform that draws together, assists, and coordinates the various organizations, events, and people that define West Nova Scotia’s unique entrepreneurial opportunities.',
      },
      {
        name: 'theme-color',
        content: '#343a40',
      },
      {
        name: 'msapplication-TileColor',
        content: '#fe3d61',
      },
      {
        name: 'msapplication-config',
        content: '/icons/browserconfig.xml?v=9B0BkpJAWp',
      },
    ],
    script: [
      {
        src: 'https://code.jquery.com/jquery-3.5.1.slim.min.js',
        integrity:
          'sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj',
        crossorigin: 'anonymous',
      },
      {
        src:
          'https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js',
        integrity:
          'sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo',
        crossorigin: 'anonymous',
      },
      {
        src:
          'https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/js/bootstrap.min.js',
        integrity:
          'sha384-OgVRvuATP1z7JjHLkuOU7Xw704+h835Lr+6QL9UvYjZE3Ipu6Tp75j7Bh/kR0JKI',
        crossorigin: 'anonymous',
      },
      {
        src: 'https://kit.fontawesome.com/d05d35c2fa.js',
        crossorigin: 'anonymous',
      },
    ],
    link: [
      // Favicons
      {
        rel: 'apple-touch-icon',
        sizes: '180x180',
        href: '/icons/apple-touch-icon.png?v=9B0BkpJAWp',
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '32x32',
        href: '/icons/favicon-32x32.png',
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '194x194',
        href: '/icons/favicon-194x194.png',
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '192x192',
        href: '/icons/android-chrome-192x192.png',
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '16x16',
        href: '/icons/favicon-16x16.png',
      },
      {
        rel: 'mask-icon',
        href: '/icons/safari-pinned-tab.svg?v=9B0BkpJAWp',
        color: '#fe3d61',
      },
      {
        rel: 'shortcut icon',
        href: '/icons/favicon.ico?v=9B0BkpJAWp',
      },

      // Stylesheets
      {
        rel: 'stylesheet',
        href:
          'https://fonts.googleapis.com/css2?family=Montserrat&family=Nunito&display=swap',
      },
      {
        rel: 'stylesheet',
        href:
          'https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css',
        integrity:
          'sha384-9aIt2nRpC12Uk9gS9baDl411NQApFmC26EwAOH8WgZl5MYYxFfc+NcPb1dKGj7Sk',
        crossorigin: 'anonymous',
      },
      {
        rel: 'stylesheet',
        href:
          'https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.0.0/animate.min.css',
      },
    ],
  },
  /*
   ** Global CSS
   */
  css: ['@/assets/main.css', '@/assets/noscript.css'],
  /*
   ** Nuxt loading bar settings
   */
  loading: {
    color: '#fcd23c',
    height: '0.25rem',
  },
  /*
   ** Plugins to load before mounting the App
   ** https://nuxtjs.org/guide/plugins
   */
  plugins: [{ src: '~/plugins/vuejs-datepicker', ssr: false }],
  /*
   ** Auto import components
   ** See https://nuxtjs.org/api/configuration-components
   */
  components: true,
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module',
    // Doc: https://github.com/nuxt-community/stylelint-module
    '@nuxtjs/stylelint-module',
    '@nuxtjs/dotenv',
    '@nuxtjs/color-mode',
  ],
  /*
   ** Environment variables to be used at runtime
   */
  env: {
    apiKey: process.env.API_KEY,
    authDomain: process.env.AUTH_DOMAIN,
    databaseURL: process.env.DATABASE_URL,
    projectId: process.env.PROJECT_ID,
    storageBucket: process.env.STORAGE_BUCKET,
    messagingSenderId: process.env.MESSAGING_SENDER_ID,
    appId: process.env.APP_ID,
    measurementId: process.env.MEASURMENT_ID,
    mailchimpKey: process.env.MAILCHIMP_KEY,
  },
  /*
   ** Nuxt.js modules
   */
  modules: [
    '@nuxtjs/pwa',
    '@nuxtjs/robots',
    '@nuxtjs/axios',
    [
      '@nuxtjs/firebase',
      {
        config: {
          apiKey: process.env.API_KEY,
          authDomain: process.env.AUTH_DOMAIN,
          databaseURL: process.env.DATABASE_URL,
          projectId: process.env.PROJECT_ID,
          storageBucket: process.env.STORAGE_BUCKET,
          messagingSenderId: process.env.MESSAGING_SENDER_ID,
          appId: process.env.APP_ID,
          measurementId: process.env.MEASURMENT_ID,
        },
        services: {
          auth: {
            persistence: 'local',
            ssr: true,
            initialize: {
              onAuthStateChangedAction: 'user/onAuthStateChangedAction',
            },
          },
          firestore: true,
          storage: true,
          functions: true,
        },
      },
    ],
    'cookie-universal-nuxt',
  ],
  /*
   ** Server Middleware
   */
  serverMiddleware: [{ path: '/api', handler: '@/api/index.js' }],
  axios: {
    baseURL: '/',
    browserBaseURL: '/',
  },
  /*
   ** PWA settings
   */
  pwa: {
    icon: false,
    manifest: {
      name: 'Spark West Network',
      short_name: 'SWN',
      background_color: '#343a40',
      theme_color: '#343a40',
      icons: [
        {
          src: '/icons/android-chrome-192x192.png',
          sizes: '192x192',
          type: 'image/png',
        },
        {
          src: '/icons/android-chrome-512x512.png',
          sizes: '192x192',
          type: 'image/png',
        },
      ],
    },
    meta: {
      name: 'Spark West Network',
      favicon: false,
    },
    workbox: {
      // Firebase Service Worker
      importScripts: ['/firebase-auth-sw.js'],

      // External resources to cache at runtime
      runtimeCaching: [
        {
          urlPattern: 'https://fonts.googleapis.com/.*',
          handler: 'cacheFirst',
          method: 'GET',
          strategyOptions: { cacheableResponse: { statuses: [0, 200] } },
        },
        {
          urlPattern: 'https://stackpath.bootstrapcdn.com/*',
          handler: 'cacheFirst',
          method: 'GET',
          strategyOptions: { cacheableResponse: { statuses: [0, 200] } },
        },
        {
          urlPattern: 'https://kit.fontawesome.com/*',
          handler: 'cacheFirst',
          method: 'GET',
          strategyOptions: { cacheableResponse: { statuses: [0, 200] } },
        },
      ],
      // by default the workbox module will not install the service worker in dev environment to avoid conflicts with HMR
      // only set this true for testing and remember to always clear your browser cache in development
      dev: false,
    },
  },
  /*
   ** Sight crawler settings
   */
  robots: {
    UserAgent: '*',
    Disallow: '/profile',
    Disallow: '/edit',
  },
  /*
   ** Build configuration
   ** See https://nuxtjs.org/api/configuration-build/
   */
  build: {},
}
