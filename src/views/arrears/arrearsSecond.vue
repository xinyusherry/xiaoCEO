<template>
  <div>
    <div>
      <div class="rightBtn btnList">
        <el-select
          v-model="value"
          placeholder="请选择"
          style="margin-right:20px"
          @change="selectChange"
        >
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
        <el-date-picker
          v-model="date"
          type="date"
          placeholder="选择日期"
          style="margin-right:20px"
          @change="dateChange"
        ></el-date-picker>
      </div>
      <div class="table" :style="tableBgStyle">
        <el-table
          :data="tableData"
          style="width: 100%;"
          :header-cell-style="headerBgStyle"
          :cell-style="cellStyle"
          highlight-current-row
          stripe
          height="300"
        >
          <el-table-column prop="JL_NAME" align="center" label="经理名称" width="180">
              <template slot-scope="scope">
              <el-button @click="sendMsg(scope.row.JL_ID)" type="text" size="small">{{scope.row.JL_NAME}}</el-button>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="GW_DYUE_QFYS" label="当月应收" sortable width="180"></el-table-column>
          <el-table-column align="center" prop="GW_DYUE_QFSS" label="当月实收" sortable width="180"></el-table-column>
          <el-table-column align="center" prop="GW_DYUE_RATE" label="当月回收率" sortable width="180"></el-table-column>

          <el-table-column align="center" prop="GW_DQ_QFYS" label="短期应收" sortable width="180"></el-table-column>
          <el-table-column align="center" prop="GW_DQ_QFSS" label="短期实收" sortable width="180"></el-table-column>
          <el-table-column align="center" prop="GW_DQ_RATE" label="短期回收率" sortable width="180"></el-table-column>

          <el-table-column align="center" prop="GW_CQ_QFYS" label="长期应收" sortable width="180"></el-table-column>
          <el-table-column align="center" prop="GW_CQ_QFSS" label="长期实收" sortable width="180"></el-table-column>
          <el-table-column align="center" prop="GW_CQ_RATE" label="长期回收率" sortable width="180"></el-table-column>
        
        </el-table>
      </div>
    </div>
  </div>
</template>
<script>
import qs from "qs";
import moment from "moment";
export default {
  data() {
    return {
      date: new Date(new Date().getTime() - 24 * 60 * 60 * 1000),
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
      tableData: [],
      options: [
        {
          value: "rh",
          label: "融合"
        },
        {
          value: "dk",
          label: "单宽"
        },
        {
          value: "dy",
          label: "单移"
        }
      ],
      value: "rh"
    };
  },
  methods: {
    sendMsg(trdParams) {
      const param = {
        dialogCompent: "arrearsThird",
        dialogTitle: "欠费"
      };
      let _this = this;
      const trdobj = {
        type:_this.value,
        dayId: moment(_this.date).format("YYYYMMDD"),
        saleArea:trdParams
      }
      this.$emit("headCallBack", param, trdobj); //第一个参数是父组件中v-on绑定的自定义回调方法，第二个参数为传递的参数
    },
    selectChange(value) {
      let _this = this;
      const param = {
        dayId: moment(_this.date).format("YYYYMMDD"),
        type: value
      };
      this.getTableData(param);
    },
    dateChange(date) {
      let _this = this;
      const param = {
        dayId: moment(date).format("YYYYMMDD"),
        type: _this.value
      };
      this.getTableData(param);
    },
    getTableData(params) {
      let that = this;
      this.$axios
        .get(
          "/arrearage/getTableData?" +
            qs.stringify({ JsonParam: JSON.stringify(params) })
        )
        .then(function(res) {
          if (res.data.resultCode === "1") {
            let resultData = res.data.resultData;
            that.tableData = resultData;
          }
        })
        .catch(function(e) {});
    },
    cellStyle({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 0) {
        return "color: #6AFFFD";
      } else {
        return "";
      }
    }
  },
  mounted: function() {
    let _this = this;
    const param = {
      dayId: moment(_this.date).format("YYYYMMDD"),
      type: _this.value
    };
    this.getTableData(param);
  }
};
</script>
<style lang="less">
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

