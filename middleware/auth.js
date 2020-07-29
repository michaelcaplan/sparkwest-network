// Middleware for pages that require user authentication

export default function ({ store, redirect }) {
  // If user is not authenticated, redirect to login
  if (!store.getters['user/isAuthenticated']) {
    console.log('[MIDDLEWARE] - redirecting to login')
    return redirect('/login')
  }
}
