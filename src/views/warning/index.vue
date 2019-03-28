<template>
  <div class="moveDiv" @click="sendMsg" :propsTime="day.time">
    <card :cardset="day.cardset" :timetype="'day'" style="margin-right:10px" v-if="xyData">
      <div class="card-content">
        <div class="bigNum">
          {{xyData.NUM_XY}}
          <!-- <img :src="require(`../../assets/images/icon-${day.cjDay.up?'up':'down'}.png`)"> -->
        </div>
        <p class="big_num_desc">续约数</p>
        <div class="precent">
          <el-progress
            :percentage="xyData.ZB"
            color="#68FCFC"
            style="width:70%"
            :show-text="false"
            :stroke-width="12"
          ></el-progress>
          <h3 class="precent_text">
            {{xyData.ZB}}
            <span class="unit">%</span>
          </h3>
        </div>
        <p class="big_num_desc">到期数 {{xyData.NUM_DQ}}</p>
      </div>
    </card>
    <card :cardset="month.cardset" :timetype="'month'" :propsTime="month.time" v-if="djData">
      <div class="card-content">
        <div class="bigNum">
          {{djData.NUM_XY}}
          <!-- <img :src="require(`../../assets/images/icon-${month.cjMonth.up?'up':'down'}.png`)"> -->
        </div>
        <p class="big_num_desc">趸交数</p>
        <div class="precent">
          <el-progress
            :percentage="djData.ZB"
            color="#68FCFC"
            style="width:70%"
            :show-text="false"
            :stroke-width="12"
          ></el-progress>
          <h3 class="precent_text">
            {{djData.ZB}}
            <span class="unit">%</span>
          </h3>
        </div>
        <p class="big_num_desc">到期数 {{djData.NUM_DQ}}</p>
      </div>
    </card>
  </div>
</template>

<script>
import card from "../../components/Card.vue";
import qs from "qs";
import moment from 'moment';
import { formatterTime } from "../../utils/index.js";
export default {
  components: { card },
  data() {
    return {
      day: {
        cardset: {
          title: "到期预警",
          width: "calc(50% - 5px)",
          leftcolor: "#53A0FD",
          rightcolor: "#85B62E"
        },
        cjDay: {
          value: 10,
          up: true
        },
        time: ""
      },
      month: {
        cardset: {
          title: "到期预警",
          width: "calc(50% - 5px)",
          leftcolor: "#53A0FD",
          rightcolor: "#85B62E"
        },
        cjMonth: {
          value: 125,
          up: false
        },
        time: ""
      },
      djData: null,
      xyData: null
    };
  },
  methods: {
    sendMsg: function() {
      const param = {
        dialogCompent: "warningSecond",
        dialogTitle: "到期预警"
      };
      this.$emit("headCallBack", param); //第一个参数是父组件中v-on绑定的自定义回调方法，第二个参数为传递的参数
    },
    getIndexYdData() {
      let _this = this;
      this.$axios
        .get("/maturityWarning/getIndexYdData")
        .then(function(res) {
          console.log("续约", res);
          if (res.data.resultCode === "1") {
            let resultData = res.data.resultData;
            _this.xyData = resultData;
            _this.day.time = formatterTime(resultData.ACCT_DAY);
          } else {
            _this.xyData = {
              NUM_DQ: 0,
              NUM_XY: 0,
              WG_CODE: "",
              ZB: 0
            };
             _this.day.time = formatterTime(moment(new Date(new Date().getTime() - 24 * 60 * 60 * 1000)).format('YYYYMMDD'));
          }
        })
        .catch(function(e) {});
    },
    getIndexGwData() {
      let _this = this;
      this.$axios
        .get("/maturityWarning/getIndexGwData")
        .then(function(res) {
          console.log("趸交", res);
          if (res.data.resultCode === "1") {
            let resultData = res.data.resultData;
            _this.djData = resultData;
            _this.month.time = formatterTime(resultData.ACCT_DAY);
          }else{
             _this.djData = {
              NUM_DQ: 0,
              NUM_XY: 0,
              WG_CODE: "",
              ZB: 0
            };
             _this.month.time = formatterTime(moment(new Date(new Date().getTime() - 24 * 60 * 60 * 1000)).format('YYYYMMDD'));
          }
        })
        .catch(function(e) {});
    }
  },
  mounted: function() {
    this.getIndexYdData();
    this.getIndexGwData();
  }
};
</script>

<style scoped>
.moveDiv {
  width: 100%;
  height: 100%;
  display: flex;
}
.big_num_desc {
  font-size: 20px;
  text-align: center;
  color: #7594c3;
}
.precent {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 20px;
}
.precent_text {
  font-size: 26px;
  margin-left: 3px;
  color: #9db1d1;
}
.unit {
  font-size: 18px;
}
</style>