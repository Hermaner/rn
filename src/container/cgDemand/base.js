import React from 'react';
import Toast from 'react-native-simple-toast';
import { DeviceEventEmitter } from 'react-native';
import PropTypes from 'prop-types';

class Base extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      frequency: [{
        label: '每日',
      }, {
        label: '每周',
      }, {
        label: '每月',
      }, {
        label: '不限',
      }],
      frIndex: null,
      wantStarPrice: '',
      wantEndPrice: '',
      demand: '',
      optionType: '斤',
      options: [{ value: '斤', label: '斤' },
      { value: '公斤', label: '公斤' },
      { value: '吨', label: '吨' },
      { value: '箱', label: '箱' }],
    };
  }
  tabFrBtn = (index) => {
    const { frequency, frIndex } = this.state;
    if (index === frIndex) {
      return;
    }
    if (frIndex !== null) {
      frequency[frIndex].cur = false;
    }
    frequency[index].cur = true;
    this.setState({
      frequency,
      frIndex: index,
    });
  }
  saveData = () => {
    const {
      demand,
      wantStarPrice,
      wantEndPrice,
      optionType,
      frIndex,
      frequency,
    } = this.state;
    const reg = /^[1-9]*[1-9][0-9]*$/;
    if (!reg.test(demand)) {
      Toast.show('需求量输入错误');
      return;
    }
    if (wantStarPrice && !reg.test(wantStarPrice)) {
      Toast.show('起始价输入错误');
      return;
    }
    if (wantEndPrice && !reg.test(wantEndPrice)) {
      Toast.show('结束价输入错误');
      return;
    }
    if (wantStarPrice && wantEndPrice && parseInt(wantStarPrice, 10) > parseInt(wantEndPrice, 10)) {
      Toast.show('起始价不能大于结束价');
      return;
    }
    const data = {
      demand,
      wantStarPrice,
      wantEndPrice,
      optionType,
      frequency: frIndex === null ? '' : frequency[frIndex].label,
    };
    DeviceEventEmitter.emit('getDemand', data);
    this.props.pop();
  }
}
Base.propTypes = {
  pop: PropTypes.func,
};
export default Base;
