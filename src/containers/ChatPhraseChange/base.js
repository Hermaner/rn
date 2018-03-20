import React from 'react';
import Toast from 'react-native-simple-toast';
import PropTypes from 'prop-types';
import { DeviceEventEmitter } from 'react-native';

class Base extends React.Component {
  constructor(props) {
    super(props);
    const { label, value, id } = this.props.navigation.state.params;
    console.log(label, value, id)
    this.state = {
      label,
      value,
      id,
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
    const { value, id } = this.state;
    if (!value.length) {
      Toast.show('请输入文字');
      return;
    }
    DeviceEventEmitter.emit('emitPhrase', { value, id });
    this.props.pop();
  }
}
Base.propTypes = {
  pop: PropTypes.func,
  navigation: PropTypes.object,
};
export default Base;
