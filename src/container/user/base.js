import React from 'react';
import { AsyncStorage, Platform, DeviceEventEmitter, Alert } from 'react-native';
import Toast from 'react-native-simple-toast';
import PropTypes from 'prop-types';
import * as WeChat from 'react-native-wechat';
import * as QQAPI from 'react-native-qq';
import { UserSocket, SocketObser } from '../../components';
import { GetCodeService, RegisterMemberService, LoginForPassWordService, UpdateAccessMemberService, AccessWinXinLoginService, GetMemberExistsService, AccessQQService } from '../../api';

class UserBase extends React.Component {
  constructor(props) {
    super(props);
    this.isSend = false;
    this.state = {
      phone: '', // 13545883079 18702111649 13407156848 15666666666 15777777777
      sendPhone: '',
      sec: 60,
      passWord: '',
      code: '',
      codeVal: '',
      isCode: true,
      isBind: false,
      memberInfo: {},
      isWechatExist: false,
      isQQExist: false,
      authId: '',
      others: [{
        label: '微信',
        icon: 'icon-weixin',
        color: '#00d22a',
      }, {
        label: 'QQ',
        icon: 'icon-QQ',
        color: '#00addc',
      }],
    };
  }
  getInit = () => {
    WeChat.isWXAppInstalled()
    .then((isInstalled) => {
      if (isInstalled) {
        this.setState({
          isWechatExist: true,
        });
      } else {
        this.setState({
          isWechatExist: false,
        });
      }
    });
    QQAPI.isQQInstalled()
    .then((isInstalled) => {
      if (isInstalled) {
        this.setState({
          isQQExist: true,
        });
      } else {
        this.setState({
          isQQExist: false,
        });
      }
    }).catch(() => {});
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
    QQAPI.login('get_simple_userinfo')
    .then((res) => {
      this.AccessQQService(res);
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
          sec: 60,
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
      registration: global.registration || '',
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
  UpdateAccessMemberService = () => {
    const {
      phone,
    } = this.state;
    this.sleek.toggle();
    UpdateAccessMemberService({
      phone,
      phoneType: Platform.OS === 'ios' ? '2' : '1',
      registration: global.registration || '',
    }).then((res) => {
      this.sleek.toggle();
      if (res.isSuccess) {
        // console.log(res);
        this.loginAction(res.data);
      } else {
        Toast.show(res.msg);
      }
    }).catch(() => {
      this.sleek.toggle();
    });
  }
  GetMemberExistsService = () => {
    const {
      phone,
      code,
      codeVal,
      sendPhone,
      authId,
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
    global.memberId = authId;
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
          this.UpdateAccessMemberService();
        }
      } else {
        Toast.show(res.msg);
      }
    }).catch(() => {
      this.sleek.toggle();
    });
  }
  AccessQQService = (data) => {
    this.sleek.toggle();
    AccessQQService({
      openid: data.openid,
      accessToken: data.access_token,
      oauthConsumerKey: data.oauth_consumer_key,
      phoneType: Platform.OS === 'ios' ? '2' : '1',
      registration: global.registration || 'ios',
    }).then((res) => {
      this.sleek.toggle();
      if (res.isSuccess) {
        const phone = res.data.phone;
        if (!phone) {
          this.setState({
            isBind: true,
            authId: res.data.memberId,
            memberInfo: res.data,
          });
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
  AccessWinXinLoginService = (code) => {
    this.sleek.toggle();
    AccessWinXinLoginService({
      code,
      phoneType: Platform.OS === 'ios' ? '2' : '1',
      registration: global.registration || 'noPermiss',
    }).then((res) => {
      this.sleek.toggle();
      if (res.isSuccess) {
        const phone = res.data.phone;
        if (!phone) {
          this.setState({
            isBind: true,
            authId: res.data.memberId,
            memberInfo: res.data,
          });
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
  loginAction = async (data) => {
    global.memberId = data.memberId.toString();
    UserSocket.changeData(data);
    SocketObser.getConnect();
    AsyncStorage.setItem('userData', JSON.stringify(data));
    DeviceEventEmitter.emit('emitGoodsDetailData');
    DeviceEventEmitter.emit('emitUser');
    DeviceEventEmitter.emit('sessionEmit');
    global.userData = data;
    Toast.show('登陆成功');
    this.props.pop();
  }
}
UserBase.propTypes = {
  pop: PropTypes.func,
};
export default UserBase;
