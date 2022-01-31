<template>
  <div class="custom__map pa-2 white">
    <v-map :zoom="7" :center="initialLocation" style="z-index: 1">
      <v-icondefault :image-path="'/statics/leafletImages/'"></v-icondefault>
      <v-tilelayer url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"></v-tilelayer>
      <v-marker-cluster
        :options="clusterOptions"
        @clusterclick="click()"
        @ready="ready"
      >
        <!-- <v-marker
          v-for="(l, index) in markers"
          :key="index"
          :lat-lng="l.latlng"
        >
          <v-popup :content="l.text"></v-popup>
        </v-marker> -->
        <v-marker
          v-for="centre in centres"
          :key="centre._id"
          :lat-lng="[parseFloat(centre.latitude), parseFloat(centre.longitude)]"
        >
          <v-popup>
            <div>Name: {{ centre.name }}</div>
            <div>Phone: {{ centre.phone }}</div>
            <div>State: {{ centre.state }}</div>
            <div>LGA: {{ centre.lga }}</div>
            <div>Latitude: {{ centre.latitude }}</div>
            <div>Longitude: {{ centre.longitude }}</div>
          </v-popup>
        </v-marker>
      </v-marker-cluster>
    </v-map>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
// Code to fix markers not working -- don't remove
import { Icon } from "leaflet";

delete Icon.Default.prototype._getIconUrl;
Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
});

import * as Vue2Leaflet from "vue2-leaflet";
import { latLng } from "leaflet";

import Vue2LeafletMarkerCluster from "vue2-leaflet-markercluster";

export default {
  components: {
    "v-map": Vue2Leaflet.LMap,
    "v-tilelayer": Vue2Leaflet.LTileLayer,
    "v-icondefault": Vue2Leaflet.LIconDefault,
    "v-marker": Vue2Leaflet.LMarker,
    "v-popup": Vue2Leaflet.LPopup,
    "v-marker-cluster": Vue2LeafletMarkerCluster,
  },
  props: ["id"],
  data() {
    return {
      centres: [],
      // icon: customicon,
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
    setTimeout(() => {
      console.log("done");
      this.$nextTick(() => {
        this.clusterOptions = { disableClusteringAtZoom: 11 };
      });
    }, 5000);
    this.fetchCentres();
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
