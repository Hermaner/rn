import React from 'react';
import { DeviceEventEmitter } from 'react-native';
import Toast from 'react-native-simple-toast';
import PropTypes from 'prop-types';
import { GetCodeService, UpdateMemberInfoService } from '../../api';

class RevisePhoneBase extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      phone: '',
      sec: 60,
      code: '',
      memberId: '',
    };
  }
  getInit = () => {
    this.setState({ memberId: global.memberId || '' }, this._onRefresh);
  }
  savePhone = (value) => {
    this.setState({
      phone: value,
    });
  }
  sendCode = () => {
    const { phone } = this.state;
    if (!phone) {
      Toast.show('请输入手机号');
      return;
    }
    const telReg = !(phone).match(/^[1][3,4,5,6,7,8,9][0-9]{9}$/);
    if (telReg) {
      Toast.show('手机号格式不对');
      return;
    }
    if (this.isSend) {
      return;
    }
    this.isSend = true;
    const actionMethod = () => {
      const { sec } = this.state;
      if (sec <= 0) {
        clearInterval(this.timer);
        this.isSend = false;
        this.setState({
          sec,
        });
      } else {
        this.setState({
          sec: sec - 1,
        });
      }
    };
    this.sleek.toggle();
    GetCodeService({
      phone,
    }).then((res) => {
      console.log(res);
      this.sleek.toggle();
      if (res.isSuccess) {
        this.setState({
          codeVal: res.data,
          sendPhone: phone,
        });
        actionMethod();
        this.timer = setInterval(
          () => {
            actionMethod();
          }, 1000);
      }
    }).catch(() => {
      this.sleek.toggle();
    });
  }
  reviseUserInfo = () => {
    const { memberId, phone, code, codeVal } = this.state;
    const { push } = this.props;
    if (!code) {
      Toast.show('请输入验证码');
      return;
    }
    if (code !== codeVal) {
      Toast.show('验证码错误');
      return;
    }
    const member = {
      memberId,
      phone,
    };
    this.sleek.toggle();
    UpdateMemberInfoService({
      member: JSON.stringify(member),
    }).then((res) => {
      this.sleek.toggle();
      if (res.isSuccess) {
        console.log(res);
        DeviceEventEmitter.emit('emitPhone');
        this.props.pop();
      } else {
        Toast.show(res.msg);
      }
    }).catch((err) => {
      this.sleek.toggle();
      console.log(err);
    });
  }
}
RevisePhoneBase.propTypes = {
  push: PropTypes.func,
  pop: PropTypes.func,
};
export default RevisePhoneBase;
