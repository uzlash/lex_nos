<template>
  <nav>
    <!-- color="#00a368" -->
    <v-app-bar app dense flat color="white">
      <v-app-bar-nav-icon
        dark
        small
        @click="drawer = !drawer"
        class="primary pa-5"
      ></v-app-bar-nav-icon>
      <v-spacer></v-spacer>
      <div>
        <v-menu offset-y>
          <template v-slot:activator="{ on, attrs }">
            <v-btn icon small class="mx-2" v-on="on" v-bind="attrs">
              <v-badge content="7" bordered color="accent" overlap>
                <v-icon color="grey">mdi-email</v-icon>
              </v-badge>
            </v-btn>
          </template>
          <v-card
            width="350"
            class="mx-auto cutom__card--overflow"
            max-height="400"
          >
            <v-card-title primary-title> Messages </v-card-title>
            <v-list color="grey lighten-4">
              <span class="mx-4">Earlier</span>
              <v-list-item
                v-for="message in messages"
                :key="message.title"
                to="/chat"
              >
                <v-avatar>
                  <img src="../assets/avatar1.png" alt="alt" class="mr-2" />
                </v-avatar>

                <v-list-item-content>
                  <v-list-item-title>{{ message.title }}</v-list-item-title>
                  <v-list-item-subtitle>{{
                    message.subtitle
                  }}</v-list-item-subtitle>
                  <v-divider></v-divider>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-card>
        </v-menu>
        <v-menu offset-y>
          <template v-slot:activator="{ on, attrs }">
            <v-btn small icon class="mx-2" v-on="on" v-bind="attrs">
              <v-badge content="7" color="red" dot overlap>
                <v-icon color="grey">mdi-bell</v-icon>
              </v-badge>
            </v-btn>
          </template>
          <v-card
            width="350"
            class="mx-auto cutom__card--overflow"
            max-height="400"
          >
            <v-card-title primary-title> Notifications </v-card-title>

            <v-list class="grey lighten-4">
              <v-list-item-subtitle class="ml-3">
                Earlier
              </v-list-item-subtitle>

              <v-list-item
                v-for="message in messages"
                :key="message.title"
                to=""
              >
                <v-avatar>
                  <img src="../assets/avatar1.png" alt="alt" class="mr-2" />
                </v-avatar>

                <v-list-item-content>
                  <v-list-item-title>{{ message.title }}</v-list-item-title>
                  <v-list-item-subtitle>{{
                    message.tile
                  }}</v-list-item-subtitle>
                  <v-divider></v-divider>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-card>
        </v-menu>

        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-btn to="/profile" v-bind="attrs" v-on="on" rounded icon>
              <v-list-item-avatar color="grey" class="ml-4">
                <v-img src="../assets/avatar1.png"></v-img>
              </v-list-item-avatar>
            </v-btn>
          </template>
          <span>profile</span>
        </v-tooltip>
      </div>
    </v-app-bar>
    <v-navigation-drawer v-model="drawer" dark app color="primary">
      <v-layout column align-center>
        <v-flex class="mt-6 mb-4">
          <!-- <v-img
            height="150"
            width="200"
            src="../assets/lex_logo1.jpg"
            alt="Lex Logo"
          ></v-img> -->
          <span class="text-h6 font-weight-light white--text"
            >Lex<span class="black--text font-weight-bold">NOS</span>
            Dashboard</span
          >
        </v-flex>
      </v-layout>
      <v-divider></v-divider>
      <v-list>
        <v-list-item
          active-class="border"
          v-for="link in links"
          :key="link.icon"
          :to="link.route"
        >
          <v-list-item-action>
            <v-icon>{{ link.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>{{ link.text }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <v-divider></v-divider>

      <template v-slot:append>
        <div class="pa-2 d-flex justify-center">
          <v-btn outlined dark color="white" @click="logOut()">
            <span>Logout</span>
            <v-icon>mdi-exit-to-app</v-icon>
          </v-btn>
        </div>
      </template>
    </v-navigation-drawer>
  </nav>
</template>

<script>
export default {
  data: () => ({
    user: JSON.parse(localStorage.getItem("user")),
    drawer: true,
    links: [
      { icon: "mdi-chart-box-outline", text: "Dashboard", route: "/" },
      { icon: "mdi-account", text: "User Management", route: "/user" },
      { icon: "mdi-map", text: "Registered Centres", route: "/centre" },
      {
        icon: "mdi-map-outline",
        text: "Centre Manager",
        route: "/centremanager",
      },
    ],

    messages: [
      {
        title: "umar abubakar",
        subtitle: "hi",
        tile: "mention you",
        avatar: "mdi-user",
      },

      { title: "musa abubakar", subtitle: "hi", tile: "mention you" },
      { title: "usman murtala", subtitle: "hi", tile: "mention you" },
      { title: "abba kabir", subtitle: "hello", tile: "mention you" },
      { title: "aliyu ibrahim", subtitle: "hello", tile: "mention you" },
      { title: "mubarak ", subtitle: "hi", tile: "mention you" },
      { title: "abubakar", subtitle: "hi", tile: "mention you" },
    ],
    offset: true,
  }),
  methods: {
    logOut() {
      this.$store.dispatch("SIGN_OUT");
    },
  },
  computed: {},
};
</script>

<style scoped>
.border {
  border-left: 4px solid white;
}
::-webkit-scrollbar {
  width: 10px;
}
::-webkit-scrollbar-track {
  background: #bdbdbd;
}
::-webkit-scrollbar-thumb {
  background: rgb(170, 170, 170);
}
.custom__research--item {
  padding-left: 84px !important;
}
</style>
