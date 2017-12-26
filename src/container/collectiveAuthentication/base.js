import React from 'react';
import * as WeChat from 'react-native-wechat';
import Alipay from 'react-native-yunpeng-alipay';
import { Alert } from 'react-native';

class CollectiveAuthenticationBase extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selected1: '',
      selected2: '',
      businessName: '',
      representative: '',
      creditCode: '',
    };
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
  saveBusinessName = (value) => {
    this.setState({
      businessName: value,
    });
  }
  saveRepresentative = (value) => {
    this.setState({
      representative: value,
    });
  }
  saveCreditCode = (value) => {
    this.setState({
      creditCode: value,
    });
  }
  submit = () => {
    const { businessName, representative, creditCode } = this.state;
    const patrn = /^[0-9A-Z]+$/;
    if (businessName === '') {
      Alert.alert(
        '提交失败',
        '请填写企业名称',
      );
    }
    if (representative === '') {
      Alert.alert(
        '提交失败',
        '请填写法人代表',
      );
    }
    if (creditCode === '') {
      Alert.alert(
        '提交失败',
        '请填写统一社会信用代码',
      );
    }
    if ((creditCode.length !== 18) || (patrn.test(creditCode) === false)) {
      Alert.alert(
        '提交失败',
        '统一社会信用代码填写有误',
      );
    }
  }
}
export default CollectiveAuthenticationBase;
