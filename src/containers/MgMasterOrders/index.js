import React from 'react';
import { BackHandler } from 'react-native';
import PropTypes from 'prop-types';
import { Container } from 'native-base';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import { connect } from 'react-redux';
import { popRoute } from '../../actions';
import { Header, ScrollableTab } from '../../components';
import Order from './order';

class MgMasterOrders extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      initialPage: props.navigation.state.params.initialPage,
    };
  }
  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', () => {
      this.props.pop();
      return true;
    });
  }
  componentWillUnmount() {
  }
  render() {
    const { pop } = this.props;
    const { initialPage } = this.state;
    return (
      <Container>
        <Header back={pop} title="服务订单" />
        <ScrollableTabView
          style={{ flex: 1 }}
          initialPage={initialPage}
          renderTabBar={() => <ScrollableTab />}
        >
          <Order tabLabel="待预约" status="2" />
          <Order tabLabel="待服务" status="3" />
          <Order tabLabel="服务中" status="4" />
          <Order tabLabel="待入账" status="5" />
          <Order tabLabel="全部" status="0" />
        </ScrollableTabView>
      </Container>
    );
  }
}

MgMasterOrders.propTypes = {
  pop: PropTypes.func,
  navigation: PropTypes.object,
};
export default connect(null, { pop: popRoute })(MgMasterOrders);
