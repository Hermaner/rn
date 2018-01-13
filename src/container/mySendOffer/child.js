import React from 'react';
import { View, TouchableWithoutFeedback, Text, ListView, RefreshControl } from 'react-native';
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
    this._onRefresh();
  }
  _renderRow = (item) => {
    const { push } = this.props;
    return (
      <TouchableWithoutFeedback onPress={() => { push({ key: item.purchaseId }); }}>
        <View style={styles.listItem}>
          <View style={styles.rowBox}>
            <Text style={styles.normalText}>{item.brandName}</Text>
            <Text style={[styles.textRight, item.isRead && styles.alreadyChooseColor]}>{item.isRead ? '已读' : '未读'}</Text>
          </View>
          <View style={styles.rowBox}>
            <Text style={styles.normalText}>采购人：{item.purchase.nickName}</Text>
          </View>
          <View style={styles.rowBox}>
            <Text style={styles.normalText}>报价时间：{item.modiDate}</Text>
          </View>
          <View style={[styles.rowBox, { justifyContent: 'flex-end' }]}>
            <TFeedback
              content={
                <View style={[styles.leftBtn, styles.btnTotal]}>
                  <Text style={styles.btnText}>查看详情</Text>
                </View>}
              onPress={() => this.pushPriceInfo(item)}
            />
            <TFeedback
              content={
                <View style={[styles.rightBtn, styles.btnTotal]}>
                  <Text style={styles.btnText}>在线咨询</Text>
                </View>}
              onPress={() => { push({ key: 'User' }); }}
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  }
  render() {
    const { noData, dataSource, nomore, refresh, isSleekShow } = this.state;
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
