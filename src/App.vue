<template>
  <div id="app">
    <div class="card-box">
      <Card
        :classname="'small'"
        :cardset="{width:'calc(100% - 20px)',leftcolor:'#39B54A',rightcolor:'#F8E36E'}"
        style="margin:4.5px 10px"
      >
        <div class="title-content">
          <img src="./assets/images/icon-title.png" height="26" alt>
          <img src="./assets/images/title.png" height="26" alt>
          <swiper v-if="swiperSlides.length>1" :options="swiperOption">
            <swiper-slide v-for="(slide, index) in swiperSlides" :key="index">
              <span class="lightblue">{{ slide.DEVELOP_NAME }}</span>
              {{ slide.FDATE }} 发展了
              <span class="lightblue">【{{ slide.PRODUCT_NAME }}】！</span>
            </swiper-slide>
          </swiper>
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
        v-for="(item,index) in layout"
        :key="item.i"
        :x="item.x"
        :y="item.y"
        :w="item.w"
        :h="item.h"
        :i="item.i"
      >
        <div v-if="isDraggable==true" class="mask">
          <div>
            <div @click="deleteModule(index,item.id)" class="del">×</div>
          </div>
        </div>
        <component :is="item.id" @headCallBack="headCall" :receiveParams="thirdParams"></component>
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
          style="margin-bottom:20px"
        >全选</el-checkbox>
        <el-checkbox-group v-model="checkedModules" @change="handleCheckedModulesChange">
          <el-checkbox v-for="module in modules" :label="module.id" :key="module.id">{{module.name}}</el-checkbox>
        </el-checkbox-group>
        <div class="btns">
          <el-button class="btn btn1" size="small" @click="isAddBtn=true">取消</el-button>
          <el-button class="btn btn2" size="small" @click="changeModules()">确定</el-button>
        </div>
      </div>
    </div>
    <div>
      <el-dialog :title="dialogTitle" :visible.sync="isDialogShow" width="80%">
        <component
          v-if="isDialogShow"
          :is="dialogCompent"
          @headCallBack="headCall"
          :sendParams="thirdParams"
        ></component>
      </el-dialog>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Card from "@/components/Card.vue";
import Map from "@/components/Map.vue";
import dvlpDayMonth from "@/views/development/dayMonth";
import dvlpTime from "@/views/development/time";
import dvlpTimeSed from "@/views/development/timeSecond";
import dvlpTimeTrd from "@/views/development/timeThird";
import dayMonthDetail from "@/views/development/dayMonthDetail";
import cjDayMonth from "@/views/chaiji/dayMonth";
import cjTime from "@/views/chaiji/time";
import cjTimeSed from "@/views/chaiji/timeSecond";
import cjTimeTrd from "@/views/chaiji/timeThird";
import cjDayMonthDetail from "@/views/chaiji/cjDetail";
import arrears from "@/views/arrears/index";
import income from "@/views/income/index";
import incomeSed from "@/views/income/incomeSed";
import cost from "@/views/cost/index";
import costSecond from "@/views/cost/costSecond";
import arrearsSecond from "@/views/arrears/arrearsSecond";
import arrearsThird from "@/views/arrears/arrearsThird";
import share from "@/views/share/index";
import shareSecond from "@/views/share/shareSecond";
import profit from "@/views/profit/index";
import profitSed from "@/views/profit/profitSecond";
import warning from "@/views/warning/index";
import warningSecond from "@/views/warning/warningSecond";
import xiaoqu from "@/views/xiaoqu/index";
import xiaoquSed from "@/views/xiaoqu/xqSecond";
import arrive from "@/views/arrive/index";
import arriveSecond from "@/views/arrive/arriveSecond";
import important from "@/views/important/index";
import importantCheck from "@/views/important/checkBoxs";
import videoModule from "@/views/video";
import { GridLayout, GridItem } from "vue-grid-layout";
import { close } from "fs";

