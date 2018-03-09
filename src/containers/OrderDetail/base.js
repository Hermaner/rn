import React from 'react';
import Toast from 'react-native-simple-toast';
import PropTypes from 'prop-types';
import { Alert } from 'react-native';
import Communications from 'react-native-communications';
import { GetOrderInfoService, UpdateOrderStatusService, CreateDifferenceOrderService, CreateRefundOrderService, SuccessOrderStatusService } from '../../api';

class Base extends React.Component {
  constructor(props) {
    super(props);
    const { orderId } = this.props.navigation.state.params;
    this.state = {
      item: null,
      orderId,
      memo: '',
      masterImage: [],
      textList: [],
      telhref: '',
      masterInfo: null,
      modalShow: false,
      showDiff: false,
      showRefund: false,
    };
  }
  getInit = () => {
    this.GetOrderInfoService();
  }
  GetOrderInfoService = () => {
    this.sleek.toggle();
    const { orderId } = this.state;
    GetOrderInfoService({
      orderId,
    }).then((res) => {
      console.log(res);
      this.sleek.toggle();
      if (res.isSuccess) {
        const str = res.data.orderItems[0].masterOrderItemLogStr;
        let memo = '';
        let masterImage = [];
        let textList = [];
        let telhref = '';
        if (str && str.indexOf('$images') > -1) {
          textList = str.split('$images:')[0].split('$');
          masterImage = str.split('$images:')[1].split('$memo')[0].split(',');
          memo = str.split('$images:')[1].split('$memo')[1].substr(1);
        }
        const masterInfo = res.data.orderItems[0].masterInfo;
        telhref = masterInfo ? `${masterInfo.phone}` : '';
        this.setState({
          item: res.data,
          textList,
          masterInfo,
          masterImage,
          memo,
          telhref,
        });
      } else {
        Toast.show(res.msg);
      }
    }).catch((err) => {
      this.sleek.toggle();
      console.log(err);
    });
  }
  goPay = () => {
    const { item: { orderNumber, orderId, amount } } = this.state;
    this.props.push({ key: 'CreatePay', params: { orderNumber, orderId, amount, type: 3 } });
  }
  diffOrder = () => {
    this.setState({
      modalShow: true,
      showDiff: true,
      showRefund: false,
    });
  }
  closeModel = () => {
    this.setState({
      modalShow: false,
    });
  }
  showRefund = () => {
    this.setState({
      modalShow: true,
      showDiff: false,
      showRefund: true,
    });
  }
  saveModel = () => {
    const { showRefund } = this.state;
    if (showRefund) {
      this.refundOrder();
    } else {
      this.CreateDifferenceOrderService();
    }
  }
  CancelOrder = () => {
    Alert.alert(
      '温馨提示', '取消订单？',
      [
        { text: '取消', onPress: () => {} },
        { text: '确认', onPress: () => this.UpdateOrderStatusService(7) },
      ],
    );
  }
  UpdateOrderStatusService = (status) => {
    this.sleek.toggle();
    const { orderId } = this.state;
    UpdateOrderStatusService({
      orderId,
      status,
    }).then((res) => {
      console.log(res);
      this.sleek.toggle();
      if (res.isSuccess) {
        let msg = '';
        switch (status) {
          case 4:
            msg = '服务完成';
            break;
          case 5:
            msg = '评价成功';
            break;
          case 7:
            msg = '取消成功';
            break;
          default:
        }
        Toast.show(msg);
        this.GetOrderInfoService();
      } else {
        Toast.show(res.msg);
      }
    }).catch((err) => {
      this.sleek.toggle();
      console.log(err);
    });
  }
  CreateDifferenceOrderService = () => {
    const { orderId, diffPrice, diffDetail } = this.state;
    if (!diffPrice) {
      Toast.show('请输入差价金额');
      return;
    }
    const reg = /(^[1-9]\d*(\.\d{1,2})?$)|(^0(\.\d{1,2})?$)/;
    if (!reg.test(diffPrice)) {
      Toast.show('金额格式错误');
      return;
    }
    this.closeModel();
    this.sleek.toggle();
    CreateDifferenceOrderService({
      orderId,
      price: diffPrice,
      detail: diffDetail,
      imgUrls: '',
    }).then((res) => {
      console.log(res);
      this.sleek.toggle();
      if (res.isSuccess) {
        this.props.push({ key: 'CreatePay',
          params: {
            orderNumber: res.data.orderNumber,
            orderId: res.data.orderId,
            amount: diffPrice,
            type: 4,
          } });
      } else {
        Toast.show(res.msg);
      }
    }).catch((err) => {
      this.sleek.toggle();
      console.log(err);
    });
  }
  refundOrder = () => {
    const { orderId, refundMessage } = this.state;
    if (!refundMessage) {
      Toast.show('请输入退款原因');
      return;
    }
    this.sleek.toggle();
    CreateRefundOrderService({
      orderId,
      message: refundMessage,
    }).then((res) => {
      console.log(res);
      this.sleek.toggle();
      if (res.isSuccess) {
        Toast.show('退款申请成功，请耐心等待');
        this.closeModel();
      } else {
        Toast.show(res.msg);
      }
    }).catch((err) => {
      this.sleek.toggle();
      console.log(err);
    });
  }
  SuccessOrderStatusService = () => {
    this.sleek.toggle();
    const { orderId } = this.state;
    SuccessOrderStatusService({
      orderId,
    }).then((res) => {
      console.log(res);
      this.sleek.toggle();
      if (res.isSuccess) {
        Toast.show('服务成功');
        this.GetOrderInfoService();
      } else {
        Toast.show(res.msg);
      }
    }).catch((err) => {
      this.sleek.toggle();
      console.log(err);
    });
  }
  call = () => {
    const { telhref } = this.state;
    if (!telhref) {
      return;
    }
    Communications.phonecall(telhref, false);
  }
}
Base.propTypes = {
  push: PropTypes.func,
  navigation: PropTypes.object,
};
export default Base;
