import React from 'react';
import { DeviceEventEmitter } from 'react-native';
import PropTypes from 'prop-types';
import { GetSupplyService, ValidateIsQuoteService } from '../../api';

class Base extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      memberId: '',
      tipShow: false,
      hasBjShow: false,
      hasBj: false,
      item: null,
    };
  }
  getCbjStatus = () => {
    this.setState({
      hasBjShow: true,
      tipShow: false,
    });
  }
  getInit = () => {
    global.storage.load({ key: 'userData' })
    .then(res => this.setState({ memberId: res.memberId }, this.ValidateIsQuoteService)).catch(() => {});
    const { item } = this.props.navigation.state.params;
    this.setState({
      item,
    });
    this.emitCbjStatus = DeviceEventEmitter.addListener('cbjStatus', () => {
      this.getCbjStatus();
    });
  }
  getDelInit = () => {
    this.emitCbjStatus.remove();
  }
  ValidateIsQuoteService = () => {
    this.sleek.toggle();
    const { memberId, item } = this.state;
    ValidateIsQuoteService({
      memberId,
      purchaseId: item.purchaseId,
    })
    .then((res) => {
      console.log(res);
      this.sleek.toggle();
      if (res.isSuccess) {
        this.setState({
          hasBjShow: res.data === '1',
          hasBj: res.data === '1',
          tipShow: res.data !== '1',
        });
      } else {
        global.Toast.show(res.msg);
      }
    }).catch((err) => {
      this.sleek.toggle();
      global.Toast.show(err);
    });
  }
  goCbjPage = () => {
    const { memberId, item } = this.state;
    this.sleek.toggle();
    GetSupplyService({
      memberId,
      type: '0',
      pageSize: '8',
      currentPage: '1',
    })
    .then((res) => {
      console.log(res);
      this.sleek.toggle();
      if (res.isSuccess) {
        const items = res.data.pageData;
        if (items.length === 0) {
          global.Toast.show('没有相关供应单');
        } else {
          this.props.push({ key: 'CbjConfirm', params: { items, purchaseId: item.purchaseId, unit: item.unit } });
        }
        this.setState({
          items,
        });
      } else {
        global.Toast.show(res.msg);
      }
    }).catch((err) => {
      this.sleek.toggle();
      global.Toast.show(err);
    });
  }
}
Base.propTypes = {
  navigation: PropTypes.object,
  push: PropTypes.func,
};
export default Base;
