
const httpurl = 'http://192.168.50.61:8084/api/lede/';
// const httpurl = 'http://192.168.10.22:8084/api/lede/';
// const httpurl = 'https://lede.sunhousm.cn/api/lede/';
function parseJSON(response) {
  return response.json();
}
function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }
  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}
function request(url, options) {
  return fetch(url, options)
    .then(checkStatus)
    .then(parseJSON);
}
function systemParam(data) {
  const defaultdata = {
    timestamp: parseInt(new Date().getTime() / 1000, 10).toString(),
    nick: '1',
    sign: '1',
  };
  Object.assign(defaultdata, data);
  return defaultdata;
}
export function obj2form(data) {
  let string = '';
  for (const key of Object.keys(data)) {
    string += `&${key}=${encodeURIComponent(data[key])}`;
  }
  return string.substr(1, string.length);
}
export function post(path, data) {
  return request(`${httpurl}${path}`, {
    method: 'POST',
    body: JSON.stringify(systemParam(data)),
  });
}
export function get(path, data) {
  const purl = `${httpurl}${path}?${obj2form(systemParam(data))}`;
  console.log(purl);
  return request(purl, {
    method: 'GET',
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

export function RepeatPurchaseService(data) {
  return post('RepeatPurchaseService', data);
}
export function GetSpecService(data) {
  return get('GetSpecService', data);
}
export function GetSupplyInfoService(data) {
  return get('GetSupplyInfoService', data);
}
export function ValidateIsQuoteService(data) {
  return get('ValidateIsQuoteService', data);
}
export function GetSameCategoryPurchaseService(data) {
  return get('GetSameCategoryPurchaseService', data);
}
export function SaveMemberRoleService(data) {
  return get('SaveMemberRoleService', data);
}
export function GetIdentityService(data) {
  return get('GetIdentityService', data);
}
export function GetCodeService(data) {
  return get('GetCodeService', data);
}
export function RegisterMemberService(data) {
  return post('RegisterMemberService', data);
}
export function GetAppCategoryService(data) {
  return get('GetAppCategoryService', data);
}
export function GetCityService() {
  return get('GetCityService');
}
export function GetDistrictService() {
  return get('GetDistrictService');
}
export function CreatePurchaseQuoteService(data) {
  return post('CreatePurchaseQuoteService', data);
}
export function CreatePurchaseService(data) {
  return post('CreatePurchaseService', data);
}
export function GetUploadTokenService() {
  return get('GetUploadTokenService');
}
export function GetPurchaseService(data) {
  return get('GetPurchaseService', data);
}
export function StopPurchaseService(data) {
  return get('StopPurchaseService', data);
}
export function CreateSupplyService(data) {
  return post('CreateSupplyService', data);
}
export function GetSupplyService(data) {
  return get('GetSupplyService', data);
}
export function RefreshSupplyService(data) {
  return get('RefreshSupplyService', data);
}
export function StopSupplyService(data) {
  return get('StopSupplyService', data);
}
export function GetQuoteService(data) {
  return get('GetQuoteService', data);
}
export function ShelfSupplyService(data) {
  return get('ShelfSupplyService', data);
}
export function DeleteSupplyService(data) {
  return get('DeleteSupplyService', data);
}
export function UpdateSupplyService(data) {
  return post('UpdateSupplyService', data);
}
export function GetMemberInfoService(data) {
  return get('GetMemberInfoService', data);
}
export function AddOrUpdateReceiveAddressService(data) {
  return post('AddOrUpdateReceiveAddressService', data);
}
export function DeleteReceiveAddressService(data) {
  return get('DeleteReceiveAddressService', data);
}
export function UpdateMemberInfoService(data) {
  return post('UpdateMemberInfoService', data);
}
export function SetDefaultService(data) {
  return get('SetDefaultService', data);
}
export function PersonVerifService(data) {
  return post('PersonVerifService', data);
}
export function EntVerifService(data) {
  return post('EntVerifService', data);
}
export function GetFootPrint(data) {
  return get('GetFootPrint', data);
}
export function GetOrgProductInfo(data) {
  return get('GetOrgProductInfo', data);
}
export function GetNewsService(data) {
  return get('GetNewsService', data);
}
export function GetNewsInfoService(data) {
  return get('GetNewsInfoService', data);
}
export function CreateNewsCommentService(data) {
  return get('CreateNewsCommentService', data);
}
export function CreateCommentPraiseService(data) {
  return get('CreateCommentPraiseService', data);
}
export function CreateNewsPraiseService(data) {
  return get('CreateNewsPraiseService', data);
}
export function GetVerifSupplyService(data) {
  return get('GetVerifSupplyService', data);
}
export function GetGoodBusinesService() {
  return get('GetGoodBusinesService');
}
export function GetGotSupplyService(data) {
  return get('GetGotSupplyService', data);
}
export function GetHomeCategoryService() {
  return get('GetHomeCategoryService');
}
export function GetPurchaseByCategoryService(data) {
  return get('GetPurchaseByCategoryService', data);
}
export function GetSupplyByFiltersService(data) {
  return post('GetSupplyByFiltersService', data);
}
export function FilterPurchaseService(data) {
  return get('FilterPurchaseService', data);
}
