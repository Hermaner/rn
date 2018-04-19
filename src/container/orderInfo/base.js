import React from 'react';
import { DeviceEventEmitter, Alert, Clipboard } from 'react-native';
import Toast from 'react-native-simple-toast';
import PropTypes from 'prop-types';
import { UpdateOrderService, DeleteOrderService, GetDeliverOrderService, CreateRefundOrderService, CancelRefundOrder, GetOrderInfoService } from '../../api';

class Base extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      orderInfo: '',
      supplyInfo: '',
      emit: '',
      tu: require('../../assets/img/no.png'),
      amount: '',
      getTime: null,
      status: '6',
      myStatus: '', // 页面当前订单状态
      removeInfo: '',
      type: '',
      freight: 0, // 运费
      LOGInfo: '', // 快递信息
      visible: false,
      visible2: false,
      message: '',
      statusInfo: [{
        title: '买家下单成功，等待卖家修改',
        lable: '需要卖家修改运费，优惠等。您可以通过下方的‘聊生意’或‘打电话’，与之联系',
      }, {
        title: '卖家已修改，等待买家确认支付',
        lable: '请您在确认运费，优惠等信息后，进行支付',
      }, {
        title: '买家已确认卖家修改信息',
        lable: '请选择付款',
      }, {
        title: '买家已支付，等待卖家发货',
        lable: '需要卖家确认发货，您可以通过下方的‘聊生意’或‘打电话’，与之联系',
      }, {
        title: '卖家已发货，等待买家确认收货',
        lable: '请确保已收到货品，再进行"确认收货"操作。您确认收货，卖家才会收到货款',
      }],
    };
  }
  getInit = () => {
    const { emit, orderId, supplyInfo, type } = this.props.navigation.state.params;
    this.setState({
      orderId,
      supplyInfo,
      emit,
      type,
    }, () => {
      this.getWuLiuData();
      this.GetOrderInfoService();
    });
    this.reloadDetail = DeviceEventEmitter.addListener('reloadDetail', () => {
      this.GetOrderInfoService();
    });
  }
  getDelete = () => {
    this.reloadDetail.remove();
  }
  getWuLiuData = () => {
    const { orderId } = this.state;
    GetDeliverOrderService({
      orderId,
    }).then((res) => {
      if (res.isSuccess) {
        const result = res.data;
        this.setState({
          LOGInfo: result,
        });
      } else {
        // Toast.show(res.msg);
      }
    }).catch(() => {
    });
  }
  GetOrderInfoService = () => {
    const { orderId } = this.state;
    this.sleek.toggle();
    GetOrderInfoService({
      orderId,
    }).then((res) => {
      this.sleek.toggle();
      if (res.isSuccess) {
        const orderInfo = res.data;
        console.log(orderInfo);
        let getTime = null;
        if (orderInfo.sendTime) {
          let dateTemp = orderInfo.sendTime.substr(0, 10);
          const days = 10;
          dateTemp = dateTemp.split('-');
          const nDate = new Date(`${dateTemp[1]}-${dateTemp[2]}-${dateTemp[0]}`);
          const millSeconds = Math.abs(nDate) + (days * 24 * 60 * 60 * 1000);
          const rDate = new Date(millSeconds);
          const year = rDate.getFullYear();
          let month = rDate.getMonth() + 1;
          if (month < 10) month = `0${month}`;
          let date = rDate.getDate();
          if (date < 10) date = `0${date}`;
          const str = orderInfo.modiDate.substr(10);
          getTime = `${year}-${month}-${date} ${str}`;
        }
        this.setState({
          getTime,
          orderInfo,
        });
      } else {
        // Toast.show(res.msg);
      }
    }).catch(() => {
      this.sleek.toggle();
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
            }).catch(() => {
              this.sleek.toggle();
            });
          } },
      ],
    );
  }
  saveLabel = (message) => {
    this.setState({
      message,
    });
  }
  CancelRefundOrder = () => {
    const { orderInfo } = this.state;
    Alert.alert(
      '温馨提示', '确认取消退款？',
      [
        { text: '取消', onPress: () => {} },
        { text: '确认',
          onPress: () => {
            this.sleek.toggle();
            CancelRefundOrder({
              memberId: global.memberId,
              refundOrderId: orderInfo.refundOrder.refundOrderId,
            }).then((res) => {
              this.sleek.toggle();
              if (res.isSuccess) {
                Toast.show('取消退款成功！');
                DeviceEventEmitter.emit('getBuyGoodsCount');
                DeviceEventEmitter.emit('getMainListBuyGoods');
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
  goChat = () => {
    const { supplyInfo } = this.state;
    if (!global.memberId) {
      this.props.push({ key: 'User' });
      return;
    }
    if (supplyInfo.memberId.toString() === global.memberId.toString()) {
      Toast.show('无法跟自己聊天');
      return;
    }
    this.props.push({ key: 'ChatRoom',
      params: {
        item: {
          memberId: supplyInfo.memberId,
          userName: supplyInfo.nickName,
          imgUrl: supplyInfo.imgUrl,
        },
      },
    });
  }
  copyInfo = () => {
    const { orderInfo } = this.state;
    Toast.show('复制成功！');
    Clipboard.setString(
      `联系人:${orderInfo.receiveName}
      联系电话:${orderInfo.receivePhone} 联系地址:${orderInfo.receiveProvinceName}${orderInfo.receiveCityName}${orderInfo.receiveDistrictName}`);
  }
  copyOrderNumber = () => {
    const { orderInfo } = this.state;
    Toast.show('复制成功！');
    Clipboard.setString(
      `订单编号:${orderInfo.orderNumber}`,
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
            }).catch(() => {
              this.sleek.toggle();
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
    }).catch(() => {
      this.sleek.toggle();
    });
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
    const { orderId, type } = this.state;
    const status = '7';
    UpdateOrderService({
      memberId: global.memberId,
      orderId,
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
    }).catch(() => {
      this.sleek.toggle();
    });
  }
}
Base.propTypes = {
  navigation: PropTypes.object,
  pop: PropTypes.func,
  push: PropTypes.func,
  resetHome: PropTypes.func,
};
export default Base;
