import React from 'react';
import { DeviceEventEmitter } from 'react-native';
import Toast from 'react-native-simple-toast';
import PropTypes from 'prop-types';
import { GetSupplyService, ValidateIsQuoteService, GetPurchaseInfoService } from '../../api';

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
    const { item, purchaseId } = this.props.navigation.state.params;
    this.setState({
      memberId: global.memberId || '',
      item,
      purchaseId,
    }, this.getData);
    this.emitCbjStatus = DeviceEventEmitter.addListener('cbjStatus', () => {
      this.getCbjStatus();
    });
  }
  getDelInit = () => {
    this.emitCbjStatus.remove();
  }
  getData = () => {
    this.sleek.toggle();
    const { memberId, purchaseId } = this.state;
    GetPurchaseInfoService({
      memberId,
      purchaseId,
    }).then((res) => {
      console.log(res);
      if (res.isSuccess) {
        const result = res.data;
        DeviceEventEmitter.emit('emitUser');
        this.setState({
          item: result,
        });
      } else {
        Toast.show(res.msg);
      }
    }).catch(() => {
      this.sleek.toggle();
    });

    ValidateIsQuoteService({
      memberId,
      purchaseId,
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
      global.console.log(err);
    });
  }
  goCbjPage = () => {
    const { memberId, item, purchaseId } = this.state;
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
          global.Toast.show('发布同类货品后即可报价');
        } else {
          this.props.push({ key: 'CbjConfirm', params: { items, purchaseId, unit: item.unit } });
        }
        this.setState({
          items,
        });
      } else {
        global.Toast.show(res.msg);
      }
    }).catch((err) => {
      this.sleek.toggle();
      global.console.log(err);
    });
  }
}
Base.propTypes = {
  navigation: PropTypes.object,
  push: PropTypes.func,
};
export default Base;
