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
    <!-- <div style="width:100%">
      <el-row :gutter="10">
        <el-col :span="12"><div class="grid-content bg-purple">1</div></el-col>
        <el-col :span="12"><div class="grid-content bg-purple" style="height:300px">2</div></el-col>
        <el-col :span="12"><div class="grid-content bg-purple">3</div></el-col>
        <el-col :span="12"><div class="grid-content bg-purple">4</div></el-col>
        <el-col :span="12"><div class="grid-content bg-purple">5</div></el-col>
        <el-col :span="12"><div class="grid-content bg-purple">6</div></el-col>
        <el-col :span="12"><div class="grid-content bg-purple">7</div></el-col>
        <el-col :span="12"><div class="grid-content bg-purple">8</div></el-col>
        <el-col :span="12"><div class="grid-content bg-purple">9</div></el-col>
        <el-col :span="12"><div class="grid-content bg-purple">10</div></el-col>
      </el-row>
    </div> -->
    <!-- <div class="flex">
      
      <div class="grid-content" :style="{order:order[1]}" style="height:310px;float:right"><div class="height310">2</div></div>
      <div v-for="i in 9" :key="'index'+i">
        <div class="grid-content" :style="{order:order[2]}"><div class="height150">3<p @click="orderUp(2)" style="margin-bottom:20px">上移</p><p @click="orderDown(2)">下移</p></div></div>
        <div class="grid-content" :style="{order:order[0]}"><div class="height150">1<a href="http://www.baidu.com" target="_black">baidu</a></div><p @click="orderUp(0)" style="margin-bottom:20px">上移</p><p @click="orderDown(0)">下移</p></div>
        <div class="grid-content" :style="{order:order[3]}"><div class="height150">4</div></div>
        <div class="grid-content" :style="{order:order[4]}"><div class="height150">5</div></div>
        <div class="grid-content" :style="{order:order[5]}"><div class="height150">6</div></div>
        <div class="grid-content" :style="{order:order[6]}"><div class="height150">7</div></div>
        <div class="grid-content" :style="{order:order[7]}"><div class="height150">8</div></div>
        <div class="grid-content" :style="{order:order[8]}"><div class="height150">9</div></div>
        <div class="grid-content" :style="{order:order[9]}"><div class="height150">10</div></div>
        <div class="grid-content" :style="{order:order[10]}"><div class="height150">11</div></div>
        <div class="grid-content" :style="{order:order[11]}"><div class="height150">12</div></div>
      </div>
      
    </div> -->
    <grid-layout
            :layout="layout"
            :col-num="2"
            :row-height="150"
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
            <!-- {{item.i}} -->
            <component :is="componentId[item.i]"></component>
        </grid-item>
    </grid-layout>
  </div>
</template>

<script>
// @ is an alias to /src
import Card from '@/components/Card.vue'
import Comp1 from '@/components/Comp1.vue'
import Comp2 from '@/components/Comp2.vue'
import Comp3 from '@/components/Comp3.vue'
import { GridLayout,GridItem } from 'vue-grid-layout'

export default {
  data() {
    return {
      order: [1,2,3,4,5,6,7,8,9,10,11,12],
      isDraggable:false,
      componentId:['Comp1','Comp2','Comp3'],
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
    Comp3
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
  // .flex{
  //   width: 100%;
  //   height: 2000px;
  // }
  // .grid-content {
  //   float: left;
  //   width: calc(~'50% - 10px');
  //   border-radius: 4px;
  //   height: 150px;
  //   margin: 10px 5px 0 5px;
  //   background: #17325D;
  // }
  .flex{
    display: flex;
    flex-flow: row wrap;
    align-items: flex-start;
    align-content: flex-start;
  }
  .grid-content {
    width: calc(~'50% - 10px');
    border-radius: 4px;
    height: auto;
    align-self:flex-start;
    margin: 10px 5px 0 5px;
    background: #17325D;
  }
  .height150{
    height: 150px;
  }
  .height310{
    height: 310px;
  }
  .vue-grid-item{
    background: #17325D;
  }
</style>
