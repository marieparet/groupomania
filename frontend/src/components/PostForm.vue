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
  props: ['value', 'imgUrl'],
  data () {
    return {
      url: this.imgUrl
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
#post-button {
  top: 10px;
  right: 10px;
  padding: 1px 18px 10px;
  &:hover {
    background-color: rgba(108, 117, 125, 0.2);
  }
}
.btn-secondary {
  font-weight: bold;
  color: #000;
  background-color: white;
  border: none;
}

.btn-outline-secondary,
.btn-secondary {
  &:hover,
  &:active,
  &:focus {
    color: #000 !important;
    background-color: rgba(108, 117, 125, 0.2) !important;
    box-shadow: none !important;
  }
}

#button-collapsed {
  top: 44px;
  right: 11px;
}
.collapsed {
  visibility: hidden;
  display: block !important;
  transform: scaleY(0);
  transform-origin: top;
  transition: transform 0.1s, opacity 0.5s ease-in-out;
  opacity: 0;

  .card-body {
    padding: 1rem;
    box-shadow: 0px 1px 5px 4px rgba(204, 204, 204, 0.2);
  }
}

.visible {
  visibility: visible;
  opacity: 1;
  transform: scaleY(1);
}

.modal-content {
  border: none;
  box-shadow: 0px 1px 5px 4px rgba(204, 204, 204, 0.2);
}
.modal-backdrop {
  background-color: rgba(108, 117, 125, 0.2);
}

.custom-file-input:lang(fr) ~ .custom-file-label::after {
  content: 'Choisir un fichier';
}

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
