import React from 'react';
import { View, BackHandler, Text, FlatList } from 'react-native';
import PropTypes from 'prop-types';
import { Container } from 'native-base';
import { connect } from 'react-redux';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import { CachedImage } from 'react-native-img-cache';
import { popRoute, pushRoute } from '../../actions';
import { TFeedback, Header, Iconfont, ModalCall, Loading, NoData, ScrollableTab } from '../../components';
import base from './base';
import styles from './styles';

import Child from './child';

class CallLog extends base {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.onBackPress);
    // this.initData();
  }
  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.onBackPress);
    // this.getDelete();
  }
  onBackPress = () => {
    this.props.pop();
    return true;
  };
  render() {
    const { pop } = this.props;
    const { text, provinceCode } = this.state;
    return (
      <View style={{ flex: 1 }}>
        <Header back={pop} title="通话记录" />
        <ScrollableTabView style={{ flex: 1 }} renderTabBar={() => <ScrollableTab />}>
          <Child tabLabel="已拨" />
          <Child tabLabel="未拨" />
        </ScrollableTabView>
      </View>
    );
  }
}
CallLog.propTypes = {
  pop: PropTypes.func,
};
export default connect(null, { pop: popRoute, push: pushRoute })(CallLog);
