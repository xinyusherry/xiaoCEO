<template>
    <div>
        <div class="flexcc">
          <div style="color:#F84252">注：（指标最多选择三条）</div>
          <el-radio-group v-model="dateType" style="margin:0 20px;">
            <el-radio label="day">日</el-radio>
            <el-radio label="month">月</el-radio>
          </el-radio-group>
          <el-date-picker v-show="dateType=='day'" v-model="date" type="date" placeholder="选择日期"></el-date-picker>
          <el-date-picker v-show="dateType=='month'" v-model="date" type="month" placeholder="选择日期"></el-date-picker>
        </div>
        <div class="footBtns">
          <div class="btn" @click="sendMsg()">取消</div>
          <div class="btn okBtn" @click="sendMsg()">确定</div>
        </div>
    </div>
</template>

<script>
export default {
  data() {
    return {
      date:"",
      dateType:"day",
    };
  },
  methods:{
    sendMsg:function() {
      const param = {
        id:"importantCheck",
        name:"指标选择",
      }
      this.$emit('headCallBack', false, param); 
    },
  }
}
</script>

<style scoped lang="less">
.flexcc{
  display: flex;
  justify-content: center;
  align-items: center;
}
.footBtns{
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  .btn{
    width: 100px;
    border: 1px solid #fff;
    color: #fff;
    border-radius: 4px;
    height: 32px;
    line-height: 32px;
    font-size: 14px;
    text-align: center;
    margin: 0 20px;
    cursor: pointer;
  }
  .okBtn{
    border:none;
    background-image: linear-gradient(-135deg, #9BD9FC 0%, #3096FC 100%);
  }
}
</style>