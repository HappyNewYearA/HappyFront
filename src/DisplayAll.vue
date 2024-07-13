// 总览页面
<template>
    <div>

      
      <div id="map" class="map">
        <MapView />
      </div>
    
      Display All Page Placeholder
    </div>
</template>
  
<script>
  import 'ol/ol.css';
  import { Map, View } from 'ol';
  import TileLayer from 'ol/layer/Tile';
  import OSM from 'ol/source/OSM';
  export default {
    // 可以添加组件逻辑
    name: 'MapView',
    mounted() {
      this.initMap();
    },
    methods: {
      initMap() {
        new Map({
          target: 'map',
          layers: [
            new TileLayer({
              source: new OSM(),
            }),
          ],
          view: new View({
            center: [0, 0],
            zoom: 2,
          }),
        });
      },
    },
    components:{

    }
  }
</script>
  
<style scoped>
  #map {
  width: 100%;
  height: 100vh;
}
  /* 可以添加样式 */
</style>
  