

import { get, post, uniqueCode } from './api_fetch';


/**
 * 获取用户优惠券
 */
export function Login({
  method,
  orgCode,
  store,
  userName,
  password,
  phoneType,
  appId,
  cid,
}) {
  return get('userLogin', {
    method,
    orgCode,
    store,
    userName,
    password,
    phoneType,
    appId,
    cid,
  });
}
/**
 * 兑换优惠券接口
 */
export function GetHome() {
  return get('orderStatusCount', {
    method: 'V5.mobile.order.status.count',
  });
}

export function GetHomePermission() {
  return get('permissionFunctionSearch', {
    method: 'V5.mobile.permission.function.search',
  });
}


export function getItemSkuSearch({
  method,
  condition,
  productItemId,
  pageSize,
  optype,
}) {
  return get('itemSkuSearch', {
    method,
    condition,
    productItemId,
    pageSize,
    optype,
  });
}
export function GetOrderInfo({
  orderStatus,
  orderNumber,
  orderId,
  pageSize,
  optype,
  orderDeliveryType,
}) {
  return get('orderInfoSearch', {
    orderStatus,
    orderNumber,
    method: 'V5.mobile.order.info.search',
    orderId,
    pageSize,
    optype,
    orderDeliveryType,
  });
}

export function GetOrderStore({
  orderStatus,
  orderNumber,
  method,
  orderId,
  pageSize,
  optype,
}) {
  return get('orderStoreSearch', {
    orderStatus,
    orderNumber,
    method,
    orderId,
    pageSize,
    optype,
  });
}
export function GetOrderDetail({
  orderNumber,
  method,
}) {
  return get('orderInfoGet', {
    orderNumber,
    method,
  });
}

export function GetOrderCode({
  orderNumber,
  type,
  method,
}) {
  return get('orderCodeSend', {
    orderNumber,
    type,
    method,
  });
}

export function GetOrderComfirm({
  orderNumber,
  operation,
  storeNo,
  method,
}) {
  return get('orderComfirm', {
    orderNumber,
    operation,
    storeNo,
    method,
  });
}

export function GetOrderOutsend({
  orderNumber,
  operation,
  code,
  method,
  pCodeList,
}) {
  return get('orderOutsend', {
    orderNumber,
    operation,
    code,
    method,
    pCodeList,
  });
}

export function ReturnOrderSearch({
  orderNumber,
  refund_sku,
}) {
  return post('returnOrderSearch', {
    orderNumber,
    refund_sku,
    method: 'V5.mobile.return.order.search',
  });
}

export function GetOrderSendGood({
  orderNumber,
  operation,
  pCodeList,
}) {
  return get('orderOutsend', {
    orderNumber,
    operation,
    pCodeList,
    method: 'V5.mobile.order.outsend',
  });
}
export function GetOrderOperation({
  orderNumber,
  operation,
  operationReason,
  method,
}) {
  return get('orderOperation', {
    orderNumber,
    operation,
    operationReason,
    method,
  });
}
export function GetKickReason() {
  return get('orderKickbackreasonSearch', {
    method: 'V5.mobile.order.kickbackreason.search',
  });
}

export function GetKickConfirm({
  orderNumber,
  operationReason,
  skus,
}) {
  return get('orderOperation', {
    orderNumber,
    operationReason,
    skus,
    operation: 'KICK_BACK',
    method: 'V5.mobile.order.operation',
  });
}

export function GetAcceptOrder({
  orderNumber,
}) {
  return get('orderOperation', {
    orderNumber,
    operation: 'ACCEPET',
    method: 'V5.mobile.order.operation',
  });
}

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
export function OrderCreate({
  orderData,
  type,
}) {
  return get('orderCreate', {
    orderData,
    uniqueCode: uniqueCode(),
    type,
    method: 'V5.mobile.order.create',
  });
}

export function FreightGet({
  type,
}) {
  return get('freightGet', {
    type,
    method: 'V5.mobile.freight.get',
  });
}
export function CouponGet({
  couponCode,
}) {
  return get('couponGet', {
    couponCode,
    method: 'V5.mobile.order.coupon.get',
  });
}
export function GetPrintTemplate({
  orderNumber,
  type,
}) {
  return get('orderPrintExpress', {
    orderNumber,
    type,
    method: 'V5.mobile.order.print.express',
  });
}
export function GetChannelMember({
  mobilePhone,
}) {
  return get('channelMemberGet', {
    mobilePhone,
    method: 'V5.mobile.channelMember.get',
  });
}

export function UserResetPwd({
  userName,
  password,
  passwordNew,
}) {
  return get('userResetPwd', {
    userName,
    password,
    passwordNew,
    method: 'V5.mobile.user.resetPwd',
  });
}
export function VersionGet({
  orgCode,
}) {
  return get('versionSearch', {
    orgCode,
    method: 'V5.mobile.version.search',
  });
}
export function OrderMixturePayGet({
  orderNumber,
}) {
  return get('orderMixturePayGet', {
    orderNumber,
    method: 'V5.mobile.order.mixture.pay.get',
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
export function OrderMixturePay({
  orderNumber,
  authCode,
  amount,
  paymentType,
}) {
  return post('orderMixturePay', {
    orderNumber,
    authCode,
    amount,
    paymentType,
    method: 'V5.mobile.order.mixture.pay',
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
export function PosCreateOrder({
  jsonstr,
}) {
  return post('posOrderCreate', {
    jsonstr,
    method: 'V5.mobile.pos.createOrder',
  });
}
export function OrderDeliveryInstallSearch({
  orderNumber,
}) {
  return post('orderDeliveryInstallSearch', {
    orderNumber,
    method: 'V5.mobile.order.deliveryInstall.search',
  });
}
export function CardVerify({
  valid_info,
  goods_list,
}) {
  return post('posPayCardVerify', {
    valid_info,
    goods_list,
    method: 'V5.mobile.pos.card.verify',
  });
}
export function CardVerifySearch({
  valid_info,
  goods_list,
}) {
  return post('cardVerifySearch', {
    valid_info,
    goods_list,
    method: 'V5.mobile.card.verify.search',
  });
}

export function UpdateOrderStatus({
  orderNumber,
  payType,
}) {
  return post('updateOrderStatus', {
    orderNumber,
    payType,
    method: 'V5.mobile.update.orderStatus',
  });
}
export function YMPOSPay({
  barcode_info,
  pay_type,
  tx_amt,
  orderNumber,
}) {
  return get('yMPOSPay', {
    barcode_info,
    pay_type,
    tx_amt,
    orderNumber,
    method: 'V5.mobile.ympos.pay',
  });
}
export function pOSCancelOrder({
  orderNumber,
  shopId,
  json_str,
}) {
  return post('pOSCancelOrder', {
    orderNumber,
    shopId,
    json_str,
    method: 'V5.mobile.cancel.order',
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