//默认布局
const allModulesLayout = [
  { x: 1, y: 0, w: 1, h: 2, i: 0, id: "Map" },
  { x: 0, y: 0, w: 1, h: 1, i: 1, id: "income" },
  { x: 0, y: 1, w: 1, h: 1, i: 2, id: "cost" },
  { x: 0, y: 2, w: 1, h: 1, i: 3, id: "share" },
  { x: 1, y: 1, w: 1, h: 1, i: 4, id: "profit" },
  { x: 0, y: 3, w: 1, h: 1, i: 5, id: "dvlpDayMonth" },
  { x: 1, y: 2, w: 1, h: 1, i: 6, id: "important" },
  { x: 0, y: 4, w: 1, h: 1, i: 7, id: "dvlpTime" },
  { x: 1, y: 3, w: 1, h: 1, i: 8, id: "cjDayMonth" },
  { x: 0, y: 5, w: 1, h: 1, i: 9, id: "arrears" },
  { x: 1, y: 4, w: 1, h: 1, i: 10, id: "cjTime" },
  { x: 0, y: 6, w: 1, h: 1, i: 11, id: "arrive" },
  { x: 1, y: 5, w: 1, h: 1, i: 12, id: "xiaoqu" },
  { x: 0, y: 7, w: 1, h: 1, i: 13, id: "warning" },
  { x: 1, y: 6, w: 1, h: 1, i: 14, id: "videoModule" }
];
const allModules = [
  { id: "Map", name: "地图" },
  { id: "dvlpDayMonth", name: "发展（日、月）" },
  { id: "dvlpTime", name: "发展实时" },
  { id: "cjDayMonth", name: "拆机（日、月）" },
  { id: "cjTime", name: "拆机实时" },
  { id: "arrears", name: "欠费" },
  { id: "cost", name: "成本" },
  { id: "share", name: "增量收益分享" },
  { id: "profit", name: "利润、准利润" },
  { id: "warning", name: "到期预警" },
  { id: "xiaoqu", name: "小区" },
  { id: "income", name: "收入" },
  { id: "arrive", name: "到达" },
  { id: "important", name: "重点业务监控" },
  { id: "videoModule", name: "视频" }
];
const allModulesId = allModules.map(obj => obj.id);

