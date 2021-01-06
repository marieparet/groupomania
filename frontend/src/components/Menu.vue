<template>
  <div>
    <div>
      <UserSearch />
      <Notifications />
      <ProfileButton />
    </div>
  </div>
</template>

<script>
import ProfileButton from '../components/ProfileButton'
import UserSearch from '../components/UserSearch'
import Notifications from '../components/Notifications'

export default {
  name: 'Menu',
  components: {
    ProfileButton,
    UserSearch,
    Notifications
  }
}
</script>
