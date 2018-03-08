import React from 'react';
import Toast from 'react-native-simple-toast';
import PropTypes from 'prop-types';
import { GetCodeService, UpdateMemberService } from '../../api';

class Base extends React.Component {
  constructor(props) {
    super(props);
    this.isSend = false;
    this.state = {
      phone: '',
      sendPhone: '',
      sec: 60,
      code: '',
      codeVal: '',
      passWord: '',
    };
  }
  sendCode = () => {
    if (this.isSend) {
      return;
    }
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
  UpdateMemberService = () => {
    const {
      phone,
      code,
      codeVal,
      sendPhone,
      passWord,
    } = this.state;
    if (phone !== sendPhone) {
      Toast.show('手机号与发送短信的手机号不一致');
      return;
    }
    if (!code) {
      Toast.show('请输入验证码');
      return;
    }
    if (code !== codeVal) {
      Toast.show('验证码错误');
      return;
    }
    if (passWord.length > 12 || passWord.length < 6) {
      Toast.show('密码长度6-12位');
      return;
    }
    this.sleek.toggle();
    UpdateMemberService({
      phone,
      passWord,
    }).then((res) => {
      console.log(res);
      this.sleek.toggle();
      if (res.isSuccess) {
        Toast.show('修改成功,可以使用此密码登陆');
        this.props.pop();
      } else {
        Toast.show(res.msg);
      }
    }).catch(() => {
      this.sleek.toggle();
    });
  }
}
Base.propTypes = {
  pop: PropTypes.func,
};
export default Base;
