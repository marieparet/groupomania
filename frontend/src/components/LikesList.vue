<template>
  <div>
    <button
      v-b-modal="`modal-likes-${post.id}`"
      @click="fetchLikesList"
      v-if="likesCount > 0"
      class="like-btn d-flex align-items-center my-2 mt-lg-0 mb-lg-3 ml-2 text-left"
      aria-label="Afficher les likes"
    >
      <div
        class="svg-container d-flex justify-content-center align-items-center"
      >
        <svg style="width:17px;height:17px" viewBox="0 0 24 24">
          <path
            fill="#fff"
            d="M23,10C23,8.89 22.1,8 21,8H14.68L15.64,3.43C15.66,3.33 15.67,3.22 15.67,3.11C15.67,2.7 15.5,2.32 15.23,2.05L14.17,1L7.59,7.58C7.22,7.95 7,8.45 7,9V19A2,2 0 0,0 9,21H18C18.83,21 19.54,20.5 19.84,19.78L22.86,12.73C22.95,12.5 23,12.26 23,12V10M1,21H5V9H1V21Z"
          />
        </svg>
      </div>
      <span class="likes-number ml-2">{{ likesCount }}</span>
    </button>
    <b-modal :id="`modal-likes-${post.id}`" :title="`${likesCount} J'aime`">
      <div v-for="like in likesList">
        <router-link
          :to="{ name: 'UserProfile', params: { userId: like.User.id } }"
          ><div class="d-flex align-items-center">
            <div class="d-flex text-center">
              <ProfileImage
                :src="like.User.imageUrl"
                customClass="like-profile-picture"
                divCustomClass="div-like-picture"
              />
            </div>
            <p>{{ like.User.firstName }} {{ like.User.lastName }}</p>
          </div></router-link
        >
      </div>
      <div slot="modal-footer"></div>
    </b-modal>
  </div>
</template>

<script>
import { apiClient } from '../services/ApiClient'
import ProfileImage from './ProfileImage'

export default {
  name: 'LikesList',
  components: {
    ProfileImage
  },
  props: ['post', 'likesCount'],
  data () {
    return {
      likesList: []
    }
  },
  methods: {
    async fetchLikesList () {
      const res = await apiClient.get(`api/posts/${this.post.id}/likes`)
      this.likesList = res.allLikes
    }
  }
}
</script>

<style lang="scss">
a {
  text-decoration: none;
  color: #212529;
  &:hover,
  &:visited {
    color: #212529;
    text-decoration: underline;
  }
}

.like-btn {
  background-color: transparent;
  border: none;
  &:focus {
    outline: none;
  }
}

.modal-body {
  padding: 1rem 1rem 0 1rem;
}

.modal-title {
  color: #747474;
  font-size: 16px;
}

.modal-content {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  border: none;
  box-shadow: 0px 1px 5px 4px rgba(204, 204, 204, 0.2);
}
.modal-backdrop {
  background-color: rgba(108, 117, 125, 0.2);
}

.modal-footer {
  padding: 0;
  border-top: none;
}

.likes-number {
  font-size: 14px;
}

@media screen and (min-width: 280px) and (max-width: 767px) {
  .modal-title {
    font-size: 14px;
  }

  .likes-number {
    font-size: 12px;
  }
}

.svg-container {
  border-radius: 100%;
  background-color: rgb(32, 120, 244);
  width: 25px;
  height: 25px;
}
.div-like-picture {
  width: 30px;
  height: 30px;
  margin-bottom: 1rem;
  margin-right: 0.7rem;
}

.like-profile-picture {
  height: 30px;
}
</style>
