import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
import io from 'socket.io-client'
import VueSocketIOExt from 'vue-socket.io-extended'

const socket = io('https://lexnos.unicoms.ng')

Vue.use(VueSocketIOExt, socket, { store })

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
