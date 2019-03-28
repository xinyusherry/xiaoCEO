<template>
  <div :id="id" style="width:100%;height:100%"></div>
</template>

<script>
export default {
  props: ["id", "dataset", "color"],
  data: function() {
    return {
      chartData: this.dataset || {}
    };
  },
  mounted() {
    setTimeout(() => {
      this.draw();
    }, 0);
  },
  methods: {
    draw() {
      var thisChart = this.$echarts.init(document.getElementById(this.id));
      thisChart.on("legendselectchanged", function(param) {
        event.stopPropagation();
      });
      thisChart.on("click", function(param) {
        event.stopPropagation();
      });
      let series = this.chartData.data.map((v, i) => {
        return {
          name: v[0].name,
          type: "line",
          color: this.color[i],
          emphasis: {
            label: {
              show: true
            }
          },
          data: v
        };
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
        legend: {
          // data: this.chartData.data,
          right: 20,
          textStyle: {
            color: "#fff"
          },
          top: 12
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
          data: this.chartData.xAxis
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
        series: series
      });
    }
  },
  watch: {
    dataset: {
      handler(newValue, oldValue) {
        this.chartData = newValue;
        this.draw();
      },
      immediate: false,
      deep: true
    }
  }
};
</script>

<style scoped>
</style>