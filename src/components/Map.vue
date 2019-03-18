<template>
  <div id="amapContainer">
    <!--1.指标-->
    <div id="target">
      <el-radio-group v-model="radio" v-show="showSelect" @change="changeLabel">
        <el-radio v-for="item in selectList" :key="item.id" :label="item.id">{{item.name}}</el-radio>
      </el-radio-group>
      <span class="radioText" v-show="!showSelect && radioText!==''">{{radioText}}</span>
      <img @click="handleSelect" src="../assets/images/map-menu.png" alt>
    </div>
    <!--图例-->
    <ul id="legend">
      <li v-for="(item,i) in legendData" :key="i">
        <span class="legend" :style="{backgroundColor:item.color}"></span>
        <div class="range">{{item.value}}</div>
      </li>
    </ul>
  </div>
</template>

<script>
import Vue from "vue";
import VueAMap from "vue-amap";
import { lazyAMapApiLoaderInstance } from "vue-amap";
Vue.use(VueAMap);

VueAMap.initAMapApiLoader({
  key: "09e75819cd27fb296e85a4b36ed4a97c",
  plugin: [
    "Autocomplete",
    "PlaceSearch",
    "Scale",
    "OverView",
    "ToolBar",
    "MapType",
    "PolyEditor",
    "CircleEditor"
  ],
  uiVersion: "1.0.11",
  v: "1.2.1" // 默认高德 sdk 版本为 1.4.4
});
let amapManager = new VueAMap.AMapManager();
export default {
  name: "Map",
  data() {
    return {
      toRequest: true, //是否需要请求后台
      map: null,
      loca: null,
      layer: null,
      districtExplorer: null,
      haveNoValue: true, //没有数据时不显示图例
      level3Data: [], //小区数据
      indexMax3: [], //记录图例数值
      colors: ["#ED2626", "#CC1FAB", "#C14F1E", "#E59515", "#12DD78"],
      legendData: [],
      infoWindow: null,
      showSelect: false,
      radio: "01",
      radioText: "",
      selectList: [
        {
          id: "01",
          name: "宽带渗透率",
          checked: false
        },
        {
          id: "02",
          name: "宽带存量用户保有率",
          checked: false
        },
        {
          id: "03",
          name: "当月欠费回收率",
          checked: false
        }
      ]
    };
  },
  mounted() {
    let _this = this;
    lazyAMapApiLoaderInstance.load().then(() => {
      // 1、创建地图
      _this.map = new AMap.Map("amapContainer", {
        zoom: 13,
        // center: [117.377391, 39.483105],
        mapStyle: "amap://styles/52cbb8b5174e47ecb17f90414c13a921"
      });
      //位置可视化
      _this.loca = new Loca.create(_this.map);
      //创建可视化图层
      _this.layer = Loca.visualLayer({
        container: _this.loca,
        type: "polygon", //设置坐标类型：面(polygon)
        shape: "polygon", //polygon
        eventSupport: true
      });
      //加载DistrictExplorer，loadUI的路径参数为模块名中 'ui/' 之后的部分
      AMapUI.loadUI(["geo/DistrictExplorer"], function(DistrictExplorer) {
        //启动页面
        _this.initPage(DistrictExplorer);
      });
    });
  },
  methods: {
    //行政区组件初始化
    initPage(DistrictExplorer) {
      let _this = this;
      //创建一个实例
      this.districtExplorer = new DistrictExplorer({
        eventSupport: true,
        map: this.map //关联的地图实例
      });
      var adcode = 120000; //tj的区划编码

      this.districtExplorer.loadAreaNode(adcode, function(error, areaNode) {
        if (error) {
          console.error(error);
          return;
        }
        _this.render();
      });
    },
    render() {
      let _this = this;
      if (this.districtExplorer) {
        //清除掉城市地图的渲染和事件
        this.districtExplorer.clearFeaturePolygons();
        this.map.clearMap();
        //解除feature鼠标滑过事件事件
        this.districtExplorer.off("featureMouseover");
        //解除feature点击事件
        this.districtExplorer.off("featureClick");
      }
      if (this.toRequest) this.getlevel3();
      else this.showLevel3();
      this.layer.on("click", function(e) {
        _this.openInfoNew(e.rawData.center, e.rawData.name, e.rawData);
      });
    },
    //获取小区数据
    getlevel3() {
      let _this = this;
      let params = {
        kpiId: this.radio
      };
      this.$axios
        .post("/Workbench/getCellData", params)
        .then(res => {
          console.log(res);
          if (res.data.resultData.xqData.length == 0) {
            _this.haveNoValue = true;
          } else {
            _this.level3Data = res.data.resultData;
          }
          _this.indexMax3 = [];
          _this.indexMax3.push(res.data.resultData.min);
          _this.indexMax3.push(res.data.resultData.max3);
          _this.indexMax3.push(res.data.resultData.max2);
          _this.indexMax3.push(res.data.resultData.max1);
          _this.indexMax3.push(res.data.resultData.max);
          this.showLevel3();
          _this.map.setCenter([
            res.data.resultData.MAP_CENTER_X,
            res.data.resultData.MAP_CENTER_Y
          ]);
        })
        .catch(error => {
          console.log(error);
        });
    },
    //显示小区数据
    showLevel3() {
      let _this = this;
      _this.layer.setData(_this.level3Data.xqData, {
        type: "json",
        lnglat: function(obj) {
          var value = obj.value;
          var arr = value.lnglat;
          arr = arr.split(";");
          for (var i = 0; i < arr.length; i++) {
            arr[i] = arr[i].split(",");
          }
          return arr;
        }
      });
      _this.layer.setOptions({
        style: {
          lineWidth: 1,
          stroke: "rgba(255,255,255,0)",
          opacity: 0.8,
          fillOpacity: 0.8,
          fill: function(data) {
            var item = data.value;
            var value = item.value;
            return _this.fillcolor(value, _this.indexMax3);
          }
        }
      });
      _this.layer.addTo(_this.loca);
      _this.layer.render(); //绘制
      _this.toRequest = false;
      // 图例
      _this.showLegend();
    },
    fillcolor(num, Max) {
      if (num > Max[3]) {
        return this.colors[4];
      } else if (num > Max[2]) {
        return this.colors[3];
      } else if (num > Max[1]) {
        return this.colors[2];
      } else if (num > Max[0]) {
        return this.colors[1];
      } else {
        return this.colors[4];
      }
    },
    showLegend() {
      this.legendData = this.indexMax3.map((v, i) => {
        console.log(v);
        if (i === 0)
          return {
            color: this.colors[i],
            value: "0-" + v + "%"
          };
        else
          return {
            color: this.colors[i],
            value: this.indexMax3[i - 1] + "%-" + v + "%"
          };
      });
    },
    openInfoNew(lng, name, data) {
      var offset = this.map.getZoom() / 2;
      //构建信息窗体中显示的内容
      var info = "<div>";
      info += "<div><b class='info-title'>" + name + "</b>";

      if (data.manager || data.cellCEO) {
        info += '<div class="gl">';
      }
      if (data.manager) {
        info += `<p class="mng manager">小区运营经理：${data.manager} </p>`;
      }
      if (data.cellCEO) {
        info += '<p class="mng cellCEO">单元小CEO：' + data.cellCEO + "</p>";
      }
      if (data.manager || data.cellCEO) {
        info += "</div>";
      }
      if (data.value)
        info +=
          '<p class="idx cellValue">指标值：' +
          data.value  +
          "%" +
          "</p>";
      if (data.cellNum)
        info += '<p class="idx cellNum">小区数：' + data.cellNum + "</p>";
      if (data.houseNum)
        info += '<p class="idx houseNum">住宅用户数：' + data.houseNum + "</p>";
      if (data.nwUserNum)
        info +=
          '<p class="idx nwUserNum">本网宽带用户数：' + data.nwUserNum + "</p>";
      if (data.nwRate)
        info += '<p class="idx nwRate">宽带渗透率：' + data.nwRate + "</p>";
      if (data.nwAdd)
        info += '<p class="idx nwAdd">宽带发展：' + data.nwAdd + "</p>";
      if (data.nwDrop)
        info += '<p class="idx nwDrop">宽带流失：' + data.nwDrop + "</p>";
      if (data.sjCellNum) {
        info +=
          '<p class="idx sjCellNum">双降小区数量：' + data.sjCellNum + "</p>";
      }
      if (data.income) {
        info += '<p class="icm income">收入：' + data.income + "</p>";
      }
      if (data.cost) {
        info += '<p class="icm cost">成本：' + data.cost + "</p>";
      }
      if (data.profit) {
        info += '<p class="icm profit">毛利：' + data.profit + "</p>";
      }
      info += "</div></div>";
      this.infoWindow = new AMap.InfoWindow({
        content: info, //使用默认信息窗体框样式，显示信息内容
        offset: new AMap.Pixel(7 + offset, -(13 + offset))
      });
      this.infoWindow.open(this.map, lng);
    },
    handleSelect() {
      this.showSelect = !this.showSelect;
    },
    changeLabel(label) {
      this.showSelect = false;
      let select = this.selectList.find(v => v.id == label);
      this.radioText = select.name;
      this.getlevel3();
    }
  }
};
</script>

