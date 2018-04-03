import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Input, Icon } from 'native-base';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react/native';
import { connect } from 'react-redux';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import { popRoute, pushRoute } from '../../actions';
import base from './base';
import { ScrollableTab, Header, UserSocket, TOpacity } from '../../components';

import SessionList from './SessionList';
import Child1 from './child1';
import Child2 from './child2';
import Call from '../callLog';
import { st, Mcolor } from '../../utils';


const styles = StyleSheet.create({
  noLogin: {
    flex: 1,
    ...st.jacenter,
  },
  noLoginText: {
    fontSize: 14,
    color: '#3292ff',
  },
  headerInput: {
    height: 40,
    backgroundColor: '#fff',
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 10,
    paddingRight: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#bbb',
  },
  HeaderInput: {
    flex: 1,
    height: 30,
    fontSize: 14,
    color: '#666',
  },
  HeaderIcon: {
    color: '#666',
    fontSize: 18,
  },
  inputBox: {
    height: 30,
    backgroundColor: '#eee',
    borderRadius: 5,
    paddingLeft: 10,
    // flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  okBtn: {
    height: 26,
    ...st.jacenter,
    paddingLeft: 8,
    paddingRight: 8,
    borderRadius: 5,
    backgroundColor: Mcolor,
  },
  okBtnText: {
    fontSize: 14,
    color: '#fff',
  },
  btnText: {
    fontSize: 14,
    color: '#666',
  },
});

@observer
class MySupply extends base {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  componentDidMount() {
  }
  _renderSearch() {
    return (
      <View style={styles.headerInput}>
        <View style={styles.inputBox}>
          <Icon name="ios-search-outline" style={styles.HeaderIcon} />
          <Input
            style={styles.HeaderInput}
            placeholderTextColor="#999"
            placeholder="输入名称进行搜索"
            autoFocus
            clearButtonMode="while-editing"
            value={this.state.userInfo}
            onChangeText={value => this.onSearchChange(value)}
            onSubmitEditing={this.login}
          />
          <TOpacity
            style={{ marginRight: 4 }}
            content={
              <View style={styles.okBtn}>
                <Text style={styles.okBtnText}>确定</Text>
              </View>
            }
            onPress={() => this.login()}
          />
        </View>
      </View>
    );
  }
  render() {
    const { userData } = UserSocket;
    const { text, provinceCode } = this.state;
    return (
      <View style={{ flex: 1 }}>
        <Header
          hideLeft
          title="聊天"
          rightIcon="icon-yaoqing"
          rightPress={() => this.search()}
        />
        {/* {this._renderSearch()} */}
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
