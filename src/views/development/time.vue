<template>
  <div class="moveDiv" @click="sendMsg">
    <card :cardset="cardset" :timetype="'time'" :propsTime="cardTime">
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
        dataset: {
          xAxis: [],
          data: []
        }
      },
      colors: ["#F7E43C", "#3E6BCE"],
      acctDay: "",
      cardTime:''
    };
  },
  created() {
    this.post();
  },
  methods: {
    sendMsg: function() {
      const param = {
        dialogCompent: "dvlpTimeSed",
        dialogTitle: "发展（实时）"
      };
      const thirdParams = {
        acctDay: this.acctDay
      };
      //console.log("日期：", this.acctDay);
      this.$emit("headCallBack", param, thirdParams); //第一个参数是父组件中v-on绑定的自定义回调方法，第二个参数为传递的参数
    },
    post() {
      let _this = this;
      this.$axios
        .post("/DevelopRealTime/index")
        .then(function(res) {
          let data = res.data;
          _this.acctDay = data.resultDataKD[data.resultDataKD.length - 1].date;
          _this.developOnTime.dataset.xAxis = data.resultDataYD.map((v, i) => {
            return v.ACCT_HOUR;
          });
          _this.developOnTime.dataset.data[0] = data.resultDataKD.map(v => {
            return {
              name: v.SVC_TYPE === "KD" ? "宽带" : "移动",
              value: v.YD_VALUED
            };
          });
          _this.developOnTime.dataset.data[1] = data.resultDataYD.map(v => {
            return {
              name: v.SVC_TYPE === "KD" ? "宽带" : "移动",
              value: v.YD_VALUED
            };
          });
        })
        .catch(function(e) {
        });
    }
  },
  watch: {
    acctDay(newValue, oldValue) {
      if (newValue.search(/-/) === -1 && newValue.search(/年/) === -1) {
        if (newValue.length === 6) {
          this.cardTime = [newValue.substr(0, 4), newValue.substr(4, 2)].join(
            "-"
          );
        } else if (newValue.length === 8) {
          this.cardTime = [
            newValue.substr(0, 4),
            newValue.substr(4, 2),
            newValue.substr(6, 2)
          ].join("-");
        }
      } else {
        this.cardTime = newValue;
      }
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