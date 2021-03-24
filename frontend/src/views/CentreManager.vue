<template>
  <div class="grey lighten-4 pa-4" style="height: 100vh">
    <v-row>
      <v-col cols="12">
        <v-card>
          <v-data-table :headers="userHeaders" :items="users" sort-by="name">
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
                        <v-row>
                          <v-col cols="12">
                            <v-text-field
                              v-model="newCentre.name"
                              color="primary"
                              label="Full Name"
                              solo
                              hide-details="auto"
                              prepend-icon="mdi-account"
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
                            ></v-text-field>
                          </v-col>
                          <v-col cols="12">
                            <v-text-field
                              type="email"
                              prepend-icon="mdi-email"
                              hide-details
                              color="primary"
                              solo
                              v-model="newCentre.email"
                              label="Email"
                            ></v-text-field>
                          </v-col>
                          <v-col cols="12">
                            <v-text-field
                              v-model="newCentre.nin"
                              color="primary"
                              label="Nin"
                              solo
                              hide-details="auto"
                              prepend-icon="mdi-account"
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
                            ></v-text-field>
                          </v-col>
                          <v-col cols="12" sm="12" md="6">
                            <v-select
                              v-model="newCentre.state"
                              prepend-icon="mdi-map"
                              hide-details="auto"
                              solo
                              label="State"
                              :items="[]"
                              color="primary"
                            />
                          </v-col>
                          <v-col cols="12" sm="12" md="6">
                            <v-select
                              v-model="newCentre.lga"
                              prepend-icon="mdi-map"
                              hide-details="auto"
                              solo
                              label="LGA"
                              :items="[]"
                              color="primary"
                            />
                          </v-col>
                          <v-col cols="12" sm="12" md="6">
                            <v-text-field
                              v-model.number="newCentre.coordinates.lat"
                              hide-details="auto"
                              color="primary"
                              label="Latitude"
                              solo
                              prepend-icon="mdi-map-marker"
                            ></v-text-field>
                          </v-col>
                          <v-col cols="12" sm="12" md="6">
                            <v-text-field
                              v-model.number="newCentre.coordinates.lng"
                              color="primary"
                              label="Longitude"
                              solo
                              hide-details="auto"
                              prepend-icon="mdi-map-marker"
                            ></v-text-field>
                          </v-col>
                          <!-- <v-col cols="12">
                              <img
                                hide-details="auto"
                                v-if="newCentre.image"
                                height="200"
                                width="100%"
                                :src="imageUrlPreview"
                              />
                            </v-col> -->
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
                        @click="addLocation()"
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
                <td>{{ item.nin }}</td>
                <td>{{ item.state }}</td>
                <td>{{ item.lga }}</td>
                <td>{{ item.address }}</td>
                <td>
                  <div>{{ item.lat.toPrecision(5) }},</div>
                  <div>{{ item.lng.toPrecision(5) }}</div>
                </td>
                <td>
                  {{
                    new Date(item.createdAt).toLocaleString("en-GB", {
                      hour12: true,
                    })
                  }}
                </td>
                <td>
                  <v-icon color="blue" class="mr-2" @click="viewUser(item)">
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

export default {
  name: "Home",
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
      coordinates: {
        lat: "",
        lng: "",
      },
      image: null,
    },
    dialogAdd: false,
    userHeaders: [
      { text: "Image", value: "image" },
      { text: "Full Name", value: "name", sortable: true },
      { text: "Phone", value: "phone", sortable: false },
      { text: "Nin", value: "nin", sortable: false },
      { text: "State", value: "state" },
      { text: "LGA", value: "lga" },
      { text: "Address", value: "address" },
      { text: "Lat/Lng" },
      { text: "Date Joined", value: "createdAt" },
      { text: "locate" },
    ],
    users: [
      {
        id: 1,
        image:
          "https://avatars.githubusercontent.com/u/39749863?s=460&u=c51e45d3b1dd057366d62cc8283a20ea1e93d53c&v=4",
        name: "Usman Murtala",
        phone: "08069558390",
        nin: "26349188109",
        state: "Katsina State",
        lga: "Danmusa",
        address: "no 1 hussaini jalo street rigachikun, Kaduna.",
        lat: 9.082,
        lng: 8.6753,
        createdAt: Date.now(),
      },
    ],
  }),
  methods: {
    Preview_image() {
      this.imageUrlPreview = URL.createObjectURL(this.newCentre.image);
    },
    addLocation() {
      console.log("New Location", this.newCentre);
    },
    viewUser(item) {
      console.log("Item", item);
      this.$router.push("/view/" + item.id);
    },
  },
};
</script>
