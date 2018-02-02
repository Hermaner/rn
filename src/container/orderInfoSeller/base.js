import React from 'react';
import Toast from 'react-native-simple-toast';
import PropTypes from 'prop-types';
import { UpdateOrderService } from '../../api';

class Base extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      orderInfo: '',
      supplyInfo: '',
      tu: require('../../assets/img/no.png'),
      amount: '',
      status: '6',
      myStatus: '', // 页面当前订单状态
      removeInfo: '',
      favorable: '', // 优惠价格
      revisePrice: '', // 减去优惠金额后的总价
    };
  }
  getInit = () => {
    const { orderInfo, supplyInfo } = this.props.navigation.state.params;
    this.setState({
      orderInfo,
      supplyInfo,
    });
  }
  removeOrder = () => {
    this.sleek.toggle();
    const { amount, orderInfo, supplyInfo } = this.state;
    const status = '6';
    UpdateOrderService({
      memberId: supplyInfo.memberId,
      orderId: orderInfo.orderId,
      amount,
      status,
    }).then((res) => {
      this.sleek.toggle();
      if (res.isSuccess) {
        const result = res.data;
        console.log('^^^^^^', result);
        this.setState({
          myStatus: result.status,
          removeInfo: result,
        });
      } else {
        Toast.show('温馨提示');
      }
    }).catch((err) => {
      this.sleek.toggle();
      console.log(err);
    });
  }
  reviseOrder = () => {
    this.sleek.toggle();
    const { amount, orderInfo, supplyInfo, revisePrice } = this.state;
    const allMoney = revisePrice || amount;
    const status = '2';
    UpdateOrderService({
      memberId: supplyInfo.memberId,
      orderId: orderInfo.orderId,
      amount: allMoney,
      status,
    }).then((res) => {
      this.sleek.toggle();
      if (res.isSuccess) {
        const result = res.data;
        console.log('^^^^^^', result);
        this.setState({
          myStatus: result.status,
          removeInfo: result,
        });
      } else {
        Toast.show('温馨提示');
      }
    }).catch((err) => {
      this.sleek.toggle();
      console.log(err);
    });
    this.ModalView.closeModal();
  }
  openBuyMasker = () => {
    this.ModalView.showModal();
  }
  saveRevisePrice = (favorable) => {
    const { orderInfo } = this.state;
    if (parseFloat(favorable) > parseFloat(orderInfo.amount)) {
      Toast.show('优惠金额不能大于商品总价');
      return;
    }
    this.setState({
      favorable,
      revisePrice: orderInfo.amount - favorable,
    });
  }
}
Base.propTypes = {
  navigation: PropTypes.object,
};
export default Base;
