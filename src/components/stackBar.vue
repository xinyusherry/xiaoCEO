<template>
  <div class="pieDiv">
    <div :id="id" style="width:80%;height:100%"></div>
  </div>
</template>

<script>
export default {
  props: ["id", "dataset", "color"],
  data: function() {
    return {
      ywData: this.dataset.data.ywData,
      gwData: this.dataset.data.gwData
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
          height: "70%",
          width: "50%",
          top: "13%"
        },
        tooltip: {},
        color: this.color,
        legend: {
          data: this.dataset.legendData, //['主拆', '欠拆'],
          orient: "vertical",
          align: "left",
          left: "right",
          top: "middle",
          itemWidth: 10,
          itemHeight: 10,
          textStyle: {
            color: "#fff"
          }
        },
        xAxis: {
          type: "category",
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            color: "#fff"
          },
          data: this.dataset.xAxis //['移网', '固网']
        },
        yAxis: {
          type: "value",
          show: false
        },
        series: [
          {
            name: "主拆",
            type: "bar",
            data: [
              this.ywData[0],
              this.gwData[0],
            ],
            stack: "one",
            barWidth: 15
          },
          {
            name: "欠拆",
            barWidth: 15,
            type: "bar",
            data: [
              this.ywData[1],
              this.gwData[1],
            ],
            stack: "one"
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