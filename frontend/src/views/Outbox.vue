<template>
  <div class="grey lighten-4 pa-4" style="height: 100vh">
    <v-row>
      <v-col cols="3">
        <v-card class="mb-4">
          <v-card-title class="pa-1">
            <span class="text-h5 font-weight-thin ml-2"
              >Select Location</span
            ></v-card-title
          >
          <v-card-text class="py-0">
            <v-container>
              <v-form @submit.prevent ref="form">
                <v-row>
                  <v-col cols="12" sm="12">
                    <v-select
                      @change="fetchLgas"
                      v-model="state"
                      prepend-icon="mdi-map"
                      hide-details="auto"
                      label="State"
                      :items="states"
                      color="primary"
                    />
                  </v-col>
                  <v-col cols="12" sm="12" class="mb-4">
                    <v-select
                      v-model="lga"
                      prepend-icon="mdi-map"
                      hide-details="auto"
                      label="LGA"
                      :items="lgas"
                      color="primary"
                    />
                  </v-col>
                </v-row>
              </v-form>
            </v-container>
          </v-card-text>
        </v-card>

        <v-card>
          <v-card-title class="pa-1">
            <span class="text-h5 font-weight-thin ml-2"
              >Send Message</span
            ></v-card-title
          >
          <v-card-text class="py-0">
            <v-container>
              <v-row>
                <v-col cols="12" class="py-0 px-2">
                  <v-form @submit.prevent ref="form" class="mt-4">
                    <v-text-field
                      color="primary"
                      label="Subject"
                      :rules="[rules.required]"
                    ></v-text-field>
                    <v-textarea
                      clearable
                      auto-grow
                      counter="150"
                      color="primary"
                      label="Write your message."
                      v-model="message"
                      :rules="[rules.required, rules.maxChar]"
                    ></v-textarea>
                  </v-form>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="primary white--text text-capitalize"
              @click="submitMessage()"
            >
              Send
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
      <v-col cols="9">
        <v-card>
          <v-card-title class="text-body-1 font-weight-bold pa-2">
            Outbox
          </v-card-title>
          <v-divider></v-divider>
          <v-data-table :headers="userHeaders" :items="messages" sort-by="name">
            <template v-slot:item="{ item }">
              <tr>
                <td>{{ item.name || item.fname }}</td>
                <td class="font-weight-bold">
                  Cancel all registrations in katsina
                </td>
                <td class="pa-4">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Nesciunt exercitationem dolorum, dolores facilis laudantium
                  laboriosam rem dolor accusamus distinctio praesentium.
                </td>
                <td class="font-weight-bold">Kaduna</td>
                <td class="font-weight-bold">Igabi</td>
                <td class="text-caption">
                  {{
                    new Date(item.createdAt).toLocaleString("en-GB", {
                      hour12: true,
                    })
                  }}
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

// import { mapGetters } from "vuex";
export default {
  components: {},
  data: () => ({
    lga: "",
    state: "",
    message: "",
    states: [],
    lgas: [],
    messages: [],
    userHeaders: [
      { text: "Sender", value: "sender", sortable: true },
      { text: "Subject", value: "phone", sortable: false },
      { text: "Message", value: "message", sortable: false },
      { text: "State", value: "state", sortable: false },
      { text: "LGA", value: "lga", sortable: false },
      { text: "Date", value: "createdAt" },
    ],
    locationHeaders: [{ text: "Location", value: "name", sortable: true }],
    locations: [],
    rules: {
      required: (v) => !!v || "Field is required",
      maxChar: (v) => (v && v.length <= 150) || "Max 150 characters",
    },
  }),
  computed: {
    token() {
      return this.$store.getters.getToken;
    },
  },

  methods: {
    selectLga() {
      this.locations = [this.lga];
    },
    fetchLgas() {
      if (this.state == "ALL") {
        this.lgas = ["ALL"];
      } else {
        fetch("https://lexnos.unicoms.ng/api/v1/statelga/lga/" + this.state, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "x-token": this.token,
          },
        })
          .then((r) => r.json())
          .then((response) => {
            console.log("Response", response);
            this.lgas = response.payload;
          })
          .catch((error) => {
            console.log("Error>>>", error);
          });
      }
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
          this.states.unshift("ALL");
        })
        .catch((error) => {
          console.log("Error>>>", error);
        });
    },
    fetchUsers() {
      fetch("https://lexnos.unicoms.ng/api/v1/user", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "x-token": this.token,
        },
      })
        .then((r) => r.json())
        .then((response) => {
          console.log("Response", response);
          this.messages = response.payload;
        })
        .catch((error) => {
          console.log("Error>>>", error);
        });
    },
    submitMessage() {
      console.log("Message Submitted");
    },
  },
  mounted() {
    // this.fetchCentres();
    this.fetchStates();
    this.fetchUsers();
  },
};
</script>

<style lang="scss">
.custom__btn {
  position: fixed;
  bottom: 70px;
  right: 40px;
}
</style>