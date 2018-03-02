import React from 'react';
import Toast from 'react-native-simple-toast';
import PropTypes from 'prop-types';
import { DeviceEventEmitter } from 'react-native';
import { GetBmMarketInfoService } from '../../api';

class Base extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      defaultImg: require('../../assets/img/tx.png'),
      info: {},
      totalMoney: '0.00',
      outMoney: '0.00',
      inMoney: '0.00',
      userData: {},
      userInfo: {},
      orderItems: [
        {
          label: '待预约',
          icon: 'md-alarm',
          page: 'myDemandOrder',
          count: 0,
        },
        {
          label: '待服务',
          icon: 'md-alarm',
          id: '1',
          count: 0,
        },
        {
          label: '服务中',
          icon: 'md-alarm',
          id: '3',
          count: 0,
        },
        {
          label: '待入账',
          icon: 'md-alarm',
          id: '4',
          count: 0,
        },
        {
          label: '全部',
          icon: 'md-alarm',
          id: '6',
          count: 0,
        },
      ],
      icons: [
        {
          label: '我的认证',
          icon: 'icon-location',
          color: '#ff6a54',
          page: 'MgMasterCert',
        },
        {
          label: '公司介绍',
          icon: 'icon-youhuiquan',
          color: '#f96b57',
          page: 'MgMasterIntr',
        },
        {
          label: '公司logo',
          icon: 'icon-like',
          color: '#eeba57',
          page: 'MgMasterLogo',
        },
        {
          label: '基本资料',
          icon: 'icon-hezuo',
          color: '#febf27',
          page: 'MgBmMarketSetting',
        },
        {
          label: '我的保证金',
          icon: 'icon-location',
          color: '#ff6a54',
          page: 'MgSecurity',
        },
        {
          label: '提现记录',
          icon: 'icon-youhuiquan',
          color: '#f96b57',
          page: 'myCoupons',
        },
        {
          label: '收入明细',
          icon: 'icon-like',
          color: '#eeba57',
          page: 'myColl',
        },
        {
          label: '处罚记录',
          icon: 'icon-hezuo',
          color: '#febf27',
          page: 'ApplyWant',
        },
      ],
    };
  }
  getInit = () => {
    this.GetBmMarketInfoService();
    this.emitMasterLoad = DeviceEventEmitter.addListener('emitMasterLoad', () => {
      this.GetBmMarketInfoService();
    });
  }
  deleteInit = () => {
    this.emitMasterLoad.remove();
  }
  GetBmMarketInfoService = () => {
    this.sleek.toggle();
    GetBmMarketInfoService({
      bmMarketId: global.bmMarketId,
    }).then((res) => {
      this.sleek.toggle();
      console.log(res);
      if (res.isSuccess) {
        this.setState({
          info: res.data,
        });
      } else {
        Toast.show(res.msg);
      }
    }).catch(() => {
      this.sleek.toggle();
    });
  }
  goIconPage = (key) => {
    const { info } = this.state;
    let params = {};
    if (key === 'MgMasterIntr') {
      params = {
        detail: info.detail,
        type: 2,
      };
    }
    if (key === 'MgBmMarketSetting') {
      params = {
        info,
      };
    }
    if (key === 'MgMasterLogo') {
      params = {
        imgUrl: info.imgUrl || '',
        title: '上传公司logo',
        type: 2,
      };
    }
    if (key === 'MgMasterCert') {
      const images = [];
      info.credentialss.forEach((item) => {
        images.push(item.imgUrl);
      });
      params = {
        images,
        type: 2,
      };
    }
    if (key === 'MgSecurity') {
      params = {
        depositAmount: info.depositAmount || '',
        type: 2,
      };
    }
    this.props.push({ key, params });
  }
  goNoPage = () => {
    Toast.show('敬请期待！');
  }
  goPage = (key) => {
    this.props.push({ key });
  }
}
Base.propTypes = {
  push: PropTypes.func,
};
export default Base;
