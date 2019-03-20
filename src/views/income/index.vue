<template>
  <div class="moveDiv" @click="sendMsg">
    <card :cardset="xs" :timetype="'month'" style="margin-right:10px;">
      <div class="cardCont flexard">
        <div style="font-size:50px">90%</div>
        <div style="color: #7594C3;">12 392 192.23（元）</div>
        <div style="width:100%; height:120px">
          <chartLine :id="'xsIncomeChart'" :dataset="xs.chartLine.dataset" :color="xs.chartLine.colors"></chartLine>
        </div>
      </div>
    </card>
    <div class="content">
      <card :cardset="dy" :timetype="''" style="height:calc(50% - 5px);">
        <div class="cardCont flexcc">
          <div class="progressDiv">
            <div class="dark"><el-progress :text-inside="false" :stroke-width="9" :percentage="80.99" :show-text="false"></el-progress></div>
          </div>
          <div class="numDiv">88%</div>
        </div>
      </card>
      <card :cardset="lj" :timetype="''" style="height:calc(50% - 5px);">
        <div class="cardCont flexcc">
          <div class="progressDiv">
            <div class="dark"><el-progress :text-inside="false" :stroke-width="9" :percentage="80.99" :show-text="false"></el-progress></div>
          </div>
          <div class="numDiv">88%</div>
        </div>
      </card>
    </div>
  </div>
</template>

<script>
import card from "../../components/Card.vue";
import chartLine from "../../components/chartLineIndex.vue";
const defaultParam = {
  leftcolor: "#FAD961",
  rightcolor: "#F76B1C"
};
export default {
  components: { card,chartLine },
  data() {
    return {
      xs: {
        title: "序时收入预算完成率",
        ...defaultParam,
        width: "calc(50% - 5px)",
        chartLine:{
          dataset: {
              xAxis:["1月","2月","3月","4月","5月"],
              data: [100,300,200,500,400],
          },
          colors: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [{
                offset: 0, color: '#FAD961' // 0% 处的颜色
            }, {
                offset: 1, color: '#F76B1C' // 100% 处的颜色
            }],
            global: false // 缺省为 false
          }
        }
      },
      dy: {
        title: "当月收入预算完成率",
        ...defaultParam
      },
      lj: {
        title: "累计收入预算完成率",
        ...defaultParam
      }
    };
  },
  methods: {
      sendMsg:function() {
      const param = {
        dialogCompent:"incomeSed",
        dialogTitle:"收入",
      }
      this.$emit('headCallBack', param); //第一个参数是父组件中v-on绑定的自定义回调方法，第二个参数为传递的参数
    }
  }
};
</script>


<style scoped lang="less">
.moveDiv {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
}
.content{
  width: ~"calc(50% - 5px)";
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.cardCont{
  width: 100%;
  height: ~"calc(100% - 30px)";
  display: flex;
}
.flexard{
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-direction: column;
  height: ~"calc(100% - 50px)";
  margin-top: 20px;
}
.flexcc{
  display: flex;
  justify-content: center;
  align-items: center;
}
.numDiv{
  font-size: 28px;
}
.progressDiv{
  width: 60%;
  .dark{
    width: 90%;
  }
}
</style>