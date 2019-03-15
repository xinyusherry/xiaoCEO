<template>
  <div class="moveDiv" @click="sendMsg">
    <card :cardset="day.cardset" :timetype="'day'" style="margin-right:10px">
      <div class="card-content">
        <div class="bigNum">
          {{day.cjDay.value}}
          <img :src="require(`../../assets/images/icon-${day.cjDay.up?'up':'down'}.png`)">
        </div>
        <p class="big_num_desc">续约数</p>
        <div class="precent">
          <el-progress :percentage="25" color="#68FCFC" style="width:70%" :show-text="false" :stroke-width="12" ></el-progress>
          <h3 class="precent_text">25
            <span class="unit">%</span>
          </h3>
        </div>
         <p class="big_num_desc">到期数  100</p>
      </div>
    </card>
    <card :cardset="month.cardset" :timetype="'month'">
      <div class="card-content">
        <div class="bigNum">
          {{month.cjMonth.value}}
          <img :src="require(`../../assets/images/icon-${month.cjMonth.up?'up':'down'}.png`)">
        </div>
        <p class="big_num_desc">趸交数</p>
        <div class="precent">
          <el-progress :percentage="25" color="#68FCFC" style="width:70%" :show-text="false" :stroke-width="12" ></el-progress>
          <h3 class="precent_text">25<span class="unit">%</span></h3>
        </div>
         <p class="big_num_desc">到期数  100</p>
      </div>
    </card>
  </div>
</template>

<script>
import card from "../../components/Card.vue";
export default {
  components: { card },
  data() {
    return {
      day: {
        cardset: {
          title: "到期预警",
          width: "calc(50% - 5px)",
          leftcolor: "#53A0FD",
          rightcolor: "#85B62E"
        },
        cjDay: {
          value: 10,
          up: true
        }
      },
      month: {
        cardset: {
          title: "到期预警",
          width: "calc(50% - 5px)",
          leftcolor: "#53A0FD",
          rightcolor: "#85B62E"
        },
        cjMonth: {
          value: 125,
          up: false
        }
      }
    };
  },
  methods: {
      sendMsg:function() {
      const param = {
        dialogCompent:"warningSecond",
        dialogTitle:"到期预警",
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
  display: flex;
}
.big_num_desc{
    font-size: 20px;
    text-align: center;
    color: #7594C3;
    margin-right: 31px;
}
.precent {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 20px;
}
.precent_text {
  font-size: 26px;
  margin-left: 20px;
  color: #9db1d1;
}
.unit {
  font-size: 18px;
}
</style>