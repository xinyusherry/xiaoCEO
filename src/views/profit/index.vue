<template>
  <div class="moveDiv" @click="sendMsg">
    <card :cardset="zlr" :timetype="'month'" style="margin-right:10px;">
      <div class="warpper">
        <h3 class="hj_unit">
          ￥&nbsp;&nbsp;
          <span class="hj">(合计值)</span>
        </h3>
        <el-popover
          placement="top"
          width="300"
          trigger="hover">
          <div style="color:#fff">
            <p>单元类型（农村/城市）</p>  
            <p>市公司排名xxx  平均完成率 xxxx</p>
            <p>同类单元排名 xxxx 平均完成率  xxxxx</p> 
            <p>分公司排名xxx 平均完成率 xxxx</p>
          </div>
          <h3 class="total_num" slot="reference">143,434,344,345,354</h3>
        </el-popover>
        <div class="line">
          <chartLine :id="'zlrChart'" :dataset="zlr.chartLine.dataset" :color="zlr.chartLine.colors"></chartLine>
        </div>
      </div>
    </card>
    <card :cardset="lr" :timetype="'month'">
      <div class="warpper">
        <h3 class="hj_unit">
          ￥&nbsp;&nbsp;
          <span class="hj">(合计值)</span>
        </h3>
        <el-popover
          placement="top"
          width="300"
          trigger="hover">
          <div style="color:#fff">
            <p>单元类型（农村/城市）</p>  
            <p>市公司排名xxx  平均完成率 xxxx</p>
            <p>同类单元排名 xxxx 平均完成率  xxxxx</p> 
            <p>分公司排名xxx 平均完成率 xxxx</p>
          </div>
          <h3 class="total_num" slot="reference">143,434,344,345,354</h3>
        </el-popover>
        <div class="line">
            <chartLine :id="'lrChart'" :dataset="lr.chartLine.dataset" :color="lr.chartLine.colors"></chartLine>
        </div>
      </div>
    </card>
  </div>
</template>

<script>
import card from "../../components/Card.vue";
import chartLine from "../../components/chartLineIndex.vue";
const defaultParam = {
  width: "calc(50% - 5px)",
  leftcolor: "#A4B1CB",
  rightcolor: "#6B799C"
};
export default {
  components: { card,chartLine },
  data() {
    return {
      zlr: {
        title: "准利润",
        ...defaultParam,
        chartLine:{
          dataset: {
              xAxis:["1月","2月","3月","4月","5月"],
              data: [100,300,200,500,400],
          },
          colors: ["#CB68FC"]
        }
      },
      lr: {
        title: "利润",
        ...defaultParam,
        chartLine:{
          dataset: {
              xAxis:["1月","2月","3月","4月","5月"],
              data: [100,300,200,500,400],
          },
          colors: ["#62B58F"]
        }
      }
    };
  },
  methods: {
      sendMsg:function() {
      const param = {
        dialogCompent:"profitSed",
        dialogTitle:"利润、准利润",
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
  justify-content: space-between;
}
.warpper {
  padding: 0 10px;
}
.hj_unit {
  color: #ffffff;
  font-size: 18px;
  margin-top: 20px;
}
.hj {
  color: #7594c3;
  font-size: 15px;
}
.total_num {
  color: #ffffff;
  font-size: 26px;
  margin-top: 20px;
}
.line{
  height: 140px;
}
</style>