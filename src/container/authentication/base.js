import React from 'react';
import Toast from 'react-native-simple-toast';
import PropTypes from 'prop-types';
import { GetCodeService } from '../../api';

class AuthenticationBase extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sec: 60,
      code: '',
    };
  }
  sendCode = () => {
    const { phone } = this.props.navigation.state.params;
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
  enterSetPassword = () => {
    const { push } = this.props;
    const { code, codeVal } = this.state;
    if (code !== codeVal) {
      Toast.show('验证码错误');
      return;
    }
    push({ key: 'SetPassword' });
  }
}
AuthenticationBase.propTypes = {
  navigation: PropTypes.func,
  push: PropTypes.func,
};
export default AuthenticationBase;
