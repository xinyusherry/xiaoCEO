<template>
    <div>
        <div class="chooseDiv">
          <div style="display:flex;align-items: center;">
            <img :src="require(`../../assets/images/icon_goback.png`)" alt class="icon_goback" @click="closeThis()">
            <el-date-picker v-model="date" type="month" placeholder="选择日期" style="margin-left:20px"></el-date-picker>
          </div>
          <div>
            <el-radio-group v-model="tabVal">
                <el-radio-button label="person">人员</el-radio-button>
                <el-radio-button label="xq">小区</el-radio-button>
            </el-radio-group>
            <el-button type="primary" style="margin-left:20px">下载</el-button>
          </div>
        </div>
        <div v-show="tabVal=='person'" class="table" :style="tableBgStyle">
            <el-table
            :data="tableData2"
            style="width: 100%;"
            :header-cell-style="headerBgStyle"
            highlight-current-row
            stripe
            height="300"
            >
            <el-table-column prop="date" align="center" label="日期" width="180"></el-table-column>
            <el-table-column align="center" label="姓名" width="180" sortable>
                <template slot-scope="scope">
                    <div>
                        <el-popover placement="right" width="400" trigger="hover" @show="hoverShow('tableLineChart-sj'+scope.row.id)">
                            <div :id="'tableLineChart-sj'+scope.row.id" style="width:100%;height:200px"></div>
                            <div slot="reference">{{scope.row.name}}</div>
                        </el-popover>
                    </div>
                </template>
            </el-table-column>
            <el-table-column prop="address" align="center" label="地址" sortable></el-table-column>
            </el-table>
        </div>
        <div v-show="tabVal=='xq'" class="table" :style="tableBgStyle">
            <el-table
            :data="tableData1"
            style="width: 100%;"
            :header-cell-style="headerBgStyle"
            highlight-current-row
            stripe
            height="300"
            >
            <el-table-column prop="date" align="center" label="日期" width="180"></el-table-column>
            <el-table-column align="center" label="姓名" width="180" sortable></el-table-column>
            <el-table-column prop="address" align="center" label="地址" sortable></el-table-column>
            </el-table>
        </div>
    </div>
</template>

<script>

export default {
    data() {
        const tabledata= [
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
            ];
        return {
            date:"",
            tabVal:"person",
            hoverData:{},
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
            tableData1: tabledata.concat(),
            tableData2: tabledata.concat(),
        };
    },
    methods:{
        drawLineChart(id,dataset){
            var thisChart = this.$echarts.init(document.getElementById(id));
            thisChart.setOption({
                color: ["#0097FF","#F868AF"],
                grid: {
                containLabel: true,
                top: "10%",
                bottom: "5%",
                left:"5%",
                right:"5%"
                },
                tooltip: {
                trigger: "axis"
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
                series: [
                {
                    type:"line",
                    data: dataset.data[0]
                }
                ]
            });
            window.addEventListener("resize", () => { 
                thisChart.resize();
            });
        },
        hoverShow(id){
            setTimeout(()=>{
                this.hoverData = {
                    xAxis: ["12月","1月", "2月", "3月", "4月","5月","6月","7月","8月","9月","10月","11月","12月"],
                    data: [
                        [100,200,300,400,500,100,200,300,400,500,100,200,300],
                        [500,400,300,200,100,500,400,300,200,100,500,400,300]
                    ]
                };
                this.drawLineChart(id,this.hoverData);
            },0);
        },
        closeThis(){
          this.$emit('callback', false);
        }
    },
    mounted(){
    }
}
</script>

<style scoped lang="less">
.chooseDiv{
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>