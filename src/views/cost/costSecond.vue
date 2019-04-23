<template>
  <div>
    <div class="header">
      <div class="tipDiv">
        <!-- <span class="tip" v-show="isDay===1">注：（日指标为当日月累）</span> -->
      </div>
      <ul class="tabs header">
        <li :class="{active:isActive === ''}" @click="changeTab('')">全部</li>
        <li :class="{active:isActive === '1001'}" @click="changeTab('1001')">市场</li>
        <li :class="{active:isActive === '1002'}" @click="changeTab('1002')">网运</li>
        <li :class="{active:isActive === '1003'}" @click="changeTab('1003')">综合</li>
      </ul>
      <div></div>
    </div>
    <div class="chartList">
      <div>
        <div class="rightBtn">
          <el-radio-group v-model="isDay" @change="handleChange">
            <el-radio :label="1">当月</el-radio>
            <el-radio :label="2">累计</el-radio>
          </el-radio-group>
        </div>
        <div id="line" style="height:90%"></div>
      </div>
      <div id="pie"></div>
    </div>
    <!-- table部分开始 -->
    <div>
      <div class="rightBtn btnList">
        <el-date-picker v-model="date" type="month" placeholder="选择日期" @change="dateChange" style="background:#070d12;"></el-date-picker>
      </div>
      <div class="table" :style="tableBgStyle">
         <el-table
          :data="tableData"
          style="width: 100%;"
          :cell-style="cellStyle"
          :header-cell-style="headerBgStyle"
          highlight-current-row
          stripe
           height="300"
        >
          <template v-for="col in tHeadData">
          <el-table-column
            :key="col.key"
            :prop="col.prop"
            :label="col.label"
            :sortable="col.prop.search(/VALUE/)===-1?false:true"
            align="center"
          >
            <template slot-scope="scope">
              <div slot="reference">{{scope.row[col.prop]}}</div>
            </template>
          </el-table-column>
        </template>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
