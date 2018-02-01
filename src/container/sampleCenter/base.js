import React from 'react';
import Toast from 'react-native-simple-toast';
import { DeviceEventEmitter } from 'react-native';
import { GetMemberInfoService } from '../../api';

class MyBase extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      identity: [{
        id: '1',
        title: '超市',
        isChoose: false,
      }, {
        id: '1',
        title: '农副加工',
        isChoose: false,
      }, {
        id: '1',
        title: '贸易公司',
        isChoose: false,
      }, {
        id: '1',
        title: '餐饮企业',
        isChoose: false,
      }, {
        id: '1',
        title: '门店老板',
        isChoose: false,
      }, {
        id: '1',
        title: '网店老板',
        isChoose: false,
      }, {
        id: '1',
        title: '电商公司',
        isChoose: false,
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
  emitUser = () => {
    if (!global.memberId) {
      return;
    }
    this.setState({ memberId: global.memberId || '' }, this.getData);
  }
}
export default MyBase;
