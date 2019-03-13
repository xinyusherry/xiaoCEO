<template>
  <div class="moveDiv" @click="sendMsg">
    <card :cardset="lj" :timetype="'month'" style="margin-right:10px;">
      <div class="warpper">
        <h3 class="hj_unit">
          ￥&nbsp;&nbsp;
          <span class="hj">(合计值)</span>
        </h3>
        <h3 class="total_num">143,434,344,345,354</h3>
        <div class="line">
             <div id="canvas" style="width:300px;height:100px;margin-top:20px"></div>
        </div>
      </div>
    </card>
    <card :cardset="dy" :timetype="''">
      <div class="chart">
        <div id="mychart" style="width:200px;height:200px;margin-top:20px"></div>
      </div>
    </card>
  </div>
</template>

<script>
import card from "../../components/Card.vue";
const defaultParam = {
  width: "calc(50% - 5px)",
  leftcolor: "#3023AE",
  rightcolor: "#C86DD7"
};
export default {
  components: { card },
  data() {
    return {
      lj: {
        title: "成本完成值",
        ...defaultParam
      },
      dy: {
        title: "累计成本完成率",
        ...defaultParam
      }
    };
  },
  methods: {
      sendMsg:function() {
      const param = {
        dialogCompent:"costSecond",
        dialogTitle:"成本",
      }
      this.$emit('headCallBack', param); //第一个参数是父组件中v-on绑定的自定义回调方法，第二个参数为传递的参数
    },
    drawBarChart(id, color, xData, yData) {
      var option = {
        // backgroundColor: "#141f56",
        title: {
          show: false
        },
        tooltip: {
          trigger: "item",
          backgroundColor: "rgba(0,0,0,0.7)", // 背景
          padding: [8, 10], //内边距
          extraCssText: "box-shadow: 0 0 3px rgba(255, 255, 255, 0.4);", //添加阴影
          show: false
        },
        grid: {
          borderWidth: 0,
          top: 110,
          bottom: 95,
          textStyle: {
            color: "#fff"
          }
        },
        xAxis: [
          {
            type: "category",
            data: xData,
            show: false
          },
          {
            type: "category",
            data: xData,
            show: false
          }
        ],
        yAxis: {
          show: false,
          type: "value"
        },
        series: [
          {
            name: "",
            type: "bar",
            itemStyle: {
              normal: {
                show: true,
                color: color,
                // barBorderRadius: 50,
                borderWidth: 0
              },
              emphasis: {
                shadowBlur: 15,
                shadowColor: "rgba(105,123, 214, 0.7)"
              }
            },
            zlevel: 2,
            barWidth: "35%",
            data: yData
          },
          {
            name: "",
            type: "bar",
            xAxisIndex: 1,
            zlevel: 1,
            itemStyle: {
              normal: {
                color: "#121847",
                borderWidth: 0,
                borderType:"dashed",
                shadowBlur: {
                  shadowColor: "rgba(255,255,255,0.31)",
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowOffsetY: 2
                }
              }
            },
            barWidth: "35%",
            data: [30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30]
          }
        ]
      };
      
      var thisChart = this.$echarts.init(document.getElementById(id));
      thisChart.setOption(option);
      window.addEventListener("resize", () => {
        thisChart.resize();
      });
    },
    getChartData: function(color, value, id) {
      var option = {
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
          show: false
        },
        series: [
          {
            name: "累计成本",
            type: "pie",
            radius: ["60%", "70%"],
            label: {
              normal: {
                position: "center"
              }
            },
            data: [
              {
                value: value,
                name: "完成率",
                label: {
                  normal: {
                    formatter: function(params) {
                      if (params.value < 0 || params.value == 0) {
                        return 100 - params.value+ "%";
                      } else {
                        return value + "%";
                      }
                    },
                    textStyle: {
                      fontSize: 30,
                      color: color
                    },
                  }
                },
                itemStyle: {
                  normal: {
                    color: color,
                    label: {
                      show: true,
                      position: "center",
                      formatter: "{b}",
                      textStyle: {
                        baseline: "center"
                      }
                    },
                    labelLine: {
                      show: false
                    }
                  }
                }
              },
              {
                value: 100 - value < 0 ? 0 : 100 - value,
                name: "占位",
                label: {
                  normal: {
                    show: false,
                    formatter: "\n完成率",
                    textStyle: {
                      color: "#555",
                      fontSize: 20
                    }
                  }
                },
                tooltip: {
                  show: false
                },
                itemStyle: {
                  normal: {
                    color: "#aaa"
                  },
                  emphasis: {
                    color: "#aaa"
                  }
                },
                hoverAnimation: false
              }
            ]
          }
        ]
      };
      var mychart = this.$echarts.init(document.getElementById(id));
      mychart.setOption(option);
        window.addEventListener("resize", () => {
        mychart.resize();
      });
    }
  },
  mounted() {
    var xData = (function() {
      var data = [];
      for (var i = 0; i < 12; i++) {
        data.push(i);
      }
      return data;
    })();
    var yData = [13.7, 13.4, 13.5, 16.1, 17.4, 15.2];
    this.drawBarChart("canvas", "#6afefc", xData, yData);
    this.getChartData("#1AC175", 10, "mychart");
  }
};
</script>

<style scoped>
.moveDiv {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
}
.warpper {
  padding: 0 10px;
}
.hj_unit {
  color: #ffffff;
  font-size: 18px;
  margin-top: 20px;
}
.hj {
  color: #7594c3;
  font-size: 15px;
}
.total_num {
  color: #ffffff;
  font-size: 26px;
  margin-top: 20px;
}
.chart{
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>