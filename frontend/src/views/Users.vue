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
                      @click="updateAdminDialog(item)"
                    >
                      mdi-pencil
                    </v-icon>
                    <v-icon color="red" @click="deleteAdminDialog(item)">
                      mdi-delete
                    </v-icon>
                  </td>
                </tr>
              </template>
            </v-data-table>
            <!-- Dialog Add -->
            <v-dialog v-model="dialogAdd" max-width="800px">
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  color="primary"
                  dark
                  fab
                  class="mb-2 custom__btn"
                  v-bind="attrs"
                  v-on="on"
                >
                  Add
                </v-btn>
              </template>
              <v-card>
                <v-card-title class="font-weight-light"
                  >Add New Admin</v-card-title
                >
                <v-card-text>
                  <v-container>
                    <v-row>
                      <v-col cols="12">
                        <v-text-field
                          type="text"
                          prepend-icon="mdi-account"
                          hide-details
                          color="primary"
                          solo
                          v-model="newAdmin.name"
                          label="Fullname"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12">
                        <v-text-field
                          type="text"
                          prepend-icon="mdi-phone"
                          hide-details
                          color="Phone"
                          solo
                          v-model="newAdmin.phone"
                          label="Phone"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12">
                        <v-text-field
                          type="email"
                          prepend-icon="mdi-email"
                          hide-details
                          color="primary"
                          solo
                          v-model="newAdmin.email"
                          label="Email"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12">
                        <v-text-field
                          type="password"
                          prepend-icon="mdi-lock"
                          hide-details
                          color="primary"
                          solo
                          v-model="newAdmin.newPassword"
                          label="New Password"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12">
                        <v-text-field
                          type="password"
                          prepend-icon="mdi-lock"
                          hide-details
                          color="primary"
                          solo
                          v-model="newAdmin.confirmPassword"
                          label="Confirm Password"
                        ></v-text-field>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="red" text @click="dialogAdd = false">
                    Cancel
                  </v-btn>
                  <v-btn color="primary" text @click="addAdmin()"> Add </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
            <!-- Dialog Edit -->
            <v-dialog v-model="dialogEdit" max-width="800px">
              <v-card>
                <v-card-title class="font-weight-light"
                  >Edit Password</v-card-title
                >
                <v-card-text>
                  <v-container>
                    <v-row>
                      <v-col cols="12">
                        <v-text-field
                          prepend-icon="mdi-account"
                          hide-details
                          color="primary"
                          solo
                          v-model="editAdmin.name"
                          label="Name"
                          disabled
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12">
                        <v-text-field
                          type="password"
                          prepend-icon="mdi-lock"
                          hide-details
                          color="primary"
                          solo
                          v-model="editAdmin.oldPassword"
                          label="Old Password"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12">
                        <v-text-field
                          type="password"
                          prepend-icon="mdi-lock"
                          hide-details
                          color="primary"
                          solo
                          v-model="editAdmin.newPassword"
                          label="New Password"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12">
                        <v-text-field
                          type="password"
                          prepend-icon="mdi-lock"
                          hide-details
                          color="primary"
                          solo
                          v-model="editAdmin.confirmPassword"
                          label="Confirm Password"
                        ></v-text-field>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="red" text @click="dialogEdit = false">
                    Cancel
                  </v-btn>
                  <v-btn color="primary" text @click="updateAdminPassword()">
                    Update
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
            <!-- Dialog Delete -->
            <v-dialog v-model="dialogDelete" max-width="600px">
              <v-card>
                <v-card-title class="font-weight-light"
                  >Are you sure you want to delete
                  {{ deleteAdmin.name }}?</v-card-title
                >
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="red" text @click="dialogDelete = false"
                    >Cancel</v-btn
                  >
                  <v-btn color="primary" text @click="deleteAdminConfirm()"
                    >OK</v-btn
                  >
                  <v-spacer></v-spacer>
                </v-card-actions>
              </v-card>
            </v-dialog>
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
    dialogAdd: false,
    dialogEdit: false,
    dialogDelete: false,
    newAdmin: {
      name: "",
      phone: "",
      email: "",
      newPassword: "",
    },
    editAdmin: {
      id: "",
      name: "",
      oldPassword: "",
      newPassword: "",
    },
    deleteAdmin: {
      id: "",
      name: "",
    },
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
    addAdmin() {
      console.log("New Admin", this.newAdmin);
    },
    updateAdminDialog(data) {
      this.editAdmin.id = data.id;
      this.editAdmin.name = data.name;
      this.dialogEdit = true;
    },
    updateAdminPassword() {
      console.log("Edit Admin", this.editAdmin);
    },
    deleteAdminDialog(data) {
      this.deleteAdmin.id = data.id;
      this.deleteAdmin.name = data.name;
      this.dialogDelete = true;
      console.log("Delete Admin", data);
    },
    deleteAdminConfirm() {
      console.log("Deleted Admin", this.deleteAdmin);
    },
    // viewUser(data) {
    //   console.log("View User Data", data);
    // },
    // editUser(data) {
    //   console.log("Edit User", data);
    // },
    // deleteUser(data) {
    //   console.log("Delete User", data);
    // },
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