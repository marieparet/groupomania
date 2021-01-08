<template>
  <div>
    <Menu />

    <b-row class="text-center justify-content-center">
      <b-col cols="12" lg="6">
        <b-card
          class="mx-auto border-0 shadow p-lg-3 mb-2 mb-lg-5 mt-lg-3 bg-white rounded"
        >
          <b-form @submit="editUser">
            <div class="d-flex align-items-center flex-column">
              <ProfileImage
                @click="triggerInput"
                :src="url || userData.imageUrl"
                customClass="profile-main-picture"
                divCustomClass="div-main-picture"
              />
            </div>
            <b-form-group>
              <button
                class="create-button btn-block w-50 mx-auto mb-3 d-flex align-items-center justify-content-center"
                @click="triggerInput"
                type="button"
                aria-label="Changer ma photo de profil"
              >
                <span class="button-text mr-2 d-none d-md-block"
                  >Changer ma photo de profil</span
                >
                <span class="button-text mr-2 d-md-none d-lg-none d-xl-none"
                  >Modifier</span
                >
                <svg
                  style="width:24px;height:24px;margin-bottom:5px"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="rgba(253, 45, 6, 0.5)"
                    d="M15.5,9C16.2,9 16.79,8.76 17.27,8.27C17.76,7.79 18,7.2 18,6.5C18,5.83 17.76,5.23 17.27,4.73C16.79,4.23 16.2,4 15.5,4C14.83,4 14.23,4.23 13.73,4.73C13.23,5.23 13,5.83 13,6.5C13,7.2 13.23,7.79 13.73,8.27C14.23,8.76 14.83,9 15.5,9M19.31,8.91L22.41,12L21,13.41L17.86,10.31C17.08,10.78 16.28,11 15.47,11C14.22,11 13.16,10.58 12.3,9.7C11.45,8.83 11,7.77 11,6.5C11,5.27 11.45,4.2 12.33,3.33C13.2,2.45 14.27,2 15.5,2C16.77,2 17.83,2.45 18.7,3.33C19.58,4.2 20,5.27 20,6.5C20,7.33 19.78,8.13 19.31,8.91M16.5,18H5.5L8.25,14.5L10.22,16.83L12.94,13.31L16.5,18M18,13L20,15V20C20,20.55 19.81,21 19.41,21.4C19,21.79 18.53,22 18,22H4C3.45,22 3,21.79 2.6,21.4C2.21,21 2,20.55 2,20V6C2,5.47 2.21,5 2.6,4.59C3,4.19 3.45,4 4,4H9.5C9.2,4.64 9.03,5.31 9,6H4V20H18V13Z"
                  />
                </svg>
              </button>
              <div class="d-flex align-items-center">
                <b-col sm="10">
                  <input
                    ref="fileUpload"
                    class="d-none"
                    type="file"
                    @change="onFileSelected"
                  />
                </b-col>
              </div>
              <div class="d-flex align-items-center">
                <b-col sm="2" class="d-none d-lg-block p-0">
                  <label for="firstName"> Prénom </label>
                </b-col>
                <b-col sm="10">
                  <b-form-input
                    id="firstName"
                    type="text"
                    placeholder="Prénom"
                    v-model="input.firstName"
                    class="text-dark mb-2 pl-lg-3"
                  ></b-form-input>
                </b-col>
              </div>
              <div class="d-flex align-items-center">
                <b-col sm="2" class="d-none d-lg-block p-0">
                  <label for="lastName"> Nom </label>
                </b-col>
                <b-col sm="10">
                  <b-form-input
                    id="lastName"
                    type="text"
                    placeholder="Nom"
                    v-model="input.lastName"
                    class="text-dark mb-2 pl-lg-3"
                  ></b-form-input>
                </b-col>
              </div>
              <div class="d-flex align-items-center">
                <b-col sm="2" class="d-none d-lg-block p-0">
                  <label for="email"> Email </label>
                </b-col>
                <b-col sm="10">
                  <b-form-input
                    id="email"
                    type="email"
                    placeholder="Email"
                    v-model="input.email"
                    class="mb-2 pl-lg-3"
                    disabled
                  ></b-form-input>
                </b-col>
              </div>
              <div v-if="userData.admin" class="d-flex align-items-center">
                <b-col sm="2" class="d-none d-lg-block p-0">
                  <label for="admin"> Statut </label>
                </b-col>
                <b-col sm="10">
                  <b-form-input
                    id="admin"
                    type="text"
                    placeholder="Admin"
                    class="mb-2 pl-lg-3"
                    disabled
                  ></b-form-input>
                </b-col>
              </div>
            </b-form-group>
            <button
              type="submit"
              :class="`save-btn ${emptyInput ? 'disabled' : ''}`"
              :disabled="emptyInput"
              aria-label="Enregistrer"
            >
              Enregistrer
            </button>
          </b-form>

          <UserDeleteAccount />
        </b-card>
      </b-col>
    </b-row>

    <PostsList :userId="userData.id" />
  </div>
</template>

<script>
import { apiClient } from '../services/ApiClient'
import ProfileImage from '../components/ProfileImage'
import PostsList from '../components/PostsList'
import Menu from '../components/Menu'
import UserDeleteAccount from '../components/UserDeleteAccount'

export default {
  name: 'Profile',
  components: {
    ProfileImage,
    PostsList,
    Menu,
    UserDeleteAccount
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

    triggerInput () {
      this.$refs.fileUpload.click()
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
        window.location.reload()
      })
    }
  },
  computed: {
    emptyInput () {
      return (
        !this.input.firstName.trim().length ||
        !this.input.lastName.trim().length
      )
    }
  }
}
</script>

<style lang="scss">
.row {
  margin-left: 0;
  margin-right: 0;
}

.div-main-picture {
  width: 100px;
  height: 100px;
  margin-bottom: 1rem;
}

.profile-main-picture {
  height: 100px;
}

.custom-file-label {
  text-align: left;
}

.save-btn {
  background-color: rgba(253, 45, 6, 0.8);
  color: white;
  border-radius: 1rem;
  border: none;
  margin-bottom: 1rem;
  padding: 0.375rem 0.75rem;
  &:hover,
  &:focus,
  &:active {
    background-color: rgb(253, 45, 6);
    color: white;
    outline: none;
  }
}

.card-body {
  padding-bottom: 0;
}

@media screen and (min-width: 280px) and (max-width: 769px) {
  .create-button {
    width: 100% !important;
  }

  .div-main-picture {
    width: 75px;
    height: 75px;
  }

  .profile-main-picture {
    height: 75px;
  }

  .shadow {
    box-shadow: 0rem 0.2rem 0.5rem rgba(0, 0, 0, 0.08) !important;
  }
}
</style>
