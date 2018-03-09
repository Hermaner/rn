import React from 'react';
import Toast from 'react-native-simple-toast';
import PropTypes from 'prop-types';
import { DeviceEventEmitter } from 'react-native';
import { UserSocket } from '../../components';
import { GetMemberCenterService } from '../../api';

class Base extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      defaultImg: require('../../assets/img/tx.png'),
      applyData: [],
      refresh: false,
      isModalShow: false,
      balance: 0,
      orderItems: [
        {
          label: '需求单',
          icon: 'ios-list-box-outline',
          page: 'myDemandOrder',
          count: 0,
        },
        {
          label: '待付款',
          icon: 'ios-list-box-outline',
          id: '1',
          count: 0,
        },
        {
          label: '待服务',
          icon: 'ios-list-box-outline',
          id: '3',
          count: 0,
        },
        {
          label: '待评价',
          icon: 'ios-list-box-outline',
          id: '4',
          count: 0,
        },
        {
          label: '退款/售后',
          icon: 'ios-list-box-outline',
          id: '6',
          count: 0,
        },
      ],
      icons: [
        {
          label: '我的地址',
          icon: 'ios-pin-outline',
          color: '#ff6a54',
          page: 'MyAddress',
        },
        {
          label: '我的收藏',
          icon: 'ios-color-filter-outline',
          color: '#ff6a54',
          page: 'MyColl',
        },
        {
          label: '提现账号',
          icon: 'ios-card',
          color: '#eeba57',
          page: 'MyDrawList',
        },
        {
          label: '邀请好友',
          icon: 'ios-bulb-outline',
          color: '#f96b57',
          page: 'showModal',
        },
        {
          label: '签到领福利',
          icon: 'ios-calendar-outline',
          color: '#eeba57',
          page: 'myColl',
        },
        {
          label: '我要合作',
          icon: 'ios-flame',
          color: '#febf27',
          page: 'ApplyWant',
        },
        {
          label: '常见问题',
          icon: 'ios-book-outline',
          color: '#f2a050',
          page: 'PlatProblem',
        },
        {
          label: '客服反馈',
          icon: 'ios-headset-outline',
          color: '#9191d4',
          page: 'Feedback',
        },
        {
          label: '关于我们',
          icon: 'ios-globe-outline',
          color: '#b1c26a',
          page: 'About',
        },
      ],
      shares: [{
        label: '微信',
        icon: 'md-alarm',
        color: '#62b900',
      }, {
        label: '朋友圈',
        icon: 'md-alarm',
        color: '#556876',
      }, {
        label: '微博',
        icon: 'md-alarm',
        color: '#fc5e6a',
      }, {
        label: 'QQ',
        icon: 'md-alarm',
        color: '#68a5e1',
      }],
    };
  }
  getInit = () => {
    // this.getData();
    this.emitMineUser = DeviceEventEmitter.addListener('emitUser', () => {
      this.getData();
    });
  }
  getData = () => {
    if (!global.memberId) {
      return;
    }
    GetMemberCenterService({
      memberId: global.memberId,
    }).then((res) => {
      console.log(res);
      if (res.isSuccess) {
        const {
          balance,
          demandCount,
          waitePayCount,
          waiteServiceCount,
          waiteEvaluateCount,
          bmMarketInfo,
          couponCount,
          decorationInfo,
          depositOrderMaster,
          masterInfo,
        } = res.data;
        const applyData = [];
        let applyInfo = {};
        if (bmMarketInfo) {
          if (bmMarketInfo.checkStatus === 4) {
            global.bmMarketId = bmMarketInfo.bmMarketId;
            applyInfo.bmMarketId = bmMarketInfo.bmMarketId;
          } else {
            applyData.push({
              status: bmMarketInfo.checkStatus,
              name: '建材市场入驻申请',
              memo: bmMarketInfo.checkMemo,
              id: '1',
            });
          }
        }
        if (decorationInfo) {
          if (decorationInfo.checkStatus === 4) {
            global.decorationId = decorationInfo.decorationId;
            applyInfo.decorationId = decorationInfo.decorationId;
          } else {
            applyData.push({
              status: decorationInfo.checkStatus,
              name: '装修公司入驻申请',
              memo: decorationInfo.checkMemo,
              id: '2',
            });
          }
        }
        if (masterInfo) {
          if (masterInfo.checkStatus === 4) {
            applyInfo.masterId = masterInfo.masterId;
            global.masterId = masterInfo.masterId;
          } else {
            applyData.push({
              status: masterInfo.checkStatus,
              name: '师傅入驻申请',
              memo: masterInfo.checkMemo,
              id: '3',
            });
          }
        }
        applyInfo = {
          ...applyInfo,
          applyData,
          couponCount,
          balance,
          demandCount,
          waitePayCount,
          waiteServiceCount,
          waiteEvaluateCount,
        };
        UserSocket.changeApply(applyInfo);
        global.depositOrderMaster = depositOrderMaster;
      } else {
        Toast.show(res.msg);
      }
    }).catch(() => {
      this.sleek.toggle();
    });
  }
  _onRefresh = () => {
    DeviceEventEmitter.emit('emitMine');
  }
  goRoleStatus = (item) => {
    const { push } = this.props;
    switch (item.id) {
      case '1':
        push({ key: '', params: { } });
        break;
      case '2':
        push({ key: '', params: { } });
        break;
      case '3':
        push({ key: '', params: { } });
        break;
      default:
    }
  }
  goPage = (key, params) => {
    if (!global.memberId) {
      this.props.push({ key: 'User' });
      return;
    }
    if (key === 'showModal') {
      this.showModal();
      return;
    }
    this.props.push({ key, params: params || {} });
  }
  showModal = () => {
    this.setState({
      isModalShow: true,
    });
  }
  closeModal = () => {
    this.setState({
      isModalShow: false,
    });
  }
}
Base.propTypes = {
  push: PropTypes.func,
};
export default Base;
