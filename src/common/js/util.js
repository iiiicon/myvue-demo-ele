/*
 * @Author: shiguangwei
 * @Date: 2017-06-06 17:37:14
 * @Last Modified by: shiguangwei
 * @Last Modified time: 2017-06-06 22:17:11
 * 解析url参数
 * @example?id=12345&a=x
 * return OBject {id:12345,a:x}
 */

export function urlParse() {
  let url = window.location.search;
  let obj = {};
  let reg = /[?&][^?&]+=[^?&]+/g;
  let arr = url.match(reg);
  // ['?id=12345', 'a=x']
  if (arr) {
    arr.forEach((item) => {
      let tempArr = item.substring(1).split('=');
      let key = decodeURIComponent(tempArr[0]);
      let val = decodeURIComponent(tempArr[1]);
      obj[key] = val;
    });
  }
  return obj;
}
