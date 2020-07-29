// Functional module for user profile and authentication

import Cookies from 'js-cookie'

export const state = () => ({
  user: null,
  uid: null,
  name: null,
  about: null,
  avatar: null,
  events: null,
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

  profile(state) {
    return {
      uid: state.uid,
      name: state.name,
      about: state.about,
      avatar: state.avatar,
      events: state.events,
    }
  },
}

export const actions = {
  // sets user information on login or signup
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

    Cookies.remove('access_token') // removes access token cookie
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

  // Updates user profile document with username
  async setUserName({ commit, state }, name) {
    const docRef = this.$fireStore.collection('user').doc(state.uid)
    try {
      await docRef.set(
        {
          name,
        },
        { merge: true }
      )
      commit('SET_USER_NAME', name)
    } catch (e) {
      return e
    }
  },

  async getProfile({ commit, state }) {
    const docRef = this.$fireStore.collection('user').doc(state.user.uid)
    try {
      const doc = await docRef.get()

      commit('SET_PROFILE', {
        name: doc.data().name,
        about: doc.data().about || null,
        avatar: doc.data().avatar || null,
      })
    } catch (e) {
      return e
    }
  },
}

export const mutations = {
  SET_USER(state, user) {
    state.user = user
  },

  SAVE_UID(state, uid) {
    state.uid = uid
  },

  SET_USER_NAME(state, name) {
    state.name = name
  },

  SET_PROFILE(state, profile) {
    state.name = profile.name
    state.about = profile.about
    state.avatar = profile.avatar
  },
}
