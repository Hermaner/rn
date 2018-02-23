import React from 'react';
import Toast from 'react-native-simple-toast';
import XPay from 'react-native-puti-pay';
import PropTypes from 'prop-types';
import { PayAliService, PayAppWeiXinService } from '../../api';

// XPay.setWxId('wx4d30b0136bad7f7e');
XPay.setAlipayScheme('alipay');
class Base extends React.Component {
  constructor(props) {
    super(props);
    const { orderNumber, orderId, amount } = this.props.navigation.state.params;
    this.state = {
      orderNumber,
      orderId,
      amount,
      cardList: [{
        img: require('../../assets/img/zhi.png'),
        cardName: '支付宝支付',
        id: 0,
        isBorder: true,
      }, {
        img: require('../../assets/img/wei.png'),
        cardName: '微信支付',
        id: 1,
        isBorder: true,
      }, {
        img: require('../../assets/img/dg.png'),
        cardName: '快捷支付',
        id: 2,
        isBorder: true,
      }],
      modal: [0],
      tb: require('../../assets/img/zhi.png'),
    };
  }
  goPay = () => {
    const { modal } = this.state;
    switch (modal[0]) {
      case 0:
        this.goWXpay();
        break;
      case 1:
        this.goAlipay();
        break;
      case 2:
        break;
      default:
    }
  }
  goAlipay = () => {
    const { orderId } = this.state;
    PayAliService({
      orderId,
    }).then((res) => {
      console.log(res);
      if (res.isSuccess) {
        XPay.alipay(res.data, (json) => {
          console.log(json);
        }).catch(err => console.log(err));
      }
    }).catch(err => console.log(err));
  }
  goWXpay = () => {
    const { orderId } = this.state;
    PayAppWeiXinService({
      orderId,
    }).then((res) => {
      console.log(res);
      if (res.isSuccess) {
        const parmas = res.data;
        console.log(parmas);
        XPay.wxPay({
          partnerId: parmas.partnerid,
          prepayId: parmas.prepayid,
          packageValue: parmas.package,
          nonceStr: parmas.noncestr,
          timeStamp: parmas.timestamp,
          sign: parmas.sign,
        }, (json) => {
          console.log(json);
        });
      }
    }).catch(err => console.log(err));
  }
  backCheck = (modal) => {
    console.log(modal);
    this.setState({
      modal,
    });
  }
}
Base.propTypes = {
  navigation: PropTypes.object,
  push: PropTypes.func,
};
export default Base;
