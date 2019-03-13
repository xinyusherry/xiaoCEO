<template>
  <div :id="id" style="width:100%;height:100%"></div>
</template>

<script>
export default {
  props: ["id", "dataset", "color"],
  data: function() {
    return {
    };
  },
  mounted() {
    setTimeout(()=>{
      var thisChart = this.$echarts.init(document.getElementById(this.id));
      thisChart.setOption({
        grid: {
          containLabel: true,
          top: "20%",
          bottom: "5%",
          left:"1%",
          right:"1%"
        },
        tooltip: {
          // trigger: "axis",
          // axisPointer:{
          //   type:"none"
          // }
        },
        xAxis: {
          type: "category",
          boundaryGap: true,
          axisLabel:{
            show: false
          },
          axisLine: {
            show: false
          },
          splitLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          data: this.dataset.xAxis
        },
        yAxis: {
          type: "value",
          // scale: true,
          axisLabel:{
            show: false
          },
          axisLine: {
            show: false
          },
          splitLine: {
            show: false
          },
          axisTick: {
            show: false
          }
        },
        series: [
          {
            type: "line",
            symbolSize:10,
            itemStyle:{
              borderWidth:2
            },
            lineStyle:{
              width:4
            },
            color: this.color,
            data: this.dataset.data
          }
        ]
      });
      window.addEventListener("resize", () => { 
        thisChart.resize();
      });
    },0);
  }
};
</script>

<style scoped>
</style>