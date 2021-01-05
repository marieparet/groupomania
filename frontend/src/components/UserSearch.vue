<template>
  <div>
    <div
      :class="`search-bar ${visible ? '' : 'position-fixed d-none'} d-lg-block`"
    >
      <div class="search-bar__content input-group d-flex align-items-center">
        <span class="search-btn input-group-append bg-transparent border-0 p-0">
          <b-icon icon="search" class="mr-2"></b-icon>
        </span>
        <input
          class="search-text border-0 bg-transparent"
          type="text"
          v-model="search"
          placeholder="Chercher un utilisateur..."
          ref="searchInput"
          aria-label="Chercher un utilisateur"
        />
      </div>
    </div>
    <button
      class="search-btn-mobile position-fixed border-0 p-0 bg-transparent d-lg-none d-xl-none"
      type="button"
      @click="triggerInput"
      aria-label="Chercher"
    >
      <b-icon icon="search"></b-icon>
    </button>

    <div
      v-if="usersList.length"
      class="users-list card border-0 position-fixed"
    >
      <div v-for="user in usersList">
        <router-link :to="{ name: 'UserProfile', params: { userId: user.id } }"
          ><div class="d-flex align-items-center">
            <div class="d-flex text-center">
              <ProfileImage
                :src="user.imageUrl"
                customClass="like-profile-picture"
                divCustomClass="div-like-picture"
              />
            </div>
            <p>{{ user.firstName }} {{ user.lastName }}</p>
          </div></router-link
        >
      </div>
    </div>
  </div>
</template>

<script>
import { apiClient } from '../services/ApiClient'
import router from '../router/index'
import ProfileImage from './ProfileImage'

export default {
  name: 'UserSearch',
  components: {
    ProfileImage
  },
  data () {
    return {
      search: '',
      usersList: [],
      visible: false
    }
  },
  watch: {
    async search (value) {
      if (value.length < 2) {
        this.usersList = []
        return
      }
      const res = await apiClient.get(`api/users?search=${value}`)
      this.usersList = res.users
    }
  },
  methods: {
    triggerInput () {
      this.visible = true
      this.$refs.searchInput.click()
    }
  }
}
</script>

<style lang="scss">
.search-bar {
  top: 20px;
  left: 45px;
  z-index: 2;
  .input-group {
    flex-wrap: nowrap;
  }
  &__content {
    padding: 10px 18px;
    box-shadow: 0px 1px 1px 1px rgba(204, 204, 204, 0.2);
    background-color: rgba(108, 117, 125, 0.1) !important;
    border-radius: 40px;
    border: none;
    .search-text {
      width: 180px;
      &:focus {
        outline: none;
      }
    }
    .search-btn {
      color: #747474;
    }
  }
}

.users-list {
  background: white;
  top: 73px;
  left: 47px;
  width: 236px;
  padding: 1rem;
  padding-bottom: 0.2rem;
  z-index: 1;
  box-shadow: 0px 1px 5px 4px rgba(204, 204, 204, 0.2);
}

@media screen and (min-width: 280px) and (max-width: 769px) {
  .search-bar {
    margin: 0 10px 15px 15px;
    &__content {
      padding: 5px 13px;
      .search-text {
        width: 100%;
      }
    }
  }

  .search-btn-mobile {
    top: 20px;
    right: 110px;
    color: #747474;
    font-size: 1.1rem;
    z-index: 2;
    &:focus {
      outline: none;
    }
  }

  .users-list {
    top: 119px;
    left: 15px;
    background: white;
    box-shadow: 0rem 0.2rem 0.5rem rgba(0, 0, 0, 0.08) !important;
  }
}

@media screen and (min-width: 769px) and (max-width: 992px) {
  .search-bar {
    display: block !important;
  }
}
</style>
