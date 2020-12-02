<template>
  <div>
    <b-row class="justify-content-center">
      <b-col cols="12" v-for="post in posts.list" :key="post.id">
        <b-card
          class="w-50 mx-auto my-3 border-0 shadow p-3 mb-5 mt-3 bg-white rounded"
        >
          <div class="d-flex align-items-center">
            <ProfileImage
              :src="post.User.imageUrl"
              customClass="profile-picture"
            />
            <div class="text-left">
              <p class="font-weight-bold mb-0">
                {{ post.User.firstName }} {{ post.User.lastName }}
              </p>
              <p class="text-secondary">
                {{
                  moment(post.createdAt)
                    .locale('fr')
                    .format('LL')
                }}
              </p>
            </div>
          </div>
          <EditPost @displayNotification="displayNotification" :post="post" />

          <b-card-text class="text-left mt-3">{{ post.content }}</b-card-text>

          <span class="post justify-content-center">
            <img class="post__image" :src="post.imageUrl" />
          </span>

          <div class="line mt-5"></div>
          <div class="footer d-flex justify-content-around">
            <b-button block class="footer-btn">
              <b-icon icon="hand-thumbs-up"></b-icon>
              <span class="ml-2">J'aime</span>
            </b-button>
            <b-button block class="footer-btn" @click="focusInput()">
              <b-icon icon="chat-left"></b-icon>
              <span class="ml-2">Commenter</span>
            </b-button>
          </div>
          <div class="line mb-3"></div>
          <div class="d-flex align-items-center">
            <ProfileImage
              :src="post.Comments.imageUrl"
              customClass="profile-picture"
            />
            <div id="comments" class="mb-3 text-left">Ici les commentaires</div>
          </div>
          <div class="d-flex align-items-center">
            <ProfileImage
              :src="post.User.imageUrl"
              customClass="profile-picture"
            />
            <b-form-group class="w-100">
              <b-form-textarea
                id="comment-area"
                class=" border-0"
                type="text"
                placeholder="Écrivez un commentaire ici..."
              >
              </b-form-textarea
            ></b-form-group>
          </div>
        </b-card>
      </b-col>

      <b-button
        v-on:click="loadMore(queryParams)"
        v-if="!posts.isOnLastPage || posts.list.length"
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
    },
    focusInput () {
      document.getElementById('comment-area').focus()
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
    max-width: 100%;
    max-height: 100%;
  }
}

.profile-picture {
  width: 50px;
  height: 50px;
  border-radius: 100%;
  margin-bottom: 1rem;
  margin-right: 1rem;
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

#comment-area,
#comments {
  background-color: rgba(108, 117, 125, 0.1);
}

#comments {
  padding: 0.375rem 0.75rem;
  border-radius: 0.25rem;
}
</style>
