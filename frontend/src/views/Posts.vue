<template>
  <div id="posts">
    <ProfileButton />

    <b-row class="text-center justify-content-center">
      <b-col cols="12">
        <b-card
          class="w-50 mx-auto mt-3 mb-5 border-0 shadow px-3 pt-4 bg-white rounded"
        >
          <CreatePost @displayNotification="displayNotification" />
        </b-card>
      </b-col>
    </b-row>
    <PostsList />
  </div>
</template>

<script>
import { apiClient } from '../services/ApiClient'
import Signup from '../components/Signup'
import router from '../router/index'
import { mapState, mapActions } from 'vuex'
import EditPost from '../components/EditPost'
import CreatePost from '../components/CreatePost'
import PostsList from '../components/PostsList'
import ProfileButton from '../components/ProfileButton'

export default {
  name: 'Posts',
  components: {
    CreatePost,
    PostsList,
    ProfileButton
  },
  data () {
    return {
      userData: JSON.parse(localStorage.getItem('userData'))
    }
  },
  methods: {
    displayNotification (text) {
      this.$bvToast.toast(text, {
        title: 'Notification',
        autoHideDelay: 4000
      })
    }
  },
  computed: {
    ...mapState(['companyName'])
  }
}
</script>

<style lang="scss">
h1 {
  font-size: 1.7rem;
}

.card-body {
  padding-bottom: 0;
}

.row {
  margin-left: 0;
  margin-right: 0;
}
</style>
