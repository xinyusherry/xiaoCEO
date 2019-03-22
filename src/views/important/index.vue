<template>
  <div class="moveDiv">
    <card :cardset="importantBus" :timetype="''">
      <el-button class="popBtn" type="primary" @click="sendMsg()" size="mini">指标选择</el-button>
      <div id="impLineChart" style="width:100%;height:calc(100% - 30px)"></div>
      <!-- {{receiveParams}} -->
    </card>
  </div>
</template>

<script>
import card from "../../components/Card.vue";
import { setTimeout } from 'timers';
const defaultParam = {
  width: "100%",
  leftcolor: "#F88A94",
  rightcolor: "#DA1936"
};
export default {
  components: { card },
  props:["receiveParams"],
  data() {
    return {
      importantBus: {
        title: "重点业务监控",
        ...defaultParam,
      },
      lineDataset:{
        xAxis: ["1月", "2月", "3月", "4月","5月","6月","7月","8月","9月","10月","11月","12月"],
        data: []
      }
    };
  },
  methods: {
    sendMsg:function() {
      const param = {
        dialogCompent:"importantCheck",
        dialogTitle:"指标选择",
      }
      this.$emit('headCallBack', param); //第一个参数是父组件中v-on绑定的自定义回调方法，第二个参数为传递的参数
    },
    drawLineChart(dataset){
      var thisChart = this.$echarts.init(document.getElementById("impLineChart"));
      thisChart.setOption({
          color: [
            "#c12e34",
            "#e6b600",
            "#0098d9",
            "#2b821d",
            "#005eaa",
            "#339ca8",
            "#cda819",
            "#32a487"
          ],
          legend:{
            data:dataset.data,
            right:20,
            textStyle:{
              color:"#fff"
            },
            top:12
          },
          grid: {
            containLabel: true,
            top: "18%",
            bottom: "8%",
            left:"5%",
            right:"5%"
          },
          tooltip: {
            trigger: "axis"
          },
          xAxis: {
            type: "category",
            boundaryGap: true,
            axisLabel:{
                color: "#fff"
            },
            axisLine: {
                lineStyle: {
                color: "#fff"
                }
            },
            splitLine: {
                show: false
            },
            axisTick: {
                show: false
            },
            data: dataset.xAxis
          },
          yAxis: {
            type: "value",
            nameTextStyle:{
                color: "#fff"
            },
            axisLabel:{
                color: "#fff",
            },
            axisLine: {
                lineStyle: {
                color: "#fff"
                }
            },
            splitLine: {
                show: false
            },
            axisTick: {
                show: false
            }
          },
          series: dataset.data
      });
      window.addEventListener("resize", () => { 
          thisChart.resize();
      });
    },
    changeData(){ //假数据 传入新数据时修改此方法
      let seriesData=[];
      for(let i=0;i<5;i++){
        let dataArr=[];
        for(let j=0;j<12;j++){
          dataArr.push(Math.floor(Math.random()*100));
        }
        seriesData.push({
          name:"名称"+(i+1),
          type:"line",
          data: dataArr
        });
      }
      this.$set(this.lineDataset,'data',seriesData);
    }
  },
  mounted(){
    setTimeout(()=>{
      this.changeData();
      this.drawLineChart(this.lineDataset);
    },0);
  }
};
</script>

<style scoped>
.moveDiv {
  width: 100%;
  height: 100%;
  position: relative;
}
.popBtn{
  position: absolute;
  top: 10px;
  right: 20px;
}
</style>