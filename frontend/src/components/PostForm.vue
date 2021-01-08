<template>
  <div>
    <b-form-group>
      <div class="d-flex align-items-center">
        <div class="d-flex mr-2 mr-lg-3 mt-2">
          <router-link :to="{ name: 'Profile' }">
            <ProfileImage
              :src="userData.imageUrl"
              customClass="post-profile-picture"
              divCustomClass="div-post-picture"
          /></router-link>
        </div>
        <b-form-textarea
          :value="value"
          @input="updateValue"
          id="content"
          :placeholder="`Que voulez-vous partager, ${userData.firstName} ?`"
          aria-label="Écrire une publication"
          class="text-dark mb-2 mr-2 w-100"
        ></b-form-textarea>
      </div>
      <div
        id="preview"
        class="d-flex justify-content-center align-items-center"
      >
        <img class="mt-3" v-if="url" :src="url" alt="" />
      </div>
    </b-form-group>
    <div class="line mb-3"></div>
    <b-form-group>
      <div class="d-flex justify-content-around">
        <button
          class="d-flex align-items-center justify-content-center create-button btn-block"
          @click="triggerInput"
          type="button"
          aria-label="Choisir un fichier"
        >
          <span class="mr-2 d-none d-md-block">Choisir un fichier</span>
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
        <button
          v-if="isCreating"
          :class="
            `d-flex align-items-center justify-content-center create-button btn-block ${
              emptyField ? 'disabled' : ''
            }`
          "
          :disabled="emptyField"
          type="submit"
          aria-label="Publier"
        >
          <span class="mr-2 d-none d-md-block">Publier</span>
          <svg
            style="width:24px;height:24px;margin-bottom:5px"
            viewBox="0 0 24 24"
          >
            <path
              fill="rgba(253, 45, 6, 0.5)"
              d="M2,21L23,12L2,3V10L17,12L2,14V21Z"
            />
          </svg>
        </button>
        <input
          ref="fileInput"
          class="d-none"
          type="file"
          @change="onFileSelected"
        />
      </div>
    </b-form-group>
  </div>
</template>

<script>
import { apiClient } from '../services/ApiClient'
import ProfileImage from './ProfileImage'

export default {
  name: 'PostForm',
  components: {
    ProfileImage
  },
  props: ['value', 'imgUrl', 'onFormSubmit', 'isCreating'],
  data () {
    return {
      userData: JSON.parse(localStorage.getItem('userData')),
      url: this.imgUrl
    }
  },
  watch: {
    onFormSubmit () {
      this.url = null
    }
  },
  methods: {
    onFileSelected (event) {
      this.url = URL.createObjectURL(event.target.files[0])
      this.$emit('onFileSelected', event.target.files[0])
    },
    updateValue (value) {
      this.$emit('input', value)
    },
    triggerInput () {
      this.$refs.fileInput.click()
    }
  },
  computed: {
    emptyField () {
      return !this.value.trim().length && !this.url
    }
  }
}
</script>

<style lang="scss">
#preview img {
  max-width: 100%;
  max-height: 500px;
}

.disabled {
  cursor: not-allowed;
}

.form-control {
  border: 1px solid rgba(192, 192, 192, 0.5);
  &:focus {
    border: none;
  }
}

.line {
  display: block;
  width: 100%;
  height: 1px;
  background-color: rgba(192, 192, 192, 0.5);
}

.create-button {
  background: white;
  color: #747474;
  border: none;

  border-radius: 0.25rem;
  font-weight: 500;
  padding: 0.375rem 0.75rem;
  &:hover {
    background-color: rgba(108, 117, 125, 0.1);
  }
  &:active,
  &:focus {
    background-color: white !important;
    outline: none;
  }
}
</style>
