/*
 * @Author: wzp 623301600@qq.com
 * @Date: 2023-06-12 23:01:18
 * @LastEditors: wzp 623301600@qq.com
 * @LastEditTime: 2024-09-28 20:43:58
 * @FilePath: /imglarger-nextjs/src/util/stringUtil.js
 * @Description: 
 * 
 */
/**
 * 验证字符串是否由数字组成
 */
function checkNum(str) {
  return !isNaN(str)
}
/*
 * @desc   判断字符是否为空
 * @param   str-需要判断的字符
 * @return  {Boolean} 
 */
function isEmpty(val) {
  if (typeof val == 'boolean') {
    return false;
  }
  if (typeof (val) == 'number') {
    return false
  }
  if (val instanceof Array) {
    return val.length == 0
  }
  if (typeof (val) == 'object') {
    return JSON.stringify(val) === '{}'
  }
  

  if (typeof val == "undefined" || val == null || val.trim() == "") {
    return true;
  }
  return false;
}


function isSSML(targetStr) {
  let filterRegExp = new RegExp("<[\\s\\S]*?>")
  if (filterRegExp.test(targetStr)) return true
  filterRegExp = new RegExp("[<>][\\s\\S]*?")
  if (filterRegExp.test(targetStr)) return true
  return false;
}

function getUrlParam(queryStr, name) {
//   let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
//   let r = str.substring(1).match(reg); //地址栏 参数部分
//   if (r != null) return decodeURIComponent(r[2]);
//   return "";
const urlParams = new URLSearchParams(queryStr)
const target = urlParams.get(name)??""
return target
}

module.exports = {
  checkNum,
  isEmpty,
  isSSML,

  getUrlParam
}