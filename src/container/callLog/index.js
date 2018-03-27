import React from 'react';
import { View, BackHandler, Text } from 'react-native';
import { Icon, Input } from 'native-base';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import { popRoute, pushRoute } from '../../actions';
import { Header, ScrollableTab, Loading, TOpacity } from '../../components';
import styles from './styles';
import base from './base';

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
  _renderSearch() {
    const { searchVal } = this.state;
    return (
      <View style={{ backgroundColor: '#fff', paddingTop: 10, paddingBottom: 10, marginBottom: 5 }}>
        <View style={styles.HeaderMain}>
          <Icon name="ios-search-outline" style={styles.HeaderIcon} />
          <Input
            style={styles.HeaderInput}
            placeholderTextColor="#999"
            placeholder="输入搜索信息"
            autoFocus
            clearButtonMode="while-editing"
            value={searchVal}
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
    const { pop } = this.props;
    return (
      <View style={{ flex: 1 }}>
        {/* <Header back={pop} title="通话记录" /> */}
        {/* {this._renderSearch()} */}
        <ScrollableTabView style={{ flex: 1 }} renderTabBar={() => <ScrollableTab />}>
          <Child tabLabel="全部" type="0" />
          <Child tabLabel="未接" type="1" />
          <Child tabLabel="已拨" type="2" />
          <Child tabLabel="已接" type="3" />
        </ScrollableTabView>
        <Loading ref={(c) => { this.sleek = c; }} />
      </View>
    );
  }
}
CallLog.propTypes = {
  pop: PropTypes.func,
};
export default connect(null, { pop: popRoute, push: pushRoute })(CallLog);
