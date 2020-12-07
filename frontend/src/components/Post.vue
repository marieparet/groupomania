<template>
  <div>
    <b-card
      class="w-50 mx-auto my-3 border-0 shadow p-3 mb-5 mt-3 bg-white rounded"
    >
      <div class="d-flex align-items-center">
        <ProfileImage :src="post.User.imageUrl" customClass="profile-picture" />
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
        <button
          @click="likeOrUnlikePost"
          class="react-btn footer-btn btn-block"
        >
          <svg
            v-if="likesThisPost"
            version="1.1"
            id="Capa_1"
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            x="0px"
            y="0px"
            viewBox="0 0 512 512"
            style="enable-background:new 0 0 512 512;"
            xml:space="preserve"
            class="thumbs-up"
            fill="rgb(32, 120, 244)"
          >
            <g>
              <g>
                <path
                  d="M53.333,224C23.936,224,0,247.936,0,277.333V448c0,29.397,23.936,53.333,53.333,53.333h64
			c12.011,0,23.061-4.053,32-10.795V224H53.333z"
                />
              </g>
            </g>
            <g>
              <g>
                <path
                  d="M512,304c0-12.821-5.077-24.768-13.888-33.579c9.963-10.901,15.04-25.515,13.653-40.725
			c-2.496-27.115-26.923-48.363-55.637-48.363H324.352c6.528-19.819,16.981-56.149,16.981-85.333c0-46.272-39.317-85.333-64-85.333
			c-22.165,0-37.995,12.48-38.677,12.992c-2.517,2.027-3.989,5.099-3.989,8.341v72.341l-61.44,133.099l-2.56,1.301v228.651
			C188.032,475.584,210.005,480,224,480h195.819c23.232,0,43.563-15.659,48.341-37.269c2.453-11.115,1.024-22.315-3.861-32.043
			c15.765-7.936,26.368-24.171,26.368-42.688c0-7.552-1.728-14.784-5.013-21.333C501.419,338.731,512,322.496,512,304z"
                />
              </g>
            </g>
          </svg>
          <svg
            v-else
            enable-background="new 0 0 512 512"
            viewBox="0 0 512 512"
            xmlns="http://www.w3.org/2000/svg"
            class="thumbs-up"
            fill="currentColor"
          >
            <path
              d="m512 304c0-12.821-5.099-24.768-13.888-33.579 9.963-10.901 15.04-25.515 13.653-40.725-2.496-27.115-26.923-48.363-55.637-48.363h-131.776c6.528-19.819 16.981-56.149 16.981-85.333 0-46.272-39.317-85.333-64-85.333-22.144 0-37.995 12.48-38.656 12.992-2.539 2.027-4.011 5.099-4.011 8.341v72.341l-61.461 133.099-2.539 1.301v-4.075c0-5.888-4.779-10.667-10.667-10.667h-106.666c-29.418.001-53.333 23.916-53.333 53.334v170.667c0 29.419 23.915 53.333 53.333 53.333h64c23.061 0 42.773-14.72 50.197-35.264 17.75 9.131 41.643 13.931 56.47 13.931h195.819c23.232 0 43.563-15.659 48.341-37.248 2.453-11.136 1.024-22.336-3.84-32.064 15.744-7.915 26.347-24.192 26.347-42.688 0-7.552-1.728-14.784-4.992-21.312 15.744-7.936 26.325-24.192 26.325-42.688zm-44.992 26.325c-4.117.491-7.595 3.285-8.917 7.232-1.301 3.947-.213 8.277 2.816 11.136 5.419 5.099 8.427 11.968 8.427 19.307 0 13.461-10.176 24.768-23.637 26.325-4.117.491-7.595 3.285-8.917 7.232-1.301 3.947-.213 8.277 2.816 11.136 7.019 6.613 9.835 15.893 7.723 25.451-2.624 11.904-14.187 20.523-27.499 20.523h-195.82c-17.323 0-46.379-8.128-56.448-18.219-3.051-3.029-7.659-3.925-11.627-2.304-3.989 1.643-6.592 5.547-6.592 9.856 0 17.643-14.357 32-32 32h-64c-17.643 0-32-14.357-32-32v-170.667c0-17.643 14.357-32 32-32h96v10.667c0 3.691 1.92 7.125 5.077 9.088 3.115 1.877 7.04 2.069 10.368.448l21.333-10.667c2.155-1.067 3.883-2.859 4.907-5.056l64-138.667c.64-1.408.981-2.944.981-4.48v-68.885c4.438-2.453 12.14-5.781 21.334-5.781 11.691 0 42.667 29.056 42.667 64 0 37.547-20.437 91.669-20.629 92.203-1.237 3.264-.811 6.955 1.173 9.856 2.005 2.88 5.291 4.608 8.789 4.608h146.795c17.792 0 32.896 12.736 34.389 28.992 1.131 12.16-4.715 23.723-15.189 30.187-3.264 2.005-5.205 5.632-5.056 9.493s2.368 7.317 5.781 9.088c9.024 4.587 14.613 13.632 14.613 23.573.001 13.461-10.175 24.768-23.658 26.325z"
            />
            <path
              d="m160 245.333c-5.888 0-10.667 4.779-10.667 10.667v192c0 5.888 4.779 10.667 10.667 10.667s10.667-4.779 10.667-10.667v-192c0-5.888-4.779-10.667-10.667-10.667z"
            />
          </svg>

          <span :class="`ml-2 ${likesThisPost ? 'blue' : ''}`">J'aime</span>
        </button>
        <button
          class="react-btn footer-btn btn-block"
          @click="focusInput(post)"
        >
          <b-icon icon="chat-left"></b-icon>
          <span class="ml-2">Commenter</span>
        </button>
      </div>
      <div class="line mb-3"></div>
      <CommentsList :post="post" />
    </b-card>
  </div>
