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
            :disabled="product.XZ_GROUP!==checkType&&checkType!=='any'"
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
  props:['sendParams'],
  data() {
    return {
      dateD: "",
      dateM: "",
      dateType: "",
      checkedIds: [],
      checkOptions: [],
      checkedData: [],
      optionList: [],
      checkType:'any'
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
          _this.checkedData = [];
          resultData.rTarget.map(v => {
            _this.optionList = _this.optionList.concat(v.productList);
          });
          resultData.rTarget.map((obj, index) => {
            obj.productList.map(v => {
              if (v.IS_DEFAULT == 1)
                _this.checkedData.push({
                  type: v.XZ_GROUP,
                  value: v.PRODUCT_CODE
                });
            });
            _this.$set(_this.checkOptions[index], "checkedIds", []);
          });
        })
        .catch(function(e) {
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
        //this.submit(param);
        this.$emit("headCallBack", false, param);
      } else {
        this.$emit("headCallBack", false);
      }
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
        })
        .catch(e => {});
    }
  },
  created() {
    this.post();
  },
  watch: {
    checkedData: {
      handler(newValue, oldValue) {
        this.checkedIds = newValue.map(v => v.value);
      },
      immediate: false,
      deep: true
    },
    checkedIds(n, v) {
      if (n.length > 0) {
        this.optionList.find(v => {
          if (v.PRODUCT_CODE === n[0]) {
            this.checkType = v.XZ_GROUP;
          }
        });
      } else {
        this.checkType = "any";
      }
    }
  },
  computed: {
    checkType() {
      if (this.checkedData.length == 0) {
        return "any";
      } else {
        return this.checkedData[0].type;
      }
    }
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