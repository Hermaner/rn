import React from 'react';
import Toast from 'react-native-simple-toast';
import PropTypes from 'prop-types';
import { UpdateMemberInfoService } from '../../api';

class Base extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      confirmPassword: '',
      password: '',
    };
  }
  getInit = () => {
    this.setState({ memberId: global.memberId }, this._onRefresh);
  }
  reviseUserInfo = () => {
    const { memberId, password, confirmPassword } = this.state;
    if (!password) {
      Toast.show('请输入密码');
      return;
    }
    if (!confirmPassword) {
      Toast.show('请确认密码');
      return;
    }
    if (password !== confirmPassword) {
      Toast.show('两次密码不一致');
      return;
    }
    const member = {
      'memberId': memberId,
      'passWord': password,
    };
    this.sleek.toggle();
    UpdateMemberInfoService({
      member: JSON.stringify(member),
    }).then((res) => {
      this.sleek.toggle();
      if (res.isSuccess) {
        console.log(res);
      } else {
        Toast.show('温馨提示');
      }
    }).catch((err) => {
      this.toggleSleek();
      Toast.show(err);
    });
  }
}
Base.propTypes = {
  navigation: PropTypes.func,
};
export default Base;
