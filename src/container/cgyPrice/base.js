import React from 'react';
import Toast from 'react-native-simple-toast';
import { DeviceEventEmitter } from 'react-native';
import PropTypes from 'prop-types';

class Base extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      wholesalePrice: '',
      wholesaleCount: '',
      optionType: '斤',
      options: [{ value: '斤', label: '斤' },
      { value: '公斤', label: '公斤' },
      { value: '吨', label: '吨' },
      { value: '箱', label: '箱' }],
    };
  }
  saveData = () => {
    const {
      wholesalePrice,
      wholesaleCount,
      optionType,
    } = this.state;
    const reg = /^[1-9]*[1-9][0-9]*$/;
    if (!reg.test(wholesalePrice)) {
      Toast.show('需求量输入错误');
      return;
    }
    if (!reg.test(wholesalePrice)) {
      Toast.show('需求量输入错误');
      return;
    }
    if (!reg.test(wholesaleCount)) {
      Toast.show('需求量输入错误');
      return;
    }
    const data = {
      wholesalePrice,
      wholesaleCount,
      optionType,
    };
    DeviceEventEmitter.emit('getCgyPrice', data);
    this.props.pop();
  }
}
Base.propTypes = {
  pop: PropTypes.func,
};
export default Base;
