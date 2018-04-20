import React from 'react';
import { View, TouchableOpacity, TouchableWithoutFeedback, Text } from 'react-native';
import PropTypes from 'prop-types';
import { OptimizedFlatList } from 'react-native-optimized-flatlist';
import { connect } from 'react-redux';
import { TFeedback, Loading, NoData } from '../../components';
import { pushRoute } from '../../actions';
import ChildBase from './childBase';
import styles from './styles';

class Child extends ChildBase {
  constructor(props) {
    super(props);
    this.state = {
      ...this.state,
    };
  }
  componentDidMount() {
    this.getInit();
  }
  _renderRow = ({ item, index }) => {
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
                <View style={[styles.btnBox]}>
                  <Text style={[styles.btnText]}>查看报价</Text>
                </View>}
              onPress={() => this.pushSeePrice(item.purchaseQuotes)}
            />
            <TFeedback
              content={
                <View style={[styles.btnBox, styles.btnChoose]}>
                  <Text style={[styles.btnText, styles.btnTextChoose]}>重发</Text>
                </View>}
              onPress={() => this.props.push({ key: 'CgxComfirm', params: { item } })}
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  }
  render() {
    const { noData, items, nomore, refresh } = this.state;
    return (
      <View style={{ flex: 1, backgroundColor: '#f6f6f6' }}>
        {
          !noData ?
            <OptimizedFlatList
              data={items}
              renderItem={this._renderRow}
              keyExtractor={(item, index) => index}
              ItemSeparatorComponent={() => <View style={{ height: 4 }} />}
              ListFooterComponent={() =>
                <View style={{ height: 40, justifyContent: 'center', alignItems: 'center' }}>
                  <Text style={{ color: '#666', fontSize: 14 }}>
                    {nomore ? '没有更多数据了' : '数据加载中...'}
                  </Text>
                </View>}
              onRefresh={this._onRefresh}
              refreshing={refresh}
              onEndReached={this._reachEnd}
              onEndReachedThreshold={0.1}
            />
            :
            <NoData
              label="没有相关数据"
            />
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
