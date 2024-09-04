<script>
import AppHeader from "./components/AppHeader.vue"
import AppFooter from "./components/AppFooter.vue"

export default {
  components: { AppHeader, AppFooter }
}
</script>

<template>
  <div class="wrapper">
    <AppHeader />
    <router-view />
    <AppFooter />
  </div>
</template>

<style scoped>
.wrapper {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}
</style>
