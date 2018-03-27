import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react/native';
import { connect } from 'react-redux';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import { popRoute, pushRoute } from '../../actions';
import { ScrollableTab, Header, UserSocket, TOpacity } from '../../components';

import SessionList from './SessionList';
import Child1 from './child1';
import Child2 from './child2';
import Call from '../callLog';
import { st } from '../../utils';


const styles = StyleSheet.create({
  noLogin: {
    flex: 1,
    ...st.jacenter,
  },
  noLoginText: {
    fontSize: 14,
    color: '#3292ff',
  },
});

@observer
class MySupply extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  componentDidMount() {
  }
  render() {
    const { userData } = UserSocket;
    const { text, provinceCode } = this.state;
    return (
      <View style={{ flex: 1 }}>
        <Header hideLeft title="聊天" />
        {
          userData && userData.memberId ?
            <ScrollableTabView style={{ flex: 1 }} locked renderTabBar={() => <ScrollableTab />}>
              <SessionList tabLabel="聊天" type="1" />
              <Child1 tabLabel="意向客户" />
              <Child2 tabLabel="我的关注" cityName={text} provinceCode={provinceCode} />
              <Call tabLabel="通话记录" />
            </ScrollableTabView>
            :
            <View style={styles.noLogin}>
              <TOpacity
                content={
                  <Text style={styles.noLoginText}>请先登录</Text>
                }
                onPress={() => {
                  this.props.push({ key: 'User',
                  });
                }}
              />
            </View>
        }
      </View>
    );
  }
}
MySupply.propTypes = {
  push: PropTypes.func,
};
export default connect(null, { pop: popRoute, push: pushRoute })(MySupply);
