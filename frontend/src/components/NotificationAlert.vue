<template>
  <div></div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'NotificationAlert',

  watch: {
    message (newMessage) {
      this.$bvToast.toast(newMessage, {
        title: 'Notification',
        autoHideDelay: 4000
      })
    }
  },

  computed: {
    ...mapState(['notificationAlert']),
    message () {
      return this.notificationAlert.message
    }
  }
}
</script>

<style lang="scss"></style>
