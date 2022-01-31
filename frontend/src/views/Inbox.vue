<template>
  <div class="grey lighten-4 pa-4" style="height: 100vh">
    <v-row>
      <v-col cols="12">
        <v-card>
          <v-card-title class="text-body-1 font-weight-bold pa-2">
            Inbox
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
    dialogAdd: false,
    dialogEdit: false,
    dialogDelete: false,
    confirmPassword: "",
    userHeaders: [
      { text: "Sender", value: "sender", sortable: true },
      { text: "Subject", value: "phone", sortable: false },
      { text: "Message", value: "email", sortable: false },
      { text: "Date", value: "createdAt" },
    ],
    messages: [],
  }),
  computed: {
    token() {
      return this.$store.getters.getToken;
    },
  },

  methods: {
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
  },
  mounted() {
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