<template>
  <div>
    <div class="comment mb-2 text-left" v-for="comment in list">
      <Comment
        @commentDeleted="removeComment"
        @displayNotification="displayNotification"
        :comment="comment"
        :post="post"
      />
    </div>
    <CreateComment @commentCreated="appendComment" :post="post" />
  </div>
</template>

<script>
import { apiClient } from '../services/ApiClient'
import router from '../router/index'
import { mapState, mapActions } from 'vuex'
import PostsList from '../components/PostsList'
import CreateComment from './CreateComment'
import Comment from './Comment'

export default {
  name: 'CommentsList',
  components: {
    CreateComment,
    Comment
  },
  props: ['post'],
  data () {
    return {
      list: this.post.Comments || []
    }
  },
  methods: {
    appendComment (comment) {
      this.list.push(comment)
    },
    removeComment (commentToDelete) {
      this.list = this.list.filter(comment => comment.id !== commentToDelete.id)
    },
    displayNotification (text) {
      this.$bvToast.toast(text, {
        title: 'Notification',
        autoHideDelay: 4000
      })
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
