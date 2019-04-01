<template>
  <div>
    <div>
      <div class="flexbet">
        <el-radio-group v-model="tabVal">
           <el-radio-button label="dj">趸交</el-radio-button>
          <el-radio-button label="xy">续约</el-radio-button>
        </el-radio-group>
        <div class="rightBtn btnList">
          <el-date-picker v-model="date" type="date" placeholder="选择日期" style="margin-right:20px" @change="dateChange"></el-date-picker>
          <div class="down mr20">下载</div>
        </div>
      </div>
      <div v-show="tabVal=='dj'">
        <div class="tabDiv">
          <el-form :inline="true" :model="formInlineDJ" class="demo-form-inline">
            <el-form-item label="是否CBSS">
              <el-select v-model="formInlineDJ.isCB" size="small">
                <el-option label="全部" value="-1"></el-option>
                <el-option label="是" value="Y"></el-option>
                <el-option label="否" value="N"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="是否续约">
              <el-select v-model="formInlineDJ.ifXY" size="small">
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
            <el-form-item label="提前提醒月份">
              <el-select v-model="formInlineDJ.yfType" multiple collapse-tags size="small">
                <el-option label="1月" value="1"></el-option>
                <el-option label="2月" value="2"></el-option>
                <el-option label="3月" value="3"></el-option>
                <el-option label="当月" value="0"></el-option>
                <el-option label="上月" value="sy"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" size="small" @click="getTabDate">查询</el-button>
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
            <el-table-column prop="USER_NO" align="center" label="用户ID" width="180"></el-table-column>
            <el-table-column align="center" prop="DEVICE_NUMBER" label="设备号码" width="180" sortable></el-table-column>
            <el-table-column prop="VILLAGE_NAME" align="center" label="归属小区"  width="180" sortable></el-table-column>
            <el-table-column align="center" prop="JL_NAME" label="所属经理" width="180" sortable></el-table-column>

            <el-table-column align="center" prop="WG_NAME" label="所属分局" width="180" sortable></el-table-column>
            <el-table-column align="center" prop="CUST_NAME" label="客户姓名" width="180" sortable></el-table-column>
            <el-table-column align="center" prop="PRODCUT_NAME" label="产品名称" width="180" sortable></el-table-column>

             <el-table-column align="center" prop="ACCT_FEE" label="本月出账收入（元）" width="200" sortable></el-table-column>
            <el-table-column align="center" prop="IN_DATE" label="开户时间" width="180" sortable></el-table-column>
            <el-table-column align="center" prop="INSTALL_ADDRESS" label="详细地址" width="180" sortable></el-table-column>

             <el-table-column align="center" prop="FENJU_NAME" label="局向" width="180" sortable></el-table-column>
            <el-table-column align="center" prop="DEVICE_NUMBER_GH" label="对应固话" width="180" sortable></el-table-column>
            <el-table-column align="center" prop="PHONE_NUMBER" label="联系电话" width="180" sortable></el-table-column>

             <el-table-column align="center" prop="IF_FTTH" label="是否FTTH" width="180" sortable></el-table-column>
            <el-table-column align="center" prop="IF_IPTV" label="是否IPTV" width="180" sortable></el-table-column>
            <el-table-column align="center" prop="AD_RATE" label="宽带速率" width="180" sortable></el-table-column>

             <el-table-column align="center" prop="ACCOUNT_NO" label="宽带上网账号" width="180" sortable></el-table-column>
            <el-table-column align="center" prop="YJ_SVC_NAME" label="预警业务类型" width="180" sortable></el-table-column>
            <el-table-column align="center" prop="ACTIVE_NAME" label="活动名称" width="180" sortable></el-table-column>

               <el-table-column align="center" prop="START_DATE" label="开始时间" width="180" sortable></el-table-column>
            <el-table-column align="center" prop="END_DATE" label="结束时间" width="180" sortable></el-table-column>
            <el-table-column align="center" prop="YJ_MONTH" label="提前提醒月份" width="180" sortable></el-table-column>

               <el-table-column align="center" prop="XY_START_DATE" label="续约生效时间" width="180" sortable></el-table-column>
            <el-table-column align="center" prop="XY_END_DATE" label="续约结束时间" width="180" sortable></el-table-column>
            <el-table-column align="center" prop="XY_ACTIVE_NAME" label="续约活动名称" width="180" sortable></el-table-column>

                   <el-table-column align="center" prop="XY_TYPE" label="续约类型" width="180" sortable></el-table-column>
            <el-table-column align="center" prop="XY_ACCEPT_DATE" label="续约订购时间" width="180" sortable></el-table-column>
            <el-table-column align="center" prop="CONTACT_PHONE" label="报障联系电话" width="180" sortable></el-table-column>

                   <el-table-column align="center" prop="IPTV_ACCT_NO" label="IPTV帐号" width="180" sortable></el-table-column>
            <el-table-column align="center" prop="SL_STAFF_NAME" label="受理员工姓名" width="180" sortable></el-table-column>
          </el-table>
        </div>
      </div>
      <div v-show="tabVal=='xy'">
        <div class="tabDiv">
          <el-form :inline="true" :model="formInlineXY" class="demo-form-inline">
            <el-form-item label="是否续约">
              <el-select v-model="formInlineXY.ifXY" size="small">
                <el-option label="全部" value="-1"></el-option>
                <el-option label="是" value="Y"></el-option>
                <el-option label="否" value="N"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="预警业务类型">
              <el-select v-model="formInlineXY.yjType" size="small">
                <el-option label="自备机存费送费合约计划" value="101"></el-option>
                <el-option label="存费送业务活动" value="106"></el-option>
                <el-option label="CBSS存费送及机" value="107"></el-option>
                <el-option label="CBSS存费送业务" value="108"></el-option>
                <el-option label="CBSS存费送费" value="109"></el-option>
                <el-option label="CBSS合约惠机" value="110"></el-option>
               
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" size="small"  @click="getTabDate">查询</el-button>
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
             <el-table-column prop="USER_NO" align="center" label="用户ID" width="180"></el-table-column>
            <el-table-column align="center" prop="DEVICE_NUMBER" label="设备号码" width="180" sortable></el-table-column>
            <el-table-column prop="VILLAGE_NAME" align="center" label="归属小区" width="180" sortable></el-table-column>
            <el-table-column align="center" prop="JL_NAME" label="所属经理" width="180" sortable></el-table-column>

            <el-table-column align="center" prop="WG_NAME" label="所属分局" width="180" sortable></el-table-column>
            <el-table-column align="center" prop="CUST_NAME" label="客户姓名" width="180" sortable></el-table-column>
            <el-table-column align="center" prop="PRODCUT_NAME" label="产品名称" width="180" sortable></el-table-column>

             <el-table-column align="center" prop="ACCT_FEE" label="本月出账收入（元）" width="200" sortable></el-table-column>
            <el-table-column align="center" prop="IN_DATE" label="开户时间" width="180" sortable></el-table-column>
            <el-table-column align="center" prop="INSTALL_ADDRESS" label="详细地址" width="180" sortable></el-table-column>

             <el-table-column align="center" prop="FENJU_NAME" label="局向" width="180" sortable></el-table-column>
            <el-table-column align="center" prop="DEVICE_NUMBER_GH" label="对应固话" width="180" sortable></el-table-column>
            <el-table-column align="center" prop="PHONE_NUMBER" label="联系电话" width="180" sortable></el-table-column>

             <el-table-column align="center" prop="IF_FTTH" label="是否FTTH" width="180" sortable></el-table-column>
            <el-table-column align="center" prop="IF_IPTV" label="是否IPTV" width="180" sortable></el-table-column>
            <el-table-column align="center" prop="AD_RATE" label="宽带速率" width="180" sortable></el-table-column>

             <el-table-column align="center" prop="ACCOUNT_NO" label="宽带上网账号" width="180" sortable></el-table-column>
            <el-table-column align="center" prop="YJ_SVC_NAME" label="预警业务类型" width="180" sortable></el-table-column>
            <el-table-column align="center" prop="ACTIVE_NAME" label="活动名称" width="180" sortable></el-table-column>

               <el-table-column align="center" prop="START_DATE" label="开始时间" width="180" sortable></el-table-column>
            <el-table-column align="center" prop="END_DATE" label="结束时间" width="180" sortable></el-table-column>
            <el-table-column align="center" prop="YJ_MONTH" label="提前提醒月份" width="180" sortable></el-table-column>

               <el-table-column align="center" prop="XY_START_DATE" label="续约生效时间" width="180" sortable></el-table-column>
            <el-table-column align="center" prop="XY_END_DATE" label="续约结束时间" width="180" sortable></el-table-column>
            <el-table-column align="center" prop="XY_ACTIVE_NAME" label="续约活动名称" width="180" sortable></el-table-column>

                   <el-table-column align="center" prop="XY_TYPE" label="续约类型" width="180" sortable></el-table-column>
            <el-table-column align="center" prop="XY_ACCEPT_DATE" label="续约订购时间" width="180" sortable></el-table-column>
            <el-table-column align="center" prop="CONTACT_PHONE" label="报障联系电话" width="180" sortable></el-table-column>

            <el-table-column align="center" prop="IPTV_ACCT_NO" label="IPTV帐号" width="180" sortable></el-table-column>
            <el-table-column align="center" prop="SL_STAFF_NAME" label="受理员工姓名" width="180" sortable></el-table-column>
          </el-table>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import qs from "qs";
