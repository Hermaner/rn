import React from 'react';
import { View, TouchableWithoutFeedback, Text, FlatList } from 'react-native';
import { CachedImage } from 'react-native-img-cache';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { pushRoute } from '../../actions';
import { Loading, TFeedback, NoData } from '../../components';
import ChildBase from './childBase';
import styles from './styles';
import { Mcolor, st } from '../../utils';

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
  componentWillUnmount() {
    this.getDelete();
  }
  _renderRow = (list) => {
    const { push } = this.props;
    const { item, index } = list;
    const { tu } = this.state;
    return (
      <TouchableWithoutFeedback
        key={index}
        onPress={() => { push({ key: 'OrderInfo', params: { orderInfo: item, supplyInfo: item.supply, type: 'getMainListBuyGoods' } }); }}
      >
        <View style={{ marginBottom: 10 }}>
          <View style={styles.flexRowBox}>
            <Text style={{ flex: 1, color: '#666', fontSize: 14 }}>卖家: {item.sellNickName}</Text>
            <Text style={{ color: '#FF8711', fontSize: 14 }}>
              {item.statusName}
            </Text>
          </View>
          <View style={styles.goodsInfo}>
            {
              item.supply.supplyImages.length > 0 && item.supply.supplyImages[0].imgUrl ?
                <CachedImage
                  source={{ uri: `${item.supply.supplyImages[0].imgUrl}?imageView2/1/w/80` }}
                  style={styles.goodsImg}
                />
              :
                <CachedImage style={styles.goodsImg} source={tu} />
            }
            <View style={styles.goodsNameBox}>
              <View style={{ ...st.frcenter, height: 30, marginBottom: 5 }}>
                <Text style={{ fontSize: 14, color: '#333', flex: 1 }}>{item.supply.brandName}{item.supply.categoryName}</Text>
                <Text style={{ fontSize: 14, color: '#666' }}>￥{item.unitPrice}</Text>
              </View>
              <Text style={{ fontSize: 14, color: '#888', textAlign: 'right' }}>x{item.buyCount}</Text>
            </View>
          </View>
          <View style={styles.totalBox}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text style={{ fontSize: 12, color: '#555', marginRight: 6 }}>优惠:￥{item.discount || '0.0'}</Text>
              <Text style={{ fontSize: 12, color: '#555', marginRight: 6 }}>运费:￥{item.freight || '0.0'}</Text>
              <Text style={{ fontSize: 14, color: '#555' }}>合计：</Text>
              <Text style={{ fontSize: 16, color: Mcolor }}>￥{item.amount}</Text>
            </View>
          </View>
          {
            (item.status === '1') &&
            <View style={styles.footerBox}>
              <TFeedback
                content={
                  <View style={styles.btnBox}>
                    <Text style={{ color: '#444', fontSize: 14 }}>取消订单</Text>
                  </View>}
                onPress={() => { this.removeOrder(item); }}
              />
            </View>
          }
          {
            (item.status === '2' || item.status === '3') &&
            <View style={styles.footerBox}>
              <TFeedback
                content={
                  <View style={styles.btnBox}>
                    <Text style={{ color: '#444', fontSize: 14 }}>取消订单</Text>
                  </View>}
                onPress={() => { this.removeOrder(item); }}
              />
              <TFeedback
                content={
                  <View style={styles.btnBox1}>
                    <Text style={{ color: '#fff', fontSize: 14 }}>去支付</Text>
                  </View>}
                onPress={() => { push({ key: 'OrderInfo', params: { orderInfo: item, supplyInfo: item.supply, type: 'getMainListBuyGoods' } }); }}
              />
            </View>
          }
          {
            item.status === '5' &&
            <View style={styles.footerBox}>
              <TFeedback
                content={
                  <View style={styles.btnBox1}>
                    <Text style={{ color: '#fff', fontSize: 14 }}>确认收货</Text>
                  </View>}
                onPress={() => { push({ key: 'OrderInfo', params: { orderInfo: item, supplyInfo: item.supply, type: 'getMainListBuyGoods' } }); }}
              />
            </View>
          }
          {
            (item.status === '6') &&
            <View style={styles.footerBox}>
              <TFeedback
                content={
                  <View style={styles.btnBox}>
                    <Text style={{ color: '#444', fontSize: 14 }}>删除订单</Text>
                  </View>}
                onPress={() => { this.deleteOrder(item.orderId); }}
              />
            </View>
          }
          {
            (item.status === '7') &&
            <View style={styles.footerBox}>
              <TFeedback
                content={
                  <View style={styles.btnBox}>
                    <Text style={{ color: '#444', fontSize: 14 }}>删除订单</Text>
                  </View>}
                onPress={() => { this.deleteOrder(item.orderId); }}
              />
              <TFeedback
                content={
                  <View style={styles.btnBox}>
                    <Text style={{ color: '#444', fontSize: 14 }}>查看物流</Text>
                  </View>}
                onPress={() => { push({ key: 'OrderLOG', params: { orderId: item.orderId } }); }}
              />
              {
                item.supplyEvaluat === null &&
                <TFeedback
                  content={
                    <View style={styles.btnBox1}>
                      <Text style={{ color: '#fff', fontSize: 14 }}>去评价</Text>
                    </View>}
                  onPress={() => { push({ key: 'OrderThink', params: { orderInfo: item, typpe: 'getBuyGoodsGoThink' } }); }}
                />
              }
            </View>
          }
          {
            (item.status === '8') &&
            <View style={styles.footerBox}>
              <TFeedback
                content={
                  <View style={styles.btnBox}>
                    <Text style={{ color: '#444', fontSize: 14 }}>删除订单</Text>
                  </View>}
                onPress={() => { this.deleteOrder(item.orderId); }}
              />
            </View>
          }
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
            <FlatList
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
              label="没有相关数据，点击刷新"
              onPress={this._onRefresh}
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
