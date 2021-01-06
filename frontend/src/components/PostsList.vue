<template>
  <div>
    <b-row class="row justify-content-center align-items-center flex-column">
      <b-col cols="12" lg="6" v-for="post in posts.list" :key="post.id">
        <Post :post="post" />
      </b-col>
    </b-row>

    <p class="mx-2">{{ posts.errorMessage }}</p>
  </div>
</template>

<script>
import router from '../router/index'
import { mapState, mapActions } from 'vuex'
import Post from './Post'

export default {
  name: 'PostsList',
  components: {
    Post
  },
  props: ['userId'],

  async mounted () {
    await this.initializePostStore(this.queryParams)
  },

  created () {
    window.addEventListener('scroll', this.handleScroll)
  },
  destroyed () {
    window.removeEventListener('scroll', this.handleScroll)
  },

  methods: {
    ...mapActions(['initializePostStore', 'loadMore']),

    handleScroll (event) {
      const totalHeight = document.documentElement.scrollHeight
      const scrollHeight = window.scrollY + window.innerHeight
      const remainingOffset = totalHeight - scrollHeight

      if (remainingOffset < 300) {
        this.loadMore(this.queryParams)
      }
    }
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

@media screen and (min-width: 280px) and (max-width: 769px) {
  .post {
    height: 230px;
  }
}
</style>
