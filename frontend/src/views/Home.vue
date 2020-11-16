<template>
  <div>
    <Login />
  </div>
</template>

<script>
import Login from '../components/Login'
import { mapState } from 'vuex'

export default {
  name: 'Home',
  components: {
    Login
  },
  computed: {
    ...mapState({
      companyName: 'companyName'
    })
  }
}
</script>

<style lang="scss"></style>
