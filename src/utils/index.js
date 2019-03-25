/**
 * 格式化时间
 * eg 20190310=>2019年03月10日
 * @param {*} value 
 */
export const formatterTime=(value)=> {
    if(value.length>6){
        var str = value.substring(0, 4) + '年' + value.substring(4, 6) + '月' + value.substring(6, 8) + '日';
        return str;
    }else{
        var str = value.substring(0, 4) + '年' + value.substring(4, 6) + '月';
        return str;
    }
  }