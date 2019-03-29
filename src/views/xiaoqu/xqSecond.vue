<template>
  <div class="xqSed">
    <div class="chartDiv">
      <div id="xqSedLine" style="height:300px"></div>
    </div>
    <div class="chooseDiv">
      <el-radio-group v-model="tabVal" style="margin-right:15%">
        <el-radio-button label="-1">全部小区</el-radio-button>
        <el-radio-button label="sj">双降小区</el-radio-button>
        <el-radio-button label="ds">低渗小区</el-radio-button>
      </el-radio-group>
      <el-date-picker
        format="yyyy-MM"
        value-format="yyyyMM"
        v-model="date"
        type="month"
        placeholder="选择日期"
      ></el-date-picker>
    </div>
    <el-table
      :data="tabVal=='-1'?tableDataAll.tbodyData:tabVal=='sj'?tableDataSj.tbodyData:tableDataDs.tbodyData"
      style="width: 100%;"
      :header-cell-style="headerBgStyle"
      highlight-current-row
      stripe
      height="300"
    >
      <template
        v-for="(col,idx) in tabVal=='-1'?tableDataAll.tHeadData:tabVal=='sj'?tableDataSj.tHeadData:tableDataDs.tHeadData"
      ><!-- :render-header="labelFunction" -->
        <el-table-column
          :key="col.key"
          :prop="col.prop"
          :label="col.label"
          :sortable="col.prop.search(/FEE|NUM|COUNT/)===-1?false:true"
          
          align="center"
          v-if="idx==0"
        >
          <template slot-scope="scope">
            <div>
              <el-popover
                v-if="col.prop.search(/NAME/)!==-1&&tabVal!='-1'"
                placement="right"
                width="400"
                trigger="hover"
                @show="hoverShow(tabVal,'tableLineChart-sj'+scope.row.ORGAN_ID,scope.row.ORGAN_ID,tabVal=='sj'?'小区收入及用户变化趋势':'小区渗透率变化趋势')"
              >
                <div :id="'tableLineChart-sj'+scope.row.ORGAN_ID" style="width:400px;height:200px"></div>
                <div slot="reference">1{{scope.row[col.prop]}}</div>
              </el-popover>
              <div v-if="tabVal=='-1'" slot="reference">1{{scope.row[col.prop]}}</div>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          :key="col.key"
          :prop="col.prop"
          :label="col.label"
          :sortable="col.prop.search(/FEE|NUM|COUNT/)===-1?false:true"
          align="center"
          v-if="idx!==0"
        >
          <template slot-scope="scope">
            <div v-if="col.prop.search(/NAME/)===-1" slot="reference">2{{scope.row[col.prop]}}</div>
          </template>
        </el-table-column>
      </template>
    </el-table>
  </div>
</template>

<script>
import qs from "qs";
import { setTimeout } from "timers";

