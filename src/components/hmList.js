import React, { PropTypes } from 'react';
import {
  StyleSheet,
  Text,
  View,
  RefreshControl,
  ListView,
} from 'react-native';

let canEnd = false;

export default class SwRefreshListView extends ListView {
  _isLoading = false
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
    };
  }
  static propTypes={
    isEndReached: PropTypes.func,
    isNoMore: PropTypes.bool,
    isLoading: PropTypes.bool,
    isRefresh: PropTypes.bool,
    onRefresh: PropTypes.func,
  }
  _onRefresh = () => {
    this.setState({
      refresh: true,
      id: null,
    }, () => this.getData());
  }
  _reachEnd = () => {
    const { onLoadMore } = this.props;
    onLoadMore((isNoMoreData) => {
      setTimeout(() => { canEnd = true; }, 0);
      this.setState({
        loading: false,
        refresh: isNoMoreData === undefined,
        nomore: false,
      });
    });
  }
  render() {
    const { isNoMore, isLoading, isRefresh, onRefresh } = this.props;
    return (
      <View>
        <ListView
          {...this.props}
          onEndReached={this._reachEnd}
          enableEmptySections
          onEndReachedThreshold={10}
          renderFooter={() => <Text style={{ marginBottom: 8, marginTop: 5, textAlign: 'center', color: '#666', fontSize: 14 }}>
            {isNoMore ? '没有更多数据了' : isLoading ? '数据加载中...' : '加载完毕'}
          </Text>}
          refreshControl={
            <RefreshControl
              refreshing={isRefresh}
              onRefresh={onRefresh}
            />}
        />
      </View>
    );
  }
}
