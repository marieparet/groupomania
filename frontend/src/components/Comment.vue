<template>
  <div>
    <div class="d-flex align-items-center position-relative">
      <router-link
        :to="{ name: 'UserProfile', params: { userId: comment.User.id } }"
        ><div class="d-flex text-center mr-2 mt-2">
          <ProfileImage
            :src="comment.User.imageUrl"
            customClass="comment-profile-picture"
            divCustomClass="div-comment-picture"
          /></div
      ></router-link>
      <div class="comment-box">
        <router-link
          :to="{ name: 'UserProfile', params: { userId: comment.User.id } }"
          ><p class="mb-0 font-weight-bold">
            {{ comment.User.firstName }} {{ comment.User.lastName }}
          </p></router-link
        >
        <input
          v-if="isEditing"
          ref="inputContent"
          v-model="comment.content"
          @keydown.enter.exact.prevent
          @keyup.enter.exact="modifyComment"
          @keydown.enter.shift.exact="newline"
          type="text"
          class="input-content border-0 my-2"
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
    <p class="text-secondary comment-date">
      {{
        moment(comment.createdAt)
          .locale('fr')
          .fromNow()
      }}
    </p>
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
      setTimeout(() => {
        this.$refs.inputContent.focus()
      }, 30)
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

.input-content:focus {
  border-radius: 0.25rem;
  outline: none;
  box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
}

.comment-date {
  margin-left: 58px;
  font-size: 0.8rem;
}

@media screen and (min-width: 280px) and (max-width: 767px) {
  .comment-date {
    font-size: 0.6rem;
  }

  .comment-button {
    margin: 0;
  }
}
</style>
