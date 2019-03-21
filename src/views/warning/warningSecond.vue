<template>
  <div>
    <div>
      <div class="flexbet">
        <el-radio-group v-model="tabVal">
          <el-radio-button label="xy">续约</el-radio-button>
          <el-radio-button label="dj">趸交</el-radio-button>
        </el-radio-group>
        <div class="rightBtn btnList">
          <el-date-picker v-model="date" type="date" placeholder="选择日期" style="margin-right:20px"></el-date-picker>
          <div class="down mr20">下载</div>
        </div>
      </div>
      <div v-show="tabVal=='xy'">
        <div class="tabDiv">
          <el-form :inline="true" :model="formInlineXY" class="demo-form-inline">
            <el-form-item label="是否CBSS">
              <el-select v-model="formInlineXY.isCB" size="small">
                <el-option label="全部" value="-1"></el-option>
                <el-option label="是" value="Y"></el-option>
                <el-option label="否" value="N"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="是否续约">
              <el-select v-model="formInlineXY.isXY" size="small">
                <el-option label="全部" value="-1"></el-option>
                <el-option label="是" value="Y"></el-option>
                <el-option label="否" value="N"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="预警业务类型">
              <el-select v-model="formInlineXY.yjType" size="small">
                <el-option label="宽带包年" value="001"></el-option>
                <el-option label="IPTV240送3个月" value="006"></el-option>
                <el-option label="IPTV120元包年" value="007"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="提前提醒月份">
              <el-select v-model="formInlineXY.yfType" multiple collapse-tags size="small">
                <el-option label="1月" value="1"></el-option>
                <el-option label="2月" value="2"></el-option>
                <el-option label="3月" value="3"></el-option>
                <el-option label="当月" value="0"></el-option>
                <el-option label="上月" value="sy"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" size="small">查询</el-button>
            </el-form-item>
          </el-form>
        </div>
        <div class="table" :style="tableBgStyle">
          <el-table
            :data="tableData1"
            style="width: 100%;"
            :header-cell-style="headerBgStyle"
            :cell-style="cellStyle"
            highlight-current-row
            stripe
            height="300"
          >
            <el-table-column prop="date" align="center" label="日期" width="180"></el-table-column>
            <el-table-column align="center" prop="name" label="姓名" width="180" sortable></el-table-column>
            <el-table-column prop="address" align="center" label="地址" sortable></el-table-column>
          </el-table>
        </div>
      </div>
      <div v-show="tabVal=='dj'">
        <div class="tabDiv">
          <el-form :inline="true" :model="formInlineDJ" class="demo-form-inline">
            <el-form-item label="是否续约">
              <el-select v-model="formInlineDJ.isXY" size="small">
                <el-option label="全部" value="-1"></el-option>
                <el-option label="是" value="Y"></el-option>
                <el-option label="否" value="N"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="预警业务类型">
              <el-select v-model="formInlineDJ.yjType" size="small">
                <el-option label="宽带包年" value="001"></el-option>
                <el-option label="IPTV240送3个月" value="006"></el-option>
                <el-option label="IPTV120元包年" value="007"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" size="small">查询</el-button>
            </el-form-item>
          </el-form>
        </div>
        <div class="table" :style="tableBgStyle">
          <el-table
            :data="tableData2"
            style="width: 100%;"
            :header-cell-style="headerBgStyle"
            :cell-style="cellStyle"
            highlight-current-row
            stripe
            height="300"
          >
            <el-table-column prop="date" align="center" label="日期" width="180"></el-table-column>
            <el-table-column align="center" prop="name" label="姓名" width="180" sortable></el-table-column>
            <el-table-column prop="address" align="center" label="地址" sortable></el-table-column>
          </el-table>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      date: "",
      tabVal: "xy",
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
      tableData1: [
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
      ],
      tableData2: [
        {
          date: "2016-05-02",
          id: "1",
          name: "周小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-04",
          id: "2",
          name: "周小虎",
          address: "上海市普陀区金沙江路 1517 弄"
        },
        {
          date: "2016-05-01",
          id: "3",
          name: "周小虎",
          address: "上海市普陀区金沙江路 1519 弄"
        },
        {
          date: "2016-05-03",
          id: "4",
          name: "周小虎",
          address: "上海市普陀区金沙江路 1516 弄"
        },
        {
          date: "2016-05-07",
          id: "5",
          name: "周小虎",
          address: "上海市普陀区金沙江路 1515 弄"
        }
      ],
      formInlineXY:{
        isCB:"-1",
        yjType:"",
        ywType:"06",
        yfType:"",
        ifXY:"-1"
      },
      formInlineDJ:{
        isCB:"-1",
        yjType:"",
        ywType:"06",
        yfType:"",
        ifXY:"-1"
      }
    };
  },
  methods: {
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
<style lang="less">
.flexbet{
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.tabDiv{
  margin-top: 20px;
  .el-form-item{
    margin-bottom: 0;
    label{
      color: #fff;
    }
  }
  input[type=text]{
    width: 150px;
  }
  .el-select .el-tag{
    color: #fff !important;
    background-color: #409EFF !important;
  }
}
.btnList {
  .el-input__inner {
    border: 1px solid #5fb6f9;
    background-color: rgba(0, 0, 0, 0.1);
    font-size: 16px;
    color: #ffffff;
    line-height: 41px;
  }
  .el-icon-date:before {
    color: #5fb6f9;
    font-size: 18px;
  }
}
</style>

