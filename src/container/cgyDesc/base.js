import React from 'react';
import Toast from 'react-native-simple-toast';
import { DeviceEventEmitter } from 'react-native';
import PropTypes from 'prop-types';

class Base extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      memo: '',
    };
  }
  saveData = () => {
    const { memo } = this.state;
    if (memo.length < 8) {
      Toast.show('至少8个字的描述');
      return;
    }
    DeviceEventEmitter.emit('sendCfyMemo', memo);
    this.props.pop();
  }
}
Base.propTypes = {
  pop: PropTypes.func,
};
export default Base;
