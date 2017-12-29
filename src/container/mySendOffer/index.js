import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import { popRoute, pushRoute } from '../../actions';
import { ScrollableTab, Header, Loading } from '../../components';

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
        <Header back={pop} title="已发报价" />
        <ScrollableTabView style={{ flex: 1 }} renderTabBar={() => <ScrollableTab />}>
          <Child tabLabel="全部" type="0" isRead="" />
          <Child tabLabel="已读" type="1" isRead="1" />
          <Child tabLabel="未读" type="2" isRead="0" />
          {/* <Child tabLabel="审核中" type="3" isRead="" />
          <Child tabLabel="未通过" type="4" isRead="" /> */}
        </ScrollableTabView>
        <Loading ref={(c) => { this.sleek = c; }} />
      </View>
    );
  }
}
MyRelease.propTypes = {
  pop: PropTypes.func,
};
export default connect(null, { pop: popRoute, push: pushRoute })(MyRelease);
