<template>
  <div class="moveDiv" @click="sendMsg"
   v-loading="loading"
    element-loading-text="Loading"
    element-loading-background="rgba(0, 0, 0, 0.8)"
  >
    <card :cardset="xq" :timetype="''" :propsTime="cardTime" style="margin-right:10px;">
      <div class="cardCont flexcc">
        <div style="font-size:56px">{{xqData.XQ_NUM}}</div>
      </div>
    </card>
    <div class="content">
      <card :cardset="sjxq" :timetype="''" style="height:calc(50% - 5px);">
        <div class="cardCont">
          <div class="numDiv flexcc">
            <div>{{xqData.SJ_XQ_NUM}}</div>
          </div>
          <div class="progressDiv flexcc">
            <div class="textDiv">
              <span>占比</span>
              <span>{{xqData.SJZB}}%</span>
            </div>
            <div class="dark">
              <el-progress
                :text-inside="false"
                :stroke-width="9"
                :percentage="xqData.SJZB"
                :show-text="false"
              ></el-progress>
            </div>
          </div>
        </div>
      </card>
      <card :cardset="dsxq" :timetype="''" style="height:calc(50% - 5px);">
        <div class="cardCont">
          <div class="numDiv flexcc">
            <div>{{xqData.DS_XQ_NUM}}</div>
          </div>
          <div class="progressDiv flexcc">
            <div class="textDiv">
              <span>占比</span>
              <span>{{xqData.DSZB}}%</span>
            </div>
            <div class="dark">
              <el-progress
                :text-inside="false"
                :stroke-width="9"
                :percentage="xqData.DSZB"
                :show-text="false"
              ></el-progress>
            </div>
          </div>
        </div>
      </card>
    </div>
  </div>
</template>

<script>
import qs from "qs";
import card from "../../components/Card.vue";
const defaultParam = {
  leftcolor: "#FAD961",
  rightcolor: "#F76B1C"
};
export default {
  components: { card },
  data() {
    return {
      loading:true,
      xq: {
        title: "小区数",
        ...defaultParam,
        width: "calc(50% - 5px)"
      },
      sjxq: {
        title: "双降小区",
        ...defaultParam
      },
      dsxq: {
        title: "低渗小区",
        ...defaultParam
      },
      xqData: {},
      date: "",
      cardTime: ""
    };
  },
  methods: {
    sendMsg: function() {
      const param = {
        dialogCompent: "xiaoquSed",
        dialogTitle: "小区"
      };
      const thirdParams={
        date:this.date
      }
      this.$emit("headCallBack", param,thirdParams); //第一个参数是父组件中v-on绑定的自定义回调方法，第二个参数为传递的参数
    },
    post() {
      let _this = this;
      let params = {};
      this.$axios
        .get(
          "/community/getIndexData?" +
            qs.stringify({ JsonParam: JSON.stringify(params) })
        )
        .then(function(res) {
          let data = res.data;
          _this.xqData = data.resultData;
          _this.date = data.resultData.ACCT_MONTH;
          _this.loading = false;
        })
        .catch(function(e) {
        });
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

<style>
.progressDiv .dark .el-progress-bar__outer {
  background: #4c4c4c !important;
}
.progressDiv .dark .el-progress-bar__inner {
  background: linear-gradient(-135deg, #fad961 0%, #f76b1c 100%);
}
</style>
<style scoped lang="less">
.moveDiv {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
}
.content {
  width: ~"calc(50% - 5px)";
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.cardCont {
  width: 100%;
  height: ~"calc(100% - 30px)";
  display: flex;
}
.flexcc {
  display: flex;
  justify-content: center;
  align-items: center;
}
.numDiv {
  flex: 0 0 30%;
  font-size: 30px;
}
.progressDiv {
  flex: 0 0 70%;
  flex-direction: column;
  > div {
    width: 80%;
  }
  .textDiv {
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
  }
}
</style>