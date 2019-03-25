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
        <el-date-picker v-model="date" type="date" placeholder="选择日期" style="background:#070d12;"></el-date-picker>
        <div class="rightBtn header">
          <div class="down mr20">下载</div>
          <ul class="header">
            <li class="down">人员</li>
            <li class="xq">小区</li>
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
        >
          <el-table-column prop="ORGAN_NAME" align="center" label="人员名称" width="200">
            <!-- <template slot-scope="scope">
              <el-popover placement="right" width="400" trigger="hover">
                <div :id="'tableLineChart'+scope.row.id" style="width:400px;height:200px"></div>
                <div slot="reference">{{scope.row.ORGAN_NAME}}</div>
              </el-popover>
            </template>-->
          </el-table-column>
          <el-table-column prop="name1" align="center" :label="resultTitle.name1" sortable></el-table-column>
          <el-table-column prop="name2" align="center" :label="resultTitle.name2" sortable></el-table-column>
          <el-table-column prop="name3" align="center" :label="resultTitle.name3" sortable></el-table-column>
          <el-table-column prop="name4" align="center" :label="resultTitle.name4" sortable></el-table-column>
          <el-table-column prop="name5" align="center" :label="resultTitle.name5" sortable></el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      isDay: "r",
      isActive: "GW",
      YW_NUM: 44,
      GW_NUM: 66,
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
      date: "",
      isTableLineShow: false,
      tableBg: require("@/assets/images/tabBg.png"),
      tableBgStyle: {
        background:
          "url(" +
          require("@/assets/images/tabBg.png") +
          ") left top no-repeat",
        backgroundSize: "100% 100%",
        height: "280px",
        overflowY:"scroll",
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
      tableData: [
        {
          ORGAN_ID: "JL27215",
          ORGAN_NAME: "姜莉",
          name1: "1",
          name2: "7",
          name3: "0",
          name4: "5",
          name5: "0"
        },
        {
          ORGAN_ID: "JL27216",
          ORGAN_NAME: "张雅静",
          name1: "1",
          name2: "5",
          name3: "0",
          name4: "5",
          name5: "0"
        },
        {
          ORGAN_ID: "JLBC0004",
          ORGAN_NAME: "北辰分公司青光共享池经理",
          name1: "0",
          name2: "1",
          name3: "0",
          name4: "0",
          name5: "0"
        },
        {
          ORGAN_ID: "YWJL00029",
          ORGAN_NAME: "朱彦峰",
          name1: "0",
          name2: "0",
          name3: "0",
          name4: "0",
          name5: "0"
        },
        {
          ORGAN_ID: "13b0l0q",
          ORGAN_NAME: "北辰区双青新家园小型营业厅",
          name1: "0",
          name2: "1",
          name3: "0",
          name4: "0",
          name5: "0"
        },
        {
          ORGAN_ID: "YWJL00031",
          ORGAN_NAME: "李学均",
          name1: "0",
          name2: "0",
          name3: "0",
          name4: "0",
          name5: "0"
        },
        {
          ORGAN_ID: "JLSC0143",
          ORGAN_NAME: "青光聚类市场",
          name1: "0",
          name2: "2",
          name3: "0",
          name4: "2",
          name5: "0"
        },
        {
          ORGAN_ID: "YWJL00028",
          ORGAN_NAME: "刘景松",
          name1: "0",
          name2: "0",
          name3: "0",
          name4: "0",
          name5: "0"
        },
        {
          ORGAN_ID: "YWJL09897",
          ORGAN_NAME: "李鹏",
          name1: "0",
          name2: "0",
          name3: "0",
          name4: "0",
          name5: "0"
        },
        {
          ORGAN_ID: "13a0174",
          ORGAN_NAME: "北辰区津霸公路青光标准营业厅",
          name1: "0",
          name2: "2",
          name3: "0",
          name4: "2",
          name5: "0"
        }
      ],
      resultTitle: {
        name: "人员",
        name1: "单宽",
        name2: "融合",
        name3: "尊享红",
        name4: "全家红",
        name5: "孝心红"
      }
    };
  },
  methods: {
    changeTab(type) {
      this.isActive = type;
    },
    changeIsDay(type) {
      this.getTopData(type);
    },
    //顶端移网固网数量
    getTopData(isDay) {
      const params = {
        dateType: isDay
      };
      this.$axios
        .post("/Developry/getData", params)
        .then(function(res) {
          if (res.data.resultCode === "1") {
            let that = this;
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
              text: text + "发展趋势",
              textStyle: {
                fontSize: 21,
                color: "#24FAFF"
              }
            }
          ],
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
            data: xAxis || this.xAxisData,
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
              data: yAxis || [
                0,
                65,
                100,
                165,
                200,
                210,
                220,
                240,
                300,
                310,
                320
              ]
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
            data: data || [
              { value: 50, name: "满堂红" },
              { value: 20, name: "尊享红" },
              { value: 40, name: "其他" }
            ]
          }
        ]
      };
      thisChart.setOption(option);
      window.addEventListener("resize", () => {
        thisChart.resize();
      });
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

    // this.tableData.map(obj => {
    //   this.drawLineChart("tableLineChart" + obj.id, "#fbbf50");
    // });
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