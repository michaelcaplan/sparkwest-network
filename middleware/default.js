// Default middleware for all pages

export default function ({ $fireAuth, store, res, redirect }) {
  if (process.server && res && res.locals && res.locals.user) {
    if (res.locals.user) {
      store.dispatch('user/setUser', res.locals.user)
    }
  } else {
    const user = $fireAuth.currentUser
    if (user) {
      store.dispatch('user/setUser', user)
    }
  }
}
