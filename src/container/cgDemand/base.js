import React from 'react';
import Toast from 'react-native-simple-toast';
import { DeviceEventEmitter } from 'react-native';
import PropTypes from 'prop-types';
import { GetUnitsService } from '../../api';

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
      optionType: '',
      options: [],
      selectShow: false,
      frequencyLabel: '',
    };
  }
  getInit = () => {
    if (this.props.navigation.state.params) {
      const {
        demand,
        unit,
        wantStarPrice,
        wantEndPrice,
        frequencyLabel,
      } = this.props.navigation.state.params;
      const { frequency } = this.state;
      this.setState({
        demand,
        unit,
        wantStarPrice,
        wantEndPrice,
        frequencyLabel,
        optionType: unit === '' ? '点击选择单位' : unit,
      });
      for (let i = 0; i < frequency.length; i += 1) {
        if (frequency[i].label === frequencyLabel) {
          frequency[i].cur = true;
          this.setState({
            frequency,
          });
        }
      }
    }
    this.getData();
  }
  getData = () => {
    const { options } = this.state;
    GetUnitsService({
    }).then((res) => {
      if (res.isSuccess) {
        if (res.data && res.data.length > 0) {
          for (let i = 0; i < res.data.length; i += 1) {
            options.push({
              value: res.data[i].name,
              label: res.data[i].name,
            });
          }
        } else {
          this.setState({
            options: [],
          });
        }
      } else {
        Toast.show(res.msg);
      }
    }).catch(() => {
    });
  }
  chooseType = () => {
    this.setState({
      selectShow: true,
    });
  }
  selectModel = (optionType) => {
    this.setState({
      selectShow: false,
      optionType,
    });
  }
  closeModal = () => {
    this.setState({
      selectShow: false,
    });
  }
  tabFrBtn = (index) => {
    const { frequency, frIndex } = this.state;
    for (let i = 0; i < frequency.length; i += 1) {
      frequency[i].cur = '';
    }
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
    if (optionType === '点击选择单位') {
      Toast.show('请选择单位');
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
  navigation: PropTypes.object,
};
export default Base;
