<template>
  <div>
    <b-row class="text-center justify-content-center">
      <b-col cols="12" v-for="post in posts.list" :key="post.id">
        <b-card
          class="w-50 mx-auto my-3 border-0 shadow p-3 mb-5 mt-3 bg-white rounded"
        >
          <p>
            {{ post.User.firstName }}
          </p>
          <ProfileImage :src="post.User.imageUrl" />
          <EditPost @displayNotification="displayNotification" :post="post" />

          <span class="post justify-content-center">
            <img class="post__image" :src="post.imageUrl" />
          </span>

          <b-card-text>{{ post.content }}</b-card-text>

          <div class="line mt-5"></div>
          <div class="footer d-flex justify-content-around">
            <b-button block class="footer-btn">
              <b-icon icon="hand-thumbs-up"></b-icon>
              <span class="ml-2">J'aime</span>
            </b-button>
            <b-button block class="footer-btn">
              <b-icon icon="chat-left"></b-icon>
              <span class="ml-2">Commenter</span>
            </b-button>
          </div>
          <div class="line"></div>
        </b-card>
      </b-col>

      <b-button
        v-on:click="loadMore(queryParams)"
        v-if="!posts.isOnLastPage"
        variant="danger"
        class="d-block"
      >
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
import EditPost from '../components/EditPost'
import PostsList from '../components/PostsList'
import ProfileImage from './ProfileImage'

export default {
  name: 'Posts',
  components: {
    EditPost,
    PostsList,
    ProfileImage
  },
  props: ['userId'],
  data () {
    return {
      userData: JSON.parse(localStorage.getItem('userData'))
    }
  },
  async mounted () {
    await this.initializePostStore(this.queryParams)
  },
  methods: {
    ...mapActions(['initializePostStore', 'loadMore']),
    displayNotification (text) {
      this.$bvToast.toast(text, {
        title: 'Notification',
        autoHideDelay: 4000
      })
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
