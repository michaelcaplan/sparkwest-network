# Spark West Network

Spark West Network is an umbrella marketing platform that draws
together, assists, and coordinates the various organizations,
events, and people that define our region’s unique entrepreneurial
opportunities. The Spark West website aims to act as a platform
for hosting the unique events and opportunities that make up
western Nova Scotia’s entrepreneurial ecosystem.

---

## Build Setup

Create `.env` in the root of the project.
Copy the contents `.env_example` or the following into `.env`:

```txt
API_KEY=<api key>
AUTH_DOMAIN=<auth domain>
DATABASE_URL=<database url>
PROJECT_ID=<project id>
STORAGE_BUCKET=<storage bucket>
MESSAGING_SENDER_ID=<messaging sender>
APP_ID=<app id>
MEASURMENT_ID=<measurment id>
MAILCHIMP_KEY=<mailchimp api key>
```

Replace text surronded by `<>` along with the brackets with its corrosponding information

```bash
# install dependencies
$ yarn install

# serve with hot reload at localhost:3000
$ yarn dev

# build for production and launch server
$ yarn build
$ yarn start

# generate static project
$ yarn generate
```

For detailed explanation on how things work, check out the [Nuxt.js docs](https://nuxtjs.org) and the [Firebase docs](https://firebase.google.com/docs)


## Firebase Functions Setup

To devlop, test, and deploy Firebase Cloud Functions, `cd` to the `functions` directory and run:

```bash
# install dependencies
$ npm install

# serve an emulated cloud environment for testing
$ npm serve

# deploy just the functions to Firebase
$ npm deploy
```

For deatiled explanation on how things work, check out the [Cloud Functions docs](https://firebase.google.com/docs/functions)
