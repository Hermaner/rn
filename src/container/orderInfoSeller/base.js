import React from 'react';
import { DeviceEventEmitter, Alert } from 'react-native';
import Toast from 'react-native-simple-toast';
import PropTypes from 'prop-types';
import { UpdateOrderService, DeleteOrderService, GetDeliverOrderService } from '../../api';

class Base extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      orderInfo: '',
      supplyInfo: '',
      tu: require('../../assets/img/no.png'),
      amount: '',
      status: '',
      myStatus: '', // 页面当前订单状态
      removeInfo: '',
      favorable: '', // 优惠价格
      revisePrice: '', // 减去优惠金额后的总价
      type: '',
      freight: '', // 运费
      LOGInfo: '', // 快递信息
    };
  }
  getInit = () => {
    const { orderInfo, supplyInfo, type } = this.props.navigation.state.params;
    this.setState({
      orderInfo,
      supplyInfo,
      favorable: orderInfo.discount || '',
      freight: orderInfo.freight || '',
      type,
    }, this.getWuLiuData);
  }
  getWuLiuData = () => {
    const { orderInfo } = this.state;
    GetDeliverOrderService({
      orderId: orderInfo.orderId,
    }).then((res) => {
      if (res.isSuccess) {
        const result = res.data;
        this.setState({
          LOGInfo: result,
        });
      } else {
        Toast.show(res.msg);
      }
    }).catch(() => {
    });
  }
  removeOrder = () => {
    this.sleek.toggle();
    const { amount, orderInfo, type } = this.state;
    const status = '6';
    UpdateOrderService({
      memberId: global.memberId,
      orderId: orderInfo.orderId,
      amount,
      status,
    }).then((res) => {
      this.sleek.toggle();
      if (res.isSuccess) {
        DeviceEventEmitter.emit(type);
        DeviceEventEmitter.emit('getSoldGoodsCount');
        this.props.pop();
      } else {
        Toast.show(res.msg);
      }
    }).catch(() => {
      this.sleek.toggle();
    });
  }
  deleteOrder = (orderId) => {
    const { type } = this.props.navigation.state.params;
    Alert.alert(
      '温馨提示', '确认取消订单？',
      [
        { text: '取消', onPress: () => {} },
        { text: '确认',
          onPress: () => {
            this.sleek.toggle();
            DeleteOrderService({
              memberId: global.memberId,
              orderId,
            }).then((res) => {
              this.sleek.toggle();
              if (res.isSuccess) {
                Toast.show('订单已删除！');
                DeviceEventEmitter.emit(type);
                DeviceEventEmitter.emit('getSoldGoodsCount');
                this.props.pop();
              } else {
                Toast.show(res.msg);
              }
            }).catch(() => {
              this.sleek.toggle();
            });
          } },
      ],
    );
  }
  reviseOrder = () => {
    const { favorable, orderInfo, type, freight } = this.state;
    const newAllMoney = (parseFloat(orderInfo.unitPrice * orderInfo.buyCount)
    - parseFloat(favorable)) + parseFloat(freight);
    this.setState({
      revisePrice: newAllMoney,
    });
    this.sleek.toggle();
    UpdateOrderService({
      memberId: global.memberId,
      orderId: orderInfo.orderId,
      freight,
      discount: favorable,
      amount: Math.round(parseFloat(newAllMoney) * 1000) / 1000,
      status: '2',
    }).then((res) => {
      this.sleek.toggle();
      if (res.isSuccess) {
        Toast.show('订单金额已修改！');
        DeviceEventEmitter.emit(type);
        DeviceEventEmitter.emit('getSoldGoodsCount');
        DeviceEventEmitter.emit('emitUser');
        this.props.pop();
      } else {
        Toast.show(res.msg);
      }
    }).catch(() => {
      this.sleek.toggle();
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
    });
  }
  saveFreight = (freight) => {
    if (parseFloat(freight) < 0) {
      Toast.show('运费不能为负数！');
      return;
    }
    this.setState({
      freight,
    });
  }
}
Base.propTypes = {
  navigation: PropTypes.object,
  pop: PropTypes.func,
};
export default Base;
