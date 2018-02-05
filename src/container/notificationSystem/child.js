import React from 'react';
import { View, TouchableWithoutFeedback, Text, ListView, RefreshControl } from 'react-native';
import { Icon } from 'native-base';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { pushRoute } from '../../actions';
import { Loading, TFeedback } from '../../components';
import Base from './base';
import styles from './styles';

class Child extends Base {
  constructor(props) {
    super(props);
    this.state = {
      ...this.state,
    };
  }
  componentDidMount() {
    this.getInit();
  }
  componentWillUnmount() {
  }
  _renderRow = (item) => {
    const { push } = this.props;
    return (
      <TouchableWithoutFeedback onPress={() => { push({ key: 'NotificationSystemDetail' }); }}>
        <View style={styles.newsItem}>
          <View style={styles.top}>
            <Text
              numberOfLines={1}
              style={styles.leftText}
            >
              你提交的品种名暂未通过审核你提交的品种名暂未通过审核你提交的品种名暂未通过审核你提交的品种名暂未通过审核你提交的品种名暂未通过审核
            </Text>
            <Icon style={styles.rightIcn} name="arrow-back" />
          </View>
          <Text style={styles.newsTime}>2017年12月19日</Text>
        </View>
      </TouchableWithoutFeedback>
    );
  }
  render() {
    const { noData, dataSource, nomore, refresh } = this.state;
    return (
      <View style={{ flex: 1, backgroundColor: '#f6f6f6' }}>
        {
          !noData ?
            <ListView
              dataSource={dataSource}
              renderRow={this._renderRow}
              onEndReached={this._reachEnd}
              enableEmptySections
              onEndReachedThreshold={10}
              contentContainerStyle={styles.listViewStyle}
              renderFooter={() => <Text style={{ lineHeight: 30, textAlign: 'center', color: '#666', fontSize: 12 }}>
                {nomore ? '没有更多数据了' : '数据加载中...'}
              </Text>}
              refreshControl={
                <RefreshControl
                  refreshing={refresh}
                  onRefresh={this._onRefresh}
                />}
            />
            :
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
              <TouchableWithoutFeedback onPress={this._onRefresh}>
                <View>
                  <Text style={{ marginBottom: 8, marginTop: 5, textAlign: 'center', color: '#666', fontSize: 12 }}>
                    没有相关数据,点击刷新
                  </Text>
                </View>
              </TouchableWithoutFeedback>
            </View>
        }
        <Loading ref={(c) => { this.sleek = c; }} />
      </View>
    );
  }
}
Child.propTypes = {
  push: PropTypes.func,
};
export default connect(null, { push: pushRoute })(Child);
