import React from 'react';
import { AsyncStorage, Platform, DeviceEventEmitter, Alert } from 'react-native';
import Toast from 'react-native-simple-toast';
import PropTypes from 'prop-types';
import * as WeChat from 'react-native-wechat';
import * as QQAPI from 'react-native-qq';
import { UserSocket, SocketObser } from '../../components';
import { GetCodeService, RegisterMemberService, LoginForPassWordService, UpdateAccessMemberService, AccessWinXinLoginService, UpdateMemberInfoService, GetMemberExistsService } from '../../api';

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
      isBind: false,
      memberInfo: {},
      others: [{
        label: '微信',
        icon: 'md-alarm',
        color: '#62b900',
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
  otherLogin = (index) => {
    if (index === 0) {
      WeChat.sendAuthRequest('snsapi_userinfo', 'App')
      .then((res) => {
        this.AccessWinXinLoginService(res.code);
      });
    } else {
      this.qqLogin();
    }
  }
  qqLogin = () => {
    QQAPI.isQQInstalled().then(() => {
      QQAPI.login('get_simple_userinfo')
      .then((res) => {
        console.log(res);
      }).catch(() => {});
    }).catch(() => {});
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
      // console.log(res);
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
      this.LoginForPassWordService();
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
      registration: global.registration || '12313',
    }).then((res) => {
      // console.log(res);
      this.sleek.toggle();
      if (res.isSuccess) {
        this.loginAction(res.data);
      } else {
        Toast.show(res.msg);
      }
    }).catch(() => {
      this.sleek.toggle();
    });
  }
  LoginForPassWordService = () => {
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
    LoginForPassWordService({
      phone,
      passWord,
      phoneType: Platform.OS === 'ios' ? '2' : '1',
      registration: global.registration,
    }).then((res) => {
      console.log(res);
      this.sleek.toggle();
      if (res.isSuccess) {
        this.loginAction(res.data);
      } else {
        Toast.show(res.msg);
      }
    }).catch(() => {
      this.sleek.toggle();
    });
  }
  UpdateAccessMemberService = () => {
    const {
      phone,
    } = this.state;
    this.sleek.toggle();
    UpdateAccessMemberService({
      phone,
    }).then((res) => {
      this.sleek.toggle();
      if (res.isSuccess) {
        this.loginAction(res.data);
      } else {
        Toast.show(res.msg);
      }
    }).catch(() => {
      this.sleek.toggle();
    });
  }
  GetMemberExistsService = () => {
    this.sleek.toggle();
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
    GetMemberExistsService({
      phone,
    }).then((res) => {
      if (res.isSuccess) {
        if (res.data) {
          this.sleek.toggle();
          Alert.alert(
            '温馨提示', '该手机号已存在，是否将微信信息同步到此账号？',
            [
              { text: '取消', onPress: () => { global.memberId = null; } },
              { text: '确认', onPress: this.UpdateAccessMemberService },
            ],
          );
        } else {
          const member = {
            phone,
          };
          UpdateMemberInfoService({
            member: JSON.stringify(member),
          }).then((json) => {
            this.sleek.toggle();
            if (json.isSuccess) {
              this.loginAction(json.data);
            } else {
              Toast.show(res.msg);
            }
          }).catch(() => {
            this.sleek.toggle();
          });
        }
      } else {
        Toast.show(res.msg);
      }
    }).catch(() => {
      this.sleek.toggle();
    });
  }
  AccessWinXinLoginService = (code) => {
    this.sleek.toggle();
    AccessWinXinLoginService({
      code,
      phoneType: Platform.OS === 'ios' ? '2' : '1',
      registration: global.registration || 'ios',
    }).then((res) => {
      this.sleek.toggle();
      console.log(res);
      if (res.isSuccess) {
        const phone = res.data.phone;
        if (!phone) {
          this.setState({
            isBind: true,
            memberInfo: res.data,
          });
          global.memberId = res.data.memberId;
          Toast.show('请先绑定手机号');
        } else {
          this.loginAction(res.data);
        }
      } else {
        Toast.show(res.msg);
      }
    }).catch(() => {
      this.sleek.toggle();
    });
  }
  loginAction = (data) => {
    global.memberId = data.memberId.toString();
    UserSocket.changeData(data);
    SocketObser.getConnect();
    DeviceEventEmitter.emit('emitUser');
    DeviceEventEmitter.emit('sessionEmit');
    AsyncStorage.setItem('userData', JSON.stringify(data));
    DeviceEventEmitter.emit('emitGoodsDetailData');
    global.userData = data;
    Toast.show('登陆成功');
    this.props.pop();
  }
}
UserBase.propTypes = {
  pop: PropTypes.func,
};
export default UserBase;
