import React from 'react';
import PropTypes from 'prop-types';
import { Container } from 'native-base';
import { connect } from 'react-redux';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import { popRoute, pushRoute } from '../../actions';
import { ScrollableTab, Header, Loading } from '../../components';
import myBuyGoodsBase from './base';

import Child from './child';

class MyBuyGoods extends myBuyGoodsBase {
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
        <Header back={pop} title="已买到的货品" />
        <ScrollableTabView style={{ flex: 1 }} renderTabBar={() => <ScrollableTab />}>
          <Child tabLabel="全部" status="" />
          <Child tabLabel="待确认" status="1" />
          <Child tabLabel="待支付" status="2" />
          <Child tabLabel="待发货" status="2" />
        </ScrollableTabView>
        <Loading ref={(c) => { this.sleek = c; }} />
      </Container>
    );
  }
}

MyBuyGoods.propTypes = {
  pop: PropTypes.func,
  push: PropTypes.func,
};
export default connect(null, { pop: popRoute, push: pushRoute })(MyBuyGoods);
