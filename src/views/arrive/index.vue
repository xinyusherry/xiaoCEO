<template>
  <div class="card">
    <div class="border"></div>
    <div class="titleDiv">
      <span class="title">到达</span>
      <div class="title_right">
        <div class="mr10">
          <el-radio-group v-model="isDay" @change="changeDay">
            <el-radio :label="'day'">日</el-radio>
            <el-radio :label="'month'">月</el-radio>
          </el-radio-group>
        </div>
        <span class="time">{{time}}</span>
      </div>
    </div>
    <div class="line"></div>
    <div class="main" @click="sendMsg(isDay)">
      <div class="main_top" v-if="indexNum">
        <div>
          <div class="spot"></div>
          <span class="desc ml10">宽带</span>
          <div class="lineChart">
            <chartLine :id="'drChart1'" :dataset="lr.chartLine.dataset" :color="lr.chartLine.colors"></chartLine>
          </div>
          <span class="desc">{{indexNum.KD_NUM}}</span>
        </div>
         <div>
          <div class="spot"></div>
          <span class="desc ml10">移动</span>
          <div class="lineChart">
            <chartLine :id="'drChart2'" :dataset="lr2.chartLine.dataset" :color="lr2.chartLine.colors"></chartLine>
          </div>
          <span class="desc">{{indexNum.YD_NUM}}</span>
        </div>
      </div>
      <div class="main_bottom" v-if="bottomData">
        <div>
          <p class="desc mb14">
            <!-- <span class="add">+</span> -->
            {{bottomData.JZ_USER_NUM}}
          </p>
          <p class="num_desc">用户净增</p>
        </div>
        <div>
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
            <p class="desc mb14" slot="reference">{{bottomData.STL}}%</p>
          </el-popover>
          <p class="num_desc">住宅用户渗透率</p>
        </div>
        <div class="brnone">
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
            <p class="desc mb14" slot="reference">{{bottomData.SZL}}%</p>
          </el-popover>
          <p class="num_desc">端口实占率</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import chartLine from "../../components/chartLineIndex.vue";
import { formatterTime } from "../../utils/index.js";
import qs from 'qs';
export default {
  components: { chartLine },
  data() {
    return {
      isDay: 'day',
      lr: {
        title: "利润",
        chartLine: {
          dataset: {
            xAxis: ["1月", "2月", "3月", "4月", "5月"],
            data: [100, 300, 200, 500, 400]
          },
          colors: ["#4B8459"]
        }
      },
         lr2: {
        title: "利润",
        chartLine: {
          dataset: {
            xAxis: ["1月", "2月", "3月", "4月", "5月"],
            data: [100, 300, 200, 500, 400]
          },
          colors: ["#4B8459"]
        }
      },
      indexNum:null,
      bottomData:null,
      time:""
    };
  },
  methods: {
    sendMsg: function() {
      const param = {
        dialogCompent: "arriveSecond",
        dialogTitle: "到达"
      };
      this.$emit("headCallBack", param); //第一个参数是父组件中v-on绑定的自定义回调方法，第二个参数为传递的参数
    },
    changeDay(val){
      this.getIndexNum(val)
    },
    getIndexNum(type){
      let _this = this;
      const params = {
        type:type
      }
        this.$axios
        .get(
          "/arrive/getIndexNum?" +
          qs.stringify({ JsonParam: JSON.stringify(params) })
        )
        .then(function(res) {
          console.log('到达',res)
          if (res.data.resultCode === "1") {
            let resultData = res.data.resultData;
            _this.indexNum = resultData;
            if(type === 'day'){
              _this.time = formatterTime(resultData.ACCT_DAY);
            }else{
               _this.time = formatterTime(resultData.ACCT_MONTH);
            }
            _this.gerLineData(type);
            _this.getIndexNumData();
          }
        })
        .catch(function(e) {});
    },
    gerLineData(type){
      let _this = this;
      const param = {
        type:_this.isDay
      }
      let merge = {};
      if(_this.isDay == 'day'){
        merge={
          dayId:_this.indexNum.ACCT_DAY
        }
      }else{
        merge={
          monthId:_this.indexNum.ACCT_MONTH
        }
      }
      const params = {
        ...param,
        ...merge
      }
      this.$axios
        .get(
          "/arrive/getLineData?" +
            qs.stringify({ JsonParam: JSON.stringify(params) })
        )
        .then(function(res) {
          console.log('折线',res)
          if (res.data.resultCode === "1") {
            let resultData = res.data.resultData;
            let xAxis = [],yAxis = [],yAxis2 = [];
            for(let i = 0;i<resultData.length;i++){
              xAxis.push(resultData[i].ACCT_DAY);
              yAxis.push(resultData[i].KD_NUM);
              yAxis2.push(resultData[i].YD_NUM);
              _this.lr.chartLine.dataset.xAxis = xAxis;
              _this.lr.chartLine.dataset.data = yAxis;
              _this.lr2.chartLine.dataset.xAxis = xAxis;
              _this.lr2.chartLine.dataset.data = yAxis2;
            }
          }
        })
        .catch(function(e) {});
    },
    getIndexNumData(){
       let _this = this;
      const param = {
        type:_this.isDay
      }
      let merge = {};
      if(_this.isDay == 'day'){
        merge={
          dayId:_this.indexNum.ACCT_DAY
        }
      }else{
        merge={
          monthId:_this.indexNum.ACCT_MONTH
        }
      }
      const params = {
        ...param,
        ...merge
      }
      this.$axios
        .get(
          "/arrive/getIndexNumData?" +
            qs.stringify({ JsonParam: JSON.stringify(params) })
        )
        .then(function(res) {
          if (res.data.resultCode === "1") {
            let resultData = res.data.resultData;
            _this.bottomData = resultData;
          }
        })
        .catch(function(e) {});
    }
  },
  mounted:function() {
    this.getIndexNum('day');
  }
};
</script>
<style>
.title_right .el-radio__inner {
  border-color: #7594c3 !important;
  background-color: #16325d !important;
}
</style>

<style lang="less" scoped>
.border {
  background: linear-gradient(to right, #dac5a1, #b7a57b);
}
.title_right {
  display: flex;
  justify-content: space-between;
  align-items: center;
  .el-radio-group label:nth-of-type(1) {
    margin-right: 15px;
  }
}
.mr10 {
  margin-right: 30px;
}
.line {
  background-color: #223f63;
  height: 2px;
  margin-top: 14px;
}
.main {
  display: flex;
  flex-direction: column;
  height: 81%;
  > div {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    &.main_top{
      display: flex;
      justify-content: space-between;
      align-items: center;
      >div{
         flex: 1;
         display: flex;
         justify-content: center;
         align-items: center;
      }
    }
    &.main_bottom {
      display: flex;
      justify-content: space-between;
      align-items: center;
      > div {
        flex: 1;
        justify-content: center;
        align-items: center;
        display: flex;
        flex-direction: column;
        border-right: 2px solid #223f63;
        &.brnone {
          border-right: none;
        }
      }
    }
  }
}
.spot {
  width: 10px;
  height: 10px;
  background-color: #5efefb;
  border-radius: 50%;
}
.desc {
  font-size: 20px;
}
.ml10 {
  margin-left: 10px;
}
.lineChart {
  height: 10%;
  width: 30%;
}
.add {
  color: #35c98e;
  font-size: 20px;
}
.mb14 {
  margin-bottom: 14px;
}
.num_desc {
  font-size: 20px;
  color: #7594c3;
}
</style>