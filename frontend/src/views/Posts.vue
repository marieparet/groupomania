<template>
  <div id="posts">
    <h1>Bienvenue sur {{ companyName }}</h1>
    <p>
      Voici la liste des publications
    </p>

    <p class="mx-2">{{ errorMessage }}</p>
  </div>
</template>

<script>
import { apiClient } from '../services/ApiClient'
import router from '../router/index'
import { mapState } from 'vuex'

export default {
  name: 'Posts',
  data () {
    return {
      errorMessage: ''
    }
  },
  props: {},
  methods: {
    displayPosts () {
      apiClient.get('api/posts').catch(error => {
        console.log({ error: error })
        this.errorMessage = 'Problème de connexion'
      })
    }
  },
  computed: {
    ...mapState({
      companyName: 'companyName'
    })
  }
}
</script>

<style scoped>
#posts {
  background-color: #ffffff;
  border: 1px solid #cccccc;
  padding: 20px;
  margin-top: 10px;
}
</style>
