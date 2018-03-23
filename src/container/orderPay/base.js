import React from 'react';
import Toast from 'react-native-simple-toast';
import PropTypes from 'prop-types';
import { DeviceEventEmitter } from 'react-native';
import XPay from 'react-native-puti-pay';
import { PayAliService, PayAppWeiXinService } from '../../api';

XPay.setWxId('wx4d30b0136bad7f7e');
XPay.setAlipayScheme('alipay2017070607661320');
class Base extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cardList: [{
        img: require('../../assets/img/zhi.png'),
        cardName: '支付宝支付',
        money: '单笔最高2000-50万',
        label: '查看详细限额',
        isBorder: true,
        isChoose: -1,
      }, {
        img: require('../../assets/img/wei.png'),
        cardName: '微信支付',
        money: '单笔最高5000-5万',
        label: '查看详细限额',
        isBorder: true,
        isChoose: -1,
      }],
      tb: require('../../assets/img/zhi.png'),
      orderInfo: '',
      index: '',
      tips: '',
    };
  }
  getInit = () => {
    const { orderInfo } = this.props.navigation.state.params;
    this.setState({
      orderInfo,
    });
  }
  goAlipay(orderId) {
    this.sleek.toggle();
    PayAliService({
      orderId,
    }).then((res) => {
      this.sleek.toggle();
      console.log(res);
      if (res.isSuccess) {
        XPay.alipay(res.data, (json) => {
          console.log(json);
          const { resultStatus } = json;
          if (resultStatus === '9000') {
            Toast.show('支付成功！');
            this.props.push({ key: 'MyBuyGoods', params: { type: 'reset' } });
          }
        }).catch(err => console.log(err));
      }
    }).catch((err) => {
      this.sleek.toggle();
      console.log(err);
    });
  }
  goWXpay(orderId) {
    this.sleek.toggle();
    PayAppWeiXinService({
      orderId,
    }).then((res) => {
      console.log(res);
      this.sleek.toggle();
      if (res.isSuccess) {
        const parmas = res.data;
        console.log(parmas)
        XPay.wxPay({
          partnerId: parmas.partnerid,
          prepayId: parmas.prepayid,
          packageValue: parmas.package,
          nonceStr: parmas.noncestr,
          timeStamp: parmas.timestamp,
          sign: parmas.sign,
        }, (json) => {
          console.log(json);
          const { errCode } = json;
          if (errCode === '0' || errCode === 0) {
            Toast.show('支付成功！');
            this.props.push({ key: 'MyBuyGoods', params: { type: 'reset' } });
          }
        });
      }
    }).catch((err) => {
      this.sleek.toggle();
      console.log(err);
    });
  }
  choosePay = (index) => {
    const { cardList } = this.state;
    for (let i = 0; i < cardList.length; i += 1) {
      if (i === index) {
        cardList[i].isChoose *= -1;
        this.setState({
          cardList,
        });
        if (cardList[i].isChoose === 1) {
          for (let j = 0; j < cardList.length; j += 1) {
            cardList[j].isChoose = -1;
          }
          cardList[i].isChoose = 1;
          this.setState({
            cardList,
            index,
          });
        } else {
          this.setState({
            index: '',
          });
        }
      }
    }
  }
  payMoney = () => {
    const { index, orderInfo } = this.state;
    if (index === '') {
      Toast.show('请选择支付方式');
      return;
    }
    if (index === 0) {
      this.goAlipay(orderInfo.orderId);
    }
    if (index === 1) {
      this.goWXpay(orderInfo.orderId);
    }
  }
}
Base.propTypes = {
  navigation: PropTypes.object,
  push: PropTypes.func,
};
export default Base;
