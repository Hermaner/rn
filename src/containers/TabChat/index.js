import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import { popRoute, pushRoute } from '../../actions';
import { ScrollableTab, Header, Loading } from '../../components';

import SessionList from './SessionList';
import FriendList from './FriendList';

class MySupply extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  componentDidMount() {
  }
  render() {
    return (
      <View style={{ flex: 1 }}>
        <Header hideLeft title="聊天" />
        <ScrollableTabView style={{ flex: 1 }} locked renderTabBar={() => <ScrollableTab />}>
          <SessionList tabLabel="聊天" type="1" />
          <FriendList tabLabel="好友" type="1" />
        </ScrollableTabView>
        <Loading ref={(c) => { this.sleek = c; }} />
      </View>
    );
  }
}
MySupply.propTypes = {
  pop: PropTypes.func,
};
export default connect(null, { pop: popRoute, push: pushRoute })(MySupply);