import qs from "qs";
import moment from "moment";
export default {
  components: {},
  props: ["sendParams"],
  data() {
    return {
      isDay: 1,
      isActive: "",
      tHeadData:null,
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
      ],
      date: this.sendParams,
      isTableLineShow: false,
      tableBg: require("@/assets/images/tabBg.png"),
      tableBgStyle: {
        background:
          "url(" +
          require("@/assets/images/tabBg.png") +
          ") left top no-repeat",
        backgroundSize: "100% 100%",
        padding: "18px"
      },
      headerBgStyle: {
        background:
          "url(" +
          require("@/assets/images/icon_table_header.png") +
          ") left top repeat",
        backgroundSize: "100% 100%",
        textAlign: "center"
      },
      tableData: []
    };
  },
  methods: {
    dateChange(value){
      this.getTableData(moment(value).format('YYYYMM'))
    },
    changeTab(index) {
      let _this = this;
      this.isActive = index;
      if(_this.isDay === 1){
         _this.getBarData();
      }else{
         _this.getBarAndLineData();
      }
     this.getTbBarData();
      this.getTableData(moment(_this.date).format('YYYYMM'))
    },
    handleChange(value) {
      let that = this;
      if (value == 1) {
       that.getBarData();
      } else {
        that.getBarAndLineData();
      }
    },
    drawLineChart1(id, color,xAxis,data) {
      var thisChart = this.$echarts.init(document.getElementById(id));
      thisChart.clear();
      var option = {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow"
          }
        },
        title: [
          {
            left: "center",
            text: "成本当月完成",
            textStyle: {
              fontSize: 21,
              color: "#24FAFF"
            }
          }
        ],
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        xAxis: [
          {
            type: "category",
            data: xAxis,
            axisLine: {
              show: true,
              lineStyle: {
                color: "#3E6BCE",
                width: 2,
                type: "solid"
              }
            },
            axisTick: {
              show: false
            },
            axisLabel: {
              show: true,
              textStyle: {
                color: "#24FAFF"
              }
            }
          }
        ],
        yAxis: [
          {
            type: "value",
            axisTick: {
              show: false
            },
            axisLine: {
              show: true,
              lineStyle: {
                color: "#3E6BCE",
                width: 2,
                type: "solid"
              }
            },
            axisLabel: {
              show: true,
              textStyle: {
                color: "#24FAFF"
              }
            },
            name: "完成值(元)",
            nameTextStyle: {
              color: "#24FAFF",
              fontSize: 14
            },
            splitLine: {
              show: false
            }
          }
        ],
        series: [
          {
            name: "",
            type: "bar",
            data: data,
            barWidth: 10, //柱子宽度
            barGap: 1, //柱子之间间距
            color: color,
            itemStyle: {
              normal: {
                barBorderRadius: [10, 10, 0, 0]
              }
            }
          }
        ]
      };
      thisChart.setOption(option);
      window.addEventListener("resize", () => {
        thisChart.resize();
      });
    },
    drawLineChart2(id, color,xAxis,data,wcl,maxArr) {
      var thisChart = this.$echarts.init(document.getElementById(id));
      thisChart.clear();
      var option = {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow"
          },
          formatter: function(params) {
            return (
              params[0].name +
              "<br/>" +
              params[0].marker +
              params[0].seriesName +
              ":" +
              params[0].value +
              "<br/>" +
              params[1].marker +
              params[1].seriesName +
              ":" +
              params[1].value +
              "%"
            );
          }
        },
        title: [
          {
            left: "center",
            text: "成本当月累计",
            textStyle: {
              fontSize: 21,
              color: "#24FAFF"
            }
          }
        ],
        grid: {
          left: "3%",
          right: "6%",
          bottom: "3%",
          containLabel: true
        },
        xAxis: [
          {
            type: "category",
            data: xAxis,
            axisLine: {
              show: true,
              lineStyle: {
                color: "#3E6BCE",
                width: 2,
                type: "solid"
              }
            },
            axisTick: {
              show: false
            },
            axisLabel: {
              show: true,
              textStyle: {
                color: "#24FAFF"
              }
            }
          }
        ],
        yAxis: [
          {
            type: "value",
            axisTick: {
              show: false
            },
            axisLine: {
              show: true,
              lineStyle: {
                color: "#3E6BCE",
                width: 2,
                type: "solid"
              }
            },
            axisLabel: {
              show: true,
              textStyle: {
                color: "#24FAFF"
              }
            },
            name: "完成值(元)",
            nameTextStyle: {
              color: "#24FAFF",
              fontSize: 14
            },
            splitLine: {
              show: false
            }
          },
          {
            type: "value",
            axisTick: {
              show: false
            },
            axisLine: {
              show: true,
              lineStyle: {
                color: "#3E6BCE",
                width: 2,
                type: "solid"
              }
            },
            axisLabel: {
              show: true,
              formatter: "{value}%",
              textStyle: {
                color: "#24FAFF"
              }
            },
            name: "累计完成率",
            nameTextStyle: {
              color: "#24FAFF",
              fontSize: 14
            },
            splitLine: {
              show: false
            }
          }
        ],
        series: [
          {
            name: "完成值",
            type: "bar",
            data: data,
            barWidth: 10, //柱子宽度
            barGap: 1, //柱子之间间距
            color: color,
            itemStyle: {
              normal: {
                barBorderRadius: [10, 10, 0, 0]
              }
            }
          },
          {
            name: "累计完成率",
            type: "line",
            data: wcl,
            color: "#F76B1C",
            yAxisIndex: 1
          },
          {
            name: "",
            type: "bar",
            barWidth: 10,
            data: maxArr,
            barGap: "-100%",
            itemStyle: {
              color: "transparent",
              borderColor: "#0097FF",
              borderWidth: 1,
              borderType: "dashed"
            }
          }
        ]
      };
      thisChart.setOption(option);
      window.addEventListener("resize", () => {
        thisChart.resize();
      });
    },
    drawDubBarChart(id,xAxis,data,data2) {
      var thisChart = this.$echarts.init(document.getElementById(id));
      var option = {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow"
          }
        },
        title: [
          {
            left: "center",
            text: "同比分析",
            textStyle: {
              fontSize: 21,
              color: "#24FAFF"
            }
          }
        ],
        legend: {
          data: ["2018", "2019"],
          left: "center",
          top: 30,
          textStyle: {
            color: "#fff"
          },
          itemWidth: 10,
          itemHeight: 10,
          itemGap: 35
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        xAxis: [
          {
            type: "category",
            data:xAxis,
            axisLine: {
              show: true,
              lineStyle: {
                color: "#3E6BCE",
                width: 2,
                type: "solid"
              }
            },
            axisTick: {
              show: false
            },
            axisLabel: {
              show: true,
              textStyle: {
                color: "#24FAFF"
              }
            }
          }
        ],
        yAxis: [
          {
            type: "value",
            axisTick: {
              show: false
            },
            axisLine: {
              show: true,
              lineStyle: {
                color: "#3E6BCE",
                width: 2,
                type: "solid"
              }
            },
            axisLabel: {
              show: true,
              textStyle: {
                color: "#24FAFF"
              }
            },
            name: "完成值(元)",
            nameTextStyle: {
              color: "#24FAFF",
              fontSize: 14
            },
            splitLine: {
              show: false
            }
          }
        ],
        series: [
          {
            name: "2018",
            type: "bar",
            data: data,
            barWidth: 10, //柱子宽度
            barGap: '10%', //柱子之间间距
            color: "#3AA3F3"
          },
          {
            name: "2019",
            type: "bar",
            data: data2,
            barWidth: 10,
            barGap: '10%',
            color: "#F868AF"
          }
        ]
      };
      thisChart.setOption(option);
      window.addEventListener("resize", () => {
        thisChart.resize();
      });
    },
    cellStyle({ columnIndex }) {
      if (columnIndex === 0) {
        return "color: #6AFFFD";
      } else {
        return "";
      }
    },
    getBarData() {
      let _this = this;
       const params = {
      monthId: moment(_this.sendParams).format('YYYYMM'),
      itemType:_this.isActive
    };
      this.$axios
        .get(
          "/cost/getBarData?" +
            qs.stringify({ JsonParam: JSON.stringify(params) })
        )
        .then(function(res) {
          if (res.data.resultCode === "1") {
            let resultData = res.data.resultData;
            let data = [];
            let  xAxis = [];
            for(let i = 0;i<resultData.length;i++){
              data.push(resultData[i].CURRENT_VALUE);
              xAxis.push(resultData[i].ACCT_MONTH)
            }
             _this.drawLineChart1("line", "#F868AF",xAxis,data);
          }
        })
        .catch(function(e) {});
    },
    getBarAndLineData() {
      let _this = this;
       const params = {
      monthId: moment(_this.sendParams).format('YYYYMM'),
      itemType:_this.isActive
    };
      this.$axios
        .get(
          "/cost/getBarAndLineData?" +
            qs.stringify({ JsonParam: JSON.stringify(params) })
        )
        .then(function(res) {
          if (res.data.resultCode === "1") {
            let resultData = res.data.resultData;
            let data = [];
            let  xAxis = [];
            let maxArr = [];
            let wcl = [];
            for(let i = 0;i<resultData.length;i++){
              data.push(resultData[i].FINISH_VALUE);
              xAxis.push(resultData[i].ACCT_MONTH)
              maxArr.push(resultData[i].BUDGET_VALUE_Y)
              wcl.push(resultData[i].YL)
            }
             _this.drawLineChart2("line", "#F868AF",xAxis,data,wcl,maxArr);
          }
        })
        .catch(function(e) {});
    },
    getTbBarData() {
      let _this = this;
       const params = {
      monthId: moment(_this.sendParams).format('YYYYMM'),
      itemType:_this.isActive
    };
      this.$axios
        .get(
          "/cost/getTbBarData?" +
            qs.stringify({ JsonParam: JSON.stringify(params) })
        )
        .then(function(res) {
          if (res.data.resultCode === "1") {
            let resultData = res.data.resultData[0];
            let resultData2 = res.data.resultData[1];
            let data = [];
            let  xAxis = [];
            let data2 = [];
            for(let i = 0;i<resultData.length;i++){
              data.push(resultData[i].LAST_FINISH_VALUE);
            }
            for(let i = 0; i<12;i++){
              xAxis.push(i+1+'月')
            }
            for(let i = 0;i<resultData2.length;i++){
              data2.push(resultData2[i].FINISH_VALUE);
            }
            _this.drawDubBarChart("pie",xAxis,data,data2);
          }
        })
        .catch(function(e) {});
    },
     getTableData(monthId) {
      let _this = this;
       const params = {
      monthId: monthId,
      itemType:_this.isActive
    };
      this.$axios
        .get(
          "/cost/getTableData?" +
            qs.stringify({ JsonParam: JSON.stringify(params) })
        )
        .then(function(res) {
          //console.log('表格',res)
          if(res.data==""){
            _this.tableData = [];
          }
          if (res.data.resultCode === "1") {
            let resultData = res.data.resultData;
            const object = {
               ITEM_NAME: "成本项目费用",
               BUDGET_VALUE_Y: "年度预算",
              FINISH_VALUE:"累计完成",
              YSWCL:"预算完成率",
              FINISH_VALUE_TQ:"去年同期",
              TBZZ:"同比增长",
              CURRENT_VALUE:"当月完成",
               CURRENT_VALUE_SY:"上月完成",
            };
           let tHeadData = [];
            for (const key in object) {
              if (object.hasOwnProperty(key)) {
                 tHeadData.push({
                label: object[key],
                prop: key
              });
              }
            }
            _this.tHeadData = tHeadData;
            _this.tableData = resultData;
          }
        })
        .catch(function(e) {});
    },
  },
  mounted() {
    let _this = this;
    this.getBarData();
    this.getTbBarData();
    this.getTableData(moment(_this.sendParams).format('YYYYMM'))
  }
};
</script>

