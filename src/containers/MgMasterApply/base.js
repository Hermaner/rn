import React from 'react';
import { DeviceEventEmitter } from 'react-native';
import Toast from 'react-native-simple-toast';
import PropTypes from 'prop-types';
import { GetMasterDemandOrderBiddingService, UpdateMasterDemandOrderBiddingService } from '../../api';

class Base extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: '',
      items: [],
      price: '',
      message: '',
      listIndex: '',
      ModalOpen: false,
      refresh: false,
      loading: true,
      nomore: false,
      noData: false,
    };
  }
  getInit = () => {
    this.GetMasterDemandOrderBiddingService();
    this.emitRefresh = DeviceEventEmitter.addListener('emitRefresh', () => {
      this.GetMasterDemandOrderBiddingService();
    });
  }
  deleteInit = () => {
    this.emitRefresh.remove();
  }
  changePrice = (listIndex) => {
    this.openModal();
    const { items } = this.state;
    this.setState({
      listIndex,
      price: items[listIndex].price.toString(),
      message: items[listIndex].message || '',
    });
  }
  GetMasterDemandOrderBiddingService = () => {
    GetMasterDemandOrderBiddingService().then((res) => {
      console.log(res);
      if (res.isSuccess) {
        const items = res.data;
        if (items.length === 0) {
          this.setState({
            noData: true,
          });
          return;
        }
        this.setState({
          items,
          loading: false,
        });
      } else {
        Toast.show(res.msg);
      }
    }).catch((err) => {
      console.log(err);
    });
  }
  UpdateMasterDemandOrderBiddingService = () => {
    const { items, listIndex, price, message } = this.state;
    this.sleek.toggle();
    UpdateMasterDemandOrderBiddingService({
      id: items[listIndex].id.toString(),
      price,
      message,
    }).then((res) => {
      this.sleek.toggle();
      console.log(res);
      if (res.isSuccess) {
        Toast.show('价格修改成功');
        this.closeModal();
        this.GetMasterDemandOrderBiddingService();
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
  push: PropTypes.func,
};
export default Base;
