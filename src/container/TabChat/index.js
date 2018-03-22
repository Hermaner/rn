import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import { popRoute, pushRoute } from '../../actions';
import { ScrollableTab, Header, Loading } from '../../components';

import SessionList from './SessionList';
import Child1 from './child1';
import Child2 from './child2';

class MySupply extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  componentDidMount() {
  }
  render() {
    const { text, provinceCode } = this.state;
    return (
      <View style={{ flex: 1 }}>
        <Header hideLeft title="聊天" />
        <ScrollableTabView style={{ flex: 1 }} locked renderTabBar={() => <ScrollableTab />}>
          <SessionList tabLabel="聊天" type="1" />
          <Child1 tabLabel="意向客户" />
          <Child2 tabLabel="关注" cityName={text} provinceCode={provinceCode} />
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
