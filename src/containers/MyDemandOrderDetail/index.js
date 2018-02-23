import React from 'react';
import PropTypes from 'prop-types';
import { Container } from 'native-base';
import { connect } from 'react-redux';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import { Header, ScrollableTab } from '../../components';
import { popRoute } from '../../actions';
import List from './list';
import Detail from './detail';

class DemandOrderDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      item: props.navigation.state.params.item,
    };
  }
  componentDidMount() {
  }
  render() {
    const { pop } = this.props;
    const { item } = this.state;
    return (
      <Container>
        <Header back={pop} title="订单详情" />
        <ScrollableTabView style={{ flex: 1 }} renderTabBar={() => <ScrollableTab />}>
          <List tabLabel="订单动态" demandOrderId={item.demandOrderId} />
          <Detail tabLabel="订单明细" item={item} />
        </ScrollableTabView>
      </Container>
    );
  }
}

DemandOrderDetail.propTypes = {
  pop: PropTypes.func,
  navigation: PropTypes.object,
};
export default connect(null, { pop: popRoute })(DemandOrderDetail);
