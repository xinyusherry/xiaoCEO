<template>
  <div class="moveDiv">
    <card :cardset="importantBus" :timetype="''">
      <el-button class="popBtn" type="primary" @click="sendMsg()" size="mini">指标选择</el-button>
      <div id="impLineChart" style="width:100%;height:calc(100% - 30px)"></div>
    </card>
  </div>
</template>

<script>
import qs from "qs";
import card from "../../components/Card.vue";
import { setTimeout } from "timers";
const defaultParam = {
  width: "100%",
  leftcolor: "#F88A94",
  rightcolor: "#DA1936"
};
export default {
  components: { card },
  props: ["receiveParams"],
  data() {
    return {
      importantBus: {
        title: "重点业务监控",
        ...defaultParam
      },
      lineDataset: {
        xAxis: [],
        data: []
      },
      mode: "",
      dayId: "",
      monthId: "",
      rData:{},
      rTarget:{}
    };
  },
  watch: {
    receiveParams(val) {
      this.post(val);
    }
  },
  methods: {
    getDefault(){
      let _this = this;
      this.$axios
        .get("/Workbench/getKeyTarget")
        .then(function(res) {
          let data = res.data;
          _this.mode = data.resultData.MORD;
          _this.dayId = data.resultData.dayId;
          _this.monthId = data.resultData.monthId;
          _this.rData = data.resultData.rData
          _this.rTarget = data.resultData.rTarget
          let seriesData = [];
          seriesData = data.resultData.rData.rList.map(obj => ({
            name: obj.PRODUCT_NAME,
            id: obj.PRODUCT_CODE,
            type: "line",
            data: obj.data
          }));
          _this.$set(_this.lineDataset, "xAxis", data.resultData.rData.rDate);
          _this.$set(_this.lineDataset, "data", seriesData);
          _this.drawLineChart(_this.lineDataset);
        })
        .catch(function(e) {
        });
    },
    post(params) {
      let _this = this;
      this.$axios
        .get(
          "/Workbench/setKeyTarget?" +
            qs.stringify({ JsonParam: JSON.stringify(params) })
        )
        .then(function(res) {
          let data = res.data;
          _this.mode = data.resultData.MORD;
          _this.dayId = data.resultData.dayId;
          _this.monthId = data.resultData.monthId;
          _this.rData = data.resultData.rData
          _this.rTarget = data.resultData.rTarget
          let seriesData = [];
          seriesData = data.resultData.rData.rList.map(obj => ({
            name: obj.PRODUCT_NAME,
            id: obj.PRODUCT_CODE,
            type: "line",
            data: obj.data
          }));
          _this.$set(_this.lineDataset, "xAxis", data.resultData.rData.rDate);
          _this.$set(_this.lineDataset, "data", seriesData);
          _this.drawLineChart(_this.lineDataset);
        })
        .catch(function(e) {
        });
    },
    sendMsg: function() {
      const param = {
        dialogCompent: "importantCheck",
        dialogTitle: "指标选择"
      };
      this.$emit("headCallBack", param); //第一个参数是父组件中v-on绑定的自定义回调方法，第二个参数为传递的参数
    },
    drawLineChart(dataset) {
      var thisChart = this.$echarts.init(
        document.getElementById("impLineChart")
      );
      thisChart.clear();
      thisChart.setOption({
        color: [
          "#c12e34",
          "#e6b600",
          "#0098d9",
          "#2b821d",
          "#005eaa",
          "#339ca8",
          "#cda819",
          "#32a487"
        ],
        legend: {
          data: dataset.data,
          right: 20,
          textStyle: {
            color: "#fff"
          },
          top: 12
        },
        grid: {
          containLabel: true,
          top: "18%",
          bottom: "8%",
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
            color: "#fff"
          },
          axisLine: {
            lineStyle: {
              color: "#fff"
            }
          },
          splitLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          data: dataset.xAxis
        },
        yAxis: {
          type: "value",
          nameTextStyle: {
            color: "#fff"
          },
          axisLabel: {
            color: "#fff"
          },
          axisLine: {
            lineStyle: {
              color: "#fff"
            }
          },
          splitLine: {
            show: false
          },
          axisTick: {
            show: false
          }
        },
        series: dataset.data
      });
      window.addEventListener("resize", () => {
        thisChart.resize();
      });
    },
    changeData() {
      const resultData = {
        rData: {
          rDate: [
            "20190224",
            "20190225",
            "20190226",
            "20190227",
            "20190228",
            "20190301",
            "20190302"
          ],
          rList: [
            {
              data: [0, 0, 0, 0, 0, 62, 70],
              PRODUCT_NAME: "单卡",
              PRODUCT_CODE: "001001"
            },
            {
              data: [0, 0, 0, 0, 0, 50, 52],
              PRODUCT_NAME: "融合",
              PRODUCT_CODE: "001002"
            },
            {
              data: [0, 0, 0, 0, 0, 0, 0],
              PRODUCT_NAME: "M计划",
              PRODUCT_CODE: "001004"
            }
          ]
        }
      }; //接口数据格式
      let seriesData = [];
      seriesData = resultData.rData.rList.map(obj => ({
        name: obj.PRODUCT_NAME,
        id: obj.PRODUCT_CODE,
        type: "line",
        data: obj.data
      }));
      this.$set(this.lineDataset, "xAxis", resultData.rData.rDate);
      this.$set(this.lineDataset, "data", seriesData);
      this.drawLineChart(this.lineDataset);
    }
  },
  created() {
    this.getDefault();
  }
};
</script>

<style scoped>
.moveDiv {
  width: 100%;
  height: 100%;
  position: relative;
}
.popBtn {
  position: absolute;
  top: 10px;
  right: 20px;
}
</style>