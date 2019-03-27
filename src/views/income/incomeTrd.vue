<template>
  <div>
    <div class="chooseDiv">
      <div style="display:flex;align-items: center;">
        <img
          :src="require(`../../assets/images/icon_goback.png`)"
          alt
          class="icon_goback"
          @click="closeThis()"
        >
        <el-date-picker
          v-model="date"
          format="yyyy-MM"
          value-format="yyyyMM"
          type="month"
          placeholder="选择日期"
          style="margin-left:20px"
        ></el-date-picker>
      </div>
      <div>
        <el-radio-group v-model="tabVal">
          <el-radio-button label="person">人员</el-radio-button>
          <el-radio-button label="xq">小区</el-radio-button>
        </el-radio-group>
        <el-button type="primary" style="margin-left:20px">下载</el-button>
      </div>
    </div>
    <div v-show="tabVal=='person'" class="table" :style="tableBgStyle">
      <el-table
        :data="tablePerson.tbodyData"
        style="width: 100%;"
        :header-cell-style="headerBgStyle"
        highlight-current-row
        stripe
        height="300"
      >
        <template v-for="col in tablePerson.tHeadData">
          <el-table-column
            :key="col.key"
            :prop="col.prop"
            :label="col.label"
            :sortable="col.prop.search(/FEE/)===-1?false:true"
            align="center"
          >
            <template slot-scope="scope">
              <div>
                <el-popover
                  v-if="col.prop.search(/NAME/)!==-1"
                  placement="right"
                  width="400"
                  trigger="hover"
                  @show="hoverShow('tableLineChart-sj',scope.row.ORGAN_ID)"
                >
                  <div :id="'tableLineChart-sj'+scope.row.ORGAN_ID" style="width:100%;height:200px"></div>
                  <div slot="reference">{{scope.row[col.prop]}}</div>
                </el-popover>
                <div v-if="col.prop.search(/NAME/)===-1" slot="reference">{{scope.row[col.prop]}}</div>
              </div>
            </template>
          </el-table-column>
        </template>
      </el-table>
    </div>
    <div v-show="tabVal=='xq'" class="table" :style="tableBgStyle">
      <el-table
        :data="tableArea.tbodyData"
        style="width: 100%;"
        :header-cell-style="headerBgStyle"
        highlight-current-row
        stripe
        height="300"
      >
        <template v-for="col in tableArea.tHeadData">
          <el-table-column
            :key="col.key"
            :prop="col.prop"
            :label="col.label"
            :sortable="col.prop.search(/FEE/)===-1?false:true"
            align="center"
          ></el-table-column>
        </template>
      </el-table>
    </div>
  </div>
</template>

