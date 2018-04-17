
const httpurl = 'http://192.168.50.61:8084/api/lede/';
// const httpurl = 'http://192.168.0.15:8084/api/lede/';
// const httpurl = 'https://lede.hbw128.com/api/lede/';
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
    headers: {
      Authorization: global.memberId || '',
    },
  });
}
export function get(path, data) {
  const purl = `${httpurl}${path}?${obj2form(systemParam(data))}`;
  // console.log(purl);
  return request(purl, {
    method: 'GET',
    headers: {
      Authorization: global.memberId || '',
    },
  });
}
export function ampGet(data) {
  const purl = `https://restapi.amap.com/v3/geocode/regeo?${obj2form(data)}`;
  // console.log(purl);
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
export function AmapGeocode(location) {
  return ampGet({
    key: '592a01ec378d68c795627c0f61dc9975',
    location,
  });
}
export function PayAppWeiXinService(data) {
  return get('PayAppWeiXinService', data);
}
export function PayAliService(data) {
  return get('PayAliService', data);
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
export function GetRecomSupplyService(data) {
  return get('GetRecomSupplyService', data);
}
export function GetGoodBusinesService(data) {
  return get('GetGoodBusinesService', data);
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
export function CreateSalesOrderService(data) {
  return get('CreateSalesOrderService', data);
}
export function UpdateOrderService(data) {
  return get('UpdateOrderService', data);
}
export function GetMemberBuyOrderService(data) {
  return get('GetMemberBuyOrderService', data);
}
export function DeleteOrderService(data) {
  return get('DeleteOrderService', data);
}
export function GetMemberSellOrderService(data) {
  return get('GetMemberSellOrderService', data);
}
export function CreateApplyDemoService(data) {
  return get('CreateApplyDemoService', data);
}
export function GetVisitorService(data) {
  return get('GetVisitorService', data);
}
export function CreateMemberFollowService(data) {
  return get('CreateMemberFollowService', data);
}
export function GetMemberFollowService(data) {
  return get('GetMemberFollowService', data);
}
export function DeleteMemberFollowService(data) {
  return get('DeleteMemberFollowService', data);
}
export function GetMessageService(data) {
  return get('GetMessageService', data);
}
export function GetHomeNewsService(data) {
  return get('GetHomeNewsService', data);
}
export function GetLogisticsService() {
  return get('GetLogisticsService');
}
export function CreateDeliverOrderService(data) {
  return get('CreateDeliverOrderService', data);
}
export function CreateSupplyEvaluatService(data) {
  return get('CreateSupplyEvaluatService', data);
}
export function GetDeliverOrderService(data) {
  return get('GetDeliverOrderService', data);
}
export function CreateReportService(data) {
  return post('CreateReportService', data);
}
export function CreateOpinionBackService(data) {
  return get('CreateOpinionBackService', data);
}
export function CreateWithdrawalsNumberService(data) {
  return get('CreateWithdrawalsNumberService', data);
}
export function GetWithdrawalsNumberService(data) {
  return get('GetWithdrawalsNumberService', data);
}
export function SetDefaultWithdrawalsNumberService(data) {
  return get('SetDefaultWithdrawalsNumberService', data);
}
export function UpdateMessageIsReadService(data) {
  return get('UpdateMessageIsReadService', data);
}
export function GetMemberSurplusAmountService(data) {
  return get('GetMemberSurplusAmountService', data);
}
export function CreateWithdrawalsOrderService(data) {
  return get('CreateWithdrawalsOrderService', data);
}
export function GetMemberAmountLogService(data) {
  return get('GetMemberAmountLogService', data);
}
export function GetMarketInfoService(data) {
  return get('GetMarketInfoService', data);
}
export function GetMarketService(data) {
  return get('GetMarketService', data);
}
export function FilterMarketInfoService(data) {
  return post('FilterMarketInfoService', data);
}
export function GetNewsTypeService(data) {
  return get('GetNewsTypeService', data);
}
export function GetDistrictMarketInfo(data) {
  return get('GetDistrictMarketInfo', data);
}
export function JudgeMemberIsPersonVerif(data) {
  return get('JudgeMemberIsPersonVerif', data);
}
export function GetServiceModeService() {
  return get('GetServiceModeService');
}
export function GetUnitsService() {
  return get('GetUnitsService');
}
export function GetDemoRoleService() {
  return get('GetDemoRoleService');
}
export function GetPowerBusinessImgService() {
  return get('GetPowerBusinessImgService');
}
export function GetPurchaseByOneLevelCategoryService(data) {
  return get('GetPurchaseByOneLevelCategoryService', data);
}
export function CreateEnterForService(data) {
  return get('CreateEnterForService', data);
}
export function LoginForPassWordService(data) {
  return post('LoginForPassWordService', data);
}
export function GetSpreadFieldService() {
  return get('GetSpreadFieldService');
}
export function CreateSpreadEnterForService(data) {
  return post('CreateSpreadEnterForService', data);
}
export function GetEnlistImgService() {
  return get('GetEnlistImgService');
}
export function GetPlatformInfoService() {
  return get('GetPlatformInfoService');
}
export function GetPurchaseInfoService(data) {
  return get('GetPurchaseInfoService', data);
}
export function GetCategoryByNameService(data) {
  return get('GetCategoryByNameService', data);
}
export function SetPayPasswordService(data) {
  return get('SetPayPasswordService', data);
}
export function GetMemberSellOrderCountService(data) {
  return get('GetMemberSellOrderCountService', data);
}
export function GetMemberBuyOrderCountService(data) {
  return get('GetMemberBuyOrderCountService', data);
}
export function CreateCollectService(data) {
  return get('CreateCollectService', data);
}
export function GetCollectService(data) {
  return get('GetCollectService', data);
}
export function DeleteCollectService(data) {
  return get('DeleteCollectService', data);
}
export function GetHotSearchService() {
  return get('GetHotSearchService');
}
export function GetSeasonSupplyService(data) {
  return get('GetSeasonSupplyService', data);
}
export function GetScoreInfoService(data) {
  return get('GetScoreInfoService', data);
}
export function GetEvaluatFiledService(data) {
  return get('GetEvaluatFiledService', data);
}
export function GetMemberAllEvaluatService(data) {
  return get('GetMemberAllEvaluatService', data);
}
export function GetVerifSupplyService(data) {
  return get('GetVerifSupplyService', data);
}
export function GetMemberFootCountsService(data) {
  return get('GetMemberFootCountsService', data);
}
export function GetWithdrawalsOrderService(data) {
  return get('GetWithdrawalsOrderService', data);
}
export function SetMemberAnIsPushService(data) {
  return get('SetMemberAnIsPushService', data);
}
export function GetBackgroundImgService(data) {
  return get('GetBackgroundImgService', data);
}
export function GetIntentionMemberService(data) {
  return get('GetIntentionMemberService', data);
}
export function GetServicesTermService() {
  return get('GetServicesTermService');
}
export function GetPhraseService(data) {
  return get('GetPhraseService', data);
}
export function CreateMemberPhraseService(data) {
  return get('CreateMemberPhraseService', data);
}
export function DeleteMemberPhraseService(data) {
  return get('DeleteMemberPhraseService', data);
}
export function UpdateMemberPhraseService(data) {
  return get('UpdateMemberPhraseService', data);
}
export function GetSeasonCategoryService() {
  return get('GetSeasonCategoryService');
}
export function GetChildSeasonCategoryService(data) {
  return get('GetChildSeasonCategoryService', data);
}
export function GetNoviceDealGuideService() {
  return get('GetNoviceDealGuideService');
}
export function GetCallRecordService(data) {
  return get('GetCallRecordService', data);
}
export function DySmsCallService(data) {
  return get('DySmsCallService', data);
}
export function UpdateAccessMemberService(data) {
  return get('UpdateAccessMemberService', data);
}
export function AccessWinXinLoginService(data) {
  return post('AccessWinXinLoginService', data);
}
export function GetMemberExistsService(data) {
  return get('GetMemberExistsService', data);
}
export function GetMemberByNickNameOrPhone(data) {
  return get('GetMemberByNickNameOrPhone', data);
}
export function CreateRefundOrderService(data) {
  return get('CreateRefundOrderService', data);
}
export function CancelRefundOrder(data) {
  return get('CancelRefundOrder', data);
}
export function ConfirmRefundOrder(data) {
  return get('ConfirmRefundOrder', data);
}
export function WeiXinRefundService(data) {
  return post('WeiXinRefundService', data);
}
export function AliRefundService(data) {
  return post('AliRefundService', data);
}
export function CreateRefundInfoService(data) {
  return get('CreateRefundInfoService', data);
}
