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
      this.$emit('CallBack', thisChart);
      thisChart.setOption({
        grid: {
          containLabel: true,
          width: "80%",
          height: "70%",
          top: "13%"
        },
        tooltip: {
          trigger: "axis",
          axisPointer:{
            type:"none"
          }
        },
        xAxis: {
          type: "category",
          boundaryGap: true,
          axisLabel:{
            fontSize:16,
            color: "#24FAFF"
          },
          axisLine: {
            lineStyle: {
              color: "#3E6BCE"
            }
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
          name: "完成值（万元）",
          // scale: true,
          nameTextStyle:{
            color: "#24FAFF"
          },
          axisLabel:{
            color: "#24FAFF"
          },
          axisLine: {
            lineStyle: {
              color: "#3E6BCE"
            }
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
            type: "bar",
            color: this.color,
            barWidth:30,
            itemStyle:{
              barBorderRadius:5
            },
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