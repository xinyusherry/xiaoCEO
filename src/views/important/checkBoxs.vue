<template>
  <div>
    <div class="flexcc">
      <div style="color:#F84252">注：（指标最多选择三条）</div>
      <el-radio-group v-model="dateType" style="margin:0 20px;">
        <el-radio label="D">日</el-radio>
        <el-radio label="M">月</el-radio>
      </el-radio-group>
      <el-date-picker
        format="yyyy-MM-dd"
        value-format="yyyyMMdd"
        v-show="dateType=='D'"
        v-model="dateD"
        type="date"
        placeholder="选择日期"
      ></el-date-picker>
      <el-date-picker
        format="yyyy-MM"
        value-format="yyyyMM"
        v-show="dateType=='M'"
        v-model="dateM"
        type="month"
        placeholder="选择日期"
      ></el-date-picker>
    </div>
    <ul class="checkBoxUL">
      <li v-for="(typeLi,liIndex) in checkOptions" :key="liIndex">
        <div class="li-title" :id="typeLi.PRO_TYPE">{{typeLi.PRO_TYPE_NAME}}</div>
        <el-checkbox-group v-model="typeLi.checkedIds" :min="0" :max="3">
          <el-checkbox
            v-for="(product,index) in typeLi.productList"
            :label="product.PRODUCT_CODE"
            :checked="product.IS_DEFAULT==1"
            @change="changeBox()"
            :key="index"
          >{{product.PRODUCT_NAME}}</el-checkbox>
        </el-checkbox-group>
      </li>
    </ul>
    <div class="footBtns">
      <div class="btn" @click="sendMsg(false)">取消</div>
      <div class="btn okBtn" @click="sendMsg(true)">确定</div>
    </div>
  </div>
</template>

