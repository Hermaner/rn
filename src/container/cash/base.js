import React from 'react';
import Toast from 'react-native-simple-toast';
import { DeviceEventEmitter } from 'react-native';
import PropTypes from 'prop-types';
import { CreateWithdrawalsOrderService, GetMemberSurplusAmountService } from '../../api';

class CashBase extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      money: '',
      allMoney: '',
      item: '',
    };
  }
  getInit = () => {
    const { item } = this.props.navigation.state.params;
    this.setState({
      memberId: global.memberId || '',
      item,
    }, this.getData);
  }
  getDelete = () => {
    this.state = null;
  }
  getData = () => {
    GetMemberSurplusAmountService({
      memberId: global.memberId,
    }).then((res) => {
      if (res.isSuccess) {
        this.setState({
          allMoney: res.data,
        });
      } else {
        Toast.show(res.msg);
      }
    }).catch(() => {
    });
  }
  getMoney = () => {
    const { money, item, allMoney } = this.state;
    if (!money) {
      Toast.show('请输入提现金额！');
      return;
    }
    if (money > parseFloat(allMoney)) {
      Toast.show('取现金额不能大于余额！');
      return;
    }
    this.sleek.toggle();
    CreateWithdrawalsOrderService({
      memberId: global.memberId,
      amount: money,
      withdrawalsNumberId: item.withdrawalsNumberId,
    }).then((res) => {
      this.sleek.toggle();
      if (res.isSuccess) {
        Toast.show('取现成功！');
        DeviceEventEmitter.emit('emitUser');
        this.setState({
          allMoney: res.data,
        });
      } else {
        Toast.show(res.msg);
      }
    }).catch(() => {
      this.sleek.toggle();
    });
  }
  saveMoney = (value) => {
    this.setState({
      money: value,
    });
  }
}
CashBase.propTypes = {
  navigation: PropTypes.object,
};
export default CashBase;
