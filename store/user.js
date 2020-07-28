import Cookies from 'js-cookie'

export const state = () => ({
  user: null,
  uid: null,
})

export const getters = {
  uid(state) {
    if (state.user && state.user.uid) return state.user.uid
    else return null
  },

  user(state) {
    return state.user
  },

  isAuthenticated(state) {
    return !!state.user && !!state.user.uid
  },
}

export const actions = {
  async login({ dispatch, state }, user) {
    console.log('[STORE ACTIONS] - login')
    const token = await this.$fireAuth.currentUser.getIdToken(true)
    const userInfo = {
      name: user.displayName,
      email: user.email,
      avatar: user.photoURL,
      uid: user.uid,
    }

    Cookies.set('access_token', token) // saving token in cookie for server rendering
    await dispatch('setUSER', userInfo)
    await dispatch('saveUID', userInfo.uid)
    console.log('[STORE ACTIONS] - in login, response:', status)
  },

  async logout({ commit, dispatch }) {
    console.log('[STORE ACTIONS] - logout')
    await this.$fireAuth.signOut()

    Cookies.remove('access_token')
    commit('SET_USER', null)
    commit('SAVE_UID', null)
  },

  saveUID({ commit }, uid) {
    console.log('[STORE ACTIONS] - saveUID')
    commit('SAVE_UID', uid)
  },

  setUSER({ commit }, user) {
    commit('SET_USER', user)
  },
}

export const mutations = {
  SET_USER(state, user) {
    state.user = user
  },

  SAVE_UID(state, uid) {
    state.uid = uid
  },
}
