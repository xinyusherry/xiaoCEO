<template>
  <div :id="id" style="width:374px;height:200px"></div>
</template>

<script>
export default {
  props: ["id","type","dataset","title"],
  data: function() {
    return {
      chartOption:{}
    };
  },
  mounted() {
    setTimeout(()=>{
      let thisChart = this.$echarts.init(document.getElementById(this.id));
      this.chartOption = this.type=="sj" ? {
        color: ["#0097FF","#F868AF"],
        title: {
          left: 'center',
          text: this.title,
          textStyle:{
            color:"#6AFFFD"
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
            type:"line",
            yAxisIndex:1,
            data: this.dataset.data[0]
          },
          {
            type:"bar",
            barWidth:10,
            data: this.dataset.data[1]
          }
        ]
      }
      :
      {
        color: ["#0097FF","#F868AF"],
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
        yAxis: {
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
        series: [
          {
            type:"line",
            data: this.dataset.data[0]
          }
        ]
      }
      thisChart.clear();
      thisChart.setOption(this.chartOption);
      window.addEventListener("resize", () => { 
        thisChart.resize();
      });
    },0);
  }
};
</script>

<style scoped>
</style>