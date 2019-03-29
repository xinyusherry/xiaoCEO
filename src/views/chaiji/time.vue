<template>
  <div class="moveDiv" @click="sendMsg">
    <card :cardset="cardset" :timetype="'time'" :propsTime="cardTime">
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
    card,
    chartLine
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
        dataset: {
          xAxis: [],
          data: []
        }
      },
      colors: ["#F7E43C", "#3E6BCE"],
      maxHour: "",
      date: "",
      cardTime: ""
    };
  },
  methods: {
    sendMsg: function() {
      const param = {
        dialogCompent: "cjTimeSed",
        dialogTitle: "拆机（实时）"
      };
      const thirdParams = {
        dayId: this.date
      };
      this.$emit("headCallBack", param, thirdParams); //第一个参数是父组件中v-on绑定的自定义回调方法，第二个参数为传递的参数
    },
    post() {
      let _this = this;
      this.$axios
        .post("/dismantleRealTime/getIndexNum")
        .then(function(res) {
          // console.log("拆机实时：", res);
          let data = res.data;
          _this.developOnTime.dataset.xAxis = [];
          _this.developOnTime.dataset.data = [];
          for (let i = 0; i < data.resultData.length; i++) {
            if (data.resultData[i].ACCT_HOUR) {
              _this.developOnTime.dataset.xAxis.push(
                data.resultData[i].ACCT_HOUR
              );
            } else if (data.resultData[i].MAX_ACCT_HOUR) {
              _this.maxHour = data.resultData[i].MAX_ACCT_HOUR;
              // } else if (data.resultData[i].date) {
            } else {
              _this.date = data.resultData[i].date;
            }
          }
          _this.developOnTime.dataset.data = [
            data.resultData.map(v => {
              return {
                type: v.SVC_TYPE,
                value: v.YD_VALUED
              };
            })
          ];
        })
        .catch(function(e) {});
    }
  },
  created() {
    this.post();
  },
  watch: {
    date(newValue, oldValue) {
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