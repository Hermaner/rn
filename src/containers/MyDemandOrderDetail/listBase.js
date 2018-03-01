import React from 'react';
import Toast from 'react-native-simple-toast';
import PropTypes from 'prop-types';
import { Alert } from 'react-native';
import { GetDemandOrderBiddingService, PayDemandOrderService, DeleteDemandOrderService } from '../../api';

class Base extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      demandOrderId: props.demandOrderId,
    };
  }
  getInit = () => {
    this.GetDemandOrderBiddingService();
  }
  cancelOrder = () => {
    Alert.alert(
      '温馨提示', '取消该订单？',
      [
        { text: '取消', onPress: () => {} },
        { text: '确认', onPress: this.DeleteDemandOrderService },
      ],
    );
  }
  DeleteDemandOrderService = () => {
    this.sleek.toggle();
    const { demandOrderId } = this.state;
    DeleteDemandOrderService({
      demandOrderId,
    }).then((res) => {
      console.log(res);
      this.sleek.toggle();
      if (res.isSuccess) {
        Toast.show('取消成功');
        this.props.pop();
      } else {
        Toast.show(res.msg);
      }
    }).catch((err) => {
      this.sleek.toggle();
      console.log(err);
    });
  }
  PayDemandOrderService = (list) => {
    this.sleek.toggle();
    const { demandOrderId } = this.state;
    PayDemandOrderService({
      demandOrderId,
      demandOrderBiddingId: list.id,
    }).then((res) => {
      console.log(res);
      this.sleek.toggle();
      if (res.isSuccess) {
        this.props.push({ key: 'CreatePay',
          params: {
            orderNumber: res.data.orderNumber,
            orderId: res.data.orderId,
            amount: list.price,
            type: 2,
          } });
      } else {
        Toast.show(res.msg);
      }
    }).catch((err) => {
      this.sleek.toggle();
      console.log(err);
    });
  }
  GetDemandOrderBiddingService = () => {
    this.sleek.toggle();
    const { demandOrderId } = this.state;
    GetDemandOrderBiddingService({
      demandOrderId,
    }).then((res) => {
      console.log(res);
      this.sleek.toggle();
      if (res.isSuccess) {
        this.setState({
          items: res.data,
        });
      } else {
        Toast.show(res.msg);
      }
    }).catch((err) => {
      this.sleek.toggle();
      console.log(err);
    });
  }
  closeModal = () => {
    this.setState({
      ModalOpen: false,
    });
  }
}
Base.propTypes = {
  push: PropTypes.func,
  pop: PropTypes.func,
  demandOrderId: PropTypes.string,
};
export default Base;
