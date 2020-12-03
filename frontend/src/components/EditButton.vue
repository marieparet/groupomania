<template>
  <div>
    <b-button
      pill
      @click="toggleActions"
      variant="outline-secondary"
      v-if="shouldDisplay"
      :class="customClass"
      class="post-button close d-block position-absolute"
      >...</b-button
    >
    <b-collapse
      v-bind:class="
        `${classCollapse ||
          ''} button-collapsed collapsed mt-2 position-absolute ${areActionsVisible &&
          'visible'}`
      "
    >
      <b-card class="border-0" @click="toggleActions">
        <p class="card-text">
          <b-button v-if="editingPost" block v-b-modal="`modal-${elementId}`">{{
            modifyText
          }}</b-button>
          <b-button v-else @click="clickedEditButton">{{
            modifyText
          }}</b-button>
          <slot></slot>
        </p>
        <p class="card-text">
          <b-button block v-on:click="onDelete">{{ deleteText }}</b-button>
        </p>
      </b-card>
    </b-collapse>
  </div>
</template>

<script>
import { apiClient } from '../services/ApiClient'
import { mapState, mapActions } from 'vuex'
import PostForm from './PostForm'

export default {
  name: 'EditPost',
  components: {
    PostForm
  },
  props: [
    'post',
    'customClass',
    'classCollapse',
    'shouldDisplay',
    'elementId',
    'modifyText',
    'deleteText',
    'editingPost'
  ],
  data () {
    return {
      areActionsVisible: false
    }
  },
  methods: {
    toggleActions () {
      this.areActionsVisible = !this.areActionsVisible
    },

    async onDelete () {
      this.$emit('onDelete')
    },

    async clickedEditButton () {
      this.$emit('clickedEditButton')
    }
  }
}
</script>

<style lang="scss">
.post-button {
  top: 20px;
  right: 10px;
  padding: 1px 18px 10px !important;
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

.button-collapsed {
  top: 50px;
  right: 11px;
  z-index: 2;
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
</style>
