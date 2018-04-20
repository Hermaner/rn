import React from 'react';
import { DeviceEventEmitter } from 'react-native';
import Toast from 'react-native-simple-toast';
import { GetMemberSurplusAmountService } from '../../api';

class AccountCenterBase extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [
        {
          id: '1',
          title: '收款账号',
          label: '银行卡/支付宝账号/微信账号',
          leftIcn: 'arrow-back',
          push: 'GatheringAccount',
        }],
      backGround1: require('../../assets/img/2.png'),
      isValidate: false, // 是否验证
      money: '',
    };
  }
  getData = () => {
    GetMemberSurplusAmountService({
      memberId: global.memberId,
    }).then((res) => {
      if (res.isSuccess) {
        // console.log(res);
        this.setState({
          money: res.data,
        });
      } else {
        Toast.show(res.msg);
      }
    }).catch(() => {
    });
  }
  initData = () => {
    this.emitMineUser = DeviceEventEmitter.addListener('emitCash', () => {
      this.emitCash();
    });
    this.getData();
  }
  deleteInit = () => {
    this.emitMineUser.remove();
    this.state = null;
  }
  emitCash = () => {
    this.getData();
  }
}
export default AccountCenterBase;
