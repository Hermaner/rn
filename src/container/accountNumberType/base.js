import React from 'react';
import PropTypes from 'prop-types';
import * as WeChat from 'react-native-wechat';
import Alipay from 'react-native-yunpeng-alipay';

class AccountNumberTypeBase extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [{
        id: '1',
        icnImg: require('../../assets/img/zhi.png'),
        title: '支付宝账号',
        isHave: true,
        label: '急速到账，便捷安全',
      }, {
        id: '1',
        icnImg: require('../../assets/img/wei.png'),
        title: '微信账号',
        isHave: true,
        label: '急速到账，便捷安全',
      }, {
        id: '1',
        icnImg: require('../../assets/img/gr.png'),
        title: '银行卡-个人账号',
        isHave: false,
        label: '',
      }, {
        id: '1',
        icnImg: require('../../assets/img/dg.png'),
        title: '银行卡-对公账号',
        isHave: false,
        label: '',
      }],
    };
  }
  whichClick = (index) => {
    switch (index) {
      case 0:
        this.Alipay();
        break;
      case 1:
        this.WeChatPay();
        break;
      case 2:
        this.personalAccount();
        break;
      case 3:
        this.publicAccount();
        break;
      default:
    }
  }
  Alipay = () => {}
  WeChatPay = () => {}
  personalAccount = () => {
    const { push } = this.props;
    push({ key: 'AddPersonalAccount' });
  }
  publicAccount = () => {
    const { push } = this.props;
    push({ key: 'AddAccount' });
  }
}
AccountNumberTypeBase.propTypes = {
  push: PropTypes.func,
};
export default AccountNumberTypeBase;
