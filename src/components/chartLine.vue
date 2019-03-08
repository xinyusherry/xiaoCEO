<template>
  <div :id="id" style="width:100%;height:100%"></div>
</template>

<script>
export default {
  props: ["id", "dataset", "color"],
  data: function() {
    return {
      xAxisData: [
        "8",
        "9",
        "10",
        "11",
        "12",
        "13",
        "14",
        "15",
        "16",
        "17",
        "18"
      ]
    };
  },
  mounted() {
    setTimeout(()=>{
      var thisChart = this.$echarts.init(document.getElementById(this.id));
        thisChart.on("legendselectchanged", function(param) {
        event.stopPropagation();
      });
         thisChart.on("click", function(param) {
        event.stopPropagation();
      });
      thisChart.setOption({
        grid: {
          containLabel: true,
          width: "79%",
          height: "70%",
          top: "13%"
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
            label: {
              backgroundColor: "#6a7985"
            }
          }
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          name: "时",
          axisLine: {
            lineStyle: {
              color: "#F5F5FB"
            }
          },
          splitLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          data: this.xAxisData
        },
        yAxis: {
          type: "value",
          scale: true,
          axisLine: {
            lineStyle: {
              color: "#F5F5FB"
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
            type: "line",
            color: this.color,
            emphasis: {
              label: {
                show: true
              }
            },
            data: [0, 65, 100, 165, 200, 210, 220, 240, 300, 310, 320]
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