<template>
  <div>
    <div class="header">
      <div class="tipDiv">
        <span class="tip" v-show="isDay==='r'">注：（日指标为当日月累）</span>
      </div>
      <ul class="tabs header">
        <li :class="{active:isActive === 'GW'}" @click="changeTab('GW')">固网 {{GW_NUM}}</li>
        <li :class="{active:isActive === 'YW'}" @click="changeTab('YW')">移网 {{YW_NUM}}</li>
      </ul>
      <el-radio-group v-model="isDay" @change="changeIsDay">
        <el-radio :label="'r'">日</el-radio>
        <el-radio :label="'y'">月</el-radio>
      </el-radio-group>
    </div>
    <div class="chartList">
      <div id="line"></div>
      <div id="pie"></div>
    </div>
    <!-- table部分开始 -->
    <div>
      <div class="btnList header">
        <el-date-picker
          v-model="dateD"
          type="date"
          v-show="isDay==='r'"
          placeholder="选择日期"
          style="background:#070d12;"
          @change="dateChange"
        ></el-date-picker>
        <el-date-picker
          v-model="dateM"
          type="month"
          v-show="isDay!=='r'"
          placeholder="选择日期"
          style="background:#070d12;"
          @change="dateChange"
        ></el-date-picker>
        <div class="rightBtn header">
          <div class="down mr20" @click="TableToExcel">下载</div>
          <ul class="header">
            <li
              :class=" tableType === 'ry' ?activeClass:unActiveClass"
              @click="changeTableType('ry')"
            >人员</li>
            <li
              :class=" tableType === 'xq' ?activeClass:unActiveClass"
              @click="changeTableType('xq')"
            >小区</li>
          </ul>
        </div>
      </div>
      <div class="table" :style="tableBgStyle">
        <el-table
        v-if="resultTitle!=null"
          :data="tableData"
          style="width: 100%;"
          :cell-style="cellStyle"
          :header-cell-style="headerBgStyle"
          highlight-current-row
          stripe
           height= "280"
        >
          <el-table-column prop="ORGAN_NAME" align="center" :label="resultTitle.name" width="200">
            <template slot-scope="scope">
              <el-popover placement="right" width="400" trigger="hover" @show="hoverChart(scope.row.ORGAN_ID,'tableLineChart-dev'+scope.row.index)">
                <div :id="'tableLineChart-dev'+scope.row.index" style="height:200px"></div>
                <div slot="reference">{{scope.row.ORGAN_NAME}}</div>
              </el-popover>
            </template>
          </el-table-column>
          <el-table-column prop="name1" align="center" :label="resultTitle['name1']" sortable></el-table-column>
          <el-table-column prop="name2" align="center" :label="resultTitle['name2']" sortable></el-table-column>
          <el-table-column prop="name3" align="center" :label="resultTitle['name3']" sortable></el-table-column>
          <el-table-column prop="name4" align="center" :label="resultTitle['name4']" sortable></el-table-column>
          <el-table-column prop="name5" align="center" :label="resultTitle['name5']" sortable></el-table-column>
          <el-table-column
            label="操作"
            align="center"
            v-if="tableType !== 'ry'"
            width="100">
            <template slot-scope="scope">
              <el-button @click="toQuartersDetail(scope.row)" type="text" size="small">一区一表</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";
