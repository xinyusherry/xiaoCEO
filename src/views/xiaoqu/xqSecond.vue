<template>
    <div class="xqSed">
        <div class="chartDiv">
            <div id="xqSedLine" style="height:300px"></div>
        </div>
        <div class="chooseDiv">
            <el-radio-group v-model="tabVal" style="margin-right:15%">
                <el-radio-button label="all">全部小区</el-radio-button>
                <el-radio-button label="sj">双降小区</el-radio-button>
                <el-radio-button label="ds">低渗小区</el-radio-button>
            </el-radio-group>
            <el-date-picker v-model="date" type="month" placeholder="选择日期"></el-date-picker>
        </div>
        <div class="table" :style="tableBgStyle">
            <el-table
            :data="tableData"
            style="width: 100%;"
            :header-cell-style="headerBgStyle"
            highlight-current-row
            stripe
            height="300"
            >
            <el-table-column prop="date" align="center" label="日期" width="180"></el-table-column>
            <el-table-column align="center" label="姓名" width="180" sortable>
                <template slot-scope="scope">
                    <el-popover placement="right" width="400" trigger="hover">
                        <Chart :id="'tableLineChart'+scope.row.id" :title="'小区收入及用户变化趋势'" :type="'line'" :dataset="lineChart.dataset" :color="lineChart.colors"></Chart>
                        <div slot="reference">{{scope.row.name}}</div>
                    </el-popover>
                </template>
            </el-table-column>
            <el-table-column prop="address" align="center" label="地址" sortable></el-table-column>
            </el-table>
        </div>
    </div>
</template>

<script>
import Chart from "../../components/xqSedChart.vue";

export default {
    components: { Chart },
    data() {
        return {
            date:"",
            tabVal:"all",
            lineChart: {
                dataset: {
                    legendData:[
                        {name:"双降"}, 
                        {name:"低渗"}
                    ],
                    xAxis: ["12月","1月", "2月", "3月", "4月","5月","6月","7月","8月","9月","10月","11月","12月"],
                    data: [
                        [100,200,300,400,500,100,200,300,400,500,100,200,300],
                        [500,400,300,200,100,500,400,300,200,100,500,400,300]
                    ]
                },
                colors: ["#0097FF","#F7E43C"]
            },
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
            ]
        };
    },
    methods:{
        drawLineChart(id){
            var thisChart = this.$echarts.init(document.getElementById(id));
            thisChart.setOption({
                color: this.lineChart.colors,
                legend: {
                    data: this.lineChart.dataset.legendData,
                    x:'right',
                    textStyle:{
                        color:"#fff"
                    }
                },
                grid: {
                    containLabel: true,
                    top: "15%",
                    bottom: "10%",
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
                    data: this.lineChart.dataset.xAxis
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
                    name:"双降",
                    type:"line",
                    data: this.lineChart.dataset.data[0]
                },
                {
                    name:"低渗",
                    type:"line",
                    data: this.lineChart.dataset.data[1]
                }
                ]
            });
            window.addEventListener("resize", () => { 
                thisChart.resize();
            });
        }
    },
    mounted(){
        this.drawLineChart("xqSedLine");
    }
}
</script>

<style scoped lang="less">
.xqSed{
    .chartDiv{
        height: 300px;
    }
    .chooseDiv{
        text-align: right;
    }
}

</style>