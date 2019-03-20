<template>
  <div>
    <div class="formula_out formula_list">
      <h3 class="border"></h3>
      <h3 class="formula">计算公式</h3>
      <img src="~@/assets/images/wh-icon.png" alt class="wh">
      <div class="formula_list" style="margin-left: 20px;flex-wrap:wrap;">
        <img src="~@/assets/images/icon_l.png" alt class="icon_l">
        <div class="formula_list">
          <img src="~@/assets/images/icon_h_l.png" alt class="icon_h">
          <h3 class="jsdesc">收入完成</h3>
          <img src="~@/assets/images/icon_jh.png" alt class="icon_jh">
          <h3 class="jsdesc">成本完成</h3>
          <img src="~@/assets/images/icon_h_r.png" alt class="icon_h">
        </div>
        <img src="~@/assets/images/icon_jh.png" alt class="icon_jh">
        <div class="formula_list">
          <img src="~@/assets/images/icon_h_l.png" alt class="icon_h">
          <h3 class="jsdesc">收入序时预算</h3>
          <img src="~@/assets/images/icon_ch.png" alt class="icon_jh">
          <h3 class="xsdesc">系数</h3>
          <img src="~@/assets/images/icon_jh.png" alt class="icon_jh">
          <h3 class="jsdesc">成本序时预算</h3>
          <img src="~@/assets/images/icon_h_r.png" alt class="icon_h">
        </div>
        <img src="~@/assets/images/icon_r.png" alt class="icon_l">

         <img src="~@/assets/images/icon_ch.png" alt class="icon_jh">
          <h3 class="xsdesc">系数</h3>
      </div>
    </div>
    <!-- table部分开始 -->
    <div>
      <div class="btnList header">
        <el-date-picker v-model="date" type="date" placeholder="选择日期" style="background:#070d12;"></el-date-picker>
        <div class="rightBtn header">
          <div class="down">详情</div>
        </div>
      </div>
      <div class="table" :style="tableBgStyle">
        <el-table
          :data="tableData"
          style="width: 100%;"
          :cell-style="cellStyle"
          :header-cell-style="headerBgStyle"
          stripe
        >
          <el-table-column prop="date" align="center" label="日期" width="180"></el-table-column>
          <el-table-column align="center" label="姓名" width="180" sortable>
            <template slot-scope="scope">
              <el-popover placement="right" width="400" trigger="hover">
                <div :id="'tableLineChart'+scope.row.id" style="width:400px;height:200px"></div>
                <div slot="reference">{{scope.row.name}}</div>
              </el-popover>
            </template>
          </el-table-column>
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
    drawLineChart(id, color) {
      setTimeout(() => {
        var thisChart = this.$echarts.init(document.getElementById(id));
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
              text: "固网发展趋势",
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
            data: this.xAxisData,
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
            name: "完成值(万元)",
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
              data: [0, 65, 100, 165, 200, 210, 220, 240, 300, 310, 320]
            }
          ]
        });
        window.addEventListener("resize", () => {
          thisChart.resize();
        });
      }, 0);
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
    this.tableData.map(obj => {
      this.drawLineChart("tableLineChart" + obj.id, "#fbbf50");
    });
  }
};
</script>

<style lang="less" scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
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
.formula_list {
  display: flex;
  align-items: center;
  justify-content: flex-start;
}
.formula_out {
  border-bottom: 1px solid #5fb6f9;
  margin-bottom: 20px;
  padding-bottom: 20px;
}
.formula {
  font-family: "PingFangSC-Medium";
  font-size: 20px;
  color: #ffffff;
}
.border {
  width: 5px;
  height: 18px;
  background: linear-gradient(to bottom, #9bd9fc, #3096fc);
  margin-right: 10px;
}
.wh {
  margin-left: 10px;
  width: 28px;
}
.icon_l {
  width: 14px;
}
.icon_h {
  width: 12px;
}
.icon_jh {
  width: 30px;
  margin-left: 10px;
  margin-right: 10px;
}
.jsdesc {
  background: url("~@/assets/images/icon_bg_b.png") left top no-repeat;
  background-size: 100% 100%;
  width: 100px;
  height: 32px;
  line-height: 32px;
  text-align: center;
  font-size: 12px;
  color: #6afffd;
  padding: 0 10px;
}
.xsdesc {
  background: url("~@/assets/images/icon_bg_o.png") left top no-repeat;
  background-size: 100% 100%;
  width: 100px;
  height: 32px;
  line-height: 32px;
  text-align: center;
  font-size: 12px;
  font-size: 12px;
  color: #ffe104;
  padding: 0 10px;
}
</style>