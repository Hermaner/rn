import React from 'react';
import * as WeChat from 'react-native-wechat';
import Alipay from 'react-native-yunpeng-alipay';

class AccountCenterBase extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [{
        id: '1',
        title: '账单',
        label: '收支记录',
        leftIcn: 'arrow-back',
        push: 'Bill',
      }, {
        id: '1',
        title: '支付密码',
        label: '设置/重置/修改支付密码',
        leftIcn: 'arrow-back',
        push: 'ValidatePhone',
      }, {
        id: '1',
        title: '收款账号',
        label: '银行卡/支付宝账号/微信账号',
        leftIcn: 'arrow-back',
        push: 'GatheringAccount',
      }],
      backGround1: require('../../assets/img/2.png'),
      isValidate: false, // 是否验证
    };
  }
}
export default AccountCenterBase;
