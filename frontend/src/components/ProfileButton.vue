<template>
  <div>
    <nav>
      <b-button
        @click="toggleActions"
        class="account d-flex position-absolute justify-content-between align-items-center"
      >
        <span>{{ userData.firstName }}</span>
        <ProfileImage :src="userData.imageUrl" customClass="account__img" />
      </b-button>
      <b-collapse
        id="profile-collapsed"
        v-bind:class="
          `collapsed mt-2 position-absolute ${areActionsVisible && 'visible'}`
        "
      >
        <b-card class="border-0">
          <p class="card-text">
            <b-button block @click="$router.push({ name: 'Profile' })"
              >Voir mon profil</b-button
            >
          </p>
          <p class="card-text">
            <b-button block @click="logout">Se déconnecter</b-button>
          </p>
        </b-card>
      </b-collapse>
    </nav>
  </div>
</template>

<script>
import { apiClient } from '../services/ApiClient'
import { mapState, mapActions } from 'vuex'
import ProfileImage from './ProfileImage'

export default {
  name: 'ProfileButton',
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
    },
    logout () {
      localStorage.clear()
      this.$router.push({ name: 'Login' })
    }
  }
}
</script>

<style lang="scss">
.account {
  top: 30px;
  right: 45px;
  height: 45px;
  padding: 5px 5px 5px 16px;
  box-shadow: 0px 1px 2px 3px rgba(204, 204, 204, 0.2);
  background-color: rgba(108, 117, 125, 0.1);
  border-radius: 40px;
  &__img {
    width: 30px;
    height: 30px;
    border-radius: 100%;
    margin-left: 8px;
    border: none;
  }
}

#profile-collapsed {
  top: 74px;
  right: 44px;
}
</style>
