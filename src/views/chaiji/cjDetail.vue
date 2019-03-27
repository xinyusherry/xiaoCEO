<template>
  <div>
    <div class="header">
      <div class="tipDiv">
        <!-- <span class="tip" v-show="isDay===1">注：（日指标为当日月累）</span> -->
      </div>
      <ul class="tabs header">
        <li :class="{active:isActive === 0}" @click="changeTab(0)">固话拆机 44</li>
        <li :class="{active:isActive === 1}" @click="changeTab(1)">移动拆机 66</li>
      </ul>
      <el-radio-group v-model="isDay">
        <el-radio :label="1">日</el-radio>
        <el-radio :label="0">月</el-radio>
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
            type="date"
            placeholder="选择日期"
            style="background:#070d12;margin-right:20px"
          ></el-date-picker>
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
          <el-table-column prop="date" align="center" label="日期" width="180"></el-table-column>
          <el-table-column align="center" label="姓名" width="180" sortable>
            <template slot-scope="scope">
              <el-popover placement="right" width="400" trigger="hover">
                <div :id="'tableLineChart'+scope.row.id" style="width:400px;height:200px"></div>
                <div slot="reference">{{scope.row.name}}</div>
              </el-popover>
            </template>
          </el-table-column>
          <el-table-column prop="address" label="地址" align="center" sortable></el-table-column>
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
      img: require("@/assets/images/sj.png"),
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
    drawPieChart(id) {
      var thisChart = this.$echarts.init(document.getElementById(id));
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
            radius: ["20%", "60%"],
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
            data: [
              { value: 40, name: "满堂红" },
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
    this.drawLineChart("line", "#fbbf50");
    this.drawPieChart("pie");
    this.tableData.map(obj => {
      this.drawLineChart("tableLineChart" + obj.id, "#fbbf50");
    });
  }
};
</script>

<style lang="less">
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
</style>