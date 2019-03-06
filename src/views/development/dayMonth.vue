<template>
  <div class="moveDiv">
    <card :cardset="day.cardset" :timetype="'day'">
      <div class="card-content">
        <div class="bigNum">
          {{day.developDay.value}}
          <img
            :src="require(`../../assets/images/icon-${day.developDay.up?'up':'down'}.png`)"
          >
        </div>
        <chart-pie :id="'pieDay'" :dataset="day.developDay.dataset" :color="day.colors"></chart-pie>
      </div>
    </card>
    <card :cardset="month.cardset" :timetype="'month'">
      <div class="card-content">
        <div class="bigNum">
          {{month.developMonth.value}}
          <img
            :src="require(`../../assets/images/icon-${month.developMonth.up?'up':'down'}.png`)"
          >
        </div>
        <chart-pie :id="'pieMonth'" :dataset="month.developMonth.dataset" :color="month.colors"></chart-pie>
      </div>
    </card>
  </div>
</template>

<script>
import card from "../../components/Card.vue";
import chartPie from "../../components/chartPie.vue";
export default {
  components: {
    card: card,
    chartPie: chartPie
  },
  data() {
    return {
      day: {
        cardset: {
          title: "发展（日）",
          width: "calc(50% - 9px)",
          leftcolor: "#DAC5A1",
          rightcolor: "#B7A57B"
        },
        developDay: {
          value: 35,
          up: true,
          dataset: [
            {
              name: "固话",
              value: 5
            },
            {
              name: "移动",
              value: 15
            }
          ]
        },
        colors: ["#1AC175", "#1B8CEA"]
      },
      month: {
        cardset: {
          title: "发展（月）",
          width: "calc(50% - 9px)",
          leftcolor: "#DAC5A1",
          rightcolor: "#B7A57B"
        },
        developMonth: {
          value: 325,
          up: false,
          dataset: [
            {
              name: "固话",
              value: 120
            },
            {
              name: "移动",
              value: 200
            }
          ]
        },
        colors: ["#EDC624", "#F84F4F"]
      }
    };
  }
};
</script>

<style scoped>
.moveDiv {
  width: 100%;
  height: 100%;
  display: flex;
}
</style>