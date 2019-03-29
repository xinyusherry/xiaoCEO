/**
 * 格式化时间
 * eg 20190310=>2019年03月10日
 * @param {*} value 
 */
export const formatterTime=(value)=> {
    if(value.length>6){
        var str = value.substring(0, 4) + '-' + value.substring(4, 6) + '-' + value.substring(6, 8);
        return str;
    }else{
        var str = value.substring(0, 4) + '-' + value.substring(4, 6);
        return str;
    }
  }