<style lang="less">
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.tipDiv {
  width: 192px;
}
.tip {
  font-size: 16px;
  color: #6afffd;
}
.tabs > li {
  padding: 8px 16px;
  margin-right: 30px;
  font-size: 24px;
  color: #5585ad;
  cursor: pointer;
  &.active {
    color: #6afffd;
    border-bottom: 5px solid #6afffd;
  }
}
.el-radio + .el-radio {
  margin-left: 0px !important;
}
.chartList {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 200px;
  margin-top: 40px;
  > div {
    flex: 1;
    height: 100%;
  }
}
.down {
  background: #1b8cea;
  color: #ffffff;
  font-size: 20px;
  cursor: pointer;
  padding: 9px 20px;
  border: 1px solid transparent;
}
.xq {
  color: #979797;
  cursor: pointer;
  padding: 9px 20px;
  border: 1px solid #1b8cea;
  border-left: none;
  font-size: 20px;
}
.mr20 {
  margin-right: 20px;
}
.table {
  margin-top: 20px;
  position: relative;
}
.btnList {
  .el-input__inner {
    border: 1px solid #5fb6f9;
    background-color: rgba(0, 0, 0, 0.1);
    font-size: 16px;
    color: #ffffff;
    line-height: 41px;
  }
  .el-icon-date:before {
    color: #5fb6f9;
    font-size: 18px;
  }
}
</style>