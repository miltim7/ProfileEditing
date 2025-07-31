<!-- src\App.vue -->

<template>
  <div id="app">
    <Header />
    <Profile />
    <Footer />
  </div>
</template>

<script>
import Header from './components/Header.vue'
import Profile from './components/Profile.vue'
import Footer from './components/Footer.vue'

export default {
  name: 'App',
  components: {
    Header,
    Profile,
    Footer
  }
}
</script>

<style>
@import './assets/main.css';
</style>