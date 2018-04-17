import React from 'react';
import Toast from 'react-native-simple-toast';
import PropTypes from 'prop-types';
import { CreateRefundOrderService } from '../../api';

class Base extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOk: true,
      logisticsName: '',
      btnType: [{
        btnName: '仅退款',
        isChoose: false,
        type: '1',
      }, {
        btnName: '退货退款',
        isChoose: false,
        type: '2',
      }],
      message: '',
      orderInfo: '',
    };
  }
  getInit = () => {
    const { btnType } = this.state;
    const { orderInfo } = this.props.navigation.state.params;
    if (orderInfo.status === '5' || orderInfo.status === '6') {
      btnType[1].isChoose = true;
    }
    if (orderInfo.status === '4') {
      btnType[0].isChoose = true;
    }
    this.setState({
      orderInfo,
      status: orderInfo.status,
      btnType,
    });
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
};
export default Base;
