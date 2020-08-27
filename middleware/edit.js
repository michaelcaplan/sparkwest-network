// Middleware to check if user is author of an event
export default async function ({
  $fireAuth,
  $fireStore,
  res,
  route,
  redirect,
}) {
  // Check auth server side
  if (process.server) {
    if (res && res.locals && res.locals.user) {
      const user = res.locals.user

      // If user uid isn't the same as events author uid, redirect
      if (user) {
        const UID = user.uid || user.user_id
        const doc = await $fireStore
          .collection('events')
          .doc(route.params.id)
          .get()

        if (UID !== doc.data().authorID) {
          redirect('/events/' + route.params.id)
        }
      } else {
        redirect('/')
      }
    }

    // Check auth client side
  } else {
    // Get current user
    const user = $fireAuth.currentUser

    // If user uid isn't the same as events author uid, redirect
    if (user) {
      const UID = user.uid || user.user_id
      const doc = await $fireStore
        .collection('events')
        .doc(route.params.id)
        .get()

      if (UID !== doc.data().authorID) {
        redirect('/events/' + route.params.id)
      }
    } else {
      redirect('/events/' + route.params.id)
    }
  }
}
