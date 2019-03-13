<template>
  <div class="devTimeTrd">
    <img :src="require(`../../assets/images/icon_goback.png`)" class="icon_goback" v-on:click="sendMsg">
    <div class="dateDiv">
        <span>2019-03-12</span>
    </div>
    <div class="title">{{sendParams.name}}</div>
    <div class="table" :style="tableBgStyle">
        <el-table
          :data="tableData"
          style="width: 100%;"
          :header-cell-style="headerBgStyle"
          :cell-style="cellStyle"
          highlight-current-row
          stripe
          height="400"
        >
          <el-table-column prop="date" align="center" label="日期" width="180"></el-table-column>
          <el-table-column align="center" prop="name" label="姓名" width="180" sortable></el-table-column>
          <el-table-column prop="address" align="center" label="地址" sortable></el-table-column>
        </el-table>
      </div>
  </div>
</template>
<script>
export default {
  props: ['sendParams'],
  data() {
    return {
      date: "",
      tableBg: require("@/assets/images/tabBg.png"),
      tableBgStyle: {
        background:
          "url(" +
          require("@/assets/images/tabBg.png") +
          ") left top no-repeat",
        backgroundSize: "100% 100%",
        padding: "18px"
      },
      headerBgStyle: {
        background:
          "url(" +
          require("@/assets/images/icon_table_header.png") +
          ") left top repeat",
        backgroundSize: "100% 100%",
        textAlign: "center"
      },
      tableData: [
        {
          date: "2016-05-02",
          id: "1",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-04",
          id: "2",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄"
        },
        {
          date: "2016-05-01",
          id: "3",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄"
        },
        {
          date: "2016-05-03",
          id: "4",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄"
        },
        {
          date: "2016-05-07",
          id: "5",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1515 弄"
        }
      ]
    };
  },
  methods: {
    sendMsg() {
      const param = {
        dialogCompent: "cjTimeSed",
        dialogTitle: "拆机（实时）"
      };
      this.$emit("headCallBack", param); //第一个参数是父组件中v-on绑定的自定义回调方法，第二个参数为传递的参数
    },
    cellStyle({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 0) {
        return "color: #6AFFFD";
      } else {
        return "";
      }
    }
  }
};
</script>

<style scoped lang="less">
.devTimeTrd{
  position: relative;
  .icon_goback{
    position: absolute;
    top: 0;
    left: 10px;
  }
  .title{
    text-align: center;
    font-size: 24px;
    color: #6AFFFD;
  }
  .dateDiv{
      text-align: right;
      span{
          padding: 5px 30px;
          color: #fff;
          background-color: rgba(95, 182, 249,0.5);
          border-radius: 3px;
      }
  }
}
</style>

