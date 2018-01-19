import React from 'react';
import Toast from 'react-native-simple-toast';
import { GetMemberInfoService } from '../../api';

class MyBase extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [
        ['我是买家', [{
          id: '1',
          title: '我发布的采购',
          last: false,
          label: '',
          icnColor: '#64BD46',
          push: 'MyRelease',
          icn: 'icon-caigoudingdan',
        }, {
          id: '1',
          title: '买到的货品',
          last: true,
          label: '',
          icnColor: '#64BD46',
          push: 'MyBuyGoods',
          icn: 'icon-shangpin-tianchong',
        }]], ['我是卖家', [{
          id: '1',
          title: '我的供应',
          last: false,
          label: '',
          icnColor: '#10B1F1',
          push: 'MySupply',
          icn: 'icon-homepage',
        }, {
          id: '1',
          title: '卖出的货品',
          last: false,
          label: '',
          icnColor: '#10B1F1',
          push: 'MySoldGoods',
          icn: 'icon-shangpin-tianchong',
        }, {
          id: '1',
          title: '发出的报价',
          last: false,
          label: '',
          icnColor: '#FC8521',
          push: 'MySendOffer',
          icn: 'icon-zixun',
        }, {
          id: '1',
          title: '商机推送',
          last: false,
          label: '',
          icnColor: '#FC8521',
          push: 'MyNichePush',
          icn: 'icon-jiantouarrow498',
        }, {
          id: '1',
          title: '我的访客',
          last: true,
          label: '',
          icnColor: '#64BD46',
          push: 'MyVisitor',
          icn: 'icon-renyuanxiaozu',
        }]], ['其他', [{
          id: '1',
          title: '账户中心',
          last: true,
          label: '账户资金/提现/账户安全',
          icnColor: '#64BD46',
          push: 'AccountCenter',
          icn: 'icon-zhanghu',
        }, {
          id: '1',
          title: '一件代发',
          last: true,
          label: '惠农优选',
          icnColor: '#64BD46',
          push: '',
          icn: 'icon-dianji',
        }, {
          id: '1',
          title: '我的主页',
          last: true,
          label: '',
          icnColor: '#64BD46',
          push: 'MyInfo',
          icn: 'icon-homepage',
        }, {
          id: '1',
          title: '我的足迹',
          last: true,
          label: '我看过的采购/供应/店铺',
          icnColor: '#10B1F1',
          push: 'MyFootprint',
          icn: 'icon-zuji',
        }, {
          id: '1',
          title: '我要认证',
          last: true,
          label: '提高货品曝光度',
          icnColor: '#10B1F1',
          push: 'Certification',
          icn: 'icon-renzheng-tianchong',
        }, {
          id: '1',
          title: '意见反馈',
          last: true,
          label: '',
          icnColor: '#FC8521',
          push: 'AboutUs',
          icn: 'icon-qunfengyijianfankui',
        }, {
          id: '1',
          title: '邀请好友',
          last: true,
          icnColor: '#FC8521',
          label: '',
          push: 'StoreDetail',
          icn: 'icon-yaoqing',
        }, {
          id: '1',
          title: '联系客服',
          last: true,
          icnColor: '#FC8521',
          label: '400-008-8900',
          push: '',
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
  getInit = () => {
    if (!global.memberId) {
      return;
    }
    this.setState({ memberId: global.memberId }, this._onRefresh);
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
        Toast.show('温馨提示');
      }
    }).catch((err) => {
      this.sleek.toggle();
      Toast.show(err);
    });
  }
  _onRefresh = () => {
    this.setState({
      refresh: true,
      currentPage: 1,
    }, () => this.getData());
  }
}
export default MyBase;
