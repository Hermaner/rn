import React from 'react';
import Toast from 'react-native-simple-toast';
import PropTypes from 'prop-types';
import { CreateDemandOrderBiddingService } from '../../api';

class Base extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      item: this.props.navigation.state.params.item,
      ModalOpen: false,
    };
  }
  getInit = () => {
  }
  CreateDemandOrderBiddingService = () => {
    const { item, price, message } = this.state;
    const reg = /(^[1-9]\d*(\.\d{1,2})?$)|(^0(\.\d{1,2})?$)/;
    if (!price) {
      Toast.show('请输入价格');
      return;
    }
    if (price.length > 0 && !reg.test(price)) {
      Toast.show('薪酬格式错误');
      return;
    }
    this.closeModal();
    this.sleek.toggle();
    CreateDemandOrderBiddingService({
      demandOrderId: item.demandOrderId,
      price,
      message,
      masterId: global.masterId,
    }).then((res) => {
      console.log(res);
      this.sleek.toggle();
      if (res.isSuccess) {
        Toast.show('发送申请成功，请耐心等待雇主操作');
      } else {
        Toast.show(res.msg);
      }
    }).catch((err) => {
      this.sleek.toggle();
      console.log(err);
    });
  }
  openModal = () => {
    this.setState({
      ModalOpen: true,
    });
  }
  closeModal = () => {
    this.setState({
      ModalOpen: false,
    });
  }
}
Base.propTypes = {
  navigation: PropTypes.object,
};
export default Base;
