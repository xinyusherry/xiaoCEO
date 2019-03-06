<template>
  <div class="pieDiv">
    <div :id="id" style="width:80%;height:100%"></div>
    <!-- <ul>
      <li v-for="(v,i) in dataset" :key="i">
        <span class="rect" :style="{background:color[i]}"></span>
        <span class="name">{{v.name }}</span>
        <span class="value">{{v.value}}</span>
      </li>
    </ul> -->
  </div>
</template>

<script>
export default {
  props: ["id", "dataset", "color","legend"],
  data: function() {
    return {};
  },
  mounted() {
    let _this = this;
    setTimeout(()=>{
      var thisChart = this.$echarts.init(document.getElementById(this.id));
      thisChart.setOption({
       legend: {
              orient: 'vertical',
              top: 'middle',
              right: '0%',
              textStyle: {
                color: '#6891D0',
                fontSize: 14
              },
              data:this.legend,
              formatter(name) {
                  for (var i = 0; i < _this.dataset.length; i++) {
                    if (_this.dataset[i].name == name) {
                        return name +'  '+ _this.dataset[i].value;
                    }
                }
              }
             
            }, 
        series: {
          type: "pie",
          selectedMode: "single",
          label: {
            show: false,
            position: "inside",
            color: "#fff"
          },
          emphasis: {
            label: {
              show: true,
              formatter: "{b}: {d}"
            }
          },
          labelLine: {
            show: false
          },
          color: this.color,
          center: ["50%", "50%"],
          radius: [0, "50%"],
          tooltip: {
            position: "left",
            formatter: "{b}：{c}"
          },
          data: this.dataset.map((v, i) => {
            return {
              ...v,
              selected: i === 0 ? true : false
            };
          })
        }
      });
      window.addEventListener("resize", () => { 
        thisChart.resize();
      });
    },0);
  }
};
</script>

<style lang="less" scoped>

</style>