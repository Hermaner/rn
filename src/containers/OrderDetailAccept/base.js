import React from 'react';
import Toast from 'react-native-simple-toast';
import PropTypes from 'prop-types';
import { Alert, DeviceEventEmitter } from 'react-native';
import { GetWaitMasterOrderInfoService, UpdateMasterOrderItemService } from '../../api';

class Base extends React.Component {
  constructor(props) {
    super(props);
    const { masterOrderId } = this.props.navigation.state.params;
    this.state = {
      masterOrderId,
      info: null,
    };
  }
  getInit = () => {
    this.GetWaitMasterOrderInfoService();
  }
  GetWaitMasterOrderInfoService = () => {
    const { masterOrderId } = this.state;
    this.sleek.toggle();
    GetWaitMasterOrderInfoService({
      masterOrderId,
    }).then((res) => {
      console.log(res);
      this.sleek.toggle();
      if (res.isSuccess) {
        const info = res.data;
        this.setState({
          info,
        });
      } else {
        Toast.show(res.msg);
      }
    }).catch((err) => {
      this.sleek.toggle();
      console.log(err);
    });
  }
  save = () => {
    Alert.alert(
      '温馨提示', '确认订单？',
      [
        { text: '取消', onPress: () => {} },
        { text: '确认', onPress: this.UpdateMasterOrderItemService },
      ],
    );
  }
  UpdateMasterOrderItemService = () => {
    const { masterOrderId, info } = this.state;
    this.sleek.toggle();
    UpdateMasterOrderItemService({
      masterOrderItemIds: info.masterOrderItems.map(item => item.masterOrderItemId).join(','),
      masterOrderId,
      masterId: global.masterId,
      status: 2,
    }).then((res) => {
      console.log(res);
      this.sleek.toggle();
      if (res.isSuccess) {
        Toast.show('接单成功');
        DeviceEventEmitter.emit('emitReloadAccept');
        this.props.pop();
      } else {
        Toast.show(res.msg);
      }
    }).catch((err) => {
      this.sleek.toggle();
      console.log(err);
    });
  }
}
Base.propTypes = {
  pop: PropTypes.func,
  navigation: PropTypes.object,
};
export default Base;
