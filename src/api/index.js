
// const httpurl = 'http://192.168.50.61:8084/api/lede/';
// const httpurl = 'http://192.168.0.11:8084/api/lede/';
const httpurl = 'https://mm.sunhousm.cn/api/mall/';
export function parseJSON(response) {
  return response.json();
}
export function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }
  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}
export function request(url, options) {
  return fetch(url, options)
    .then(checkStatus)
    .then(parseJSON);
}
export function systemParam(data) {
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
  console.log(`${httpurl}${path}`)
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
export function isClass(o) {
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

export function RegisterMemberService(data) {
  return post('RegisterMemberService', data);
}
export function PayAppWeiXinService(data) {
  return get('PayAppWeiXinService', data);
}
export function PayAliService(data) {
  return get('PayAliService', data);
}
export function NetPayService(data) {
  return get('NetPayService', data);
}
export function GetCodeService(data) {
  return get('GetCodeService', data);
}
export function RegisterService(data) {
  return get('RegisterService', data);
}
export function LoginService(data) {
  return get('LoginService', data);
}
export function CreateMasterRecruitService(data) {
  return get('CreateMasterRecruitService', data);
}
export function CreateMemberAddressService(data) {
  return get('CreateMemberAddressService', data);
}
export function CreateShoppingCartService(data) {
  return get('CreateShoppingCartService', data);
}
export function DeleteShoppingCartService(data) {
  return get('DeleteShoppingCartService', data);
}
export function UpdateShoppingCartService(data) {
  return get('UpdateShoppingCartService', data);
}
export function GetShoppingCartService(data) {
  return get('GetShoppingCartService', data);
}
export function GetProductService(data) {
  return get('GetProductService', data);
}
export function GetProductInfoService(data) {
  return get('GetProductInfoService', data);
}
export function CreateOrderService(data) {
  return post('CreateOrderService', data);
}
export function PayWinXinService(data) {
  return get('PayWinXinService', data);
}
export function GetMemberAddressService(data) {
  return get('GetMemberAddressService', data);
}
export function GetOrderInfoService(data) {
  return get('GetOrderInfoService', data);
}
export function GetOrderService(data) {
  return get('GetOrderService', data);
}
export function CreateFeedbackService(data) {
  return get('CreateFeedbackService', data);
}
export function UpdateMemberService(data) {
  return get('UpdateMemberService', data);
}
export function AccessWinXinService(data) {
  return get('AccessWinXinService', data);
}
export function GetServicesByParentIdService(data) {
  return get('GetServicesByParentIdService', data);
}
export function UpdateOrderStatusService(d) {
  return get('UpdateOrderStatusService', d);
}
export function GetCategoryService(d) {
  return get('GetCategoryService', d);
}
export function UpdateMasterOrderItemService(data) {
  return get('UpdateMasterOrderItemService', data);
}
export function GetAppToWeiXinJsApiSign(data) {
  return get('GetAppToWeiXinJsApiSign', data);
}
export function CreateMemberSignService(d) {
  return get('CreateMemberSignService', d);
}
export function GetDecorationCompanyService(data) {
  return get('GetDecorationCompanyService', data);
}
export function GetDecorationCompanyInfoService(data) {
  return get('GetDecorationCompanyInfoService', data);
}
export function GetDecorationTemplateInfoService(data) {
  return get('GetDecorationTemplateInfoService', data);
}
export function CreateMemberDecorationService(data) {
  return get('CreateMemberDecorationService', data);
}
export function DeleteMemberDecorationService(data) {
  return get('DeleteMemberDecorationService', data);
}
export function CreateDecorationConsultService(data) {
  return get('CreateDecorationConsultService', data);
}
export function CreateMemberBmMarketService(data) {
  return get('CreateMemberBmMarketService', data);
}
export function DeleteMemberBmMarketService(data) {
  return get('DeleteMemberBmMarketService', data);
}
export function GetBmMarketInfoService(data) {
  return get('GetBmMarketInfoService', data);
}
export function GetBmMarketService(data) {
  return get('GetBmMarketService', data);
}
export function GetBmMarketProductService(data) {
  return get('GetBmMarketProductService', data);
}
export function GetMasterService(data) {
  return get('GetMasterService', data);
}
export function GetMasterTypeService(data) {
  return get('GetMasterTypeService', data);
}
export function GetMasterBasicInfoService(data) {
  return get('GetMasterBasicInfoService', data);
}
export function CreateDemandOrderService(data) {
  return post('CreateDemandOrderService', data);
}
export function GetServicesTypeService(data) {
  return get('GetServicesTypeService', data);
}
export function UpdateDemandOrderService(data) {
  return post('UpdateDemandOrderService', data);
}
export function PayDemandOrderService(data) {
  return get('PayDemandOrderService', data);
}
export function AuthDecorationService(data) {
  return post('AuthDecorationService', data);
}
export function AuthBmMarketService(data) {
  return post('AuthBmMarketService', data);
}
export function GetMemberBmMarketService(d) {
  return get('GetMemberBmMarketService', d);
}
export function GetMemberDecorationService(d) {
  return get('GetMemberDecorationService', d);
}
export function BindMemberPhoneService(d) {
  return get('BindMemberPhoneService', d);
}
export function GetPrizeService() {
  return get('GetPrizeService');
}
export function GetMemberPrizeService(data) {
  return get('GetMemberPrizeService', data);
}
export function GetBindMemberPhoneService(data) {
  return get('GetBindMemberPhoneService', data);
}
export function CreateMemberPrizeService(data) {
  return get('CreateMemberPrizeService', data);
}
export function CreateMemberMasterService(data) {
  return get('CreateMemberMasterService', data);
}
export function DeleteMemberMasterService(data) {
  return get('DeleteMemberMasterService', data);
}
export function CreateMasterServicesService(data) {
  return post('CreateMasterServicesService', data);
}
export function GetMasterServicesService(data) {
  return get('GetMasterServicesService', data);
}
export function DeleteMasterServicesService(data) {
  return get('DeleteMasterServicesService', data);
}
export function UpdateMasterServicesService(data) {
  return post('UpdateMasterServicesService', data);
}
export function GetMasterServicesInfoService(data) {
  return get('GetMasterServicesInfoService', data);
}
export function CreateMemberMasterServicesService(data) {
  return get('CreateMemberMasterServicesService', data);
}
export function DeleteMemberMasterServicesService(data) {
  return get('DeleteMemberMasterServicesService', data);
}
export function GetMasterOrderService(data) {
  return get('GetMasterOrderService', data);
}
export function DeleteMemberAddressService(data) {
  return get('DeleteMemberAddressService', data);
}
export function UpdateMemberAddressService(data) {
  return get('UpdateMemberAddressService', data);
}
export function GetMasterOrderInfoService(data) {
  return get('GetMasterOrderInfoService', data);
}
export function UpdateMemberAddressDefaultService(data) {
  return get('UpdateMemberAddressDefaultService', data);
}
export function UpdateMasterOrderItemLogService(data) {
  return get('UpdateMasterOrderItemLogService', data);
}
export function RefundService(data) {
  return get('RefundService', data);
}
export function CreateOrderEvaluateService(data) {
  return get('CreateOrderEvaluateService', data);
}
export function GetMasterCommentService(data) {
  return get('GetMasterCommentService', data);
}
export function GetOrderEvaluateService(data) {
  return get('GetOrderEvaluateService', data);
}
export function UpdateMasterService(data) {
  return post('UpdateMasterService', data);
}
export function CreateMasterAuthService(data) {
  return get('CreateMasterAuthService', data);
}
export function GetMemberMasterServicesService(d) {
  return get('GetMemberMasterServicesService', d);
}
export function GetMemberMasterService(d) {
  return get('GetMemberMasterService', d);
}
export function CreateDecorationIntroService(data) {
  return post('CreateDecorationIntroService', data);
}
export function CreateDecorationCredentialsService(data) {
  return post('CreateDecorationCredentialsService', data);
}
export function CreateDecorationCaseService(data) {
  return post('CreateDecorationCaseService', data);
}
export function GetDecorationCaseService(data) {
  return get('GetDecorationCaseService', data);
}
export function CreateBmMarketCredentialsService(data) {
  return post('CreateBmMarketCredentialsService', data);
}
export function UpdateBmMarketService(data) {
  return get('UpdateBmMarketService', data);
}
export function UpdateDecorationCompanyService(data) {
  return get('UpdateDecorationCompanyService', data);
}
export function CreateBmMarketImageService(data) {
  return post('CreateBmMarketImageService', data);
}
export function GetDemandCategoryService(data) {
  return get('GetDemandCategoryService', data);
}
export function CreateNewDemandOrderService(data) {
  return post('CreateNewDemandOrderService', data);
}
export function GetDemandOrderService(data) {
  return get('GetDemandOrderService', data);
}
export function CreateDemandOrderBiddingService(data) {
  return post('CreateDemandOrderBiddingService', data);
}
export function GetDemandOrderBiddingService(data) {
  return get('GetDemandOrderBiddingService', data);
}
export function DeleteDemandOrderService(data) {
  return get('DeleteDemandOrderService', data);
}
export function CreateDifferenceOrderService(data) {
  return post('CreateDifferenceOrderService', data);
}
export function CreateRefundOrderService(data) {
  return get('CreateRefundOrderService', data);
}
export function GetProgramService(data) {
  return get('GetProgramService', data);
}
export function CreateProgramVoteService(data) {
  return get('CreateProgramVoteService', data);
}
export function GetMasterCaseService(data) {
  return get('GetMasterCaseService', data);
}
export function SuccessOrderStatusService(data) {
  return get('SuccessOrderStatusService', data);
}
export function UpdateDecorationCompanyImgService(data) {
  return get('UpdateDecorationCompanyImgService', data);
}
export function UpdateBmMarketImgService(data) {
  return get('UpdateBmMarketImgService', data);
}
export function UpdateMasterImgService(data) {
  return get('UpdateMasterImgService', data);
}
export function GetMemberCenterService(data) {
  return get('GetMemberCenterService', data);
}
export function CreateOtherOrgService(data) {
  return get('CreateOtherOrgService', data);
}
export function CreateWithdrawalsOrderService(data) {
  return get('CreateWithdrawalsOrderService', data);
}
export function GetWithdrawalsOrderService(data) {
  return get('GetWithdrawalsOrderService', data);
}
export function GetUploadTokenService(data) {
  return get('GetUploadTokenService', data);
}
