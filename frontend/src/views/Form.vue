<template>
  <div class="grey lighten-4 pa-4" style="min-height: 100vh">
    <v-container fluid>
      <v-row>
        <v-col cols="12">
          <v-card
            v-if="user.isPayment == true"
            :disabled="disabled"
            class="mt-4"
          >
            <v-card-title class="">Application Form </v-card-title>
            <v-divider></v-divider>
            <v-stepper v-model="formStepper">
              <v-stepper-header class="elevation-0">
                <v-stepper-step
                  :complete="formStepper > 1"
                  step="1"
                  color="secondary"
                >
                  Personal Information
                </v-stepper-step>
                <v-divider></v-divider>
                <v-stepper-step color="secondary" step="2">
                  Declaration by Student
                </v-stepper-step>
              </v-stepper-header>
              <v-divider></v-divider>
              <v-stepper-items>
                <v-stepper-content step="1">
                  <v-row dense>
                    <v-col cols="6">
                      <v-text-field
                        prepend-inner-icon="mdi-account"
                        hide-details="auto"
                        label="Name of Applicant"
                        type="text"
                        color="primary"
                        v-model="fullName"
                      />
                    </v-col>
                  </v-row>
                  <v-row dense>
                    <v-col cols="6">
                      <v-radio-group v-model="program" row>
                        <v-radio
                          label="Basic Nursing"
                          value="nursing"
                          color="primary"
                        ></v-radio>
                        <v-radio
                          label="Basic Midwifery"
                          value="midwifery"
                          color="primary"
                        ></v-radio>
                      </v-radio-group>
                    </v-col>
                    <v-col cols="12">
                      <span
                        >How did you come to know about the college? Please tick
                        your source(s)</span
                      >
                    </v-col>
                    <v-col cols="3">
                      <v-checkbox
                        v-model="source"
                        label="Friends"
                        value="friends"
                        hide-details="auto"
                      ></v-checkbox>
                    </v-col>
                    <v-col cols="3">
                      <v-checkbox
                        v-model="source"
                        label="Relatives"
                        value="relatives"
                        hide-details="auto"
                      ></v-checkbox>
                    </v-col>
                    <v-col cols="3">
                      <v-checkbox
                        v-model="source"
                        label="Peer Group"
                        value="peerGroup"
                        hide-details="auto"
                      ></v-checkbox>
                    </v-col>
                    <v-col cols="3">
                      <v-checkbox
                        v-model="source"
                        label="Alumni"
                        value="alumni"
                        hide-details="auto"
                      ></v-checkbox>
                    </v-col>
                    <v-col>
                      <v-checkbox
                        v-model="source"
                        label="Media"
                        value="media"
                        hide-details="auto"
                      ></v-checkbox>
                    </v-col>
                    <v-col cols="3">
                      <v-checkbox
                        v-model="source"
                        label="Word of Mouth"
                        value="wordOfMouth"
                        hide-details="auto"
                      ></v-checkbox>
                    </v-col>
                    <v-col cols="3">
                      <v-checkbox
                        v-model="source"
                        label="Website"
                        value="website"
                        hide-details="auto"
                      ></v-checkbox>
                    </v-col>
                    <v-col cols="3">
                      <v-checkbox
                        v-model="source"
                        label="Education Fair"
                        value="educationFair"
                        hide-details="auto"
                      ></v-checkbox>
                    </v-col>
                    <v-col cols="3">
                      <v-checkbox
                        v-model="source"
                        label="College Staff"
                        value="collegeStaff"
                        hide-details="auto"
                      ></v-checkbox>
                    </v-col>
                    <v-col cols="3">
                      <v-checkbox
                        v-model="source"
                        label="Social Media"
                        value="socialMedia"
                        hide-details="auto"
                      ></v-checkbox>
                    </v-col>
                  </v-row>
                  <v-row dense>
                    <v-col cols="3">
                      <div class="d-flex justify-center">
                        <v-avatar size="200">
                          <img :src="imageUrlPreview" alt="Logo" />
                        </v-avatar>
                      </div>
                      <v-file-input
                        label="Upload Passport"
                        @change="Preview_image"
                        v-model="image"
                        color="primary"
                        prepend-icon="mdi-camera"
                        accept="image/*"
                        show-size
                        hide-details="auto"
                      ></v-file-input>
                    </v-col>
                  </v-row>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                      @click="formStepper = 2"
                      small
                      color="primary white--text"
                      class="text-capitalize"
                    >
                      Next
                    </v-btn>
                  </v-card-actions>
                </v-stepper-content>
                <v-stepper-content step="2">
                  <div>
                    <v-icon color="success" class="mr-2">mdi-check</v-icon>
                    <span
                      >I have read the rules and regulations regarding the
                      prospective course for admission in the college.</span
                    >
                  </div>
                  <div>
                    <v-icon color="success" class="mr-2">mdi-check</v-icon>
                    <span
                      >I solely affirm that all the information in the previous
                      section(s) given by me and in enclosures are true and
                      correct. I understand that if any information furnished
                      therin is found to be untrue in material content, I shall
                      be liable to legal action and may also be expelled from
                      the college/admission may be cancelled by
                      council/college.</span
                    >
                  </div>
                  <div>
                    <v-icon color="success" class="mr-2">mdi-check</v-icon>
                    <span
                      >I understand that the Personality Enhancement
                      Programme(PEP) & Hospital Oriented Programme(HOP) is
                      essential for the enhancement of my entire personality and
                      that i shall regularly attend the programme.</span
                    >
                  </div>
                  <div>
                    <v-icon color="success" class="mr-2">mdi-check</v-icon>
                    <span
                      >I stand solely responsible for missing my classes due to
                      absenteeism. Strict disciplinary action to the extent of
                      termination from college roll sheet can be taken against
                      me if i am found violating the rules of the college.</span
                    >
                  </div>
                  <div>
                    <v-icon color="success" class="mr-2">mdi-check</v-icon>
                    <span
                      >I undertake to the tuition/hostel/other dues
                      regularly.</span
                    >
                  </div>
                  <div>
                    <v-icon color="success" class="mr-2">mdi-check</v-icon>
                    <span
                      >I commit to follow the uniform norms (dress code) of the
                      college.</span
                    >
                  </div>
                  <div>
                    <v-icon color="success" class="mr-2">mdi-check</v-icon>
                    <span
                      >I know the admission procedures clearly. I wont claim for
                      any fee refund from the college in any circumstance.</span
                    >
                  </div>
                  <div>
                    <v-icon color="success" class="mr-2">mdi-check</v-icon>
                    <span
                      >I will not do anything either inside or outside the
                      college premises that interfere with its oderly working
                      and discipline.</span
                    >
                  </div>
                  <div>
                    <v-icon color="success" class="mr-2">mdi-check</v-icon>
                    <span
                      >I declare that i have not been involved in any unfair
                      means at college examination.
                    </span>
                  </div>
                  <div>
                    <v-icon color="success" class="mr-2">mdi-check</v-icon>
                    <span
                      >I understand that if the college at anytime disqualifies
                      me for enrolment/examination, the admission given to me
                      will automatically be cancelled and i shall not hold the
                      institution responsible for the same.
                    </span>
                  </div>
                  <div>
                    <v-icon color="success" class="mr-2">mdi-check</v-icon>
                    <span
                      >I hereby declare that i have fully read aforementioned
                      rules, regulations, policy e.t.c. framed by
                      college/nursing and midwifery council of Nigeria for
                      admission and swear to abide by the same. If any kind of
                      breach is observed, it will be my whole and sole personal
                      responsibility for the same. I understand that if i leave
                      the college after joining the classes whatsoever may be
                      the reason, I will not claim for refunds of fees. All the
                      amount deposited with the institution will be forfieted.
                    </span>
                  </div>
                  <div>
                    <v-icon color="success" class="mr-2">mdi-check</v-icon>
                    <span>
                      I hereby declare that i am aware that using of mobile
                      phone within the college/hostel campuses is strictly
                      prohibited during the school hours or any
                      official/academic gathering. In case of violation of this
                      rule by me, same will be confiscated.
                    </span>
                  </div>
                  <div>
                    <v-icon color="success" class="mr-2">mdi-check</v-icon>
                    <span>
                      I understand that if my attendance falls below 90%, i will
                      not be allowed to appear for final examination of the
                      college/council examination.
                    </span>
                  </div>
                  <div>
                    <v-checkbox v-model="checkbox">
                      <template v-slot:label>
                        <span class="font-weight-bold black--text">
                          I agree with all the above terms and conditions.
                        </span>
                      </template>
                    </v-checkbox>
                  </div>
                  <v-card-actions class="mt-4">
                    <v-spacer></v-spacer>
                    <v-btn
                      @click="submitForm()"
                      color="primary white--text"
                      class="text-capitalize"
                      small
                    >
                      Submit
                    </v-btn>
                    <v-btn
                      small
                      dark
                      color="red white--text"
                      class="text-capitalize"
                      @click="formStepper = 1"
                    >
                      Back
                    </v-btn>
                  </v-card-actions>
                </v-stepper-content>
              </v-stepper-items>
            </v-stepper>
          </v-card>
          <v-card v-else>
            <v-card-title>
              Instructions for Payment process, please read carefully.
            </v-card-title>
            <v-card-text>
              <ol>
                <li>
                  Please return to the dashboard and make your payment first.
                </li>
                <div>
                  <v-btn to="/" color="info" small class="my-2 text-capitalize">
                    Return to Dashboard
                  </v-btn>
                </div>
              </ol>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
