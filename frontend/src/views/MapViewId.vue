<template>
  <div class="pa-2 white">
    <l-map
      v-if="showMap"
      :zoom="zoom"
      :center="center"
      :options="mapOptions"
      style="height: 100%"
      @update:center="centerUpdate"
      @update:zoom="zoomUpdate"
    >
      <l-tile-layer :url="url" :attribution="attribution" />
      <l-marker :lat-lng="marker">
        <l-icon
          :icon-size="[32, 37]"
          :icon-anchor="[16, 37]"
          :icon-url="customIcon"
        >
        </l-icon>
      </l-marker>
    </l-map>
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

import { latLng } from "leaflet";
import {
  LMap,
  LTileLayer,
  LMarker,
  // LTooltip,
  // LPolygon,
  LIcon,
} from "vue2-leaflet";

// import { mapGetters } from "vuex";

export default {
  components: {
    LMap,
    LTileLayer,
    LMarker,
    // LTooltip,
    // LPolygon,
    LIcon,
  },
  props: ["id"],
  data: () => ({
    marker: {},
    currentPlace: null,
    zoom: 7,
    center: latLng(9.0778, 8.6775),
    url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
    attribution:
      '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
    withTooltip: latLng(10.609319, 7.429504),
    currentZoom: 11.5,
    currentCenter: latLng(9.0778, 8.6775),
    showParagraph: false,
    mapOptions: {
      zoomSnap: 0.5,
    },
    showMap: true,
  }),
  // computed: mapGetters({
  //   Asset: "getAllAsset",
  // }),
  methods: {
    getObjectUsingId() {},
    zoomUpdate(zoom) {
      this.currentZoom = zoom;
    },
    centerUpdate(center) {
      this.currentCenter = center;
    },
  },
  mounted() {
    // const data = abuja.features[0].geometry.coordinates[0];
    // let abuja1 = [];
    // data.forEach((value) => {
    //   let [lat, lng] = value;
    //   abuja1.push([lng, lat]);
    // });
    // this.polygon.latlngs.push(abuja1);
    // const objIndex = this.Asset.findIndex((value) => value.serial == this.id);
    // const obj = this.Asset[objIndex];
    // this.objHardware = obj;
    // console.log("THis OBJ", this.objHardware);
    // this.marker = obj.currentCoordinates;
    // const objIndexGeoJson = nigeria.features.findIndex(
    //   (value) => value.properties.state == obj.geoFenceData
    // );
    // const objGeoJson = nigeria.features[objIndexGeoJson];
    // this.geojson = objGeoJson;
    // console.log(objGeoJson);
  },
};
</script>

<style>
.custom__map {
  height: calc(100vh - 48px);
  width: 100%;
}
</style>
