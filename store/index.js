export const strict = false

export const state = () => ({})

export const actions = {
  async nuxtServerInit({ dispatch }, { res }) {
    console.log('Server init')
    if (res && res.locals && res.locals.user) {
      const { idToken: token, ...authUser } = res.locals.user
      console.log(authUser)

      await dispatch('user/onAuthStateChangedAction', {
        authUser,
        token,
      })
    }
  },
}
