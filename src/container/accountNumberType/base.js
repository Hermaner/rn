import React from 'react';
import PropTypes from 'prop-types';

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
        icnImg: require('../../assets/img/gr.png'),
        title: '银行卡-个人账号',
        isHave: false,
        label: '',
        where: '',
      }],
    };
  }
  getInit = () => {
    const { where } = this.props.navigation.state.params;
    this.setState({
      where,
    });
  }
  getDelete = () => {
    this.state = null;
  }
  personalAccount = (index) => {
    const { push } = this.props;
    const { where } = this.state;
    push({ key: 'AddPersonalAccount', params: { type: index + 1, where } });
  }
  publicAccount = () => {
    const { push } = this.props;
    push({ key: 'AddAccount' });
  }
}
AccountNumberTypeBase.propTypes = {
  push: PropTypes.func,
  navigation: PropTypes.object,
};
export default AccountNumberTypeBase;
