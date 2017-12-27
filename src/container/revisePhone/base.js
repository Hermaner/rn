import React from 'react';
import * as WeChat from 'react-native-wechat';
import Alipay from 'react-native-yunpeng-alipay';

class RevisePhoneBase extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      phone: '',
    };
  }
  savePhone = (value) => {
    this.setState({
      phone: value,
    });
  }
}
export default RevisePhoneBase;
