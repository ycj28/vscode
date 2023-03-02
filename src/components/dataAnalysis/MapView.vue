<template>
   <div class="map-view">
      <div id="main">

      </div>
   </div>
</template>
<script>
import geoJson from '../../assets/data.json'
export default {
   data () {
      return ({})
   },
   mounted () {
      let myChart = this.$echarts.init(document.getElementById('main'))
      this.$echarts.registerMap('china', geoJson) //注册可用的地图，必须包括geo组件或者map图表类型的时候才可以使用
      let option = {
         geo: {
            map: 'china',
            aspectScale: 0.75, // 地图长宽比
            zoom: 1.1,
            refions: [{
               name: '南海诸岛'
            }]
         },
         series: [{
            // 配置地图相关参数，绘制地图，这个对象关于地图图表的相关设置
            type: 'map',
            zoom: 1.1,
            map: 'china'
         }]
      }
      myChart.setOption(option)
   }
}
</script>

<style lang="scss">
.map-view {
   width: 100%;

   #main {
      width: 100%;
      height: 600px;
   }
}
</style>