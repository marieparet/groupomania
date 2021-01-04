export default {
  state: {
    message: ''
  },
  mutations: {
    ADD_NOTIFICATION (state, message) {
      state.message = message
    },
    REMOVE_NOTIFICATION (state) {
      state.message = ''
    }
  },
  actions: {
    displayNotification ({ commit }, message) {
      commit('ADD_NOTIFICATION', message)
      setTimeout(() => commit('REMOVE_NOTIFICATION'), 3000)
    }
  }
}
