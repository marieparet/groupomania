<template>
  <div>
    <EditButton
      :editingPost="true"
      :isCreator="post.userId == userData.id"
      :isAdmin="userData.admin"
      @onDelete="onDelete"
      :elementId="post.id"
      modifyText="Modifier la publication"
      deleteText="Supprimer la publication"
    >
      <b-modal
        :id="`modal-${post.id}`"
        title="Modifier la publication"
        ok-title="Enregistrer"
        ok-variant="light"
        @ok="onUpload"
        ok-only
      >
        <b-form>
          <PostForm
            :imgUrl="post.imageUrl"
            @onFileSelected="onFileSelected"
            v-model="content"
          />
        </b-form>
      </b-modal>
    </EditButton>
  </div>
</template>

<script>
import { apiClient } from '../services/ApiClient'
import { mapActions } from 'vuex'
import PostForm from './PostForm'
import EditButton from './EditButton'

export default {
  name: 'EditPost',
  components: {
    PostForm,
    EditButton
  },
  props: ['post'],
  data () {
    return {
      content: this.post.content,
      userData: JSON.parse(localStorage.getItem('userData')),
      selectedFile: null
    }
  },
  methods: {
    ...mapActions(['deletePost', 'modifyPost', 'displayNotification']),

    toggleActions () {
      this.areActionsVisible = !this.areActionsVisible
    },

    async onDelete () {
      await this.deletePost(this.post.id)
      this.displayNotification('Publication supprimée !')
    },

    onFileSelected (file) {
      this.selectedFile = file
    },

    async onUpload () {
      if (!this.content.trim().length) return
      await this.modifyPost({
        postId: this.post.id,
        selectedFile: this.selectedFile,
        content: this.content
      })
      this.displayNotification('Publication modifiée !')
    }
  }
}
</script>

<style lang="scss">
.modal-body {
  padding: 1rem 1rem 0 1rem;
}

.modal-title {
  color: #747474;
}

.btn-light {
  border: none;
  color: #747474;
  font-weight: 500;
  display: block;
  width: 100%;
  margin: 0 1rem 1rem 1rem;
}

.modal-content {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  border: none;
  box-shadow: 0px 1px 5px 4px rgba(204, 204, 204, 0.2);
}
.modal-backdrop {
  background-color: rgba(108, 117, 125, 0.2);
}
</style>
