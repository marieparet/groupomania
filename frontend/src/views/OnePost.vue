<template>
  <div>
    <div>
      <UserSearch />
      <Notifications />
      <ProfileButton />
    </div>

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
import ProfileButton from '../components/ProfileButton'
import UserSearch from '../components/UserSearch'
import Notifications from '../components/Notifications'

export default {
  name: 'OnePost',
  components: {
    Post,
    ProfileButton,
    UserSearch,
    Notifications
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
