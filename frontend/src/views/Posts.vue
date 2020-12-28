<template>
  <div id="posts">
    <Menu />

    <b-row class="align-items-center text-center justify-content-center">
      <b-col cols="12" lg="6">
        <b-card
          class="mx-auto mb-2 mt-lg-3 mb-lg-5 border-0 shadow px-lg-3 pt-lg-4 bg-white rounded"
        >
          <CreatePost />
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
import Menu from '../components/Menu'

export default {
  name: 'Posts',
  components: {
    CreatePost,
    PostsList,
    Menu
  },
  data () {
    return {
      userData: JSON.parse(localStorage.getItem('userData'))
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
