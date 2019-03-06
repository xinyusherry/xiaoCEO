<template>
  <card :cardset="cardset" :timetype="'time'">
    <div class="card-content">
      <chart-line :id="'lineTime'" :dataset="developOnTime.dataset" :color="colors"></chart-line>
    </div>
  </card>
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
  }
};
</script>

<style scoped>
</style>