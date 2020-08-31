// Functional module for event querying
export const state = () => ({
  events: [],
  monthEvents: [],
  userEvents: [],
  likedEvents: [],
  topEvents: [],
  profileEvents: [],
  profileLikes: [],
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
  topEvents(state) {
    return state.topEvents
  },
  profileEvents(state) {
    return state.profileEvents
  },
  profileLikes(state) {
    return state.profileLikes
  },
}

// Gets all of a users posted events
export const actions = {
  async getUserEvents(
    { commit, dispatch },
    { uid, isUser = true, getImages = false }
  ) {
    try {
      const query = this.$fireStore
        .collection('events')
        .where('authorID', '==', uid)
        .orderBy('uploaded', 'desc')

      const snap = await query.get()

      if (getImages) {
        dispatch('getEventImages', { snap, isUser })
      } else {
        const events = snap.docs.map((doc) => {
          return {
            id: doc.id,
            data: doc.data(),
            image: false,
          }
        })

        if (isUser) commit('SET_USER_EVENTS', events)
        else commit('SET_PROFILE_EVENTS', events)
      }
    } catch (e) {
      console.error(e)
    }
  },

  // Get all of a users liked events
  async getLikedEvents(
    { commit, dispatch },
    { uid, isUser = true, getImages = false }
  ) {
    try {
      const query = this.$fireStore
        .collection('events')
        .where('likes', 'array-contains', uid)
        .orderBy('uploaded', 'desc')

      const snap = await query.get()

      if (getImages) {
        dispatch('getEventImages', { snap, isUser })
      } else {
        const events = snap.docs.map((doc) => {
          return {
            id: doc.id,
            data: doc.data(),
            image: false,
          }
        })

        if (isUser) commit('SET_LIKED_EVENTS', events)
        else commit('SET_PROFILE_LIKED_EVENTS', events)
      }
    } catch (e) {
      console.error(e)
    }
  },

  // Gets all events for a month
  async getMonthEvents({ commit, dispatch }, { date, getImages = false }) {
    try {
      const docRef = this.$fireStore
        .collection('events')
        .where('year', '==', date.year)
        .where('month', '==', date.month)
        .orderBy('day')

      const snap = await docRef.get()

      if (getImages) {
        dispatch('getEventImages', { snap })
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

  // Gets top events with with most likes of the month
  getTopEvents({ commit, state }) {
    const events = state.events.sort((a, b) => {
      if (a.data.likes.length < b.data.likes.length) return 1
      if (a.data.likes.length > b.data.likes.length) return -1
      return 0
    })

    commit('SET_TOP_EVENTS', events.slice(0, 3))
  },

  // Takes firebase query snapshot and returns array of event objects with image urls
  async getEventImages({ commit }, { snap, isUser = true }) {
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

      if (isUser) commit('SET_USER_EVENTS', events)
      else commit('SET_PROFILE_EVENTS', events)
    } catch (e) {
      console.error(e)
    }
  },

  // Formats fetched events into arrays of weeks [LEGACY]
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
  SET_TOP_EVENTS(state, data) {
    state.topEvents = data
  },
  SET_PROFILE_EVENTS(state, data) {
    state.profileEvents = data
  },
  SET_PROFILE_LIKED_EVENTS(state, data) {
    state.profileLikes = data
  },
}
