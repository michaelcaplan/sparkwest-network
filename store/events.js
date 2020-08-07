// Functional module for event querying
export const state = () => ({
  events: [],
})

export const getters = {
  events(state) {
    return state.events
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
        const imageRef = this.$fireStorage.ref().child(doc.data().imageRef)
        const url = await imageRef.getDownloadURL()

        return {
          id: doc.id,
          data: doc.data(),
          image: url,
        }
      })

      const events = await Promise.all(docs)
      commit('SET_EVENTS', events)
    } catch (e) {
      console.error(e)
    }
  },
}

export const mutations = {
  SET_EVENTS(state, data) {
    state.events = data
  },
}
