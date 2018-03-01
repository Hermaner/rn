import React from 'react';
import Toast from 'react-native-simple-toast';
import PropTypes from 'prop-types';
import { DeviceEventEmitter } from 'react-native';
import { UpdateMasterService, UpdateBmMarketService } from '../../api';

class Base extends React.Component {
  constructor(props) {
    super(props);
    const { detail, type } = this.props.navigation.state.params;
    this.state = {
      detail: detail || '',
      type,
    };
  }
  save = () => {
    const { detail, type } = this.state;
    if (detail.length < 10) {
      Toast.show('至少10个字的服务描述');
      return;
    }
    this.sleek.toggle();
    if (type === 1) {
      this.UpdateMasterService(detail);
    } else if (type === 2) {
      this.UpdateBmMarketService(detail);
    } else if (type === 3) {
      this.CreateDecorationCredentialsService(detail);
    }
  }
  UpdateMasterService = (detail) => {
    UpdateMasterService({
      masterId: global.masterId,
      detail,
    }).then((res) => {
      console.log(res);
      this.sleek.toggle();
      if (res.isSuccess) {
        Toast.show('保存成功');
        DeviceEventEmitter.emit('emitMasterLoad');
        this.props.pop();
      } else {
        Toast.show(res.msg);
      }
    }).catch((err) => {
      this.sleek.toggle();
      console.log(err);
    });
  }
  UpdateBmMarketService = (detail) => {
    UpdateBmMarketService({
      bmMarketId: global.bmMarketId.toString(),
      detail,
    }).then((res) => {
      console.log(res);
      this.sleek.toggle();
      if (res.isSuccess) {
        Toast.show('保存成功');
        DeviceEventEmitter.emit('emitMasterLoad');
        this.props.pop();
      } else {
        Toast.show(res.msg);
      }
    }).catch((err) => {
      this.sleek.toggle();
      console.log(err);
    });
  }
  UpdateMasterService = (detail) => {
    UpdateMasterService({
      masterId: global.masterId,
      detail,
    }).then((res) => {
      console.log(res);
      this.sleek.toggle();
      if (res.isSuccess) {
        Toast.show('保存成功');
        DeviceEventEmitter.emit('emitMasterLoad');
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
  navigation: PropTypes.navigation,
};
export default Base;
