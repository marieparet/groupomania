<template>
  <div id="posts">
    <div>
      <UserSearch />
      <Notifications />
      <ProfileButton />
    </div>

    <b-row class="align-items-center text-center justify-content-center">
      <b-col cols="12" lg="6">
        <b-card
          class="mx-auto mb-2 mt-lg-3 mb-lg-5 border-0 shadow px-lg-3 pt-lg-4 bg-white rounded"
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
import router from '../router/index'
import { mapState, mapActions } from 'vuex'
import CreatePost from '../components/CreatePost'
import PostsList from '../components/PostsList'
import ProfileButton from '../components/ProfileButton'
import UserSearch from '../components/UserSearch'
import Notifications from '../components/Notifications'

export default {
  name: 'Posts',
  components: {
    CreatePost,
    PostsList,
    ProfileButton,
    UserSearch,
    Notifications
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
    padding-bottom: 0;
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
