<template>
  <div id="posts">
    <ProfileButton />

    <b-row class="align-items-center text-center justify-content-center">
      <b-col cols="12" lg="6">
        <b-card
          class="mx-auto mt-3 mb-5 border-0 shadow px-lg-3 pt-lg-4 bg-white rounded"
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
.card-body {
  padding-bottom: 0;
}

@media screen and (min-width: 280px) and (max-width: 769px) {
  .card-body {
    padding: 0.7rem;
  }

  .shadow {
    box-shadow: 0rem 0.2rem 0.5rem rgba(0, 0, 0, 0.08) !important;
  }
}

.row {
  margin-left: 0;
  margin-right: 0;
}
</style>
