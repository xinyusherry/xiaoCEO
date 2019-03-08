<template>
  <div class="moveDiv">
    <div class="content">
      <card :cardset="lj" :timetype="''" style="margin-right:10px;">
          
      </card>
      <card :cardset="dy" :timetype="''"></card>
    </div>
    <div class="content">
      <card :cardset="dq" :timetype="''" style="margin-right:10px;"></card>
      <card :cardset="cq" :timetype="''"></card>
    </div>
  </div>
</template>

<script>
import card from "../../components/Card.vue";
const defaultParam = {
  width: "calc(50% - 5px)",
  leftcolor: "#6B799C",
  rightcolor: "#A4B1CB"
};
export default {
  components: { card },
  data() {
    return {
      lj: {
        title: "累计欠费回收率",
        ...defaultParam
      },
      dy: {
        title: "当月欠费回收率",
        ...defaultParam
      },
      dq: {
        title: "短期欠费回收率",
        ...defaultParam
      },
      cq: {
        title: "长期欠费回收率",
        ...defaultParam
      }
    };
  },
  methods: {
    //   sendMsg:function() {
    //   const param = {
    //     dialogCompent:"cjDayMonthDetail",
    //     dialogTitle:"拆机",
    //   }
    //   this.$emit('headCallBack', param); //第一个参数是父组件中v-on绑定的自定义回调方法，第二个参数为传递的参数
    // }
  }
};
</script>

<style scoped>
.moveDiv {
  width: 100%;
  height: 100%;
}
.content {
  display: flex;
  justify-content: space-between;
  height: calc(50% - 5px);
}
</style>