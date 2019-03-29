<template>
  <video :src="url" width="100%" height="100%" controls="controls" style="z-index:10"></video>
</template>
<script>
import qs from "qs";
export default {
  data() {
    return {
      url: ""
    };
  },
  created() {
    let _this = this;
    this.$axios
      .get("/Workbench/getVideoPath")
      .then(function(res) {
        let data = res.data;
        _this.url =
          //   "http://10.26.20.254:8203/microservice-ui/workingtable" +
          "./" + data.resultData.VIDEO_PATH;
      })
      .catch(function(e) {});
  }
};
</script>