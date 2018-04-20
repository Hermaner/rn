import React from 'react';
import Toast from 'react-native-simple-toast';
import { DeviceEventEmitter } from 'react-native';
import PropTypes from 'prop-types';
import { GetUnitsService } from '../../api';

class Base extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      wholesalePrice: '',
      wholesaleCount: '',
      optionType: '斤',
      options: [],
      selectShow: false,
    };
  }
  getDelete = () => {
    this.state = null;
  }
  getData = () => {
    const { options } = this.state;
    GetUnitsService({
    }).then((res) => {
      if (res.isSuccess) {
        // console.log(res);
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
  saveData = () => {
    const {
      wholesalePrice,
      wholesaleCount,
      optionType,
    } = this.state;
    const reg = /(^[1-9]\d*(\.\d{1,2})?$)|(^0(\.\d{1,2})?$)/;
    if (!reg.test(wholesalePrice)) {
      Toast.show('格式错误');
      return;
    }
    if (optionType === '点击选择单位') {
      Toast.show('请选择单位');
      return;
    }
    if (!reg.test(wholesaleCount)) {
      Toast.show('格式错误');
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
  chooseType = () => {
    this.setState({
      selectShow: true,
    });
  }
  closeModal = () => {
    this.setState({
      selectShow: false,
    });
  }
  selectModel = (optionType) => {
    this.setState({
      selectShow: false,
      optionType,
    });
  }
}
Base.propTypes = {
  pop: PropTypes.func,
};
export default Base;
