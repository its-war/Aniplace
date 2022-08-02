<template>
  <div id="app">
    <v-overlay color="rgb(30,30,30)" :value="this.$store.state.main.overlay">
      <v-progress-circular
          indeterminate
          size="75"
          width="5"
          color="red"
      ></v-progress-circular>
    </v-overlay>
    <router-view/>
  </div>
</template>

<style lang="scss">
html {
  scroll-behavior: smooth !important;
}

h1,h2,h3,h4,h5,h6,p,a,div,span {
  font-family: Inconsolata, sans-serif;
}

input:-webkit-autofill,
input:-webkit-autofill:hover,
input:-webkit-autofill:focus,
input:-webkit-autofill:active{
  -webkit-box-shadow: 0 0 0 30px rgb(30,30,30) inset !important;
}

input:-webkit-autofill{
  -webkit-text-fill-color: #FFFFFF !important;
}

#inspire {
  background-image: url(https://i.imgur.com/zBVQoFx.jpeg) !important;
  background-attachment: fixed !important;
  background-size: cover !important;
}

#app {
  font-family: Inconsolata, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

::-webkit-scrollbar {
  width: 10px;
}

::-webkit-scrollbar-track {
  background: #585858;
}

::-webkit-scrollbar-thumb {
  background-color: #F44336;
}

::-webkit-scrollbar-thumb:hover {
  background: #b5362a;
}

::-webkit-scrollbar-thumb:active {
  background: #fb6356;
}
</style>
