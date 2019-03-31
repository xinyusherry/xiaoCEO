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
        <div>
          <span class="title blue">主动拆机</span>
        </div>
        <div>
          <span>{{topData.CJ_ZD}} / {{topData.TOTAL}}</span>
        </div>
      </div>
      <div class="flex-item">
        <div>
          <span class="title green">被动拆机</span>
        </div>
        <div>
          <span>{{topData.CJ_BD}} / {{topData.TOTAL}}</span>
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
      date: this.sendParams.dayId || "",
      topData: {}
    };
  },
  methods: {
    post() {
      this.postTop();
      this.postChart();
    },
    postTop() {
      let _this = this;
      let params = {
        dayId: this.date
      };
      this.$axios
        .get(
          "/dismantleRealTime/getTopNum?" +
            qs.stringify({ JsonParam: JSON.stringify(params) })
        )
        .then(function(res) {
          let data = res.data;
          _this.topData = data.resultData;
        })
        .catch(function(e) {});
    },
    postChart() {
      let _this = this;
      let params = {
        dayId: this.date
      };
      this.$axios
        .get(
          "/dismantleRealTime/getBarData?" +
            qs.stringify({ JsonParam: JSON.stringify(params) })
        )
        .then(function(res) {
          let data = res.data;
          _this.chartBar.dataset.xAxis = data.resultData.map(v => {
            switch (v.SVC_TYPE) {
              case "01":
                return "营业厅";
                break;
              case "02":
                return "社会渠道";
                break;
              case "03":
                return "其他";
                break;
            }
          });
          _this.chartBar.dataset.data = [[], []];
          data.resultData.map(v => {
            _this.chartBar.dataset.data[0].push({
              name: "主拆",
              value: v.CJ_ZD,
              svcType:v.SVC_TYPE
            });
            _this.chartBar.dataset.data[1].push({
              name: "被拆",
              value: v.CJ_BD,
              svcType:v.SVC_TYPE
            });
          });
        })
        .catch(function(e) {});
    },
    barHandleClick(barChart) {
      barChart.on("click", params => {
        const param = {
          dialogCompent: "cjTimeTrd",
          dialogTitle: "拆机（实时）"
        };
        const thirdParams = {
          index: params.dataIndex,
          name: params.name,
          dayId:this.date,
          svcType:params.data.svcType
        };
        this.$emit("headCallBack", param, thirdParams);
      });
    }
  },
  created() {
    this.post();
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
    text-align: center;
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