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
        <el-radio-group v-model="isDay" @change="dayTypeChange" v-show="isActive === 0">
          <el-radio :label="'day'">日</el-radio>
          <el-radio :label="'month'">月</el-radio>
        </el-radio-group>
        <el-date-picker
          v-model="dateD"
          type="date"
          v-show="isDay=='day' && isActive === 0"
          placeholder="选择日期"
          style="background:#070d12;"
          @change="dateChange"
        ></el-date-picker>
        <el-date-picker
          v-model="dateM"
          type="month"
          v-show="isDay=='month' || isActive === 1"
          placeholder="选择日期"
          style="background:#070d12;"
          @change="dateChange"
        ></el-date-picker>
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
          <div class="down mr20" @click="getDownloadData">下载</div>
          <el-select v-model="value" placeholder="请选择" @change="selectChange">
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
           height="300"
        >
          <template v-for="(col,idx) in tHeadData">
            <el-table-column
              :key="col.key"
              :prop="col.prop"
              :label="col.label"
              :sortable="col.prop.search(/FEE/)===-1?false:true"
              align="center"
              v-if="idx==0"
              :width="col.length>7?'230':'150'"
            >
              <template slot-scope="scope">
                <div>
                  <el-popover
                    placement="right"
                    width="400"
                    trigger="hover"
                    @show="hoverShow('tableLineChart'+scope.row.index,scope.row.ORGAN_ID)"
                  >
                    <div
                      :id="'tableLineChart'+scope.row.index"
                      style="width:400px;height:200px"
                    ></div>
                    <div slot="reference">{{scope.row[col.prop]}}</div>
                  </el-popover>
                </div>
              </template>
            </el-table-column>
            <el-table-column
              :key="col.key"
              :prop="col.prop"
              :label="col.label"
              :sortable="idx>3?true:false"
              align="center"
              v-if="idx!==0"
              :width="col.length>7?'280':'190'"
            >
              <template slot-scope="scope">
                <div slot="reference">{{scope.row[col.prop]}}{{col.prop=='STL'||col.prop=='DKL'?"%":""}}</div>
              </template>
            </el-table-column>
          </template>
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
  props: ["sendParams"],
  data() {
    return {
      isActive: 0,
      isDay: "day",
      xAxisData: [],
      activeClass: "down",
      unActiveClass: "xq",
      date:"",
      dateD: this.sendParams.dateD,
      dateM: "",
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
      tHeadData: {},
      tableData: [],
      options: [
        {
          value: "01",
          label: "净增"
        },
        {
          value: "02",
          label: "到达"
        }
      ],
      value: "01"
    }
  },
  watch:{
    isDay:{
      handler(newVal) {
    　　this.date = newVal==='day'? this.dateD : this.dateM;
  　　},
  　　immediate: true
    }
  },
  methods: {
    getDownloadData(){
      let _this = this;
       let param = {
         type: _this.isDay,
        svcType: _this.value,
      };
      let merge = {};
      if (_this.isDay === "day") {
        merge = {
          dayId: moment(_this.date).format("YYYYMMDD")
        };
      } else {
        merge = {
          monthId: moment(_this.date).format("YYYYMM")
        };
      }
      const params = {
        ...param,
        ...merge
      };

        window.open(
          "http://10.26.20.254:8203/microservice-ui/" +
            "/arrive/getDownloadData?" +
            qs.stringify({ JsonParam: JSON.stringify(params) })
        );
    },
    changeTab(index) {
      let _this = this;
      this.isActive = index;
      this.dateChange();
    },
    dayTypeChange(val) {
      let _this = this;
      this.dateChange();
    },
    dateChange() {
      let _this = this;
      if (_this.isActive === 0 && _this.isDay === "day") {
          const param = {
            dayId: moment(_this.dateD).format("YYYYMMDD"),
            type: "day"
          };
          _this.getServicePieData(param);
          _this.getProductPieData(param);
      }
      if (_this.isActive === 0 && _this.isDay === "month") {
          const param = {
            monthId: moment(_this.dateM).format("YYYYMM"),
            type: "month"
          };
          _this.getServicePieData(param);
          _this.getProductPieData(param);
      }

      if (_this.isActive === 1) {
        const param = {
          monthId: moment(_this.dateM).format("YYYYMM")
        };
        _this.getXzLineData(param);
        _this.getClLineData(param);
      }
      _this.selectChange();
    },
    hoverShow(chartId, organId) {
      let _this = this;
      const param = {
        type: _this.isDay,
        svcType: _this.value,
        organId: organId
      };
      let merge = {};
      if (_this.isDay === "day") {
        merge = {
          dayId: moment(_this.date).format("YYYYMMDD")
        };
      } else {
        merge = {
          monthId: moment(_this.date).format("YYYYMM")
        };
      }
      const params = {
        ...param,
        ...merge
      };
      // /arrive/getCommunityData
        this.$axios
        .get(
          "/arrive/getCommunityData?" +
          qs.stringify({ JsonParam: JSON.stringify(params) })
        )
        .then(function(res) {
          if (res.data.resultCode === "1") {
            let resultData = res.data.resultData;
            let xAxis = [],yAxis = [];
            for(let i = 0; i<resultData.length;i++){
              if (_this.isDay === "day") {
                xAxis.push(resultData[i].ACCT_DAY);
              } else {
                xAxis.push(resultData[i].ACCT_MONTH);
              }
              yAxis.push(resultData[i].USER_NUM);
            }
            _this.drawLineChart(chartId,'#5FA8F2',xAxis,yAxis)
          }
        })
        .catch(function(e) {});
    },
    selectChange() {
      let _this = this;
      if (_this.isDay === "day") {
        const param = {
          dayId: moment(_this.dateD).format("YYYYMMDD"),
          type: "day",
          svcType: _this.value
        };
        _this.getTableData(param);
      } else {
        const param = {
          monthId: moment(_this.dateM).format("YYYYMM"),
          type: "month",
          svcType: _this.value
        };
        _this.getTableData(param);
      }
    },
    drawLineChart(id, color,xAxis,yAxis) {
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
              text: "小区明细",
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
            name: "",
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
    drawPieChart(id, title, data) {
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
            text: title,
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
            avoidLabelOverlap: true,
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
            data: data
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
            trigger: "axis"
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
            name: "",
            nameTextStyle: {
              color: "#24FAFF",
              fontSize: 14
            },
            axisLabel: {
              show: true,
              textStyle: {
                color: "#24FAFF",
                fontSize: 12
              },
              formatter: "{value}%"
            }
          },
          series: [
            {
              type: "line",
              symbol: "none",
              color: lineData.colors[0],
              name: lineData.legendData[0].name,
              data: lineData.data[0]
            },
            {
              type: "line",
              symbol: "none",
              color: lineData.colors[1],
              name: lineData.legendData[1].name,
              data: lineData.data[1]
            },
            {
              type: "line",
              symbol: "none",
              color: lineData.colors[2],
              name: lineData.legendData[2].name,
              data: lineData.data[2]
            },
            {
              type: "line",
              symbol: "none",
              color: lineData.colors[3],
              name: lineData.legendData[3].name,
              data: lineData.data[3]
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
    getServicePieData(params) {
      let _this = this;
      this.$axios
        .get(
          "/arrive/getServicePieData?" +
            qs.stringify({ JsonParam: JSON.stringify(params) })
        )
        .then(function(res) {
          if (res.data.resultCode === "1") {
            let resultData = res.data.resultData;
            let arr = [];
            for (let i = 0; i < resultData.length; i++) {
              let obj = new Object();
              obj.name = resultData[i].YW_TYPE;
              obj.value = resultData[i].USER_NUM;
              arr.push(obj);
            }
            _this.drawPieChart("pie", "业务分类", arr);
          } else {
            _this.$echarts.init(document.getElementById("pie")).clear();
          }
        })
        .catch(function(e) {});
    },
    getProductPieData(params) {
      let _this = this;
      this.$axios
        .get(
          "/arrive/getProductPieData?" +
            qs.stringify({ JsonParam: JSON.stringify(params) })
        )
        .then(function(res) {
          if (res.data.resultCode === "1") {
            let resultData = res.data.resultData;
            let arr = [];
            for (let i = 0; i < resultData.length; i++) {
              let obj = new Object();
              obj.name = resultData[i].CP_TYPE;
              obj.value = resultData[i].USER_NUM;
              arr.push(obj);
            }
            _this.drawPieChart("line", "产品结构", arr);
          } else {
            _this.$echarts.init(document.getElementById("line")).clear();
          }
        })
        .catch(function(e) {});
    },
    getXzLineData(params) {
      let _this = this;
      this.$axios
        .get(
          "/arrive/getXzLineData?" +
            qs.stringify({ JsonParam: JSON.stringify(params) })
        )
        .then(function(res) {
          if (res.data.resultCode === "1") {
            let zxData = res.data.resultData;
            //折线图
            let data = [];
            let qb = [],
              yd = [],
              gh = [],
              kd = [];
            for (let j = 0; j < zxData.length; j++) {
              qb.push(zxData[j].ZS);
              yd.push(zxData[j].YD);
              gh.push(zxData[j].GH);
              kd.push(zxData[j].KD);
            }
            data.push(qb);
            data.push(yd);
            data.push(gh);
            data.push(kd);
            let lineData = {
              colors: ["#E3D54B", "#3E9EFD", "#43BF4E", "#C12337"],
              title: "新增用户保有率",
              data: data,
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
              legendData: [
                { name: "全部" },
                { name: "移动" },
                { name: "固话" },
                { name: "宽带" }
              ]
            };
            _this.drawMoreLineChart("line", lineData);
          } else {
            _this.$echarts.init(document.getElementById("line")).clear();
          }
        })
        .catch(function(e) {});
    },
    getClLineData(params) {
      let _this = this;
      this.$axios
        .get(
          "/arrive/getClLineData?" +
            qs.stringify({ JsonParam: JSON.stringify(params) })
        )
        .then(function(res) {
          if (res.data.resultCode === "1") {
            let zxData = res.data.resultData;
            //折线图
            let data = [];
            let qb = [],
              yd = [],
              gh = [],
              kd = [];
            for (let j = 0; j < zxData.length; j++) {
              qb.push(zxData[j].ZS);
              yd.push(zxData[j].YD);
              gh.push(zxData[j].GH);
              kd.push(zxData[j].KD);
            }
            data.push(qb);
            data.push(yd);
            data.push(gh);
            data.push(kd);
            let lineData = {
              colors: ["#E3D54B", "#3E9EFD", "#43BF4E", "#C12337"],
              title: "存量用户保有率",
              data: data,
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
              legendData: [
                { name: "全部" },
                { name: "移动" },
                { name: "固话" },
                { name: "宽带" }
              ]
            };
            _this.drawMoreLineChart("pie", lineData);
          } else {
            _this.$echarts.init(document.getElementById("pie")).clear();
          }
        })
        .catch(function(e) {});
    },
    getTableData(params) {
      let _this = this;
      this.$axios
        .get(
          "/arrive/getTableData?" +
            qs.stringify({ JsonParam: JSON.stringify(params) })
        )
        .then(function(res) {
          //console.log(params,res);
          if (res.data.resultCode === "1") {
            let resultData = res.data.resultData;
            const object = {
              ORGAN_NAME: "销售单元",
              ORGAN_ID: "小区编码",
              MANAGER_NAME: "所属经理",
              XQ_TYPE: "小区类型",
              HOME_NUM: "住宅数",
              STL: "住宅用户渗透率",
              DKZY_NUM: "端口数",
              DKL: "端口实占率",
              GH_NUM: "小区内固话用户数",
              KD_NUM: "小区内宽带用户数",
              G2_NUM: "2G",
              G3_NUM: "3G",
              G4_NUM: "4G",
              IPTV: "IPTV",
              DG_NUM: "单固",
              DK_NUM: "单宽",
              RH_NUM: "融合",
              RH_XXH_NUM: "孝心红",
              RH_QJH_NUM: "全家红",
              RH_ZXH_NUM: "尊享红",
            };
            let tHeadData = [];
            for (const key in object) {
              if (object.hasOwnProperty(key)) {
                 tHeadData.push({
                label: object[key],
                prop: key
              });
              }
            }
            _this.tHeadData = tHeadData;
            _this.tableData = resultData.map((item,index)=>{
              item.index = index;
              return item
            });
          } else {
          }
        })
        .catch(function(e) {});
    }
  },
  created(){
    let _this = this;
    this.$axios
    .get(
      "/arrive/getIndexNum?" +
      qs.stringify({ JsonParam: JSON.stringify({type:'month'}) })
    )
    .then(function(res) {
      if (res.data.resultCode === "1") {
        _this.dateM = formatterTime(res.data.resultData.ACCT_MONTH);
      }
    })
    .catch(function(e) {});
  },
  mounted() {
    let _this = this;
    this.tableData.map(obj => {
      this.drawLineChart("tableLineChart" + obj.id, "#fbbf50");
    });
    const param = {
      dayId: moment(_this.date).format("YYYYMMDD"),
      type: "day"
    };
    _this.getServicePieData(param);
    //饼图
    _this.getProductPieData(param);
    const tableParam = {
      type: "day",
      dayId: moment(_this.date).format("YYYYMMDD"),
      svcType: _this.value
    };
    _this.getTableData(tableParam);
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