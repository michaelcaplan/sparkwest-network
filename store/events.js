// Functional module for event querying
export const state = () => ({
  events: [],
  userEvents: [],
  likedEvents: [],
})

export const getters = {
  events(state) {
    return state.events
  },
  userEvents(state) {
    return state.userEvents
  },
  likedEvents(state) {
    return state.likedEvents
  },
}

export const actions = {
  async getUserEvents({ commit }, uid) {
    try {
      const query = this.$fireStore
        .collection('events')
        .where('authorID', '==', uid)
        .orderBy('uploaded', 'desc')

      const snap = await query.get()

      const docs = snap.docs.map(async (doc) => {
        if (doc.data().imageRef) {
          const imageRef = this.$fireStorage.ref().child(doc.data().imageRef)
          const url = await imageRef.getDownloadURL()

          return {
            id: doc.id,
            data: doc.data(),
            image: url,
          }
        } else {
          return {
            id: doc.id,
            data: doc.data(),
            image: false,
          }
        }
      })

      const events = await Promise.all(docs)
      commit('SET_USER_EVENTS', events)
    } catch (e) {
      console.error(e)
    }
  },

  async getLikedEvents({ commit }, uid) {
    try {
      const query = this.$fireStore
        .collection('events')
        .where('likes', 'array-contains', uid)
        .orderBy('uploaded', 'desc')

      const snap = await query.get()

      const docs = snap.docs.map(async (doc) => {
        if (doc.data().imageRef) {
          const imageRef = this.$fireStorage.ref().child(doc.data().imageRef)
          const url = await imageRef.getDownloadURL()

          return {
            id: doc.id,
            data: doc.data(),
            image: url,
          }
        } else {
          return {
            id: doc.id,
            data: doc.data(),
            image: false,
          }
        }
      })

      const events = await Promise.all(docs)
      commit('SET_LIKED_EVENTS', events)

      return events
    } catch (e) {
      console.error(e)

      return null
    }
  },

  async getMonthEvents({ commit, dispatch }, date, getImages = false) {
    try {
      console.log('getting events')
      const docRef = this.$fireStore
        .collection('events')
        .where('year', '==', date.year)
        .where('month', '==', date.month)
        .orderBy('day')

      const snap = await docRef.get()

      if (getImages) {
        dispatch('getEventImages', snap)
      } else {
        const events = snap.docs.map((doc) => {
          return {
            id: doc.id,
            data: doc.data(),
            image: false,
          }
        })

        commit('SET_EVENTS', events)
      }
    } catch (e) {
      console.error(e)
    }
  },

  async getEventImages({ commit }, snap) {
    try {
      const docs = snap.docs.map(async (doc) => {
        if (doc.data().imageRef) {
          const imageRef = this.$fireStorage.ref().child(doc.data().imageRef)
          const url = await imageRef.getDownloadURL()

          return {
            id: doc.id,
            data: doc.data(),
            image: url,
          }
        } else {
          return {
            id: doc.id,
            data: doc.data(),
            image: false,
          }
        }
      })

      const events = await Promise.all(docs)
      commit('SET_USER_EVENTS', events)
    } catch (e) {
      console.error(e)
    }
  },
}

export const mutations = {
  SET_EVENTS(state, data) {
    state.events = data
  },
  SET_USER_EVENTS(state, data) {
    state.userEvents = data
  },
  SET_LIKED_EVENTS(state, data) {
    state.likedEvents = data
  },
}
