import React from 'react';
import Toast from 'react-native-simple-toast';
import PropTypes from 'prop-types';
import { CreateWithdrawalsOrderService } from '../../api';

class Base extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      amount: props.navigation.state.params.amount,
      value: '',
      memberId: global.memberId,
    };
  }
  CreateWithdrawalsOrderService = () => {
    const { amount, value, memberId } = this.state;
    if (!value) {
      Toast.show('请输入提现金额');
      return;
    }
    const reg = /(^[1-9]\d*(\.\d{1,2})?$)|(^0(\.\d{1,2})?$)/;
    if (!reg.test(value)) {
      Toast.show('提现金额可视错误');
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
    this.sleek.toggle();
    CreateWithdrawalsOrderService({
      amount: value,
      memberId,
      withdrawalsNumberId: '1',
    }).then((res) => {
      console.log(res);
      this.sleek.toggle();
      if (res.isSuccess) {
        Toast.show('提现申请成功');
        this.props.pop();
      }
    }).catch((err) => {
      this.sleek.toggle();
      console.log(err);
    });
  }
}
Base.propTypes = {
  pop: PropTypes.func,
  navigation: PropTypes.object,
};
export default Base;
