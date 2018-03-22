import React from 'react';
import { DeviceEventEmitter } from 'react-native';
import Toast from 'react-native-simple-toast';
import PropTypes from 'prop-types';
import { UpdateOrderService, GetMemberSellOrderService, DeleteOrderService } from '../../api';

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
  getMainListSoldGoods = () => {
    this.getData();
  }
  getInit = () => {
    this.setState({ memberId: global.memberId || '' }, this.getData);
    this.EmitMainListSoldGoods = DeviceEventEmitter.addListener('getMainListSoldGoods', (data) => {
      this.getMainListBuyGoods(data);
    });
  }
  getDelete = () => {
    this.EmitMainListSoldGoods.remove();
  }
  getData = () => {
    const { memberId } = this.state;
    const { status } = this.props;
    this.sleek.toggle();
    GetMemberSellOrderService({
      memberId,
      status,
    }).then((res) => {
      this.sleek.toggle();
      if (res.isSuccess) {
        const result = res.data;
        if (result.length > 0) {
          for (let i = 0; i < result.length; i += 1) {
            if (result[i].status === '1') {
              result[i].statusName = '待修改';
            } else if (result[i].status === '2') {
              result[i].statusName = '待确认';
            } else if (result[i].status === '3') {
              result[i].statusName = '待支付';
            } else if (result[i].status === '4') {
              result[i].statusName = '待发货';
            } else if (result[i].status === '5') {
              result[i].statusName = '待收货';
            } else if (result[i].status === '6') {
              result[i].statusName = '退款中';
            } else if (result[i].status === '7') {
              result[i].statusName = '订单完成';
            } else {
              result[i].statusName = '订单取消';
            }
          }
        }
        this.setState({
          orderInfo: result,
          myStatus: status,
        });
      } else {
        Toast.show(res.msg);
      }
    }).catch((err) => {
      this.sleek.toggle();
      console.log(err);
    });
  }
  removeOrder = (supplyInfo) => {
    const { amount, status, orderInfo } = this.state;
    UpdateOrderService({
      memberId: supplyInfo.memberId,
      orderId: orderInfo.orderId,
      amount,
      status,
    }).then((res) => {
      if (res.isSuccess) {
        const result = res.data;
        console.log(result);
        this.setState({
          myStatus: result.status,
          removeInfo: result,
        });
      } else {
        Toast.show(res.msg);
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
        Toast.show(res.msg);
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
