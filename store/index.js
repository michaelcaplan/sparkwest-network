export const strict = false

export const state = () => ({})

export const actions = {
  async nuxtServerInit({ dispatch }, { res }) {
    if (res && res.locals && res.locals.user) {
      const { allClaims: claims, idToken: token, ...authUser } = res.locals.user

      await dispatch('user/onAuthStateChangedAction', {
        authUser,
        token,
      })
    }
  },
}
