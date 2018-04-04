import React from 'react';
import Toast from 'react-native-simple-toast';
import { DeviceEventEmitter } from 'react-native';
import PropTypes from 'prop-types';
import { CreateWithdrawalsOrderService, GetWithdrawalsNumberService, GetMemberInfoService } from '../../api';

class Base extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      amount: props.navigation.state.params.amount,
      value: '',
      items: [{
        img: require('../../assets/img/zhi.png'),
        name: '支付宝账号',
      }, {
        img: require('../../assets/img/dg.png'),
        name: '银行卡账号',
      }],
      listIndex: null,
      visible: false, // 模态场景是否可见
      transparent: true, // 是否透明显示
      label: '',
      password: '',
      myPayPassword: '',
    };
  }
  getInit = () => {
    this.GetWithdrawalsNumberService();
    this.emitLoad = DeviceEventEmitter.addListener('emitLoad', () => {
      this.GetWithdrawalsNumberService();
    });
    this.getData();
  }
  getData = () => {
    GetMemberInfoService({
      memberId: global.memberId,
    }).then((res) => {
      console.log(res);
      if (res.isSuccess) {
        const result = res.data;
        this.setState({
          myPayPassword: result.payPassword,
        });
      } else {
        Toast.show(res.msg);
      }
    }).catch(() => {
      this.sleek.toggle();
    });
  }
  deleteInit = () => {
    this.emitLoad.remove();
  }
  drawAll = () => {
    const { amount } = this.state;
    this.setState({
      value: amount,
    });
  }
  savePassword = (password) => {
    this.setState({
      password,
    });
  }
  openModal = () => {
    const { myPayPassword } = this.state;
    if (myPayPassword !== '' && myPayPassword !== null) {
      this.setState({ visible: true });
      return;
    }
    this.CreateWithdrawalsOrderService();
  }
  CreateWithdrawalsOrderService = () => {
    const { amount, value, listIndex, items, password, myPayPassword } = this.state;
    this.setState({ visible: false });
    if (myPayPassword !== '' && myPayPassword !== null) {
      if (!password) {
        this.setState({ visible: false });
        setTimeout(() => { Toast.show('请输入支付密码'); }, 500);
        return;
      }
      if (parseFloat(password) !== parseFloat(myPayPassword)) {
        this.setState({ visible: false });
        setTimeout(() => { Toast.show('支付密码不正确'); }, 500);
        return;
      }
    }
    if (!value) {
      this.setState({ visible: false });
      setTimeout(() => { Toast.show('请输入提现金额'); }, 500);
      return;
    }
    const reg = /(^[1-9]\d*(\.\d{1,2})?$)|(^0(\.\d{1,2})?$)/;
    if (!reg.test(value)) {
      this.setState({ visible: false });
      setTimeout(() => { Toast.show('提现金额格式错误'); }, 500);
      return;
    }
    if (value < 10) {
      this.setState({ visible: false });
      setTimeout(() => { Toast.show('小于10元不能提现'); }, 500);
      return;
    }
    if (parseFloat(value) > parseFloat(amount)) {
      this.setState({ visible: false });
      setTimeout(() => { Toast.show('提现金额不能大于提现余额'); }, 500);
      return;
    }
    if (listIndex === null) {
      this.setState({ visible: false });
      setTimeout(() => { Toast.show('请选择提现账户'); }, 500);
      return;
    }
    this.sleek.toggle();
    CreateWithdrawalsOrderService({
      memberId: global.memberId,
      amount: value,
      withdrawalsNumberId: items[listIndex].info.withdrawalsNumberId,
    }).then((res) => {
      console.log(res);
      this.sleek.toggle();
      this.setState({ password: '' });
      if (res.isSuccess) {
        this.setState({ visible: false });
        setTimeout(() => { Toast.show('提现申请成功'); }, 500);
        DeviceEventEmitter.emit('emitMasterLoad');
        DeviceEventEmitter.emit('emitAccount');
        this.props.pop();
      } else {
        Toast.show(res.msg);
      }
    }).catch(() => {
      this.sleek.toggle();
    });
  }
  GetWithdrawalsNumberService = () => {
    this.sleek.toggle();
    GetWithdrawalsNumberService({
      memberId: global.memberId,
    }).then((res) => {
      console.log(res);
      this.sleek.toggle();
      if (res.isSuccess) {
        const cards = res.data;
        const { items } = this.state;
        let listIndex = null;
        cards.forEach((item) => {
          item.label = `${item.number.substr(0, 4)}****`;
          items[item.type].info = item;
          if (listIndex !== null) {
            return;
          }
          items[item.type].cur = true;
          listIndex = item.type;
        });
        this.setState({
          items,
          listIndex,
        });
      } else {
        Toast.show(res.msg);
      }
    }).catch((err) => {
      this.sleek.toggle();
      console.log(err);
    });
  }
  tabCard = (index) => {
    const { items, listIndex } = this.state;
    if (!items[index].info) {
      this.props.push({ key: 'MyDrawAdd', params: { type: index, info: {} } });
      return;
    }
    if (index === listIndex) {
      return;
    }
    if (listIndex !== null) {
      items[listIndex].cur = false;
    }
    items[index].cur = true;
    this.setState({
      items,
      listIndex: index,
    });
  }
}
Base.propTypes = {
  pop: PropTypes.func,
  push: PropTypes.func,
  navigation: PropTypes.object,
};
export default Base;
