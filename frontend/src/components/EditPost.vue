<template>
  <div>
    <EditButton
      :editingPost="true"
      :shouldDisplay="post.userId == userData.id"
      @onDelete="onDelete"
      :elementId="post.id"
      modifyText="Modifier la publication"
      deleteText="Supprimer la publication"
    >
      <b-modal
        :id="`modal-${post.id}`"
        title="Modifier la publication"
        ok-title="Enregistrer"
        @ok="onUpload"
        cancel-title="Annuler"
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
import { mapState, mapActions } from 'vuex'
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
    ...mapActions(['deletePost', 'modifyPost']),

    toggleActions () {
      this.areActionsVisible = !this.areActionsVisible
    },

    async onDelete () {
      await this.deletePost(this.post.id)
      this.$emit('displayNotification', 'Publication supprimée !')
    },

    onFileSelected (file) {
      this.selectedFile = file
    },

    async onUpload () {
      await this.modifyPost({
        postId: this.post.id,
        selectedFile: this.selectedFile,
        content: this.content
      })
      this.$emit('displayNotification', 'Publication modifiée !')
    }
  }
}
</script>

<style lang="scss">
.modal-content {
  border: none;
  box-shadow: 0px 1px 5px 4px rgba(204, 204, 204, 0.2);
}
.modal-backdrop {
  background-color: rgba(108, 117, 125, 0.2);
}
</style>
