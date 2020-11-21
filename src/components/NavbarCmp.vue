<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <a class="navbar-brand" href="#">Navbar</a>
    <button
      class="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#navbarSupportedContent"
      aria-controls="navbarSupportedContent"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav mr-auto">
        <li class="nav-item">
          <a class="nav-link" @click="changeCurrentTab('AppHome')">Home</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" @click="changeCurrentTab('AppSecuredContent')">Secured Content</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" @click="changeCurrentTab('AppEmailVerifiedContent')">Secured(Email Verified) Content</a>
        </li>
        <template v-if="!isLogined">
            <li class="nav-item">
                <a class="nav-link" @click="changeCurrentTab('AppLogin')">Login</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" @click="changeCurrentTab('AppLoginSocial')">Login with OAuth2</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" @click="changeCurrentTab('AppRegister')">Register</a>
            </li>
        </template>
        <template v-else>
            <li class="nav-item">
                <a class="nav-link" @click="changeCurrentTab('AppUserInfo')">User Info</a>
            </li>
            <li class="nav-item">
                <button class="btn btn-danger" @click="logout">Logout</button>
            </li>
        </template>
        
      </ul>
    </div>
  </nav>
</template>

<script>
import { auth} from "@/firebase/init"

export default {
  data() {
    return {
        isLogined: false   
    }
  },
  methods: {
    changeCurrentTab(cmpName) {
        this.$emit("change-current-tab", cmpName);
    },
    logout() {
        auth.signOut();
    }
  },
  created() {
    auth.onAuthStateChanged(user => {
        if (user) {
            this.isLogined = true;
        } else {
            this.isLogined = false;
        }
    });
  }
};
</script>

<style>
</style>