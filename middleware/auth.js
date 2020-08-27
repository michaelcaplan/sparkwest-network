// Middleware for pages that require user authentication

export default function ({ $fireAuth, store, res, redirect }) {
  if (process.server) {
    if (res && res.locals && res.locals.user) {
      store.dispatch('user/setUser', res.locals.user)
    } else {
      redirect('/login')
    }
  } else {
    const user = $fireAuth.currentUser
    // If user is not authenticated, redirect to login
    if (!user) {
      redirect('/login')
    } else {
      store.dispatch('user/setUser', user)
    }
  }
}
