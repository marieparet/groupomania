<template>
  <div>
    <b-row class="justify-content-center">
      <b-col cols="12" v-for="post in posts.list" :key="post.id">
        <Post :post="post" />
      </b-col>

      <b-button
        v-on:click="loadMore(queryParams)"
        v-if="!posts.isOnLastPage || posts.list.length"
        class="load-btn d-block"
      >
        <span>Charger plus</span>
      </b-button>
    </b-row>

    <p class="mx-2">{{ posts.errorMessage }}</p>
  </div>
</template>

<script>
import router from '../router/index'
import { mapState, mapActions } from 'vuex'
import Post from '../components/Post'

export default {
  name: 'PostsList',
  components: {
    Post
  },
  props: ['userId'],

  async mounted () {
    await this.initializePostStore(this.queryParams)
  },
  methods: {
    ...mapActions(['initializePostStore', 'loadMore'])
  },
  computed: {
    ...mapState(['posts']),
    queryParams () {
      if (this.userId) {
        return { userId: this.userId }
      } else {
        return {}
      }
    }
  }
}
</script>

<style lang="scss">
.post {
  display: block;
  overflow: hidden;
  width: 100%;
  height: 350px;
  &__image {
    max-width: 100%;
    max-height: 100%;
    &:focus {
      outline: none;
    }
  }
}

.load-btn {
  background-color: rgba(253, 45, 6, 0.8);
  color: white;
  border-radius: 1rem;
  &:hover {
    background-color: rgb(253, 45, 6) !important;
    color: white !important;
  }
}
</style>
