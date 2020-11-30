<template>
  <div id="posts">
    <ProfileButton />

    <h1 class="mb-4">Bienvenue sur {{ companyName }} !</h1>

    <b-row class="text-center justify-content-center">
      <b-col cols="12">
        <b-card
          class="w-50 mx-auto my-3 border-0 shadow p-3 mb-5 mt-3 bg-white rounded"
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

.post {
  display: block;
  overflow: hidden;
  width: 100%;
  height: 300px;
  &__image {
    max-width: 200px;
  }
}

.footer-btn {
  margin: 2px;
  color: #747474;
  &:hover {
    color: #747474 !important;
  }
}
.btn-block + .btn-block {
  margin-top: 2px;
}

.line {
  display: block;
  width: 100%;
  height: 1px;
  background-color: #c0c0c0;
}
</style>
