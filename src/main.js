import { createApp } from 'vue'
import App from './App.vue'
import router from '@/scripts/router-config';

import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'nprogress/nprogress.css'
import { VuelidatePlugin } from '@vuelidate/core'

const app = createApp(App)
app.use(router)
app.use(VuelidatePlugin)
app.mount('#app')
