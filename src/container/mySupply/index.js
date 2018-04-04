import React from 'react';
import { View, BackHandler, DeviceEventEmitter } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import { popRoute, pushRoute } from '../../actions';
import { ScrollableTab, Header, Loading } from '../../components';
import base from './base';

import Child from './child';

class MySupply extends base {
  constructor(props) {
    super(props);
    this.state = {
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
    const { oldStatus } = this.state;
    return (
      <View style={{ flex: 1 }}>
        <Header back={pop} title="我的供应" />
        <ScrollableTabView
          style={{ flex: 1 }}
          renderTabBar={() => <ScrollableTab />}
          onChangeTab={item => DeviceEventEmitter.emit('emitMySupply', item.i.toString())}
        >
          <Child tabLabel="销售中" type="0" status={oldStatus} />
          <Child tabLabel="已下架" type="1" status={oldStatus} />
          <Child tabLabel="被驳回" type="2" status={oldStatus} />
        </ScrollableTabView>
        <Loading ref={(c) => { this.sleek = c; }} />
      </View>
    );
  }
}
MySupply.propTypes = {
  pop: PropTypes.func,
  push: PropTypes.func,
};
export default connect(null, { pop: popRoute, push: pushRoute })(MySupply);
