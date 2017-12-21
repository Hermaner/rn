import React from 'react';
import Toast from 'react-native-simple-toast';

class MyReleaseBase extends React.Component {
  constructor(props) {
    super(props);
    this.isSend = false;
    this.state = {
      phone: '',
      sec: 60,
      password: '',
      code: '',
      BUTTONS: [
        { text: '停止采购', icon: 'trash', iconColor: '#00ff00' },
        { text: 'Cancel', icon: 'close', iconColor: '#25de5b' },
      ],
      DESTRUCTIVE_INDEX: 3,
      CANCEL_INDEX: 4,
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
  common() {
    this.name = 'herman';
  }
  sendCode = () => {
    const { phone, code } = this.state;
    if (!phone) {
      Toast.show('请输入手机号');
      return;
    }
    const telReg = !(this.phone).match(/^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/);
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
  login = () => {
    console.log('denglu')
  }
}

export default MyReleaseBase;
