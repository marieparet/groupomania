<template>
  <div>
    <ProfileButton />

    <b-row class="text-center justify-content-center">
      <b-col cols="12">
        <b-card
          class="w-50 mx-auto my-3 border-0 shadow p-3 mb-5 mt-3 bg-white rounded"
        >
          <b-form @submit="editUser">
            <ProfileImage
              :src="url || userData.imageUrl"
              customClass="profile-main-picture"
            />
            <b-form-group>
              <div class="d-flex align-items-center">
                <b-col sm="2">
                  <label for="imageUrl">
                    Photo
                  </label>
                </b-col>
                <b-col sm="10">
                  <b-form-file
                    ref="fileupload"
                    id="imageUrl"
                    class="text-dark mb-2 pl-3"
                    placeholder="Aucun fichier selectionné"
                    @change="onFileSelected"
                  ></b-form-file>
                </b-col>
              </div>
              <div class="d-flex align-items-center">
                <b-col sm="2">
                  <label for="firstName"> Prénom </label>
                </b-col>
                <b-col sm="10">
                  <b-form-input
                    id="firstName"
                    type="text"
                    placeholder="Prénom"
                    v-model="input.firstName"
                    class="text-dark mb-2 pl-3"
                  ></b-form-input>
                </b-col>
              </div>
              <div class="d-flex align-items-center">
                <b-col sm="2">
                  <label for="lastName"> Nom </label>
                </b-col>
                <b-col sm="10">
                  <b-form-input
                    id="lastName"
                    type="text"
                    placeholder="Nom"
                    v-model="input.lastName"
                    class="text-dark mb-2 pl-3"
                  ></b-form-input>
                </b-col>
              </div>
              <div class="d-flex align-items-center">
                <b-col sm="2">
                  <label for="email"> Email </label>
                </b-col>
                <b-col sm="10">
                  <b-form-input
                    id="email"
                    type="email"
                    placeholder="Email"
                    v-model="input.email"
                    class="text-dark mb-2 pl-3"
                    disabled
                  ></b-form-input>
                </b-col>
              </div>
            </b-form-group>
            <b-button type="submit" variant="primary">Enregistrer</b-button>
          </b-form>
        </b-card>
      </b-col>
    </b-row>

    <PostsList :userId="userData.id" />
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { apiClient } from '../services/ApiClient'
import ProfileButton from '../components/ProfileButton'
import ProfileImage from '../components/ProfileImage'
import PostsList from '../components/PostsList'

export default {
  name: 'Profile',
  components: {
    ProfileButton,
    ProfileImage,
    PostsList
  },
  data () {
    const userData = JSON.parse(localStorage.getItem('userData'))
    return {
      userData,
      input: {
        firstName: userData.firstName,
        lastName: userData.lastName,
        email: userData.email
      },
      selectedFile: null,
      url: null
    }
  },
  methods: {
    onFileSelected () {
      this.url = URL.createObjectURL(event.target.files[0])
      this.selectedFile = event.target.files[0]
    },
    editUser (event) {
      let body = this.input

      const isFormData = !!this.selectedFile

      if (isFormData) {
        const formData = new FormData()
        formData.append('image', this.selectedFile)
        formData.append('user', JSON.stringify(body))
        body = formData
      }
      apiClient.put('api/auth/edit', body, { isFormData }).then(res => {
        localStorage.setItem('userData', JSON.stringify(res.user))
        this.userData = res.user
        this.$bvToast.toast('Changements enregistrés', {
          title: 'Notification',
          autoHideDelay: 4000
        })
        window.location.reload()
      })
      this.$refs.fileupload.reset()
    }
  }
}
</script>

<style lang="scss">
.profile-main-picture {
  width: 100px;
  height: 100px;
  border-radius: 100%;
  margin-bottom: 2rem;
}

.custom-file-input:lang(fr) ~ .custom-file-label::after {
  content: 'Choisir un fichier';
}

.custom-file-label {
  text-align: left;
}
</style>
