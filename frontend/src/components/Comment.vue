<template>
  <div class="d-flex align-items-center position-relative">
    <ProfileImage :src="comment.User.imageUrl" customClass="profile-picture" />
    <div class="comment-box">
      <p class="mb-0 font-weight-bold">
        {{ comment.User.firstName }} {{ comment.User.lastName }}
      </p>
      <input
        v-if="isEditing"
        v-model="comment.content"
        @keydown.enter.exact.prevent
        @keyup.enter.exact="modifyComment"
        @keydown.enter.shift.exact="newline"
        type="text"
      />
      <p v-else class="mb-0">{{ comment.content }}</p>
    </div>
    <EditButton
      customClass="comment-button"
      classCollapse="collapse-button"
      :shouldDisplay="comment.User.id == userData.id"
      @clickedEditButton="startEditing"
      @onDelete="onDelete"
      modifyText="Modifier le commentaire"
      deleteText="Supprimer le commentaire"
    >
    </EditButton>
  </div>
</template>

<script>
import { apiClient } from '../services/ApiClient'
import EditButton from './EditButton'
import ProfileImage from './ProfileImage'

export default {
  name: 'Comment',
  components: {
    EditButton,
    ProfileImage
  },
  props: ['comment', 'post'],
  data () {
    return {
      userData: JSON.parse(localStorage.getItem('userData')),
      isEditing: false
    }
  },
  methods: {
    toggleActions () {
      this.areActionsVisible = !this.areActionsVisible
    },

    async onDelete () {
      await apiClient.delete(
        `api/posts/${this.post.id}/comments/${this.comment.id}`
      )
      this.$emit('commentDeleted', this.comment)
      this.$emit('displayNotification', 'Commentaire supprimé !')
    },

    startEditing () {
      this.isEditing = true
    },
    newline () {
      this.comment.content = `${this.comment.content}\n`
    },

    async modifyComment () {
      await apiClient.put(
        `api/posts/${this.post.id}/comments/${this.comment.id}`,
        { content: this.comment.content }
      )
      this.isEditing = false
      this.$emit('displayNotification', 'Commentaire modifié !')
    }
  }
}
</script>

<style lang="scss">
.comment-button {
  position: static !important;
  margin-left: 10px;
  margin-bottom: 15px;
}

.collapse-button {
  right: 181px;
  top: 43px;
}
</style>
