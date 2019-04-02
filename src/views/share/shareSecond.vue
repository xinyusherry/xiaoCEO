<template>
  <div :sendParams="sendParams">
    <div class="formula_out formula_list">
      <h3 class="border"></h3>
      <h3 class="formula">计算公式</h3>
      <img src="~@/assets/images/wh-icon.png" alt class="wh" @click="changeFormula(isText)">
      <div class="formula_list" style="margin-left: 20px;flex-wrap:wrap;">
        <img src="~@/assets/images/icon_l.png" alt class="icon_l">
        <div class="formula_list">
          <img src="~@/assets/images/icon_h_l.png" alt class="icon_h">
          <h3 class="jsdesc" v-if="isText === false ">收入完成</h3>
          <h3 class="jsdesc" v-if="isText === true && formula">{{formula[0].YWSR_LJ_NUM}}</h3>
          <img src="~@/assets/images/icon_jh.png" alt class="icon_jh">
          <h3 class="jsdesc" v-if="isText === false ">成本完成</h3>
          <h3 class="jsdesc"  v-if="isText === true && formula">{{formula[0].CBWC_LJ_WC}}</h3>
          <img src="~@/assets/images/icon_h_r.png" alt class="icon_h">
        </div>
        <img src="~@/assets/images/icon_jh.png" alt class="icon_jh">
        <div class="formula_list">
          <img src="~@/assets/images/icon_h_l.png" alt class="icon_h">
          <h3 class="jsdesc" v-if="isText === false ">收入序时预算</h3>
          <h3 class="jsdesc"  v-if="isText === true && formula"> {{formula[0].SRXS_JCN_NUM}}</h3>
          <img src="~@/assets/images/icon_ch.png" alt class="icon_jh">
          <h3 class="xsdesc" v-if="isText === false ">系数</h3>
          <h3 class="xsdesc" v-if="isText === true && formula">{{formula[0].SRXS_TC_XS}}</h3>
          <img src="~@/assets/images/icon_jh.png" alt class="icon_jh">
          <h3 class="jsdesc"  v-if="isText === false ">成本序时预算</h3>
          <h3 class="jsdesc" v-if="isText === true && formula">{{formula[0].CBWC_ND_XS}}</h3>
          <img src="~@/assets/images/icon_h_r.png" alt class="icon_h">
        </div>
        <img src="~@/assets/images/icon_r.png" alt class="icon_l">

         <img src="~@/assets/images/icon_ch.png" alt class="icon_jh">
          <h3 class="xsdesc"  v-if="isText === false ">系数</h3>
          <h3 class="xsdesc" v-if="isText === true && formula">{{formula[0].ZLSY_SJ_FX}}</h3>
      </div>
    </div>
    <!-- table部分开始 -->
    <div>
      <div class="btnList header">
        <el-date-picker v-model="date" type="month" placeholder="选择日期" style="background:#070d12;"  @change="dateChange"></el-date-picker>
        <div class="rightBtn header">
          <div class="down" @click="goDetail">详情</div>
        </div>
      </div>
      <div class="table" :style="tableBgStyle">
        <el-table
          :data="tableData"
          style="width: 100%;"
          :cell-style="cellStyle"
          :header-cell-style="headerBgStyle"
          stripe
          height= "280"
        >
          <el-table-column align="center" label="姓名" width="180" sortable>
            <template slot-scope="scope">
              <el-popover placement="right" width="400" trigger="hover">
                <div :id="'tableLineChart'+scope.row.index" style="width:400px;height:200px"></div>
                <div slot="reference">{{scope.row.EMP_NAME}}</div>
              </el-popover>
            </template>
          </el-table-column>
          <el-table-column prop="MONTHID" align="center" label="时间" width="180"></el-table-column>

          <el-table-column prop="FEE" align="center" label="分享金额值" sortable></el-table-column>
          <el-table-column prop="ZB" align="center" label="分享占比" sortable></el-table-column>
          <el-table-column prop="FEE_ALL" align="center" label="全年合计值" sortable></el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
import qs from "qs";
import moment from "moment";
import { formatterTime } from "../../utils/index.js";
export default {
  components: {},
  props:['sendParams'],
  data() {
    return {
      isDay: 1,
      isActive: 0,
      isText:false,
      formula:null,
      xAxisData: [
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
        "12月",
      ],
      date: formatterTime(this.sendParams),
      isTableLineShow: false,
      tableBg: require("@/assets/images/tabBg.png"),
      tableBgStyle: {
        background:
          "url(" +
          require("@/assets/images/tabBg.png") +
          ") left top no-repeat",
        backgroundSize: "100% 100%",
        padding: "18px",
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
      this.isActive = index;
    },
    goDetail(){
       let url = 'http://10.26.20.254/microservice-ui/caiwu/profitShare';
      window.open(url,'_blank');
    },
     changeFormula(isText){
      this.isText = !isText;
      let _this = this;
    },
    dateChange(value) {
       let that = this;
       const params = {
         monthId:moment(value).format("YYYYMM")
       }
       this.getFormulaAndTableData(params)
    },
    drawLineChart(id, color,data) {
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
              text: "趋势",
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
              data: data
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
    },
    getLineData(obj,index){
      let _this = this;
      this.$axios
        .get("/zlsyfx/getLineData?"+qs.stringify({ JsonParam: JSON.stringify(obj) }))
        .then(function(res) {
          if (res.data.resultCode === "1") {
            let data = [];
            let resultData = res.data.resultData[0];
            for(let key in resultData){
              data.push(resultData[key])
            }
            _this.drawLineChart("tableLineChart" + index, "#fbbf50",data);
           
          }
        })
        .catch(function(e) {
        });
    },
    getFormulaAndTableData(params){
      let _this = this;
        this.$axios
        .get("/zlsyfx/getFormulaAndTableData?"+
            qs.stringify({ JsonParam: JSON.stringify(params) })
        )
        .then(function(res) {
          if (res.data.resultCode === "1") {
            let resultData = res.data.resultData;
            _this.formula = resultData[0];
            let tableData = resultData[1];
            if(tableData){
               tableData.map((item,index)=>{
              item.index = index;
              const obj = {
                monthId:params.monthId,
                empCode:item.EMP_CODE
              }
              _this.tableData = tableData;
              if(item.EMP_CODE){
                _this.getLineData(obj,index);
              }
            })
            }
           
          }
        })
        .catch(function(e) {
        });
    }

  },
  mounted() {
    let _this = this;
    const params = {
      monthId:_this.sendParams,
    }
    this.getFormulaAndTableData(params);
    
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
  cursor: pointer;
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