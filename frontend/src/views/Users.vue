<template>
  <div class="grey lighten-4" style="height: 100vh">
    <v-container>
      <v-row>
        <v-col cols="12">
          <v-card>
            <v-card-title class="text-body-1 font-weight-bold pa-2">
              User Management
            </v-card-title>
            <v-divider></v-divider>
            <v-data-table :headers="userHeaders" :items="users" sort-by="name">
              <template v-slot:item="{ item }">
                <tr>
                  <td class="pa-2">
                    <v-avatar size="50">
                      <v-img
                        src="https://www.vhv.rs/dpng/d/505-5058560_person-placeholder-image-free-hd-png-download.png"
                      ></v-img
                    ></v-avatar>
                  </td>
                  <td>{{ item.name }}</td>
                  <td>{{ item.phone }}</td>
                  <td>{{ item.email }}</td>
                  <td>{{ item.status }}</td>
                  <td>
                    {{
                      new Date(item.createdAt).toLocaleString("en-GB", {
                        hour12: true,
                      })
                    }}
                  </td>
                  <td>
                    <v-icon
                      color="#00a368"
                      class="mr-2"
                      @click="editUser(item)"
                    >
                      mdi-pencil
                    </v-icon>
                    <v-icon color="red" @click="deleteUser(item)">
                      mdi-delete
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
      { text: "Image" },
      { text: "Full Name", value: "name", sortable: true },
      { text: "Phone", value: "phone", sortable: false },
      { text: "email", value: "email", sortable: false },
      { text: "status", value: "state" },
      { text: "Date Joined", value: "createdAt" },
      { text: "Actions" },
    ],
    users: [
      {
        id: 1,
        image:
          "https://avatars.githubusercontent.com/u/39749863?s=460&u=c51e45d3b1dd057366d62cc8283a20ea1e93d53c&v=4",
        name: "Usman Murtala",
        phone: "08069558390",
        email: "uzlash16@gmail.com",
        status: "Active",
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
