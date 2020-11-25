<template>
  <div>
    <img :class="customClass" :src="src || 'avatar-placeholder.jpg'" />
  </div>
</template>

<script>
export default {
  name: 'ProfileImage',
  props: ['customClass', 'src']
}
</script>

<style lang="scss"></style>
