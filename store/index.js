export const strict = false

export const state = () => ({
  showFeatured: false,
})

export const getters = {
  showFeatured(state) {
    return state.showFeatured
  },
}

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

export const mutations = {
  SET_SHOW_FEATURED(state, value) {
    state.showFeatured = value
  },
}
