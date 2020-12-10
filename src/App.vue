<template>
  <MainComponent/>
</template>

<script>
import MainComponent from './components/main.component.vue';
export default {
  name: 'App',
  components: {
    MainComponent
  }
}
</script>

<style>
:root {
  --font-sans: 'Open Sans', sans-serif;
  --white: #dddddd;
  --light-white: rgba(255, 255, 255, 0.21);
  --bg-night: linear-gradient(180deg, #13225A 0%, #644986 65%,
 #9561A1 100%);
 --font-30: 60px;
}
* {
  margin: 0;
  padding: 0;
  letter-spacing: 1px;
}
body {
  background: var(--bg-night);
  min-height: 100vh;
  min-width: 100vw;
  color: var(--white);
}
#app {
  font-family: 'Open Sans', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}
.container {
  max-width: 1100px;
  margin: 0 auto;
}
.heading {
    text-align: left;
    position: relative;
    width: max-content;
}
.heading::after {
    position: absolute;
    content: "";
    top: 10px;
    right: -120px;
    width: 100px;
    height: 1px;
    background-color: #FFFFFF;
}
@media only screen and (max-width: 600px) {
  .container {
    max-width: 90vw;
  }
}
</style>
