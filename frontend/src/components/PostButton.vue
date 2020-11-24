<template>
  <div>
    <div>
      <b-button
        pill
        @click="toggleActions"
        variant="outline-secondary"
        v-if="post.userId == userData.id"
        id="post-button"
        class="close d-block position-absolute"
        >...</b-button
      >
      <b-collapse
        id="button-collapsed"
        v-bind:class="
          `collapsed mt-2 position-absolute ${areActionsVisible && 'visible'}`
        "
      >
        <b-card class="border-0" @click="toggleActions">
          <p class="card-text">
            <b-button block v-b-modal="`modal-${post.id}`"
              >Modifier la publication</b-button
            >
            <b-modal
              :id="`modal-${post.id}`"
              title="Modifier la publication"
              ok-title="Enregistrer"
              @ok="onUpload"
              cancel-title="Annuler"
            >
              <b-form>
                <b-form-group>
                  <b-form-textarea
                    v-model="content"
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
              </b-form>
            </b-modal>
          </p>
          <p class="card-text">
            <b-button block v-on:click="onDelete"
              >Supprimer la publication</b-button
            >
          </p>
        </b-card>
      </b-collapse>
    </div>
  </div>
</template>

<script>
import { apiClient } from '../services/ApiClient'
import { mapState, mapActions } from 'vuex'

export default {
  name: 'PostButton',
  props: {
    post: {
      type: Object
    }
  },
  data () {
    return {
      content: this.post.content,
      userData: JSON.parse(localStorage.getItem('userData')),
      areActionsVisible: false,
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

    onFileSelected (event) {
      this.selectedFile = event.target.files[0]
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
</style>
