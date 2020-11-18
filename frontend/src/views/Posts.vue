<template>
  <div id="posts">
    <h1 class="mb-4">Bienvenue sur {{ companyName }} !</h1>
    <p>Bonjour {{ userData.firstName }} ! Voici les nouveautés du jour :</p>

    <b-row class="text-center justify-content-center">
      <b-col cols="12" v-for="post in posts">
        <b-card
          class="w-50 mx-auto my-3 border-0 shadow p-3 mb-5 mt-3 bg-white rounded"
        >
          <b-button
            v-if="post.userId == userData.id"
            v-on:click="deletePost(post.id)"
            id="remove-button"
            class="close d-block remove-button position-absolute"
            data-dismiss="alert"
            aria-label="Supprimer"
          >
            <span>×</span>
          </b-button>

          <span class="post justify-content-center">
            <img class="post__image" :src="post.imageUrl" />
          </span>

          <b-card-body>
            <b-card-text>{{ post.content }}</b-card-text>
          </b-card-body>
        </b-card>
      </b-col>
      <p class="mx-2 text-success">{{ messageAlert }}</p>
    </b-row>

    <p class="mx-2">{{ errorMessage }}</p>
  </div>
</template>

<script>
import { apiClient } from '../services/ApiClient'
import Signup from '../components/Signup'
import router from '../router/index'
import { mapState } from 'vuex'

export default {
  name: 'Posts',
  data () {
    return {
      errorMessage: '',
      messageAlert: '',
      posts: [],
      userData: JSON.parse(localStorage.getItem('userData'))
    }
  },
  beforeMount () {
    this.fetchPosts()
  },
  methods: {
    fetchPosts () {
      apiClient
        .get('api/posts')
        .then(response => (this.posts = response.posts))
        .catch(error => {
          console.log({ error: error })
          this.errorMessage = 'Problème de connexion'
        })
    },
    deletePost (postId) {
      apiClient
        .delete('api/posts/' + postId)
        .then(response => (this.messageAlert = response.message))
        .then(() => this.fetchPosts())
        .catch(error => {
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

#remove-button {
  top: 0;
  right: 0;
  margin: 7px 7px;
}
</style>