export default {
  props: ["sendParams"],
  data() {
    return {
      date: this.sendParams.date,
      tabVal: "-1",
      lineChart: {
        dataset: {
          legendData: [{ name: "双降" }, { name: "低渗" }],
          xAxis: [
            "12月",
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
          data: [
            [100, 200, 300, 400, 500, 100, 200, 300, 400, 500, 100, 200, 300],
            [500, 400, 300, 200, 100, 500, 400, 300, 200, 100, 500, 400, 300]
          ]
        },
        colors: ["#0097FF", "#F5515F"]
      },
      hoverData: {},
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
      tableDataAll: {
        tHeadData: [],
        tbodyData: []
      },
      tableDataSj: {
        tHeadData: [],
        tbodyData: []
      },
      tableDataDs: {
        tHeadData: [],
        tbodyData: []
      },
      chartId: ""
    };
  },
  methods: {
    post() {
      this.postLine();
      this.postTable();
    },
    postTable() {
      let _this = this;
      let params = {
        monthId: _this.date,
        type: _this.tabVal
      };
      this.$axios
        .get(
          "/community/getTableData?" +
            qs.stringify({ JsonParam: JSON.stringify(params) })
        )
        .then(function(res) {
          let data = res.data;
          const head = {
            MANAGER_NAME: "经理名称",
            USERED_TYPE: "小区类型",
            ORGAN_ID: "小区编码",
            KD_FEE_M: "宽带收入",
            KD_DD_NUM: "本网宽带数",
            ORGAN_NAME: "小区名称",
            HOME_COUNT: "小区住宅用户数"
          };
          let tHeadData = [];
          for (const key in head) {
            if (head.hasOwnProperty(key)) {
              tHeadData.push({
                label: head[key],
                prop: key
              });
            }
          }
          switch (_this.tabVal) {
            case "-1":
              _this.tableDataAll = {
                tHeadData: tHeadData,
                tbodyData: data.resultData
              };
              break;
            case "sj":
              _this.tableDataSj = {
                tHeadData: tHeadData,
                tbodyData: data.resultData
              };
              break;
            case "ds":
              _this.tableDataDs = {
                tHeadData: tHeadData,
                tbodyData: data.resultData
              };
              break;
          }
        })
        .catch(function(e) {
        });
    },
    drawLineChart(id) {
      let thisChart = this.$echarts.init(document.getElementById(id));
      thisChart.setOption({
        color: this.lineChart.colors,
        legend: {
          data: this.lineChart.dataset.legendData,
          x: "right",
          textStyle: {
            color: "#fff"
          }
        },
        grid: {
          containLabel: true,
          top: "15%",
          bottom: "10%",
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
            color: "#24FAFF"
          },
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
          data: this.lineChart.dataset.xAxis
        },
        yAxis: {
          type: "value",
          nameTextStyle: {
            color: "#24FAFF"
          },
          axisLabel: {
            color: "#24FAFF"
          },
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
          }
        },
        series: [
          {
            name: "双降",
            type: "line",
            data: this.lineChart.dataset.data[0]
          },
          {
            name: "低渗",
            type: "line",
            data: this.lineChart.dataset.data[1]
          }
        ]
      });
      window.addEventListener("resize", () => {
        thisChart.resize();
      });
    },
    drawsjChart(id, title, dataset) {
      let thisChart = this.$echarts.init(document.getElementById(id));
      thisChart.setOption({
        color: ["#0097FF", "#F868AF"],
        title: {
          left: "center",
          text: title,
          textStyle: {
            color: "#6AFFFD"
          }
        },
        grid: {
          containLabel: true,
          top: "20%",
          bottom: "5%",
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
            color: "#24FAFF"
          },
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
          data: dataset.xAxis
        },
        yAxis: [
          {
            type: "value",
            nameTextStyle: {
              color: "#24FAFF"
            },
            axisLabel: {
              color: "#24FAFF"
            },
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
            }
          },
          {
            type: "value",
            nameTextStyle: {
              color: "#24FAFF"
            },
            axisLabel: {
              color: "#24FAFF"
            },
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
            }
          }
        ],
        series: [
          {
            type: "line",
            yAxisIndex: 1,
            data: dataset.data[0]
          },
          {
            type: "bar",
            barWidth: 10,
            data: dataset.data[1]
          }
        ]
      });
      window.addEventListener("resize", () => {
        thisChart.resize();
      });
    },
    drawdsChart(id, title, dataset) {
      var thisChart = this.$echarts.init(document.getElementById(id));
      thisChart.setOption({
        color: ["#0097FF", "#F868AF"],
        title: {
          left: "center",
          text: title,
          textStyle: {
            color: "#24FAFF"
          }
        },
        grid: {
          containLabel: true,
          top: "20%",
          bottom: "5%",
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
            color: "#24FAFF"
          },
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
          data: dataset.xAxis
        },
        yAxis: {
          type: "value",
          nameTextStyle: {
            color: "#24FAFF"
          },
          axisLabel: {
            color: "#24FAFF"
          },
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
          }
        },
        series: [
          {
            type: "line",
            data: dataset.data[0]
          }
        ]
      });
      window.addEventListener("resize", () => {
        thisChart.resize();
      });
    },
    hoverShow(type, id, organId, title) {
      this.chartId = id;
      let url =
        this.tabVal == "sj"
          ? "/community/getBarAndLineData"
          : "/community/getSTLLineData";
      let _this = this;
      let params = {
        monthId: this.date,
        organId: organId
      };
      this.$axios
        .get(url + "?" + qs.stringify({ JsonParam: JSON.stringify(params) }))
        .then(function(res) {
          let data = res.data;
          _this.hoverData = {
            xAxis: data.resultData.map(v => v.ACCT_MONTH),
            data: [
              data.resultData.map(v => v.STL),
              data.resultData.map(v => v.KD_FEE_M || 0)
            ]
          };
          switch (type) {
            case "sj":
              _this.drawsjChart(id, title, _this.hoverData);
              break;
            case "ds":
              _this.drawdsChart(id, title, _this.hoverData);
              break;
          }
        })
        .catch(function(e) {
          let data =
            type == "ds"
              ? {
                  loginId: "sijy2",
                  resultData: [
                    {
                      ACCT_MONTH: "201902",
                      STL: 2.95
                    }
                  ],
                  loginName: "司骏毅",
                  resultCode: "1",
                  resultDesc: "success"
                }
              : {
                  loginId: "sijy2",
                  resultData: [
                    {
                      ACCT_MONTH: "201902",
                      KD_FEE_M: 8882.07, //--柱状图
                      STL: 54.04 //---折线图
                    }
                  ],
                  loginName: "司骏毅",
                  resultCode: "1",
                  resultDesc: "success"
                };
          _this.hoverData = {
            xAxis: data.resultData.map(v => v.ACCT_MONTH),
            data: [
              data.resultData.map(v => v.STL),
              data.resultData.map(v => v.KD_FEE_M || 0)
            ]
          };
          switch (type) {
            case "sj":
              _this.drawsjChart(id, title, _this.hoverData);
              break;
            case "ds":
              _this.drawdsChart(id, title, _this.hoverData);
              break;
          }
        });
    },
    postLine() {
      let _this = this;
      let params = {};
      this.$axios
        .get(
          "/community/getLineData?" +
            qs.stringify({ JsonParam: JSON.stringify(params) })
        )
        .then(function(res) {
          let data = res.data;
          _this.lineChart.dataset.xAxis = data.resultData.map(
            v => v.ACCT_MONTH
          );
          _this.lineChart.dataset.data = [
            data.resultData.map(v => v.SJ_XQ_NUM),
            data.resultData.map(v => v.DS_XQ_NUM)
          ];
        })
        .catch(function(e) {
          let data = {
            loginId: "sijy2",
            resultData: [
              {
                ACCT_MONTH: "201902",
                SJ_XQ_NUM: 11, //---双降
                DS_XQ_NUM: 4 //---低渗
              }
            ],
            loginName: "司骏毅",
            resultCode: "1",
            resultDesc: "success"
          };
        });
    },
    labelFunction(h, l, fontSize) {
      let f = 16.5;
      if (typeof fontSize != "undefined" && fontSize != null) {
        f = fontSize;
      }
      //列头的实际宽度
      let width = l.column.realWidth;
      //14：字体大小 32 是el表格的左右 padding 的合
      let maxFontCount = Math.floor((width - 32) / f) - 1;
      let chars = l.column.label.split("");
      var label = "";
      if (maxFontCount < chars.length) {
        for (let i = 0; i < maxFontCount; i++) {
          label += chars[i];
        }
        label += "..";
      } else {
        label = l.column.label;
      }
      return label;
    }
  },
  mounted() {
    // this.drawLineChart("xqSedLine");
    this.post();
  },
  watch: {
    tabVal(newValue, oldValue) {
      this.postTable();
    },
    date(newValue, oldValue) {
      this.postTable();
    },
    lineChart: {
      handler(newValue, oldValue) {
        this.drawLineChart("xqSedLine");
      },
      immediate: false,
      deep: true
    }
  }
};
</script>

<style scoped lang="less">
.xqSed {
  .chartDiv {
    height: 300px;
  }
  .chooseDiv {
    text-align: right;
    margin-bottom:10px;
  }
}
</style>