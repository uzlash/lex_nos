<template>
  <div class="grey lighten-4" style="height: 100vh">
    <v-container>
      <v-row>
        <v-col cols="12">
          <v-card>
            <!-- <v-card-title class="text-body-1 font-weight-bold pa-2">
              
              <span>Registered Locations</span>

            </v-card-title>
            <v-divider></v-divider> -->
            <v-data-table :headers="userHeaders" :items="users" sort-by="name">
              <template v-slot:top>
                <v-toolbar flat>
                  <v-toolbar-title>Registered Locations</v-toolbar-title>
                  <v-divider class="mx-4" inset vertical></v-divider>
                  <v-spacer></v-spacer>
                  <v-dialog v-model="dialog" persistent max-width="600px">
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
                          >Add Institution</span
                        ></v-card-title
                      >
                      <v-card-text class="py-0">
                        <v-container>
                          <v-row>
                            <v-col cols="12" sm="6" md="6" class="py-0 px-2">
                              <v-text-field
                                color="primary"
                                label="Full Name"
                                solo
                                prepend-inner-icon="mdi-account"
                              ></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6" md="6" class="py-0 px-2">
                              <v-text-field
                                color="primary"
                                label="Phone"
                                solo
                                prepend-inner-icon="mdi-phone"
                              ></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6" md="6" class="py-0 px-2">
                              <v-text-field
                                color="primary"
                                label="Full Name"
                                solo
                                prepend-inner-icon="mdi-account"
                              ></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6" md="6" class="py-0 px-2">
                              <v-text-field
                                color="primary"
                                label="Nin"
                                solo
                                prepend-inner-icon="mdi-account"
                              ></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6" md="6" class="py-0 px-2">
                              <v-select
                                prepend-inner-icon="mdi-map"
                                hide-details="auto"
                                solo
                                label="State"
                                :items="[]"
                                color="primary"
                              />
                            </v-col>
                            <v-col cols="12" sm="6" md="6" class="py-0 px-2">
                              <v-select
                                prepend-inner-icon="mdi-map"
                                hide-details="auto"
                                solo
                                label="LGA"
                                :items="[]"
                                color="primary"
                              />
                            </v-col>
                            <v-col cols="12" sm="6" md="6" class="py-0 px-2">
                              <v-text-field
                                color="primary"
                                label="Address"
                                solo
                                prepend-inner-icon="mdi-map-marker-outline"
                              ></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6" md="6" class="py-0 px-2">
                              <v-text-field
                                color="primary"
                                label="Latitude"
                                solo
                                prepend-inner-icon="mdi-map-marker"
                              ></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6" md="6" class="py-0 px-2">
                              <v-text-field
                                color="primary"
                                label="Longitude"
                                solo
                                prepend-inner-icon="mdi-map-marker"
                              ></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6" md="6">
                              <img
                                v-if="image"
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
                          @click="dialog = false"
                        >
                          Close
                        </v-btn>
                        <v-btn
                          color="accent white--text text-capitalize"
                          @click="dialog = false"
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
                  <td class="primary--text">{{ item.nin }}</td>
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
    </v-container>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: "Home",
  components: {},
  data: () => ({
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
    viewUser(data) {
      console.log("View User Data", data);
    },
    editUser(data) {
      console.log("Edit User", data);
    },
    deleteUser(data) {
      console.log("Delete User", data);
    },
  },
};
</script>
