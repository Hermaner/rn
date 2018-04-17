import React from 'react';
import { View, TouchableWithoutFeedback, Text, FlatList } from 'react-native';
import { CachedImage } from 'react-native-img-cache';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { pushRoute } from '../../actions';
import { Loading, TFeedback, NoData } from '../../components';
import ChildBase from './childBase';
import { Mcolor } from '../../utils';
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
  componentWillUnmount() {
  }
  _renderRow = (list) => {
    const { push } = this.props;
    const { item, index } = list;
    const { tu } = this.state;
    return (
      <TouchableWithoutFeedback
        key={index}
        onPress={() => { push({ key: 'OrderInfoSeller', params: { orderInfo: item, supplyInfo: item.supply, type: 'getMainListSoldGoods' } }); }}
      >
        <View style={{ marginBottom: 10 }}>
          <View style={styles.flexRowBox}>
            <Text style={{ flex: 1, color: '#666', fontSize: 14 }}>买家: {item.nickName}</Text>
            <Text style={{ color: Mcolor, fontSize: 14 }}>
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
              <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', height: 40 }}>
                <Text style={{ fontSize: 15, color: '#333', flex: 1 }}>{item.supply.brandName}{item.supply.categoryName}</Text>
                <Text style={{ fontSize: 14, color: '#666' }}>￥{item.unitPrice}</Text>
              </View>
              <Text style={{ flex: 1, fontSize: 12, color: '#333', textAlign: 'right' }}>x{item.buyCount}</Text>
            </View>
          </View>
          <View style={styles.totalBox}>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', height: 30 }}>
              <Text style={{ fontSize: 14, color: '#666' }}>
                优惠￥{item.discount || '0.0'}
              </Text>
              <Text style={{ fontSize: 14, color: '#666' }}>
                运费￥{item.freight || '0.0'}
              </Text>
              <Text style={{ marginLeft: 5, fontSize: 16, color: '#333' }}>合计：</Text>
              <Text style={{ fontSize: 16, color: '#FF8711' }}>￥{item.amount}</Text>
            </View>
          </View>
          {
            (item.status === '1' || item.status === '2') &&
            <View style={styles.footerBox}>
              <TFeedback
                content={
                  <View style={styles.btnBox1}>
                    <Text style={{ color: '#fff', fontSize: 14 }}>修改</Text>
                  </View>}
                onPress={() => { this.props.push({ key: 'OrderInfoSeller', params: { orderInfo: item, supplyInfo: item.supply, type: 'getMainListSoldGoods' } }); }}
              />
            </View>
          }
          {
            (item.status === '4') &&
            <View style={styles.footerBox}>
              <TFeedback
                content={
                  <View style={styles.btnBox1}>
                    <Text style={{ color: '#fff', fontSize: 14 }}>去发货</Text>
                  </View>}
                onPress={() => { this.props.push({ key: 'OrderInfoSeller', params: { orderInfo: item, supplyInfo: item.supply, type: 'getMainListSoldGoods' } }); }}
              />
            </View>
          }
          {
            (item.status === '6') &&
            <View style={styles.footerBox}>
              <TFeedback
                content={
                  <View style={styles.btnBox}>
                    <Text style={{ color: '#444', fontSize: 14 }}>同意退款</Text>
                  </View>}
                onPress={() => { this.deleteOrder(item.orderId); }}
              />
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