import moment from "moment";
export default {
  props:['sendParams'],
  data() {
    return {
      date: new Date(new Date().getTime() - 24 * 60 * 60 * 1000),
      tabVal: "dj",
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
      tableData1: [],
      tableData2: [],
      formInlineXY:{
        isCB:"-1",
        yjType:"101",
        ywType:"06",
        ifXY:"-1"
      },
      formInlineDJ:{
        isCB:"-1",
        yjType:"001",
        yfType:['1'],
        ifXY:"-1",
        ywType:"06"
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
    },
    daoQiWarningYDDayJl(params){
      let _this = this;
      this.$axios
        .get(
          "/maturityWarning/daoQiWarningYDDayJl?" +
            qs.stringify({ JsonParam: JSON.stringify(params) })
        )
        .then(function(res) {
          //console.log('续约表格',res)
          if (res.data.resultCode === "1") {
            let resultData = res.data.resultData;
            _this.tableData2 = resultData
          }else{
            _this.tableData2 = []
          }
        })
        .catch(function(e) {});
  },
     daoQiWarningGWDayJl(params){
       let _this = this;
      this.$axios
        .get(
          "/maturityWarning/daoQiWarningGWDayJl?" +
            qs.stringify({ JsonParam: JSON.stringify(params) })
        )
        .then(function(res) {
          //console.log('趸交表格',res)
          if (res.data.resultCode === "1") {
            let resultData = res.data.resultData;
            _this.tableData1 = resultData
          }else{
            _this.tableData1 = []
          }
        })
        .catch(function(e) {});
  },
  dateChange(val){
    this.getTabDate();
  },
  getTabDate(){
    let _this = this;
    if(_this.tabVal === "dj"){
       const djParam = {
       dayId:moment(_this.date).format('YYYYMMDD'),
      ifXY:_this.formInlineDJ.ifXY,
      yjType:_this.formInlineDJ.yjType,
      yfType:_this.formInlineDJ.yfType.join(','),
      isCB:_this.formInlineDJ.isCB,
       ywType:"06"
    }
    _this.daoQiWarningGWDayJl(djParam);
    }else{
       const params = {
      dayId:moment(_this.date).format('YYYYMMDD'),
      ifXY:_this.formInlineXY.ifXY,
      yjType:_this.formInlineXY.yjType
    }
    _this.daoQiWarningYDDayJl(params);
    }
   
   
  }
  },
  mounted:function(){
    // dayId,ifXY,yjType
    let _this = this;
    // const params = {
    //   dayId:"20190316",
    //   ifXY:_this.formInlineXY.ifXY,
    //   yjType:"109"
    // }
    // this.daoQiWarningYDDayJl(params);
    const djParam = {
       dayId:moment(_this.date).format('YYYYMMDD'),
      ifXY:_this.formInlineDJ.ifXY,
      yjType:_this.formInlineDJ.yjType,
      yfType:_this.formInlineDJ.yfType.join(','),
      ywType:"06"
    }
    this.daoQiWarningGWDayJl(djParam);
    this.getTabDate();
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

