import React from 'react';
import PropTypes from 'prop-types';
import Toast from 'react-native-simple-toast';
import { DeviceEventEmitter } from 'react-native';
import { GetWithdrawalsNumberMasterService } from '../../api';

class Base extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [{
        img: require('../../assets/img/zhi.png'),
        name: '支付宝账号',
        info: {},
      }, {
        img: require('../../assets/img/dg.png'),
        name: '银行卡账号',
        info: {},
      }],
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
        cards.forEach((item) => {
          item.label = `${item.number.substr(0, 4)}****`;
          items[item.type].info = item;
        });
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
  goPage = (type) => {
    const { items } = this.state;
    this.props.push({ key: 'MyDrawAdd', params: { type, info: items[type].info } });
  }
}
Base.propTypes = {
  push: PropTypes.func,
};
export default Base;
