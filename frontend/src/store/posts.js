import { apiClient } from '../services/ApiClient'

export default {
  state: {
    errorMessage: '',
    messageAlert: '',
    page: 1,
    isOnLastPage: false,
    list: []
  },
  mutations: {
    UPDATE_POSTS_LIST (state, posts) {
      state.list = posts
    },
    ERROR_MESSAGE (state, message) {
      state.message = message
    },
    INCREMENT_PAGE (state) {
      state.page++
    },
    REACHED_LAST_PAGE (state) {
      state.isOnLastPage = true
    },
    REMOVE_POST (state, postId) {
      state.list = state.list.filter(post => post.id !== postId)
    }
  },
  actions: {
    fetchPosts ({ state, commit }) {
      return apiClient
        .get(`api/posts?page=${state.page}`)
        .then(response => {
          if (response.posts) {
            commit('UPDATE_POSTS_LIST', state.list.concat(response.posts))
          }
        })
        .catch(() => {
          commit('ERROR_MESSAGE', 'Problème de connexion')
        })
    },
    async loadMore ({ state, commit, dispatch }) {
      if (state.isOnLastPage) return

      commit('INCREMENT_PAGE')
      const initialLength = state.list.length

      await dispatch('fetchPosts')

      if (state.list.length === initialLength) {
        commit('REACHED_LAST_PAGE')
      }
    },
    deletePost ({ state, commit }, postId) {
      apiClient
        .delete('api/posts/' + postId)
        .then(() => commit('REMOVE_POST', postId))
        .catch(error => {
          console.log({ error: error })
          commit('ERROR_MESSAGE', 'Problème de connexion')
        })
    }
  },
  modules: {}
}
