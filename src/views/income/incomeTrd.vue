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
        <el-button type="primary" @click="TableToExcel" style="margin-left:20px">下载</el-button>
      </div>
    </div>
    <div class="table" :style="tableBgStyle" v-show="tabVal=='xq'">
      <el-table
        :data="tableArea.tbodyData"
        style="width: 100%;"
        :header-cell-style="headerBgStyle"
        highlight-current-row
        stripe
        height="300"
      >
        <template v-for="(col,idx) in tableArea.tHeadData">
          <el-table-column
            :key="idx"
            :prop="col.prop"
            :label="col.label"
            :sortable="col.prop.search(/FEE/)===-1?false:true"
            align="center"
            v-if="idx==0"
          >
            <template slot-scope="scope">
              <div>
                <el-popover
                  v-if="col.prop.search(/ORGAN_NAME/)!==-1"
                  placement="right"
                  width="400"
                  trigger="hover"
                  @show="hoverShow('tableLineChart-sj'+scope.row.ORGAN_ID,scope.row.ORGAN_ID)"
                >
                  <div :id="'tableLineChart-sj'+scope.row.ORGAN_ID" style="width:400px;height:200px"></div>
                  <div slot="reference">{{scope.row[col.prop]}}</div>
                </el-popover>
              </div>
            </template>
          </el-table-column>
          <el-table-column
            :key="idx"
            :prop="col.prop"
            :label="col.label"
            :sortable="col.prop.search(/FEE/)===-1?false:true"
            align="center"
            v-if="idx!==0"
          >
            <template slot-scope="scope">
                <div v-if="col.prop.search(/ORGAN_NAME/)===-1" slot="reference">{{scope.row[col.prop]}}</div>
            </template>
          </el-table-column>
        </template>
        <el-table-column
            key="lastCol"
            label="详情"
            align="center"
          >
            <template slot-scope="scope">
                <el-button class="btn-detail" size="small" @click="HrefToTable(scope.row['ORGAN_ID'])">一区一表</el-button>
            </template>
          </el-table-column>
      </el-table>
    </div>
    <div class="table" :style="tableBgStyle" v-show="tabVal=='person'">
      <el-table
        :data="tablePerson.tbodyData"
        style="width: 100%;"
        :header-cell-style="headerBgStyle"
        highlight-current-row
        stripe
        height="300"
      >
        <template v-for="(col,idx) in tablePerson.tHeadData">
          <el-table-column
            :key="idx"
            :prop="col.prop"
            :label="col.label"
            :sortable="col.prop.search(/FEE/)===-1?false:true"
            align="center"
            v-if="idx==0"
          >
            <template slot-scope="scope">
              <div>
                <el-popover
                  v-if="col.prop.search(/ORGAN_NAME/)!==-1"
                  placement="right"
                  width="400"
                  trigger="hover"
                  @show="hoverShow('tableLineChart-sj'+scope.row.ORGAN_ID,scope.row.ORGAN_ID)"
                >
                  <div :id="'tableLineChart-sj'+scope.row.ORGAN_ID" style="width:400px;height:200px"></div>
                  <div slot="reference">{{scope.row[col.prop]}}</div>
                </el-popover>
              </div>
            </template>
          </el-table-column>
          <el-table-column
            :key="idx"
            :prop="col.prop"
            :label="col.label"
            :sortable="col.prop.search(/FEE/)===-1?false:true"
            align="center"
            v-if="idx!==0"
          >
            <template slot-scope="scope">
                <div v-if="col.prop.search(/ORGAN_NAME/)===-1" slot="reference">{{scope.row[col.prop]}}</div>
            </template>
          </el-table-column>
        </template>
      </el-table>
    </div>
  </div>
</template>

<script>
import moment from "moment";
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
      },
      chartId: "",
      chartDivId: ""
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
          let data = res.data;
          const head = {
            ORGAN_NAME: "经理名称",
            HR_EMP_CODE: "人力编码",
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
        .catch(function(e) {});
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
          let data = res.data;
          const head = {
            ORGAN_NAME: "小区名称",
            ORGAN_ID: "小区ID",
            MANAGER_NAME: "经理名称",
            GH_FEE: "固话收入",
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
        })
        .catch(function(e) {});
    },
    drawLineChart(id, dataset) {
      var thisChart = this.$echarts.init(document.getElementById(id));
      thisChart.clear();
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
    },
    hoverShow(chartId, organId) {
      this.chartId = chartId;
      let url =
        this.tabVal == "xq"
          ? "/Workbench/getIncomeCellLine"
          : "/Workbench/getIncomeUserLine";
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
            data: data.resultData.map((v,i) => v.BY_FEE)
          };
          _this.drawLineChart(chartId, _this.hoverData);
        })
        .catch(function(e) {});
    },
    closeThis() {
      this.$emit("callback", false);
    },
    TableToExcel() {
      let params = {
        monthId: this.date
      };
      if (this.tabVal === "person") {
        window.open(
          "http://10.26.20.254:8203/microservice-ui/" +
            "/Workbench/downUserDetail?" +
            qs.stringify({ JsonParam: JSON.stringify(params) })
        );
      } else if (this.tabVal === "xq") {
        window.open(
          "http://10.26.20.254:8203/microservice-ui/" +
            "/Workbench/downCellDetail?" +
            qs.stringify({ JsonParam: JSON.stringify(params) })
        );
      }
    },
    HrefToTable(organId){
      let dayId = moment(this.date).format("YYYYMM");
      let url = 'http://10.26.20.254/pure/dss/workbench/CommakDetailO!toQuartersDetail.action?dayId='+dayId+'&organId='+organId;
      window.open(url,'_blank');
    }
  },
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
        this.drawLineChart(this.chartId, this.hoverData);
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
.btn-detail,
.btn-detail:hover,
.btn-detail:focus {
  background-image: linear-gradient(-225deg, #a834ef 0%, #2ac6ff 100%);
  border: none;
  color: #fff;
}
</style>