<script>
import qs from "qs";
export default {
  props: ["monthId"],
  data() {
    return {
      date: this.monthId,
      tabVal: "person",
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
      tableArea: {
        tHeadData: [],
        tbodyData: []
      },
      tablePerson: {
        tHeadData: [],
        tbodyData: []
      }
    };
  },
  methods: {
    postPersonTable() {
      let _this = this;
      let params = {
        monthId: this.date
      };
      this.$axios
        .get(
          "/Workbench/getIncomeUserDetail?" +
            qs.stringify({ JsonParam: JSON.stringify(params) })
        )
        .then(function(res) {
          console.log(res);
          let data = res.data;
          const head = {
            ORGAN_NAME: "经理名称",
            // HR_EMP_CODE: "人力编码",
            BY_FEE: "本月收入",
            YD_FEE: "移动收入",
            KD_FEE: "宽带收入",
            RH_FEE: "融合收入",
            GH_FEE: "固话收入"
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
          _this.tablePerson = {
            tHeadData: tHeadData,
            tbodyData: data.resultData
          };
        })
        .catch(function(e) {
          let data = {
            loginId: "admin",
            resultData: [
              {
                GH_FEE: 19221.95, //固话收入
                ORGAN_ID: "Y1040025",
                HR_EMP_CODE: "0236399", //人力编码
                KD_FEE: 47475.94, //宽带收入
                YD_FEE: 31663.82, //移动收入
                BY_FEE: 734622.89, //本月收入
                RH_FEE: 636261.18, //融合收入
                ORGAN_NAME: "刘嘉" //经理名称
              },
              {
                GH_FEE: 14541.46,
                ORGAN_ID: "Y1040024",
                HR_EMP_CODE: "0236535",
                KD_FEE: 42572.01,
                YD_FEE: 22141.34,
                BY_FEE: 609300.72,
                RH_FEE: 530045.91,
                ORGAN_NAME: "荣健媄"
              }
            ],
            loginName: "管理员",
            resultCode: "1",
            resultDesc: "success"
          };
          const head = {
            ORGAN_NAME: "经理名称",
            // HR_EMP_CODE: "人力编码",
            BY_FEE: "本月收入",
            YD_FEE: "移动收入",
            KD_FEE: "宽带收入",
            RH_FEE: "融合收入",
            GH_FEE: "固话收入"
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
          _this.tablePerson = {
            tHeadData: tHeadData,
            tbodyData: data.resultData
          };
        });
    },
    postXqTable() {
      let _this = this;
      let params = {
        monthId: this.date
      };
      this.$axios
        .get(
          "/Workbench/getIncomeCellDetail?" +
            qs.stringify({ JsonParam: JSON.stringify(params) })
        )
        .then(function(res) {
          console.log(res);
          let data = res.data;
          const head = {
            ORGAN_NAME: "经理名称",
            // HR_EMP_CODE: "人力编码",
            BY_FEE: "本月收入",
            YD_FEE: "移动收入",
            KD_FEE: "宽带收入",
            RH_FEE: "融合收入",
            GH_FEE: "固话收入"
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
          _this.tableArea = {
            tHeadData: tHeadData,
            tbodyData: data.resultData
          };
        })
        .catch(function(e) {
          let data = {
            loginId: "admin",
            resultData: [
              {
                GH_FEE: 12996.47,
                ORGAN_ID: "10000438",
                KD_FEE: 19490.56,
                YD_FEE: -29.52,
                BY_FEE: 138399.16,
                RH_FEE: 105941.66,
                ORGAN_NAME: "南大西南村"
              },
              {
                GH_FEE: 2707.34,
                ORGAN_ID: "10032616",
                KD_FEE: 3984.11,
                YD_FEE: 248.27,
                BY_FEE: 86304.83,
                RH_FEE: 79365.11,
                ORGAN_NAME: "林苑北里"
              },
              {
                GH_FEE: 4162.65,
                ORGAN_ID: "10032582",
                KD_FEE: 7045,
                YD_FEE: 390.56,
                BY_FEE: 84457.53,
                RH_FEE: 72859.32,
                ORGAN_NAME: "观园里"
              }
            ],
            loginName: "管理员",
            resultCode: "1",
            resultDesc: "success"
          };
          const head = {
            ORGAN_NAME: "小区名称",
            // ORGAN_ID: "小区ID",
            BY_FEE: "小区收入",
            YD_FEE: "移动收入",
            KD_FEE: "宽带收入",
            RH_FEE: "融合收入"
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
          _this.tableArea = {
            tHeadData: tHeadData,
            tbodyData: data.resultData
          };
        });
    },
    drawLineChart(id, dataset) {
      var thisChart = this.$echarts.init(document.getElementById(id));
      thisChart.setOption({
        color: ["#0097FF", "#F868AF"],
        grid: {
          containLabel: true,
          top: "10%",
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
            data: dataset.data
          }
        ]
      });
      window.addEventListener("resize", () => {
        thisChart.resize();
      });
    },
    hoverShow(chartId, id) {
      let _this = this;
      let params = {
        monthId: this.date,
        organId: id
      };
      this.$axios
        .get(
          "/Workbench/getIncomeCellLine?" +
            qs.stringify({ JsonParam: JSON.stringify(params) })
        )
        .then(function(res) {
          console.log(res);
          let data = res.data;
          _this.hoverData = {
            xAxis: data.resultData.map(v => v.ACCT_MONTH),
            data: data.resultData.map(v => v.BY_FEE)
          };
          _this.drawLineChart(chartId + id, _this.hoverData);
        })
        .catch(function(e) {
          let data = {
            loginId: "admin",
            resultData: [
              {
                ACCT_MONTH: "201901",
                BY_FEE: 613670.74
              },
              {
                ACCT_MONTH: "201902",
                BY_FEE: 609300.72
              },
              {
                ACCT_MONTH: "201903",
                BY_FEE: 0
              }
            ],
            loginName: "管理员",
            resultCode: "1",
            resultDesc: "success"
          };
          _this.hoverData = {
            xAxis: data.resultData.map(v => v.ACCT_MONTH),
            data: data.resultData.map(v => v.BY_FEE)
          };
          _this.drawLineChart(chartId + id, _this.hoverData);
        });
    },
    closeThis() {
      this.$emit("callback", false);
    }
  },
  mounted() {},
  created() {
    this.postPersonTable();
    this.postXqTable();
  },
  watch: {
    date(val) {
      if (this.tabVal == "person") this.postPersonTable();
      else this.postXqTable();
    },
    hoverData: {
      handler(n, o) {
        this.drawLineChart(chartId + id, this.hoverData);
      },
      immediate: false,
      deep: true
    }
  }
};
</script>

<style scoped lang="less">
.chooseDiv {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.cell {
  text-align: center;
}
</style>