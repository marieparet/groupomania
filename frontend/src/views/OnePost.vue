<template>
  <div>
    <Menu />

    <b-row class="row justify-content-center align-items-center flex-column">
      <b-col cols="12" lg="6">
        <Post v-if="post" :post="post" />
      </b-col>
    </b-row>
  </div>
</template>

<script>
import { apiClient } from '../services/ApiClient'
import router from '../router/index'
import Post from '../components/Post'
import Menu from '../components/Menu'

export default {
  name: 'OnePost',
  components: {
    Post,
    Menu
  },
  data () {
    return {
      post: null
    }
  },
  async mounted () {
    const res = await apiClient.get(`api/posts/${this.$route.params.postId}`)
    this.post = res.post
    console.log(this.post)
  },
  methods: {}
}
</script>

<style lang="scss"></style>
