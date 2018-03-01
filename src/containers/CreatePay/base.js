import React from 'react';
import Toast from 'react-native-simple-toast';
import XPay from 'react-native-puti-pay';
import PropTypes from 'prop-types';
import { AliAppPayService, PayAppWeiXinService } from '../../api';

XPay.setWxId('wx4d30b0136bad7f7e');
XPay.setAlipayScheme('alipay');
class Base extends React.Component {
  constructor(props) {
    super(props);
    const { orderNumber, orderId, amount, type } = this.props.navigation.state.params;
    console.log(type)
    this.state = {
      orderNumber,
      orderId,
      amount,
      type, // 1:普通 2:需求 3:普通未支付4差价5保障金6用户充值
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
        this.goAlipay();
        break;
      case 1:
        this.goWXpay();
        break;
      case 2:
        break;
      default:
    }
  }
  goAlipay = () => {
    const { orderNumber, amount } = this.state;
    AliAppPayService({
      orderNumber,
      amount: '0.01' || amount.toString(),
    }).then((res) => {
      console.log(res);
      if (res.isSuccess) {
        XPay.alipay(res.data, (json) => {
          console.log(json);
          if (json.resultStatus) {
            Toast.show('用户取消');
            return;
          }
          this.goNext();
        }).catch(err => console.log(err));
      }
    }).catch(err => console.log(err));
  }
  goWXpay = () => {
    const { orderNumber, amount } = this.state;
    PayAppWeiXinService({
      orderNumber,
      amount: amount.toString(),
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
          this.goNext();
        });
      }
    }).catch(err => console.log(err));
  }
  goNext = () => {
    const { type, orderId } = this.state;
    const { push, pop } = this.props;
    switch (type) {
      case 1:
        push({ key: 'OrderDetail', params: { orderId, type: 'reset' } });
        break;
      case 2:
        push({ key: 'Orders', params: { initialPage: 0 } });
        break;
      case 3:
        pop();
        console.log('普通支付完成');
        break;
      case 4:
        pop();
        console.log('差价完成');
        break;
      case 5:
        pop();
        console.log('保障金支付完成');
        break;
      case 6:
        pop();
        console.log('充值支付完成');
        break;
      default:
    }
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
  pop: PropTypes.func,
};
export default Base;
