<template>
  <div class="moveDiv" @click="sendMsg">
    <card :cardset="xs" :timetype="'month'" :propsTime="cardTime" style="margin-right:10px;">
      <div class="cardCont flexard">
        <el-popover placement="top" width="200" trigger="hover">
          <div style="color:#fff">
            <p>单元类型：{{cardData.WG_TYPE}}</p>
            <p>市公司排名：{{cardData.XS_YS_ALL_ORDER}}</p>
            <!--  平均完成率 xxxx -->
            <p>同类单元排名：{{cardData.XS_YS_TL_ORDER}}</p>
            <!-- 平均完成率 xxxxx -->
            <p>分公司排名：{{cardData.XS_YS_FGS_ORDER}}</p>
            <!--  平均完成率 xxxx -->
          </div>
          <div style="font-size:50px" slot="reference">{{cardData.XS_WCL}}%</div>
        </el-popover>
        <div style="color: #7594C3;">{{cardData.SR_NUM}}（元）</div>
        <div style="width:100%; height:80px">
          <chartLine
            :id="'xsIncomeChart'"
            :dataset="xs.chartLine.dataset"
            :color="xs.chartLine.colors"
          ></chartLine>
        </div>
      </div>
    </card>
    <div class="content">
      <card :cardset="dy" :timetype="''" style="height:calc(50% - 5px);">
        <div class="cardCont flexcc">
          <div class="progressDiv">
            <div class="dark">
              <el-progress
                :text-inside="false"
                :stroke-width="9"
                :percentage="cardData.DY_WCL"
                :show-text="false"
              ></el-progress>
            </div>
          </div>
          <el-popover placement="top" width="200" trigger="hover">
            <div style="color:#fff">
              <p>单元类型：{{cardData.WG_TYPE}}</p>
              <p>市公司排名：{{cardData.DY_YS_ALL_ORDER}}</p>
              <p>同类单元排名：{{cardData.DY_YS_TL_ORDER}}</p>
              <p>分公司排名：{{cardData.DY_YS_FGS_ORDER}}</p>
            </div>
            <div class="numDiv" slot="reference">{{cardData.DY_WCL}}%</div>
          </el-popover>
        </div>
      </card>
      <card :cardset="lj" :timetype="''" style="height:calc(50% - 5px);">
        <div class="cardCont flexcc">
          <div class="progressDiv">
            <div class="dark">
              <el-progress
                :text-inside="false"
                :stroke-width="9"
                :percentage="cardData.LJ_WCL"
                :show-text="false"
              ></el-progress>
            </div>
          </div>
          <el-popover placement="top" width="200" trigger="hover">
            <div style="color:#fff">
              <p>单元类型：{{cardData.WG_TYPE}}</p>
              <p>市公司排名：{{cardData.BN_YS_ALL_ORDER}}</p>
              <p>同类单元排名：{{cardData.BN_YS_TL_ORDER}}</p>
              <p>分公司排名：{{cardData.BN_YS_FGS_ORDER}}</p>
            </div>
            <div class="numDiv" slot="reference">{{cardData.LJ_WCL}}%</div>
          </el-popover>
        </div>
      </card>
    </div>
  </div>
</template>

<script>
import card from "../../components/Card.vue";
import chartLine from "../../components/chartLineIndex.vue";
import { setTimeout } from "timers";
const defaultParam = {
  leftcolor: "#FAD961",
  rightcolor: "#F76B1C"
};
export default {
  components: { card, chartLine },
  data() {
    return {
      xs: {
        title: "序时收入预算完成率",
        ...defaultParam,
        width: "calc(50% - 5px)",
        chartLine: {
          dataset: {
            xAxis: ["1月", "2月", "3月", "4月", "5月"],
            data: [100, 300, 200, 500, 400]
          },
          colors: {
            type: "linear",
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              {
                offset: 0,
                color: "#FAD961" // 0% 处的颜色
              },
              {
                offset: 1,
                color: "#F76B1C" // 100% 处的颜色
              }
            ],
            global: false // 缺省为 false
          }
        }
      },
      dy: {
        title: "当月收入预算完成率",
        ...defaultParam
      },
      lj: {
        title: "累计收入预算完成率",
        ...defaultParam
      },
      cardData: {},
      monthId: "",
      cardTime: ""
    };
  },
  created() {
    this.post();
  },
  methods: {
    sendMsg: function() {
      const param = {
        dialogCompent: "incomeSed",
        dialogTitle: "收入"
      };
      const thirdParams = {
        monthId: this.cardData.monthId
      };
      this.$emit("headCallBack", param, thirdParams); //第一个参数是父组件中v-on绑定的自定义回调方法，第二个参数为传递的参数
    },
    post() {
      let _this = this;
      this.$axios
        .post("/Workbench/getIncomeIndex")
        .then(function(res) {
          _this.cardData = res.data.resultData;
          _this.monthId = res.data.resultData.monthId;
          _this.xs.chartLine.dataset = {
            xAxis: res.data.resultData.lineChart.map(v => v.ACCT_MONTH),
            data: res.data.resultData.lineChart.map(v => v.SR_NUM)
          };
        })
        .catch(function(e) {
        });
    }
  },
  watch: {
    monthId(newValue, oldValue) {
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


<style scoped lang="less">
.moveDiv {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
}
.content {
  width: ~"calc(50% - 5px)";
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.cardCont {
  width: 100%;
  height: ~"calc(100% - 30px)";
  display: flex;
}
.flexard {
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-direction: column;
  height: ~"calc(100% - 50px)";
  margin-top: 20px;
}
.flexcc {
  display: flex;
  justify-content: center;
  align-items: center;
}
.numDiv {
  font-size: 28px;
}
.progressDiv {
  width: 60%;
  .dark {
    width: 90%;
  }
}
</style>