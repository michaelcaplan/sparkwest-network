// Middleware to check if user is viewing own profile
export default function ({ $fireAuth, res, route, redirect }) {
  // Check auth server side
  if (process.server) {
    if (res && res.locals && res.locals.user) {
      const user = res.locals.user

      // If user uid is the same as route redirect to users profile
      if (user) {
        const UID = user.uid || user.user_id
        if (UID === route.params.uid) {
          redirect('/profile')
        }
      }
    }

    // Check auth client side
  } else {
    // Get current user
    const user = $fireAuth.currentUser

    // If user uid is the same as route redirect to users profile
    if (user) {
      const UID = user.uid || user.user_id
      if (UID === route.params.uid) {
        redirect('/profile')
      }
    }
  }
}
