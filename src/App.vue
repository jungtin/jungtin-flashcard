<template>
  <NavbarCmp @changeCurrentTab="currentTab = $event"/>
  <div class="container">
    <div class="row mt-5">
      <div class="col">
        <component :is="currentTab"></component>
      </div>
    </div>
  </div>
</template>

<script>
import NavbarCmp from '@/components/NavbarCmp.vue';
import AppHome from '@/components/AppHome.vue';
export default {
  components: {
    NavbarCmp,
    AppHome,
  },
  data() {
    return {
      currentTab: "AppHome"
    }
  },
}
</script>

<style>

</style>