<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-transparent mx-auto">
    <router-link :to="{ path: '/' }" v-slot="{ href }" custom>
      <a class="navbar-brand" :href="href">Home</a>
    </router-link>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="navbarSupportedContent">
    <ul class="navbar-nav mr-auto">
      <router-link :to="{name: 'courses'}" v-slot="{ href, route, isActive }" custom>
        <li :class="['nav-item', {active: isActive}]">
          <a class="nav-link text-capitalize" :href="href">{{ route.name }}</a>
        </li>
      </router-link>
      
    </ul>
    </div>
  </nav>
  <!-- Position it -->
  <div id="toast-container">
    <AppToast v-for="toast in toasts"
      :key="toast.id"

      :toast="toast"
    />
  </div>
</template>

<script>
import { useToast } from "@/composables/toast"
import AppToast from '@/components/layout/AppToast.vue';

export default {
  components: {
    AppToast
  },
  setup() {
    const { toasts } = useToast();

    return {
      toasts
    }
  },
}
</script>

<style scoped>
.navbar {
    max-width: 1200px;
}

/* TOAST */
#toast-container {
    position: fixed;
    top: 13px;
    right: 20px;
    z-index: 100;
    min-width: 309px;
}
</style>