<template>
  <div id="app">
    <div id="nav" class="mb-3">
      <router-link to="/">
        <img
          id="logo"
          :src="require('./assets/logos/icon-left-font.png')"
          alt="logo Groupomania"
        />
      </router-link>
    </div>
    <router-view />
  </div>
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}

#nav {
  padding: 30px;

  #logo {
    max-width: 300px;
  }
}
</style>
