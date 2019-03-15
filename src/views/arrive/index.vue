<template>
  <div class="card">
    <div class="border"></div>
    <div class="titleDiv">
      <span class="title">到达</span>
      <div class="title_right">
        <div class="mr10">
          <el-radio-group v-model="isDay">
            <el-radio :label="1">日</el-radio>
            <el-radio :label="0">月</el-radio>
          </el-radio-group>
        </div>
        <span class="time">2019-3-15</span>
      </div>
    </div>
    <div class="line"></div>
    <div class="main">
      <div>
        <div class="spot"></div>
        <span class="desc ml10">到达</span>
        <div class="lineChart">
          <chartLine :id="'drChart'" :dataset="lr.chartLine.dataset" :color="lr.chartLine.colors"></chartLine>
        </div>
        <span class="desc">231244</span>
      </div>
      <div class="main_bottom">
        <div>
          <p class="desc mb14"><span class="add">+</span>25</p>
          <p class="num_desc">用户净增</p>
        </div>
        <div>
          <p class="desc mb14">25%</p>
          <p class="num_desc">住宅用户渗透率</p>
        </div>
        <div class="brnone">
          <p class="desc mb14">25%</p>
          <p class="num_desc">端口实占率</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import chartLine from "../../components/chartLineIndex.vue";
export default {
  components: { chartLine },
  data() {
    return {
      isDay: 1,
      lr: {
        title: "利润",
        chartLine: {
          dataset: {
            xAxis: ["1月", "2月", "3月", "4月", "5月"],
            data: [100, 300, 200, 500, 400]
          },
          colors: ["#4B8459"]
        }
      }
    };
  },
  mounted() {},
  methods: {}
};
</script>
<style>
.title_right .el-radio__inner {
  border-color: #7594c3 !important;
  background-color: #16325d !important;
}
.el-radio-group label:nth-of-type(1) {
  margin-right: 15px;
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
        &.brnone{
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
  height: 30%;
  width: 20%;
  margin-bottom: 13px;
}
.add{
  color: #35c98e;
  font-size: 20px;
}
.mb14{
  margin-bottom: 14px;
}
.num_desc{
    font-size: 20px;
    color: #7594C3;
}
</style>