<template>
    <div>
        <div class="formula_out formula_list">
            <h3 class="border"></h3>
            <h3 class="formula">计算公式</h3>
            <img src="~@/assets/images/wh-icon.png" alt class="wh" @click="changeFormula(isText)">
            <div class="formula_list" style="margin:0 10px;flex-wrap:wrap;">
                <h3 class="jsdesc-b">{{formula[0]}}</h3>
                <img src="~@/assets/images/icon_dh.png" alt class="icon_jh">
                <h3 class="jsdesc">{{formula[1]}}</h3>
                <img src="~@/assets/images/icon_jiah.png" alt class="icon_jh">
                <h3 class="jsdesc">{{formula[2]}}</h3>
                <img src="~@/assets/images/icon_jiah.png" alt class="icon_jh">
                <h3 class="jsdesc">{{formula[3]}}</h3>
                <img src="~@/assets/images/icon_jiah.png" alt class="icon_jh">
                <h3 class="jsdesc">{{formula[4]}}</h3>
                <img src="~@/assets/images/icon_jiah.png" alt class="icon_jh">
                <h3 class="jsdesc">{{formula[5]}}</h3>
                <img src="~@/assets/images/icon_jh_red.png" alt class="icon_jh">
                <h3 class="xsdesc">{{formula[6]}}</h3>
            </div>
            <el-button class="btn-detail" @click="isDetail = !isDetail">详情</el-button>
        </div>
        <div class="incomeCont" v-if="!isDetail">
            <div class="lf-cont">
                <div class="title">收入结构</div>
                <div>
                    <el-radio-group v-model="radio">
                        <el-radio label="当月"></el-radio>
                        <el-radio label="累计"></el-radio>
                    </el-radio-group>
                    <el-date-picker v-model="date" type="month" placeholder="选择日期"></el-date-picker>
                </div>
                <div class="chartDiv">
                    <Chart :id="'profitPie'" :title="'同比分析'" :type="'pie'" :dataset="barChart.dataset" :color="barChart.colors"></Chart>
                </div>
                <el-radio-group v-model="tabVal">
                    <el-radio-button label="zlr">准利润</el-radio-button>
                    <el-radio-button label="lr">利润</el-radio-button>
                </el-radio-group>
            </div>
            <div class="rt-cont">
                <div class="chartDiv">
                    <Chart :id="'profitLine'" :title="'利润、准利润完成趋势'" :type="'line'" :dataset="lineChart.dataset" :color="lineChart.colors"></Chart>
                </div>
                <div class="chartDiv">
                    <Chart :id="'profitBar'" :title="'同比分析'" :type="'bar'" :dataset="barChart.dataset" :color="barChart.colors"></Chart>
                </div>
            </div>
        </div>
        <div class="incomeCont" v-if="isDetail">
            <div>三级</div>
        </div>
    </div>
</template>

<script>
import Chart from "../../components/profitSedChart.vue";

export default {
    components: { Chart },
    data() {
        return {
            isDetail: false,
            isText:false,
            formula:[2000000,2000000,2000000,2000000,2000000,2000000,2000000],
            radio:"",
            date:"",
            tabVal:"zlr",
            lineChart: {
                dataset: {
                    legendData:[
                        {name:"利润"}, 
                        {name:"准利润"}
                    ],
                    xAxis: ["12月","1月", "2月", "3月", "4月","5月","6月","7月","8月","9月","10月","11月","12月"],
                    data: [
                        [100,200,300,400,500,100,200,300,400,500,100,200,300],
                        [500,400,300,200,100,500,400,300,200,100,500,400,300]
                    ]
                },
                colors: ["#0097FF","#F7E43C"]
            },
            barChart: {
                dataset: {
                    legendData:[
                        {name:"2018",icon:"path://M 100 100 L 300 100 L 300 300 L 100 300 z"}, 
                        {name:"2019",icon:"path://M 100 100 L 300 100 L 300 300 L 100 300 z"}
                    ],
                    xAxis: ["1月", "2月", "3月", "4月","5月","6月","7月","8月","9月","10月","11月","12月"],
                    data: [
                        [100,200,300,400,500,100,200,300,400,500,100,200],
                        [500,400,300,200,100,500]
                    ]
                },
                colors: ["#F868AF","#3AA3F3"]
            }
        };
    },
    methods:{
        changeFormula(isText){
            this.isText = !isText;
            if(isText){
                this.formula = [2000000,2000000,2000000,2000000,2000000,2000000,2000000];
            }else{
                this.formula = ['收入完成','收入完成','收入完成','收入完成','收入完成','收入完成','收入完成']
            }
        }
    }
}
</script>

<style scoped lang="less">
.incomeCont{
    width: 100%;
    height: 100%;
    .lf-cont{
        float: left;
        width: 30%;
        height: 100%;
        .title{
            text-align: center;
            font-size: 18px;
            font-weight: bold;
            color: #24FAFF;
        }
    }
    .rt-cont{
        width: 70%;
        margin-left: 30%;
        border-left: 1px solid #5fb6f9;
    }
    .chartDiv{
        width: 100%;
        height: 220px;
    }
}
.btn-detail,.btn-detail:hover,.btn-detail:focus{
    background-image: linear-gradient(-225deg, #a834ef 0%, #2ac6ff 100%);
    border: none;
    color: #fff;
}
.formula_list {
  display: flex;
  align-items: center;
  justify-content: flex-start;
}
.formula_out {
  border-bottom: 1px solid #5fb6f9;
  margin-bottom: 20px;
  padding-bottom: 10px;
}
.formula {
  font-family: "PingFangSC-Medium";
  font-size: 20px;
  color: #ffffff;
  flex: 0 0 50px;
}
.border {
  width: 5px;
  height: 18px;
  background: linear-gradient(to bottom, #9bd9fc, #3096fc);
  margin-right: 10px;
}
.wh {
  margin-left: 10px;
  width: 28px;
  cursor: pointer;
}
.icon_l {
  width: 14px;
  margin-bottom: 10px;
}
.icon_h {
  width: 12px;
  margin-bottom: 10px;
}
.icon_jh {
  width: 30px;
  margin-left: 10px;
  margin-right: 10px;
  margin-bottom: 10px;
}
.jsdesc-b {
  background: url("~@/assets/images/icon_bg_bigblue.png") left top no-repeat;
  background-size: 100% 100%;
  width: 100px;
  height: 60px;
  line-height: 60px;
  text-align: center;
  font-size: 12px;
  color: #6afffd;
  padding: 0 10px;
  margin-bottom: 10px;
}
.jsdesc {
  background: url("~@/assets/images/icon_bg_b.png") left top no-repeat;
  background-size: 100% 100%;
  width: 100px;
  height: 32px;
  line-height: 32px;
  text-align: center;
  font-size: 12px;
  color: #6afffd;
  padding: 0 10px;
  margin-bottom: 10px;
}
.xsdesc {
  background: url("~@/assets/images/icon_bg_o.png") left top no-repeat;
  background-size: 100% 100%;
  width: 100px;
  height: 32px;
  line-height: 32px;
  text-align: center;
  font-size: 12px;
  font-size: 12px;
  color: #ffe104;
  padding: 0 10px;
  margin-bottom: 10px;
}
</style>