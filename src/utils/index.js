/**
 * 格式化时间
 * eg 20190310=>2019年03月10日
 * @param {*} value 
 */
export const formatterTime = (value) => {
    if (value.length > 6) {
        let str = value.substring(0, 4) + '-' + value.substring(4, 6) + '-' + value.substring(6, 8);
        return str;
    } else {
        let str = value.substring(0, 4) + '-' + value.substring(4, 6);
        return str;
    }
}
export const getMax = (arr) => {
    arr.sort(function (a, b) { return a - b; })
    let max = arr[arr.length - 1];
    return max;
}