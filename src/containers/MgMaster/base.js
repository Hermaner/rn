import React from 'react';
import Toast from 'react-native-simple-toast';
import PropTypes from 'prop-types';
import { DeviceEventEmitter, Alert } from 'react-native';
import { GetMasterBasicInfoService, UpdateMasterService } from '../../api';

class Base extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      defaultImg: require('../../assets/img/tx.png'),
      info: null,
      isStart: false,
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
          label: '服务介绍',
          icon: 'icon-youhuiquan',
          color: '#f96b57',
          page: 'MgMasterIntr',
        },
        {
          label: '悟帮工照',
          icon: 'icon-like',
          color: '#eeba57',
          page: 'MgMasterLogo',
        },
        {
          label: '基本资料',
          icon: 'icon-hezuo',
          color: '#febf27',
          page: 'MgMasterSetting',
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
          page: 'MgMasterTxList',
        },
        {
          label: '收入明细',
          icon: 'icon-like',
          color: '#eeba57',
          page: 'MgMasterLogList',
        },
        {
          label: '处罚记录',
          icon: 'icon-hezuo',
          color: '#febf27',
          page: 'MgMasterBadList',
        },
      ],
    };
  }
  getInit = () => {
    this.GetMasterBasicInfoService();
    this.emitMasterLoad = DeviceEventEmitter.addListener('emitMasterLoad', () => {
      this.GetMasterBasicInfoService();
    });
  }
  deleteInit = () => {
    this.emitMasterLoad.remove();
  }
  changeStart = (val) => {
    if (!val) {
      Alert.alert(
        '温馨提示', '确认下工',
        [
          { text: '取消', onPress: () => {} },
          { text: '确认', onPress: () => this.UpdateMasterService(val) },
        ],
      );
    } else {
      this.UpdateMasterService(val);
    }
  }
  UpdateMasterService = (val) => {
    console.log(val);
    this.sleek.toggle();
    UpdateMasterService({
      isStart: val ? '1' : '0',
    }).then((res) => {
      console.log(res);
      this.sleek.toggle();
      if (res.isSuccess) {
        this.setState({
          isStart: val,
        });
      } else {
        Toast.show(res.msg);
      }
    }).catch(() => {
      this.sleek.toggle();
    });
  }
  GetMasterBasicInfoService = () => {
    this.sleek.toggle();
    GetMasterBasicInfoService().then((res) => {
      console.log(res);
      this.sleek.toggle();
      if (res.isSuccess) {
        const info = res.data;
        this.setState({
          info,
          isStart: info.isStart === 1 || info.isStart === '1',
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
    if (key === 'MyTixian') {
      params = {
        amount: info.wallet.balance,
      };
    }
    if (key === 'MgMasterIntr') {
      params = {
        detail: info.detail,
        type: 1,
      };
    }
    if (key === 'MgMasterSetting') {
      params = {
        info,
      };
    }
    if (key === 'MgMasterLogo') {
      params = {
        imgUrl: info.imgUrl || '',
        title: '我的工照',
      };
    }
    if (key === 'MgMasterCert') {
      const images = [];
      info.masterAuths.forEach((item) => {
        images.push(item.imgUrl);
      });
      params = {
        images,
        type: 1,
      };
    }
    if (key === 'MgSecurity') {
      params = {
        depositAmount: info.depositAmount || '',
        type: 1,
      };
    }
    this.props.push({ key, params });
  }
  goPage = (key) => {
    this.props.push({ key });
  }
}
Base.propTypes = {
  push: PropTypes.func,
};
export default Base;
