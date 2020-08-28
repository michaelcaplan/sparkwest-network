// Functional module for event querying
export const state = () => ({
  events: [],
  monthEvents: [],
  userEvents: [],
  likedEvents: [],
})

export const getters = {
  events(state) {
    return state.events
  },
  monthEvents(state) {
    return state.monthEvents
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

  // Formats fetched events into arrays of weeks
  formatMonth({ commit }, { events, date }) {
    // Create array of week start and end dates
    const weekNums = []

    const lengthOfMonth = new Date(date.year, date.month + 1, 0).getDate()
    const startOfMonth = new Date(date.year, date.month, 1).getDay()
    const endOfMonth = new Date(date.year, date.month, lengthOfMonth).getDay()

    // Number of weeks in the month
    const weekCount = Math.ceil(
      (startOfMonth + new Date(date.year, date.month + 1, 0).getDate()) / 7
    )

    // Iterate through month
    for (let i = 0; i < weekCount; i++) {
      // First week of month
      if (i === 0)
        weekNums.push({ start: i * 7 + 1, end: (i + 1) * 7 - startOfMonth })
      // Last week of month
      else if (i === weekCount - 1)
        weekNums.push({
          start: lengthOfMonth - endOfMonth,
          end: lengthOfMonth,
        })
      // Intermediate weeks of month
      else
        weekNums.push({
          start: weekNums[i - 1].end + 1,
          end: weekNums[i - 1].end + 7,
        })
    }

    // Filter events into month
    const month = []

    weekNums.forEach((weekNum) => {
      const week = events.filter((event) => {
        return event.data.day >= weekNum.start && event.data.day <= weekNum.end
      })

      month.push(week)
    })

    commit('SET_MONTH_EVENTS', month)
  },
}

export const mutations = {
  SET_EVENTS(state, data) {
    state.events = data
  },
  SET_MONTH_EVENTS(state, data) {
    state.monthEvents = data
  },
  SET_USER_EVENTS(state, data) {
    state.userEvents = data
  },
  SET_LIKED_EVENTS(state, data) {
    state.likedEvents = data
  },
}
