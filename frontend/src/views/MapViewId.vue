<template>
  <div class="custom__map pa-2 white">
    <v-map :zoom="7" :center="initialLocation">
      <v-icondefault :image-path="'/statics/leafletImages/'"></v-icondefault>
      <v-tilelayer url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"></v-tilelayer>
      <v-marker :lat-lng="markerLatLng"></v-marker>
      <!-- <v-marker v-for="l in locations" :key="l.id" :lat-lng="l.latlng">
          <v-icon
            :icon-size="[32, 37]"
            :icon-anchor="[16, 37]"
            :icon-url="l.customIcon"
          />
          <v-popup :content="l.latlng.toString()"></v-popup>
        </v-marker> -->
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

export default {
  components: {
    "v-map": Vue2Leaflet.LMap,
    "v-tilelayer": Vue2Leaflet.LTileLayer,
    "v-icondefault": Vue2Leaflet.LIconDefault,
    "v-marker": Vue2Leaflet.LMarker,
  },
  props: ["id"],
  data() {
    return {
      markerLatLng: {
        lat: 9.0778,
        lng: 8.6775,
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
  },
  mounted() {
    setTimeout(() => {
      console.log("done");
      this.$nextTick(() => {
        this.clusterOptions = { disableClusteringAtZoom: 11 };
      });
    }, 5000);
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
