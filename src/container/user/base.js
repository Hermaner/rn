import React from 'react';
import { AsyncStorage, Platform, DeviceEventEmitter } from 'react-native';
import Toast from 'react-native-simple-toast';
import PropTypes from 'prop-types';
import * as WeChat from 'react-native-wechat';
import * as QQAPI from 'react-native-qq';
import { UserSocket, SocketObser } from '../../components';
import { GetCodeService, RegisterMemberService, LoginForPassWordService } from '../../api';

class UserBase extends React.Component {
  constructor(props) {
    super(props);
    this.isSend = false;
    this.state = {
      phone: '15666666666',
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
      // this.shareToQzone();
      // return;
      WeChat.sendAuthRequest('snsapi_userinfo', 'App')
      .then((res) => {
        console.log(res);
      });
    } else {
      this.qqLogin();
    }
  }
  wxShareFriend = () => {
    WeChat.isWXAppInstalled()
    .then((isInstalled) => {
      if (isInstalled) {
        WeChat.shareToSession({
          title: '分享朋友',
          description: '分享来领券',
          thumbImage: 'https://img.hbw128.com/Fi5qw22CEBs3Wzg9yztZP0QQD0kt',
          type: 'news',
          webpageUrl: 'http://www.baidu.com',
        })
        .catch((error) => {
          console.log(error);
        });
      } else {
        Toast.show('没有安装微信软件，请您安装微信之后再试');
      }
    });
  }
  wxShareTimeLine = () => {
    WeChat.isWXAppInstalled()
    .then((isInstalled) => {
      if (isInstalled) {
        WeChat.shareToTimeline({
          title: '分享朋友圈',
          description: '分享来领券',
          thumbImage: 'https://img.hbw128.com/Fi5qw22CEBs3Wzg9yztZP0QQD0kt',
          type: 'news',
          webpageUrl: 'http://www.baidu.com',
        })
        .catch((error) => {
          console.log(error);
        });
      } else {
        Toast.show('没有安装微信软件，请您安装微信之后再试');
      }
    });
  }
  qqLogin = () => {
    QQAPI.isQQInstalled().then(() => {
      QQAPI.login('get_simple_userinfo')
      .then((res) => {
        console.log(res);
      }).catch(err => console.log(err));
    }).catch(err => console.log(err));
  }
  shareToQQ = () => {
    QQAPI.isQQInstalled().then(() => {
      QQAPI.shareToQQ({
        type: 'news',
        title: '分享好友',
        description: '分享来领券',
        webpageUrl: 'http://www.baidu.com',
        imageUrl: 'https://img.hbw128.com/Fi5qw22CEBs3Wzg9yztZP0QQD0kt',
      })
      .then((res) => {
        console.log(res);
      }).catch(err => console.log(err));
    }).catch(err => console.log(err));
  }
  shareToQzone = () => {
    QQAPI.isQQInstalled().then(() => {
      QQAPI.shareToQzone({
        type: 'news',
        title: '分享好友',
        description: '分享来领券',
        webpageUrl: 'http://www.baidu.com',
        imageUrl: 'https://img.hbw128.com/Fi5qw22CEBs3Wzg9yztZP0QQD0kt',
      })
      .then((res) => {
        console.log(res);
      }).catch(err => console.log(err));
    }).catch(err => console.log(err));
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
