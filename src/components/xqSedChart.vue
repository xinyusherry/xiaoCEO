<template>
  <div :id="id" style="width:374px;height:200px"></div>
</template>

<script>
export default {
  props: ["id","type","dataset","title","color"],
  data: function() {
    return {
    };
  },
  mounted() {
    setTimeout(()=>{
      var thisChart = this.$echarts.init(document.getElementById(this.id));
      thisChart.setOption({
        color: this.color,
        title: {
          left: 'center',
          text: this.title,
          textStyle:{
            color:"#24FAFF"
          }
        },
        grid: {
          containLabel: true,
          top: "20%",
          bottom: "5%",
          left:"5%",
          right:"5%"
        },
        tooltip: {
          trigger: "axis"
        },
        xAxis: {
          type: "category",
          boundaryGap: true,
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
          },
          data: this.dataset.xAxis
        },
        yAxis: [{
          type: "value",
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
        {
          type: "value",
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
        }],
        series: [
          {
            name:this.dataset.legendData[0].name,
            type:this.type,
            barWidth:10,
            data: this.dataset.data[0]
          },
          {
            name:this.dataset.legendData[1].name,
            type:this.type,
            barWidth:10,
            yAxisIndex:1,
            data: this.dataset.data[1]
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