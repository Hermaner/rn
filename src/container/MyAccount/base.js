import React from 'react';
import { DeviceEventEmitter } from 'react-native';
import Toast from 'react-native-simple-toast';
import PropTypes from 'prop-types';
import { GetMemberSurplusAmountService, GetMemberInfoService } from '../../api';

class Base extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      amount: '0.00',
      isPassword: false, // 是否有支付密码
      status: '',
    };
  }
  getData = () => {
    GetMemberInfoService({
      memberId: global.memberId,
    }).then((res) => {
      // console.log(res);
      if (res.isSuccess) {
        const result = res.data;
        if (result.payPassword !== null && result.payPassword !== '') {
          this.setState({
            isPassword: true,
          });
        }
      } else {
        Toast.show(res.msg);
      }
    }).catch(() => {
      this.sleek.toggle();
    });

    GetMemberSurplusAmountService({
      memberId: global.memberId,
    }).then((res) => {
      if (res.isSuccess) {
        // console.log(res);
        this.setState({
          amount: res.data,
          status: res.map.isWithdrawals,
        });
      } else {
        Toast.show(res.msg);
      }
    }).catch(() => {
    });
  }
  getDelete = () => {
    this.emitMyAccount.remove();
  }
  emitAccount = () => {
    this.getData();
  }
  initData = () => {
    this.emitMyAccount = DeviceEventEmitter.addListener('emitAccount', () => {
      this.emitAccount();
    });
  }
  goSetPassword = () => {
    const { isPassword } = this.state;
    if (!isPassword) {
      this.props.push({ key: 'ValidatePhone' });
    } else {
      this.props.push({ key: 'SetPayPassword' });
    }
  }
}
Base.propTypes = {
  push: PropTypes.func,
};
export default Base;
