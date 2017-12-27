import React from 'react';
import * as WeChat from 'react-native-wechat';
import Alipay from 'react-native-yunpeng-alipay';

class GatheringAccountBase extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [{
        id: 1,
        title: '支付宝账号',
        name: '虫**',
        label: '默认收款账号',
        isDefault: true,
      }, {
        id: 1,
        title: '微信账号',
        name: '虫**',
        label: '设为收款账号',
        isDefault: false,
      }, {
        id: 1,
        title: '中国建设银行',
        name: '**** **** **** ***6 125',
        label: '设为收款账号',
        isDefault: false,
      }],
    };
  }
  chooseBank = (value) => {
    this.setState({
      selected1: value,
    });
  }
}
export default GatheringAccountBase;
