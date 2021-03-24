<template>
  <v-main class="custom__gradient-bg">
    <v-container fill-height fluid>
      <v-row align="center" justify="center">
        <v-card width="450px" class="pa-6">
          <h2 class="text-center">
            <span class="text-h3 font-weight-light black--text"
              >Lex<span class="primary--text font-weight-bold">NOS</span>
            </span>
          </h2>
          <h6 class="text-center black--text text-body-2">
            Lexington Nimc Onboarding System
          </h6>
          <v-card-text class="pb-0">
            <v-form @submit.prevent ref="form">
              <v-row justify="center">
                <v-col cols="12" md="12">
                  <v-text-field
                    hide-details="auto"
                    v-model="email"
                    solo
                    class="mt-4"
                    label="Email"
                    name="Email"
                    prepend-inner-icon="mdi-email"
                    type="text"
                    color="primary"
                    :rules="[rules.required, rules.email]"
                  />
                </v-col>
                <v-col cols="12" md="12">
                  <v-text-field
                    hide-details="auto"
                    v-model="password"
                    :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                    :type="showPassword ? 'text' : 'password'"
                    solo
                    label="Password"
                    name="password"
                    prepend-inner-icon="mdi-lock"
                    color="primary"
                    @click:append="showPassword = !showPassword"
                    :rules="[rules.required, rules.password]"
                  />
                </v-col>
              </v-row>
            </v-form>
            <div class="text-center mt-3">
              <v-btn
                @click="signIn()"
                :loading="signInMetaData.signInLoading"
                :disabled="signInMetaData.signInDisabled"
                block
                class="text-capitalize white--text mt-10 custom__gradient-button"
                >Sign In</v-btn
              >
            </div>
            <v-row no-gutters class="mt-2">
              <v-col cols="6">
                <v-avatar class="profile" color="transparent" size="160" tile>
                  <v-img
                    contain
                    src="../assets/lexington-tech-logo.png"
                  ></v-img>
                </v-avatar>
              </v-col>
              <v-col cols="6">
                <v-avatar class="profile" color="transparent" size="160" tile>
                  <v-img contain src="../assets/nimc2.jpg"></v-img>
                </v-avatar>
              </v-col>
            </v-row>
            <div class="text-center mt-2">
              <span class="black--text caption"
                >Lexington Technologies© 2021. All rights reserved.</span
              >
            </div>
          </v-card-text>
        </v-card>
      </v-row>
      <v-snackbar
        bottom
        color="warning"
        timeout="5000"
        v-model="signInMetaData.signInErrorSnackbar"
      >
        {{ signInMetaData.signInErrorPayload }}
      </v-snackbar>
    </v-container>
  </v-main>
</template>

<script>
export default {
  data: () => ({
    email: "",
    password: "",
    showPassword: "",
    loading: false,
    disabled: false,
    rules: {
      required: (v) => !!v || "Field is required",
      counter: (v) => (v && v.length >= 3) || "Minimum length is 3 characters",
      email: (value) => {
        const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return pattern.test(value) || "Invalid e-mail.";
      },
      password: (value) =>
        (value && value.length >= 6) || "Minimum length is 6 characters",
    },
  }),
  methods: {
    signIn() {
      const signInData = {
        email: this.email,
        password: this.password,
      };
      if (this.$refs.form.validate()) {
        this.$store.dispatch("SIGN_IN", signInData);
      }
    },
  },
  computed: {
    signInMetaData() {
      return this.$store.state.signIn;
    },
  },
};
</script>

<style lang="scss">
.custom__gradient-bg {
  min-height: 100vh;
  background: #00d2ff; /* fallback for old browsers */
  background: -webkit-linear-gradient(
    to right,
    #3498db,
    #00d2ff
  ); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(
    to right,
    #3498db,
    #00d2ff
  ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
}
.custom__gradient-button {
  background: #00d2ff; /* fallback for old browsers */
  background: -webkit-linear-gradient(
    to right,
    #3498db,
    #00d2ff
  ); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(
    to right,
    #3498db,
    #00d2ff
  ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
}
</style>