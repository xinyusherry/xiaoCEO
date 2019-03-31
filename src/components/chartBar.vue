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
      this.$emit("CallBack", thisChart);
      let series = this.chartData.data.map((v, i) => {
        return {
          name: v[0].name,
          type: "bar",
          color: this.color[i],
          barWidth: 30,
          itemStyle: {
            barBorderRadius: 5
          },
          data: v
        };
      });
      thisChart.setOption({
        grid: {
          containLabel: true,
          width: "80%",
          height: "70%",
          top: "13%"
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "none"
          }
        },
        xAxis: {
          type: "category",
          boundaryGap: true,
          axisLabel: {
            fontSize: 16,
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
          data: this.chartData.xAxis
        },
        yAxis: {
          type: "value",
          name: "完成量（人）",
          // scale: true,
          nameTextStyle: {
            color: "#24FAFF"
          },
          axisLabel: {
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
        series: series /* [
          {
            type: "bar",
            color: this.color,
            barWidth: 30,
            itemStyle: {
              barBorderRadius: 5
            },
            data: this.chartData.data
          }
        ] */
      });
      // window.addEventListener("resize", () => {
      //   thisChart.resize();
      // });
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