import qs from "qs";
export default {
  data() {
    return {
      isDraggable: false, //是否可拖动
      isAddBtn: true, //添加模块部分显示
      checkAll: true, //是否全选
      isIndeterminate: false, //全选按钮状态
      modules: allModules, //所有模块名称
      checkedModules: allModulesId.concat(), //已选模块id
      layout: allModulesLayout.concat(), //布局展示模块
      dialogCompent: "", //弹出层组件名字
      isDialogShow: false, //弹出层显示
      dialogTitle: "", //弹出层标题
      thirdParams: {}, //二级传至三级页面参数
      swiperOption: {
        //轮播属性
        loop: true,
        loopAdditionalSlides: 2,
        observer: true,
        observeParents: true,
        speed: 1000,
        autoplay: {
          delay: 1000
        }
      },
      swiperSlides: [] //轮播数据
    };
  },
  components: {
    Card,
    GridLayout,
    GridItem,
    Map,
    dvlpDayMonth,
    dvlpTime,
    dvlpTimeSed,
    dvlpTimeTrd,
    cjDayMonth,
    cjDayMonthDetail,
    cjTime,
    cjTimeSed,
    cjTimeTrd,
    dayMonthDetail,
    arrears,
    arrearsSecond,
    arrearsThird,
    income,
    incomeSed,
    cost,
    costSecond,
    share,
    shareSecond,
    profit,
    profitSed,
    warning,
    warningSecond,
    xiaoqu,
    xiaoquSed,
    arrive,
    arriveSecond,
    important,
    importantCheck,
    videoModule
  },
  methods: {
    handleCheckAllChange(val) {
      //是否全选
      this.checkedModules = val ? allModulesId.concat() : [];
      this.isIndeterminate = false;
    },
    handleCheckedModulesChange(value) {
      //检查所有选项状态
      let checkedCount = value.length;
      this.checkAll = checkedCount === this.modules.length;
      this.isIndeterminate =
        checkedCount > 0 && checkedCount < this.modules.length;
    },
    deleteModule(index, id) {
      //删除单个模块
      this.layout.splice(index, 1);
      this.checkedModules.splice(this.checkedModules.indexOf(id), 1);
      this.handleCheckedModulesChange(this.checkedModules);
    },
    changeModules() {
      //添加删除模块
      this.isAddBtn = true;
      this.layout = [];
      if (this.checkAll) {
        this.layout = allModulesLayout.concat();
      } else {
        this.checkedModules.map((id, index) => {
          if (id == "Map") {
            this.layout.push({ x: 1, y: 0, w: 1, h: 2, i: index, id: id });
          } else {
            this.layout.push({ x: 0, y: 0, w: 1, h: 1, i: index, id: id });
          }
        });
      }
    },
    //子组件传递过来的参数
    headCall(param, thirdParams) {
      //拖拽时禁止弹出层显示
      if (this.isDraggable) return false;
      this.isDialogShow = true;
      if (!param.dialogTitle) {
        this.isDialogShow = false;
      } else {
        this.dialogCompent = param.dialogCompent;
        this.dialogTitle = param.dialogTitle;
      }
      if (thirdParams) {
        this.thirdParams = thirdParams;
      }
    },
    getSwiperData() {
      let _this = this;
      this.$axios
        .get("/Workbench/getDevelopDetail")
        .then(function(res) {
          _this.swiperSlides = res.data.resultData
        })
        .catch(function(e) {});
    }
  },
  created() {
    let params = {
      data: this.layout
    };
    let _this = this;
    this.$axios
      .post("/Workbench/getUserModule", params)
      .then(function(res) {
        _this.layout = res.data.resultData;
      })
      .catch(function(e) {
      });
    this.getSwiperData();
  },
  watch: {
    isDraggable(newValue, oldValue) {
      if (!newValue) {
        let params = {
          data: this.layout
        };
        let _this = this;
        //测试接口
        this.$axios
          .post("/Workbench/updateUserModule", params)
          .then(function(res) {})
          .catch(function(e) {
          });
      }
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
  z-index: 21;
  > div {
    text-align: right;
    background-color: rgba(0, 0, 0, 0.5);
    overflow: hidden;
    .del {
      float: right;
      font-size: 40px;
      padding-right: 6px;
      z-index: 22;
    }
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
  .swiper-container {
    width: 60%;
  }
  .lightblue {
    color: #6afffd;
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
  .el-checkbox {
    margin-left: 30px;
  }
  .el-checkbox-group .el-checkbox {
    margin-bottom: 10px;
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
.el-radio__input.is-checked + .el-radio__label {
  color: #fff !important;
}
.el-radio__label {
  color: #7594c3;
}
.el-radio__inner {
  border-color: #7594c3 !important;
  background-color: #000 !important;
}
.el-dialog__wrapper {
  .el-dialog {
    background: rgba(0, 0, 0, 0.6);
    margin-top: 10vh !important;
  }
  .el-dialog__header {
    background: linear-gradient(
      to right,
      rgba(155, 217, 252, 0.6),
      rgba(48, 150, 252, 0.6)
    );
    text-align: center;
    padding: 15px 20px;
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
}
.el-table th > .cell {
  font-size: 16px;
  color: #fff;
}
.el-table--striped .el-table__body tr {
  &.el-table__row--striped {
    td {
      background: rgba(71, 187, 196, 0.1) !important;
      border-bottom: none !important;
    }
  }
}
.el-table tr {
  background: rgba(0, 0, 0, 0.1) !important;
  color: #fff;
  &.current-row,
  &.hover-row {
    td {
      background: unset !important;
    }
  }
  td {
    border-bottom: none !important;
  }
}
.el-table th.is-leaf {
  border-bottom: none !important;
}
.el-table,
.el-table__expanded-cell {
  background-color: unset !important;
}
.el-table--group::after,
.el-table--border::after,
.el-table::before {
  background-color: unset !important;
}
.el-popover {
  background: rgba(30, 60, 86, 0.8) !important;
  border: 1px solid rgba(30, 60, 86, 0.8) !important;
  &[x-placement^="right"] .popper__arrow {
    border-right-color: rgba(30, 60, 86, 0.8) !important;
    &::after {
      border-right-color: rgba(30, 60, 86, 0.8) !important;
    }
  }
  &[x-placement^="top"] .popper__arrow {
    border-top-color: rgba(30, 60, 86, 0.8) !important;
    &::after {
      border-top-color: rgba(30, 60, 86, 0.8) !important;
    }
  }
}
.el-progress-bar__outer {
  background-color: #777 !important;
}
.el-table td.gutter,
.el-table th.gutter {
  background: url("./assets/images/icon_table_header.png") repeat left top /
    100% 100%;
}
input.el-input__inner {
  background: transparent !important;
  border-color: #5fb6f9 !important;
  font-size: 16px;
  color: #ffffff;
}
.el-icon-date:before {
  color: #5fb6f9;
  font-size: 18px;
}
.el-picker-panel.el-date-picker.el-popper {
  background: rgba(0, 0, 0, 0.8);
  color: #fff;
  border-color: #5fb6f9;
  .el-date-table th {
    color: #fff;
  }
  .el-picker-panel__content table td .cell,
  .el-date-picker__header > button,
  .el-date-picker__header > span {
    color: #fff;
    &:hover {
      color: #409eff;
    }
  }
  .popper__arrow {
    border-bottom-color: #409eff;
    border-top-color: #409eff;
    &::after {
      border-bottom-color: #000;
      border-top-color: #000;
    }
  }
}
.el-select-dropdown.el-popper,
.el-select-dropdown.is-multiple {
  background: rgba(0, 0, 0, 0.8);
  border-color: #5fb6f9;
  li.el-select-dropdown__item {
    color: #fff;
    &.selected {
      color: #409eff;
      background: transparent;
    }
    &.hover,
    &:hover,
    &.selected.hover {
      background-color: rgba(255, 255, 255, 0.2);
    }
  }
  .popper__arrow {
    border-bottom-color: #409eff !important;
    border-top-color: #409eff !important;
    &::after {
      border-bottom-color: #000 !important;
      border-top-color: #000 !important;
    }
  }
}
.el-radio-button:first-child .el-radio-button__inner {
  border-color: #1b8cea !important;
}
span.el-radio-button__inner {
  background: rgba(0, 0, 0, 0.5);
  color: #979797;
  border-color: #1b8cea;
}
</style>
