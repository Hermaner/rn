import React from 'react';
import * as WeChat from 'react-native-wechat';
import Alipay from 'react-native-yunpeng-alipay';

class UserInfoBase extends React.Component {
  wxLogin = () => {
    WeChat.sendAuthRequest('snsapi_userinfo', 'App')
    .then(res => console.log(res));
  }
  async goWXpay() {
    const orderID = '1';
    React.WxUnifiedOrder({
      order_id: orderID,
    }).then((lists) => {
      console.log(lists);
      if (lists.data.is_success) {
        const result = lists.data.result;
        try {
          WeChat.pay(
            {
              partnerId: result.mch_id,
              prepayId: result.prepay_id,
              nonceStr: result.nonce_str,
              timeStamp: result.timeStamp,
              package: 'Sign=WXPay',
              sign: '140822CCE34FD5B2303956105E49CA7C',
            },
          );
        } catch (error) {
          console.log('Pay for failure!');
        }
      }
    }).catch(err => console.log(err));
  }
  goAlipay() {
    const orderID = '1';
    React.UnifiedOrder({
      order_id: orderID,
    }).then((lists) => {
      if (lists.data.is_success) {
        const result = lists.data.result;
        Alipay.pay(result).then((json) => {
          const payResult = json.split(';');
          const statusStr = payResult[0];
          const pattern = new RegExp('\\{(.| )+?\\}', 'igm');
          const status = statusStr.match(pattern).toString();
          const resultStatus = status.substring(1, status.length - 1);
          if (resultStatus === '9000') {
            this.goRoute('Hireservices');
          } else {
            console.log('其他失败原因');
          }
        }).catch(err => console.log(err));
      }
    }).catch(err => console.log(err));
  }
  common() {
    this.name = 'herman';
  }
}
export default UserInfoBase;
