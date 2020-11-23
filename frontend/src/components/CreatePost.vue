<template>
  <div>
    <b-form @submit="onSubmit">
      <p class="font-weight-bold">
        Bonjour {{ userData.firstName }} ! Que voulez-vous partager aujourd'hui
        ?
      </p>
      <b-form-group>
        <b-form-textarea
          id="content"
          type="text"
          placeholder="Description"
          class="text-dark mb-2 mt-4 pl-3 w-100"
        ></b-form-textarea>
      </b-form-group>
      <b-form-group>
        <b-form-file
          placeholder="Aucun fichier selectionné"
          @change="onFileSelected"
        ></b-form-file>
      </b-form-group>
      <b-button type="submit" variant="primary">Publier</b-button>
    </b-form>
  </div>
</template>

<script>
import { apiClient } from '../services/ApiClient'
import { mapState, mapActions } from 'vuex'

export default {
  name: 'CreatePost',
  props: {
    post: {
      type: Object
    }
  },
  data () {
    return {
      userData: JSON.parse(localStorage.getItem('userData'))
    }
  },
  methods: {
    onFileSelected (event) {
      this.selectedFile = event.target.files[0]
    },

    onSubmit () {
      let body = null
      if (this.selectedFile != null) {
        body = new FormData()
        body.append('image', this.selectedFile, this.selectedFile.name)
      } else {
        body = {
          content: this.post.content
        }
      }

      apiClient
        .put('api/posts/' + postId, body, { isFormData: this.selectedFile })
        .then(res => console.log(res))
    }
  }
}
</script>

<style lang="scss">
.custom-file-label {
  text-align: left;
}
</style>
