<template>
  <div class="moveDiv" @click="sendMsg">
    <card :cardset="cardset" :timetype="'time'">
      <div class="card-content">
        <chart-line :id="'cjlineTime'" :dataset="developOnTime.dataset" :color="colors"></chart-line>
      </div>
    </card>
  </div>
</template>

<script>
import card from "../../components/Card.vue";
import chartLine from "../../components/chartLine.vue";
export default {
  components: {
    card, chartLine
  },
  data() {
    return {
      cardset: {
        title: "拆机（实时）",
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
      colors: ["#3096FC"]
    };
  },
  methods:{
      sendMsg:function() {
      const param = {
          dialogCompent:"cjTimeSed",
          dialogTitle:"拆机（实时）",
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