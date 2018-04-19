import React from 'react';
import { DeviceEventEmitter, Alert, Clipboard } from 'react-native';
import Toast from 'react-native-simple-toast';
import PropTypes from 'prop-types';
import {
  UpdateOrderService,
  DeleteOrderService,
  GetDeliverOrderService,
  WeiXinRefundService,
  AliRefundService,
ConfirmRefundOrder,
GetOrderInfoService,
GetRefundOrderService,
RefuseRefundOrder } from '../../api';

class Base extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      orderInfo: '',
      supplyInfo: '',
      getTime: null,
      refundItems: [],
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
      visible: false,
      transparent: true, // 是否透明显示
      checkMemo: '',
      statusInfo: [{
        title: '买家下单成功，等待卖家修改',
        lable: '买家已下单，请尽快修改优惠金额，运费及其他，可以通过电话，聊天与对方联系',
      }, {
        title: '卖家已修改，等待买家确认支付',
        lable: '请等待买家确认付款',
      }, {
        title: '买家已确认卖家修改信息',
        lable: '请等待买家付款',
      }, {
        title: '买家已支付，等待卖家发货',
        lable: '买家已支付，请尽快发货',
      }, {
        title: '卖家已发货，等待买家收货',
        lable: '等待买家收货',
      }],
    };
  }
  getInit = () => {
    const { orderId, supplyInfo, type } = this.props.navigation.state.params;
    this.setState({
      orderId,
      supplyInfo,
      type,
    }, () => {
      this.getWuLiuData();
      this.GetOrderInfoService();
      this.GetRefundOrderService();
    });
    this.reloadDetail = DeviceEventEmitter.addListener('reloadDetail', () => {
      this.GetOrderInfoService();
      this.GetRefundOrderService();
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
      if (res.isSuccess) {
        this.sleek.toggle();
        const orderInfo = res.data;
        console.log(orderInfo);
        let getTime = null;
        if (orderInfo.sendTime) {
          let dateTemp = orderInfo.sendTime.substr(0, 10);
          const days = 10;
          dateTemp = dateTemp.split('-');
          const nDate = new Date(`${dateTemp[1]}/${dateTemp[2]}/${dateTemp[0]}`);
          const millSeconds = Math.abs(nDate) + (days * 24 * 60 * 60 * 1000);
          const rDate = new Date(millSeconds);
          const year = rDate.getFullYear();
          let month = rDate.getMonth() + 1;
          if (month < 10) month = `0${month}`;
          let date = rDate.getDate();
          if (date < 10) date = `0${date}`;
          const str = orderInfo.modiDate.substr(10);
          getTime = `${year}/${month}/${date} ${str}`;
        }
        this.setState({
          getTime,
          orderInfo,
          favorable: orderInfo.discount || '',
          freight: orderInfo.freight || '',
        });
      } else {
        // Toast.show(res.msg);
      }
    }).catch(() => {
      this.sleek.toggle();
    });
  }
  GetRefundOrderService = () => {
    const { orderId } = this.state;
    GetRefundOrderService({
      orderId,
    }).then((res) => {
      if (res.isSuccess) {
        this.setState({
          refundItems: res.data,
        });
      }
    }).catch(() => {
    });
  }
  saveLabel = (checkMemo) => {
    this.setState({
      checkMemo,
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
  goChat = () => {
    const { orderInfo } = this.state;
    if (!global.memberId) {
      this.props.push({ key: 'User' });
      return;
    }
    if (orderInfo.memberId.toString() === global.memberId.toString()) {
      Toast.show('无法跟自己聊天');
      return;
    }
    this.props.push({ key: 'ChatRoom',
      params: {
        item: {
          memberId: orderInfo.memberId,
          userName: orderInfo.nickName,
          imgUrl: orderInfo.imgUrl,
        },
      },
    });
  }
  openModal = () => {
    this.setState({
      visible: true,
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
  RefuseRefundOrder = () => {
    const { orderInfo, checkMemo } = this.state;
    const { type } = this.props.navigation.state.params;
    if (!checkMemo) {
      Toast.show('请输入拒绝原因！');
      return;
    }
    this.sleek.toggle();
    this.setState({
      visible: false,
    });
    RefuseRefundOrder({
      memberId: global.memberId,
      refundOrderId: orderInfo.refundOrder.refundOrderId,
      checkMemo,
    }).then((res) => {
      this.sleek.toggle();
      if (res.isSuccess) {
        Toast.show('已成功拒绝申请！');
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
  ConfirmRefundOrder = () => {
    const { orderInfo } = this.state;
    const { type } = this.props.navigation.state.params;
    Alert.alert(
      '温馨提示', '确认同意退货退款申请？',
      [
        { text: '取消', onPress: () => {} },
        { text: '确认',
          onPress: () => {
            this.sleek.toggle();
            ConfirmRefundOrder({
              memberId: global.memberId,
              refundOrderId: orderInfo.refundOrder.refundOrderId,
            }).then((res) => {
              this.sleek.toggle();
              if (res.isSuccess) {
                Toast.show('已同意退货退款申请！');
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
  returnMoneyOk = () => {
    const { orderInfo } = this.state;
    Alert.alert(
      '温馨提示', '确认同意退款？',
      [
        { text: '取消', onPress: () => {} },
        { text: '确认',
          onPress: () => {
            if (orderInfo.payTypeId === '1') {
              this.weixinReturnMoney();
              return;
            }
            if (orderInfo.payTypeId === '2') {
              this.zhifubaoReturnMoney();
            }
          } },
      ],
    );
  }
  weixinReturnMoney = () => {
    const { orderInfo } = this.state;
    const { type } = this.props.navigation.state.params;
    this.sleek.toggle();
    WeiXinRefundService({
      refundOrderId: orderInfo.refundOrder.refundOrderId,
    }).then((res) => {
      this.sleek.toggle();
      if (res.isSuccess) {
        Toast.show('退款成功！');
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
  zhifubaoReturnMoney = () => {
    const { orderInfo } = this.state;
    const { type } = this.props.navigation.state.params;
    this.sleek.toggle();
    AliRefundService({
      refundOrderId: orderInfo.refundOrder.refundOrderId,
    }).then((res) => {
      this.sleek.toggle();
      if (res.isSuccess) {
        Toast.show('退款成功！');
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
  reviseOrder = () => {
    const { favorable, orderInfo, type, freight } = this.state;
    const reg = /(^[1-9]\d*(\.\d{1,2})?$)|(^0(\.\d{1,2})?$)/;
    if (!reg.test(favorable) && favorable !== '') {
      Toast.show('优惠格式错误');
      return;
    }
    if (!reg.test(freight) && freight !== '') {
      Toast.show('运费格式错误');
      return;
    }
    const newAllMoney = (parseFloat(orderInfo.unitPrice * orderInfo.buyCount)
    - parseFloat(favorable || 0)) + parseFloat(freight || 0);
    this.setState({
      revisePrice: newAllMoney,
    });
    this.sleek.toggle();
    UpdateOrderService({
      memberId: global.memberId,
      orderId: orderInfo.orderId,
      freight: freight || '0',
      discount: favorable || '0',
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
    if (parseFloat(favorable) > parseFloat(orderInfo.unitPrice * orderInfo.buyCount)) {
      this.setState({
        favorable: orderInfo.discount || '',
      });
      Toast.show('优惠金额不能大于商品总价');
      return;
    }
    this.setState({
      favorable,
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
  push: PropTypes.func,
};
export default Base;
