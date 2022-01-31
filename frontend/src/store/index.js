import Vue from "vue";
import Vuex from "vuex";
import router from "../router/index";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    token: localStorage.getItem("token") || null,
    user: JSON.parse(localStorage.getItem("user")) || null,
    signIn: {
      signInLoading: false,
      signInDisabled: false,
      signInErrorSnackbar: false,
      signInErrorPayload: null,
      signInSuccessSnackbar: false,
      signInSuccessPayload: null,
    },
  },
  getters: {
    getUser: (state) => state.user,
    getToken: (state) => state.token,
  },
  mutations: {
    loginUser(state, userData) {
      state.token = userData.token;
      state.refreshToken = userData.refreshToken;
      state.user = userData.user;
    },
    signOut(state) {
      state.user = null;
      state.token = null;
      localStorage.clear();
    },
    startLoader(state) {
      state.signIn.signInLoading = true;
      state.signIn.signInDisabled = true;
    },
    stopLoader(state) {
      state.signIn.signInLoading = false;
      state.signIn.signInDisabled = false;
    },
    signInError(state, error) {
      state.signIn.signInErrorSnackbar = true;
      state.signIn.signInErrorPayload = error;
    },
  },
  actions: {
    SIGN_IN({ commit }, authData) {
      const data = {
        email: authData.email,
        password: authData.password,
      };
      commit("startLoader");
      fetch("/api/v1/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((r) => r.json())
        .then((response) => {
          console.log("SIGNIN RESPONSE", response);
          //status failed or false
          if (response.status === "failed") {
            commit("stopLoader");
            commit("signInError", response.message);
          } else {
            console.log("RESPONSE",response)
            const { token, user } = response
            commit('loginUser', {
              token: token,
              user: user,
            })
            //Emit Socket Event
            //Save To Local Storage
            localStorage.setItem('token', token)
            localStorage.setItem('user', JSON.stringify(user))
            router.push("/");
            commit("stopLoader");
          }
        })
        .catch((error) => {
          console.log("Error>>>", error);
          commit("signInError", error);
          commit("stopLoader");
        });
    },
    SIGN_UP({ commit }, authData) {
      const data = {
        fullName: authData.fullName,
        email: authData.email,
        phone: authData.phone,
        password: authData.password,
      };
      commit("startLoader");
      fetch("/api/v1/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((r) => r.json())
        .then((response) => {
          console.log("RESPONSE>>>", response);
          if (response.status === "failed") {
            commit("signInError", response.message);
            commit("stopLoader");
          } else {
            commit("registerUser", { user: response.payload });
            commit("SignUpSuccessful");
            commit("stopLoader");
          }
        })
        .catch((error) => {
          console.log("Error>>>>>>>>>>>>>", error);
          commit("signUpError", error);
          commit("stopLoader");
        });
    },
    SIGN_OUT({ commit }) {
      router.push("/login");
      commit("signOut");
    },
    //Sockets - Note Dont use arrow functions
    socket_connect(data) {
      console.log("Socket Connected!", data);
    },
    socket_disconnect(data) {
      console.log("Socket disconnected!", data);
    },
  },
  modules: {},
});
