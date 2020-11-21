<template>
  <div>
    <div>
      <b-button
        v-b-toggle="`collapse-${post.id}`"
        pill
        variant="outline-secondary"
        v-if="post.userId == userData.id"
        id="post-button"
        class="close d-block position-absolute"
        >...</b-button
      >
      <b-collapse v-bind:id="`collapse-${post.id}`" class="mt-2">
        <b-card>
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

          <b-toast id="deleted-post-toast" title="BootstrapVue" static>
            Publication supprimé
          </b-toast>
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
      userData: JSON.parse(localStorage.getItem('userData'))
    }
  },
  methods: {
    ...mapActions(['deletePost']),

    async onDelete (postId) {
      await this.deletePost(postId)
      this.$bvToast.show('deleted-post-toast')
    }
  }
}
</script>

<style lang="scss">
#post-button {
  top: 0;
  right: 0;
  padding: 10px 18px;
  &:hover {
    background-color: rgba(108, 117, 125, 0.3);
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
    color: #000;
    background-color: rgba(108, 117, 125, 0.3);
    box-shadow: none;
  }
}

.card-body {
  top: 0;
  right: 0;
}
</style>
