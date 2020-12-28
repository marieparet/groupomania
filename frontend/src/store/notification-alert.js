export default {
  state: {
    message: ''
  },
  mutations: {
    ADD_NOTIFICATION (state, message) {
      state.message = message
    }
  },
  actions: {
    displayNotification ({ commit }, message) {
      commit('ADD_NOTIFICATION', message)
    }
  }
}
