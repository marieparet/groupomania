import Vue from 'vue'
import Vuex from 'vuex'
import posts from './posts'
import notificationAlert from './notification-alert'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    companyName: 'Groupomania'
  },
  mutations: {},
  actions: {},
  modules: {
    posts,
    notificationAlert
  }
})
