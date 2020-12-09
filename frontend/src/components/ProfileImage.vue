<template>
  <div :class="divCustomClass">
    <img :class="customClass" :src="src || 'avatar-placeholder.jpg'" />
  </div>
</template>

<script>
export default {
  name: 'ProfileImage',
  props: ['customClass', 'divCustomClass', 'src']
}
</script>

<style lang="scss"></style>
