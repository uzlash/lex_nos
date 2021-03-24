import Vue from 'vue'
import Vuex from 'vuex'
import router from '../router/index'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: localStorage.getItem('token') || null,
    user: JSON.parse(localStorage.getItem('user')) || null,
    signIn: {
      signInLoading: false,
      signInDisabled: false,
      signInErrorSnackbar: false,
      signInErrorPayload: null,
      signInSuccessSnackbar: false,
      signInSuccessPayload: null,
    },
  },
  mutations: {
    loginUser(state, userData) {
      state.token = userData.token
      state.refreshToken = userData.refreshToken
      state.user = userData.user
    },
    signOut(state) {
      state.user = null
      state.token = null
      localStorage.clear()
    },
    startLoader(state) {
      state.signIn.signInLoading = true
      state.signIn.signInDisabled = true
    },
    stopLoader(state) {
      state.signIn.signInLoading = false
      state.signIn.signInDisabled = false
    },
    signInError(state, error) {
      state.signIn.signInErrorSnackbar = true
      state.signIn.signInErrorPayload = error
    }
  },
  actions: {
    SIGN_IN({ commit }, authData) {
      commit('startLoader')
      fetch('https://api.narr.ng' + '/api/v1/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: authData.email,
          password: authData.password,
        }),
      })
        .then((r) => r.json())
        .then((response) => {
          //status failed or false
          if (response.status === 'failed') {
            commit('stopLoader')
            commit('signInError', response.message)
          } else {
            const { token, user } = response.payload
            commit('loginUser', {
              token: token,
              user: user,
            })
            //Emit Socket Event
            this._vm.$socket.client.emit('LOGIN', { token, user })
            //Save To Local Storage
            localStorage.setItem('token', response.payload.token)
            localStorage.setItem('user', JSON.stringify(response.payload.user))
            router.push('/')
            commit('stopLoader')
          }
        })
        .catch((error) => {
          console.log('Error>>>', error)
          commit('signInError', error)
          commit('stopLoader')
        })
    },
    SIGN_OUT({ commit }) {
      router.push('/login')
      commit('signOut')
    },
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
