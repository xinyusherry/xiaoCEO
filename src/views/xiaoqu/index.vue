<template>
  <div class="moveDiv" @click="sendMsg">
    <card :cardset="xq" :timetype="'month'" style="margin-right:10px;">
      <div class="cardCont flexcc">
        <div style="font-size:56px">456</div>
      </div>
    </card>
    <div class="content">
      <card :cardset="sjxq" :timetype="''" style="height:calc(50% - 5px);">
        <div class="cardCont">
          <div class="numDiv flexcc">
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
              <div slot="reference">456</div>
            </el-popover>
          </div>
          <div class="progressDiv flexcc">
            <div class="textDiv"><span>占比</span><span>88.88%</span></div>
            <div class="dark"><el-progress :text-inside="false" :stroke-width="9" :percentage="80.99" :show-text="false"></el-progress></div>
          </div>
        </div>
      </card>
      <card :cardset="dsxq" :timetype="''" style="height:calc(50% - 5px);">
        <div class="cardCont">
          <div class="numDiv flexcc">
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
              <div slot="reference">456</div>
            </el-popover>
          </div>
          <div class="progressDiv flexcc">
            <div class="textDiv"><span>占比</span><span>88.88%</span></div>
            <div class="dark"><el-progress :text-inside="false" :stroke-width="9" :percentage="80.99" :show-text="false"></el-progress></div>
          </div>
        </div>
      </card>
    </div>
  </div>
</template>

<script>
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
        width: "calc(50% - 5px)",
      },
      sjxq: {
        title: "双降小区",
        ...defaultParam
      },
      dsxq: {
        title: "低渗小区",
        ...defaultParam
      }
    };
  },
  methods: {
      sendMsg:function() {
      const param = {
        dialogCompent:"xiaoquSed",
        dialogTitle:"小区",
      }
      this.$emit('headCallBack', param); //第一个参数是父组件中v-on绑定的自定义回调方法，第二个参数为传递的参数
    }
  }
};
</script>

<style>
.progressDiv .dark .el-progress-bar__outer{
  background: #4C4C4C !important;
}
.progressDiv .dark .el-progress-bar__inner{
  background: linear-gradient(-135deg, #FAD961 0%, #F76B1C 100%);
}
</style>
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
.flexcc{
  display: flex;
  justify-content: center;
  align-items: center;
}
.numDiv{
  flex: 0 0 30%;
  font-size: 30px;
}
.progressDiv{
  flex: 0 0 70%;
  flex-direction: column;
  >div{
    width: 80%;
  }
  .textDiv{
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
  }
}
</style>