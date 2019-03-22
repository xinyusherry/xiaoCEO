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
      <el-button class="btn-detail" @click="isDetail = true">详情</el-button>
    </div>
    <div class="incomeCont" v-show="!isDetail">
      <div class="lf-cont">
        <div class="title">收入结构</div>
        <div class="flexcc" style="padding-right:10px;margin-top:20px">
            <el-radio-group v-model="radio">
                <el-radio label="dy" style="margin-right:10px">当月</el-radio>
                <el-radio label="lj">累计</el-radio>
            </el-radio-group>
            <el-date-picker size="small" v-model="date" type="month" placeholder="选择日期" style="flex:0 0 130px;margin-left:20px"></el-date-picker>
        </div>
        <div class="chartDiv" id="incomePie" style="padding-right:10px"></div>
        <el-radio-group v-model="tabVal" size="small" style="margin-top:20px">
            <el-radio-button label="fyw">收入分业务</el-radio-button>
            <el-radio-button label="fcp">收入分产品</el-radio-button>
            <el-radio-button label="dgs">收入大工商</el-radio-button>
        </el-radio-group>
      </div>
      <div class="rt-cont">
        <div class="chartDiv" id="incomeBar"></div>
        <div class="chartDiv" id="incomeLine"></div>
      </div>
    </div>
    <div class="incomeCont" v-show="isDetail">
        <incomeTrd @callback="callback"></incomeTrd>
    </div>
  </div>
</template>

