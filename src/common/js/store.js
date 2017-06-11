/*
 * @Author: shiguangwei
 * @Date: 2017-06-06 18:39:23
 * @Last Modified by: shiguangwei
 * @Last Modified time: 2017-06-06 22:45:40
 * @example localstorage封装
 */

export function saveToLocal(id, key, value) {
  let seller = window.localStorage._seller_;
  if (!seller) {
    seller = {};
    seller[id] = {};
  } else {
    seller = JSON.parse(seller);
    if (!seller[id]) {
      seller[id] = {};
    }
  }
  seller[id][key] = value;
  console.log(seller);
  window.localStorage._seller_ = JSON.stringify(seller);
};
export function loadFromLocal(id, key, def) {
  let seller = window.localStorage._seller_;
  if (!seller) {
    return def;
  }
  seller = JSON.parse(seller)[id];
  if (!seller) {
    return def;
  }
  if (!seller[key]) {
    return def;
  }
  return seller[key];
};

/* eslint-disable no-tabs */
// export function loadFromLocal(id, key, def) {
// 	let seller = window.localStorage._seller_;
// 	if (!seller) {
// 		return def;
// 	}
// 	seller = JSON.parse(seller)[id];
// 	if (!seller) {
// 		return def;
// 	}
// 	let ret = seller[key];
// 	return ret || def;
// };
