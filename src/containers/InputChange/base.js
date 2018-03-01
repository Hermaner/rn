import React from 'react';
import Toast from 'react-native-simple-toast';
import PropTypes from 'prop-types';
import { DeviceEventEmitter } from 'react-native';
import { CreateOrderService, GetMemberAddressService, DeepClone } from '../../api';

class Base extends React.Component {
  constructor(props) {
    super(props);
    const { label, value } = this.props.navigation.state.params;
    this.state = {
      label,
      value,
    };
  }
  getInit = () => {
  }
  getImages = (upImages) => {
    console.log(upImages);
    this.setState({
      upImages,
    });
  }
  deleteInit = () => {
    this.emitAmout.remove();
  }
  save = () => {
    const { value, label } = this.state;
    if (label === '昵称' && (value.length < 2 || value.length > 8)) {
      Toast.show('长度2-8');
      return;
    }
    DeviceEventEmitter.emit('emitNick', value);
    this.props.pop();
  }
}
Base.propTypes = {
  pop: PropTypes.func,
  navigation: PropTypes.object,
};
export default Base;
