import React from 'react';
import Toast from 'react-native-simple-toast';
import PropTypes from 'prop-types';
import { GetMemberRechargeService, CreateRechargeOrderService } from '../../api';

class Base extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      tabIndex: 0,
    };
  }
  getInit = () => {
    this.GetMemberRechargeService();
  }
  changeTab = (index) => {
    const { items, tabIndex } = this.state;
    items[tabIndex].cur = false;
    items[index].cur = true;
    this.setState({
      items,
      tabIndex: index,
    });
  }
  CreateRechargeOrderService = () => {
    this.sleek.toggle();
    const { items, tabIndex } = this.state;
    CreateRechargeOrderService({
      rechargeId: items[tabIndex].id.toString(),
    }).then((res) => {
      console.log(res);
      this.sleek.toggle();
      if (res.isSuccess) {
        this.props.push({
          key: 'CreatePay',
          params: {
            orderNumber: res.data.serialNumber,
            amount: items[tabIndex].salesPrice.toString(),
            type: 6,
          },
        });
      } else {
        Toast.show(res.msg);
      }
    }).catch((err) => {
      this.sleek.toggle();
      console.log(err);
    });
  }
  GetMemberRechargeService = () => {
    this.sleek.toggle();
    GetMemberRechargeService().then((res) => {
      console.log(res);
      this.sleek.toggle();
      if (res.isSuccess) {
        const items = res.data;
        items[0].cur = true;
        this.setState({
          items,
        });
      } else {
        Toast.show(res.msg);
      }
    }).catch((err) => {
      this.sleek.toggle();
      console.log(err);
    });
  }
}
Base.propTypes = {
  push: PropTypes.func,
  navigation: PropTypes.object,
};
export default Base;
