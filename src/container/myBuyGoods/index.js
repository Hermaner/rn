import React from 'react';
import PropTypes from 'prop-types';
import { BackHandler } from 'react-native';
import { Container } from 'native-base';
import { connect } from 'react-redux';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import { popRoute, resetHome } from '../../actions';
import { ScrollableStatusTab, Header, Loading } from '../../components';
import base from './base';

import Child from './child';

class MyBuyGoods extends base {
  constructor(props) {
    super(props);
    const { params } = props.navigation.state;
    this.state = {
      type: params ? params.type : '',
      ...this.state,
    };
  }
  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.onBackPress);
    this.getData();
    this.initData();
  }
  componentWillUnmount() {
    this.deleteInit();
    BackHandler.removeEventListener('hardwareBackPress', this.onBackPress);
  }
  onBackPress = () => {
    const { type } = this.state;
    const { pop, reset } = this.props;
    if (type === 'reset') {
      reset();
    } else {
      pop();
    }
    return true;
  };
  render() {
    const { countList } = this.state;
    return (
      <Container>
        <Header back={this.onBackPress} title="已买到的货品" />
        <ScrollableTabView style={{ flex: 1 }} renderTabBar={() => <ScrollableStatusTab count={countList} />}>
          <Child tabLabel="全部" status="" />
          <Child tabLabel="待确认" status="2" />
          <Child tabLabel="待支付" status="3" />
          <Child tabLabel="待收货" status="5" />
        </ScrollableTabView>
        <Loading ref={(c) => { this.sleek = c; }} />
      </Container>
    );
  }
}

MyBuyGoods.propTypes = {
  pop: PropTypes.func,
  navigation: PropTypes.object,
  reset: PropTypes.func,
};
export default connect(null, { pop: popRoute, reset: resetHome })(MyBuyGoods);
