<template>
  <div class="grey lighten-4 pa-4" style="height: 100vh">
    <v-row>
      <!-- Line Chart -->
      <v-col cols="12" sm="12" md="9">
        <v-card outlined tile class="custom__card">
          <v-card-title class="pa-2">
            <div class="d-flex align-center">
              <span class="lstick ml-n2 red"></span>
              <div class="ml-4 mr-1">
                <h5 class="subtitle-1">Registrations over time</h5>
                <h2
                  class="font-weight-regular body-2 grey--text text--darken-2"
                >
                  Year 2021
                </h2>
              </div>
            </div>
          </v-card-title>
          <v-divider></v-divider>
          <v-card-text class="">
            <line-chart
              :chartdata="lineChartData"
              :options="lineChartOptions"
            />
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" sm="12" md="3" align-self="center">
        <v-row>
          <v-col cols="12">
            <v-card color="custom__card-bg">
              <v-card-title class="text-body-1 font-weight-light white--text">
                Active States
              </v-card-title>
              <v-card-text class="text-h6">
                <v-icon color="white" class="mr-2">mdi-map</v-icon>
                <span class="white--text">5/36</span>
              </v-card-text>
            </v-card>
          </v-col>
          <v-col cols="12">
            <v-card>
              <v-card-title class="text-body-1 font-weight-light">
                Active Local Governments
              </v-card-title>
              <v-card-text class="text-h6">
                <v-icon color="primary" class="mr-2">mdi-map-marker</v-icon>
                <span>5/776 </span>
              </v-card-text>
            </v-card>
          </v-col>
          <v-col cols="12">
            <v-card>
              <v-card-title class="text-body-1 font-weight-light">
                Registered Users
              </v-card-title>
              <v-card-text class="text-h6">
                <v-icon color="primary" class="mr-2">mdi-account</v-icon>
                <span>150,000,000</span>
              </v-card-text>
            </v-card>
          </v-col>
          <v-col cols="12">
            <v-card>
              <v-card-title class="text-body-1 font-weight-light">
                Users Online
              </v-card-title>
              <v-card-text class="text-h6">
                <v-icon color="primary" class="mr-2">mdi-account-group</v-icon>
                <span>25 </span>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-card>
          <v-data-table :headers="userHeaders" :items="centres" sort-by="name">
            <template v-slot:top>
              <v-toolbar flat>
                <v-toolbar-title>Registered Locations</v-toolbar-title>
                <v-divider class="mx-4" inset vertical></v-divider>
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

import LineChart from "../components/LineChart.vue";
export default {
  name: "Home",
  components: {
    LineChart,
  },
  data: () => ({
    lineChartData: {
      labels: [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ],
      datasets: [
        {
          label: "No of Registrations",
          borderColor: "#3498db",
          backgroundColor: "#3498db",
          data: [0, 150, 110, 240, 200, 200, 300, 200, 380, 300, 400, 380],
        },
      ],
    },
    lineChartOptions: {
      responsive: true,
      maintainAspectRatio: false,
      fill: true,
    },
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
  }),
  computed: {
    token() {
      return this.$store.getters.getToken;
    },
  },
  methods: {
    viewLocation(item) {
      console.log("Item", item);
      this.$router.push("/view/" + item._id);
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