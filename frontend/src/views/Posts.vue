<template>
  <div id="posts">
    <h1>Bienvenue sur {{ companyName }} !</h1>

    <b-row class="text-center justify-content-center">
      <b-col cols="12" v-for="post in posts">
        <b-card
          class="w-50 mx-auto my-3 border-0 shadow p-3 mb-5 mt-3 bg-white rounded"
        >
          <span class="post justify-content-center">
            <img class="post__image" :src="post.imageUrl" />
          </span>

          <b-card-body>
            <b-card-text>{{ post.content }}</b-card-text>
          </b-card-body>
        </b-card>
      </b-col>
    </b-row>

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
      errorMessage: '',
      posts: []
    }
  },
  beforeMount () {
    apiClient
      .get('api/posts')
      .then(response => (this.posts = response.posts))
      .catch(error => {
        console.log({ error: error })
        this.errorMessage = 'Problème de connexion'
      })
  },
  computed: {
    ...mapState({
      companyName: 'companyName'
    })
  }
}
</script>

<style lang="scss">
h1 {
  font-size: 1.7rem;
}

.post {
  display: block;
  overflow: hidden;
  width: 100%;
  height: 300px;
  &__image {
    max-width: 200px;
  }
}
</style>
