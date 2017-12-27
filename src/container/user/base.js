import React from 'react';
import Toast from 'react-native-simple-toast';
import { GetCodeService, RegisterMemberService } from '../../api';

class UserBase extends React.Component {
  constructor(props) {
    super(props);
    this.isSend = false;
    this.state = {
      isSleekShow: false,
      phone: '',
      sec: 60,
      password: '',
      code: '',
      codeVal: '',
    };
  }
  onChangeText = (txt, index) => {
    switch (index) {
      case 0:
        this.setState({
          phone: txt,
        });
        break;
      default:
    }
  }
  toggleSleek = () => {
    this.setState({
      isSleekShow: !this.state.isSleekShow,
    });
  }
  sendCode = () => {
    const { phone } = this.state;
    if (!phone) {
      Toast.show('请输入手机号');
      return;
    }
    const telReg = !(phone).match(/^(0|86|17951)?(13[0-9]|15[012356789]|17[1678]|18[0-9]|14[57])[0-9]{8}$/);
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
    this.toggleSleek();
    GetCodeService({
      phone,
    }).then((res) => {
      console.log(res);
      this.toggleSleek();
      if (res.isSuccess) {
        this.setState({
          codeVal: res.data,
        });
        actionMethod();
        this.timer = setInterval(
          () => {
            actionMethod();
          }, 1000);
      }
    }).catch(() => {
      this.toggleSleek();
    });
  }
  login = () => {
    const {
      phone,
      code,
      codeVal,
    } = this.state;
    if (!code) {
      Toast.show('请输入验证码');
      return;
    }
    if (code !== codeVal) {
      Toast.show('验证码错误');
      return;
    }
    this.toggleSleek();
    RegisterMemberService({
      phone,
    }).then((res) => {
      console.log(res);
      this.toggleSleek();
      if (res.isSuccess) {
        Toast.show('登陆成功');
      }
    }).catch(() => {
      this.toggleSleek();
    });
  }
}

export default UserBase;
