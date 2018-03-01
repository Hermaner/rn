import React from 'react';
import Toast from 'react-native-simple-toast';
import PropTypes from 'prop-types';
import { GetDepositMasterService, CreateDepositOrderService } from '../../api';

class Base extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      topbg: require('../../assets/img/yjbg.png'),
      depositAmount: props.navigation.state.params.depositAmount,
      amount: '',
    };
  }
  getInit = () => {
    this.GetDepositMasterService();
  }
  GetDepositMasterService = () => {
    this.sleek.toggle();
    GetDepositMasterService().then((res) => {
      console.log(res);
      this.sleek.toggle();
      if (res.isSuccess) {
        this.setState({
          amount: res.data[0].depositAmount,
          depositMasterId: res.data[0].depositMasterId,
        });
      } else {
        Toast.show(res.msg);
      }
    }).catch((err) => {
      this.sleek.toggle();
      console.log(err);
    });
  }
  CreateDepositOrderService = () => {
    this.sleek.toggle();
    const { depositMasterId, amount } = this.state;
    CreateDepositOrderService({
      depositMasterId: depositMasterId.toString(),
    }).then((res) => {
      console.log(res);
      this.sleek.toggle();
      if (res.isSuccess) {
        this.props.push({
          key: 'CreatePay',
          params: {
            orderNumber: res.data.serialNumber,
            orderId: res.data.orderId,
            amount,
            type: 5,
          },
        });
      } else {
        Toast.show(res.msg);
      }
    }).catch((err) => {
      this.sleek.toggle();
      console.log(err);
    });
  }
}
Base.propTypes = {
  push: PropTypes.func,
  navigation: PropTypes.navigation,
};
export default Base;
