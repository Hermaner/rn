import React from 'react';
import { BackHandler } from 'react-native';
import PropTypes from 'prop-types';
import { Container } from 'native-base';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import { connect } from 'react-redux';
import { popRoute } from '../../actions';
import { Header, ScrollableTab } from '../../components';
import Demand from './demand';
import Normal from './normal';

class Orders extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      initialPage: props.navigation.state.params.initialPage,
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
    const { initialPage } = this.state;
    return (
      <Container>
        <Header
          back={pop}
          title="订单列表"
        />
        <ScrollableTabView
          style={{ flex: 1 }}
          initialPage={initialPage}
          renderTabBar={() => <ScrollableTab />}
        >
          <Demand tabLabel="需求单" status="0" />
          <Normal tabLabel="待付款" status="1" />
          <Normal tabLabel="待服务" status="3" />
          <Normal tabLabel="待评价" status="4" />
          <Normal tabLabel="退款单" status="6" />
          <Normal tabLabel="全部" status="" />
        </ScrollableTabView>
      </Container>
    );
  }
}

Orders.propTypes = {
  pop: PropTypes.func,
  navigation: PropTypes.object,
};
export default connect(null, { pop: popRoute })(Orders);
