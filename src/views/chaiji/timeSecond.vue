<template>
    <div class="devTimeSed">
        <div class="dateDiv">
            <span>2019-03-12</span>
        </div>
        <div class="flex">
            <div class="flex-item" style="margin-right:10%">
                <div><span class="title blue">移动发展</span></div>
                <div><span>1234 / 2344</span></div>
            </div>
            <div class="flex-item">
                <div><span class="title green">固话发展</span></div>
                <div><span>1234 / 2344</span></div>
            </div>
        </div>
        <div style="height:300px">
            <chart-bar :id="'devTimeBar'" :dataset="chartBar.dataset" :color="chartBar.colors" @CallBack="barHandleClick"></chart-bar>
        </div>
    </div>
</template>

<script>
import chartBar from "../../components/chartBar.vue";

export default {
    components: { chartBar },
    data() {
        return {
            chartBar: {
                dataset: {
                    xAxis: ["新零售", "小区营销", "小区承接", "营业厅"],
                    data: [100,200,300,400],
                },
                colors: ["#F868AF"]
            },
        };
    },
    methods:{
        barHandleClick(barChart){
            barChart.on("click", (params)=>{
                const param = {
                    dialogCompent:"cjTimeTrd",
                    dialogTitle:"拆机（实时）"
                }
                const thirdParams = {
                    index:params.dataIndex,
                    name:params.name
                }
                this.$emit('headCallBack', param , thirdParams);
            });
        }
    }
}
</script>

<style scoped lang="less">
.dateDiv{
    text-align: right;
    span{
        padding: 5px 30px;
        color: #fff;
        background-color: rgba(95, 182, 249,0.5);
        border-radius: 3px;
    }
}
.flex{
    display: flex;
    justify-content: center;
    align-items: center;
    .flex-item{
        width: 30%;
        text-align: center;
        .title{
            position: relative;
            font-size: 18px;
            &::before{
                content: '';
                position: absolute;
                left: -20px;
                width: 5px;
                height: 22px;
                background: #fff;
            }
            &.blue{
                color: #6AFFFD;
                &::before{
                    background: #6AFFFD;
                }
            }
             &.green{
                color: #1AC175;
                &::before{
                    background: #1AC175;
                }
            }
        }
        >div{
            margin: 25px 0;
            color: #fff;
            font-size: 16px;
        }
    }
}
.flex-between{
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.type{
    margin-right: 10px;
    padding: 2px 5px;
    &.now{
        background-color: #5FB6F9;
        border-radius: 50%;
        color: #6AFFFD;
    }
}
</style>