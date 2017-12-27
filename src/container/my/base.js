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
          icnColor: '#64BD46',
          push: 'MyRelease',
        }, {
          id: '1',
          title: '买到的货品',
          last: true,
          label: '',
          icnColor: '#64BD46',
          push: 'MyBuyGoods',
        }]], ['我是卖家', [{
          id: '1',
          title: '我的供应',
          last: false,
          label: '',
          icnColor: '#10B1F1',
          push: 'MySupply',
        }, {
          id: '1',
          title: '卖出的货品',
          last: false,
          label: '',
          icnColor: '#10B1F1',
          push: 'MySoldGoods',
        }, {
          id: '1',
          title: '发出的报价',
          last: false,
          label: '',
          icnColor: '#FC8521',
          push: 'MySendOffer',
        }, {
          id: '1',
          title: '商机推送',
          last: false,
          label: '',
          icnColor: '#FC8521',
          push: 'MyNichePush',
        }, {
          id: '1',
          title: '我的访客',
          last: true,
          label: '',
          icnColor: '#64BD46',
          push: 'MyVisitor',
        }]], ['其他', [{
          id: '1',
          title: '账户中心',
          last: true,
          label: '账户资金/提现/账户安全',
          icnColor: '#64BD46',
          push: 'AccountCenter',
        }, {
          id: '1',
          title: '一件代发',
          last: true,
          label: '惠农优选',
          icnColor: '#64BD46',
          push: '',
        }, {
          id: '1',
          title: '我的主页',
          last: true,
          label: '',
          icnColor: '#64BD46',
          push: 'MyInfo',
        }, {
          id: '1',
          title: '我的足迹',
          last: true,
          label: '我看过的采购/供应/店铺',
          icnColor: '#10B1F1',
          push: 'MyFootprint',
        }, {
          id: '1',
          title: '我要认证',
          last: true,
          label: '提高货品曝光度',
          icnColor: '#10B1F1',
          push: 'Certification',
        }, {
          id: '1',
          title: '意见反馈',
          last: true,
          label: '',
          icnColor: '#FC8521',
          push: 'AboutUs',
        }, {
          id: '1',
          title: '邀请好友',
          last: true,
          icnColor: '#FC8521',
          label: '',
          push: '',
        }, {
          id: '1',
          title: '联系客服',
          last: true,
          icnColor: '#FC8521',
          label: '400-008-8900',
          push: '',
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
      backGround1: require('../../assets/img/1.png'),
    };
  }
}
export default MyBase;
