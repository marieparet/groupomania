<template>
  <div>
    <b-form-group>
      <div class="d-flex align-items-center">
        <ProfileImage :src="userData.imageUrl" customClass="profile-picture" />
        <b-form-textarea
          :value="value"
          @input="updateValue"
          id="content"
          type="text"
          :placeholder="`Que voulez-vous partager, ${userData.firstName} ?`"
          class="text-dark mb-2 pl-3 w-100"
        ></b-form-textarea>
      </div>
      <div
        id="preview"
        class="d-flex justify-content-center align-items-center"
      >
        <img class="mt-3" v-if="url" :src="url" />
      </div>
    </b-form-group>
    <div class="line mb-3"></div>
    <b-form-group>
      <div class="d-flex justify-content-around">
        <b-button class="btn-block" @click="triggerInput"
          ><b-icon icon="file-image" variant="danger" class="mr-2"></b-icon
          ><span class="button-text">Choisir un fichier</span></b-button
        >
        <input
          ref="fileInput"
          class="d-none"
          type="file"
          @change="onFileSelected"
        />
        <b-button class="btn-block" type="submit"
          ><b-icon icon="file-check" variant="danger" class="mr-2"></b-icon>
          <span class="button-text">Publier</span></b-button
        >
      </div>
    </b-form-group>
  </div>
</template>

<script>
import { apiClient } from '../services/ApiClient'
import { mapState, mapActions } from 'vuex'
import ProfileImage from './ProfileImage'

export default {
  name: 'PostForm',
  components: {
    ProfileImage
  },
  props: ['value', 'imgUrl', 'onFormSubmit'],
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
  }
}
</script>

<style lang="scss">
#preview img {
  max-width: 100%;
  max-height: 500px;
}
.profile-picture {
  width: 50px;
  height: 50px;
  border-radius: 100%;
  margin-bottom: 1rem;
}

.line {
  display: block;
  width: 100%;
  height: 1px;
  background-color: rgba(192, 192, 192, 0.5);
}

.button-text {
  color: #747474;
}
</style>
