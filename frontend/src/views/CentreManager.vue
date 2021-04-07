<template>
  <div class="grey lighten-4 pa-4" style="height: 100vh">
    <v-row>
      <v-col cols="12">
        <v-card>
          <v-data-table :headers="userHeaders" :items="centres" sort-by="name">
            <template v-slot:top>
              <v-toolbar flat>
                <v-toolbar-title>Registered Locations</v-toolbar-title>
                <v-divider class="mx-4" inset vertical></v-divider>
                <v-spacer></v-spacer>
                <v-dialog v-model="dialogAdd" persistent max-width="600px">
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                      class="text-capitalize"
                      color="primary"
                      dark
                      v-bind="attrs"
                      v-on="on"
                    >
                      Add Location
                    </v-btn>
                  </template>
                  <v-card>
                    <v-card-title>
                      <span class="text-h5 font-weight-thin ml-2"
                        >Add Location</span
                      ></v-card-title
                    >
                    <v-card-text class="py-0">
                      <v-container>
                        <v-form @submit.prevent ref="form">
                          <v-row>
                            <v-col cols="12">
                              <v-text-field
                                v-model="newCentre.name"
                                color="primary"
                                label="Full Name"
                                solo
                                hide-details="auto"
                                prepend-icon="mdi-account"
                                :rules="[rules.required]"
                              ></v-text-field>
                            </v-col>
                            <v-col cols="12">
                              <v-text-field
                                v-model="newCentre.phone"
                                color="primary"
                                label="Phone"
                                solo
                                hide-details="auto"
                                prepend-icon="mdi-phone"
                                :rules="[rules.required]"
                              ></v-text-field>
                            </v-col>
                            <v-col cols="12">
                              <v-text-field
                                type="email"
                                prepend-icon="mdi-email"
                                color="primary"
                                solo
                                v-model="newCentre.email"
                                hide-details="auto"
                                label="Email"
                                :rules="[rules.required, rules.email]"
                              ></v-text-field>
                            </v-col>
                            <v-col cols="12">
                              <v-text-field
                                type="number"
                                v-model="newCentre.nin"
                                color="primary"
                                label="Nin"
                                counter="11"
                                solo
                                hide-details="auto"
                                prepend-icon="mdi-account"
                                :rules="[rules.required, rules.maxChar]"
                              ></v-text-field>
                            </v-col>
                            <v-col cols="12">
                              <v-text-field
                                v-model="newCentre.address"
                                hide-details="auto"
                                color="primary"
                                label="Address"
                                solo
                                prepend-icon="mdi-map-marker-outline"
                                :rules="[rules.required]"
                              ></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="12" md="6">
                              <v-select
                                @change="fetchLgas"
                                v-model="newCentre.state"
                                prepend-icon="mdi-map"
                                hide-details="auto"
                                solo
                                label="State"
                                :items="states"
                                color="primary"
                                :rules="[rules.required]"
                              />
                            </v-col>
                            <v-col cols="12" sm="12" md="6">
                              <v-select
                                v-model="newCentre.lga"
                                prepend-icon="mdi-map"
                                hide-details="auto"
                                solo
                                label="LGA"
                                :items="lgas"
                                color="primary"
                                :rules="[rules.required]"
                              />
                            </v-col>
                            <v-col cols="12" sm="12" md="6">
                              <v-text-field
                                v-model.number="newCentre.latitude"
                                hide-details="auto"
                                color="primary"
                                label="Latitude"
                                solo
                                prepend-icon="mdi-map-marker"
                                :rules="[rules.required]"
                              ></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="12" md="6">
                              <v-text-field
                                v-model.number="newCentre.longitude"
                                color="primary"
                                label="Longitude"
                                solo
                                hide-details="auto"
                                prepend-icon="mdi-map-marker"
                                :rules="[rules.required]"
                              ></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="12" md="6">
                              <v-file-input
                                @change="Preview_image"
                                v-model="newCentre.image"
                                color="accent"
                                prepend-icon="mdi-camera"
                                accept="image/*"
                                show-size
                                :clearable="false"
                                solo
                                label="Location Image"
                                hide-details="auto"
                              ></v-file-input>
                            </v-col>
                            <v-col cols="12" sm="6" md="6">
                              <img
                                v-if="newCentre.image"
                                height="200"
                                width="100%"
                                :src="imageUrlPreview"
                              />
                            </v-col>
                          </v-row>
                        </v-form>
                      </v-container>
                    </v-card-text>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn
                        color="red white--text text-capitalize"
                        @click="dialogAdd = false"
                      >
                        Close
                      </v-btn>
                      <v-btn
                        color="accent white--text text-capitalize"
                        @click="addCentre()"
                      >
                        Add
                      </v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </v-toolbar>
            </template>
            <template v-slot:item="{ item }">
              <tr>
                <td class="pa-2">
                  <v-avatar size="50">
                    <v-img :src="item.image"></v-img
                  ></v-avatar>
                </td>
                <td>{{ item.name }}</td>
                <td>{{ item.phone }}</td>
                <td>{{ item.email }}</td>
                <td>{{ item.nin }}</td>
                <td>{{ item.state.toLowerCase() }}</td>
                <td>{{ item.lga.toLowerCase() }}</td>
                <td>{{ item.address }}</td>
                <td>
                  <div>{{ item.latitude }},</div>
                  <div>{{ item.longitude }}</div>
                </td>
                <td>
                  {{
                    new Date(item.createdAt).toLocaleString("en-GB", {
                      hour12: true,
                    })
                  }}
                </td>
                <td>
                  <v-icon color="blue" class="mr-2" @click="viewLocation(item)">
                    mdi-eye
                  </v-icon>
                </td>
              </tr>
            </template>
          </v-data-table>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
