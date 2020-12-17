<template>
  <div>
    <div class="d-flex justify-content-center">
      <button
        class="delete-account d-flex justify-content-center align-items-center"
      >
        <p @click="confirmDeletion" class="my-3 mr-1 mr-lg-2">
          Supprimer ce compte
        </p>
        <b-icon icon="trash"></b-icon>
      </button>
    </div>
  </div>
</template>

<script>
import { apiClient } from '../services/ApiClient'
import { mapState, mapActions } from 'vuex'

export default {
  name: 'DeleteAccount',
  data () {
    return {
      userData: JSON.parse(localStorage.getItem('userData'))
    }
  },
  methods: {
    async confirmDeletion () {
      if (confirm('Êtes-vous sûr de vouloir supprimer ce compte ?')) {
        await apiClient.delete(`api/users/${this.userData.id}`)
        localStorage.clear()
        this.$router.push({ name: 'Login' })
      }
    }
  }
}
</script>

<style lang="scss">
.delete-account {
  font-size: 14px;
  border-radius: 0.25rem;
  background-color: transparent;
  border: none;
  &:hover {
    text-decoration: underline;
  }
  &:focus {
    outline: none;
  }
}
</style>
