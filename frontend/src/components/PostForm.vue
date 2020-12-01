<template>
  <div>
    <b-form-group>
      <b-form-textarea
        :value="value"
        @input="updateValue"
        id="content"
        type="text"
        placeholder="Description"
        class="text-dark mb-2
        mt-4 pl-3 w-100"
      ></b-form-textarea>
    </b-form-group>
    <b-form-group>
      <b-form-file
        placeholder="Aucun fichier selectionné"
        @change="onFileSelected"
      ></b-form-file>
      <div id="preview">
        <img v-if="url" :src="url" />
      </div>
    </b-form-group>
  </div>
</template>

<script>
import { apiClient } from '../services/ApiClient'
import { mapState, mapActions } from 'vuex'

export default {
  name: 'PostForm',
  props: ['value', 'imgUrl', 'onFormSubmit'],
  data () {
    return {
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
    }
  }
}
</script>

<style lang="scss">
#preview {
  display: flex;
  justify-content: center;
  align-items: center;
  img {
    max-width: 100%;
    max-height: 500px;
  }
}
</style>
