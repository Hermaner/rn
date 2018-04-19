import React from 'react';
import Toast from 'react-native-simple-toast';
import { DeviceEventEmitter } from 'react-native';
import PropTypes from 'prop-types';
import { CreateRefundOrderService } from '../../api';

class Base extends React.Component {
  constructor(props) {
    super(props);
    const { orderInfo } = this.props.navigation.state.params;
    this.state = {
      isOk: true,
      orderInfo,
      logisticsName: '',
      btnType: [{
        btnName: '仅退款',
        type: '1',
        isChoose: orderInfo.status === '4',
      }, {
        btnName: '退货退款',
        isChoose: orderInfo.status === '5' || orderInfo.status === '6' || orderInfo.status === '7',
        type: '2',
      }],
      message: '',
      status: orderInfo.status,
    };
  }
  getInit = () => {
  }
  chooseOne = (index) => {
    const { btnType } = this.state;
    for (let i = 0; i < btnType.length; i += 1) {
      if (btnType[i].isChoose) {
        btnType[i].isChoose = false;
        this.setState({
          btnType,
        });
      }
    }
    btnType[index].isChoose = !btnType[index].isChoose;
    this.setState({
      btnType,
      type: index === 0 ? '1' : '2',
    });
  }
  saveLabel = (message) => {
    this.setState({
      message,
    });
  }
  returnMoneyService = () => {
    const { message, orderInfo, btnType } = this.state;
    let type = '';
    if (!message) {
      Toast.show('请输入申请理由！');
      return;
    }
    for (let i = 0; i < btnType.length; i += 1) {
      if (btnType[i].isChoose) {
        type = btnType[i].type;
      }
    }
    this.sleek.toggle();
    CreateRefundOrderService({
      orderId: orderInfo.orderId,
      message,
      type,
    }).then((res) => {
      this.sleek.toggle();
      if (res.isSuccess) {
        this.setState({ visible: false }, Toast.show('申请退款消息已发送！'));
        DeviceEventEmitter.emit('getBuyGoodsCount');
        DeviceEventEmitter.emit('getMainListBuyGoods');
        DeviceEventEmitter.emit('reloadDetail');
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
};
export default Base;
