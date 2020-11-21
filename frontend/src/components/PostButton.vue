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
        v-bind:class="
          `collapsed mt-2 position-absolute ${areActionsVisible && 'visible'}`
        "
      >
        <b-card class="border-0">
          <p class="card-text">
            <b-button block v-on:click="onUpdate()"
              >Modifier la publication</b-button
            >
          </p>
          <p class="card-text">
            <b-button block v-on:click="onDelete(post.id)"
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
      userData: JSON.parse(localStorage.getItem('userData')),
      areActionsVisible: false
    }
  },
  methods: {
    ...mapActions(['deletePost']),

    toggleActions () {
      this.areActionsVisible = !this.areActionsVisible
    },

    async onDelete (postId) {
      await this.deletePost(postId)
      this.$emit('displayNotification', 'Publication supprimée')
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
  &:hover,
  &:focus {
    color: #000;
    background-color: rgba(108, 117, 125, 0.2);
  }
}

.btn-outline-secondary {
  &:active,
  &:focus {
    color: #000 !important;
    background-color: rgba(108, 117, 125, 0.2) !important;
    box-shadow: none !important;
  }
}

.collapsed {
  top: 44px;
  right: 11px;
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
</style>
