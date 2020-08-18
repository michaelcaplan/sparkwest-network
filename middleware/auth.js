// Middleware for pages that require user authentication
// import { getUserFromCookie } from '@/helpers'

export default function ({ $fireAuth, store, res, redirect }) {
  if (process.server && res && res.locals && res.locals.user) {
    if (!res.locals.user) {
      redirect('/login')
    } else {
      store.dispatch('user/setUser', res.locals.user)
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
