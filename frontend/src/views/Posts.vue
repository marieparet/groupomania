<template>
  <div id="posts">
    <h1 class="mb-4">Bienvenue sur {{ companyName }} !</h1>

    <b-row class="text-center justify-content-center">
      <b-col cols="12">
        <b-card
          class="w-50 mx-auto my-3 border-0 shadow p-3 mb-5 mt-3 bg-white rounded"
          ><CreatePost @displayNotification="displayNotification"
        /></b-card>
      </b-col>
    </b-row>
    <b-row class="text-center justify-content-center">
      <b-col cols="12" v-for="post in posts.list" :key="post.id">
        <b-card
          class="w-50 mx-auto my-3 border-0 shadow p-3 mb-5 mt-3 bg-white rounded"
        >
          <PostButton @displayNotification="displayNotification" :post="post" />

          <span class="post justify-content-center">
            <img class="post__image" :src="post.imageUrl" />
          </span>

          <b-card-body>
            <b-card-text>{{ post.content }}</b-card-text>
          </b-card-body>
        </b-card>
      </b-col>
      <p class="mx-2 text-success">{{ posts.messageAlert }}</p>

      <b-button v-on:click="loadMore()" variant="danger" class="d-block">
        <span>Charger plus</span>
      </b-button>
    </b-row>

    <p class="mx-2">{{ posts.errorMessage }}</p>
  </div>
</template>

<script>
import { apiClient } from '../services/ApiClient'
import Signup from '../components/Signup'
import router from '../router/index'
import { mapState, mapActions } from 'vuex'
import PostButton from '../components/PostButton'
import CreatePost from '../components/CreatePost'

export default {
  name: 'Posts',
  components: {
    PostButton,
    CreatePost
  },
  data () {
    return {
      userData: JSON.parse(localStorage.getItem('userData'))
    }
  },
  async mounted () {
    await this.fetchPosts()
  },
  methods: {
    ...mapActions(['fetchPosts', 'loadMore']),
    displayNotification (text) {
      this.$bvToast.toast(text, {
        title: 'Notification',
        autoHideDelay: 4000
      })
    }
  },
  computed: {
    ...mapState(['companyName', 'posts'])
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
