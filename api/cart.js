

import { get, post } from './api_cart';


export function GetCartItemSearch({
  condition,
  type,
}) {
  return get('cartItemSearch', {
    condition,
    type,
    method: 'V5.mobile.cart.item.search',
  });
}
export function GetMemberCard({
  stype,
  membarcode,
  mobile,
}) {
  return post('memberCard', {
    stype,
    membarcode,
    mobile,
    openid: '',
    method: 'V5.mobile.member.card',
  });
}
export function GetMemberRights({
  jsonstr,
}) {
  return post('memberRights', {
    jsonstr,
    method: 'V5.mobile.member.rights',
  });
}
export function GetIsSendOrInstall({
  jsonstr,
}) {
  return post('productIsSendOrInstall', {
    jsonstr,
    method: 'V5.mobile.product.sendOrInstall',
  });
}
function isClass(o) {
  if (o === null) return 'null';
  if (o === undefined) return 'Undefined';
  return Object.prototype.toString.call(o).slice(8, -1);
}
export function DeepClone(obj) {
  let result;
  const oClass = isClass(obj);
  if (oClass === 'Object') {
    result = {};
  } else if (oClass === 'Array') {
    result = [];
  } else {
    return obj;
  }
  for (const key in obj) {
    const copy = obj[key];
    if (isClass(copy) === 'Object') {
      result[key] = arguments.callee(copy);
    } else if (isClass(copy) === 'Array') {
      result[key] = arguments.callee(copy);
    } else {
      result[key] = obj[key];
    }
  }
  return result;
}
