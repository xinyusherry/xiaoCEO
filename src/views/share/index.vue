<template>
  <div class="moveDiv" @click="sendMsg(monthId)">
    <card :cardset="cardset" :timetype="'month'" :propsTime="time">
      <div class="card-content">
        <chart-gauge :id="'guage'" :data="data" v-if="data!=null"></chart-gauge>
      </div>
    </card>
  </div>
</template>

<script>
import card from "../../components/Card.vue";
import chartGauge from "../../components/chartGauge.vue";
import { formatterTime } from "../../utils/index.js";
export default {
  components: {
    card: card,
    chartGauge: chartGauge
  },
  data() {
    return {
      cardset: {
        title: "增量收益分享",
        width: "100%",
        leftcolor: "#53A0FD",
        rightcolor: "#85B62E"
      },
      time: "",
      data: null,
      monthId:""
    };
  },
  methods: {
    sendMsg: function(trdParams) {
      const param = {
        dialogCompent: "shareSecond",
        dialogTitle: "增量收益分享"
      };
      this.$emit("headCallBack", param,trdParams); //第一个参数是父组件中v-on绑定的自定义回调方法，第二个参数为传递的参数
    },
    getData() {
      let that = this;
      this.$axios
        .post("/zlsyfx/index")
        .then(function(res) {
          if (res.data.resultCode === "1") {
            //console.log("增量", res);
            let resultData = res.data.resultData;
            that.time = formatterTime(resultData[0].ACCT_MONTH);
            that.monthId = resultData[0].ACCT_MONTH;
            let data = resultData[0];
            // if(data){
            //   for(let key in data){
            //     data[key] =  data[key].replace(/\s*/g,"").split(',').join('');
            //   }
            // }
            that.data = data;
          }
        })
        .catch(function(e) {
          console.error(e);
        });
    }
  },
  mounted: function() {
    this.getData();
  }
};
</script>

<style scoped>
.moveDiv {
  width: 100%;
  height: 100%;
}
</style>