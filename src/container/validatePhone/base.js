import React from 'react';
import Toast from 'react-native-simple-toast';
import PropTypes from 'prop-types';
import { GetCodeService, SetPayPasswordService, GetMemberInfoService } from '../../api';

class RevisePhoneBase extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      phone: '',
      sec: 60,
      code: '',
      memberId: '',
      passWord: '',
    };
  }
  getInit = () => {
    this.setState({
      memberId: global.memberId || '',
    }, this.getData);
  }
  getData = () => {
    GetMemberInfoService({
      memberId: global.memberId,
    }).then((res) => {
      console.log(res);
      if (res.isSuccess) {
        const result = res.data;
        this.setState({
          phone: result.phone,
        });
      } else {
        Toast.show(res.msg);
      }
    }).catch(() => {
      this.sleek.toggle();
    });
  }
  sendCode = () => {
    if (this.isSend) {
      return;
    }
    const { phone } = this.state;
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
    const { phone, code, codeVal, passWord, memberId } = this.state;
    if (!code) {
      Toast.show('请输入验证码');
      return;
    }
    if (code !== codeVal) {
      Toast.show('验证码错误');
      return;
    }
    if (passWord.length !== 6) {
      Toast.show('请输入6位数的密码');
      return;
    }
    this.sleek.toggle();
    SetPayPasswordService({
      memberId,
      type: '1',
      phone,
      payPassword: passWord,
    }).then((res) => {
      this.sleek.toggle();
      if (res.isSuccess) {
        Toast.show('您的密码设置成功！');
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
  navigation: PropTypes.object,
  pop: PropTypes.func,
};
export default RevisePhoneBase;
