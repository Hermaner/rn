import React from 'react';
import Toast from 'react-native-simple-toast';
import { DeviceEventEmitter } from 'react-native';
import { GetMemberInfoService } from '../../api';

class MyBase extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstList: [{
        id: '1',
        title: '我的关注',
        count: 0,
        push: '',
      }, {
        id: '1',
        title: '我的主页',
        count: 0,
        push: 'MyInfo',
      }, {
        id: '1',
        title: '我的足迹',
        count: 0,
        push: 'MyFootprint',
      }, {
        id: '1',
        title: '我的访客',
        count: 0,
        push: 'MyVisitor',
      }],
      list: [
        ['我是买家', [{
          id: '1',
          title: '我发布的采购',
          last: false,
          label: '',
          isLast: false,
          icnColor: '#64BD46',
          push: 'MyRelease',
          icn: 'icon-caigoudingdan',
        }, {
          id: '1',
          title: '买到的货品',
          last: true,
          label: '',
          isLast: false,
          icnColor: '#64BD46',
          push: 'MyBuyGoods',
          icn: 'icon-shangpin-tianchong',
        }]], ['我是卖家', [{
          id: '1',
          title: '我的供应',
          last: false,
          label: '',
          isLast: false,
          icnColor: '#10B1F1',
          push: 'MySupply',
          icn: 'icon-homepage',
        }, {
          id: '1',
          title: '卖出的货品',
          last: false,
          label: '',
          isLast: false,
          icnColor: '#10B1F1',
          push: 'MySoldGoods',
          icn: 'icon-shangpin-tianchong',
        }, {
          id: '1',
          title: '发出的报价',
          last: false,
          label: '',
          isLast: false,
          icnColor: '#FC8521',
          push: 'MySendOffer',
          icn: 'icon-zixun',
        }]], ['其他', [{
          id: '1',
          title: '账户中心',
          last: true,
          label: '账户资金/提现/账户安全',
          isLast: true,
          icnColor: '#64BD46',
          push: 'AccountCenter',
          icn: 'icon-zhanghu',
        }, {
          id: '1',
          title: '我要认证',
          last: true,
          label: '提高货品曝光度',
          isLast: true,
          icnColor: '#10B1F1',
          push: 'Certification',
          icn: 'icon-renzheng-tianchong',
        }, {
          id: '1',
          title: '意见反馈',
          last: true,
          isLast: true,
          label: '',
          icnColor: '#FC8521',
          push: 'AboutUs',
          icn: 'icon-qunfengyijianfankui',
        }, {
          id: '1',
          title: '联系客服',
          last: true,
          icnColor: '#FC8521',
          label: '400-008-8900',
          isLast: true,
          push: 'User',
          icn: 'icon-kefu',
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
      userInfo: '',
    };
  }
  getData = () => {
    const { memberId } = this.state;
    GetMemberInfoService({
      memberId,
    }).then((res) => {
      console.log(res);
      if (res.isSuccess) {
        const result = res.data;
        this.setState({
          userInfo: result,
        });
      } else {
        Toast.show(res.msg);
      }
    }).catch(() => {
      this.sleek.toggle();
    });
  }
  initData = () => {
    this.emitMineUser = DeviceEventEmitter.addListener('emitUser', () => {
      this.emitUser();
    });
  }
  emitUser = () => {
    if (!global.memberId) {
      return;
    }
    this.setState({ memberId: global.memberId || '' }, this.getData);
  }
}
export default MyBase;
