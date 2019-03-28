<template>
  <div>
    <div>
      <div class="btnList header">
        <img :src="require(`../../assets/images/icon_goback.png`)" alt class="icon_goback" v-on:click="sendMsg">
        <div class="rightBtn header btnList">
          <div class="down mr20">下载</div>
        </div>
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
          <el-table-column prop="AREA_NAME"  label="分公司" align="center"  width="180" ></el-table-column>
          <el-table-column align="center" prop="DEVICE_NUMBER_GH " label="固话号码" width="180" sortable></el-table-column>
          <el-table-column prop="QIANFEI_GH" align="center" label="固话欠费额" sortable width="180"></el-table-column>

          <el-table-column prop="BALANCAE"  label="固话往月实时欠费额" align="center"  sortable width="200"></el-table-column>
          <el-table-column prop="BALANCE_ALL_LASTDAY" align="center" label="前一日总欠费" sortable width="180"></el-table-column>
           <el-table-column prop="QIANFEI_ZONG"  label="总欠费额" align="center"  sortable width="180"></el-table-column>

           <el-table-column prop="QFZ" label="实时总欠费额" align="center"  sortable width="180"></el-table-column>
           <el-table-column prop="JF_BZ"  label="是否缴费" align="center"  sortable width="180"></el-table-column>
           <el-table-column prop="BALANCE"  label="缴费金额" align="center"  sortable width="180"></el-table-column>

           <el-table-column prop="USER_NO_KD"  label="对应宽带编码" align="center"  sortable width="180"></el-table-column>
           <el-table-column prop="DEVICE_NUMBER_KD"  label="对应宽带号码" align="center"  sortable width="180"></el-table-column>
           <el-table-column prop="QIANFEI_KD"  label="宽带欠费额" align="center"  sortable width="180"></el-table-column>

           <el-table-column prop="BALANCEB"  label="宽带往月实时欠费额" align="center"  sortable width="200"></el-table-column>
           <el-table-column prop="IF_RH"  label="是否融合" align="center"  sortable width="180"></el-table-column>
           <el-table-column prop="RH_YH_BM"  label="融合用户编码" align="center"  sortable width="180"></el-table-column>

           <el-table-column prop="DEVICE_NUMBER_YD1"  label="对应手机号码1" align="center"  sortable width="180"></el-table-column>
           <el-table-column prop="QIANFEI_YD1"  label="手机1欠费额" align="center"  sortable width="180"></el-table-column>
           <el-table-column prop="BALANCE1"  label="手机1往月实时欠费额" align="center"  sortable width="200"></el-table-column>

           <el-table-column prop="DEVICE_NUMBER_YD2"  label="对应手机号码2" align="center"  sortable width="180"></el-table-column>
           <el-table-column prop="QIANFEI_YD2"  label="手机2欠费额" align="center"  sortable width="180"></el-table-column>
           <el-table-column prop="BALANCE2"  label="手机2往月实时欠费额" align="center"  sortable width="200"></el-table-column>

           <el-table-column prop="DEVICE_NUMBER_YD3"  label="对应手机号码3" align="center"  sortable width="180"></el-table-column>
           <el-table-column prop="QIANFEI_YD3"  label="手机3欠费额" align="center"  sortable width="180"></el-table-column>
           <el-table-column prop="BALANCE3"  label="手机3往月实时欠费额" align="center"  sortable width="200"></el-table-column>

           <el-table-column prop="DEVICE_NUMBER_YD4"  label="对应手机号码4" align="center"  sortable width="180"></el-table-column>
           <el-table-column prop="QIANFEI_YD4"  label="手机4欠费额" align="center"  sortable width="180"></el-table-column>
           <el-table-column prop="BALANCE4"  label="手机4往月实时欠费额" align="center"  sortable width="200"></el-table-column>

           <el-table-column prop="DEVICE_NUMBER_YD5"  label="对应手机号码5" align="center"  sortable width="180"></el-table-column>
           <el-table-column prop="QIANFEI_YD5"  label="手机5欠费额" align="center"  sortable width="180"></el-table-column>
           <el-table-column prop="BALANCE5"  label="手机5往月实时欠费额" align="center"  sortable width="200"></el-table-column>

           <el-table-column prop="DEVICE_NUMBER_YD6"  label="对应手机号码6" align="center"  sortable width="180"></el-table-column>
           <el-table-column prop="QIANFEI_YD6"  label="手机6欠费额" align="center"  sortable width="180"></el-table-column>
           <el-table-column prop="BALANCE6"  label="手机6往月实时欠费额" align="center"  sortable width="200"></el-table-column>

           <el-table-column prop="DEVICE_NUMBER_YD7"  label="对应手机号码7" align="center"  sortable width="180"></el-table-column>
           <el-table-column prop="QIANFEI_YD7"  label="手机7欠费额" align="center"  sortable width="180"></el-table-column>
           <el-table-column prop="BALANCE7" label="手机7往月实时欠费额" align="center"  sortable width="200"></el-table-column>

           <el-table-column prop="DEVICE_NUMBER_YD8"  label="对应手机号码8" align="center"  sortable width="180"></el-table-column>
           <el-table-column prop="QIANFEI_YD8"  label="手机8欠费额" align="center"  sortable width="180"></el-table-column>
           <el-table-column prop="BALANCE8" label="手机8往月实时欠费额" align="center"  sortable width="200"></el-table-column>

        

           <el-table-column prop="DEVICE_NUMBER_YD9"  label="对应手机号码9" align="center"  sortable width="180"></el-table-column>
           <el-table-column prop="QIANFEI_YD9"  label="手机9欠费额" align="center"  sortable width="180"></el-table-column>
           <el-table-column prop="BALANCE9"  label="手机9往月实时欠费额" align="center"  sortable width="200"></el-table-column>

           <el-table-column prop="IF_KDGX"  label="是否宽带共线" align="center"  sortable width="180"></el-table-column>
           <el-table-column prop="KDGX_NUMBER"  label="共线群组号" align="center"  sortable width="180"></el-table-column>
           <el-table-column prop="CUST_NAME"  label="客户名称" align="center"  sortable width="180"></el-table-column>
           <el-table-column prop="USER_ATTR"  label="用户类型" align="center"  sortable width="180"></el-table-column>

           <el-table-column prop="FENJU_NAME"  label="所属分局" align="center"  sortable width="180"></el-table-column>
           <el-table-column prop="WG_CODE"  label="所属网格" align="center"  sortable width="180"></el-table-column>

           <el-table-column prop="JL_CODE"  label="所属经理" align="center"  sortable width="180"></el-table-column>
           <el-table-column prop="BQ_NAME"  label="所属包区" align="center"  sortable width="180"></el-table-column>
           <el-table-column prop="COUNT_MONTH"  label="欠费月数" align="center"  sortable width="180"></el-table-column>

           <el-table-column prop="PHONE_NUMBER"  label="联系电话" align="center"  sortable width="180"></el-table-column>
           <el-table-column prop="DQ_FEE_GH"  label="短期欠费额" align="center"  sortable width="180"></el-table-column>
           <el-table-column prop="CQ_FEE_GH"  label="长期欠费额" align="center"  sortable width="180"></el-table-column>

           <el-table-column prop="DY_FEE_GH"  label="当月欠费" align="center"  sortable width="180"></el-table-column>
           <el-table-column prop="YQ1Y_FEE_GH"  label="逾期1个月欠费" align="center"  sortable width="180"></el-table-column>
           <el-table-column prop="YQ2Y_FEE_GH"  label="逾期2个月欠费" align="center"  sortable width="180"></el-table-column>
           <el-table-column prop="YQ3Y_FEE_GH"  label="逾期3个月欠费" align="center"  sortable width="180"></el-table-column>
           <el-table-column prop="YQ4Y_FEE_GH"  label="逾期4个月欠费" align="center"  sortable width="180"></el-table-column>
           <el-table-column prop="YQ5Y_FEE_GH"  label="逾期5个月欠费及以上" align="center"  sortable width="200"></el-table-column>

           <el-table-column prop="PAY_MODE"  label="是否代收" align="center"  sortable width="180"></el-table-column>
           <el-table-column prop="IS_CB"  label="是否CB" align="center"  sortable width="180"></el-table-column>
           <el-table-column prop="CONTACT_PHONE"  label="报障联系电话" align="center"  sortable width="180"></el-table-column>
           <el-table-column prop="IPTV_ACCT_NO"  label="IPTV账号" align="center"  sortable width="180"></el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>
<script>
import qs from "qs";
export default {
  props:["sendParams"],
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
      ],
    };
  },
  methods: {
    sendMsg() {
      const param = {
        dialogCompent: "arrearsSecond",
        dialogTitle: "欠费"
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
    getDetailList(params){
       let that = this;
      this.$axios
        .get(
          "/arrearage/getTableData?" +
            qs.stringify({ JsonParam: JSON.stringify(params) })
        )
        .then(function(res) {
          console.log("table3", res);
          if (res.data.resultCode === "1") {
            let resultData = res.data.resultData;
            that.tableData = resultData;
          }
        })
        .catch(function(e) {});
    }
  },
  mounted:function(){
    let _this = this;
    this.getDetailList(_this.sendParams)
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
.icon_goback {
  width: 44px;
  cursor: pointer;
}
</style>

