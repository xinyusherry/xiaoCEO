<template>
  <div id="app">
    <div class="card-box">
      <Card :classname="'small'" :cardset='{width:"100%",leftcolor:"#39B54A",rightcolor:"#F8E36E"}'>
        <div class="title-content">
          <img src="./assets/images/icon-title.png" height="26" alt="">
          <img src="./assets/images/title.png" height="26" alt="">
          <el-button @click="isDraggable=true">配置页面</el-button>
          <el-button @click="isDraggable=false">配置完成</el-button>
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
            :use-css-transforms="true">
        <grid-item v-for="item in layout" :key="item.i"
                   :x="item.x"
                   :y="item.y"
                   :w="item.w"
                   :h="item.h"
                   :i="item.i">
            <div v-if="isDraggable==true" class="mask"><div>删除</div></div>
            <component :is="componentId[item.i]"></component>
        </grid-item>
    </grid-layout>
  </div>
</template>

<script>
// @ is an alias to /src
import Card from '@/components/Card.vue';
import Comp1 from '@/components/Comp1.vue';
import Comp2 from '@/components/Comp2.vue';
import Comp3 from '@/components/Comp3.vue';
import Development from '@/components/Development.vue';
import { GridLayout,GridItem } from 'vue-grid-layout';

export default {
  data() {
    return {
      isDraggable:false,
      componentId:['Comp1','Comp2','Comp3','Development'],
      layout:[
          {"x":0,"y":0,"w":1,"h":1,"i":"0"},
          {"x":1,"y":0,"w":1,"h":2,"i":"1"},
          {"x":0,"y":0,"w":1,"h":1,"i":"2"},
          {"x":1,"y":0,"w":1,"h":1,"i":"3"},
          {"x":0,"y":0,"w":1,"h":1,"i":"4"}
      ]
    }
  },
  components: {
    Card,
    GridLayout,
    GridItem,
    Comp1,
    Comp2,
    Comp3,
    Development
  },
  methods:{
    orderUp(index){
      var num = this.order[index]-1;
      this.$set(this.order,index, num);
    },
    orderDown(index){
      var num = this.order[index]+1;
      this.$set(this.order,index, num);
    }
  }
}
</script>

<style lang="less">
  .vue-grid-item{
    // background: #17325D;
    position: relative;
  }
  .mask{
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(255,255,255,0.1);
    >div{
      float: right;
      margin: 10px;
    }
  }
</style>
