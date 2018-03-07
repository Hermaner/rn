import React from 'react';
import Toast from 'react-native-simple-toast';
import { DeviceEventEmitter } from 'react-native';
import PropTypes from 'prop-types';
import { CreateWithdrawalsOrderMasterService, GetWithdrawalsNumberMasterService } from '../../api';

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
    };
  }
  getInit = () => {
    this.GetWithdrawalsNumberMasterService();
    this.emitLoad = DeviceEventEmitter.addListener('emitLoad', () => {
      this.GetWithdrawalsNumberMasterService();
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
  CreateWithdrawalsOrderMasterService = () => {
    const { amount, value, listIndex, items } = this.state;
    if (!value) {
      Toast.show('请输入提现金额');
      return;
    }
    const reg = /(^[1-9]\d*(\.\d{1,2})?$)|(^0(\.\d{1,2})?$)/;
    if (!reg.test(value)) {
      Toast.show('提现金额格式错误');
      return;
    }
    if (value < 10) {
      Toast.show('小于10元不能提现');
      return;
    }
    if (parseFloat(value) > parseFloat(amount)) {
      Toast.show('提现金额不能大于提现余额');
      return;
    }
    if (listIndex === null) {
      Toast.show('请选择提现账户');
      return;
    }
    console.log(items, listIndex);
    this.sleek.toggle();
    CreateWithdrawalsOrderMasterService({
      amount: value,
      withdrawalsNumberId: items[listIndex].info.id,
    }).then((res) => {
      console.log(res);
      this.sleek.toggle();
      if (res.isSuccess) {
        Toast.show('提现申请成功');
        DeviceEventEmitter.emit('emitMasterLoad');
        this.props.pop();
      } else {
        Toast.show(res.msg);
      }
    }).catch((err) => {
      this.sleek.toggle();
      console.log(err);
    });
  }
  GetWithdrawalsNumberMasterService = () => {
    this.sleek.toggle();
    GetWithdrawalsNumberMasterService({
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
