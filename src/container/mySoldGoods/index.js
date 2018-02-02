import React from 'react';
import PropTypes from 'prop-types';
import { Container } from 'native-base';
import { connect } from 'react-redux';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import { popRoute, pushRoute } from '../../actions';
import { ScrollableTab, Header, Loading } from '../../components';
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
  }
  render() {
    const { pop } = this.props;
    return (
      <Container>
        <Header back={pop} title="已卖出的货品" />
        <ScrollableTabView style={{ flex: 1 }} renderTabBar={() => <ScrollableTab />}>
          <Child tabLabel="全部" status="" />
          <Child tabLabel="待修改" status="1" />
          <Child tabLabel="待发货" status="3" />
          <Child tabLabel="退款中" status="5" />
        </ScrollableTabView>
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
