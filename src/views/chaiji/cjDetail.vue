<template>
  <div :sendParams="sendParams">
    <div class="header">
      <div class="tipDiv">
        <!-- <span class="tip" v-show="isDay===1">注：（日指标为当日月累）</span> -->
      </div>
      <ul class="tabs header">
        <li :class="{active:isActive === 0}" @click="changeTab(0)">固网拆机 {{GW_NUM}}</li>
        <li :class="{active:isActive === 1}" @click="changeTab(1)">移动拆机 {{YW_NUM}}</li>
      </ul>
      <el-radio-group v-model="isDay" @change="changeIsDay">
        <el-radio :label="'day'">日</el-radio>
        <el-radio :label="'month'">月</el-radio>
      </el-radio-group>
    </div>
    <div class="chartList">
      <div id="line"></div>
      <div id="pie"></div>
    </div>
    <!-- table部分开始 -->
    <div v-if="isActive===0">
      <div class="btnList">
        <div class="rightBtn">
          <el-date-picker
            v-model="date"
            :type="dateType"
            placeholder="选择日期"
            style="background:#070d12;margin-right:20px"
            @change="dateChange"
          ></el-date-picker>
          <ul class="header">
            <li  :class=" tableType === 'people' ?activeClass:unActiveClass"  @click="changeTableType('people')">人员</li>
            <li :class=" tableType === 'community' ?activeClass:unActiveClass"  @click="changeTableType('community')">小区</li>
          </ul>
        </div>
      </div>
      <div class="table" :style="tableBgStyle">
        <el-table
          :data="tableData"
          style="width: 100%;"
          :cell-style="cellStyle"
          :header-cell-style="headerBgStyle"
          highlight-current-row
          stripe
          height="280"
        >
          <el-table-column prop="ORGAN_NAME" align="center" label="名称"></el-table-column>
          <el-table-column align="center" label="主拆" width="180" sortable prop="CJ_GWZD_NUM"></el-table-column>
          <el-table-column prop="CJ_GWQF_NUM" label="欠拆" align="center" sortable></el-table-column>
          <el-table-column
            label="操作"
            align="center"
            v-if="tableType === 'community'">
            <template slot-scope="scope">
                <el-button class="btn-detail" size="small" @click="HrefToTable(scope.row['ORGAN_ID'])">一区一表</el-button>
            </template>
          </el-table-column>
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
      isDay: "day",
      dateType: "date",
      tableType:"people",
      isActive: 0,
      xAxisData: [],
      date: "",
      YW_NUM: "",
      GW_NUM: "",
      gwArr: [],
      ywArr: [],
      gwPieArr: [],
      ywPieArr: [],
      isTableLineShow: false,
       activeClass: "down",
      unActiveClass: "xq",
      img: require("@/assets/images/sj.png"),
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
    changeTab(index) {
      let that = this;
      this.isActive = index;
      if (index === 0) {
        that.drawLineChart("line", "#fbbf50", that.xAxisData, that.gwArr);
        that.drawPieChart("pie", that.gwPieArr);
      } else {
        that.drawLineChart("line", "#fbbf50", that.xAxisData, that.ywArr);
        that.drawPieChart("pie", that.ywPieArr);
      }
    },
    changeIsDay(type) {
      let that = this;
      let merge = {};
      if (type === "day") {
        that.dateType = "date";
         that.date = moment(that.sendParams.dayId,'YYYY-MM-DD')
        merge = {
          dayId:that.sendParams.dayId
        }
      } else {
        that.dateType = "month";
          that.date = moment(that.sendParams.monthId,'YYYY-MM')
          merge = {
          monthId:that.sendParams.monthId
        }
      }
      this.getTopNum(type);
      this.getLineData(type);
      this.getPieData(type);
      const params = {
        type: type,
        tableType: that.tableType,
        ...merge
      };
      that.getTableData(params);
    },
      changeTableType(val) {
      let that = this;
      this.tableType = val;
      let merge = {};
      if (that.isDay === "day") {
        merge = {
          dayId:that.sendParams.dayId
        }
      } else {
          merge = {
          monthId:that.sendParams.monthId
        }
      }
       const params = {
        type:that.isDay,
        tableType: that.tableType,
        ...merge
      };
      this.getTableData(params);
    },
     dateChange(value) {
       let that = this;
        let merge = {};
      if (that.dateType === "date") {
        merge = {
          dayId: moment(value).format("YYYYMMDD")
        }
      } else {
          merge = {
          monthId:moment(value).format("YYYYMM")
        }
      }
       const params = {
        type:that.dateType === 'date'?'day':"month",
        tableType: that.tableType,
        ...merge
      };
      this.getTableData(params);
    },
    getTopNum(type) {
      let that = this;
      const params = {
        type: type
      };
      this.$axios
        .get(
          "/Dismantlery/getTopNum?" +
            qs.stringify({ JsonParam: JSON.stringify(params) })
        )
        .then(function(res) {
          console.log(res);
          if (res.data.resultCode === "1") {
            let resultData = res.data.resultData;
            that.YW_NUM = resultData.CJ_YD_NUM;
            that.GW_NUM = resultData.CJ_GW_NUM;
          }
        })
        .catch(function(e) {});
    },
    getLineData(type) {
      let that = this;
      const params = {
        type: type
      };
      this.$axios
        .get(
          "/Dismantlery/getLineData?" +
            qs.stringify({ JsonParam: JSON.stringify(params) })
        )
        .then(function(res) {
          if (res.data.resultCode === "1") {
            let resultData = res.data.resultData;
            let gwArr = [],
              ywArr = [],
              xAxisData = [];
            for (let i = 0; i < resultData.length; i++) {
              if(that.isDay=='day'){
                xAxisData.push(resultData[i].ACCT_DAY);
              }else{
                xAxisData.push(resultData[i].ACCT_MONTH);
              }
              ywArr.push(resultData[i].CJ_YD_NUM);
              gwArr.push(resultData[i].CJ_GW_NUM);
            }
            that.xAxisData = xAxisData;
            that.ywArr = ywArr;
            that.gwArr = gwArr;
            //固网
            that.drawLineChart("line", "#fbbf50", xAxisData, gwArr);
          }
        })
        .catch(function(e) {});
    },
    drawLineChart(id, color, xAxis, yData) {
      setTimeout(() => {
        let title = this.isActive == 0 ? "固网拆机趋势" : "移动流失趋势";
        var thisChart = this.$echarts.init(document.getElementById(id));
        thisChart.clear();
        thisChart.setOption({
          grid: {
            containLabel: true,
            width: "79%",
            height: "70%",
            top: "18%"
          },
          title: [
            {
              left: "center",
              text: title,
              textStyle: {
                fontSize: 21,
                color: "#24FAFF"
              }
            }
          ],
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
            name: "",
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
            data: xAxis,
            axisLabel: {
              show: true,
              textStyle: {
                color: "#24FAFF",
                fontSize: 12
              }
            }
          },
          yAxis: {
            type: "value",
            scale: true,
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
            name: "拆机数(户)",
            nameTextStyle: {
              color: "#24FAFF",
              fontSize: 14
            },
            axisLabel: {
              show: true,
              textStyle: {
                color: "#24FAFF",
                fontSize: 12
              }
            }
          },
          series: [
            {
              type: "line",
              color: color,
              symbol: "none",
              emphasis: {
                label: {
                  show: true
                }
              },
              data: yData
            }
          ]
        });
        window.addEventListener("resize", () => {
          thisChart.resize();
        });
      }, 0);
    },
    getPieData(type) {
      let that = this;
      const params = {
        type: type
      };
      this.$axios
        .get(
          "/Dismantlery/getPieData?" +
            qs.stringify({ JsonParam: JSON.stringify(params) })
        )
        .then(function(res) {
          if (res.data.resultCode === "1") {
            let resultData = res.data.resultData;
            let gwPieArr = [],
              ywPieArr = [];
            for (let key in resultData) {
              if (key == "CJ_GWZD_NUM") {
                gwPieArr.push({
                  name: "固网主拆",
                  value: resultData[key]
                });
              }
              if (key == "CJ_GWQF_NUM") {
                gwPieArr.push({
                  name: "固网欠拆",
                  value: resultData[key]
                });
              }
              if (key == "CJ_YDZD_NUM") {
                ywPieArr.push({
                  name: "移动主拆",
                  value: resultData[key]
                });
              }
              if (key == "CJ_YDQF_NUM") {
                ywPieArr.push({
                  name: "移动欠拆",
                  value: resultData[key]
                });
              }
            }
            that.gwPieArr = gwPieArr;
            that.ywPieArr = ywPieArr;
            //固网
            that.drawPieChart("pie", gwPieArr);
          }
        })
        .catch(function(e) {});
    },
    drawPieChart(id, data) {
      let title = this.isActive == 0 ? "固网拆机占比" : "移动拆机占比";
      var thisChart = this.$echarts.init(document.getElementById(id));
      thisChart.clear();
      var option = {
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b}: {c} ({d}%)"
        },
        title: [
          {
            left: "center",
            text: title,
            textStyle: {
              fontSize: 21,
              color: "#24FAFF"
            }
          }
        ],
        series: [
          {
            name: "产品结构",
            type: "pie",
            radius: ["20%", "55%"],
            avoidLabelOverlap: false,
            color: ["#F868AF", "#01C6FD", "#1749F9"],
            label: {
              normal: {
                show: true,
                position: "outside",
                // formatter: "{b}: {d}%"
                formatter: function(params) {
                  return (
                    "{white|" + params.name + "}  {per|" + params.percent + "%}"
                  );
                },
                rich: {
                  white: {
                    color: "#fff",
                    align: "center",
                    fontSize: 14,
                    padding: [21, 0]
                  },
                  per: {
                    color: "#fff",
                    fontSize: 15,
                    align: "center"
                  }
                }
              },
              emphasis: {
                show: true
              }
            },
            labelLine: {
              normal: {
                show: true
              }
            },
            data: data
          }
        ]
      };
      thisChart.setOption(option);
      window.addEventListener("resize", () => {
        thisChart.resize();
      });
    },
    getTableData(params) {
      let that = this;
      this.$axios
        .get(
          "/Dismantlery/getTableData?" +
            qs.stringify({ JsonParam: JSON.stringify(params) })
        )
        .then(function(res) {
          //console.log("表", res);
          if (res.data.resultCode === "1") {
            let resultData = res.data.resultData;
            resultData.map((item, index) => {
              item.index = index;
              return item;
            });
            that.tableData = resultData;
          }
        })
        .catch(function(e) {});
    },
    cellStyle({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 0) {
        return "color: #6AFFFD";
      } else {
        return "";
      }
    },
    HrefToTable(organId){
      let dayId = "";
      if(this.isDay=='day'){
        dayId = moment(this.date).format("YYYYMMDD");
      }
      let url = 'http://10.26.20.254/pure/dss/workbench/CommakDetailO!toQuartersDetail.action?dayId='+dayId+'&organId='+organId;
      window.open(url,'_blank');
    }
  },
  mounted() {
    // this.drawLineChart("line", "#fbbf50");
    // this.drawPieChart("pie");
    // this.tableData.map(obj => {
    //   this.drawLineChart("tableLineChart" + obj.id, "#fbbf50");
    // });
    let that = this;
    this.getTopNum("day");
    this.getLineData("day");
    this.getPieData("day");
    const params = {
      type: "day",
      tableType: "people",
      dayId: that.sendParams.dayId
    };
    that.date = moment(that.sendParams.dayId,'YYYY-MM-DD')
    this.getTableData(params);
  }
};
</script>

<style scope lang="less">
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.rightBtn {
  justify-content: flex-end;
  display: flex;
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
  margin-left: 0px;
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
  font-size: 20px;
}
.mr20 {
  margin-right: 20px;
}
.table {
  margin-top: 20px;
  position: relative;
}
.btn-detail,
.btn-detail:hover,
.btn-detail:focus {
  background-image: linear-gradient(-225deg, #a834ef 0%, #2ac6ff 100%) !important;
  border: none !important;
  color: #fff !important;
}
</style>