<script>
import qs from "qs";
export default {
  data() {
    return {
      dateD: "",
      dateM: "",
      dateType: "",
      checkedIds: [],
      checkOptions: []
    };
  },
  methods: {
    post() {
      let _this = this;
      this.$axios
        .get("/Workbench/getKeyTarget")
        .then(function(res) {
          let resultData = res.data.resultData;
          _this.dateType = resultData.MORD;
          _this.dateD = resultData.dayId;
          _this.dateM = resultData.monthId;
          _this.checkOptions = resultData.rTarget;
          resultData.rTarget.map((obj, index) => {
            _this.$set(_this.checkOptions[index], "checkedIds", []);
          });
        })
        .catch(function(e) {
          console.log(e);
        });
    },
    sendMsg(isOk) {
      if (isOk) {
        let date = this.dateType === "M" ? "monthId" : "dayId";
        const param = {
          MORD: this.dateType,
          [date]: this.dateType === "D" ? this.dateD : this.dateM,
          proCodes: this.checkedIds
        };
        this.submit(param);
        this.$emit("headCallBack", false, param);
      } else {
        this.$emit("headCallBack", false);
      }
    },
    setDefault() {
      const resultData = {
        MORD: "D",
        dayId: "20190302",
        monthId: "201902",
        rTarget: [
          {
            PRO_TYPE: "001",
            PRO_TYPE_NAME: "业务类",
            productList: [
              {
                XZ_GROUP: "10",
                PRODUCT_NAME: "单卡：冰红99/129+尊享红199/398/599/799",
                IS_DEFAULT: 1,
                PRODUCT_CODE: "001001"
              },
              {
                XZ_GROUP: "10",
                PRODUCT_NAME: "融合：全家红138+尊享红融合199/398/599/799",
                IS_DEFAULT: 1,
                PRODUCT_CODE: "001002"
              },
              {
                XZ_GROUP: "10",
                PRODUCT_NAME: "尊红迁转",
                IS_DEFAULT: 0,
                PRODUCT_CODE: "001003"
              },
              {
                XZ_GROUP: "10",
                PRODUCT_NAME: "M计划",
                IS_DEFAULT: 1,
                PRODUCT_CODE: "001004"
              },
              {
                XZ_GROUP: "10",
                PRODUCT_NAME: "TV增值线下销售情况",
                IS_DEFAULT: 0,
                PRODUCT_CODE: "001005"
              },
              {
                XZ_GROUP: "10",
                PRODUCT_NAME: "智家发展",
                IS_DEFAULT: 0,
                PRODUCT_CODE: "001006"
              },
              {
                XZ_GROUP: "10",
                PRODUCT_NAME: "自建厅移动发展",
                IS_DEFAULT: 0,
                PRODUCT_CODE: "001007"
              },
              {
                XZ_GROUP: "10",
                PRODUCT_NAME: "核心渠道99及以上",
                IS_DEFAULT: 0,
                PRODUCT_CODE: "001008"
              },
              {
                XZ_GROUP: "10",
                PRODUCT_NAME: "核心渠道138及以上",
                IS_DEFAULT: 0,
                PRODUCT_CODE: "001009"
              },
              {
                XZ_GROUP: "10",
                PRODUCT_NAME: "存拉移",
                IS_DEFAULT: 0,
                PRODUCT_CODE: "001010"
              },
              {
                XZ_GROUP: "10",
                PRODUCT_NAME: "存拉宽",
                IS_DEFAULT: 0,
                PRODUCT_CODE: "001011"
              },
              {
                XZ_GROUP: "10",
                PRODUCT_NAME: "业务发展有效能人数量",
                IS_DEFAULT: 0,
                PRODUCT_CODE: "001012"
              },
              {
                XZ_GROUP: "10",
                PRODUCT_NAME: "宽带融合发展量",
                IS_DEFAULT: 0,
                PRODUCT_CODE: "001013"
              },
              {
                XZ_GROUP: "10",
                PRODUCT_NAME: "社会渠道宽带融合轻工具发展",
                IS_DEFAULT: 0,
                PRODUCT_CODE: "001014"
              }
            ]
          },
          {
            PRO_TYPE: "002",
            PRO_TYPE_NAME: "拆机类",
            productList: [
              {
                XZ_GROUP: "20",
                PRODUCT_NAME: "移动主拆",
                IS_DEFAULT: 0,
                PRODUCT_CODE: "002001"
              },
              {
                XZ_GROUP: "20",
                PRODUCT_NAME: "移动欠拆",
                IS_DEFAULT: 0,
                PRODUCT_CODE: "002002"
              },
              {
                XZ_GROUP: "20",
                PRODUCT_NAME: "宽带主拆",
                IS_DEFAULT: 0,
                PRODUCT_CODE: "002003"
              },
              {
                XZ_GROUP: "20",
                PRODUCT_NAME: "宽带欠拆",
                IS_DEFAULT: 0,
                PRODUCT_CODE: "002004"
              }
            ]
          }
        ]
      };
      this.dateType = resultData.MORD;
      this.dateD =
        resultData.dayId.slice(0, 4) +
        "-" +
        resultData.dayId.slice(4, 6) +
        "-" +
        resultData.dayId.slice(6, 8);
      this.dateM =
        resultData.monthId.slice(0, 4) + "-" + resultData.monthId.slice(4, 6);
      this.checkOptions = resultData.rTarget;
      resultData.rTarget.map((obj, index) => {
        this.$set(this.checkOptions[index], "checkedIds", []);
      });
    },
    changeBox() {
      this.checkedIds = [];
      this.checkOptions.map((obj, index) => {
        this.checkedIds = this.checkedIds.concat(obj.checkedIds);
      });
    },
    submit(params) {
      this.$axios
        .get(
          "/Workbench/setKeyTarget?" +
            qs.stringify({ JsonParam: JSON.stringify(params) })
        )
        .then(function(res) {
          console.log("成功了吗？",res)
        })
        .catch(e => {});
    }
  },
  created() {
    // setTimeout(() => {
    //   this.setDefault();
    // }, 0);
    this.post();
  }
};
</script>

<style>
.checkBoxUL .el-checkbox__inner {
  background-color: transparent;
}
.el-checkbox__label {
  color: #fff;
}
</style>
<style scoped lang="less">
.flexcc {
  display: flex;
  justify-content: center;
  align-items: center;
}
.checkBoxUL {
  color: #fff;
  .li-title {
    width: 100px;
    height: 30px;
    line-height: 30px;
    text-align: center;
    border: 1px solid #5fb6f9;
    border-radius: 3px;
    margin: 10px 0;
  }
  .el-checkbox-group {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    .el-checkbox {
      flex: 0 1 25%;
      margin: 8px 0;
    }
  }
}
.footBtns {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  .btn {
    width: 100px;
    border: 1px solid #fff;
    color: #fff;
    border-radius: 4px;
    height: 32px;
    line-height: 32px;
    font-size: 14px;
    text-align: center;
    margin: 0 20px;
    cursor: pointer;
  }
  .okBtn {
    border: none;
    background-image: linear-gradient(-135deg, #9bd9fc 0%, #3096fc 100%);
  }
}
</style>