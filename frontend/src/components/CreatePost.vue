<template>
  <div>
    <div class="d-flex align-items-center justify-content-center">
      <ProfileImage :src="userData.imageUrl" customClass="profile-picture" />
      <p class="font-weight-bold ml-3">
        Bonjour {{ userData.firstName }} ! Que voulez-vous partager aujourd'hui
        ?
      </p>
    </div>
    <b-form @submit="onSubmit">
      <PostForm @onFileSelected="onFileSelected" v-model="content" />
      <b-button type="submit" variant="primary">Publier</b-button>
    </b-form>
  </div>
</template>

<script>
import { apiClient } from '../services/ApiClient'
import { mapState, mapActions } from 'vuex'
import PostForm from './PostForm'
import ProfileImage from './ProfileImage'

export default {
  name: 'CreatePost',
  components: {
    PostForm,
    ProfileImage
  },
  props: {},
  data () {
    return {
      userData: JSON.parse(localStorage.getItem('userData')),
      content: '',
      selectedFile: null
    }
  },
  methods: {
    ...mapActions(['createPost']),

    onFileSelected (file) {
      this.selectedFile = file
    },

    async onSubmit () {
      await this.createPost({
        selectedFile: this.selectedFile,
        content: this.content
      })
      this.$emit('displayNotification', 'Publication créée !')
    }
  }
}
</script>

<style lang="scss">
.custom-file-label {
  text-align: left;
}
.profile-picture {
  width: 30px;
  height: 30px;
  border-radius: 100%;
  margin-bottom: 1rem;
}
</style>
