<template>
  <div>
    <b-button
      @click="toggleActions"
      class="notification-btn d-flex position-absolute justify-content-center align-items-center p-0"
    >
      <span
        class="notifications-number position-absolute d-flex justify-content-center align-items-center"
        >4</span
      >
      <b-icon icon="bell-fill"></b-icon>
    </b-button>
    <b-collapse
      id="notification-collapsed"
      v-bind:class="
        `collapsed mt-2 position-absolute ${areActionsVisible && 'visible'}`
      "
    >
      <b-card class="border-0">
        <p class="card-text">bonjour</p>
      </b-card>
    </b-collapse>
  </div>
</template>

<script>
import { apiClient } from '../services/ApiClient'
import { mapState, mapActions } from 'vuex'
import ProfileImage from './ProfileImage'

export default {
  name: 'Notifications',
  components: {
    ProfileImage
  },
  props: {},
  data () {
    return {
      userData: JSON.parse(localStorage.getItem('userData')),
      areActionsVisible: false
    }
  },
  methods: {
    toggleActions () {
      this.areActionsVisible = !this.areActionsVisible
    }
  }
}
</script>

<style lang="scss">
.notification-btn {
  top: 26px;
  right: 175px;
  box-shadow: 0px 1px 1px 1px rgba(204, 204, 204, 0.2);
  background-color: rgba(108, 117, 125, 0.1) !important;
  border-radius: 100%;
  width: 42px;
  height: 42px;
  border: none;
  &:hover {
    background-color: rgba(108, 117, 125, 0.2) !important;
  }
  .notifications-number {
    top: -8px;
    right: -4px;
    font-size: 12px;
    border-radius: 100%;
    background: red;
    color: white;
    height: 20px;
    width: 20px;
  }
}

#notification-collapsed {
  top: 68px;
  right: 174px;
  z-index: 1;
}

@media screen and (min-width: 280px) and (max-width: 769px) {
  .notification-btn {
    top: 25px;
    right: 65px;
    width: 32px;
    height: 32px;
    .notifications-number {
      top: -6px;
      height: 15px;
      width: 15px;
      font-size: 11px;
    }
  }

  #notification-collapsed {
    top: 52px;
    right: 64px;
  }
}
</style>