// @ is an alias to /src
import { mapGetters } from "vuex";
export default {
  components: {},
  data: () => ({
    imageUrlPreview: null,
    newCentre: {
      name: "",
      phone: "",
      email: "",
      nin: "",
      address: "",
      state: "",
      lga: "",
      latitude: "",
      longitude: "",
      image: null,
    },
    states: [],
    lgas: [],
    dialogAdd: false,
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
    centres: [],
    rules: {
      required: (v) => !!v || "Field is required",
      counter: (v) => (v && v.length >= 3) || "Minimum length is 3 characters",
      maxChar: (v) => (v && v.length == 11) || "Max 11 characters",
      email: (value) => {
        const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return pattern.test(value) || "Invalid e-mail.";
      },
      password: (value) =>
        (value && value.length >= 6) || "Minimum length is 6 characters",
    },
  }),
  computed: mapGetters({
    user: "getUser",
    token: "getToken",
  }),
  methods: {
    Preview_image() {
      this.imageUrlPreview = URL.createObjectURL(this.newCentre.image);
    },
    viewLocation(item) {
      console.log("Item", item);
      this.$router.push("/view/" + item._id);
    },
    addCentre() {
      if (this.$refs.form.validate()) {
        fetch("https://lexnos.unicoms.ng/api/v1/centre", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-token": this.token,
          },
          body: JSON.stringify(this.newCentre),
        })
          .then((r) => r.json())
          .then((response) => {
            console.log("Response", response);
            this.fetchCentres();
            this.dialogAdd = false;
            // this.centres = response.payload;
          })
          .catch((error) => {
            console.log("Error>>>", error);
          });
      }
    },
    fetchLgas() {
      fetch(
        "https://lexnos.unicoms.ng/api/v1/statelga/lga/" + this.newCentre.state,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "x-token": this.token,
          },
        }
      )
        .then((r) => r.json())
        .then((response) => {
          console.log("Response", response);
          this.lgas = response.payload;
        })
        .catch((error) => {
          console.log("Error>>>", error);
        });
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
    fetchStates() {
      fetch("https://lexnos.unicoms.ng/api/v1/statelga/state", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "x-token": this.token,
        },
      })
        .then((r) => r.json())
        .then((response) => {
          console.log("Response", response);
          this.states = response.payload;
        })
        .catch((error) => {
          console.log("Error>>>", error);
        });
    },
  },
  mounted() {
    this.fetchCentres();
    this.fetchStates();
    // this.fetchLgas();
  },
};
</script>
