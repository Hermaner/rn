import React from 'react';
import PropTypes from 'prop-types';
import { BackHandler } from 'react-native';
import { Container } from 'native-base';
import { connect } from 'react-redux';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import { popRoute, pushRoute } from '../../actions';
import { ScrollableStatusTab, Header, Loading } from '../../components';
import myBuyGoodsBase from './base';

import Child from './child';

class MySoldGoods extends myBuyGoodsBase {
  constructor(props) {
    super(props);
    this.state = {
      initialPage: props.navigation.state.params.initialPage,
      ...this.state,
    };
  }
  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.onBackPress);
    this.getInit();
  }
  componentWillUnmount() {
    this.deleteInit();
    BackHandler.removeEventListener('hardwareBackPress', this.onBackPress);
  }
  onBackPress = () => {
    this.props.pop();
    return true;
  };
  render() {
    const { pop } = this.props;
    const { initialPage, countList } = this.state;
    return (
      <Container>
        <Header back={pop} title="已卖出的货品" />
        <ScrollableTabView
          style={{ flex: 1 }}
          initialPage={initialPage}
          renderTabBar={() => <ScrollableStatusTab count={countList} />}
        >
          <Child tabLabel="全部" status="" />
          <Child tabLabel="待修改" status="1" />
          <Child tabLabel="待发货" status="4" />
          <Child tabLabel="退款中" status="6" />
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