// @ is an alias to /src

// import LineChart from "../components/LineChart.vue";
export default {
  name: "Home",
  components: {
    // LineChart,
  },
  data: () => ({
    checkbox: false,
    // row: null,
    datepicker: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
      .toISOString()
      .substr(0, 10),
    // image1: null,
    imageUrlPreview: require("../assets/avatar-2.png"),
    formStepper: 1,
    paystackkey: "pk_test_225a9f8342058f3c6781f3a3c29c4c74a357348f", //paystack public key
    email: "foobar@example.com", // Customer email
    amount: 10000, // in kobo
    userPaid: false,
    // disabledCard: true,
    // paymentMade: false,
    disabled: false,
    fullName: "",
    program: "",
    source: [],
    image: null,
  }),
  computed: {
    token() {
      return this.$store.getters.getToken;
    },
    user() {
      return this.$store.getters.getUser;
    },
  },
  methods: {
    Preview_image() {
      this.imageUrlPreview = URL.createObjectURL(this.image);
    },
    submitForm() {
      // console.log(this.fullName);
      // console.log(this.program);
      // console.log(this.source);
      // console.log(this.image);
      const fullName = this.fullName;
      const program = this.program;
      const source = this.source;
      const image = this.image;
      const formData = new FormData();
      formData.append("image", image);
      formData.append("fullName", fullName);
      formData.append("program", program);
      formData.append("source", source);
      console.log(formData)
      fetch("http://18.222.126.74:3000/api/forms/newform", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-token": this.token,
        },
        body: formData
      })
        .then((r) => r.json())
        .then((response) => {
          console.log("Response", response);
        })
        .catch((error) => {
          console.log("Error>>>", error);
        });
    },
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