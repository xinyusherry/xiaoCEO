<template>
    <div class="devTimeSed">
        <div class="chartDiv" style="margin-bottom:20px">
            <div class="changeDiv">
                <el-date-picker v-model="date" type="month" placeholder="选择日期"></el-date-picker>
            </div>
            <Chart :id="'profitLine'" :title="'利润、准利润完成趋势'" :type="'line'" :dataset="lineChart.dataset" :color="lineChart.colors"></Chart>
        </div>
        <div class="chartDiv">
            <div class="changeDiv">
                <el-radio-group v-model="tabVal">
                    <el-radio-button label="zlr">准利润</el-radio-button>
                    <el-radio-button label="lr">利润</el-radio-button>
                </el-radio-group>
            </div>
            <Chart :id="'profitBar'" :title="'同比分析'" :type="'bar'" :dataset="barChart.dataset" :color="barChart.colors"></Chart>
        </div>
    </div>
</template>

<script>
import Chart from "../../components/profitSedChart.vue";

export default {
    components: { Chart },
    data() {
        return {
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
    }
}
</script>

<style scoped lang="less">
.chartDiv{
    position: relative;
    height: 300px;
}
.changeDiv{
    position: absolute;
    right: 10px;
    top: 0;
    z-index: 9;
}
</style>