<template>
  <div class="devTimeSed">
    <div class="dateDiv">
      <el-date-picker
        size="small"
        format="yyyy-MM-dd"
        value-format="yyyyMMdd"
        v-model="date"
        placeholder="选择日期"
        style="flex:0 0 130px;margin-left:20px"
      ></el-date-picker>
    </div>
    <div class="flex">
      <div class="flex-item" style="margin-right:10%">
        <div class="title blue">移动发展</div>
        <div>
          <span class="type">日</span>
          <span>{{progress.YD_VALUED}} / {{progress.YD_TARGETD}}</span>
        </div>
        <div>
          <span class="type now">月</span>
          <span>{{progress.YD_VALUEM_LJ}} / {{progress.YD_TARGETM}}</span>
        </div>
        <div class="flex-between">
          <span>日完成</span>
          <div style="width:60%">
            <el-progress
              :text-inside="false"
              :stroke-width="12"
              :percentage="progress.YD_PERCENTAGE_D"
              color="#6AFFFD"
              :show-text="false"
            ></el-progress>
          </div>
          <span>{{progress.YD_PERCENTAGE_D}}%</span>
        </div>
        <div class="flex-between">
          <span>月完成</span>
          <div style="width:60%">
            <el-progress
              :text-inside="false"
              :stroke-width="12"
              :percentage="progress.YD_PERCENTAGE_M"
              color="#6AFFFD"
              :show-text="false"
            ></el-progress>
          </div>
          <span>{{progress.YD_PERCENTAGE_M}}%</span>
        </div>
      </div>
      <div class="flex-item">
        <div class="title green">宽带发展</div>
        <div>
          <span class="type">日</span>
          <span>{{progress.KD_VALUED}} / {{progress.KD_TARGETD}}</span>
        </div>
        <div>
          <span class="type now">月</span>
          <span>{{progress.KD_VALUEM_LJ}} / {{progress.KD_TARGETM}}</span>
        </div>
        <div class="flex-between">
          <span>日完成</span>
          <div style="width:60%">
            <el-progress
              :text-inside="false"
              :stroke-width="12"
              :percentage="progress.KD_PERCENTAGE_D"
              color="#1AC175"
              :show-text="false"
            ></el-progress>
          </div>
          <span>{{progress.KD_PERCENTAGE_D}}%</span>
        </div>
        <div class="flex-between">
          <span>月完成</span>
          <div style="width:60%">
            <el-progress
              :text-inside="false"
              :stroke-width="12"
              :percentage="progress.KD_PERCENTAGE_M"
              color="#1AC175"
              :show-text="false"
            ></el-progress>
          </div>
          <span>{{progress.KD_PERCENTAGE_M}}%</span>
        </div>
      </div>
    </div>
    <div style="height:300px">
      <chart-bar
        :id="'devTimeBar'"
        :dataset="chartBar.dataset"
        :color="chartBar.colors"
        @CallBack="barHandleClick"
      ></chart-bar>
    </div>
  </div>
</template>

<script>
import qs from "qs";
import chartBar from "../../components/chartBar.vue";

export default {
  props: ["sendParams"],
  components: { chartBar },
  data() {
    return {
      chartBar: {
        dataset: {
          xAxis: [],
          data: []
        },
        colors: ["#F868AF", "#F25F19"]
      },
      date: this.sendParams.acctDay || "",
      progress: []
    };
  },
  methods: {
    post() {
      this.postProgress();
      this.postChart();
    },
    postProgress() {
      let _this = this;
      let params = {
        acctDay: this.date
      };
      this.$axios
        .get(
          "/DevelopRealTime/getYdKdData?" +
            qs.stringify({ JsonParam: JSON.stringify(params) })
        )
        .then(function(res) {
          let data = res.data;
          _this.progress = data.resultData;
        })
        .catch(function(e) {});
    },
    postChart() {
      let _this = this;
      let params = {
        acctDay: this.date
      };
      this.$axios
        .get(
          "/DevelopRealTime/getColumnData?" +
            qs.stringify({ JsonParam: JSON.stringify(params) })
        )
        .then(function(res) {
          let data = res.data;
          _this.chartBar.dataset.xAxis = data.resultData.map(v => v.NAME);
          _this.chartBar.dataset.data = [
            data.resultData.map(v => {
              return {
                name: "宽带",
                value: v.KD_NUM,
                zyxType: v.TYPE,
                devType: "KD"
              };
            }),
            data.resultData.map(v => {
              return {
                name: "移动",
                value: v.YD_NUM,
                zyxType: v.TYPE,
                devType: "YD"
              };
            })
          ];
        })
        .catch(function(e) {});
    },
    barHandleClick(barChart) {
      barChart.on("click", params => {
        const param = {
          dialogCompent: "dvlpTimeTrd",
          dialogTitle: "发展（实时）"
        };
        const thirdParams = {
          index: params.dataIndex,
          name: params.name,
          acctDay: this.date,
          zyxType: params.data.zyxType,
          devType: params.data.devType
        };
        this.$emit("headCallBack", param, thirdParams);
      });
    }
  },
  created() {
    this.post();
  },
  watch: {
    date(val) {
      this.post();
    }
  }
};
</script>

<style scoped lang="less">
.dateDiv {
  text-align: right;
  span {
    padding: 5px 30px;
    color: #fff;
    background-color: rgba(95, 182, 249, 0.5);
    border-radius: 3px;
  }
}
.flex {
  display: flex;
  justify-content: center;
  align-items: center;
  .flex-item {
    width: 30%;
    .title {
      position: relative;
      font-size: 18px;
      &::before {
        content: "";
        position: absolute;
        left: -20px;
        width: 5px;
        height: 22px;
        background: #fff;
      }
      &.blue {
        color: #6afffd;
        &::before {
          background: #6afffd;
        }
      }
      &.green {
        color: #1ac175;
        &::before {
          background: #1ac175;
        }
      }
    }
    > div {
      margin: 25px 0;
      color: #fff;
      font-size: 16px;
    }
  }
}
.flex-between {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.type {
  margin-right: 10px;
  padding: 2px 5px;
  &.now {
    background-color: #5fb6f9;
    border-radius: 50%;
    color: #6afffd;
  }
}
</style>