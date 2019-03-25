<template>
  <div class="moveDiv" @click="sendMsg">
    <card :cardset="cardset" :timetype="'time'">
      <div class="card-content">
        <chart-line :id="'lineTime'" :dataset="developOnTime.dataset" :color="colors"></chart-line>
      </div>
    </card>
  </div>
</template>

<script>
import card from "../../components/Card.vue";
import chartLine from "../../components/chartLine.vue";
export default {
  components: {
    card: card,
    chartLine: chartLine
  },
  data() {
    return {
      cardset: {
        title: "发展（实时）",
        width: "100%",
        leftcolor: "#3023AE",
        rightcolor: "#C86DD7"
      },
      developOnTime: {
        dataset: [
          {
            name: "固话",
            value: 125
          },
          {
            name: "移动",
            value: 200
          }
        ]
      },
      colors: ["#F7E43C"]
    };
  },
  created() {
    this.post()
  },
  methods: {
    sendMsg: function() {
      const param = {
        dialogCompent: "dvlpTimeSed",
        dialogTitle: "发展（实时）"
      };
      this.$emit("headCallBack", param); //第一个参数是父组件中v-on绑定的自定义回调方法，第二个参数为传递的参数
    },
    post() {
      let _this = this;
      //测试接口
      this.$axios
        .post("/DevelopRealTime/index")
        .then(function(res) {
          console.log(res);
          // _this.layout = res.data.resultData;
        })
        .catch(function(e) {
          console.log(e);
        });
    }
  }
};
</script>

<style scoped>
.moveDiv {
  width: 100%;
  height: 100%;
}
</style>