<template>
  <div>
    <div class="d-flex align-items-center mt-3">
      <div class="d-flex mr-2 mb-2">
        <router-link :to="{ name: 'Profile' }">
          <ProfileImage
            :src="userData.imageUrl"
            customClass="comment-profile-picture"
            divCustomClass="div-comment-picture"
        /></router-link>
      </div>
      <b-form class="w-100" @submit="createComment">
        <b-form-group>
          <b-form-textarea
            :id="`comment-area-${post.id}`"
            v-model="content"
            @keydown.enter.exact.prevent
            @keyup.enter.exact="createComment"
            @keydown.enter.shift.exact="newline"
            class="comment-area border-0"
            placeholder="Écrivez un commentaire ici..."
            aria-label="Écrire un commentaire"
          >
          </b-form-textarea
        ></b-form-group>
      </b-form>
    </div>
  </div>
</template>

<script>
import { apiClient } from '../services/ApiClient'
import router from '../router/index'
import ProfileImage from './ProfileImage'

export default {
  name: 'CreateComment',
  components: {
    ProfileImage
  },
  props: ['post'],
  data () {
    return {
      content: '',
      userData: JSON.parse(localStorage.getItem('userData'))
    }
  },
  methods: {
    async createComment (event) {
      if (!this.content.trim().length) return

      const { comment } = await apiClient.post(
        `api/posts/${this.post.id}/comments`,
        {
          content: this.content
        }
      )
      this.content = ''
      this.$emit('commentCreated', comment)
    },
    newline () {
      this.content = `${this.content}\n`
    }
  }
}
</script>

<style lang="scss">
.comment-area {
  background-color: rgba(108, 117, 125, 0.1);
}
.div-comment-picture {
  width: 45px;
  height: 45px;
  margin-bottom: 0.5rem;
}

.comment-profile-picture {
  height: 45px;
}

@media screen and (min-width: 280px) and (max-width: 769px) {
  .div-comment-picture {
    width: 38px;
    height: 38px;
  }

  .comment-profile-picture {
    height: 38px;
  }
}
</style>
