// Middleware to check if user is author of an event
export default async function ({
  $fireAuth,
  $fireStore,
  res,
  route,
  redirect,
}) {
  const doc = await $fireStore.collection('events').doc(route.params.id).get()

  // Check auth server side
  if (process.server && res && res.locals && res.locals.user) {
    // Get access_token cookie from header and get user
    const user = res.locals.user

    // If user uid isn't the same as events author uid, redirect
    if (user) {
      const UID = user.uid || user.user_id
      if (UID !== doc.data().authorID) {
        redirect('/events/' + route.params.id)
      }
    } else {
      redirect('/')
    }

    // Check auth client side
  } else {
    // Get current user
    const user = $fireAuth.currentUser

    // If user uid isn't the same as events author uid, redirect
    if (user) {
      const UID = user.uid || user.user_id
      if (UID !== doc.data().authorID) {
        redirect('/events/' + route.params.id)
      }
    } else {
      redirect('/')
    }
  }
}