<style lang='less' scoped>
.amap-wrapper,
#amapContainer {
  width: 100%;
  height: 100%;
  position: relative;
}
#legend {
  position: absolute;
  width: 160px;
  padding: 5px 20px;
  right: 15px;
  bottom: 13px;
  z-index: 9999;
  background-color: #7174f6;
  font-size: 13px;
  > li {
    width: 100%;
    height: 25px;
    line-height: 25px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .legend {
      margin-right: 20px;
      padding: 6px;
      border-radius: 50%;
    }
  }
}
#target {
  display: flex;
  position: absolute;
  top: 10px;
  right: 10px;
  z-index: 20;
  > img {
    height: 25px;
    cursor: pointer;
  }
  .el-radio-group {
    background-color: #336ca6;
    display: flex;
    align-items: center;
    padding-left: 20px;
    padding-right: 15px;
    margin-right: 5px;
    border-top-left-radius: 20px;
    border-bottom-left-radius: 20px;
    justify-content: space-around;
    .el-radio {
      color: #fff;
    }
  }
  .radioText {
    line-height: 25px;
    font-size: 14px;
    background-color: #336ca6;
    padding-left: 20px;
    padding-right: 15px;
    margin-right: 5px;
    border-top-left-radius: 20px;
    border-bottom-left-radius: 20px;
  }
}
</style>