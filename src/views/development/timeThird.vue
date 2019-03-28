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
        height="300"
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
      date: this.sendParams.acctDay || "",
      zyxType: this.sendParams.zyxType,
      devType: this.sendParams.devType,
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
        dialogCompent: "dvlpTimeSed",
        dialogTitle: "发展（实时）"
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
        acctDay: _this.date,
        zyxType: _this.zyxType,
        devType: _this.devType
      };
      this.$axios
        .get(
          "/DevelopRealTime/getDetailData?" +
            qs.stringify({ JsonParam: JSON.stringify(params) })
        )
        .then(function(res) {
          let data = res.data;
          const head = {
            SERIAL_NUMBER: "设备号码",
            DEVELOP_NAME: "发展人",
            PRODUCT_NAME: "资费",
            FINISH_DATE: "完工日期",
            CHL_NAME: "发展渠道"
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
        .catch(function(e) {
          /* let data = {
            loginId: "admin",
            resultData: [
              {
                SERIAL_NUMBER: "02200284564",
                DEVELOP_NAME: "孟莹",
                PRODUCT_NAME: "天津宽带300M-50元/月",
                FINISH_DATE: 1551414218000,
                CHL_NAME: "河西区绍兴道标准营业厅"
              },
              {
                SERIAL_NUMBER: "02201783865",
                DEVELOP_NAME: "张辰",
                PRODUCT_NAME: "天津宽带100M包月-30元/月",
                FINISH_DATE: 1551420352000,
                CHL_NAME: "河西区绍兴道标准营业厅"
              },
              {
                SERIAL_NUMBER: "02201747036",
                DEVELOP_NAME: "河西展腾达通讯3G合作代理点",
                PRODUCT_NAME: "天津宽带300M-50元/月",
                FINISH_DATE: 1551408319000,
                CHL_NAME: "河西围堤道展腾达通讯合作厅"
              },
              {
                SERIAL_NUMBER: "02201726271",
                DEVELOP_NAME: "河西利民道奥腾世纪科技合作厅",
                PRODUCT_NAME: "天津宽带100M包月-30元/月",
                FINISH_DATE: 1551406277000,
                CHL_NAME: "河西利民道奥腾世纪科技合作厅"
              },
              {
                SERIAL_NUMBER: "02201750930",
                DEVELOP_NAME: "西青大寺镇贾庄子鑫鸿通科技标准合作厅",
                PRODUCT_NAME: "天津宽带300M-50元/月",
                FINISH_DATE: 1551417020000,
                CHL_NAME: "河西电信建设工程绍兴道代维公众社会直销"
              },
              {
                SERIAL_NUMBER: "02201682559",
                DEVELOP_NAME: "郑玉鹏",
                PRODUCT_NAME: "天津宽带100M包月-30元/月",
                FINISH_DATE: 1551410908000,
                CHL_NAME: "河西客户服务部维系团队"
              }
            ],
            loginName: "管理员",
            resultCode: "1",
            resultDesc: "success"
          };
          const head = {
            SERIAL_NUMBER: "设备号码",
            DEVELOP_NAME: "发展人",
            PRODUCT_NAME: "资费",
            FINISH_DATE: "完工日期",
            CHL_NAME: "发展渠道"
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
          }; */
        });
    }
  },
  created() {
    this.post();
  },
  watch: {
    date(val) {
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

