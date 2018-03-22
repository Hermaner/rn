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
      emit: '',
      tu: require('../../assets/img/no.png'),
      amount: '',
      status: '6',
      myStatus: '', // 页面当前订单状态
      removeInfo: '',
      type: '',
      freight: 0, // 运费
      LOGInfo: '', // 快递信息
    };
  }
  getInit = () => {
    const { emit, orderInfo, supplyInfo, type } = this.props.navigation.state.params;
    this.setState({
      orderInfo,
      supplyInfo,
      emit,
      type,
    }, this.getWuLiuData);
  }
  getWuLiuData = () => {
    const { orderInfo } = this.state;
    GetDeliverOrderService({
      orderId: orderInfo.orderId,
    }).then((res) => {
      console.log(res);
      if (res.isSuccess) {
        const result = res.data;
        this.setState({
          LOGInfo: result,
        });
      } else {
        console.log(res.msg);
      }
    }).catch((err) => {
      console.log(err);
    });
  }
  removeOrder = () => { // 取消订单
    const { orderInfo, type } = this.state;
    const allMoney = parseFloat(orderInfo.amount);
    const status = '8';
    Alert.alert(
      '温馨提示', '确认取消订单？',
      [
        { text: '取消', onPress: () => {} },
        { text: '确认',
          onPress: () => {
            this.sleek.toggle();
            UpdateOrderService({
              memberId: global.memberId,
              orderId: orderInfo.orderId,
              amount: Math.round(parseFloat(allMoney) * 1000) / 1000,
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
                let emit;
                switch (type) {
                  case 'getMainListBuyGoods':
                    emit = 'getMainListBuyGoods';
                    break;
                  default:
                }
                DeviceEventEmitter.emit(emit);
                DeviceEventEmitter.emit('getBuyGoodsCount');
                DeviceEventEmitter.emit('emitUser');
                this.props.pop();
              } else {
                Toast.show(res.msg);
              }
            }).catch((err) => {
              this.sleek.toggle();
              console.log(err);
            });
          } },
      ],
    );
  }
  deleteOrder = (orderId) => {
    const { type } = this.props.navigation.state.params;
    Alert.alert(
      '温馨提示', '确认删除订单？',
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
                let emit;
                switch (type) {
                  case 'getMainListBuyGoods':
                    emit = 'getMainListBuyGoods';
                    break;
                  default:
                }
                DeviceEventEmitter.emit(emit);
                DeviceEventEmitter.emit('getBuyGoodsCount');
                DeviceEventEmitter.emit('emitUser');
                this.props.pop();
              } else {
                Toast.show(res.msg);
              }
            }).catch((err) => {
              this.sleek.toggle();
              console.log(err);
            });
          } },
      ],
    );
  }
  reviseOrder = () => { // 修改订单
    this.sleek.toggle();
    const { orderInfo } = this.state;
    const { type } = this.props.navigation.state.params;
    const allMoney = parseFloat(orderInfo.amount);
    let status = '';
    if (orderInfo.status === '2') {
      status = '3';
    } else if (orderInfo.status === '5') {
      status = '7';
    }
    UpdateOrderService({
      memberId: global.memberId,
      orderId: orderInfo.orderId,
      amount: Math.round(parseFloat(allMoney) * 1000) / 1000,
      status,
    }).then((res) => {
      this.sleek.toggle();
      if (res.isSuccess) {
        const result = res.data;
        this.setState({
          myStatus: result.status,
          removeInfo: result,
          orderInfo: result,
        });
        let emit;
        switch (type) {
          case 'getMainListBuyGoods':
            emit = 'getMainListBuyGoods';
            break;
          default:
        }
        DeviceEventEmitter.emit(emit);
        DeviceEventEmitter.emit('getBuyGoodsCount');
        DeviceEventEmitter.emit('emitUser');
        // this.props.pop();
      } else {
        Toast.show(res.msg);
      }
    }).catch((err) => {
      this.sleek.toggle();
      console.log(err);
    });
    this.ModalView.closeModal();
  }
  back = () => {
    const { emit } = this.state;
    if (emit === 'reset') {
      this.props.resetHome();
    } else {
      this.props.pop();
    }
  }
  orderOk = () => { // 收货成功
    this.sleek.toggle();
    const { orderInfo, type } = this.state;
    const status = '7';
    UpdateOrderService({
      memberId: global.memberId,
      orderId: orderInfo.orderId,
      status,
    }).then((res) => {
      this.sleek.toggle();
      if (res.isSuccess) {
        Toast.show('收货成功！');
        let emit;
        switch (type) {
          case 'getMainListBuyGoods':
            emit = 'getMainListBuyGoods';
            break;
          default:
        }
        DeviceEventEmitter.emit(emit);
        DeviceEventEmitter.emit('getBuyGoodsCount');
        DeviceEventEmitter.emit('emitUser');
        this.props.pop();
      } else {
        Toast.show(res.msg);
      }
    }).catch((err) => {
      this.sleek.toggle();
      console.log(err);
    });
    this.ModalView.closeModal();
  }
}
Base.propTypes = {
  navigation: PropTypes.object,
  pop: PropTypes.func,
  resetHome: PropTypes.func,
};
export default Base;
