<template>
  <div class="grey lighten-4 pa-4" style="min-height: 100vh">
    <v-container fluid>
      <v-row>
        <v-col cols="9">
          <v-card flat>
            <v-card-title>
              Instructions for Application process, please read carefully.
            </v-card-title>
            <v-card-text>
              <ol>
                <li>
                  Please start making payment by clicking the make payment
                  button below.
                </li>
                <li>
                  Registration Fees is
                  <span class="success--text">N10,000</span>. click the button
                  down below and pay with your card.
                </li>
                <div>
                  <paystack
                    :amount="amount * 100"
                    :email="email"
                    :paystackkey="paystackkey"
                    :reference="reference"
                    :callback="callback"
                    :close="close"
                    :embed="false"
                    class="
                      white--text
                      success
                      text-capitalize
                      v-btn v-btn--contained
                      theme--light
                      v-size--small
                      v-btn--is-elevated
                      my-2
                    "
                  >
                    Make Payment
                    <v-icon color="white">mdi-cash</v-icon>
                  </paystack>
                </div>
                <li>
                  After payment have been successfully approved and verified,
                  the application card will be enabled and you can then proceed
                  by filling the personal information form.
                </li>
                <li>
                  After filling the personal information section, click on next
                  and tick "i agree" on the declaration of student section.
                </li>
                <li>
                  Download the guarantor form below, fill it and bring it to the
                  registration point when you have been admitted.
                </li>
                <div>
                  <v-btn color="secondary" small class="my-2 text-capitalize">
                    Download guarantor form
                    <v-icon color="white" small>mdi-download</v-icon>
                  </v-btn>
                </div>
              </ol>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="3">
          <v-card class="text-center mt-14 white">
            <div>
              <v-avatar size="75" class="mt-n10 white">
                <img src="../assets/avatar-2.png" alt="Logo" />
              </v-avatar>
            </div>
            <v-card-title class="row justify-center">{{user.fullName}}</v-card-title>
            <v-card-subtitle class="text-center py-0"
              >{{user.email}}</v-card-subtitle
            >
            <v-card-subtitle class="text-center py-0 font-weight-bold"
              >Payment Status:
              <span class="secondary--text mr-2">{{user.isPayment}}</span>
              <v-icon size="20" color="secondary">mdi-progress-clock</v-icon>
            </v-card-subtitle>
            <v-card-subtitle class="text-center pt-0 font-weight-bold"
              >Admission Status:
              <span class="secondary--text mr-2">...</span>
              <v-icon size="20" color="secondary">mdi-progress-clock</v-icon>
            </v-card-subtitle>
          </v-card>
          <!-- <div class="mt-4">
            <v-date-picker
              color="secondary"
              full-width
              v-model="datepicker"
            ></v-date-picker>
          </div> -->
        </v-col>
      </v-row>
      <v-row>
        <!-- <v-col cols="3">
          <v-card class="text-center mt-14 white">
            <div>
              <v-avatar size="75" class="mt-n10 white">
                <img src="../assets/avatar-2.png" alt="Logo" />
              </v-avatar>
            </div>
            <v-card-title class="row justify-center"
              >Jane Doe</v-card-title
            >
            <v-card-subtitle class="text-center py-0"
              >janedoe@gmail.com</v-card-subtitle
            >
            <v-card-subtitle
              class="text-center pt-0 font-weight-bold"
              >Payment Status:
              <span class="secondary--text mr-2">Pending</span>
              <v-icon size="20" color="secondary">mdi-progress-clock</v-icon>
            </v-card-subtitle>
          </v-card>
          <div class="mt-4">
            <v-date-picker
              color="secondary"
              full-width
              v-model="datepicker"
            ></v-date-picker>
          </div>
        </v-col> -->
      </v-row>
    </v-container>
  </div>
</template>

<script>
// @ is an alias to /src

import paystack from "vue-paystack";
// import LineChart from "../components/LineChart.vue";
export default {
  name: "Home",
  components: {
    // LineChart,
    paystack,
  },
  data: () => ({
    checkbox: false,
    row: null,
    selectedSource: [],
    datepicker: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
      .toISOString()
      .substr(0, 10),
    image: null,
    imageUrlPreview: require("../assets/avatar-2.png"),
    formStepper: 1,
    userHeaders: [
      { text: "Image", value: "image" },
      { text: "Full Name", value: "name", sortable: true },
      { text: "Phone", value: "phone", sortable: false },
      { text: "Email", value: "email", sortable: false },
      { text: "Nin", value: "nin", sortable: false },
      { text: "State", value: "state" },
      { text: "LGA", value: "lga" },
      { text: "Address", value: "address" },
      { text: "Lat/Lng" },
      { text: "Date Joined", value: "createdAt" },
      { text: "locate" },
    ],
    paystackkey: "pk_test_225a9f8342058f3c6781f3a3c29c4c74a357348f", //paystack public key
    email: "foobar@example.com", // Customer email
    amount: 10000, // in kobo
    userPaid: false,
    // disabledCard: true,
    paymentMade: false,
  }),
  computed: {
    token() {
      return this.$store.getters.getToken;
    },
    user() {
      return this.$store.getters.getUser;
    },
    reference() {
      let text = "";
      let possible =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

      for (let i = 0; i < 10; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));

      return text;
    },
  },
  methods: {
    viewLocation(item) {
      console.log("Item", item);
      this.$router.push("/view/" + item._id);
    },
    Preview_image() {
      this.imageUrlPreview = URL.createObjectURL(this.image);
    },
    fetchCentres() {
      fetch("https://lexnos.unicoms.ng/api/v1/centre", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "x-token": this.token,
        },
      })
        .then((r) => r.json())
        .then((response) => {
          console.log("Response", response);
          this.centres = response.payload;
        })
        .catch((error) => {
          console.log("Error>>>", error);
        });
    },
    callback: function (response) {
      console.log(response.reference);
      fetch(`http://18.222.126.74/api/paystack/verify/${response.reference}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "x-token": this.token,
        },
      })
        .then((r) => r.json())
        .then((response) => {
          console.log("Response", response);
        })
        .catch((error) => {
          console.log("Error>>>", error);
        });
    },
    close: function () {
      console.log("Payment closed");
    },
  },
  mounted() {
    this.fetchCentres();
  },
};
</script>

<style lang="scss">
.custom__card-bg {
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