import React from 'react';
import * as WeChat from 'react-native-wechat';
import Alipay from 'react-native-yunpeng-alipay';

class MyBase extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [
        ['我是买家', [{
          id: '1',
          title: '我发布的采购',
          last: false,
          label: '',
          push: 'MyRelease',
        }, {
          id: '1',
          title: '买到的货品',
          last: true,
          label: '',
          push: 'MyBuyGoods',
        }]], ['我是卖家', [{
          id: '1',
          title: '我的供应',
          last: false,
          label: '',
          push: 'MySupply',
        }, {
          id: '1',
          title: '卖出的货品',
          last: false,
          label: '',
          push: 'MySoldGoods',
        }, {
          id: '1',
          title: '发出的报价',
          last: false,
          label: '',
          push: 'MySendOffer',
        }, {
          id: '1',
          title: '商机推送',
          last: false,
          label: '',
          push: 'MyNichePush',
        }, {
          id: '1',
          title: '我的访客',
          last: true,
          label: '',
          push: 'MyVisitor',
        }]], ['其他', [{
          id: '1',
          title: '账户中心',
          last: true,
          label: '账户资金/提现/账户安全',
          push: 'AccountCenter',
        }, {
          id: '1',
          title: '一件代发',
          last: true,
          label: '惠农优选',
          push: '',
        }, {
          id: '1',
          title: '我的主页',
          last: true,
          label: '',
          push: 'MyInfo',
        }, {
          id: '1',
          title: '我的足迹',
          last: true,
          label: '我看过的采购/供应/店铺',
          push: 'MyFootprint',
        }, {
          id: '1',
          title: '我要认证',
          last: true,
          label: '提高货品曝光度',
          push: 'Certification',
        }, {
          id: '1',
          title: '意见反馈',
          last: true,
          label: '',
          push: 'AboutUs',
        }, {
          id: '1',
          title: '邀请好友',
          last: true,
          label: '',
        }, {
          id: '1',
          title: '联系客服',
          last: true,
          label: '400-008-8900',
        }]]],
      items2: [{
        id: '1',
        title: '我是买家',
      }, {
        id: '1',
        title: '我是卖家',
      }, {
        id: '1',
        title: '其他',
      }],
    };
  }
}
export default MyBase;
