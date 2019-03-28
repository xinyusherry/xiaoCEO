<template>
  <div class="moveDiv" @click="sendMsg">
    <card :cardset="zlr" :timetype="'month'" :propsTime="cardTime" style="margin-right:10px;">
      <div class="warpper">
        <h3 class="hj_unit">
          ￥&nbsp;&nbsp;
          <span class="hj">(合计值)</span>
        </h3>
        <el-popover placement="top" width="300" trigger="hover">
          <div style="color:#fff">
            <p>单元类型（农村/城市）</p>
            <p>市公司排名xxx 平均完成率 xxxx</p>
            <p>同类单元排名 xxxx 平均完成率 xxxxx</p>
            <p>分公司排名xxx 平均完成率 xxxx</p>
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
          <span class="hj">(合计值)</span>
        </h3>
        <el-popover placement="top" width="300" trigger="hover">
          <div style="color:#fff">
            <p>单元类型（农村/城市）</p>
            <p>市公司排名xxx 平均完成率 xxxx</p>
            <p>同类单元排名 xxxx 平均完成率 xxxxx</p>
            <p>分公司排名xxx 平均完成率 xxxx</p>
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
      cardDate: "",
      zlr: {
        title: "准利润",
        ...defaultParam,
        chartLine: {
          dataset: {},
          colors: ["#CB68FC"]
        },
        value: ""
      },
      lr: {
        title: "利润",
        ...defaultParam,
        chartLine: {
          dataset: {},
          colors: ["#62B58F"]
        },
        value: ""
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
      this.$axios
        .post("/ceoProfit/getNumData")
        .then(function(res) {
          let data = res.data;
          _this.cardDate = data.resultData[0].ACCT_MONTH;
          _this.lr.value = data.resultData[0].GROSS_PROFIT_T;
          _this.zlr.value = data.resultData[0].QUASI_PROFIT_T;
        })
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
  created() {
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