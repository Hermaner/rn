import React from 'react';
import PropTypes from 'prop-types';
import { BackHandler } from 'react-native';
import { Container } from 'native-base';
import { connect } from 'react-redux';
import { popRoute, pushRoute } from '../../actions';
import { Header, Loading } from '../../components';
import myBuyGoodsBase from './base';

import Child from './child';

class MySoldGoods extends myBuyGoodsBase {
  constructor(props) {
    super(props);
    this.state = {
      ...this.state,
    };
  }
  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.onBackPress);
  }
  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.onBackPress);
  }
  onBackPress = () => {
    this.props.pop();
    return true;
  };
  render() {
    const { pop } = this.props;
    const { status } = this.props.navigation.state.params;
    return (
      <Container>
        <Header back={pop} title="已卖出的货品" />
        <Child status={status} />
        <Loading ref={(c) => { this.sleek = c; }} />
      </Container>
    );
  }
}

MySoldGoods.propTypes = {
  pop: PropTypes.func,
  push: PropTypes.func,
};
export default connect(null, { pop: popRoute, push: pushRoute })(MySoldGoods);
