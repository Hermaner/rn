import React from 'react';
import Communications from 'react-native-communications';
import PropTypes from 'prop-types';

class Base extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [{
        id: '1',
        title: '货品信息有问题',
      }, {
        id: '2',
        title: '诈骗',
      }, {
        id: '3',
        title: '骚扰/广告',
      }, {
        id: '4',
        title: '价格虚假',
      }, {
        id: '5',
        title: '服务问题',
      }, {
        id: '6',
        title: '发布色情/政治/违法内容',
      }, {
        id: '7',
        title: '其他原因',
      }],
      beMemberId: '',
      supplyId: '',
    };
  }
  getInit = () => {
    const { beMemberId, supplyId } = this.props.navigation.state.params;
    this.setState({
      beMemberId,
      supplyId,
    });
  }
  tellPhone = () => {
    Communications.phonecall(global.phone, false);
  }
}
Base.propTypes = {
  navigation: PropTypes.object,
};
export default Base;
