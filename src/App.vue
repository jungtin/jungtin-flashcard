<template>
  <AppNavbar/>
  <router-view></router-view>
</template>

<script>
import AppNavbar from '@/components/layout/AppNavbar.vue';

export default {
  components: {
    AppNavbar
  }
}
</script>

<style>

</style>