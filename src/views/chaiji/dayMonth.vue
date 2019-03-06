<template>
  <div class="moveDiv">
    <card :cardset="day.cardset" :timetype="'day'">
      <div class="card-content">
        <div class="bigNum">
          {{day.cjDay.value}}
          <img
            :src="require(`../../assets/images/icon-${day.cjDay.up?'up':'down'}.png`)"
          >
        </div>
        <stack-bar :id="'cjdaybar'" :dataset="day.cjDay.dataset" :color="day.colors"></stack-bar>
      </div>
    </card>
    <card :cardset="month.cardset" :timetype="'month'">
      <div class="card-content">
        <div class="bigNum">
          {{month.cjMonth.value}}
          <img
            :src="require(`../../assets/images/icon-${month.cjMonth.up?'up':'down'}.png`)"
          >
        </div>
        <stack-bar :id="'cjmonthbar'" :dataset="month.cjMonth.dataset" :color="month.colors"></stack-bar>
      </div>
    </card>
  </div>
</template>

<script>
import card from "../../components/Card.vue";
import stackBar from "../../components/stackBar.vue";
export default {
  components: { card, stackBar },
  data() {
    return {
      day: {
        cardset: {
          title: "拆机（日）",
          width: "calc(50% - 9px)",
          leftcolor: "#DAC5A1",
          rightcolor: "#B7A57B"
        },
        cjDay: {
          value: 10,
          up: true,
          dataset: {
            legendData: ["主拆", "欠拆"],
            xAxis: ["移网", "固网"],
            data: {
              ywData: [
                {
                  name: "主拆",
                  value: 5
                },
                {
                  name: "欠拆",
                  value: 15
                }
              ],
              gwData: [
                {
                  name: "主拆",
                  value: 5
                },
                {
                  name: "欠拆",
                  value: 15
                }
              ]
            }
          }
        },
        colors: ["#EDC624", "#1AC175"]
      },
      month: {
        cardset: {
          title: "拆机（月）",
          width: "calc(50% - 9px)",
          leftcolor: "#DAC5A1",
          rightcolor: "#B7A57B"
        },
        cjMonth: {
          value: 125,
          up: false,
          dataset: {
            legendData: ["主拆", "欠拆"],
            xAxis: ["移网", "固网"],
            data: {
              ywData: [
                {
                  name: "主拆",
                  value: 5
                },
                {
                  name: "欠拆",
                  value: 15
                }
              ],
              gwData: [
                {
                  name: "主拆",
                  value: 5
                },
                {
                  name: "欠拆",
                  value: 15
                }
              ]
            }
          }
        },
        colors: ["#F25F19", "#1B8CEA"]
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