<template>
  <div class="custom__map pa-2 white">
    <v-map :zoom="6.5" :center="initialLocation" style="z-index: 1">
      <v-icondefault :image-path="'/statics/leafletImages/'"></v-icondefault>
      <v-tilelayer url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"></v-tilelayer>
      <v-marker :lat-lng="markerLatLng">
        <v-popup>
          <div>Name: {{ centre.name }}</div>
          <div>Phone: {{ centre.phone }}</div>
          <div>State: {{ centre.state }}</div>
          <div>LGA: {{ centre.lga }}</div>
          <div>Latitude: {{ centre.latitude }}</div>
          <div>Longitude: {{ centre.longitude }}</div>
        </v-popup>
      </v-marker>
    </v-map>
  </div>
</template>

<script>
//Code to fix markers not working -- don't remove
import { Icon } from "leaflet";
delete Icon.Default.prototype._getIconUrl;
Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
});
import * as Vue2Leaflet from "vue2-leaflet";
import { latLng } from "leaflet";

import { mapGetters } from "vuex";
export default {
  components: {
    "v-map": Vue2Leaflet.LMap,
    "v-tilelayer": Vue2Leaflet.LTileLayer,
    "v-icondefault": Vue2Leaflet.LIconDefault,
    "v-marker": Vue2Leaflet.LMarker,
    "v-popup": Vue2Leaflet.LPopup,
  },
  props: ["id"],
  data() {
    return {
      centre: {},
      markerLatLng: {
        lat: 0.0,
        lng: 0.0,
      },
      clusterOptions: {},
      initialLocation: latLng(9.0778, 8.6775),
      zoom: 7,
      center: latLng(9.0778, 8.6775),
      currentZoom: 11.5,
      currentCenter: latLng(9.0778, 8.6775),
      showMap: true,
    };
  },
  computed: mapGetters({
    user: "getUser",
    token: "getToken",
  }),
  methods: {
    getObjectUsingId() {},
    zoomUpdate(zoom) {
      this.currentZoom = zoom;
    },
    centerUpdate(center) {
      this.currentCenter = center;
    },
    click: (e) => console.log("clusterclick", e),
    ready: (e) => console.log("ready", e),
    getCentre() {
      fetch("https://lexnos.unicoms.ng/api/v1/centre/" + this.id, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "x-token": this.token,
        },
      })
        .then((r) => r.json())
        .then((response) => {
          const marker = {
            lat: parseFloat(response.payload.latitude),
            lng: parseFloat(response.payload.longitude),
          };
          this.markerLatLng = marker;
          this.centre = response.payload;
        })
        .catch((error) => {
          console.log("Error>>>", error);
        });
    },
  },
  mounted() {
    setTimeout(() => {
      console.log("done");
      this.$nextTick(() => {
        this.clusterOptions = { disableClusteringAtZoom: 11 };
      });
    }, 5000);
    this.getCentre();
  },
};
</script>

<style>
@import "~leaflet/dist/leaflet.css";
@import "~leaflet.markercluster/dist/MarkerCluster.css";
@import "~leaflet.markercluster/dist/MarkerCluster.Default.css";
.custom__map {
  height: calc(100vh - 48px);
  width: 100%;
}
</style>
