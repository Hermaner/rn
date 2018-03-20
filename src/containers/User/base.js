import React from 'react';
import { AsyncStorage, Platform, DeviceEventEmitter } from 'react-native';
import Toast from 'react-native-simple-toast';
import PropTypes from 'prop-types';
import { UserSocket } from '../../components';
import { GetCodeService, RegisterMemberService, LoginService } from '../../api';

class UserBase extends React.Component {
  constructor(props) {
    super(props);
    this.isSend = false;
    this.state = {
      phone: '15666666666', // 15618385521 15666666666
      sendPhone: '15666666666',
      sec: 60,
      passWord: '',
      code: '1111',
      codeVal: '1111',
      isCode: true,
      others: [{
        label: '微信',
        icon: 'md-alarm',
        color: '#62b900',
      }, {
        label: '微博',
        icon: 'md-alarm',
        color: '#fc5e6a',
      }, {
        label: 'QQ',
        icon: 'md-alarm',
        color: '#68a5e1',
      }],
    };
  }
  changeLogin = () => {
    this.setState({
      isCode: !this.state.isCode,
    });
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
      Toast.show('手机号格式错误');
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
  login = () => {
    const {
      isCode,
    } = this.state;
    if (isCode) {
      this.RegisterMemberService();
    } else {
      this.LoginService();
    }
  }
  RegisterMemberService = () => {
    const {
      phone,
      code,
      codeVal,
      sendPhone,
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
    this.sleek.toggle();
    RegisterMemberService({
      phone,
      phoneType: Platform.OS === 'ios' ? '2' : '1',
      registration: global.registration || 'ios',
    }).then((res) => {
      console.log(res);
      this.sleek.toggle();
      if (res.isSuccess) {
        global.memberId = res.data.memberId;
        UserSocket.changeData(res.data);
        DeviceEventEmitter.emit('socketConnet');
        DeviceEventEmitter.emit('emitUser');
        DeviceEventEmitter.emit('sessionEmit');
        AsyncStorage.setItem('userData', JSON.stringify(res.data));
        global.userData = res.data;
        Toast.show('登陆成功');
        this.props.pop();
      } else {
        Toast.show(res.msg);
      }
    }).catch(() => {
      this.sleek.toggle();
    });
  }
  LoginService = () => {
    const {
      phone,
      passWord,
    } = this.state;
    const telReg = !(phone).match(/^[1][3,4,5,6,7,8,9][0-9]{9}$/);
    if (telReg) {
      Toast.show('手机号格式错误');
      return;
    }
    if (!passWord) {
      Toast.show('请输入密码');
      return;
    }
    this.sleek.toggle();
    LoginService({
      phone,
      passWord,
      phoneType: Platform.OS === 'ios' ? '2' : '1',
      registration: global.registration || 'ios',
    }).then((res) => {
      console.log(res);
      this.sleek.toggle();
      if (res.isSuccess) {
        global.memberId = res.data.memberId;
        UserSocket.changeData(res.data);
        DeviceEventEmitter.emit('socketConnet');
        DeviceEventEmitter.emit('emitMine');
        DeviceEventEmitter.emit('sessionEmit');
        AsyncStorage.setItem('userData', JSON.stringify(res.data));
        global.userData = res.data;
        Toast.show('登陆成功');
        this.props.pop();
      } else {
        Toast.show(res.msg);
      }
    }).catch(() => {
      this.sleek.toggle();
    });
  }
}
UserBase.propTypes = {
  pop: PropTypes.func,
};
export default UserBase;
