<template>
  <div class="pieDiv">
    <div :id="id" style="width:60%;height:100%"></div>
    <ul>
      <li v-for="(v,i) in dataset" :key="i">
        <span class="rect" :style="{background:color[i]}"></span>
        <span class="name">{{v.name }}</span>
        <span class="value">{{v.value}}</span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: ["id", "dataset", "color"],
  data: function() {
    return {};
  },
  mounted() {
    // debugger
    // 绘制图表。
    // this.$nextTick(()=>{
    //   })
    this.$echarts.init(document.getElementById(this.id)).setOption({
      /* legend: {
            orient: 'vertical',
            top: 'center',
            right: '15%',
            textStyle: {
              color: '#6891D0',
              fontSize: 14
            },
            formatter(name) {
              console.log(_this.dataset)
              return name
            },
            itemWidth: 14,
            itemHeight: 14,
            itemGap: 16
          }, */
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
  }
};
</script>

<style lang="less" scoped>

</style>