<script>
import incomeTrd from "@/views/income/incomeTrd.vue";
export default {
  components: {incomeTrd},
  data() {
    let [dataArr1,dataArr2,dataArr3,dataArr4]=[[],[],[],[]];
    for(let i=0;i<12;i++){
      dataArr1.push(Math.floor(Math.random()*100));
      dataArr2.push(Math.floor(Math.random()*100));
      dataArr3.push(Math.floor(Math.random()*100));
      dataArr4.push(Math.floor(Math.random()*100));
    }
    return {
      isDetail: false,
      isText:false,
      formula:[2000000,2000000,2000000,2000000,2000000,2000000,2000000],
      radio:"dy",
      date:"2019-03",
      tabVal:"fyw",
      barDataset:{
        xAxis: ["1月", "2月", "3月", "4月","5月","6月","7月","8月","9月","10月","11月","12月"],
        data: [
          [50,40,30,20,10,50,50,40,80,20,10,50],
          [80,120,230,340,340,60,120,270,380,480,40,30],
          [100,200,300,400,500,100,200,300,400,500,100,200]
        ]
      },
      lineDataset:{
        xAxis: ["1月", "2月", "3月", "4月","5月","6月","7月","8月","9月","10月","11月","12月"],
        data: [
          dataArr1,dataArr2,dataArr3,dataArr4
        ]
      },
      pieDataset:{
        data:[
          { value: 50, name: "单卡" },
          { value: 20, name: "固网" },
          { value: 20, name: "融合" }
        ]
      }
    };
  },
  watch:{
    radio(val){
      this.changePieData(val,this.date,this.tabVal);
    },
    date(val){
      this.changePieData(this.radio,val,this.tabVal);
    },
    tabVal(val){
      this.changePieData(this.radio,this.date,val);
    },
    'barDataset': {
      handler(newVal, oldVal) {
          this.drawLineChart("incomeBar","收入完成",newVal);
      },
      immediate: false,
      deep: true
    },
    'lineDataset': {
      handler(newVal, oldVal) {
          this.drawLineChart("incomeLine","存量收入保有率",newVal);
      },
      immediate: false,
      deep: true
    },
    'pieDataset': {
      handler(newVal, oldVal) {
          this.drawPieChart("incomePie",newVal);
      },
      immediate: false,
      deep: true
    }
  },
  methods:{
    changeFormula(isText){
      this.isText = !isText;
      if(isText){
          this.formula = [2000000,2000000,2000000,2000000,2000000,2000000,2000000];
      }else{
          this.formula = ['收入完成','收入完成','收入完成','收入完成','收入完成','收入完成','收入完成'];
      }
    },
    drawBarChart(id,title,dataset){
      let thisChart = this.$echarts.init(document.getElementById(id));
      thisChart.setOption({
          color: ["#F76B1C","#F868AF"],
          title: {
            left: 'center',
            text: title,
            textStyle:{
              color:"#6AFFFD"
            }
          },
          grid: {
            containLabel: true,
            top: "20%",
            bottom: "5%",
            left:"5%",
            right:"5%"
          },
          tooltip: {
            trigger: "axis",
            axisPointer:{
              type:"shadow"
            },
            textStyle:{
              fontSize:12
            },
            formatter: (params)=>{
              let result = '';
              result += params[0].name+"</br>"; 
              result += params[0].seriesName + " : " + params[0].value +"%</br>";
              result += params[1].seriesName + " : " + params[1].value +"万元</br>";
              result += params[2].seriesName + " : " + params[2].value +"万元</br>";
              return result;
            }
          },
          xAxis: {
          type: "category",
          boundaryGap: true,
          axisLabel:{
            color: "#24FAFF"
          },
          axisLine: {
            lineStyle: {
              color: "#3E6BCE"
            }
          },
          splitLine: {
              show: false
          },
          axisTick: {
              show: false
          },
          data: dataset.xAxis
          },
          yAxis: [{
            name:"累计完成值（万元）",
            type: "value",
            nameTextStyle:{
              color: "#24FAFF"
            },
            axisLabel:{
              color: "#24FAFF"
            },
            axisLine: {
              lineStyle: {
                color: "#3E6BCE"
              }
            },
            splitLine: {
              show: false
            },
            axisTick: {
              show: false
            }
          },
          {
            name:"预算完成率",
            type: "value",
            nameTextStyle:{
              color: "#24FAFF"
            },
            axisLabel:{
              color: "#24FAFF",
              formatter: '{value}%'
            },
            axisLine: {
              lineStyle: {
                color: "#3E6BCE"
              }
            },
            splitLine: {
              show: false
            },
            axisTick: {
              show: false
            }
          }],
          series: [
            {
              name:"预算完成率",
              type:"line",
              yAxisIndex:1,
              data: dataset.data[0],
              label:{
                show:true,
                color:"#fff",
                position:"top",
                formatter:"{c}%"
              }
            },
            {
              name:"累计完成值",
              type:"bar",
              barWidth:15,
              data: dataset.data[1],
              itemStyle:{
                barBorderRadius:[10, 10, 0, 0]
              }
            },
            {
              name:"累计目标值",
              type:"bar",
              barWidth:15,
              data: dataset.data[2],
              barGap:"-100%",
              itemStyle:{
                color:'transparent',
                borderColor:"#0097FF",
                borderWidth:1,
                borderType:"dashed"
              }
            }
          ]
      });
      window.addEventListener("resize", () => { 
          thisChart.resize();
      });
    },
    drawLineChart(id,title,dataset){
      var thisChart = this.$echarts.init(document.getElementById(id));
      thisChart.setOption({
          color: ["#0097FF","#429321","#EDC41C","#9F041B"],
          title: {
            left: 'center',
            text: title,
            textStyle:{
              color:"#24FAFF"
            }
          },
          legend:{
            data:["移动","固话","宽带","全部"],
            textStyle:{
              color:"#fff"
            },
            top:30
          },
          grid: {
            containLabel: true,
            top: "30%",
            bottom: "5%",
            left:"5%",
            right:"5%"
          },
          tooltip: {
            trigger: "axis",
            formatter: (params)=>{
              let result = '';
              params.forEach(function (item) {
                  result += item.marker + " " + item.seriesName + " : " + item.value +"%</br>";
              });
              return result;
            }
          },
          xAxis: {
            type: "category",
            boundaryGap: true,
            axisLabel:{
                color: "#24FAFF"
            },
            axisLine: {
                lineStyle: {
                color: "#3E6BCE"
                }
            },
            splitLine: {
                show: false
            },
            axisTick: {
                show: false
            },
            data: dataset.xAxis
          },
          yAxis: {
            type: "value",
            nameTextStyle:{
                color: "#24FAFF"
            },
            axisLabel:{
                color: "#24FAFF",
                formatter: '{value}%'
            },
            axisLine: {
                lineStyle: {
                color: "#3E6BCE"
                }
            },
            splitLine: {
                show: false
            },
            axisTick: {
                show: false
            }
          },
          series: [{
              name:"移动",
              type:"line",
              symbol:"none",
              data: dataset.data[0]
          },
          {
              name:"固话",
              type:"line",
              symbol:"none",
              data: dataset.data[1]
          },
          {
              name:"宽带",
              type:"line",
              symbol:"none",
              data: dataset.data[2]
          },
          {
              name:"全部",
              type:"line",
              symbol:"none",
              data: dataset.data[3]
          }]
      });
      window.addEventListener("resize", () => { 
          thisChart.resize();
      });
    },
    drawPieChart(id,dataset){
      var thisChart = this.$echarts.init(document.getElementById(id));
      thisChart.setOption({
        tooltip: {
          trigger: "item",
          //formatter: "{a} <br/>{b}: {c} ({d}%)"
        },
        grid: {
            containLabel: true,
          },
        series: [
          {
            type: "pie",
            radius: ["20%", "60%"],
            avoidLabelOverlap: false,
            color: ["#F868AF", "#01C6FD", "#1749F9","#a834ef"],
            label: {
              normal: {
                show: true,
                position: "outside",
                // formatter: "{b}: {d}%",
                formatter: function(params) {
                  return (
                    "{white|" + params.name + "}\n{per|" + params.percent + "%}"
                  );
                },
                rich: {
                  white: {
                    color: "#fff",
                    align: "center",
                    fontSize: 14,
                    padding: [5, 0]
                  },
                  per: {
                    color: "#fff",
                    fontSize: 15,
                    align: "center"
                  }
                }
              },
              emphasis: {
                show: true
              }
            },
            labelLine: {
              normal: {
                show: true
              }
            },
            data: dataset.data
          }
        ]
      });
      window.addEventListener("resize", () => { 
          thisChart.resize();
      });
    },
    changePieData(radio,date,tabVal){
      let dataArr=[
        { value: Math.floor(Math.random()*100), name: "单卡" },
        { value: Math.floor(Math.random()*100), name: "固网" },
        { value: Math.floor(Math.random()*100), name: "融合" }
      ];
      if(tabVal=="dgs"){
        dataArr.push({ value: Math.floor(Math.random()*100), name: "其他" })
      }
      this.$set(this.pieDataset,'data',dataArr);
    },
    callback(params){
      this.isDetail = params;
    }
  },
  mounted(){
    this.drawBarChart("incomeBar","收入完成",this.barDataset);
    this.drawLineChart("incomeLine","存量收入保有率",this.lineDataset);
    this.drawPieChart("incomePie",this.pieDataset);
  }
}
</script>

<style scoped lang="less">
.flexcc{
  display: flex;
  justify-content: center;
  align-items: center;
}
.incomeCont{
    width: 100%;
    height: 100%;
    .lf-cont{
        float: left;
        width: 30%;
        height: 100%;
        text-align: center;
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