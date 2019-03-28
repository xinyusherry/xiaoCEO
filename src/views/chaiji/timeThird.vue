<template>
  <div class="devTimeTrd">
    <img
      :src="require(`../../assets/images/icon_goback.png`)"
      class="icon_goback"
      v-on:click="sendMsg"
    >
    <div class="dateDiv">
      <el-date-picker
        size="small"
        format="yyyy-MM-dd"
        value-format="yyyyMMdd"
        v-model="date"
        placeholder="选择日期"
        style="flex:0 0 130px;margin-left:20px"
      ></el-date-picker>
    </div>
    <div class="title">{{sendParams.name}}</div>
    <div class="table" :style="tableBgStyle">
      <el-table
        :data="tableData.tbodyData"
        style="width: 100%;"
        :header-cell-style="headerBgStyle"
        highlight-current-row
        stripe
        height="400"
      >
        <template v-for="col in tableData.tHeadData">
          <el-table-column
            :key="col.key"
            :prop="col.prop"
            :label="col.label"
            :sortable="col.prop.search(/FEE/)===-1?false:true"
            align="center"
          >
            <template slot-scope="scope">
              <div slot="reference">{{scope.row[col.prop]}}</div>
            </template>
          </el-table-column>
        </template>
      </el-table>
    </div>
  </div>
</template>
<script>
import qs from "qs";
export default {
  props: ["sendParams"],
  data() {
    return {
      date: this.sendParams.dayId || "",
      svcType: this.sendParams.svcType,
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
      tableData: {
        tHeadData: [],
        tbodyData: []
      }
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
    },
    post() {
      let _this = this;
      let params = {
        dayId: _this.date,
        svcType: _this.svcType
      };
      this.$axios
        .get(
          "/dismantleRealTime/getTableData?" +
            qs.stringify({ JsonParam: JSON.stringify(params) })
        )
        .then(function(res) {
          let data = res.data;
          const head = {
            YW_NAME: "资费/套餐",
            FZR_NAME: "受理员工",
            YW_CODE: "业务号码",
            QD_NAME: "渠道",
            WG_DATE: "完工日期"
          };
          let tHeadData = [];
          for (const key in head) {
            if (head.hasOwnProperty(key)) {
              tHeadData.push({
                label: head[key],
                prop: key
              });
            }
          }
          _this.tableData = {
            tHeadData: tHeadData,
            tbodyData: data.resultData
          };
        })
        .catch(function(e) {});
    }
  },
  created() {
    this.post();
  },
  watch: {
    date(newValue, oldValue) {
      this.post();
    }
  }
};
</script>

<style scoped lang="less">
.devTimeTrd {
  position: relative;
  .icon_goback {
    position: absolute;
    top: 0;
    left: 10px;
  }
  .title {
    text-align: center;
    font-size: 24px;
    color: #6afffd;
  }
  .dateDiv {
    text-align: right;
    span {
      padding: 5px 30px;
      color: #fff;
      background-color: rgba(95, 182, 249, 0.5);
      border-radius: 3px;
    }
  }
}
</style>

