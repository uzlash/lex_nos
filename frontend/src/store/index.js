import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
    //Sockets - Note Dont use arrow functions
    socket_connect(data) {
      console.log('Socket Connected!', data)
    },
    socket_disconnect(data) {
      console.log('Socket disconnected!', data)
    }
  },
  modules: {
  }
})
