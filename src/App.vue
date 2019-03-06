<template>
  <div id="app">
    <div class="card-box">
      <Card
        :classname="'small'"
        :cardset="{width:'100%',leftcolor:'#39B54A',rightcolor:'#F8E36E'}"
        style="margin:4.5px 10px"
      >
        <div class="title-content">
          <img src="./assets/images/icon-title.png" height="26" alt>
          <img src="./assets/images/title.png" height="26" alt>
          <el-button
            class="layoutBtn"
            type="primary"
            size="small"
            @click="isDraggable=!isDraggable"
          >配置{{!isDraggable?'页面':'完成'}}</el-button>
        </div>
      </Card>
    </div>
    <grid-layout
      :layout="layout"
      :col-num="2"
      :row-height="260"
      :is-draggable="isDraggable"
      :is-resizable="false"
      :vertical-compact="true"
      :margin="[10, 10]"
      :use-css-transforms="true"
    >
      <grid-item
        v-for="item in layout"
        :key="item.i"
        :x="item.x"
        :y="item.y"
        :w="item.w"
        :h="item.h"
        :i="item.i"
      >
        <div v-if="isDraggable==true" class="mask">
          <div>删除</div>
        </div>
        <component :is="componentId[item.i]" v-on:headCallBack="headCall"></component>
      </grid-item>
    </grid-layout>
    <div v-if="isDraggable==true" class="addModule">
      <el-button
        class="btn2"
        v-show="isAddBtn"
        size="small"
        @click="isAddBtn=false"
        icon="el-icon-circle-plus-outline"
      >添加模块</el-button>
      <div v-show="!isAddBtn">
        <el-checkbox
          :indeterminate="isIndeterminate"
          v-model="checkAll"
          @change="handleCheckAllChange"
        >全选</el-checkbox>
        <div style="margin: 15px 0;"></div>
        <el-checkbox-group v-model="checkedModules" @change="handleCheckedModulesChange">
          <el-checkbox v-for="module in layout" :label="module.id" :key="module.id">{{module.name}}</el-checkbox>
        </el-checkbox-group>
        <div class="btns">
          <el-button class="btn btn1" size="small" @click="isAddBtn=true">取消</el-button>
          <el-button class="btn btn2" size="small" @click="changeModules()">确定</el-button>
        </div>
      </div>
    </div>
    <div>
      <el-dialog :title="dialogTitle" :visible.sync="isDialogShow">
        <component :is="dialogCompent"></component>
      </el-dialog>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Card from "@/components/Card.vue";
import Comp1 from "@/components/Comp1.vue";
import Comp2 from "@/components/Comp2.vue";
import Comp3 from "@/components/Comp3.vue";
import dvlpDayMonth from "@/views/development/dayMonth";
import dvlpTime from "@/views/development/time";
import cjDayMonth from "@/views/chaiji/dayMonth";
import cjTime from "@/views/chaiji/time";
import { GridLayout, GridItem } from "vue-grid-layout";

const selModules = [
  {
    id: "dvlpDayMonth",
    name: "发展（日、月）"
  },
  {
    id: "Comp2",
    name: "地图"
  },
  {
    id: "dvlpTime",
    name: "发展实时"
  },
  {
    id: "cjDayMonth",
    name: "拆机（日、月）"
  },
  {
    id: "cjTime",
    name: "拆机实时"
  }
];
const allModules = [
  "Comp2",
  "dvlpDayMonth",
  "dvlpTime",
  "cjDayMonth",
  "cjTime"
];
export default {
  data() {
    return {
      isDraggable: false,
      isAddBtn: true,
      checkAll: true,
      isIndeterminate: false,
      checkedModules: allModules,
      modules: selModules,
      componentId: allModules,
      dialogCompent: "Comp2", //弹出层组件名字
      isDialogShow: false,
      dialogTitle: "", //弹出层标题
      layout: [
        { x: 1, y: 0, w: 1, h: 2, i: "0", id: "Comp2", name: "地图" },
        {
          x: 0,
          y: 0,
          w: 1,
          h: 1,
          i: "1",
          id: "dvlpDayMonth",
          name: "发展（日、月）"
        },
        { x: 0, y: 1, w: 1, h: 1, i: "2", id: "dvlpTime", name: "发展实时" },
        {
          x: 0,
          y: 2,
          w: 1,
          h: 1,
          i: "3",
          id: "cjDayMonth",
          name: "拆机（日、月）"
        },
        { x: 1, y: 2, w: 1, h: 1, i: "4", id: "cjTime", name: "拆机实时" }
      ]
    };
  },
  // watch:{
  //   checkedModules
  // }
  components: {
    Card,
    GridLayout,
    GridItem,
    Comp1,
    Comp2,
    Comp3,
    dvlpDayMonth,
    dvlpTime,
    cjDayMonth,
    cjTime
  },
  methods: {
    handleCheckAllChange(val) {
      console.log(val);
      this.checkedModules = val ? allModules : [];
      this.isIndeterminate = false;
    },
    handleCheckedModulesChange(value) {
      console.log(value);
      let checkedCount = value.length;
      this.checkAll = checkedCount === this.modules.length;
      this.isIndeterminate =
        checkedCount > 0 && checkedCount < this.modules.length;
    },
    changeModules() {
      this.isAddBtn = true;
      this.componentId = this.checkedModules;
    },
    //子组件传递过来的参数
    headCall(param) {
      this.isDialogShow = true;
      this.dialogCompent = param.dialogCompent;
      this.dialogTitle = param.dialogTitle;
    }
  }
};
</script>

<style lang="less">
.vue-grid-item {
  position: relative;
}
.mask {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(255, 255, 255, 0.1);
  > div {
    float: right;
    margin: 10px;
  }
}
.title-content {
  display: flex;
  .layoutBtn {
    margin-left: auto;
    padding: 8px 40px;
    font-size: 14px;
    background-image: linear-gradient(-180deg, #98dcfd 0%, #5fb6f9 100%);
  }
}
.addModule {
  background: #16325d;
  height: 200px;
  margin: 0 10px 10px 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  .el-checkbox__label {
    color: #fff;
  }
  .el-button:focus,
  .el-button:hover {
    color: #fff;
    border-color: inherit;
    background-color: transparent;
  }
  .btns {
    position: absolute;
    top: 15px;
    right: 20px;
  }
  .btn {
    padding: 8px 30px;
    color: #fff;
  }
  .btn1 {
    margin-right: 20px;
    background: transparent;
  }
  .btn2 {
    background-image: linear-gradient(-225deg, #a834ef 0%, #2ac6ff 100%);
    border: none;
    color: #fff;
  }
}
.el-dialog__header {
  background-image: linear-gradient(-135deg, #9bd9fc 0%, #3096fc 100%);
  background: linear-gradient(to right, #9bd9fc, #3096fc);
  opacity: 0.6;
  text-align: center;
  .el-dialog__title {
    font-family: "PingFangSC-Medium";
    font-size: 24px;
    color: #ffffff;
  }
  .el-icon-close:before {
    content: "\E60F";
    color: #fff;
    font-size: 20px;
  }
}
</style>
