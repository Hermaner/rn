import React from 'react';
import * as WeChat from 'react-native-wechat';
import Alipay from 'react-native-yunpeng-alipay';
import { Alert } from 'react-native';

class AddPersonalAccountBase extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      number: '',
    };
  }
  saveName = (value) => {
    this.setState({
      name: value,
    });
  }
  saveNumber = (value) => {
    this.setState({
      number: value,
    });
  }
  submitBtn = () => {
    const { name, number } = this.state;
    const reg = /^\d{19}$/g;
    if (name === '') {
      Alert.alert(
        '提交失败',
        '请输入账号名',
      );
    }
    if (number === '') {
      Alert.alert(
        '提交失败',
        '请输入卡号',
      );
    }
    if (!reg.test(number)) {
      Alert.alert(
        '提交失败',
        '格式错误，应该是19位数字',
      );
    }
  }
}
export default AddPersonalAccountBase;
