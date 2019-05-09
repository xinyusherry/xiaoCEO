<template>
  <div class="moveDiv" @click="sendMsg(cardTime)"
    v-loading="loading"
    element-loading-text="Loading"
    element-loading-background="rgba(0, 0, 0, 0.8)"
  >
    <card :cardset="lj" :timetype="'month'" :propsTime="cardTime" style="margin-right:10px;">
      <div class="warpper">
        <h3 class="hj_unit">
          ￥&nbsp;&nbsp;
          <span class="hj">合计值 （单位：元）</span>
        </h3>
        <h3 class="total_num" >{{indexNum==null?'':indexNum.FINISH_VALUE}}</h3>
        <div class="line">
          <div id="canvas" style="width:300px;height:100px;margin-top:20px"></div>
        </div>
      </div>
    </card>
    <card :cardset="dy" :timetype="''">
      <div class="chart">
        <div id="mychartCost" style="width:200px;height:200px;margin-top:20px"></div>
      </div>
    </card>
  </div>
</template>

<script>
import qs from "qs";
import moment from "moment";
import card from "../../components/Card.vue";
import { getMax } from "../../utils/index.js";
import { setTimeout } from 'timers';
const defaultParam = {
  width: "calc(50% - 5px)",
  leftcolor: "#3023AE",
  rightcolor: "#C86DD7"
};
export default {
  components: { card },
  data() {
    return {
      loading:true,
      lj: {
        title: "成本完成值",
        ...defaultParam
      },
      dy: {
        title: "累计成本完成率",
        ...defaultParam
      },
      indexNum: null,
      cardTime:""
    };
  },
  watch:{
    indexNum(newVal,oldVal){
      if(newVal!==null){
        setTimeout(()=>{
          this.getBarData(newVal.ACCT_MONTH);
          this.getChartData("#6bfaff",newVal.YL,"mychartCost");
        },0);
      }
    }
  },
  methods: {
    sendMsg: function(tird) {
      const param = {
        dialogCompent: "costSecond",
        dialogTitle: "成本"
      };
      this.$emit("headCallBack", param,tird); //第一个参数是父组件中v-on绑定的自定义回调方法，第二个参数为传递的参数
    },
    drawBarChart(id, color, xData, yData, maxData) {
      let _this = this;
      let option = {
        // backgroundColor: "#141f56",
        title: {
          show: false
        },
        tooltip: {
          trigger: "axis",
          axisPointer:{
            type:'shadow',
            shadowStyle:{
              color:'rgba(150,150,150,0)',
              shadowColor:'rgba(0,0,0,0.1)'
            }
          },
          formatter:(params)=>{
              if(params.length>1){
                return params[0].marker+params[0].name+"："+params[0].value;
              }
          }
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
          scale: true,
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
            barWidth: "50%",
            data: yData
          },
          {
            name: "",
            type: "bar",
            xAxisIndex: 1,
            zlevel: 1,
            itemStyle: {
              normal: {
                color: "#385472",
                borderWidth: 0,
                borderType: "dashed",
                shadowBlur: {
                  shadowColor: "rgba(255,255,255,0.31)",
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowOffsetY: 2
                }
              }
            },
            barWidth: "50%",
            data: maxData
          }
        ]
      };
      let thisChart = _this.$echarts.init(document.getElementById(id));
      thisChart.setOption(option);
      _this.loading = false;
      window.addEventListener("resize", () => {
        thisChart.resize();
      });
    },
    getIndexNum() {
      let _this = this;
      this.$axios
        .get("/cost/getIndexNum")
        .then(function(res) {
          //console.log('成本',res)
          if (res.data.resultCode === "1") {
            let resultData = res.data.resultData;
            _this.indexNum = resultData;
            _this.cardTime = [_this.indexNum.ACCT_MONTH.substr(0, 4), _this.indexNum.ACCT_MONTH.substr(4, 2)].join("-");
          }
        })
        .catch(function(e) {});
    },
    getChartData(color, value, id) {
      let _this = this;
      let option = {
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
                        return 100 - params.value + "%";
                      } else {
                        return value + "%";
                      }
                    },
                    textStyle: {
                      fontSize: 30,
                      color: color
                    }
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
      let thisChart = _this.$echarts.init(document.getElementById(id));
      thisChart.setOption(option);
      window.addEventListener("resize", () => {
        thisChart.resize();
      });
    },
    getBarData(monthId) {
       let _this = this;
      const params = {
        monthId: monthId
      };
      this.$axios
        .post(
          "/cost/getBarData?" +
            qs.stringify({ JsonParam: JSON.stringify(params) })
        )
        .then(function(res) {
          if (res.data.resultCode === "1") {
            let resultData = res.data.resultData;
            let array = [];
            for(let k = 0;k< resultData.length;k++){
              array.push(resultData[k].CURRENT_VALUE)
            }
            let max = getMax(array.concat()) + 1000;
            let maxArr = [];
            let data = [];
            for (let i = 0; i < 12; i++) {
              data.push(i+1+"月");
              maxArr.push(max);
            }
            _this.drawBarChart("canvas", "#6afefc", data, array, maxArr);
          }
        })
        .catch(function(e) {});
    }
  },
  created() {
    this.getIndexNum();
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
.chart {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>