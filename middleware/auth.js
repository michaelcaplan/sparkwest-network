// Middleware for pages that require user authentication
import { getUserFromCookie } from '@/helpers'

export default function ({ $fireAuth, store, req, redirect }) {
  // Check auth server side
  if (process.server) {
    console.log('server', req.headers)

    // Get access_token cookie from header and get user
    const user = getUserFromCookie(req)
    // If user is not authenticated, redirect to login
    if (!user) {
      console.log('redirecting server')
      redirect('/login')
    } else {
      store.dispatch('user/setUser', user)
    }

    // Check auth client side
  } else {
    // Get current user
    const user = $fireAuth.currentUser
    // If user is not authenticated, redirect to login
    if (!user) {
      redirect('/login')
    } else {
      store.dispatch('user/setUser', user)
    }
  }
}