</template>

<script>
import { apiClient } from '../services/ApiClient'
import router from '../router/index'
import { mapState, mapActions } from 'vuex'
import EditPost from '../components/EditPost'
import ProfileImage from './ProfileImage'
import CommentsList from '../components/CommentsList'

export default {
  name: 'Post',
  components: {
    EditPost,
    ProfileImage,
    CommentsList
  },
  props: ['post'],
  async mounted () {
    const res = await apiClient.get(`api/posts/${this.post.id}/likes`)
    this.likesThisPost = res.like
  },
  data () {
    return {
      likesThisPost: false
    }
  },
  methods: {
    async likeOrUnlikePost () {
      const res = await apiClient.post(`api/posts/${this.post.id}/likes`)
      this.likesThisPost = res.like
    },
    displayNotification (text) {
      this.$bvToast.toast(text, {
        title: 'Notification',
        autoHideDelay: 4000
      })
    },
    focusInput () {
      document.getElementById(`comment-area-${this.post.id}`).focus()
    }
  }
}
</script>

<style lang="scss">
.profile-picture {
  width: 50px;
  height: 50px;
  border-radius: 100%;
  margin-bottom: 1rem;
  margin-right: 1rem;
}

.btn-block + .btn-block {
  margin-top: 2px;
}

.line {
  display: block;
  width: 100%;
  height: 1px;
  background-color: rgba(192, 192, 192, 0.5);
}

.thumbs-up {
  height: 23px;
}

.blue {
  color: rgb(32, 120, 244);
}
.react-btn {
  background: white;
  border: none;
  margin: 3px;
  color: #747474;
  border-radius: 0.25rem;
  font-weight: bold;
  padding: 0.375rem 0.75rem;
  &:focus {
    border: none !important;
    outline: none !important;
  }
  &:hover {
    color: #747474 !important;
    background-color: rgba(108, 117, 125, 0.1) !important;
  }
}
</style>
