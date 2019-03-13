<template>
  <div :id="id" style="width:100%;height:100%"></div>
</template>

<script>
export default {
  props: ["id", "dataset", "color"],
  data: function() {
    return {};
  },
  mounted() {
    setTimeout(() => {
      var thisChart = this.$echarts.init(document.getElementById(this.id));
      var mEcharts = this.$echarts;
      thisChart.on("legendselectchanged", function(event) {
        event.stopPropagation();
      });
      thisChart.on("click", function(event) {
        event.stopPropagation();
      });
      var myRate1 = 100;
      var option = {
        grid: {
          top: "15%",
          left: "6%",
          right: "5.6%",
          bottom: "6%",
          containLabel: true
        },
        tooltip: {
          show: true
        },
        series: [
          {
            type: "gauge",
            center: ["50%", "55%"], // 默认全局居中
            radius: "82%",
            splitNumber: 5, //刻度数量
            min: 0,
            max: 100,
            startAngle: 200,
            endAngle: -20,
            clockwise: true,
            axisLine: {
              show: true,
              lineStyle: {
                width: 2,
                shadowBlur: 0,
                color: [[1, "#03B7C9"]]
              }
            },
            axisTick: {
              show: true,
              lineStyle: {
                color: "#03B7C9",
                width: 1
              },
              length: -5,
              splitNumber: 10
            },
            splitLine: {
              show: true,
              length: -1,
              lineStyle: {
                color: "#03B7C9"
              }
            },
            axisLabel: {
              show: false,
              distance: -18,
              textStyle: {
                color: "#03B7C9",
                fontSize: "12",
                fontWeight: "bold"
              }
            },
            pointer: {
              //仪表盘指针
              show: false
            },
            detail: {
              show: false
            },
            data: [
              {
                name: "",
                value: myRate1
              }
            ]
          },
          {
            name: "电话评价",
            type: "gauge",
            startAngle: 200,
            endAngle: -20,
            radius: "78%",
            center: ["50%", "55%"], // 默认全局居中
            min: 0,
            max: 100,
            axisLine: {
              show: true,
              lineStyle: {
                width: 10,
                color: [
                  [
                    1,
                    new mEcharts.graphic.LinearGradient(0, 0, 1, 0, [
                      {
                        offset: 0,
                        color: "#2AC6FF"
                      },
                      {
                        offset: 1,
                        color: "#A834EF"
                      }
                    ])
                  ]
                ]
              }
            },
            axisTick: {
              show: false
            },
            splitLine: {
              show: false,
              length: 5
            },

            axisLabel: {
              show: false
            },
            pointer: {
              show: false
            },
            detail: {
              //仪表盘数字的位置
              show: true,
              offsetCenter: [0, 0],
              textStyle: {
                fontSize: 26,
                color: "#41c9da"
              },
              formatter: "{value}万"
            },
            title: {
              show: true,
              offsetCenter: [0, "-33%"], // x, y，单位px
              textStyle: {
                fontSize: 16,
                color: "#88bc66"
              }
            },
            data: [
              {
                name: "已分享",
                value: 80
              }
            ]
          },
          {
            type: "gauge",
            center: ["33%", "55%"], // 默认全局居中
            radius: "82%",
            splitNumber: 5, //刻度数量
            min: 0,
            max: 100, //在线交流评价刻度
            endAngle: 45,
            clockwise: true,
            axisLine: {
              show: true,
              lineStyle: {
                width: 2,
                shadowBlur: 0,
                color: [[1, "#03B7C9"]]
              }
            },
            axisTick: {
              show: true,
              lineStyle: {
                color: "#03B7C9",
                width: 1
              },
              length: -5,
              splitNumber: 10
            },
            splitLine: {
              show: true,
              length: -1,
              lineStyle: {
                color: "#03B7C9"
              }
            },
            axisLabel: {
              show: false,
              distance: -20,
              textStyle: {
                color: "#03B7C9",
                fontSize: "12",
                fontWeight: "bold"
              }
            },
            pointer: {
              //仪表盘指针
              show: 0
            },
            detail: {
              show: false
            },
            data: [
              {
                name: "",
                value: myRate1
              }
            ]
          },
          {
            name: "在线交流评价",
            type: "gauge",
            endAngle: 45,
            radius: "78%", //有颜色的半径
            center: ["33%", "55%"], // 默认全局居中

            min: 0,
            max: 100,
            axisLine: {
              show: true,
              lineStyle: {
                width: 10,
                color: [
                  [
                    1,
                    new mEcharts.graphic.LinearGradient(0, 0, 1, 0, [
                      {
                        offset: 0,
                        color: "#2AC6FF"
                      },
                      {
                        offset: 1,
                        color: "#A834EF"
                      }
                    ])
                  ]
                ]
              }
            },
            axisTick: {
              show: false
            },
            splitLine: {
              show: false,
              length: 20
            },

            axisLabel: {
              show: false
            },
            pointer: {
              show: false
            },
            detail: {
              //仪表盘数字的位置
              show: true,
              offsetCenter: [0, 0],
              textStyle: {
                fontSize: 26,
                color: "#41c9da"
              },
              formatter: "{value}万"
            },
            title: {
              show: true,
              offsetCenter: [0, "-33%"], // x, y，单位px
              textStyle: {
                fontSize: 16,
                color: "#88bc66"
              }
            },
            itemStyle: {
              normal: {
                color: "#fff"
              }
            },
            data: [
              {
                name: "可分享",
                value: 656
              }
            ]
          },
          {
            type: "gauge",
            center: ["67%", "55%"], // 默认全局居中
            radius: "82%",
            splitNumber: 5, //刻度数量
            min: 0,
            max: 100,
            startAngle: 140,
            endAngle: -45,
            clockwise: true,
            axisLine: {
              show: true,
              lineStyle: {
                width: 2,
                shadowBlur: 0,
                color: [[1, "#03B7C9"]]
              }
            },
            axisTick: {
              show: true,
              lineStyle: {
                color: "#03B7C9",
                width: 1
              },
              length: -5,
              splitNumber: 10
            },
            splitLine: {
              show: true,
              length: -1,
              lineStyle: {
                color: "#03B7C9"
              }
            },
            axisLabel: {
              show: false,
            },
            pointer: {
              //仪表盘指针
              show: 0
            },
            detail: {
              show: false
            },
            data: [
              {
                name: "",
                value: myRate1
              }
            ]
          },
          {
            name: "网站评价",
            type: "gauge",
            startAngle: 140,
            endAngle: -45,
            radius: "78%",
            center: ["67%", "55%"], // 默认全局居中
            min: 0,
            max: 100,
            axisLine: {
              show: true,
              lineStyle: {
                width: 10,
                color: [
                  [
                    1,
                    new mEcharts.graphic.LinearGradient(0, 0, 1, 0, [
                      {
                        offset: 0,
                        color: "#2AC6FF"
                      },
                      {
                        offset: 1,
                        color: "#A834EF"
                      }
                    ])
                  ]
                ]
              }
            },
            axisTick: {
              show: false
            },
            splitLine: {
              show: false,
            },
            axisLabel: {
              show: false
            },
            pointer: {
              show: false
            },
            detail: {
              //仪表盘数字的位置
              show: true,
              offsetCenter: [0, 0],
              textStyle: {
                fontSize: 26,
                color: "#41c9da"
              },
              formatter: "{value}万"
            },
            title: {
              show: true,
              offsetCenter: [0, "-33%"], // x, y，单位px
              textStyle: {
                fontSize: 16,
                color: "#88bc66"
              }
            },
            data: [
              {
                name: "剩余可分享",
                value: 50
              }
            ]
          }
        ]
      };
      thisChart.setOption(option);
      window.addEventListener("resize", () => {
        thisChart.resize();
      });
    }, 0);
  }
};
</script>

<style scoped>
</style>