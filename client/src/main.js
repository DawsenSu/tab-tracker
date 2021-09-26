import Vue from 'vue'
import Vuex from 'vuex'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import Panel from './components/Panel.vue'
import VueYouTubeEmbed from 'vue-youtube-embed'
import { sync } from 'vuex-router-sync'
import router from './router'
import store from './store/store'

Vue.config.productionTip = false
Vue.component('panel', Panel)
Vue.use(VueYouTubeEmbed)
sync(store, router)

new Vue({
  vuetify,
  router,
  Vuex,
  store,
  render: h => h(App)
}).$mount('#app')
