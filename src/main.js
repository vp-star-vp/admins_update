import Vue from 'vue'
import { ToastPlugin, ModalPlugin } from 'bootstrap-vue'
import VueCompositionAPI from '@vue/composition-api'

import router from './router'
import store from './store'

// console.log('--- import: store')

import App from './App.vue'

// Global Components
import './global-components'

// 3rd party plugins
// import '@/libs/portal-vue'
// import '@/libs/toastification'

// Axios Mock Adapter
// import '@/@fake-db/db'
import '@/libs/acl'

// BSV Plugin Registration
// Vue.use(ToastPlugin)
// Vue.use(ModalPlugin)

// Composition API
Vue.use(VueCompositionAPI)
require('@core/assets/fonts/feather/iconfont.css')
// import core styles
require('@core/scss/core.scss')

// import assets styles
require('@/assets/scss/style.scss')

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
