import React from 'react';
import { View, BackHandler } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import { popRoute, pushRoute } from '../../actions';
import { ScrollableTab, Header } from '../../components';
import base from './base';

import Child1 from './child1';
import Child2 from './child2';

class MyFriend extends base {
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
        <Header back={pop} title="我的关注" />
        <ScrollableTabView style={{ flex: 1 }} renderTabBar={() => <ScrollableTab />}>
          <Child1 tabLabel="意向客户" />
          <Child2 tabLabel="关注" cityName={text} provinceCode={provinceCode} />
        </ScrollableTabView>
      </View>
    );
  }
}
MyFriend.propTypes = {
  pop: PropTypes.func,
};
export default connect(null, { pop: popRoute, push: pushRoute })(MyFriend);
