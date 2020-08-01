// Functional module for user profile and authentication

import Cookies from 'js-cookie'

export const state = () => ({
  user: null,
  uid: null,
  loggedIn: false,
  name: null,
  about: null,
  avatar: null,
  avatarUrl: null,
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
      avatarUrl: state.avatarUrl,
      events: state.events,
    }
  },
}

export const actions = {
  setUser({ commit }, user) {
    commit('SET_USER', user)
  },

  async getAvatarUrl({ commit, state }) {
    try {
      const path = state.avatar
      if (path) {
        const url = await this.$fireStorage.ref().child(path).getDownloadURL()
        commit('SET_AVATAR_URL', url)
      }
    } catch (e) {
      console.error(e)
    }
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
      commit('LOGOUT')
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

  async getProfile({ commit, state, dispatch }, uid) {
    try {
      const response = await this.$fireStore
        .collection('profiles')
        .doc(uid)
        .get()
      commit('SET_PROFILE', response.data())

      if (state.avatar) {
        await dispatch('getAvatarUrl')
      }
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

  async uploadImage({ commit, state, dispatch }, file) {
    try {
      const folder = state.user.uid || state.user.user_id
      const path = 'profiles/' + folder + '/avatar.png'
      console.log(path)

      const storageRef = this.$fireStorage.ref().child(path)
      const docRef = this.$fireStore.collection('profiles').doc(folder)

      await storageRef.put(file)
      await docRef.update({
        avatar: path,
      })

      commit('SET_PROFILE', {
        name: state.name,
        about: state.about,
        avatar: path,
      })

      await dispatch('getAvatarUrl')
    } catch (e) {
      console.error(e)
    }
  },
}

export const mutations = {
  SET_USER(state, user) {
    state.user = user
  },

  SET_AVATAR_URL(state, url) {
    state.avatarUrl = url
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

  LOGOUT(state) {
    state.user = null
    state.uid = null
    state.loggedIn = false
    state.name = null
    state.about = null
    state.avatar = null
    state.avatarUrl = null
    state.events = null
  },
}
