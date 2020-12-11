<template>
  <div>
    <div class="search-bar position-absolute d-none d-lg-block">
      <div class="search-bar__content input-group d-flex align-items-center">
        <input
          class="search-text border-0 bg-transparent"
          type="text"
          v-model="search"
          placeholder="Chercher un utilisateur..."
        />
        <span class="input-group-append bg-transparent">
          <button class="search-btn border-0 p-0" type="submit">
            <b-icon icon="search" class="ml-2"></b-icon>
          </button>
        </span>
      </div>
    </div>
    <button
      class="search-btn-mobile position-absolute border-0 p-0 bg-transparent d-md-none d-lg-none d-xl-none"
      type="button"
    >
      <b-icon icon="search"></b-icon>
    </button>
  </div>
</template>

<script>
import { apiClient } from '../services/ApiClient'
import { mapState, mapActions } from 'vuex'

export default {
  name: 'UserSearch',
  props: [],
  data () {
    return {
      search: ''
    }
  },
  watch: {
    search (value) {
      console.log(value)
    }
  }
}
</script>

<style lang="scss">
.search-bar {
  top: 25px;
  left: 45px;
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
    top: 28px;
    right: 68px;
    color: #747474;
    font-size: 1.2rem;
    &:focus {
      outline: none;
    }
  }
}
</style>
