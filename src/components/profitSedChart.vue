<template>
  <div :id="id" style="width:100%;height:100%"></div>
</template>

<script>
export default {
  props: ["id", "type", "dataset", "title", "color"],
  data: function() {
    return {};
  },
  mounted() {
    setTimeout(() => {
      this.draw();
    }, 0);
  },
  methods: {
    draw() {
      var thisChart = this.$echarts.init(document.getElementById(this.id));
      thisChart.setOption({
        color: this.color,
        title: {
          left: "center",
          text: this.title,
          top: "5%",
          textStyle: {
            color: "#24FAFF"
          }
        },
        legend: {
          data: this.dataset.legendData,
          top: "16%",
          textStyle: {
            color: "#fff"
          }
        },
        grid: {
          containLabel: true,
          top: "30%",
          bottom: "5%",
          left: "5%",
          right: "5%"
        },
        tooltip: {
          trigger: "axis"
        },
        xAxis: {
          type: "category",
          boundaryGap: true,
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
          },
          data: this.dataset.xAxis
        },
        yAxis: {
          type: "value",
          name: "完成值（万元）",
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
        series: [
          {
            name: this.dataset.legendData[0].name,
            type: this.type,
            barWidth: 10,
            data: this.dataset.data[0]
          },
          {
            name: this.dataset.legendData[1].name,
            type: this.type,
            barWidth: 10,
            data: this.dataset.data[1]
          }
        ]
      });
    }
  },
  watch: {
    dataset: {
      handler(newValue, oldValue) {
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