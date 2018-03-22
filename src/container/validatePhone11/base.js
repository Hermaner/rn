import React from 'react';
import Toast from 'react-native-simple-toast';

class ValidatePhoneBase extends React.Component {
  constructor(props) {
    super(props);
    this.isSend = false;
    this.state = {
      phone: '',
      sec: 60,
      password: '',
      code: '',
    };
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
    actionMethod();
    this.timer = setInterval(
      () => {
        actionMethod();
      }, 1000);
  }
}
export default ValidatePhoneBase;