import qs from "qs";
export default {
  components: {},
  props: ["sendParams"],
  data() {
    return {
      isDay: "r",
      isActive: "GW",
      tableType: "ry",
      date: "",
      dateD: this.sendParams.dateD,
      dateM: this.sendParams.dateM,
      activeClass: "down",
      unActiveClass: "xq",
      YW_NUM: "",
      GW_NUM: "",
      xAxisData: [],
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
      tableData: [],
      resultTitle: null
    };
  },
  watch:{
    isDay:{
      handler(newVal) {
    　　this.date = newVal==='r'? this.dateD : this.dateM;
  　　},
  　　immediate: true
    }
  },
  methods: {
    toQuartersDetail(row){
      let that = this;
      let organId = row.ORGAN_ID;
      let dayId = moment(that.date).format("YYYYMMDD")
      let url = 'http://10.26.20.254/pure/dss/workbench/CommakDetailO!toQuartersDetail.action?dayId='+dayId+'&organId='+organId;
      window.open(url,'_blank');
    },
    changeTab(type) {
      this.isActive = type;
      let that = this;
      this.getLineCharData(this.isActive, this.isDay);
      this.getPieData(this.isActive, this.isDay);
      this.getTableData(that.isActive, that.isDay, that.tableType, that.isDay);
    },
    changeTableType(val) {
      let that = this;
      this.tableType = val;
      this.getTableData(that.isActive, that.isDay, that.tableType, that.isDay);
    },
    changeIsDay(type) {
      let that = this;
      if (type === "r") {
        that.dateType = "date";
      } else {
        that.dateType = "month";
      }
      this.getTopData(type);
      this.getLineCharData(this.isActive, this.isDay);
      this.getPieData(this.isActive, this.isDay);
      this.getTableData(that.isActive, that.isDay, that.tableType, that.isDay);
    },
    dateChange(value) {
       let that = this;
       this.getTableData(that.isActive, that.isDay, that.tableType, that.isDay);
    },
    //顶端移网固网数量
    getTopData(isDay) {
      const params = {
        dateType: isDay
      };
      let that = this;
      this.$axios
        .post("/Developry/getData", params)
        .then(function(res) {
          if (res.data.resultCode === "1") {
            let resultData = res.data.resultData;
            for (let i = 0, len = resultData.length; i < len; i++) {
              switch (resultData[i].SVC_TYPE) {
                case "YW":
                  that.YW_NUM = resultData[i].NUM;
                  break;
                case "GW":
                  that.GW_NUM = resultData[i].NUM;
                  break;
                default:
                  break;
              }
            }
          }
        })
        .catch(function(e) {});
    },
    getLineCharData(developType, dateType) {
      let that = this;
      const params = {
        developType: developType,
        dateType: dateType
      };
      this.$axios
        .post("/Developry/getLineCharData", params)
        .then(function(res) {
          if (res.data.resultCode === "1") {
            let resultData = res.data.resultData;
            let xAxis = [];
            let yAxis = [];
            for (let i = 0, len = resultData.length; i < len; i++) {
              xAxis.push(resultData[i].TIME);
              yAxis.push(resultData[i].NUM);
            }
            that.drawLineChart("line", "#fbbf50", xAxis, yAxis);
          }
        })
        .catch(function(e) {});
      // that.drawLineChart("line", "#fbbf50");
    },
    drawLineChart(id, color, xAxis, yAxis) {
      let text = this.isActive === "GW" ? "固网" : "移网";
      setTimeout(() => {
        let thisChart = this.$echarts.init(document.getElementById(id));
        thisChart.clear();
        thisChart.setOption({
          grid: {
            containLabel: true,
            width: "79%",
            height: "70%",
            top: "18%"
          },
          title:{
              left: "center",
              text: text + "发展趋势",
              textStyle: {
                fontSize: 21,
                color: "#24FAFF"
              }
          },
          tooltip: {
            trigger: "axis",
            axisPointer: {
              // type: "cross",
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
            name: "发展量",
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
              data: yAxis
            }
          ]
        });
        window.addEventListener("resize", () => {
          thisChart.resize();
        });
      }, 0);
    },
    getPieData(developType, dateType) {
      let that = this;
      const params = {
        developType: developType,
        dateType: dateType
      };
      this.$axios
        .post("/Developry/getPieData", params)
        .then(function(res) {
          if (res.data.resultCode === "1") {
            let resultData = res.data.resultData;
            let data = [];
            for (let i = 0, len = resultData.length; i < len; i++) {
              if (resultData[i].NUM != 0) {
                let obj = new Object();
                obj.name = resultData[i].PRODUCT_TYPE;
                obj.value = resultData[i].NUM;
                data.push(obj);
              }
            }
            that.drawPieChart("pie", data);
          }
        })
        .catch(function(e) {});
      // this.drawPieChart("pie");
    },
    drawPieChart(id, data) {
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
            text: "产品结构",
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
            radius: ["20%", "50%"],
            avoidLabelOverlap: true,
            color: [
              "#F868AF",
              "#01C6FD",
              "#1749F9",
              "#E5621C",
              "#D70B20",
              "#19C072",
              "#F75C19"
            ],
            label: {
              normal: {
                show: true,
                position: "outside",
                // formatter: "{b}: {d}%",
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
    getTableData(developType, dateType, tableType, dayFlag) {
      let that = this;
      let merge = {};
      if (dayFlag === "r") {
        merge = {
          dayId: moment(that.date).format("YYYYMMDD")
        };
      } else {
        merge = {
          monthId: moment(that.date).format("YYYYMM")
        };
      }
      const param = {
        developType: developType,
        dateType: dateType,
        tableType: tableType
      };
      const params = {
        ...merge,
        ...param
      };
      this.$axios
        .post("/Developry/getTableData", params)
        .then(function(res) {
          //console.log("表格",params,res);
          if (res.data.resultCode === "1") {
            let resultData = res.data.resultData;
            resultData.map((item, index) => {
              item.index = index;
              const obj = {
                developType: developType,
                dateType: dateType,
                organId: item.ORGAN_ID,
                ...merge
              };
              return item;
            });
            that.tableData = resultData;
            that.resultTitle = res.data.resultTitle;
          }
        })
        .catch(function(e) {});
    },
    hoverChart(id,divId){
      let that = this;
      let params={
        developType: that.isActive,
        dateType: that.isDay,
        organId: id,
        monthId: moment(that.dateM).format("YYYYMM"),
        dayId: moment(that.dateD).format("YYYYMMDD"),
      }
      this.$axios
        .get(
          "/Developry/getRYpieData?" +
            qs.stringify({ JsonParam: JSON.stringify(params) })
        )
        .then(function(res) {
          if (res.data.resultCode === "1") {
            let resultData = res.data.resultData;
            let xAxis = [];
            let yAxis = [];
            for (let i = 0, len = resultData.length; i < len; i++) {
              xAxis.push(resultData[i].TIME);
              yAxis.push(resultData[i].NUM);
            }
            that.drawLineChart(
              divId,
              "#fbbf50",
              xAxis,
              yAxis
            );
          }
        })
        .catch(function(e) {});
    },
    TableToExcel(){
      let that = this;
      let merge = {};
      if (that.isDay === "r") {
        merge = {
          dayId: moment(that.date).format("YYYYMMDD")
        };
      } else {
        merge = {
          monthId: moment(that.date).format("YYYYMM")
        };
      }
      const param = {
        developType: that.isActive,
        dateType: that.isDay,
        tableType: that.tableType
      };
      const params = {
        ...merge,
        ...param
      };
      window.open("http://10.26.20.254:8203/microservice-ui/" + "/Developry/TableToExcel?" +qs.stringify({ JsonParam: JSON.stringify(params) }));
    },
    cellStyle({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 0) {
        return "color: #6AFFFD";
      } else {
        return "";
      }
    }
  },
  mounted() {
    let that = this;
    this.getTopData(that.isDay);
    this.getLineCharData(that.isActive, that.isDay);
    this.getPieData(that.isActive, that.isDay);
    this.getTableData(that.isActive, that.isDay, that.tableType, that.isDay);
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


</style>