<template>
  <div class="moveDiv" v-on:click="sendMsg" v-if="arrears!=null">
    <div class="content">
      <card :cardset="lj" :timetype="''" style="margin-right:10px;">
        <div class="precent">
          <el-progress :percentage="arrears.LJ_RATE"  color="red" style="width:70%" :show-text="false" :stroke-width="12" ></el-progress>
          <h3 class="precent_text">
            {{arrears.LJ_RATE}}
            <span class="unit">%</span>
          </h3>
        </div>
      </card>
      <card :cardset="dy" :timetype="''">
        <div class="precent">
          <el-progress :percentage="arrears.DYUE_RATE" color="#19c172" style="width:70%" :show-text="false" :stroke-width="12" ></el-progress>
          <h3 class="precent_text">{{arrears.DYUE_RATE}}
            <span class="unit">%</span>
          </h3>
        </div>
      </card>
    </div>
    <div class="content" style="margin-top:10px">
      <card :cardset="dq" :timetype="''" style="margin-right:10px;">
        <div class="precent">
         
          <el-progress :percentage="arrears.DQ_RATE" color="#F16012" style="width:70%" :show-text="false" :stroke-width="12" ></el-progress>
          <h3 class="precent_text">{{arrears.DQ_RATE}}
            <span class="unit">%</span>
          </h3>
        </div>
      </card>
      <card :cardset="cq" :timetype="''">
        <div class="precent">
          <el-progress :percentage="arrears.CQ_RATE" color="#68FCFC" style="width:70%" :show-text="false" :stroke-width="12" ></el-progress>
          <h3 class="precent_text">{{arrears.CQ_RATE}}
            <span class="unit">%</span>
          </h3>
        </div>
      </card>
    </div>
  </div>
</template>

<script>
import card from "../../components/Card.vue";
import qs from "qs";
const defaultParam = {
  width: "calc(50% - 5px)",
  leftcolor: "#6B799C",
  rightcolor: "#A4B1CB"
};
export default {
  components: { card },
  data() {
    return {
      lj: {
        title: "累计欠费回收率",
        ...defaultParam
      },
      dy: {
        title: "当月欠费回收率",
        ...defaultParam
      },
      dq: {
        title: "短期欠费回收率",
        ...defaultParam
      },
      cq: {
        title: "长期欠费回收率",
        ...defaultParam
      },
      arrears:null

    };
  },
  methods: {
    sendMsg: function() {
      const param = {
        dialogCompent: "arrearsSecond",
        dialogTitle: "欠费"
      };
      this.$emit("headCallBack", param); //第一个参数是父组件中v-on绑定的自定义回调方法，第二个参数为传递的参数
    },
    getIndexNum(){
        let that = this;
     
      this.$axios
        .get("/arrearage/getIndexNum")
        .then(function(res) {
          if (res.data.resultCode === "1") {
            let resultData = res.data.resultData;
            for (const key in resultData) {
              resultData[key] = Number(parseFloat(resultData[key].replace(/\s*/g,"")).toFixed(2))
            }
            that.arrears = resultData;
          }
        })
        .catch(function(e) {});
    }
  },
  mounted:function(){
    this.getIndexNum();
  }
};
</script>
<style>
.precent .el-progress-bar__outer {
  background-color: #777;
}
</style>

<style scoped>
.moveDiv {
  width: 100%;
  height: 100%;
}
.content {
  display: flex;
  justify-content: space-between;
  height: calc(50% - 5px);
}
.precent {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  height: 70%;
  padding: 0 10px;
}
.precent_text {
  font-size: 26px;
  margin-left: 10px;
}
.unit {
  font-size: 18px;
}
</style>