<template>
  <div class="moveDiv" v-on:click="sendMsg(thirdParams)" 
    v-loading="loading"
    element-loading-text="Loading"
    element-loading-background="rgba(0, 0, 0, 0.8)"
  >
    <card :cardset="day.cardset" :timetype="'day'" style="margin-right:10px" :propsTime="day.time">
      <div class="card-content" >
        <div class="bigNum">
          {{day.cjDay.value}}
        
        </div>
        <stack-bar :id="'cjdaybar'" :dataset="day.cjDay.dataset" :color="day.colors" v-if="alaxEnd"></stack-bar>
      </div>
    </card>
    <card :cardset="month.cardset" :timetype="'month'" :propsTime="month.time">
      <div class="card-content">
        <div class="bigNum">
          {{month.cjMonth.value}}
        </div>
        <stack-bar :id="'cjmonthbar'" :dataset="month.cjMonth.dataset" :color="month.colors" v-if="alaxEnd"></stack-bar>
      </div>
    </card>
  </div>
</template>

<script>
import card from "../../components/Card.vue";
import stackBar from "../../components/stackBar.vue";
import { formatterTime } from "../../utils/index.js";
export default {
  components: { card, stackBar },
  data() {
    return {
      loading:true,
      alaxEnd:false,
      thirdParams:null,
      day: {
        cardset: {
          title: "拆机（日）",
          width: "calc(50% - 5px)",
          leftcolor: "#DAC5A1",
          rightcolor: "#B7A57B"
        },
        cjDay: {
          value: 0,
          dataset: {
            legendData: ["主拆", "欠拆"],
            xAxis: ["移动", "固网"],
            data: {
              ywData: [
                {
                  name: "移动主拆",
                  value: 0
                },
                {
                  name: "移动欠拆",
                  value: 0
                }
              ],
              gwData: [
                {
                  name: "固网主拆",
                  value: 0
                },
                {
                  name: "固网欠拆",
                  value: 0
                }
              ]
            }
          }
        },
        colors: ["#EDC624", "#1AC175"],
        time:""
      },
      month: {
        cardset: {
          title: "拆机（月）",
          width: "calc(50% - 5px)",
          leftcolor: "#DAC5A1",
          rightcolor: "#B7A57B"
        },
        cjMonth: {
          value: 0,
          dataset: {
            legendData: ["主拆", "欠拆"],
            xAxis: ["移动", "固网"],
            data: {
              ywData: [
                {
                  name: "移动主拆",
                  value: 0
                },
                {
                  name: "移动欠拆",
                  value: 0
                }
              ],
              gwData: [
                {
                  name: "固网主拆",
                  value: 0
                },
                {
                  name: "固网欠拆",
                  value: 0
                }
              ]
            }
          }
        },
        colors: ["#F25F19", "#1B8CEA"],
        time:""
      }
    };
  },
  methods:{
      sendMsg:function(thirdParams) {
      const param = {
        dialogCompent:"cjDayMonthDetail",
        dialogTitle:"拆机",
      }
      this.$emit('headCallBack', param,thirdParams); //第一个参数是父组件中v-on绑定的自定义回调方法，第二个参数为传递的参数
    },
    getData(){
        let that = this;
      this.$axios
        .get("/Dismantlery/index")
        .then(function(res) {
          if (res.data.resultCode === "1") {
            let resultDataD = res.data.resultDataD[0];
            that.day.time = formatterTime(resultDataD.ACCT_DAY);
            that.day.cjDay.value = resultDataD.CJ_ALL_NUM;
            that.day.cjDay.dataset.data.ywData[0].value = resultDataD.CJ_YDZD_NUM;
            that.day.cjDay.dataset.data.ywData[1].value = resultDataD.CJ_YDQF_NUM;
            that.day.cjDay.dataset.data.gwData[0].value = resultDataD.CJ_GWZD_NUM;
            that.day.cjDay.dataset.data.gwData[1].value = resultDataD.CJ_GWQF_NUM;
            
            let resultDataM = res.data.resultDataM[0];
            that.month.time = formatterTime(resultDataM.ACCT_MONTH);
            that.month.cjMonth.value = resultDataM.CJ_ALL_NUM;
            that.month.cjMonth.dataset.data.ywData[0].value = resultDataM.CJ_YDZD_NUM;
            that.month.cjMonth.dataset.data.ywData[1].value = resultDataM.CJ_YDQF_NUM;
            that.month.cjMonth.dataset.data.gwData[0].value = resultDataM.CJ_GWZD_NUM;
            that.month.cjMonth.dataset.data.gwData[1].value = resultDataM.CJ_GWQF_NUM;
            let thirdParams = {};
            thirdParams.dayId = resultDataD.ACCT_DAY;
            thirdParams.monthId = resultDataM.ACCT_MONTH;
            that.thirdParams = thirdParams;
            that.alaxEnd = true;
            that.loading = false;
          }
        })
        .catch(function(e) {
        });
    }
  },
  mounted:function(){
    this.getData();
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