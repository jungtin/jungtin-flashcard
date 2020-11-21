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
import { auth } from "@/firebase/init"

import NavbarCmp from '@/components/NavbarCmp.vue';
import AppHome from '@/components/AppHome.vue';
import AppLogin from '@/components/AppLogin.vue';
import AppLoginSocial from '@/components/AppLoginSocial.vue';
import AppRegister from '@/components/AppRegister.vue';
import AppSecuredContent from '@/components/AppSecuredContent.vue';
import AppEmailVerifiedContent from '@/components/AppEmailVerifiedContent.vue';
import AppUserInfo from '@/components/AppUserInfo.vue';

export default {
  components: {
    NavbarCmp,
    AppHome,
    AppLogin,
    AppLoginSocial,
    AppRegister,
    AppSecuredContent,  
    AppEmailVerifiedContent,
    AppUserInfo,
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