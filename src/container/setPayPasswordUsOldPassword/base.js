import React from 'react';
import Toast from 'react-native-simple-toast';
import PropTypes from 'prop-types';
import { GetMemberInfoService, SetPayPasswordService } from '../../api';

class Base extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      oldPassword: '',
      newPassword: '',
      oldPasswordOk: '',
    };
  }
  getData = () => {
    GetMemberInfoService({
      memberId: global.memberId,
    }).then((res) => {
      // console.log(res);
      if (res.isSuccess) {
        const result = res.data;
        this.setState({
          oldPasswordOk: result.payPassword,
        });
      } else {
        Toast.show(res.msg);
      }
    }).catch(() => {
      this.sleek.toggle();
    });
  }
  submit = () => {
    const { oldPassword, newPassword, oldPasswordOk } = this.state;
    if (!oldPassword) {
      Toast.show('请输入原密码！');
      return;
    }
    if (oldPassword !== oldPasswordOk) {
      Toast.show('原密码输入错误！');
      return;
    }
    if (!newPassword) {
      Toast.show('请输入新密码！');
      return;
    }
    const reg = /(^[1-9]\d*(\.\d{1,2})?$)|(^0(\.\d{1,2})?$)/;
    if (!reg.test(newPassword)) {
      Toast.show('格式错误');
      return;
    }
    if (newPassword.length !== 6) {
      Toast.show('请输入6位数的密码');
      return;
    }
    this.sleek.toggle();
    SetPayPasswordService({
      memberId: global.memberId,
      type: '2',
      oldPayPassword: oldPassword,
      payPassword: newPassword,
    }).then((res) => {
      this.sleek.toggle();
      if (res.isSuccess) {
        Toast.show('您的密码设置成功！');
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
