<template>
  <div class="moveDiv" @click="sendMsg">
    <card :cardset="xq" :timetype="'month'" :propsTime="cardTime" style="margin-right:10px;">
      <div class="cardCont flexcc">
        <div style="font-size:56px">{{xqData.XQ_NUM}}</div>
      </div>
    </card>
    <div class="content">
      <card :cardset="sjxq" :timetype="''" style="height:calc(50% - 5px);">
        <div class="cardCont">
          <div class="numDiv flexcc">
            <el-popover placement="top" width="300" trigger="hover">
              <div style="color:#fff">
                <p>单元类型（农村/城市）</p>
                <p>市公司排名xxx 平均完成率 xxxx</p>
                <p>同类单元排名 xxxx 平均完成率 xxxxx</p>
                <p>分公司排名xxx 平均完成率 xxxx</p>
              </div>
              <div slot="reference">456</div>
            </el-popover>
          </div>
          <div class="progressDiv flexcc">
            <div class="textDiv">
              <span>占比</span>
              <span>88.88%</span>
            </div>
            <div class="dark">
              <el-progress
                :text-inside="false"
                :stroke-width="9"
                :percentage="80.99"
                :show-text="false"
              ></el-progress>
            </div>
          </div>
        </div>
      </card>
      <card :cardset="dsxq" :timetype="''" style="height:calc(50% - 5px);">
        <div class="cardCont">
          <div class="numDiv flexcc">
            <el-popover placement="top" width="300" trigger="hover">
              <div style="color:#fff">
                <p>单元类型（农村/城市）</p>
                <p>市公司排名xxx 平均完成率 xxxx</p>
                <p>同类单元排名 xxxx 平均完成率 xxxxx</p>
                <p>分公司排名xxx 平均完成率 xxxx</p>
              </div>
              <div slot="reference">456</div>
            </el-popover>
          </div>
          <div class="progressDiv flexcc">
            <div class="textDiv">
              <span>占比</span>
              <span>88.88%</span>
            </div>
            <div class="dark">
              <el-progress
                :text-inside="false"
                :stroke-width="9"
                :percentage="80.99"
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
      this.$emit("headCallBack", param); //第一个参数是父组件中v-on绑定的自定义回调方法，第二个参数为传递的参数
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
        })
        .catch(function(e) {
          console.log(e);
        });
    }
  },
  created() {
    this.post();
  },
  watch: {
    date(newValue, oldValue) {
      this.postLine();
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