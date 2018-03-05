import React from 'react';
import PropTypes from 'prop-types';
import { BackHandler } from 'react-native';
import { Container } from 'native-base';
import { connect } from 'react-redux';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import { Header, ScrollableTab } from '../../components';
import { popRoute, resetHome } from '../../actions';
import List from './list';
import Detail from './detail';

class DemandOrderDetail extends React.Component {
  constructor(props) {
    super(props);
    const { item, type } = props.navigation.state.params;
    this.state = {
      item,
      type,
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
    const { pop, reset } = this.props;
    const { item, type } = this.state;
    return (
      <Container>
        <Header back={type === 'reset' ? reset : pop} title="订单详情" />
        <ScrollableTabView style={{ flex: 1 }} renderTabBar={() => <ScrollableTab />}>
          <List tabLabel="订单动态" demandOrderId={item.demandOrderId} demandOrderNumber={item.demandOrderNumber} />
          <Detail tabLabel="订单明细" item={item} />
        </ScrollableTabView>
      </Container>
    );
  }
}

DemandOrderDetail.propTypes = {
  pop: PropTypes.func,
  reset: PropTypes.func,
  navigation: PropTypes.object,
};
export default connect(null, { pop: popRoute, reset: resetHome })(DemandOrderDetail);
