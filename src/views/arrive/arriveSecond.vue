<template>
  <div>
    <div class="header">
      <div class="tipDiv">
        <!-- <span class="tip" v-show="isDay===1">注：（日指标为当日月累）</span> -->
      </div>
      <div class="header wd56">
        <ul class="header">
          <li :class=" isActive === 0 ?activeClass:unActiveClass" @click="changeTab(0)">产品分类</li>
          <li :class=" isActive === 1 ?activeClass:unActiveClass" @click="changeTab(1)">保有率</li>
        </ul>
        <el-radio-group v-model="isDay">
          <el-radio :label="1">日</el-radio>
          <el-radio :label="0">月</el-radio>
        </el-radio-group>
        <el-date-picker v-model="date" type="date" placeholder="选择日期" style="background:#070d12;"></el-date-picker>
      </div>
    </div>
    <div class="chartList">
      <div id="line"></div>
      <div id="pie"></div>
    </div>
    <!-- table部分开始 -->
    <div>
      <div class="btnList header">
        <div></div>
        <div class="jk">小区监控</div>
        <div class="rightBtn header">
          <el-select v-model="value" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
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
      isActive: 0,
      isDay: 1,
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
      moreLineChart: {
        colors: ["#3E9EFD", "#43BF4E", "#C12337"],
        title: "新增用户保有率",
        data: [
          [100, 200, 300, 400, 500, 100, 200, 300, 400, 500, 100, 200],
          [500, 400, 300, 200, 100, 500, 400, 300, 200, 100, 500, 400],
          [200, 300, 100, 500, 100, 500, 400, 300, 100, 300, 400, 600]
        ],
        xAxis: [
          "1月",
          "2月",
          "3月",
          "4月",
          "5月",
          "6月",
          "7月",
          "8月",
          "9月",
          "10月",
          "11月",
          "12月"
        ],
        legendData: [{ name: "移动" }, { name: "固话" }, { name: "宽带" }]
      },
      activeClass: "down",
      unActiveClass: "xq",
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
      ],
      options: [
        {
          value: "选项1",
          label: "黄金糕"
        },
        {
          value: "选项2",
          label: "双皮奶"
        },
        {
          value: "选项3",
          label: "蚵仔煎"
        },
        {
          value: "选项4",
          label: "龙须面"
        },
        {
          value: "选项5",
          label: "北京烤鸭"
        }
      ],
      value: ""
    };
  },
  methods: {
    changeTab(index) {
      this.isActive = index;
      if (index === 0) {
        this.drawPieChart("line");
        this.drawPieChart("pie");
      } else {
        this.drawMoreLineChart("line", this.moreLineChart);
        this.drawMoreLineChart("pie", this.moreLineChart);
      }
    },
    drawLineChart(id, color) {
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
            radius: ["20%", "60%"],
            avoidLabelOverlap: false,
            color: ["#F868AF", "#01C6FD", "#1749F9"],
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
            data: [
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
    drawMoreLineChart(id, lineData) {
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
          legend: {
            data: lineData.legendData,
            top: "10%",
            right: "10%",
            textStyle: {
              color: "#fff"
            }
          },
          title: [
            {
              left: "center",
              text: lineData.title,
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
            data: lineData.xAxis,
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
              symbol: "none",
              color: lineData.colors[0],
              name: lineData.legendData[0].name,
              emphasis: {
                label: {
                  show: true
                }
              },
              data: lineData.data[0]
            },
            {
              type: "line",
              symbol: "none",
              color: lineData.colors[1],
              name: lineData.legendData[1].name,
              emphasis: {
                label: {
                  show: true
                }
              },
              data: lineData.data[1]
            },
            {
              type: "line",
              symbol: "none",
              color: lineData.colors[2],
              name: lineData.legendData[2].name,
              emphasis: {
                label: {
                  show: true
                }
              },
              data: lineData.data[2]
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
    this.drawPieChart("pie");
    this.drawPieChart("line");
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
.tipDiv {
  width: 192px;
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

.jk {
  font-size: 21px;
  color: #6afffd;
}
.wd56 {
  width: 56%;
}
</style>