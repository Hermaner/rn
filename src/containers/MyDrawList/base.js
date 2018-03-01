import React from 'react';
import PropTypes from 'prop-types';
import { DeviceEventEmitter } from 'react-native';

class Base extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [{
        img: require('../../assets/img/zhi.png'),
        name: '支付宝账号',
        label: '',
      }, {
        img: require('../../assets/img/dg.png'),
        name: '银行卡-个人账号',
        label: '',
      }, {
        img: require('../../assets/img/dg.png'),
        name: '银行卡-对公账号',
        label: '',
      }],
    };
  }
  getInit = () => {
    this.emitNick = DeviceEventEmitter.addListener('emitNick', (data) => {
      console.log(data)
      const { items } = this.state;
      items[0].label = '已添加';
      this.setState({
        items,
      });
    });
  }
  deleteInit = () => {
    this.emitNick.remove();
  }
  goPage = (index) => {
    switch (index) {
      case 0:
        this.props.push({ key: 'InputChange', params: { label: '支付宝账号', value: '支付宝账号' } });
        break;
      case 2:
        this.props.push({ key: 'MyDrawAdd' });
        break;
      case 3:
        this.props.push({ key: 'InputChange', params: { label: '支付宝账号', value: '支付宝账号' } });
        break;
      default:
    }
  }
}
Base.propTypes = {
  push: PropTypes.func,
};
export default Base;
