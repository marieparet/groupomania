<template>
  <div>
    <nav>
      <b-button
        @click="toggleActions"
        class="account profile-btn d-flex position-absolute justify-content-center justify-content-lg-between align-items-center"
      >
        <span class="d-none d-lg-block">{{ userData.firstName }}</span>
        <ProfileImage
          :src="userData.imageUrl"
          customClass="account__img"
          divCustomClass="div-account-img"
        />
      </b-button>
      <b-collapse
        id="profile-collapsed"
        v-bind:class="
          `collapsed mt-2 position-absolute ${areActionsVisible && 'visible'}`
        "
      >
        <b-card class="border-0">
          <p class="card-text">
            <b-button
              class="text-left"
              block
              @click="changeOrReloadPage('Profile')"
              ><b-icon icon="person" class="mr-2"></b-icon>Voir mon
              profil</b-button
            >
          </p>
          <p class="card-text">
            <b-button
              class="text-left"
              block
              @click="changeOrReloadPage('Posts')"
              ><b-icon icon="house" class="mr-2"></b-icon>Voir la page
              d'accueil</b-button
            >
          </p>
          <p class="card-text">
            <b-button class="text-left" block @click="logout">
              <b-icon icon="box-arrow-right" class="mr-2"></b-icon>
              Se déconnecter</b-button
            >
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
    },
    changeOrReloadPage (name) {
      if (name === this.$route.name) return window.location.reload()
      this.$router.push({ name })
    }
  }
}
</script>

<style lang="scss">
.account {
  top: 25px;
  right: 45px;
  height: 45px;
  padding: 5px 5px 5px 16px;
  box-shadow: 0px 1px 1px 1px rgba(204, 204, 204, 0.2);
  background-color: rgba(108, 117, 125, 0.1) !important;
  border-radius: 40px;
  &__img {
    height: 30px;
    transform: scale(1.3);
  }
}

.div-account-img {
  width: 30px;
  height: 30px;
  overflow: hidden;
  border-radius: 100%;
  margin-left: 8px;
  background: black;
}

.profile-btn:hover,
.profile-btn:visited {
  background-color: rgba(108, 117, 125, 0.2) !important;
}

#profile-collapsed {
  top: 74px;
  right: 44px;
  z-index: 1;
}

@media screen and (min-width: 280px) and (max-width: 769px) {
  .account {
    top: 28px;
    right: 20px;
    height: 25px;
    padding: 0;
    &__img {
      height: 35px;
    }
  }

  .div-account-img {
    width: 35px;
    height: 35px;
    margin-left: 0;
  }

  #profile-collapsed {
    top: 52px;
    right: 15px;
  }
}
</style>
