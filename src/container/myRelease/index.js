import React from 'react';
import { View, TouchableOpacity, TouchableWithoutFeedback, Text, Image } from 'react-native';
import PropTypes from 'prop-types';
import { Container, Icon, Tab, Tabs, TabHeading, Content, ActionSheet } from 'native-base';
import { connect } from 'react-redux';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import { popRoute, pushRoute } from '../../actions';
import { ScrollableTab, Header } from '../../components';

import Child from './child';

class MyRelease extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  componentDidMount() {
  }
  render() {
    const { pop } = this.props;
    return (
      <View style={{ flex: 1 }}>
        <Header back={pop} title="采购管理" />
        <ScrollableTabView style={{ flex: 1 }} renderTabBar={() => <ScrollableTab />}>
          <Child tabLabel="采购中" type="0" />
          <Child tabLabel="已停止" type="1" />
          <Child tabLabel="被驳回" type="2" />
        </ScrollableTabView>
      </View>
    );
  }
}

MyRelease.propTypes = {
  pop: PropTypes.func,
};
export default connect(null, { pop: popRoute, push: pushRoute })(MyRelease);
