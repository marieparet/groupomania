<template>
  <div id="app">
    <div
      id="nav"
      class="d-flex justify-content-start justify-content-sm-center mb-3 p-4"
    >
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
  #logo {
    max-width: 300px;
  }
}

@media screen and (min-width: 280px) and (max-width: 767px) {
  body,
  .btn,
  .form-control {
    font-size: 13px !important;
  }

  #nav #logo {
    max-width: 180px;
  }
}

@media screen and (min-width: 767px) and (max-width: 769px) {
  #nav #logo {
    max-width: 240px;
  }
}
</style>
