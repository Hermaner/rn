import React from 'react';
import Toast from 'react-native-simple-toast';
import PropTypes from 'prop-types';
import { UpdateOrderService, GetMemberBuyOrderService, DeleteOrderService } from '../../api';

class Base extends React.Component {
  constructor(props) {
    super(props);
    this.isSend = false;
    this.state = {
      memberId: '',
      tu: require('../../assets/img/no.png'),
      myStatus: '',
    };
  }
  getInit = () => {
    this.setState({ memberId: global.memberId || '' }, this.getData);
  }
  getData = () => {
    const { memberId } = this.state;
    const { status } = this.props;
    console.log('ooooooooiiiiiiiiiii', status);
    this.sleek.toggle();
    GetMemberBuyOrderService({
      memberId,
      status,
    }).then((res) => {
      this.sleek.toggle();
      if (res.isSuccess) {
        const result = res.data;
        console.log('2222222222222222222222', result);
        for (let i = 0; i < result.length; i += 1) {
          if (result[i].status === '1') {
            result[i].statusName = '待确认';
          } else if (result[i].status === '2') {
            result[i].statusName = '待支付';
          } else if (result[i].status === '3') {
            result[i].statusName = '待收货';
          } else if (result[i].status === '4') {
            result[i].statusName = '订单完成';
          } else if (result[i].status === '5') {
            result[i].statusName = '已退款';
          } else {
            result[i].statusName = '订单取消';
          }
        }
        this.setState({
          orderInfo: result,
          myStatus: status,
        });
      } else {
        Toast.show('温馨提示');
      }
    }).catch((err) => {
      this.sleek.toggle();
      console.log(err);
    });
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
        console.log(result);
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
  deleteOrder = (orderId) => {
    this.sleek.toggle();
    const { memberId } = this.state;
    DeleteOrderService({
      memberId,
      orderId,
    }).then((res) => {
      this.sleek.toggle();
      if (res.isSuccess) {
        Toast.show('订单已删除！');
        this.getData();
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
  status: PropTypes.string,
};
export default Base;
