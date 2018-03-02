import React from 'react';
import Toast from 'react-native-simple-toast';
import PropTypes from 'prop-types';
import {
  GetDepositMasterService,
  CreateDepositOrderService,
  GetDepositBmMarketService,
  CreateDepositOrderBmMarketService,
  GetDepositDecorationService,
  CreateDepositOrderDecorationService,
} from '../../api';

class Base extends React.Component {
  constructor(props) {
    super(props);
    const { depositAmount, type } = props.navigation.state.params;
    this.state = {
      topbg: require('../../assets/img/yjbg.png'),
      type,
      depositAmount,
      amount: '',
    };
  }
  getInit = () => {
    const { type } = this.state;
    switch (type) {
      case 1:
        this.GetDepositMasterService();
        break;
      case 2:
        this.GetDepositBmMarketService();
        break;
      case 3:
        this.GetDepositDecorationService();
        break;
      default:
    }
  }
  save = () => {
    const { type } = this.state;
    switch (type) {
      case 1:
        this.CreateDepositOrderService();
        break;
      case 2:
        this.CreateDepositOrderBmMarketService();
        break;
      case 3:
        this.CreateDepositOrderDecorationService();
        break;
      default:
    }
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
  GetDepositBmMarketService = () => {
    this.sleek.toggle();
    GetDepositBmMarketService().then((res) => {
      console.log(res);
      this.sleek.toggle();
      if (res.isSuccess) {
        this.setState({
          amount: res.data[0].depositAmount,
          depositBmMarketId: res.data[0].depositBmMarketId,
        });
      } else {
        Toast.show(res.msg);
      }
    }).catch((err) => {
      this.sleek.toggle();
      console.log(err);
    });
  }
  CreateDepositOrderBmMarketService = () => {
    this.sleek.toggle();
    const { depositBmMarketId, amount } = this.state;
    CreateDepositOrderBmMarketService({
      depositBmMarketId: depositBmMarketId.toString(),
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
  GetDepositDecorationService = () => {
    this.sleek.toggle();
    GetDepositDecorationService().then((res) => {
      console.log(res);
      this.sleek.toggle();
      if (res.isSuccess) {
        this.setState({
          amount: res.data[0].depositAmount,
          depositDecorationId: res.data[0].depositDecorationId,
        });
      } else {
        Toast.show(res.msg);
      }
    }).catch((err) => {
      this.sleek.toggle();
      console.log(err);
    });
  }
  CreateDepositOrderDecorationService = () => {
    this.sleek.toggle();
    const { depositDecorationId, amount } = this.state;
    CreateDepositOrderDecorationService({
      depositDecorationId: depositDecorationId.toString(),
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
