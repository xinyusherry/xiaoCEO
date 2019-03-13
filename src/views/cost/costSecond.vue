<template>
  <div>
    <div class="header">
      <div class="tipDiv">
        <!-- <span class="tip" v-show="isDay===1">注：（日指标为当日月累）</span> -->
      </div>
      <ul class="tabs header">
        <li :class="{active:isActive === 0}" @click="changeTab(0)">全部</li>
        <li :class="{active:isActive === 1}" @click="changeTab(1)">市场</li>
        <li :class="{active:isActive === 2}" @click="changeTab(2)">网运</li>
        <li :class="{active:isActive === 3}" @click="changeTab(3)">综合</li>
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
        <el-date-picker v-model="date" type="date" placeholder="选择日期" style="background:#070d12;"></el-date-picker>
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
          <el-table-column prop="date" align="center" label="日期" width="180"></el-table-column>
          <el-table-column align="center" prop="name" label="姓名" width="180" sortable></el-table-column>
          <el-table-column prop="address" align="center" label="地址" sortable></el-table-column>
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
      isDay: 1,
      isActive: 0,
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
        height: "297px",
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
          date: "2016-05-02",
          id: "1",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-04",
          id: "2",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄"
        },
        {
          date: "2016-05-01",
          id: "3",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄"
        },
        {
          date: "2016-05-03",
          id: "4",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄"
        },
        {
          date: "2016-05-07",
          id: "5",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1515 弄"
        }
      ]
    };
  },
  methods: {
    changeTab(index) {
      this.isActive = index;
    },
    handleChange(value) {
      let that = this;
      if (value == 1) {
        that.drawLineChart1("line", "#F868AF");
      } else {
        that.drawLineChart2("line", "#F868AF");
      }
    },
    drawLineChart1(id, color) {
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
            data: [
              "喀什市",
              "疏附县",
              "疏勒县",
              "英吉沙县",
              "泽普县",
              "岳普湖县",
              "巴楚县",
              "伽师县",
              "叶城县",
              "莎车县 "
            ],
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
            axisLabel: {
              formatter: "{value}"
            },
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
            name: "完成值(万元)",
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
            data: [20, 50, 80, 58, 83, 68, 57, 80, 42, 66],
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
    drawLineChart2(id, color) {
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
            data: [
              "喀什市",
              "疏附县",
              "疏勒县",
              "英吉沙县",
              "泽普县",
              "岳普湖县",
              "巴楚县",
              "伽师县",
              "叶城县",
              "莎车县 "
            ],
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
            axisLabel: {
              formatter: "{value}"
            },
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
            name: "完成值(万元)",
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
            data: [20, 50, 80, 58, 83, 68, 57, 80, 42, 66],
            barWidth: 10, //柱子宽度
            barGap: 1, //柱子之间间距
            color: "#F868AF",
            itemStyle: {
              normal: {
                barBorderRadius: [10, 10, 0, 0]
              }
            }
          },
          {
            name: "累计完成率",
            type: "line",
            data: [50, 70, 60, 61, 75, 87, 60, 62, 86, 46],
            color: "#F76B1C",
            yAxisIndex: 1
          }
        ]
      };
      thisChart.setOption(option);
      window.addEventListener("resize", () => {
        thisChart.resize();
      });
    },
    drawDubBarChart(id) {
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
            data: [
              "喀什市",
              "疏附县",
              "疏勒县",
              "英吉沙县",
              "泽普县",
              "岳普湖县",
              "巴楚县",
              "伽师县",
              "叶城县",
              "莎车县 "
            ],
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
            axisLabel: {
              formatter: "{value}"
            },
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
            name: "完成值(万元)",
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
            data: [20, 50, 80, 58, 83, 68, 57, 80, 42, 66],
            barWidth: 10, //柱子宽度
            barGap: 1, //柱子之间间距
            color: "#F868AF"
          },
          {
            name: "2019",
            type: "bar",
            data: [50, 70, 60, 61, 75, 87, 60, 62, 86, 46],
            barWidth: 10,
            barGap: 1,
            color: "#3AA3F3"
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
    this.drawLineChart1("line", "#F868AF");
    this.drawDubBarChart("pie");
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