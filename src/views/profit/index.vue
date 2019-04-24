<template>
  <div class="moveDiv" @click="sendMsg"
    v-loading="loading"
    element-loading-text="Loading"
    element-loading-background="rgba(0, 0, 0, 0.8)"
  >
    <card :cardset="zlr" :timetype="'month'" :propsTime="cardTime" style="margin-right:10px;">
      <div class="warpper">
        <h3 class="hj_unit">
          ￥&nbsp;&nbsp;
          <span class="hj">合计值 （单位：元）</span>
        </h3>
        <el-popover placement="top" width="200" trigger="hover">
          <div style="color:#fff">
            <p>单元类型：{{zlr.rankData!=null?"--":zlr.rankData.ORGAN_TYPE}}</p>
            <p>指标类型：{{zlr.rankData!=null?"--":zlr.rankData.ZB_CODE}}</p>
            <p>同类排名：{{zlr.rankData!=null?"--":zlr.rankData.RAG_ORG_TL}}</p>
            <p>全市排名：{{zlr.rankData!=null?"--":zlr.rankData.RAG_ORG_QS}}</p>
            <p>分公司排名：{{zlr.rankData!=null?"--":zlr.rankData.RAG_ORG_FGS}}</p>
          </div>
          <h3 class="total_num" slot="reference">{{lr.value}}</h3>
        </el-popover>
        <div class="line">
          <chartLine
            :id="'zlrChart'"
            :dataset="zlr.chartLine.dataset"
            :color="zlr.chartLine.colors"
          ></chartLine>
        </div>
      </div>
    </card>
    <card :cardset="lr" :timetype="'month'" :propsTime="cardTime">
      <div class="warpper">
        <h3 class="hj_unit">
          ￥&nbsp;&nbsp;
          <span class="hj">合计值 （单位：元）</span>
        </h3>
        <el-popover placement="top" width="200" trigger="hover">
          <div style="color:#fff">
            <p>单元类型：{{lr.rankData!=null?"--":lr.rankData.ORGAN_TYPE}}</p>
            <p>指标类型：{{lr.rankData!=null?"--":lr.rankData.ZB_CODE}}</p>
            <p>同类排名：{{lr.rankData!=null?"--":lr.rankData.RAG_ORG_TL}}</p>
            <p>全市排名：{{lr.rankData!=null?"--":lr.rankData.RAG_ORG_QS}}</p>
            <p>分公司排名：{{lr.rankData!=null?"--":lr.rankData.RAG_ORG_FGS}}</p>
          </div>
          <h3 class="total_num" slot="reference">{{zlr.value}}</h3>
        </el-popover>
        <div class="line">
          <chartLine :id="'lrChart'" :dataset="lr.chartLine.dataset" :color="lr.chartLine.colors"></chartLine>
        </div>
      </div>
    </card>
  </div>
</template>

<script>
import qs from "qs";
import card from "../../components/Card.vue";
import chartLine from "../../components/chartLineIndex.vue";
const defaultParam = {
  width: "calc(50% - 5px)",
  leftcolor: "#A4B1CB",
  rightcolor: "#6B799C"
};
export default {
  components: { card, chartLine },
  data() {
    return {
      loading:true,
      cardDate: "",
      zlr: {
        title: "准利润",
        ...defaultParam,
        chartLine: {
          dataset: {},
          colors: ["#CB68FC"]
        },
        value: "",
        rankData:null,
      },
      lr: {
        title: "利润",
        ...defaultParam,
        chartLine: {
          dataset: {},
          colors: ["#62B58F"]
        },
        value: "",
        rankData:null,
      },
      cardTime: ""
    };
  },
  methods: {
    post() {
      this.postHj();
      this.postLine();
    },
    sendMsg: function() {
      const param = {
        dialogCompent: "profitSed",
        dialogTitle: "利润、准利润"
      };
      const thirdParams = {
        monthId: this.cardDate
      };
      this.$emit("headCallBack", param, thirdParams); //第一个参数是父组件中v-on绑定的自定义回调方法，第二个参数为传递的参数
    },
    postHj() {
      let _this = this;
      function getNumData() {
        return _this.$axios.get('/ceoProfit/getNumData');
      } 
      function getRankData() {
        return _this.$axios.get('/ceoProfit/getRankData');
      }
      _this.$axios.all([getNumData(), getRankData()])
        .then(_this.$axios.spread(function (res, resRank) {
          // 两个请求现在都执行完成
          console.log("利润",res,resRank);
          let data = res.data;
          _this.cardDate = data.resultData[0].ACCT_MONTH;
          _this.lr.value = data.resultData[0].GROSS_PROFIT_T;
          _this.zlr.value = data.resultData[0].QUASI_PROFIT_T;
          _this.lr.rankData = resRank.data.resultData[1];
          _this.zlr.rankData = resRank.data.resultData[0];
          _this.loading = false;
        }))
        .catch(function(e) {});
    },
    postLine() {
      let _this = this;
      let params = {
        monthId: _this.cardDate
      };
      if (_this.cardDate.length == 6) {
        this.$axios
          .get(
            "/ceoProfit/getLineData?" +
              qs.stringify({ JsonParam: JSON.stringify(params) })
          )
          .then(function(res) {
            let data = res.data;
            data.resultData.map(v => {
              if (v.name === "利润") {
                _this.lr.chartLine.dataset = {
                  xAxis: v.xAxis,
                  data: v.data.map(num => Number(num))
                };
              } else {
                _this.zlr.chartLine.dataset = {
                  xAxis: v.xAxis,
                  data: v.data.map(num => Number(num))
                };
              }
              return;
            });
          })
          .catch(function(e) {});
      }
    }
  },
  mounted() {
    this.post();
  },
  watch: {
    cardDate(newValue, oldValue) {
      this.postLine();
      if (newValue.search(/-/) === -1 && newValue.search(/年/) === -1) {
        if (newValue.length === 6) {
          this.cardTime = [newValue.substr(0, 4), newValue.substr(4, 2)].join(
            "-"
          );
        } else if (newValue.length === 8) {
          this.cardTime = [
            newValue.substr(0, 4),
            newValue.substr(4, 2),
            newValue.substr(6, 2)
          ].join("-");
        }
      } else {
        this.cardTime = newValue;
      }
    }
  }
};
</script>

<style scoped>
.moveDiv {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
}
.warpper {
  padding: 0 10px;
}
.hj_unit {
  color: #ffffff;
  font-size: 18px;
  margin-top: 20px;
}
.hj {
  color: #7594c3;
  font-size: 15px;
}
.total_num {
  color: #ffffff;
  font-size: 26px;
  margin-top: 20px;
}
.line {
  height: 140px;
}
</style>