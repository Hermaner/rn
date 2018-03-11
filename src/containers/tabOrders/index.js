import React from 'react';
import PropTypes from 'prop-types';
import { Container } from 'native-base';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import { connect } from 'react-redux';
import { popRoute, pushRoute } from '../../actions';
import { Header, ScrollableTab } from '../../components';
import Demand from './Demand';
import Fixed from './Fixed';
import base from './base';

class Orders extends base {
  render() {
    return (
      <Container>
        <Header
          hideLeft
          title="可接订单"
          rightText="地图接单"
          rightPress={() => this.props.push({ key: 'MapViewOrder' })}
        />
        <ScrollableTabView
          style={{ flex: 1 }}
          renderTabBar={() => <ScrollableTab />}
        >
          <Fixed tabLabel="固价订单" />
          <Demand tabLabel="需求订单" />
        </ScrollableTabView>
      </Container>
    );
  }
}

Orders.propTypes = {
  pop: PropTypes.func,
  push: PropTypes.func,
};
export default connect(null, { pop: popRoute, push: pushRoute })(Orders);
