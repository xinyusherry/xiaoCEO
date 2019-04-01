<template>
  <div class="moveDiv" v-on:click="sendMsg">
    <card :cardset="day.cardset" :timetype="'day'" style="margin-right:10px" :propsTime="day.time">
      <div class="card-content">
        <div class="bigNum">
          {{day.developDay.value}}
          <!-- <img
            :src="require(`../../assets/images/icon-${day.developDay.up?'up':'down'}.png`)"
          >-->
        </div>
        <chart-pie
          :id="'pieDay'"
          :dataset="day.developDay.dataset"
          :color="day.colors"
          :legend="day.legend"
          v-if="alaxEnd"
        ></chart-pie>
      </div>
    </card>
    <card :cardset="month.cardset" :timetype="'month'" :propsTime="month.time">
      <div class="card-content">
        <div class="bigNum">
          {{month.developMonth.value}}
          <!-- <img
            :src="require(`../../assets/images/icon-${month.developMonth.up?'up':'down'}.png`)"
          >-->
        </div>
        <chart-pie
          :id="'pieMonth'"
          :dataset="month.developMonth.dataset"
          :color="month.colors"
          :legend="month.legend"
           v-if="alaxEnd"
        ></chart-pie>
      </div>
    </card>
  </div>
</template>

<script>
import card from "../../components/Card.vue";
import chartPie from "../../components/chartPie.vue";
import { formatterTime } from "../../utils/index.js";
export default {
  components: {
    card: card,
    chartPie: chartPie
  },
  data() {
    return {
      alaxEnd:false,
      day: {
        cardset: {
          title: "发展（日）",
          width: "calc(50% - 5px)",
          leftcolor: "#DAC5A1",
          rightcolor: "#B7A57B"
        },
        developDay: {
          value: 0,
          // up: true,
          dataset: [
            {
              name: "固网",
              value: 0
            },
            {
              name: "移网",
              value: 0
            }
          ]
        },
        colors: ["#1AC175", "#1B8CEA"],
        legend: ["固网", "移网"],
        time: ""
      },
      month: {
        cardset: {
          title: "发展（月）",
          width: "calc(50% - 5px)",
          leftcolor: "#DAC5A1",
          rightcolor: "#B7A57B"
        },
        developMonth: {
          value: 0,
          // up: false,
          dataset: [
            {
              name: "固网",
              value: 0
            },
            {
              name: "移网",
              value: 0
            }
          ]
        },
        colors: ["#EDC624", "#F84F4F"],
        legend: ["固网", "移网"],
        time: ""
      }
    };
  },
  methods: {
    sendMsg: function() {
      const param = {
        dialogCompent: "dayMonthDetail",
        dialogTitle: "发展"
      };
      let sendDate = {
        dateD: this.day.time,
        dateM: this.month.time,
      }
      this.$emit("headCallBack", param,sendDate); //第一个参数是父组件中v-on绑定的自定义回调方法，第二个参数为传递的参数
    },
    getData() {
       let that = this;
      this.$axios
        .post("/Developry/index")
        .then(function(res) {
          if (res.data.resultCode === "1") {
            let resultData = res.data.resultData;
            // let dataset = [];
            // let dataset_M = [];
            //console.log("发展日月",res);
            for (let i = 0, len = resultData.length; i < len; i++) {
              switch (resultData[i].SVC_TYPE) {
                case "GW_D":
                  that.day.developDay.dataset[0].value = resultData[i].NUM;
                  let time = formatterTime(resultData[i].TIME);
                  that.day.time = time;
                  break;
                case "YW_D":
                  that.day.developDay.dataset[1].value = resultData[i].NUM;
                  break;
                case "SUM_D":
                  that.day.developDay.value = resultData[i].NUM;
                  break;
                case "GW_M":
                  that.month.developMonth.dataset[0].value = resultData[i].NUM;
                  let timeM = formatterTime(resultData[i].TIME);
                  that.month.time = timeM;
                  break;
                case "YW_M":
                  that.month.developMonth.dataset[1].value = resultData[i].NUM;
                  break;
                case "SUM_M":
                  that.month.developMonth.value = resultData[i].NUM;
                  break;

                default:
                  break;
              }
            }
            that.alaxEnd = true;
          }
        })
        .catch(function(e) {
          console.error(e)
        });
    }
  },
  mounted: function() {
    // this.getData()
  },
  created:function(){
    this.getData()
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