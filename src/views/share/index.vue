<template>
  <div class="moveDiv" @click="sendMsg">
    <card :cardset="cardset" :timetype="'month'">
      <div class="card-content">
        <chart-gauge :id="'guage'"></chart-gauge>
      </div>
    </card>
  </div>
</template>

<script>
import card from "../../components/Card.vue";
import chartGauge from "../../components/chartGauge.vue";
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
    };
  },
  methods:{
      sendMsg:function() {
      const param = {
          dialogCompent:"shareSecond",
          dialogTitle:"增量收益分享",
      }
      this.$emit('headCallBack', param); //第一个参数是父组件中v-on绑定的自定义回调方法，第二个参数为传递的参数
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