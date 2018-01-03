import React from 'react';
import { Alert } from 'react-native';

class Base extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selected1: '',
      selected2: '',
      userName: '',
      userCredentials: '',
    };
  }
  saveUserName = (value) => {
    this.setState({
      userName: value,
    });
    console.log(this.state.userName)
  }
  saveUserCredentials = (value) => {
    this.setState({
      userCredentials: value,
    });
  }
  chooseBank = (value) => {
    this.setState({
      selected1: value,
    });
  }
  choosePlace = (value) => {
    this.setState({
      selected2: value,
    });
  }
  submit = () => {
    const { userName, userCredentials } = this.state;
    const reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
    if (!reg.test(userCredentials)) {
      Alert.alert(
        '提交失败',
        '身份证号格式不正确',
      );
    }
    if (userName === '' || userCredentials === '') {
      Alert.alert(
        '提交失败',
        '请填写姓名和身份证号',
      );
    }
  }
}
export default Base;
