// Functional module for user profile and authentication

import Cookies from 'js-cookie'

export const state = () => ({
  user: null,
  uid: null,
  loggedIn: false,
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
      user: state.user,
      name: state.name,
      about: state.about,
      avatar: state.avatar,
      events: state.events,
    }
  },
}

export const actions = {
  setUser({ commit }, user) {
    commit('SET_USER', user)
  },

  onAuthStateChanged({ commit, dispatch }) {
    this.$fireAuth.onAuthStateChanged(function (user) {
      if (user) {
        dispatch('getCurrentUser')
      } else {
        Cookies.remove('access_token')

        commit('SET_LOGGEDIN', false)
      }

      commit('SET_USER', user)
    })
  },

  getCurrentUser({ commit }) {
    this.$fireAuth.currentUser
      .getIdToken(true)
      .then((token) => Cookies.set('access_token', token))
    commit('SET_LOGGEDIN', true)
  },

  async logout({ commit }) {
    try {
      await this.$fireAuth.signOut()
      commit('SET_USER', null)
    } catch (error) {
      console.error(error)
    }
  },

  async createProfile({ commit, state }, name) {
    try {
      await this.$fireStore.collection('profiles').doc(state.user.uid).set({
        name,
      })
      commit('SET_PROFILE', { name })
    } catch (e) {
      console.error(e)
    }
  },

  async getProfile({ commit, state }, uid) {
    try {
      const response = await this.$fireStore
        .collection('profiles')
        .doc(uid)
        .get()
      commit('SET_PROFILE', response.data())
    } catch (e) {
      console.error(e)
    }
  },

  async updateProfile({ commit, state }, info) {
    try {
      const docRef = this.$fireStore
        .collection('profiles')
        .doc(state.user.uid || state.user.user_id)

      console.log(info)
      await docRef.update(info)

      const newInfo = {
        name: info.name || state.name,
        about: info.about || state.about,
        avatar: info.avatar || state.avatar,
      }
      commit('SET_PROFILE', newInfo)
    } catch (e) {
      console.error(e)
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

  SET_LOGGEDIN(state, value) {
    state.loggedIn = value
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
