import React from 'react';
import Toast from 'react-native-simple-toast';
import PropTypes from 'prop-types';
import { DeviceEventEmitter } from 'react-native';
import { GetMemberInfoService } from '../../api';

class Base extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      defaultImg: require('../../assets/img/tx.png'),
      orderItems: [
        {
          label: '需求单',
          icon: 'md-alarm',
          page: 'myDemandOrder',
          count: 0,
        },
        {
          label: '待付款',
          icon: 'md-alarm',
          id: '1',
          count: 0,
        },
        {
          label: '待服务',
          icon: 'md-alarm',
          id: '3',
          count: 0,
        },
        {
          label: '待评价',
          icon: 'md-alarm',
          id: '4',
          count: 0,
        },
        {
          label: '退款/售后',
          icon: 'md-alarm',
          id: '6',
          count: 0,
        },
      ],
      icons: [
        {
          label: '我的地址',
          icon: 'icon-location',
          color: '#ff6a54',
          page: 'myAddress',
        },
        {
          label: '邀请好友',
          icon: 'icon-youhuiquan',
          color: '#f96b57',
          page: 'myCoupons',
        },
        {
          label: '签到领福利',
          icon: 'icon-like',
          color: '#eeba57',
          page: 'myColl',
        },
        {
          label: '我要合作',
          icon: 'icon-hezuo',
          color: '#febf27',
          page: 'myWantIn',
        },
        {
          label: '常见问题',
          icon: 'icon-question',
          color: '#f2a050',
          page: 'CoProblem',
        },
        {
          label: '客服反馈',
          icon: 'icon-fabuxiaoxi',
          color: '#9191d4',
          page: 'feedback',
        },
        {
          label: '关于我们',
          icon: 'icon-guanyu',
          color: '#b1c26a',
          page: 'about',
        },
      ],
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
        Toast.show('温馨提示');
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
  goPage = (key) => {
    this.props.push({ key });
  }
  emitUser = () => {
    if (!global.memberId) {
      return;
    }
    this.setState({ memberId: global.memberId || '' }, this.getData);
  }
}
Base.propTypes = {
  push: PropTypes.func,
  navigation: PropTypes.object,
};
export default Base;
