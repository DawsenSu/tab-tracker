import Vue from 'vue'
import Vuex from 'vuex'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import router from './router'
import Panel from './components/Panel.vue'
import store from './store/store'

Vue.config.productionTip = false
Vue.component('panel', Panel)

new Vue({
  vuetify,
  router,
  Vuex,
  store,
  render: h => h(App)
}).$mount('#app')
