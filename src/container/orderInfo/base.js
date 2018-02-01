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
    };
  }
  getInit = () => {
    const { orderInfo, supplyInfo } = this.props.navigation.state.params;
    this.setState({
      orderInfo,
      supplyInfo,
    });
    console.log('///////////////', supplyInfo);
  }
  removeOrder = () => {
    this.sleek.toggle();
    const { amount, status, orderInfo, supplyInfo } = this.state;
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
}
Base.propTypes = {
  navigation: PropTypes.object,
};
export default Base;
