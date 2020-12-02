<template>
  <div>
    <div class="comment mb-2 text-left" v-for="comment in list">
      <div class="d-flex align-items-center">
        <ProfileImage
          :src="comment.User.imageUrl"
          customClass="profile-picture"
        />
        <div class="comment-box">
          <p class="mb-0 font-weight-bold">
            {{ comment.User.firstName }} {{ comment.User.lastName }}
          </p>
          <p class="mb-0">{{ comment.content }}</p>
        </div>
      </div>
    </div>
    <CreateComment @commentCreated="appendComment" :post="post" />
  </div>
</template>

<script>
import { apiClient } from '../services/ApiClient'
import router from '../router/index'
import { mapState, mapActions } from 'vuex'
import PostsList from '../components/PostsList'
import ProfileImage from './ProfileImage'
import CreateComment from './CreateComment'

export default {
  name: 'CommentsList',
  components: {
    ProfileImage,
    CreateComment
  },
  props: ['post'],
  data () {
    return {
      list: this.post.Comments
    }
  },
  methods: {
    appendComment (comment) {
      this.list.push(comment)
    }
  },
  computed: {}
}
</script>

<style lang="scss">
.comment-box {
  background-color: rgba(108, 117, 125, 0.1);
  padding: 0.375rem 0.75rem;
  border-radius: 0.25rem;
  margin-bottom: 1rem;
}
</style>
