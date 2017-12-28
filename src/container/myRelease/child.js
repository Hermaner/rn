import React from 'react';
import { View, TouchableOpacity, TouchableWithoutFeedback, Text, ListView, RefreshControl } from 'react-native';
import PropTypes from 'prop-types';
import SleekLoadingIndicator from 'react-native-sleek-loading-indicator';
import { connect } from 'react-redux';
import { TFeedback } from '../../components';
import { pushRoute } from '../../actions';
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
  _renderRow = (item) => {
    const { push } = this.props;
    return (
      <TouchableWithoutFeedback onPress={() => { push({ key: item.purchaseId }); }}>
        <View style={styles.goodsitem}>
          <View style={styles.goodsDetail}>
            <View style={{ flex: 1 }}>
              <View style={styles.goodsPrice}>
                <Text style={{ flex: 1, fontSize: 14, color: '#666' }}>{item.categoryName}</Text>
                <View style={{}}>
                  <Text style={{ fontSize: 16, color: '#FC8521' }}>面议</Text>
                </View>
              </View>
              <View style={{ marginBottom: 6 }}>
                <Text style={{ fontSize: 12, color: '#666' }}>品种:{item.brandName}</Text>
              </View>
              <View>
                <Text style={{ fontSize: 12, color: '#666' }}>浏览次数:4次</Text>
              </View>
            </View>
          </View>
          <View style={styles.readPeople}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text style={{ color: '#FC8521', fontSize: 14 }}>{item.purchaseQuotes.length}</Text>
              <Text style={{ color: '#666', fontSize: 14 }}>人报价</Text>
            </View>
            <Text style={styles.renovateTime}>距截止{item.purchaseTime}天</Text>
          </View>
          <View style={styles.btnList}>
            <TouchableOpacity
              style={styles.btnBox}
              onPress={() => this.StopPurchaseService(item.purchaseId)}
            >
              <Text style={styles.btnText}>停止采购</Text>
            </TouchableOpacity>
            <TFeedback
              content={
                <View style={[styles.btnBox, styles.btnChoose]}>
                  <Text style={[styles.btnText, styles.btnTextChoose]}>查看报价</Text>
                </View>}
              onPress={() => { push({ key: 'SeePrice' }); }}
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
        <SleekLoadingIndicator loading={isSleekShow} />
      </View>
    );
  }
}
Child.propTypes = {
  push: PropTypes.func,
};
export default connect(null, { push: pushRoute })(Child);
