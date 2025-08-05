<!-- src\App.vue -->

<template>
  <div>
    <Header />
    <ProfileEditing />
    <Footer />
  </div>
</template>

<script>
import Header from './components/Header.vue'
import ProfileEditing from './components/ProfileEditing.vue'
import Footer from './components/Footer.vue'

export default {
  name: 'App',
  components: {
    Header,
    ProfileEditing,
    Footer
  }
}
</script>

<style>
@import './assets/main.css';
</style>