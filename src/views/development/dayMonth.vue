<template>
  <div class="moveDiv">
    <card
      :cardset="day.cardset"
      :timetype="'day'"
      style="margin-right:10px"
     
    >
      <div class="card-content" v-on:click="sendMsg">
        <div class="bigNum">
          {{day.developDay.value}}
          <img
            :src="require(`../../assets/images/icon-${day.developDay.up?'up':'down'}.png`)"
          >
        </div>
        <chart-pie
          :id="'pieDay'"
          :dataset="day.developDay.dataset"
          :color="day.colors"
          :legend="day.legend"
        ></chart-pie>
      </div>
    </card>
    <card :cardset="month.cardset" :timetype="'month'" >
      <div class="card-content" v-on:click="sendMsg">
        <div class="bigNum">
          {{month.developMonth.value}}
          <img
            :src="require(`../../assets/images/icon-${month.developMonth.up?'up':'down'}.png`)"
          >
        </div>
        <chart-pie
          :id="'pieMonth'"
          :dataset="month.developMonth.dataset"
          :color="month.colors"
          :legend="month.legend"
        ></chart-pie>
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
          width: "calc(50% - 5px)",
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
        colors: ["#1AC175", "#1B8CEA"],
        legend: ["固话", "移动"]
      },
      month: {
        cardset: {
          title: "发展（月）",
          width: "calc(50% - 5px)",
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
        colors: ["#EDC624", "#F84F4F"],
        legend: ["固话", "移动"]
      }
    };
  },
  methods: {
    sendMsg:function() {
      this.$emit('headCallBack', "Comp1"); //第一个参数是父组件中v-on绑定的自定义回调方法，第二个参数为传递的参数
    }
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