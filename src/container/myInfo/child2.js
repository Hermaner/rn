import React from 'react';
import { View, TouchableWithoutFeedback, Text, ListView, RefreshControl } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { TFeedback, Loading } from '../../components';
import { pushRoute } from '../../actions';
import Base2 from './base2';
import styles from './styles';

class Child2 extends Base2 {
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
      <View style={{ marginBottom: 5 }}>
        <View style={styles.buyGoodsItem}>
          <Text style={styles.buyGoodsName}>{item.categoryName}</Text>
          <View style={styles.flexRow}>
            <Text style={styles.buyGoodsVariety}>品种: {item.brandName}</Text>
            <Text style={styles.flexRight}>{item.demand}{item.unit}</Text>
          </View>
          <Text style={styles.buyGoodsPlace}>
            所在地: {item.receiveProvinceName}{item.receiveCityName}
          </Text>
          <View style={styles.flexRow}>
            <View style={{ flex: 1 }} />
            <TFeedback
              content={
                <View style={styles.goBuyBtnBox}>
                  <Text style={styles.goBuyBtn}>去报价</Text>
                </View>}
              onPress={() => { push({ key: 'PurchaseDetail', params: { item } }); }}
            />
          </View>
        </View>
      </View>
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
Child2.propTypes = {
  push: PropTypes.func,
};
export default connect(null, { push: pushRoute })(Child2);
