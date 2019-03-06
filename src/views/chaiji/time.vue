<template>
  <card :cardset="cardset" :timetype="'time'">
    <div class="card-content">
      <chart-line :id="'cjlineTime'" :dataset="developOnTime.dataset" :color="colors"></chart-line>
    </div>
  </card>
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
  }
};
</script>

<style scoped>
.card-content{
  width: 100%;
  height: 100%;
}
</style>